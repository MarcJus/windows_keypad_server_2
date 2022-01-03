import { executeKey } from "./process";
import { Key } from "./commands";
import config from "./config.json";
import express from "express";

const app = express();
const port = config.port;

app.get("/key/:key",async (request, response) => {
    const key = request.params.key;

    try {
        const command_exec_information = await executeKey((key as Key));
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