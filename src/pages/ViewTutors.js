import "./ViewTutors.css";
import React, { useEffect, useState } from 'react';
import { useUpdateTutorByIdMutation } from '../state/tutorsSlice';

function SortOptions({ tutorId }) {
    const [status, setStatus] = useState(localStorage.getItem('tutorStatus') || '');
    const [updateTutorById] = useUpdateTutorByIdMutation();

    useEffect(() => {
        localStorage.setItem('tutorStatus', status);
    }, [status]);

    const handleChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        updateTutorById({ id: tutorId, tutorData: { status: newStatus } });
    };

    return (
        <div className="dropdown">
            <span className="drop">Sort Options</span>
            <div className="dropdown-content"> 
                <div className="StatusSection"> Status:
                    <br />
                    <div>
                        <label htmlFor="tutorStatus">Tutor Status: </label>
                        <select id="tutorStatus" name="tutorStatus" value={status} onChange={handleChange}>
                            <option value="NewTutor">New Tutor</option>
                            <option value="CurrentlyTutoring">Currently Tutoring</option>
                            <option value="MatchingInProgress1">Matching In Progress</option>
                            <option value="MatchingInProgress2">Matching In Progress</option>
                            <option value="TempInactive">Temp Inactive</option>
                            <option value="NoLongerTutor">No Longer a Tutor</option>
                            <option value="AwaitingUpdate">Currently Tutoring - Awaiting Update</option>
                            <option value="NeedsMoreStudents">Currently Tutoring - Needs More Students</option>
                            <option value="AllSpotsFilled">Currently Tutoring - All Spots Filled</option>
                        </select>
                    </div>
                </div>
                <div className="SubjectsSection">
                    Subjects:
                    <br />
                    <div className="Dropdowndiv">
                        <table className="dropdownTable">
                            <tr>
                                <td>
                                    <input type="checkbox" name="Math" value="Math" />
                                    <label htmlFor="Math">Math</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Science" value="Science" />
                                    <label htmlFor="Science">Science</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="English" value="English" />
                                    <label htmlFor="English">English</label>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="GradeSection">Grade:
                    <br />
                    <div className="Dropdowndiv">
                        <table className="dropdownTable">
                            <tr>
                                <td>
                                    <input type="checkbox" name="First" value="First" />
                                    <label htmlFor="First">1st</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Second" value="Second" />
                                    <label htmlFor="Second">2nd</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Third" value="Third" />
                                    <label htmlFor="Third">3rd</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Fourth" value="Fourth" />
                                    <label htmlFor="Fourth">4th</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="Fifth" value="Fifth" />
                                    <label htmlFor="Fifth">5th</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Sixth" value="Sixth" />
                                    <label htmlFor="Sixth">6th</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Seventh" value="Seventh" />
                                    <label htmlFor="Seventh">7th</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Eighth" value="Eighth" />
                                    <label htmlFor="Eighth">8th</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="Ninth" value="Ninth" />
                                    <label htmlFor="Ninth">9th</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Tenth" value="Tenth" />
                                    <label htmlFor="Tenth">10th</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Eleventh" value="Eleventh" />
                                    <label htmlFor="Eleventh">11th</label>
                                </td>
                                <td>
                                    <input type="checkbox" name="Twelfth" value="Twelfth" />
                                    <label htmlFor="Twelfth">12th</label>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="TimezoneSection">Timezone:</div>
                <div>
                    <table className="dropdownTable">
                        <tr>
                            <td>
                                <input type="checkbox" name="EST" value="EST" />
                                <label htmlFor="EST">EST</label>
                            </td>
                            <td>
                                <input type="checkbox" name="PST" value="PST" />
                                <label htmlFor="PST">PST</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="CST" value="CST" />
                                <label htmlFor="CST">CST</label>
                            </td>
                            <td>
                                <input type="checkbox" name="MT" value="MT" />
                                <label htmlFor="MT">MT</label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

function TutorRow({ name, status, numStudents, maxStudents, subjects }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{status}</td>
            <td>{numStudents}</td>
            <td>{maxStudents}</td>
            <td>{subjects}</td>
        </tr>
    );
}

function ViewStudents() {
    const tutorId = "some-tutor-id"; // Replace with actual tutor ID from your context or state

    return (
        <>
            <SortOptions tutorId={tutorId} />

            <table className="viewtable">
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th># of Students</th>
                    <th>Max Students</th>
                    <th>Subjects</th>
                </tr>
                <TutorRow name="John Doe" status="Matching" numStudents={0} maxStudents={15} subjects={"Math"} />
            </table>
        </>
    );
}

export default ViewStudents;
