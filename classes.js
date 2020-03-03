// A class for potential subreddit, Holds a single match
class PotentialSubreddit {
    constructor(subredditName, comment) {
        this.subredditName = subredditName
        this.comment = comment
        this.parentsubreddit = comment.subreddit_name_prefixed
        this.permalink = comment.permalink
        this.upvotes = comment.ups
    }
}
// Holds potential subreddit objects
class PotentialArray {
    constructor() {
        this.Stack = []
    }
    addPotentialSubreddit(PotentialSubreddit) {
        this.Stack.push(PotentialSubreddit)
    }

    getPotentialArray(upperElements) {
        // let sortedArray = JSON.parse(JSON.stringify(this.Array))
        let sortedArray = this.Stack.splice(0, upperElements)
        sortedArray.sort((firstEl, secondEl) => parseInt(secondEl.upvotes) - parseInt(firstEl.upvotes))
        // this.emptyArray()
        return sortedArray
    }

    emptyArray() {
        this.Stack = []
    }
    getSize() {
        return this.Stack.length
    }
    isFull() {
        return
    }
}

module.exports = {
    PotentialSubreddit,
    PotentialArray
};
