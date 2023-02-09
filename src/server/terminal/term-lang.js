const colors = require("./term-colors");
const padding = (num) => {
    if (num < 10) {
        return "0" + String(num)
    } else {
        return num
    }
}
class terminal {
    constructor() {
        this.chat = function(source, msg) {
            console.log(`${colors.dark_gray}[ ${colors.white}${padding(new Date().getHours())}:${padding(new Date().getMinutes())}:${padding(new Date().getSeconds())} - ${colors.yellow}CHAT${colors.dark_gray} ] ${source}: ${msg}${colors.reset}`)
        };
        this.serverEvent = function (type, msg) {
            if (type === "good") {
                console.log(`${colors.dark_gray}[ ${colors.white}${padding(new Date().getHours())}:${padding(new Date().getMinutes())}:${padding(new Date().getSeconds())} - ${colors.cyan}SERVER${colors.dark_gray} ] ${colors.green}${msg}${colors.reset}`)
            }
            if (type === "bad") {
                console.log(`${colors.dark_gray}[ ${colors.white}${padding(new Date().getHours())}:${padding(new Date().getMinutes())}:${padding(new Date().getSeconds())} - ${colors.cyan}SERVER${colors.dark_gray} ] ${colors.red}${msg}${colors.reset}`)
            }
        };
        this.fatalError = function (msg) {
            console.log(`${colors.dark_gray}[ ${colors.white}${padding(new Date().getHours())}:${padding(new Date().getMinutes())}:${padding(new Date().getSeconds())} - ${colors.red}ERROR${colors.dark_gray} ] ${colors.reset}${msg}${colors.reset}`)
        };
        this.welcomeMessage = function () {
            console.log(`\u001b[22m${colors.gray}Welcome to ${colors.white}YarnMC! ${colors.gray}You are on version ${colors.green}${require("../../package.json").version}${colors.gray}!`)
        };
        this.joinLogs = function (type, player) {
            if (type === "leave") {
                console.log(`${colors.dark_gray}[ ${colors.white}${padding(new Date().getHours())}:${padding(new Date().getMinutes())}:${padding(new Date().getSeconds())} - ${colors.yellow}PLAYER${colors.dark_gray} ] ${colors.reset}${player} left the game!${colors.reset}`)
            };
            if (type === "join") {
                console.log(`${colors.dark_gray}[ ${colors.white}${padding(new Date().getHours())}:${padding(new Date().getMinutes())}:${padding(new Date().getSeconds())} - ${colors.yellow}PLAYER${colors.dark_gray} ] ${colors.reset}${player} joined the game!${colors.reset}`)
            }
        };
    }
}
module.exports = {
    terminal: terminal
}