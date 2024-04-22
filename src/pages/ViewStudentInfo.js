import "./ViewStudentInfo.css";

function LeftStats(){
    return <>
        <div className="student-stats-parent">
            <p><b>Status: Here</b></p>
            <div class="dropdown">
            <span class="dropdownbutton"><a href="">Change Status</a></span>
            <div class="dropdown-content"> 
            <div class= "StatusSection"> 
                <br />
                <div class="Dropdowndiv">
                <label for="First">Newly Signed Up</label>
                <input type="button" name="First" value="Newly"></input> <br></br>
                <label for="Second">Update Needed</label>
                <input type="button" name="Second" value="Update"></input><br></br>
                <label for="Third">Unmatched Student</label>
                <input type="button" name="Third" value="Unmatched"></input><br></br>
                <label for="Fourth">Currently being Tutoring</label>
                <input type="button" name="Fourth" value="Currently"></input><br></br>
                <label for="Fifth">Matching In Progress</label>
                <input type="button" name="Fifth" value="Matching"></input><br></br>
                <label for="Sixth">No Longer a Student</label>
                <input type="button" name="Sixth" value="Gone"></input>
                </div>
            </div>
            </div>
            </div>
            <br></br>
            <b>Age: 17</b>
            <br></br>
            <b>Grade: 12th</b>
            <br></br>
            <b>Subjects: Science, Math</b>
            <br></br>
            <b>Virtual or In-Person: Virtual</b>
            <br></br>
            <b>Contact Information: asdfasdfasdf@gmail.com</b>
            <br></br>
            <a href="mailto:info@steme.org">Send an Email</a>
            <br></br>
            <b>Parent Email: asdfasdfasdf@gmail.com</b>
            <br></br>
            <a href="mailto:info@steme.org">Send an Email</a>
            <br></br>
            <b>Emergency Contact: jlkasjdfkljad@gmail.com</b>
            <br></br>
            <a href="mailto:info@steme.org">Send an Email</a>
        </div>
    </>
}

function RightStats(){
    return <>
        <div className="student-stats-parent">
            <table>
                <tr className="day-headings">
                    <th scope="col">Mon</th>
                    <th scope="col">Tues</th>
                    <th scope="col">Wed</th>
                    <th scope="col">Thurs</th>
                    <th scope="col">Fri</th>
                    <th scope="col">Sat</th>
                    <th scope="col">Sun</th>
                </tr>
                <tr>
                    <th scope="row">Morning</th>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>

                </tr>
                
            </table>

            <div className="notesbox">
                <p>Notes: </p>
            </div>

                
        </div>
    </>
}


function ViewStudentInfo(){
    return <>
        <h1 className="view-student-info-h1">Student Name</h1>
        <p className="view-student-info-h2">Tutored by Assigned Tutor Name</p>

        <div className="view-students-info-box">
        <LeftStats />
        <RightStats />
        </div>
        </>


}

export default ViewStudentInfo;