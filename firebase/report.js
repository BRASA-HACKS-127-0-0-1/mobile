import {collection, query, getDocs, setDoc, doc} from "firebase/firestore";
import uuid from "react-native-uuid";
import {db} from "./config";

export async function addReport(data) {
    await setDoc(doc(db, "reports", uuid.v4()), {
        descricao: data.descricao,
        latitude: data.latitude,
        longitude: data.longitude,
        weight: data.weight
    });
}

export async function getReports() {
    const result = [];
    const q = query(collection(db, "reports"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });
    return result;
}
