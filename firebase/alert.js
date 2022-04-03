import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./config";

class Alert {
    constructor ( descricao, aviso_cor, severidade, riscos, instrucoes ) {
        this.descricao = descricao; // Ocorrencias
        this.aviso_cor = aviso_cor; // Hexa
        this.severidade = severidade; // Intensidade
        this.riscos = riscos; // Descricao Tecnica
        this.instrucoes = instrucoes; // Lista de Acoes
    }
    toString() {
        return this.severidade;
    }
}

async function getAlerts(){
    const result = [];
    const q = query(collection(db, "alerts"), where("capital", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(new Alert(doc.data()));
    });
    return result;
}
