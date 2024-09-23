import "./ViewTutorInfo.css";
import { useGetTutorByIdQuery, useUpdateTutorByIdMutation } from "../state/tutorsSlice";
import { useParams } from "react-router-dom"

import AvailabilityTable from "../components/AvailabilityTable";


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
            <a href={"mailto:" + tutor.email}><span className="email-small-text">SEND AN EMAIL</span></a>
            <br></br>
            <br></br>
            <b>Number of Students: </b> {tutor.students.length}
            <br></br>
            <br></br>
            <b>Availibility:</b>
            <br />
            <AvailabilityTable availability={tutor.availability} />
        </div>
    </>
}

function ViewTutorInfo() {;
    const { id } = useParams();
    const { data: tutor, isLoading, isError } = useGetTutorByIdQuery(id);

    return isError ? `Failed to find tutor with id ${id}` : isLoading ? "Loading..." : <>
        <h1 className="view-tutor-info-h2">{tutor.firstName} {tutor.lastName}</h1>
        <div className="view-tutor-info-box">
            <LeftStats tutor={tutor} tutorId={id}/>
            <div className="availability-section">
                
            </div>
        </div>
    </>


}

export default ViewTutorInfo;
