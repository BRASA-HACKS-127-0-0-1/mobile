import {collection, query, getDocs, setDoc, doc} from "firebase/firestore";
import uuid from "react-native-uuid";
import {db} from "./config";
export async function getPolygons() {
    const result = [];
    const q = query(collection(db, "polygons"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });
    return result;
}
