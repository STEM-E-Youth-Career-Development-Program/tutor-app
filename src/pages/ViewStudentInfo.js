import React, { useState } from "react";
import "./ViewStudentInfo.css";
import { useGetStudentByIdQuery, useUpdateStudentByIdMutation } from "../state/studentsSlice";
import { useParams } from "react-router-dom"
import Availability from "../components/Availability/Availability";
import Status from "../components/Status.js";

import AvailabilityTable from "../components/AvailabilityTable";

function LeftStats({ student, studentId }) {
    const [updateStudent] = useUpdateStudentByIdMutation();
    const updateStudentStatus = (event) => {
        updateStudent({ ...student, id: studentId, status: event.target.value })
    }
    let subjects = [...student.mathSubjects];
    subjects.push(...student.scienceSubjects, ...student.englishSubjects, ...student.socialStudiesSubjects, ...student.miscSubjects, ...student.otherSubjects);

    //Age, parent email, nor emergency contact email doesn't seem to be part of the database according to studentsSlice notes
    return (
        <div className="student-stats-parent">
            <p><b>Status: </b>
            <Status person={student} onChange={updateStudentStatus} options={["Matched", "Matching in Progress", "Unmatched Student", "Update Needed"]}></Status>
            </p>
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
            <Availability person={student} />

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
