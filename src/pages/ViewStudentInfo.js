import React, { useState } from "react";
import "./ViewStudentInfo.css";
import { useGetStudentByIdQuery, useUpdateStudentByIdMutation } from "../state/studentsSlice";
import { useParams } from "react-router-dom"

function LeftStats({ student, studentId }) {
    const [updateStudent] = useUpdateStudentByIdMutation();
    const updateStudentStatus = (event) => {
        updateStudent({ ...student, id: studentId, status: event.target.value })
    }
    let subjects = student.mathSubjects;
    subjects.push(...student.scienceSubjects, ...student.englishSubjects, ...student.socialStudiesSubjects, ...student.miscSubjects, ...student.otherSubjects);

    //Age, parent email,nor emergency contact email doesn't seem to be part of the database according to studentsSlice notes
    return (
        <div className="student-stats-parent">
            <p><b>Status: </b> {student.status}</p>
            <div className="dropdown">
                <span className="dropdownbutton"><a href="">Change Status</a></span>
                <div className="dropdown-content">
                    <div className="StatusSection">
                        <br />
                        <div className="Dropdowndiv">
                            <label htmlFor="First">Newly Signed Up</label>
                            <input type="button" name="First" onClick={updateStudentStatus} value={"newlySignedUp"} /><br />
                            <label htmlFor="Second">Update Needed</label>
                            <input type="button" name="Second" onClick={updateStudentStatus} value={"updateNeeded"} /><br />
                            <label htmlFor="Third">Unmatched Student</label>
                            <input type="button" name="Third" onClick={updateStudentStatus} value={"unmatched"} /><br />
                            <label htmlFor="Fourth">Currently being tutored</label>
                            <input type="button" name="Fourth" onClick={updateStudentStatus} value={"currentlyTutored"} /><br />
                            <label htmlFor="Fifth">Matching In Progress</label>
                            <input type="button" name="Fifth" onClick={updateStudentStatus} value={"matchingInProgress"} /><br />
                            <label htmlFor="Sixth">No Longer a Student</label>
                            <input type="button" name="Sixth" onClick={updateStudentStatus} value={"noLongerStudent"} />
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <b>Age: </b> {student.age} 
            <br />
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
            <b>Parent Email: </b> {student.legalGuardianEmail}
            <br />
            <a href={"mailto:" + student.legalGuardianEmail}>Send an Email</a>
            <br />
            <b>Emergency Contact: </b> {student.emergencyContactEmail}
            <br />
            <a href={"mailto:" + student.emergencyContactEmail}>Send an Email</a>
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
        <div className="student-stats-parent">
            <table>
                <thead>
                    <tr className="day-headings">
                        <th scope="col">Mon</th>
                        <th scope="col">Tues</th>
                        <th scope="col">Wed</th>
                        <th scope="col">Thurs</th>
                        <th scope="col">Fri</th>
                        <th scope="col">Sat</th>
                        <th scope="col">Sun</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Morning</th>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
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
            <h1 className="view-student-info-h1">Student Name</h1>
            <p className="view-student-info-h2">Tutored by Assigned Tutor Name</p>
            <div className="view-students-info-box">
                <LeftStats student={student} studentId={id} />
                <RightStats student={student} studentId={id} />
            </div>
        </>
    );
}

export default ViewStudentInfo;
