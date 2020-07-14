// A class for a potential subreddit, Holds a single match
class PotentialSubreddit {
    constructor(subredditName, comment) {
        this.subredditName = subredditName
        this.comment = comment
        this.parentsubreddit = comment.subreddit_name_prefixed
        this.permalink = comment.permalink
        this.upvotes = comment.ups
        this.created_utc = comment.created_utc
    }
}
// Holds a list of potential subreddit objects
class PotentialArray {
    constructor() {
        this.Queue = []
    }

    addPotentialSubreddit(PotentialSubreddit) {
        this.Queue.push(PotentialSubreddit)
    }

    /**
     * returns up to the upper limit number of matches from the Queue
     * @param {int} upperElements 
     */
    getPotentialArray(upperElements) {
        // let sortedArray = JSON.parse(JSON.stringify(this.Array))
        let sortedArray = this.Queue.splice(0, upperElements)
        sortedArray.sort((firstEl, secondEl) => parseInt(secondEl.upvotes) - parseInt(firstEl.upvotes))
        // this.emptyArray()
        return sortedArray
    }

    emptyArray() {
        this.Queue = []
    }
    getSize() {
        return this.Queue.length
    }
    isFull() {
        return
    }
}

module.exports = {
    PotentialSubreddit,
    PotentialArray
};
