import "./ViewTutorInfo.css";
import { useGetTutorByIdQuery, useUpdateTutorByIdMutation } from "../state/tutorsSlice";
import { useGetStudentByIdQuery } from "../state/studentsSlice";

import { useParams } from "react-router-dom"
import { React, useEffect, useCallback, useState } from 'react'

import { firebaseApp } from "../firebaseApp";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";


/**
 * @typedef {import("../state/tutorsSlice").TutorData} TutorData
 */

/**
 * @param {Object} params
 * @param {TutorData} params.tutor 
 * @returns {React.JSX.Element}
 */

function LeftStats({ tutor, tutorId }){
    const [updateTutor] = useUpdateTutorByIdMutation();
    const updateTutorStatus = (event) => {
        updateTutor({ ...tutor, id: tutorId, status: event.target.value })
    }
    // function countTutees(tutorId) {
    //     return tutees.filter(student => student.tutorId === tutorId).length;
    // }
    
    const numStudents = Object.keys(tutor.students).length

    return <>
        <div className="tutor-stats-parent">
            <b>Status: </b>
            {/* Update a tutor's status here */}
            <select onChange={updateTutorStatus} defaultValue={tutor.status}>
                <option value={"currentlyTutoring"}>Currently Tutoring</option>
                <option value={"matchingInProgress"}>Matching in Progress</option>
                <option value={"unmatched"}>Unmatched Tutor</option>
                <option value={"updateNeeded"}>Update Needed</option>
            </select>

            <br></br>
            <br></br>
            <b>Grade Level: </b> {tutor.grade}
            <br></br>
            <br></br>
            <b>Math Subjects: </b> {tutor.mathSubjects.join(", ") || "N/A"}<br/>
            <b>Science Subjects: </b> {tutor.scienceSubjects.join(", ") || "N/A"}<br/>
            <b>English Subjects: </b> {tutor.englishSubjects.join(", ") || "N/A"}<br/>
            <b>Social Studies Subjects: </b> {tutor.socialStudiesSubjects.join(", ") || "N/A"}<br/>
            <b>Miscellaneous Subjects: </b> {tutor.miscSubjects.join(", ") || "N/A"}<br/>
            <b>Other (unlisted) Subjects: </b> {tutor.otherSubjects || "N/A"}
            <br></br>
            <br></br>
            <b>Virtual or In-Person: </b> {tutor.inPerson && tutor.virtual ? "Both" : tutor.inPerson ? "In-Person" : "Virtual"}
            <br></br>
            <br></br>
            <b>Contact Information: </b>{tutor.email}
            <br></br>
            <a href={"mailto:" + tutor.email}><p3>SEND AN EMAIL</p3></a>
            <br></br>
            <br></br>
            <b>Number of Tutees: </b> {numStudents}
            <br></br>
            <br></br>
            <b>Availibility:</b>
            <br />
            <Availability tutor={tutor} />
            <AvailabilityChart />
        </div>
    </>
}

function Availability({ tutor }){
    const isAvailable = (day, time) => {
        return tutor.availability[3*day+time];
    }

    const getClassName = (day, time) => {
        return isAvailable(day, time) ? "available" : "unavailable";
    }

    return <> 
        <div className="availability-table">
            <table>
                <tbody>
                    <tr className="day-headings">
                        <th scope="col"></th>
                        <th scope="col">Mon</th>
                        <th scope="col">Tue</th>
                        <th scope="col">Wed</th>
                        <th scope="col">Thu</th>
                        <th scope="col">Fri</th>
                        <th scope="col">Sat</th>
                        <th scope="col">Sun</th>
                    </tr>
                    <tr>
                        <th scope="row">Morning</th>
                        <td className={getClassName(1,0)}></td>
                        <td className={getClassName(2,0)}></td>
                        <td className={getClassName(3,0)}></td>
                        <td className={getClassName(4,0)}></td>
                        <td className={getClassName(5,0)}></td>
                        <td className={getClassName(6,0)}></td>
                        <td className={getClassName(0,0)}></td>
                    </tr>
                    <tr>
                        <th scope="row">Afternoon</th>
                        <td className={getClassName(1,1)}></td>
                        <td className={getClassName(2,1)}></td>
                        <td className={getClassName(3,1)}></td>
                        <td className={getClassName(4,1)}></td>
                        <td className={getClassName(5,1)}></td>
                        <td className={getClassName(6,1)}></td>
                        <td className={getClassName(0,1)}></td>
                    </tr>
                    <tr>
                        <th scope="row">Evening</th>
                        <td className={getClassName(1,2)}></td>
                        <td className={getClassName(2,2)}></td>
                        <td className={getClassName(3,2)}></td>
                        <td className={getClassName(4,2)}></td>
                        <td className={getClassName(5,2)}></td>
                        <td className={getClassName(6,2)}></td>
                        <td className={getClassName(0,2)}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}

