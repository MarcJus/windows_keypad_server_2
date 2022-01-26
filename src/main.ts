import { executeKey } from "./commands/process";
import { Key } from "./commands/commands";
import config from "./config.json";
import express from "express";

const app = express();
const port = config.port;

export let last_key: Key | undefined = undefined;
export let last_message_sent: string | undefined = undefined;

app.get("/key/:key",async (request, response) => {
    const key = request.params.key;
    last_key = (key as Key);
    console.log(`Key : ${key}`);

    try {
        const command_exec_information = await executeKey((key as Key));
        last_message_sent = command_exec_information.message;
        console.log(command_exec_information.message);
        response.send(command_exec_information.message);
    } catch (e: any) {
        console.error("Erreur!");
        console.log(e.message);
        response.status(500).send(e.message+"\n");
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
