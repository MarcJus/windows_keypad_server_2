import net, {Server} from "net";
import { executeKey } from "./process";
import commands, { Key } from "./commands";
import config from "./config.json";

const server: Server = net.createServer();
const port = config.port;

server.on("connection", (socket: net.Socket) => {
    const clientAddress: string | undefined = socket.remoteAddress;
    console.log(`Nouvelle connexion : ${clientAddress}`);
    socket.setEncoding("utf-8");

    // Timeout 10 secondes
    socket.setTimeout(config.timeout, () => {
        socket.write("error");
        console.log(`${clientAddress} : Timeout`);
    });

    // Reception de données
    socket.on("data", async (data: Buffer) => {
        const string_data: string = data.toString("utf-8");
        console.log(`Message de ${clientAddress} : ${string_data}`);
        if(isKey(string_data)){
            try {
                const command_exec_information = await executeKey((string_data as Key));
                console.log(command_exec_information.message);
                send_response(socket, "success");
            } catch (e: any) {
                console.error("Erreur!");
                console.log(e.message);
                send_response(socket, "error");
            }
        }
        
    });

});

server.listen(port, () => {
    console.log("Serveur démarré sur le port "+port);
});

type ResponseSocket = "success" | "error";

function send_response(socket: net.Socket, message: ResponseSocket): void{
    const clientAddress: string | undefined = socket.remoteAddress;
    if(!socket.destroyed){
        socket.write(message, (error: Error | undefined) => {
            if(error){
                console.log(`Impossible d'envoyer ${message} à ${clientAddress} : ${error}`);
            } else {
                console.log(`Message envoyé à ${clientAddress} : ${message}`);
            }
        });
    } else {
        console.log(
            `Impossible d'envoyer ${message} à ${clientAddress} : la connexion est terminée`);
    }
}

function isKey(message: string): boolean{
    return commands[(message as Key)] !== undefined;
}
