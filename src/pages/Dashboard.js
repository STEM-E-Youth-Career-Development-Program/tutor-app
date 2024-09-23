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

function ViewButton({ to, title }){
    return(
        <Link to={to}>
            {title}
        </Link>
    );
}

function ViewBody() {
    return(
        <div className="view-parent">
            <ViewButton to="/view-tutors" title="View Tutors" />
            <ViewButton to="/view-students" title="View Students" />
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







