import "./ViewTutorInfo.css";
import { useGetTutorByIdQuery, useUpdateTutorByIdMutation } from "../state/tutorsSlice";
import { useParams } from "react-router-dom"

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
            <a href={"mailto:" + tutor.email}><p3>SEND AN EMAIL</p3></a>
            <br></br>
            <br></br>
            <b>Number of Tutees: </b>TODO
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
