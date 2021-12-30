var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import net from "net";
import { executeKey } from "./process";
import commands from "./commands";
import config from "./config.json";
const server = net.createServer();
const port = config.port;
server.on("connection", (socket) => {
    const clientAddress = socket.remoteAddress;
    console.log(`Nouvelle connexion : ${clientAddress}`);
    socket.setEncoding("utf-8");
    // Timeout 10 secondes
    socket.setTimeout(config.timeout, () => {
        socket.write("error");
        console.log(`${clientAddress} : Timeout`);
    });
    // Reception de données
    socket.on("data", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const string_data = data.toString("utf-8");
        console.log(`Message de ${clientAddress} : ${string_data}`);
        if (isKey(string_data)) {
            try {
                const command_exec_information = yield executeKey(string_data);
                console.log(command_exec_information.message);
                send_response(socket, "success");
            }
            catch (e) {
                console.error("Erreur!");
                console.log(e.message);
                send_response(socket, "error");
            }
        }
    }));
});
server.listen(port, () => {
    console.log("Serveur démarré sur le port " + port);
});
function send_response(socket, message) {
    const clientAddress = socket.remoteAddress;
    if (!socket.destroyed) {
        socket.write(message, (error) => {
            if (error) {
                console.log(`Impossible d'envoyer ${message} à ${clientAddress} : ${error}`);
            }
            else {
                console.log(`Message envoyé à ${clientAddress} : ${message}`);
            }
        });
    }
    else {
        console.log(`Impossible d'envoyer ${message} à ${clientAddress} : la connexion est terminée`);
    }
}
function isKey(message) {
    return commands[message] !== undefined;
}
