const bedrock = require("bedrock-protocol");
const Config = require("./server/get_config");
const lang = require("./server/terminal/term-lang");
clientsadded = []
const readline = require("readline").createInterface({input: process.stdin, output: process.stdout})
async function getterminput() {
    return readline.question("> ", response => {
        console.log(response);
        getterminput()
    })
}
async function yarnmc() {
    new lang.terminal().welcomeMessage()
    try {
        readline.on("SIGINT", () => {
            new lang.terminal().serverEvent("good", "Saving player data... (Terminating server)")
            for (i=0; i < clientsadded.length; i++) {
                console.log(i)
            }
            new lang.terminal().serverEvent("bad", "Terminating server...")
            process.exit(0)
        })
        const server = bedrock.createServer({
            host: new Config().host,
            port: new Config().port,
            offline: new Config().offline,
            maxPlayers: new Config().maxPlayerCount,
            version: new Config().version,
            motd: {
                motd: new Config().motd
            }
        })
        new lang.terminal().serverEvent("good", `YarnMC started with no issues!`)
        getterminput();
        server.on("connect", client => {
            client.on("packet", (packet) => {
                name = packet.name
                params = packet.data.params
            })
            client.on("join", () => {
                if (new Config().joinLog) {
                    new lang.terminal().joinLogs("join", client.userData.displayName)
                }
                client.write("resource_packs_info", {
                    must_accept: false,
                    has_scripts: false,
                    behaviour_packs: [],
                    texture_packs: []
                })
                client.write("resource_pack_stack", {
                    must_accept: false,
                    behavior_packs: [],
                    resource_packs: [],
                    game_version: new Config().version,
                    experiments: [],
                    experiments_previously_used: false
                })
                client.once(`resource_pack_client_response`, async () => {
                    client.write("network_settings", {compression_threshold: 1})
                })
            })
            client.on("close", () => {
                if (new Config().joinLog) {
                    new lang.terminal().joinLogs("leave", client.userData.displayName)
                }
            })
        })
    } catch (fatalerror) {
        new lang.terminal().fatalError(fatalerror)
    }
}
yarnmc()