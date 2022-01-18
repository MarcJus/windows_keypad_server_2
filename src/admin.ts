import { Socket } from "net";
import commands, { Key, KeyFunction } from "./commands";

export type AdminMessages = "get-keys" | "edit-key";

type ListeAdmin = {
    [Key in AdminMessages]: (socket: Socket) => void
}

const administration: ListeAdmin = {
    "get-keys": (socket: Socket) => {
        console.log("get-keys");
        const keys_list: Record<string, string> = {};
        Object.keys(commands).forEach((key) => {
            const command = commands[(key as Key)];
            if(typeof command === "string"){
                keys_list[key] = command;
            } else {
                const func: KeyFunction = command;
                keys_list[key] = `[FUNCTION] : ${func.name}`;
            }
        });
        socket.write(JSON.stringify(keys_list));
    },
    "edit-key": () => {
        console.log("edit-keys");
    }
};

export default administration;