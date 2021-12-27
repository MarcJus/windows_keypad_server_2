var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import qs from "qs";
function key_5() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = "https://platypus.go.yj.fr/apiEC/devoirs/";
            const identification = {
                "username": "MarcJus",
                "password": "Hen12goa"
            };
            const axios_request = yield axios.post(url, qs.stringify(identification));
            const datas = axios_request.data;
            datas.forEach((data) => {
                console.log("Devoir en " + data.matiere + " pour le " + data.day + ":");
                console.log(data.aFaire.contenu);
                console.log("");
            });
        }
        catch (e) {
            console.log("Erreur axios");
            console.log(e.response.data);
        }
    });
}
const opera_path = "\"C:\\Users\\jusse\\AppData\\Local\\Programs\\Opera GX\\launcher.exe\"";
const commands = {
    1: "code",
    2: opera_path,
    3: opera_path + " https://www.ecoledirecte.com",
    4: "\"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe\" https://www.google.com/",
    5: key_5,
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
