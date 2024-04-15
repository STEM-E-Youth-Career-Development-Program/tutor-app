import "./ViewStudentInfo.css";

function LeftStats(){
    return <>
        <div className="left-stats-parent">
            <b>Status: </b>
            <div class="dropdown">
            <span class="dropdownbutton">Change Status</span>
            <div class="dropdown-content"> 
            <div class= "StatusSection"> 
                <br />
                <div class="Dropdowndiv">
                <label for="First">Newly Signed Up</label>
                <input type="button" name="First" value="First"></input>
                <label for="Second">Update Needed</label>
                <input type="button" name="Second" value="Second"></input>
                <label for="Third">Unmatched Student</label>
                <input type="button" name="Third" value="Third"></input>
                <label for="Fourth">Currently being Tutoring</label>
                <input type="button" name="Fourth" value="Fourth"></input>
                <label for="Fifth">Matching In Progress</label>
                <input type="button" name="Fifth" value="Fifth"></input>
                <label for="Sixth">No Longer a Student</label>
                <input type="button" name="Sixth" value="Sixth"></input>
                </div>
            </div>
            </div>
            </div>
            <b>Age: </b>
            <b>Grade: </b>
            <b>Subjects: </b>
            <b>Virtual or In-Person: </b>
        </div>
    </>
}

function ViewStudentInfo(){
    return <>
        <LeftStats />
        </>


}

export default ViewStudentInfo;