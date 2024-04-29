import "./ViewTutors.css"

/*
table for organizing dropdown?
<table>
    <tr>
      <th>subject</th>
    </tr>
    <tr>
      <td>
        <input type="checkbox" name="math" value="math"></input>
        <label for="math">math</label>
      </td>
      <td>
        <input type="checkbox" name="english" value="english"></input>
        <label for="english">english</label>
      </td>
      <td>
        <input type="checkbox" name="science" value="science"></input>
        <label for="science">science</label>
      </td>
      <td>
        <input type="checkbox" name="history" value="history"></input>
        <label for="history">history</label>
      </td>
    </tr>
  </table>
*/
function SortOptions() {
    return <> 
        
<div class="dropdown">
  <span class="drop">Sort Options</span>
  <div class="dropdown-content"> 
    <div class = "StatusSection"> Status:
        <br></br>
            <table class="dropdownTable">
                <tr>
                    <td>
                    <input type="checkbox" name="NewTutor" value="NewTutor"></input>
                    <label for="NewTutor">New Tutor</label>
                    </td>
                    <td>
                    <input type="checkbox" name="CurrentlyTutoring" value="Third"></input>
                    <label for="Third">Currently Tutoring</label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <input type="checkbox" name="Progress" value="Fourth"></input>
                    <label for="Fourth">Matching In Progress</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Progress" value="Five"></input>
                    <label for="Fifth">Matching In Progress</label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <input type="checkbox" name="TempInactive" value="Sixth"></input>
                    <label for="Sixth">Temp Inactive </label>
                    </td>
                    <td>
                    <input type="checkbox" name="NoLonger" value="Seventh"></input>
                    <label for="Seventh">No Longer a Tutor</label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <input type="checkbox" name="AwaitingUpdate" value="Eight"></input>
                    <label for="Eight">Currently Tutoring - Awaiting Update</label>
                    </td>
                    <td>
                    <input type="checkbox" name="MoreStudents" value="Ninth"></input>
                    <label for="Ninth">Currently Tutoring - Needs More Students</label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <input type="checkbox" name="AllSpotsFilled" value="Tenth"></input>
                    <label for="Tenth">Currently Tutoring - All Spots Filled</label>
                    </td>
                </tr>
            </table>
        </div>
        <div class="SubjectsSection">
            Subjects:
            <br></br>
            <div class="Dropdowndiv">
                <table class="dropdownTable">
                    <tr>
                        <td>
                        <input type="checkbox" name="Math" value="Math"></input>
                        <label for="Math">Math</label>
                        </td>
                        <td>
                        <input type="checkbox" name="Science" value="Science"></input>
                        <label for="Science">Science</label>
                        </td>
                        <td>
                        <input type="checkbox" name="English" value="English"></input>
                        <label for="English">English</label>
                        </td>
                    </tr>
                </table>
            </div>
    </div>
    <div class="GradeSection">Grade:
        <br></br>
        <div class="Dropdowndiv">
            <table class="dropdownTable">
                <tr>
                    <td>
                    <input type="checkbox" name="First" value="First"></input>
                    <label for="First">1st</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Second" value="Second"></input>
                    <label for="Second">2nd</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Third" value="Third"></input>
                    <label for="Third">3rd</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Fourth" value="Fourth"></input>
                    <label for="Fourth">4th</label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <input type="checkbox" name="Five" value="Five"></input>
                    <label for="Fifth">5th</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Sixth" value="Sixth"></input>
                    <label for="Sixth">6th</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Seventh" value="Seventh"></input>
                    <label for="Seventh">7th</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Eight" value="Eight"></input>
                    <label for="Eighth">8th</label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <input type="checkbox" name="Ninth" value="Ninth"></input>
                    <label for="Ninth">9th</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Tenth" value="Tenth"></input>
                    <label for="Tenth">10th</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Eleventh" valuediv="Eleventh"></input>
                    <label for="Eleventh">11th</label>
                    </td>
                    <td>
                    <input type="checkbox" name="Twelfth" value="Twelfth"></input>
                    <label for="Twelfth">12th</label>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div class="TimezoneSection">Timezone:</div>
        <div>
            <table class="dropdownTable">
                <tr>
                    <td>
                        <input type="checkbox" name="EST" value="EST"></input>
                        <label for="EST">EST</label>
                    </td>
                    <td>
                        <input type="checkbox" name="PST" value="PST"></input>
                        <label for="PST">PST</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" name="CST" value="CST"></input>
                        <label for="CST">CST</label>
                    </td>
                    <td>
                        <input type="checkbox" name="MT" value="MT"></input>
                        <label for="MT">MT</label>
                    </td>
                </tr>
            </table>
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
        <td>{name}</td>
        <td>{status}</td>
        <td>{numStudents}</td>
        <td>{maxStudents}</td>
        <td>{subjects}</td>
    </tr>
}

function SpreadSheetTest(){
    <body>
        <script src="https://sheetdb.io/s/t/h0aclj5zpg3sr.js"></script>


        <script src="https://sheetdb.io/handlebars.js"></script>
    </body>
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

        <SpreadSheetTest />

        
    </>

}


export default ViewStudents;

