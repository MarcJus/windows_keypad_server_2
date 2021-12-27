/**
 * Fonction qui ne prend aucun paramètre et qui ne retourne rien. C'est le type de fonction dans
 * le fichier commands.ts
 */
 export type KeyFunction = (() => void);

 export type Key = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0"
                 | "A" | "B" |"C" | "D" | "*" | "#";

const opera_path =
"\"C:\\Users\\jusse\\AppData\\Local\\Programs\\Opera GX\\launcher.exe\"";

const commands = {
    1: "code",
    2: opera_path,
    3: opera_path + " https://www.ecoledirecte.com",
    4: "\"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe\" https://www.google.com/",
    5: "",
    6: "wt.exe ssh pi@rspm",
    7: "wt.exe",
    8: "",
    9: "\"C:\\Users\\jusse\\AppData\\Local\\Postman\\Postman.exe\"",
    "*": "ipconfige",
    0: "ipconfig",
    "#": "ifconfige",
    A: "ipconfig",
    B: "ipconfig",
    C: "ipconfig",
    D: "ipconfig",
};

export default commands;