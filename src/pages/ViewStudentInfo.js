import React, { useState } from "react";
import "./ViewStudentInfo.css";

function LeftStats() {
    return (
        <div className="student-stats-parent">
            <p><b>Status: Here</b></p>
            <div className="dropdown">
                <span className="dropdownbutton"><a href="">Change Status</a></span>
                <div className="dropdown-content">
                    <div className="StatusSection">
                        <br />
                        <div className="Dropdowndiv">
                            <label htmlFor="First">Newly Signed Up</label>
                            <input type="button" name="First" value="Newly" /><br />
                            <label htmlFor="Second">Update Needed</label>
                            <input type="button" name="Second" value="Update" /><br />
                            <label htmlFor="Third">Unmatched Student</label>
                            <input type="button" name="Third" value="Unmatched" /><br />
                            <label htmlFor="Fourth">Currently being Tutoring</label>
                            <input type="button" name="Fourth" value="Currently" /><br />
                            <label htmlFor="Fifth">Matching In Progress</label>
                            <input type="button" name="Fifth" value="Matching" /><br />
                            <label htmlFor="Sixth">No Longer a Student</label>
                            <input type="button" name="Sixth" value="Gone" />
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <b>Age: 17</b>
            <br />
            <b>Grade: 12th</b>
            <br />
            <b>Subjects: Science, Math</b>
            <br />
            <b>Virtual or In-Person: Virtual</b>
            <br />
            <b>Contact Information: asdfasdfasdf@gmail.com</b>
            <br />
            <a href="mailto:info@steme.org">Send an Email</a>
            <br />
            <b>Parent Email: asdfasdfasdf@gmail.com</b>
            <br />
            <a href="mailto:info@steme.org">Send an Email</a>
            <br />
            <b>Emergency Contact: jlkasjdfkljad@gmail.com</b>
            <br />
            <a href="mailto:info@steme.org">Send an Email</a>
        </div>
    );
}

function RightStats() {
    const [notes, setNotes] = useState("");
    const [savedNotes, setSavedNotes] = useState("");

    const handleInputChange = (event) => {
        setNotes(event.target.value);
    };

    const handleSaveNotes = () => {
        setSavedNotes(notes);
        // Here you can also add functionality to save the notes to a database or another storage
    };

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
                <button onClick={handleSaveNotes}>Save Notes</button>
                {savedNotes && (
                    <div className="saved-notes">
                        <p><b>Saved Notes:</b></p>
                        <p>{savedNotes}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ViewStudentInfo() {
    return (
        <>
            <h1 className="view-student-info-h1">Student Name</h1>
            <p className="view-student-info-h2">Tutored by Assigned Tutor Name</p>
            <div className="view-students-info-box">
                <LeftStats />
                <RightStats />
            </div>
        </>
    );
}

export default ViewStudentInfo;
