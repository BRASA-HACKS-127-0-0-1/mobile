import {collection, query, getDocs, setDoc, doc} from "firebase/firestore";
import uuid from "react-native-uuid";
import { db } from "./config";

class Report {
    constructor(descricao, lat, lng, intesidade) {
        this.descricao = descricao; // Descricao
        this.lat = lat; // Latitude
        this.lng = lng; // Longitude
        this.intesidade = intesidade; // Intensidade
    }

    toString() {
        return this.descricao;
    }
}

export async function addReport(data) {
    await setDoc(doc(db, "reports", uuid.v4()), {
        descricao: data.descricao,
        lat: data.lat,
        lng: data.lng,
        intesidade: data.intesidade
    });
}

export async function getReports() {
    const result = [];
    const q = query(collection(db, "reports"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(new Report(doc.data()));
    });
    return result;
}
