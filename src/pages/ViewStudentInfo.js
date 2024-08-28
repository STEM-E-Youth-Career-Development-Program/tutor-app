import React, { useState } from "react";
import "./ViewStudentInfo.css";
import "./ViewTutorInfo.css"
import { useGetStudentByIdQuery, useUpdateStudentByIdMutation } from "../state/studentsSlice";
import { useParams } from "react-router-dom"

function LeftStats({ student, studentId }) {
    const [updateStudent] = useUpdateStudentByIdMutation();
    const updateStudentStatus = (event) => {
        updateStudent({ ...student, id: studentId, status: event.target.value })
    }
    let subjects = [...student.mathSubjects];
    subjects.push(...student.scienceSubjects, ...student.englishSubjects, ...student.socialStudiesSubjects, ...student.miscSubjects, ...student.otherSubjects);

    //Age, parent email,nor emergency contact email doesn't seem to be part of the database according to studentsSlice notes
    return (
        <div className="tutor-stats-parent">
            <p><b>Status: </b> 
            <select onChange={updateStudentStatus} defaultValue={student.status}>
                <option value={"matched"}>Matched</option>
                <option value={"matchingInProgress"}>Matching in Progress</option>
                <option value={"unmatched"}>Unmatched Student</option>
                <option value={"updateNeeded"}>Update Needed</option>
            </select></p>
            <b>Grade: </b> {student.grade}
            <br />
            <b>Subjects: </b> {subjects.join(", ")}
            <br />
            <b>Virtual or In-Person: </b> {student.inPerson && student.virtual ? "No preference" : student.inPerson ? "In-Person" : "Virtual"}
            <br />
            <b>Contact Information: </b> {student.email}
            <br />
            <a href={"mailto:" + student.email}>Send an Email</a>

            <br />
            <br />
            <Availability student={student} />
            <AvailabilityChart />
        </div>
    );
}


function Availability({ student }){
    const isAvailable = (day, time) => {
        return student.availability[3*day+time];
    }

    const getClassName = (day, time) => {
        return isAvailable(day, time) ? "available" : "unavailable";
    }

    return <> 
        <div class="availability-table">
            <table>
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

function RightStats({ student, studentId }) {

    const [notes, setNotes] = useState(student.notes);

    const handleInputChange = (event) => {
        setNotes(event.target.value);
    };

    const [updateStudent] = useUpdateStudentByIdMutation();
    const updateNotes = (event) => {
        updateStudent({ ...student, id: studentId, notes: notes })
    }


    return (
        <div className="availability-section">
            <p>Notes:</p>
            <div className="notesbox">
                <textarea value={notes} onChange={handleInputChange} placeholder="Enter notes here..." />
                <button onClick={updateNotes}>Save Notes</button>
                {/* {savedNotes && (
                    <div className="saved-notes">
                        <p><b>Saved Notes:</b></p>
                        <p>{savedNotes}</p>
                    </div>
                )} */}
            </div>
        </div>
    );
}

function ViewStudentInfo() {
    const { id } = useParams();
    const { data: student, isLoading, isError } = useGetStudentByIdQuery(id);

    return student === undefined ? "Loading" : (
        <>
            <h1 className="view-tutor-info-h2">{student.firstName} {student.lastName}</h1>
            <div className="view-students-info-box">
                <LeftStats student={student} studentId={id} />
                <RightStats student={student} studentId={id} />
            </div>
        </>
    );
}

export default ViewStudentInfo;
