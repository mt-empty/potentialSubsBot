/**
  * A reddit bot build with the snoowrap JS wrapper. It scrapes the weekly comments 
  * of top subreddits looking for subreddits that do not exist yet
  *
  * @author mt-empty
  */
require('dotenv').config();

const fs = require('fs')
const Snoowrap = require('snoowrap');
const readline = require('readline');

const PClass = require("./classes");
const constants = require("./constants"); //constants

const writePotential = fs.createWriteStream(constants.POTENTIAL_SUBREDDIT_FILENAME, {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

// the snoowrap wrapper, allows interactions with reddit API
const rClient = new Snoowrap({
    userAgent: 'create-sub-bot',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

// configiration options: request delay, so the script doesn't get rate limited by reddit API
rClient.config({ requestDelay: constants.REQUEST_DELAY, continueAfterRatelimitError: true });


const TopSubredditArray = []    // holds the Top subreddits which are loaded from a file
const weeklyPotentialSubreddits = new PClass.PotentialArray()  // class instance to hold potential subreddits so that they can be posted in a table
let removeCREATE_POST_THRETH = false
let firstPostofTheWeek = true


/**
 * main function
 * first loads the top subreddits into an array, then it iterates over these subreddits
 * at each iteratrion, it checks whether it has found the required number of matches for a post submission
 */
async function main() {
    await loadFileIntoArray(constants.TOP_SUBREDDIT_FILENAME, TopSubredditArray)
    let intreval = setInterval(() => {
        console.log(`Rate limiting remaining ${constants.GREEN_COLOR}${rClient.ratelimitRemaining}${constants.COLOR_RESET}, post threshold is ${constants.GREEN_COLOR}${weeklyPotentialSubreddits.getSize()}${constants.COLOR_RESET} out of ${constants.CREATE_POST_THRESH}`)
        // console.log(process.memoryUsage())
    }, 60000)

    for await (let [rank, sub, subscribers] of TopSubredditArray) {
        console.log(`\n### Checking r/${constants.GREEN_COLOR}${sub}${constants.COLOR_RESET}, ranks ${rank} out of ${constants.TOP_SUBREDDIT_LENGTH}\n`)
        removeCREATE_POST_THRETH = (parseInt(rank) === constants.TOP_SUBREDDIT_LENGTH)

        await ScrapeSubreddit(sub, getScrapeThresh(subscribers))

        if (weeklyPotentialSubreddits.getSize() >= constants.CREATE_POST_THRESH || (removeCREATE_POST_THRETH && weeklyPotentialSubreddits.getSize())) {
            submitSelfpost(weeklyPotentialSubreddits.getPotentialArray(constants.CREATE_POST_THRESH))
            // weeklyPotentialSubreddits.emptyArray()
        }
    }

    clearInterval(intreval)
    console.log("All subreddits have been scraped, Script ended successfully")
    writePotential.end()
}

/**
 * Scrapes the top submissions of a given subreddit, @SCRAPE_THRESH_MIN
 * @param {array} subredditName 
 */
async function ScrapeSubreddit(subredditName, ScrapeThresh) {
    await rClient.getTop(subredditName, { time: constants.SCRAPE_TIME, limit: ScrapeThresh })
        .each(async Submission => {
            await rClient.getSubmission(Submission.id).expandReplies({ limit: 0, depth: 0 })
                .then(submission => {
                    submission.comments.forEach(comment => traverseTree(comment))

                }).catch((error) => console.log(`${constants.GREEN_COLOR}Error${constants.COLOR_RESET} at getting a submission\n${error.message}`))
        }).catch((error) => console.log(`${constants.GREEN_COLOR}Error${constants.COLOR_RESET} at getting top submissions\n${error.message}`))
}
/**
 * Given a numberOfSubscribers it returns the scrape threshold of a subreddit
 * Edit the formula to your needs
 * @param {int} numberOfSubscribers 
 */
function getScrapeThresh(numberOfSubscribers) {
    return Math.round(constants.SCRAPE_THRESH_MIN + Math.sqrt(3 * (numberOfSubscribers / 100000)))
}

/**
 * Loads file content of @TOP_SUBREDDIT_FILENAME into array
 * Refer to top_subreddits.txt for text format
 * @param {string} fileName 
 * @param {Map} array 
 */
async function loadFileIntoArray(fileName, array) {
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        array.push(line.split("\t"))
    }
    console.log(`The file "${fileName}" has been read into "${fileName.slice(0, -4)}" array`)
}

/**
 * writes subreddit name, commend ID and comment upvotes to a given filestream
 * @param {int} fileStream 
 * @param {string} filename 
 * @param {string} subredditName 
 * @param {object} comment 
 */
function writeToFile(fileStream, filename, subredditName, comment) {
    fileStream.write(`${subredditName}\t${comment.id}\t${comment.ups}\n`)
    // console.log(`"${subredditName}" has been written to "${filename}"`);
}

/**
 * Traverses a comment tree in "preorder", calls @filterComment if the comment has more than @COMMENT_UPVOTE_THRESH
 * @param {object} tree a comment tree object
 */
function traverseTree(tree) {
    if (tree.ups >= constants.COMMENT_UPVOTE_THRESH)
        filterComment(tree)

    if (tree.hasOwnProperty('replies')) {
        tree.replies.forEach(subtree => {
            traverseTree(subtree)
        });
    }
}

/**
 * filters the comment tree looking for a pattern using regExp
 * @param {object} comment 
 */
function filterComment(comment) {
    while ((matches = constants.REGEX.exec(comment.body)) !== null) {
        match = matches[1]  // capturing the first regExp group
        // console.log(`\tFound a match r/${match}, comment ID (${comment.id})`)
        SearchForSubreddit(match, comment)
    }
}

/**
 * Performs a search for a given subreddit name
 * @param {string} subredditName 
 * @param {object} comment 
 */
function SearchForSubreddit(subredditName, comment) {
    rClient.searchSubredditNames({ query: subredditName, exact: true }) // throws an error if the subreddit doesn't exist
        .then() // don't do anything as the subreddit exist
        .catch(() => {  // catching error means the subreddit doesn't exist
            console.log(`New potential subreddit r/${constants.GREEN_COLOR}${subredditName}${constants.COLOR_RESET}, comment ID (${comment.id})`)
            weeklyPotentialSubreddits.addPotentialSubreddit(new PClass.PotentialSubreddit(subredditName, comment))
            writeToFile(writePotential, constants.POTENTIAL_SUBREDDIT_FILENAME, subredditName, comment)
        })
}

/**
 * Builds and submits a text post to @POST_TO_SUBREDDIT
 * @param {array} potentialSubreddits 
 */
function submitSelfpost(potentialSubreddits) {

    let upperInfo, bottomInfo, footer, tableHeader, tableSeparator, tableContent, text
    let title = ""

    if (removeCREATE_POST_THRETH) {
        title += "Last Post of the week: " + constants.BOT_NAME + " has scraped all subreddits, come back on Monday"
        if (potentialSubreddits.length >= 3) {
            title += ". "
        }
    }
    else if (firstPostofTheWeek) {
        title += "First result of the week. "
        firstPostofTheWeek = false
    }

    if (potentialSubreddits.length >= 3) {
        // Top three subs
        let first, second, third
        first = "r/" + potentialSubreddits[0].subredditName + " with " + potentialSubreddits[0].upvotes
        second = "r/" + potentialSubreddits[1].subredditName + " with " + potentialSubreddits[1].upvotes
        third = "r/" + potentialSubreddits[2].subredditName + " with " + potentialSubreddits[2].upvotes

        title += "Top Potential Subreddits: " + first + ", " + second + " and " + third + " upvotes"
    }
    else{
        title += "Wrong outcome, Please report a bug on github"
    }

    footer = "\n___\n^^&nbsp;[programmer](https://www.reddit.com/message/compose/?to" + constants.PROGRAMMER + "=)&nbsp;|&nbsp;[source&nbsp;code](" + constants.GITHUB_LINK + ")&nbsp;|&nbsp;[" + constants.BOT_SUBREDDIT + "](reddit.com/" + constants.BOT_SUBREDDIT  + ")&nbsp;"
    tableHeader = "|Potential Subreddit|Parent Subreddit|Comment|Upvotes|" + "\n"
    tableSeparator = "|:-|-:|-:|-:|" + "\n"
    tableContent = ""

    for (let ps of potentialSubreddits) {
        tableContent += "|" + "r/" + ps.subredditName + "|" + ps.parentsubreddit + "|" + "[permalink]" + "(" + ps.permalink + ")" + "|" + ps.upvotes + "\n"
    }

    upperInfo = "### Potential Subreddits found today\n\nIf on mobile: please scroll to the right to view the full table.\n\n"
    bottomInfo = "### Useful Subreddits \n- r/SubsIFellFor\n- r/birthofasub \n"
    text = upperInfo + tableHeader + tableSeparator + tableContent + "---\n" + bottomInfo + footer

    rClient.getSubreddit(constants.POST_TO_SUBREDDIT).submitSelfpost({ title: title, text: text })
        .distinguish()
        .approve()
        // .assignFlair({ text: constants.BOT_FLAIR })
        .then(() => console.log(`A text post was submitted to (${constants.POST_TO_SUBREDDIT}), titled: ${title}`))
        .catch((error) => console.log(`${constants.GREEN_COLOR}Error${constants.COLOR_RESET} at getting subreddit\n${error.message}`))
}

main()
