import "./ViewTutorInfo.css";
import { useGetTutorByIdQuery, useUpdateTutorByIdMutation } from "../state/tutorsSlice";
import { useGetStudentByIdQuery } from "../state/studentsSlice";
import { useParams } from "react-router-dom"
import { React, useEffect, useCallback, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"

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

function Availability({ tutor }) {
    const isAvailable = (day, time) => {
        return tutor.availability[3 * day + time];
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
                    <td className={getClassName(1, 0)}></td>
                    <td className={getClassName(2, 0)}></td>
                    <td className={getClassName(3, 0)}></td>
                    <td className={getClassName(4, 0)}></td>
                    <td className={getClassName(5, 0)}></td>
                    <td className={getClassName(6, 0)}></td>
                    <td className={getClassName(0, 0)}></td>
                </tr>
                <tr>
                    <th scope="row">Afternoon</th>
                    <td className={getClassName(1, 1)}></td>
                    <td className={getClassName(2, 1)}></td>
                    <td className={getClassName(3, 1)}></td>
                    <td className={getClassName(4, 1)}></td>
                    <td className={getClassName(5, 1)}></td>
                    <td className={getClassName(6, 1)}></td>
                    <td className={getClassName(0, 1)}></td>
                </tr>
                <tr>
                    <th scope="row">Evening</th>
                    <td className={getClassName(1, 2)}></td>
                    <td className={getClassName(2, 2)}></td>
                    <td className={getClassName(3, 2)}></td>
                    <td className={getClassName(4, 2)}></td>
                    <td className={getClassName(5, 2)}></td>
                    <td className={getClassName(6, 2)}></td>
                    <td className={getClassName(0, 2)}></td>
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

function ViewTutorInfo() {
    const { id } = useParams();
    const { data: tutor, isLoading, isError } = useGetTutorByIdQuery(id);
    const tuteesIDs = { leFaNrKmmcXWjr6RvIPb: { subjectsTutored: "Geometry" } }


    return isError ? `Failed to find tutor with id ${id}` : isLoading ? "Loading..." : <>
        <h1 className="view-tutor-info-h2">{tutor.firstName} {tutor.lastName}</h1>
        <div className="view-tutor-info-box">
            <LeftStats tutor={tutor} tutorId={id} />
            <div className="availability-section">
                <StudentsSlider studentIds={tuteesIDs} />
            </div>
        </div>
    </>

}

function StudentsSlider({ studentIds }) {
    // studentData is a copy of the hardcoded students in StudentDataCopy below
    // studentIds = tuteesList in ViewTutorInfo()
    // each studentId in studentIds is set as newStudentIddent
    // whenever newStudentId is changed and student.firstName is defined, useEffect() adds student to studentData


    const [nSlides, setNSlides] = useState(slideCount)
    const [studentData, setStudentData] = useState(studentDataInitialState)
    const [showEditors, setShowEditors] = useState(false)
    const [addStudentInput, setAddStudentInput] = useState("")
    const [newStudentId, setNewStudentId] = useState("")

    const { data: student, isLoading } = useGetStudentByIdQuery(newStudentId)

    useEffect(() => {
        Object.keys(studentIds).forEach(studentId => {
            setNewStudentId(String(studentId))
        })
    }, [studentIds])


    const addToStudentData = useCallback((addition) => {
        setStudentData(prevList => ({ ...addition, ...prevList }))
    }, [])

    useEffect(() => {
        if (student && student.firstName) {
            if (!isLoading) {
                if (studentIds[newStudentId]) {
                    addToStudentData({ [newStudentId]: { "name": student.firstName + " " + student.lastName, "age": student.age, "grade": student.grade, "subjectsTutored": studentIds[newStudentId].subjectsTutored } })
                }
                else {
                    addToStudentData({ [newStudentId]: { "name": student.firstName + " " + student.lastName, "age": student.age, "grade": student.grade } })
                }
            }
        }
    }, [student, isLoading, newStudentId, studentIds, addToStudentData])


    const handleResize = () => {
        setNSlides(slideCount())
    }

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

    window.addEventListener("resize", handleResize);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: nSlides-0.01,
        slidesToScroll: nSlides,
    }

    return (
        <div style={{ "marginLeft": "1rem", "marginRight": "1rem" }}>
            <Slider {...settings}>
                {
                    Object.entries(studentData).map(([studentId, studentInfo]) => (
                        <div key={`s${studentId}`} className="student-slide-wrapper">
                            <div className="student-slide">
                                {Object.entries(studentInfo).map(([key, value]) => (
                                    <div key={`s${studentId}-${key}`} className={`student-content-${Object.keys(studentInfo).indexOf(key)%2}`}>
                                        {varNameToText(key)}: {value}                                 </div>
                                ))}
                                <Link to={`/view-student-info/${studentId}`} className="view-student-page">View Student Page</Link>
                            </div>
                        </div>
                    ))
                }
            </Slider>
            <br></br><br></br>
            <button style={{ "backgroundColor": "#00BB00", "fontSize": "1.25rem" }} onClick={() => setShowEditors(!showEditors)}>Edit Students&#11022;</button>
            <br></br><br></br>

            {!showEditors ? null :
                <>
                    <div style={{"display":"flex", "flex-direction":"column"}}>
                    <div style={{"display":"flex", "width": "100%"}}>
                    <input placeholder="Student Id" onChange={(e) => setAddStudentInput(e.target.value)} style={{"flex":"1"}}></input>
                    <button onClick={() => setNewStudentId(addStudentInput)} style={{"cursor":"pointer", "flex-basis":"30%"}}>Add Student</button>
                    </div>
                    <br></br>
                    {Object.entries(studentData).map(([studentId, studentInfo]) => (
                        <div key={`se${studentId}`} className="student-editor">
                            <button onClick={() => { setStudentData(Object.fromEntries(Object.entries(studentData).filter(([k, v]) => k !== studentId))) }}
                                style={{ "alignSelf": "end", "backgroundColor": "#FF5050", "fontSize": "0.9rem"}} >
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

let studentDataInitialState = {
    key1:
    {
        name: `Louie`,
        age: 15,
        grade: 9,
        subjectsTutored: "Math"
    },
    key2:
    {
        name: `Sam`,
        age: 14,
        grade: 8,
        subjectsTutored: "History"
    },
    key3:
    {
        name: `David`,
        age: 12,
        grade: 9,
        subjectsTutored: "Math"
    },
    key4:
    {
        name: `Sally`,
        age: 13,
        grade: 9,
        subjectsTutored: "Science, English, Math"
    },
    key5:
    {
        name: `Emma`,
        age: 13,
        grade: 8,
        subjectsTutored: "Math, English"
    },
}

export default ViewTutorInfo;

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