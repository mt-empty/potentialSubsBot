module.exports = Object.freeze({
    // RegExp pattern
    REGEX:"YourRegExp" ,    //RegExp goes here

    GREEN_COLOR : "\x1b[33m",
    COLOR_RESET : "\x1b[0m",

    // Files used 
    TOP_SUBREDDIT_FILENAME: "top_subreddits.txt",
    POTENTIAL_SUBREDDIT_FILENAME: "potential_subreddits.txt",

    SCRAPE_TIME : 'week',               // scrape weekly submissions

    // threshold information
    SCRAPE_THRESH_MIN: 25,              // minimum submissions to scrape
    COMMENT_UPVOTE_THRESH: 5,           // # of upvotes required for the match to be considered
    CREATE_POST_THRESH: 25,             // # of matches for a post submission
    POST_INTERVAL: 8 * 60 * 60 * 1000,      // in milliseconds, the bot will make a post every X milliseconds, current is 8 hours

    // meta
    API_RATE_INTERVAL: 60 * 1000,           // in milliseconds, the interval for rate limit message that gets printed to console

    TOP_SUBREDDIT_LENGTH: 25000,        // # of lines/subs in top_subreddit file
    REQUEST_DELAY: 1000,                // in milliseconds, API request delay



    // Bot information
    POST_TO_SUBREDDIT: "YourSubreddit",
    BOT_SUBREDDIT : "r/YourSubreddit",
    BOT_NAME : "YourBotName",
    BOT_FLAIR : "SubmissionFlair",

    // Programmer information (footer section)
    PROGRAMMER : "empty_vacuum",
    GITHUB_LINK : "https://github.com/mt-empty/potentialSubsBot" // if empty string, then it won't be included

});