module.exports = Object.freeze({
    // RegExp pattern
    REGEX:"YourRegExp" ,    //RegExp goes here

    GREEN_COLOR : "\x1b[33m",
    COLOR_RESET : "\x1b[0m",

    // Files used 
    TOP_SUBREDDIT_FILENAME: "top_subreddits.txt",
    POTENTIAL_SUBREDDIT_FILENAME: "potential_subreddits.txt",

    SCRAPE_TIME : 'week',               // scrape weekly submissions

    // threshhold information
    SCRAPE_THRESH_MIN: 25,              // minimun submissions to scrape
    COMMENT_UPVOTE_THRESH: 3,           // # of upvotes required for the match to be considered
    CREATE_POST_THRESH: 25,             // # of matches for a post submission

    TOP_SUBREDDIT_LENGTH: 25000,        // # of lines/subs in topSubredditFile
    REQUEST_DELAY: 1000,                // API request delay

    POST_TO_SUBREDDIT: "YourSubreddit",
    BOT_SUBREDDIT : "r/YourSubreddit",
    BOT_NAME : "YourBotName",
    BOT_FLAIR : "SubmissionFlair",

    // Programmmer information (footer section)
    PROGRAMMER : "empty_vacuum",
    GITHUB_LINK : "https://github.com/mt-empty/potentialSubsBot"

});