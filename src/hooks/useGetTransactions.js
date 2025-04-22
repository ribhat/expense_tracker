import { query, collection, where, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"



export const useGetTransactions = () => {
    const {userID} = useGetUserInfo();

    const [transactions, setTransactions] = useState([])

    const transactionCollectionRef = collection(db, "transactions")
    

    const getTransactions = async () => {
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", '==', userID),
                orderBy("createdAt"
                ))


        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getTransactions();
    }, [])

}