function AvailabilityChart() {
    return (
        <div className="Headings">
            <div className="heading-item available">Available</div>
            <div className="heading-item unavailable">Unavailable</div>
        </div>
    );
}
function RightStats({ tutor }) {
    const [showEditors, setShowEditors] = useState(false)
    // Temporarily add the specific student ID for testing purposes
    const [studentData, setStudentData] = useState({})

    const [newStudentId, setNewStudentId] = useState("")

    const { data: student, isError, isLoading } = useGetStudentByIdQuery(newStudentId)

    useEffect(() => {
        if(tutor.students.length !== 0) {
            tutor.students.map((studentId, index) => {
                setNewStudentId(String(studentId))
            })
        }
        else {
            setNewStudentId("leFaNrKmmcXWjr6RvIPb")
        }
    }, [tutor.students])
    
    const addToStudentData = useCallback((addition) => {
        setStudentData(prevList => ({ ...addition, ...prevList }))
        setAddStudentInput("")
    }, [])

    const checkStudentExists = useCallback(async (studentId) => {
        const db = getFirestore(firebaseApp)
        const docRef = doc(db, "students", studentId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            if (studentId in tutor.students && 'subjectsTutored' in tutor.students[studentId]) { //must retrieve subjectsTutored from studentIds since not included in student object 
                addToStudentData({ [studentId]: { "name": student.firstName + " " + student.lastName, "age": student.age, "grade": student.grade, "subjectsTutored": tutor.students[studentId].subjectsTutored } })
            }
            else {
                addToStudentData({ [studentId]: { "name": student.firstName + " " + student.lastName, "age": student.age, "grade": student.grade } })
            }
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


    return (
        <div className="tutor-right-stats">
            <h3>Current Tutees: {Object.keys(studentData).length}</h3>
            <table className="tutees-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student Age</th>
                        <th>Student Grade Level</th>
                        <th>Subjects Tutored</th>
                    </tr>
                </thead>
                <tbody>
                {Object.keys(studentData).map((name) => (
                    <tr key={name}>
                        <td>{name ? name : "N/A"}</td>
                        <td>{studentData[name].age}</td>
                        <td>{studentData[name].age}</td>
                        <td>{studentData[name].age}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="edit-tutees" onClick={() => setShowEditors(!showEditors)}>Edit Tutees</p>
        
            {!showEditors ? null :
                <>
                    <div style={{ "display": "flex", "flex-direction": "column" }}>
                        <div>
                            <button title="currently inactive" style={{ "fontSize": "1.25rem", "color": "gray", "backgroundColor": "lightblue" }}>&#9888; Upload edits</button>
                        </div>
                        <br></br>
                        <div class="add-student">
                            <input placeholder="Student Id" onChange={(e) => setAddStudentInput(e.target.value)} style={{ "flex": "1" }}></input>
                            <button onClick={() => setNewStudentId(addStudentInput)} style={{ "cursor": "pointer", "flex-basis": "30%", "fontSize": "1rem", "backgroundColor": "#ffca54" }}>Add Student</button>
                        </div>
                        <br></br>
                        {Object.entries(studentData).map(([studentId, studentInfo]) => (
                            <div key={`se${studentId}`} className="student-editor">
                                <button onClick={() => { setStudentData(Object.fromEntries(Object.entries(studentData).filter(([k, v]) => k !== String(studentId)))) }}
                                    style={{ "alignSelf": "end", "backgroundColor": "#FF5050", "fontSize": "0.9rem" }} >
                                    &#9587; Delete
                                </button>
                                <div>
                                    Name: {studentInfo["name"]}
                                </div>
                                <div>
                                    Key: {studentId}
                                </div>
                                <div>
                                    Subjects:
                                </div>
                                <input type='text' defaultValue={studentInfo["subjectsTutored"]} onChange={(e) => setStudentData({ ...studentData, [studentId]: { ...studentData[studentId], "subjectsTutored": e.target.value } })}></input>
                            </div>
                        ))}
                    </div>
                </>
            }
        
        </div>

    );

    
}


function StudentRow({ studentId }) {
    const { data: student, isLoading, isError } = useGetStudentByIdQuery(studentId);

    if (isLoading) return <tr><td colSpan="4">Loading...</td></tr>;
    if (isError) return <tr><td colSpan="4">Failed to load student data</td></tr>;

    return (
        <tr>
            <td>{student.firstName} {student.lastName}</td>
            <td>{student.age}</td>
            <td>{student.grade}</td>
            <td>{[...student.mathSubjects || "", ...student.scienceSubjects || "", ...student.englishSubjects || "", ...student.socialStudiesSubjects || "", ...student.miscSubjects || ""]}</td>
        </tr>
    );
}
function ViewTutorInfo() {;
    const { id } = useParams();
    const { data: tutor, isLoading, isError } = useGetTutorByIdQuery(id);
   
    

    return isError ? `Failed to find tutor with id ${id}` : isLoading ? "Loading..." : <>
        <h1 className="view-tutor-info-h2">{tutor.firstName} {tutor.lastName}</h1>
        <div className="view-tutor-info-box">
            <LeftStats tutor={tutor} tutorId={id}/>
            <RightStats tutor={tutor}/>
            
        </div>
    </>


}

export default ViewTutorInfo;
