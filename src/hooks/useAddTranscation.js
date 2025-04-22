import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"

export const useAddTransaction = () => {
    const AddTransaction = async () => {
        const transactionCollectionRef = collection(db, "transactions")

        await addDoc(transactionCollectionRef, {
            userID: "",
            description: "",
            transactionAmount: 0,
            transactionType: "",
            createdAt: serverTimestamp()
        })

    }

    return {addTransaction}
}