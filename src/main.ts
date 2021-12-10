import net, {Server} from "net";

const server: Server = net.createServer();
const port = 3001;

server.on("connection", (socket: net.Socket) => {
    const clientAddress: string | undefined = socket.remoteAddress;
    console.log(`Nouvelle connexion : ${clientAddress}`);
    socket.setEncoding("utf-8");

    // Timeout 10 secondes
    socket.setTimeout(10000, () => {
        socket.write("error");
        console.log(`${clientAddress} : Timeout`);
    });

    // Reception de données
    socket.on("data", async (data: Buffer) => {
        const string_data: string = data.toString("utf-8");
        console.log(`Message de ${clientAddress} : ${string_data}`);

        
    });

});
