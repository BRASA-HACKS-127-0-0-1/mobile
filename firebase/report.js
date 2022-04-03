import {collection, query, where, getDocs, setDoc, doc} from "firebase/firestore";
import {db} from "./config";

class Report {
    constructor(descricao, lat, long, intesidade) {
        this.descricao = descricao; // Descricao
        this.lat = lat; // Latitude
        this.long = long; // Longitude
        this.intesidade = intesidade; // Intensidade
    }

    toString() {
        return this.descricao;
    }
}

async function addReport(data) {
    await setDoc(doc(db, "reports"), {
        descricao: data.descricao,
        lat: data.lat,
        long: data.long,
        intesidade: data.intesidade
    });
}

async function getReports() {
    const result = [];
    const q = query(collection(db, "reports"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(new Report(doc.data()));
    });
    return result;
}
