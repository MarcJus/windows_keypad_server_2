import net, {Server} from "net";

const server: Server = net.createServer();
const port = 3001;

server.on("connection", (socket: net.Socket) => {
    
});
