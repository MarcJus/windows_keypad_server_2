/**
 * Liste des touches numéros
 */
export type NumberKey = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

type ListenerFunction = (key: string) => void

async function listener_key_5(key: string): Promise<void> {
    console.log("");
}

const listeners_list: Record<string, ListenerFunction> = {};

export default listeners_list;
