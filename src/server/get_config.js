const yaml = require("yaml"); const fs = require("fs"); const termcolor = require("./terminal/term-colors"); const termlog = require("./terminal/term-lang")
getter = yaml.parse(fs.readFileSync("./config.yml", "utf-8"))
module.exports =  class config {
    constructor() {
        this.world = getter.world
        this.host = getter.host
        this.port = getter.port
        this.offline = getter.offline
        this.maxPlayerCount = getter.maxPlayerCount
        this.logging = getter.logging
        this.version = getter.version
        this.chatLog = getter.chatLog
        this.joinLog = getter.joinLog
    }
}