import "./ViewTutorInfo.css";
import { useGetTutorByIdQuery, useUpdateTutorByIdMutation } from "../state/tutorsSlice";
import { useGetStudentByIdQuery } from "../state/studentsSlice";
import { useParams } from "react-router-dom"
import { React, useEffect, useCallback, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"

import { firebaseApp } from "../firebaseApp";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";


import AvailabilityTable from "../components/AvailabilityTable";


/**
 * @typedef {import("../state/tutorsSlice").TutorData} TutorData  
 */

/**
 * @param {Object} params
 * @param {TutorData} params.tutor 
 * @returns {React.JSX.Element}
 */
function LeftStats({ tutor, tutorId }) {
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
            <b>Math Subjects: </b> {tutor.mathSubjects.join(", ") || "N/A"}<br />
            <b>Science Subjects: </b> {tutor.scienceSubjects.join(", ") || "N/A"}<br />
            <b>English Subjects: </b> {tutor.englishSubjects.join(", ") || "N/A"}<br />
            <b>Social Studies Subjects: </b> {tutor.socialStudiesSubjects.join(", ") || "N/A"}<br />
            <b>Miscellaneous Subjects: </b> {tutor.miscSubjects.join(", ") || "N/A"}<br />
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

function LinksTable() {
    return (
        <div className="tutees-table">
            <table>
                <tr>
                    <th>StudentName</th>
                    <th>Student Age</th>
                    <th>Student Grade Level</th>
                    <th>Subjects Tutored</th>
                </tr>
                <tr>
                    <td>
                        <Link to="../view-student-info/leFaNrKmmcXWjr6RvIPb">Student 1</Link>
                    </td>                
                </tr>
            </table>
        </div>
    )
}

function ViewTutorInfo() {;
    const { id } = useParams();
    const { data: tutor, isLoading, isError } = useGetTutorByIdQuery(id);


    return isError ? `Failed to find tutor with id ${id}` : isLoading ? "Loading..." : <>
        <h1 className="view-tutor-info-h2">{tutor.firstName} {tutor.lastName}</h1>
        <div className="view-tutor-info-box">
            <LeftStats tutor={tutor} tutorId={id} />
            <div className="availability-section">
                <StudentsSlider studentIds={{ ...tutor.students }} />
                {/* tutor.students may not have been meant to be a list of objects. is there another way to know which subjects the tutor has the student for?*/}
            </div>
        </div>
    </>

}


function StudentsSlider({ studentIds }) {
    //integer for setting number of student cards available on web page for responsiveness to window size 
    const [nSlides, setNSlides] = useState(slideCount)

    //list for storing all student objects
    //will start as a copy of tutor.students
    const [studentData, setStudentData] = useState({})

    //boolean for toggling visibility of studentData editors
    const [showEditors, setShowEditors] = useState(false)

    //string for storing user input in 'Add Student' text field 
    const [addStudentInput, setAddStudentInput] = useState("")

    //string for student id to fetch student from database with
    const [newStudentId, setNewStudentId] = useState("")

    //fetched student
    //changes every time newStudentId changes 
    const { data: student, isError, isLoading } = useGetStudentByIdQuery(newStudentId)

    //newStudentId is set to every student id in tutorStudents 
    useEffect(() => {
        Object.keys(studentIds).forEach(studentId => {
            setNewStudentId(String(studentId))
        })
    }, [studentIds])

    //must useCallBack to prevent unnecessary renders of the useEffect hook 
    const addToStudentData = useCallback((addition) => {
        setStudentData(prevList => ({ ...addition, ...prevList }))
    }, [])

    const checkStudentExists = useCallback(async (studentId) => {
        const db = getFirestore(firebaseApp)
        const docRef = doc(db, "students", studentId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            if (studentId in studentIds && 'subjectsTutored' in studentIds[studentId]) { //must retrieve subjectsTutored from studentIds since not included in student object 
                addToStudentData({ [studentId]: { "name": student.firstName + " " + student.lastName, "age": student.age, "grade": student.grade, "subjectsTutored": studentIds[studentId].subjectsTutored } })
            }
            else {
                addToStudentData({ [studentId]: { "name": student.firstName + " " + student.lastName, "age": student.age, "grade": student.grade } })
            }
        } else {
            alert(String(studentId) + " not found")
            setNewStudentId("")
        }
    }, [student, addToStudentData])

    useEffect(() => {
        if (!isLoading && newStudentId !== "") {
            checkStudentExists(newStudentId)
        }
    }, [isLoading, newStudentId, checkStudentExists])

    const handleResize = () => {
        setNSlides(slideCount())
    }

    window.addEventListener("resize", handleResize);

    //returns how many slides should be shown given initial window dimensions
    function slideCount() {
        if (window.innerWidth < 600) {
            return 1
        }
        if (window.innerWidth < 1000) {
            return 2
        }
        else {
            return 3
        }
    }

    //INACTIVE
    //supposed to be called on clicking Upload Edits button
    //updates tutor.students to the student Ids and subjectsTutored visible in studentData
    //currently updating in {studentId} : {subjectsTutored} : studentData[studentId][subjectsTutored] format
    // function UploadEdits() {
    //     const { id } = useParams()
    //     useUpdateTutorByIdMutation({
    //         tutorId: id,
    //         tutorData: Object.fromEntries(
    //             Object.entries(studentData).map(([studentId, studentInfo]) => [
    //                 studentId,
    //                 { ["subjectsTutored"]: studentInfo["subjectsTutored"] }
    //             ])
    //         )
    //     })
    // }

    const settings = {
        dots: true,
        centerMode: false,
        infinite: false,
        speed: 500,
        slidesToShow: Math.max(Math.min(nSlides, Object.keys(studentData).length), 2),
        slidesToScroll: nSlides,
        centerPadding: 0,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />
    }


    //customizing arrows to make them more visible
    //even though on start the arrows may look like they have 0.5 opacity, once there are enough slides in the slider for there to be multiple panes, when the arrows become active, their opacity changes to 1.0 and appearance to black 
    function SliderNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", filter: "brightness(0%)", transform: 'scale(2)' }}
                onClick={onClick}
            />
        );
    }

    function SliderPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", filter: "brightness(0%)", transform: 'scale(2)' }}
                onClick={onClick}
            />
        );
    }

    return (
        <div style={{ "marginLeft": "1rem", "marginRight": "1rem", "marginTop": "1rem" }}>
            <Slider {...settings}>
                {
                    Object.entries(studentData).map(([studentId, studentInfo]) => (
                        <div key={`s${studentId}`} className="student-slide-wrapper">
                            <div className="student-slide">
                                {Object.entries(studentInfo).map(([key, value]) => (
                                    <div key={`s${studentId}-${key}`} className={`student-content-${Object.keys(studentInfo).indexOf(key) % 2}`}>
                                        {varNameToText(key)}: {value}                                 </div>
                                ))}
                                <Link to={`/view-student-info/${studentId}`} className="view-student-page">View Student Page</Link>
                            </div>
                        </div>
                    ))
                }
            </Slider>
            <br></br>
            <h3>Currently tutoring {Object.keys(studentData).length} students</h3>

            <button style={{ "backgroundColor": "#00BB00", "fontSize": "1.25rem" }} onClick={() => setShowEditors(!showEditors)}>Edit Students&#11022;</button>
            <br></br><br></br>

            {!showEditors ? null :
                <>
                    <div style={{ "display": "flex", "flex-direction": "column" }}>
                        <div>
                            <button title="currently inactive" /*onClick = {() => uploadEdits()}*/ style={{ "fontSize": "1.25rem", "color": "gray" }}>&#9888; Upload edits</button>
                        </div>
                        <br></br>
                        <div class="add-student">
                            <input placeholder="Student Id" onChange={(e) => setAddStudentInput(e.target.value)} style={{ "flex": "1" }}></input>
                            <button onClick={() => setNewStudentId(addStudentInput)} style={{ "cursor": "pointer", "flex-basis": "30%", "fontSize": "1rem", "backgroundColor": "#ffca54" }}>Add Student</button>
                        </div>
                        <br></br>
                        {Object.entries(studentData).map(([studentId, studentInfo]) => (
                            <div key={`se${studentId}`} className="student-editor">
                                <button onClick={() => { setStudentData(Object.fromEntries(Object.entries(studentData).filter(([k, v]) => k !== studentId))) }}
                                    style={{ "alignSelf": "end", "backgroundColor": "#FF5050", "fontSize": "0.9rem" }} >
                                    &#9587; Delete
                                </button>
                                <div>
                                    Name: {studentInfo["name"]}
                                </div>
                                <div>
                                    Key: {studentId}
                                </div>
                                <div>
                                    Subjects:
                                </div>
                                <input type='text' defaultValue={studentInfo["subjectsTutored"]} onChange={(e) => setStudentData({ ...studentData, [studentId]: { ...studentData[studentId], "subjectsTutored": e.target.value } })}></input>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    );
}

export default ViewTutorInfo;

//converts camel case to initial case, for eg. "firstName" to "First Name"
function varNameToText(name) {
    let res = name.charAt(0).toUpperCase()
    for (let i = 1; i < name.length; i++) {
        if (name.charAt(i) === name.charAt(i).toUpperCase()) {
            res += " "
        }
        res += name.charAt(i)
    }
    return res
}