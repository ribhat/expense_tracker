import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"



export const useGetTransactions = () => {
    const {userID} = useGetUserInfo();

    const [transactions, setTransactions] = useState([])
    const [transactionTotals, setTransactionTotals] = useState({balance: 0.0, income: 0.0, expenses: 0.0})

    const transactionCollectionRef = collection(db, "transactions")
    

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = 
            query(
                transactionCollectionRef,
                where("userID", '==', userID),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => { //snapshot is what is returned by the query, in this case a list of all the documents
                let docs = [];  //this will hold a list of all our documents in a format we want
                let totalIncome = 0;
                let totalExpenses = 0;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({...data, id})

                    if (data.transactionType === "expense") {
                        totalExpenses += Number(data.transactionAmount);
                    } else {
                        totalIncome += Number(data.transactionAmount);
                    }
                });

                setTransactions(docs);
                let balance = totalIncome - totalExpenses;
                setTransactionTotals({balance, expenses: totalExpenses, income: totalIncome})

            })



        } catch (err) {
            console.error(err)
        }
        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return { transactions, transactionTotals };

}