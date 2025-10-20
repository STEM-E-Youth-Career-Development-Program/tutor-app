import "./ViewTutorInfo.css";
import { useGetTutorByIdQuery, useUpdateTutorByIdMutation } from "../state/tutorsSlice";
import { useGetStudentByIdQuery } from "../state/studentsSlice";
import { useParams } from "react-router-dom"
import { React, useEffect, useCallback, useState } from 'react'
import { Link } from "react-router-dom"

import { firebaseApp } from "../firebaseApp";
import { getFirestore, getDoc, doc } from "firebase/firestore";

import Availability from "../components/Availability/Availability";
import Status from "../components/Status.js";



/**
 * @typedef {import("../state/tutorsSlice").TutorData} TutorData  
 */

/**
 * @param {Object} params
 * @param {TutorData} params.tutor 
 * @returns {React.JSX.Element}
 */

export default function ViewTutorInfo() {
    const { id } = useParams();
    const { data: tutor, isLoading, isError } = useGetTutorByIdQuery(id);

    return isError ? `Failed to find tutor with id ${id}` : isLoading ? "Loading..." : <>
        <h1 className="view-tutor-info-h2">{tutor.firstName} {tutor.lastName}</h1>
        <div className="view-tutor-info-box">
            <LeftStats tutor={tutor} tutorId={id} />
            <RightStats tutor={tutor} tutorId={id} />

        </div>
    </>

}

function LeftStats({ tutor, tutorId }) {

    const [updateTutor] = useUpdateTutorByIdMutation();
    const updateTutorStatus = (event) => {
        updateTutor({ ...tutor, id: tutorId, status: event.target.value })
    }

    return <>
        <div className="tutor-stats-parent">
            <b>Status: </b>
            {/* Update a tutor's status here */}
            <Status person={tutor} onChange={updateTutorStatus} options={["Currently Tutoring", "Matching in Progress", "Unmatched Tutor", "Update Needed"]} />
            <br></br>
            <br></br>
            <b>Grade Level: </b> {tutor.grade}
            <br></br>
            <br></br>
            <b>Math Subjects: </b> {tutor.mathSubjects.length > 0 ? tutor.mathSubjects.join(", ") : "N/A"}<br />
            <b>Science Subjects: </b> {tutor.scienceSubjects.length > 0 ? tutor.scienceSubjects.join(", ") : "N/A"}<br />
            <b>English Subjects: </b> {tutor.englishSubjects.length > 0 ? tutor.englishSubjects.join(", ") : "N/A"}<br />
            <b>Social Studies Subjects: </b> {tutor.socialStudiesSubjects.length > 0 ? tutor.socialStudiesSubjects.join(", ") : "N/A"}<br />
            <b>Miscellaneous Subjects: </b> {tutor.miscSubjects.length > 0 ? tutor.miscSubjects.join(", ") : "N/A"}<br />
            <b>Other (unlisted) Subjects: </b> {tutor.otherSubjects ?? "N/A"}
            <br></br>
            <br></br>
            <b>Virtual or In-Person: </b> {tutor.inPerson && tutor.virtual ? "Both" : tutor.inPerson ? "In-Person" : "Virtual"}
            <br></br>
            <br></br>
            <b>Contact Information: </b>{tutor.email}
            <br></br>
            <a href={"mailto:" + tutor.email}><span className="email-small-text">SEND AN EMAIL</span></a>
            <br></br>
            <br></br>
            <b>Number of Students: </b> {Object.keys(tutor.students ?? {}).length}
            <br></br>
            <br></br>
            <b>Availibility:</b>
            <br />

            <Availability person={tutor} />
        </div>
    </>
}

