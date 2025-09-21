import "./View.css";
import React, { useId, useState } from 'react';
import { useGetAvailableTutorsQuery } from '../state/tutorsSlice';
const labels={
    "newTutor": "New Tutor",
    "currentlyTutoring": "Currently Tutoring",
    "matchingInProgress": "Matching in Progress",
    "tempInactive": "Temporarily Inactive",
    "noLongerTutor": "No Longer a Tutor",
    "needsMoreStudents": "Awaiting more students",
    "awaitingUpdate": "Update needed",
    "allSpotsFilled": "All spots filled"
};

function CheckboxElement({ label, onChange }) {
    const id = useId();
    return (
        <span>
            <input type="checkbox" id={id} onChange={onChange} />
            <label htmlFor={id}>{label}</label>
        </span>
    );
}

function SortOptions({ filters, setFilters }) {
    const handleCheckboxChange = (category, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [value]: !prevFilters[category][value]
            }
        }));
    };

    return (
        <div className="dropdown">
            <span className="drop">Sort Options</span>
            <div className="dropdown-content">
                <div className="Section">
                    Status
                    <br />
                    <div className="Dropdowndiv">
                        {['newTutor', 'currentlyTutoring', 'matchingInProgress', 'tempInactive', 'noLongerTutor', 'needsMoreStudents', 'awaitingUpdate', 'allSpotsFilled'].map((status) => (
                               <CheckboxElement label={labels[status]} onChange={() => handleCheckboxChange('status', status)} />
                        ))}
                    </div>
                </div>
                <div className="Section">
                    Subjects
                    <br />
                    <div className="Dropdowndiv">
                        {['math', 'science', 'english'].map((subject) => (
                            <div key={subject}>
                                <input type="checkbox" name={subject} value={subject} onChange={() => handleCheckboxChange('subjects', subject)} />
                                <label htmlFor={subject}>{subject}</label>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="Section">
                    Grade
                    <br />
                    <div className="Dropdowndiv">
                        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'].map((grade) => (
                            <div key={grade}>
                                <input type="checkbox" name={grade} value={grade} onChange={() => handleCheckboxChange('grades', grade)} />
                                <label htmlFor={grade}>{grade}</label>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="Section">
                    Timezone
                    <br />
                    <div className="Dropdowndiv">
                        {['EST', 'PST', 'CST', 'MT'].map((timezone) => (
                            <div key={timezone}>
                                <input type="checkbox" name={timezone} value={timezone} onChange={() => handleCheckboxChange('timezones', timezone)} />
                                <label htmlFor={timezone}>{timezone}</label>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TutorRow({ name, status, numStudents, maxStudents, subjects, id }) {
    var link = `/view-tutor-info/${id}`;
    return (
        <tr>
            
            <td><a href={link}>{name}</a></td>
            <td>{status}</td>
            <td>{numStudents}</td>
            <td>{maxStudents}</td>
            <td>{subjects}</td>
        </tr>
    );
}

function ViewTutors() {
    const [filters, setFilters] = useState({
        status: {},
        subjects: {},
        grades: {},
        timezones: {}
    });
    const { data: tutor, isLoading, isError } = useGetAvailableTutorsQuery();
    const tutors = [];
    const topics = ["mathSubjects", "scienceSubjects", "englishSubjects", "socialStudiesSubjects", "miscSubjects", "otherSubjects"];
    if (!isLoading && !isError) {
        tutor.forEach((doc) => {
            let subjects = [];
            let subjectTopics = [];
            topics.forEach((topic) => {
                if (doc[topic]) {
                    if (doc[topic].length >= 1) {
                        subjects.push(...doc[topic]);
                        subjectTopics.push(topic.slice(0, -8));
                    }
                }
            });
            if (doc["availability"]) {
                var count = 0;
                doc["availability"].forEach((val) => {
                    if (val) {
                        count++;
                    }
                });
                tutors.push({ "name": doc["firstName"] + " " + doc["lastName"], "status": doc["status"], "numStudents": doc["students"].length, "maxStudents": count, "subjects": subjects.join(", "), "subjectTopics": subjectTopics, "grade": doc["grade"], "timezone": doc["timezone"],  "id": doc["id"] });
            } else {
                tutors.push({ "name": doc["firstName"] + " " + doc["lastName"], "status": doc["status"], "numStudents": "N/A", "maxStudents": 0, "subjects": subjects.join(", "), "subjectTopics": subjectTopics, "grade": doc["grade"], "timezone": doc["timezone"], "id": doc["id"] });
            }
            
            
        });
    }
    const filteredRows = tutors.filter(tutor => {
        console.log(tutor);
        const statusMatch = Object.keys(filters.status).every(key => !filters.status[key] || tutor.status === key);
        const subjectsMatch = Object.keys(filters.subjects).every(key => !filters.subjects[key] || tutor.subjectTopics.includes(key));
        const gradesMatch = Object.keys(filters.grades).every(key => !filters.grades[key] || tutor.grade == key);
        const timezonesMatch = Object.keys(filters.timezones).every(key => !filters.timezones[key] || tutor.timezone === key);
        return statusMatch && subjectsMatch && gradesMatch && timezonesMatch;
    });

    return (
        <>
            <SortOptions filters={filters} setFilters={setFilters} />

            <table className="viewtable">
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th># of Students</th>
                    <th>Max Students</th>
                    <th>Subjects</th>
                </tr>
                <tbody>
                    {filteredRows.map((tutor, index) => (
                        <TutorRow key={index} {...tutor} />
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default ViewTutors;
//name, status, numStudents, maxStudents, subjects, id
