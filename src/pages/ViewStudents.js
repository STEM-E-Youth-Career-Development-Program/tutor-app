import "./ViewStudents.css";

function SortOptions() {
    return <> 
        
<div class="dropdown">
   <span class="dropdownbutton">Sort Options</span>
  <div class="dropdown-content"> 
    <div class= "StatusSection"> Status
        <br />
        <div class="Dropdowndiv">
                <label for="First">Newly Signed Up</label>
                <input type="checkbox" name="First" value="First"></input>
                <label for="Second">Update Needed</label>
                <input type="checkbox" name="Second" value="Second"></input>
                <label for="Third">Unmatched Student</label>
                <input type="checkbox" name="Third" value="Third"></input>
                <label for="Fourth">Currently being Tutoring</label>
                <input type="checkbox" name="Fourth" value="Fourth"></input>
                <label for="Fifth">Matching In Progress</label>
                <input type="checkbox" name="Fifth" value="Fifth"></input>
                <label for="Sixth">No Longer a Student</label>
                <input type="checkbox" name="Sixth" value="Sixth"></input>
            </div>
        </div>
        <div class="SubjectsSection">
            Subjects
            <br></br>
            <div class="Dropdowndiv">
                <input type="checkbox" name="Math" value="Math"></input>
                <span class="checkmark"></span>
                <label for="Math">Math</label>
                <br></br>
                <input type="checkbox" name="Science" value="Science"></input>
                <label for="Science">Science</label>
                <br></br>
                <input type="checkbox" name="English" value="English"></input>
                <label for="English">English</label>
                <br></br>
            </div>
    </div>
    <div class="GradeSection">Grade
        <br></br>
        <div class="Dropdowndiv">
            <input type="checkbox" name="First" value="First"></input>
            <label for="First">1st</label>
            <input type="checkbox" name="Second" value="Second"></input>
            <label for="Second">2nd</label>
            <input type="checkbox" name="Third" value="Third"></input>
            <label for="Third">3rd</label>
            <input type="checkbox" name="Fourth" value="Fourth"></input>
            <label for="Fourth">4th</label>
            <input type="checkbox" name="Fifth" value="Fifth"></input>
            <label for="Fifth">5th</label>
            <input type="checkbox" name="Sixth" value="Sixth"></input>
            <label for="Sixth">6th</label>
            <input type="checkbox" name="Seventh" value="Seventh"></input>
            <label for="Seventh">7th</label>
            <input type="checkbox" name="Eight" value="Eight"></input>
            <label for="Eighth">8th</label>
            <input type="checkbox" name="Ninth" value="Ninth"></input>
            <label for="Ninth">9th</label>
            <input type="checkbox" name="Tenth" value="Tenth"></input>
            <label for="Tenth">10th</label>
            <input type="checkbox" name="Eleventh" valuediv="Eleventh"></input>
            <label for="Eleventh">11th</label>
            <input type="checkbox" name="Twelfth" value="Twelfth"></input>
            <label for="Twelfth">12th</label>
        </div>
    </div>
    <div class="TimezoneSection">Timezone</div>
        {/* <br></br> */}
        <div class="Dropdowndiv">
            <input type="checkbox" name="EST" value="EST"></input>
            <label for="EST">EST</label>
            <input type="checkbox" name="PST" value="PST"></input>
            <label for="PST">PST</label>
            <input type="checkbox" name="CST" value="CST"></input>
            <label for="CST">CST</label>
            <input type="checkbox" name="MT" value="MT"></input>
            <label for="MT">MT</label>
        </div>
    </div>
</div>

        {/* <select class="dropdown">
            <option disabled selected> Sort Options</option>
        </select> */}
    </>
    
}

function TutorRow({ name, status, numStudents, maxStudents, subjects }) {
    return <tr>
        <th>{name}</th>
        <td>{status}</td>
        <td>{numStudents}</td>
        <td>{maxStudents}</td>
        <td>{subjects}</td>
    </tr>
}

function ViewStudents() {
    return <>
        <SortOptions />

        <table class="viewtable">
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

}


export default ViewStudents;