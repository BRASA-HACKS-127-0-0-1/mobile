import {collection, query, getDocs} from "firebase/firestore";
import {db} from "./config";

export async function getPolygons() {
    const result = [];
    const q = query(collection(db, "polygon"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });
    return result;
}
