import { exec } from "child_process";

export type Key = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
                 | "A" | "B" |"C" | "D" | "*" | "#";

/**
 * Informations sur la commande executée
 */                 
interface CommandExecInformation {
    /**
     * `true` si `exec()` a retourné une erreur ou un stderr
     */
    error: boolean,

    /**
     * Retourne le message stdout ou stderr en cas d'erreur
     */
    message: string

}

export async function executeKey(key: Key): Promise<CommandExecInformation | null>{
    let result: CommandExecInformation = {
        error: false,
        message: ""
    };
    

    return result;
}
