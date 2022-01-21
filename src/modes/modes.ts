/**
 * Liste des touches numéros
 */
export type NumberKey = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

type ListenerFunction = (...args: string[]) => void



const listeners_list: Record<string, ListenerFunction> = {};

export default listeners_list;
