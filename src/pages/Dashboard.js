import { useEffect, useState } from "react";
import "./Dashboard.css"
import { useFirebaseApp } from "../FirebaseAppContext";
import { Link, useNavigate } from "react-router-dom";

import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { useGetNumberOfTutorsQuery } from "../state/tutorsSlice";

function Statistics() {
    const firebaseApp = useFirebaseApp()
    const db = getFirestore(firebaseApp)
    const [numberUnmatchedStudents, setNumberUnmatchedStudents] = useState("")


    const fetchNumberUnmatched = async () => {
        const studentsCollection = collection(db, "students")
        // query 
        const q = query(studentsCollection, where("status", "==", "unmatched"))
        const querySnapshot = await getDocs(q)
        setNumberUnmatchedStudents(querySnapshot.size)
    }

    useEffect(() => {
        fetchNumberUnmatched()
    })

    const { data } = useGetNumberOfTutorsQuery()

    return <div className="stats-parent">
        <div>
            <h1>
                {numberUnmatchedStudents} Unmatched Students<br />{data} Available Tutors
            </h1>    
        </div>
    </div>
}

function ViewButton1(){
    return(
        <button><Link to="/view-tutors" style={{"color":"inherit", "textDecoration":"inherit"}}>
            View Tutors
        </Link></button>
    );
}

function ViewButton2(){
    return(
        <button><Link to="/view-tutors" style={{"color":"inherit", "textDecoration":"inherit"}}>
            View Students
        </Link></button>
    );
}

function ViewBody() {
    return(
        <div className="view-parent">
            <ViewButton1 />
            <ViewButton2 />
        </div>
    );
}

export default function Dashboard() {
    return(
        <div className="top">
            <Statistics />
            <ViewBody />
        </div>
    );
}