function RightStats({ tutor, tutorId }) {
    const [showEditors, setShowEditors] = useState(false)
    
    const [studentData, setStudentData] = useState({})

    const [newStudentId, setNewStudentId] = useState("")

    const { data: student, isError, isLoading } = useGetStudentByIdQuery(newStudentId)

    useEffect(() => {
        if(tutor.students.length !== 0) {
            tutor.students.map((studentId, index) => {
                setNewStudentId(String(studentId))
            })
        }
    }, [tutor.students])

    const addToStudentData = useCallback((addition) => {
        setStudentData(prevList => ({ ...addition, ...prevList }))
        setAddStudentInput("")
    }, [])

    const [updateTutor] = useUpdateTutorByIdMutation();

    const checkStudentExists = useCallback(async (studentId) => {
        const db = getFirestore(firebaseApp)
        const docRef = doc(db, "students", studentId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const s = docSnap.data()
            const subjects = {
                mathSubjects: Array.from(new Set(s.mathSubjects).intersection(new Set(tutor.mathSubjects))),
                scienceSubjects: Array.from(new Set(s.scienceSubjects).intersection(new Set(tutor.scienceSubjects))),
                englishSubjects: Array.from(new Set(s.englishSubjects).intersection(new Set(tutor.englishSubjects))),
                socialStudiesSubjects: Array.from(new Set(s.socialStudiesSubjects).intersection(new Set(tutor.socialStudiesSubjects))),
                miscSubjects: Array.from(new Set(s.miscSubjects).intersection(new Set(tutor.miscSubjects))),
                otherSubjects: Array.from(new Set(s.otherSubjects).intersection(new Set(tutor.otherSubjects)))
            }
            addToStudentData({ [studentId]: { "name": student.firstName + " " + student.lastName, "grade": student.grade, ...subjects } })
            
        } else {
            alert(String(studentId) + " not found")
            setNewStudentId("")
        }
    }, [student, addToStudentData])

    useEffect(() => {
        if (!isLoading && newStudentId !== "") {
            checkStudentExists(newStudentId)
        }
    }, [isLoading, newStudentId, checkStudentExists])

    //the input in the 'Add Student' text field in Edit Students
    const [addStudentInput, setAddStudentInput] = useState("")

    // called on clicking Upload Edits button
    // currently uploads only student IDs
    // tutorsSlice may need a new property tutorData for storing both student IDs and subjects tutored
    function UploadEdits() {
        if(tutorId !== undefined){
            updateTutor({
                ...tutor,
                id: tutorId,
                students: Object.keys(studentData),
                // tutorData: Object.fromEntries(
                //     Object.entries(studentData).map(([studentId, info]) => [
                //         studentId,
                //         {
                //             mathSubjects: info.mathSubjects ?? [],
                //             scienceSubjects: info.scienceSubjects ?? [],
                //             englishSubjects: info.englishSubjects ?? [],
                //             socialStudiesSubjects: info.socialStudiesSubjects ?? [],
                //             miscSubjects: info.miscSubjects ?? [],
                //             otherSubjects: info.otherSubjects ?? ""
                //         }
                //     ])
                // )
            })
        }
        else {
            console.log("tutorId is undefined")
            return
        }    
        console.log("Uploaded Edits")
    }

    const joinSubjectsForDisplay = (info) => {
        if (!info) return "N/A"
        const combined = [
            ...(info.mathSubjects || []),
            ...(info.scienceSubjects || []),
            ...(info.englishSubjects || []),
            ...(info.socialStudiesSubjects || []),
            ...(info.miscSubjects || [])
        ]
        if (info.otherSubjects) combined.push(info.otherSubjects)
        return combined.length ? combined.join(", ") : "N/A"
    }
    
    // test student ID leFaNrKmmcXWjr6RvIPb sUbmM6OEZotTA3NMVQvw
    return (
        <div className="tutor-right-stats">
            <h3>Current Tutees: {Object.keys(studentData).length}</h3>
            <table className="tutees-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student Grade Level</th>
                        <th>Subjects Tutored</th>
                    </tr>
                </thead>
                <tbody>
                {Object.keys(studentData).map((id) => (
                    <tr key={id}>
                        <td>{id ? <Link to={`/view-student-info/${id}`}> {studentData[id].name}</Link> : "N/A"}</td>
                        <td>{studentData[id].grade}</td>
                        <td>{joinSubjectsForDisplay(studentData[id])}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="edit-tutees" onClick={() => setShowEditors(!showEditors)} style={{"cursor": "pointer"}}>Edit Tutees</p>
        
            {!showEditors ? null :
                <>
                    <div style={{ "display": "flex", "flex-direction": "column" }}>
                        <div>
                            <button onClick = {() => UploadEdits()} style={{"cursor": "pointer", "fontSize": "1.25rem", "color": "white", "backgroundColor": "red" }}>&#9888; Upload edits</button>

                        </div>
                        <br></br>
                        <div class="add-student">
                            <input placeholder="Student Id" onChange={(e) => setAddStudentInput(e.target.value)} style={{ "flex": "1" }}></input>
                            <button onClick={() => setNewStudentId(addStudentInput)} style={{ "cursor": "pointer", "flex-basis": "30%", "fontSize": "1rem", "backgroundColor": "#6260EF" }}>Add Student</button>
                        </div>
                        <br></br>
                        {Object.entries(studentData).map(([studentId, studentInfo]) => (
                            <div key={`se${studentId}`} className="student-editor">
                                <button onClick={() => { setStudentData(Object.fromEntries(Object.entries(studentData).filter(([k, v]) => k !== String(studentId)))) }}
                                    style={{ "cursor": "pointer", "alignSelf": "end", color:"Black", "backgroundColor": "#ffca54", "fontSize": "0.9rem" }} >
                                    &#9587; Delete
                                </button>
                                <div>
                                    Name: {studentInfo["name"]}
                                </div>
                                <div>
                                    Key: {studentId}
                                </div>

                                <div>Math Subjects:</div>
                                <input
                                    type="text"
                                    value={(studentInfo.englishSubjects || []).join(", ")}
                                    onChange={(e) => {
                                        const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                        setStudentData(prev => ({ ...prev, [studentId]: { ...prev[studentId], englishSubjects: arr } }))
                                    }}
                                />

                                <div>English Subjects:</div>
                                <input
                                    type="text"
                                    value={(studentInfo.englishSubjects || []).join(", ")}
                                    onChange={(e) => {
                                        const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                        setStudentData(prev => ({ ...prev, [studentId]: { ...prev[studentId], englishSubjects: arr } }))
                                    }}
                                />

                                <div>Social Studies Subjects:</div>
                                <input
                                    type="text"
                                    value={(studentInfo.socialStudiesSubjects || []).join(", ")}
                                    onChange={(e) => {
                                        const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                        setStudentData(prev => ({ ...prev, [studentId]: { ...prev[studentId], socialStudiesSubjects: arr } }))
                                    }}
                                />

                                <div>Misc Subjects:</div>
                                <input
                                    type="text"
                                    value={(studentInfo.miscSubjects || []).join(", ")}
                                    onChange={(e) => {
                                        const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                        setStudentData(prev => ({ ...prev, [studentId]: { ...prev[studentId], miscSubjects: arr } }))
                                    }}
                                />

                                <div>Other Subjects (free text):</div>
                                <input
                                    type="text"
                                    value={studentInfo.otherSubjects ?? ""}
                                    onChange={(e) => setStudentData(prev => ({ ...prev, [studentId]: { ...prev[studentId], otherSubjects: e.target.value } }))}
                                />
                            </div>
                        ))}
                    </div>
                </>
            }
        
        </div>

    );

    
}