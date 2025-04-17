import React, { useState,useEffect } from 'react';
import "./View.css";
import { useId } from 'react';
import { useGetAvailableStudentsQuery } from "../state/studentsSlice";
import { useGetAvailableTutorsQuery } from '../state/tutorsSlice';

const labels = {
    "matched": "Matched with Tutor",
    "matchingInProgress": "Matching In Progress",
    "unmatched": "Not matched with Tutor",
    "updateNeeded": "Update Needed"
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
                            {['matched', 'matchingInProgress', 'unmatched', 'updateNeeded'].map((status) => (
                                <CheckboxElement label={labels[status]} onChange={() => handleCheckboxChange('status', status)} />
                            ))}
                    </div>
                </div>
                <div className="Section">
                    Subjects
                    <br />
                    <div className="Dropdowndiv">
                        {['Math', 'Science', 'English'].map((subject) => (
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

function StudentRow({ name, status, tutors, subjects, grade, timezone, id }) {
    var link = `/view-student-info/${id}`;
    return (
        <tr>
            <td><a href={link}>{name}</a></td>
            <td>{status}</td>
            <td>{tutors}</td>
            <td>{subjects}</td>
            <td>{grade}</td>
            <td>{timezone}</td>
        </tr>
    );
}

function ViewStudents() {
    const [filters, setFilters] = useState({
        status: {},
        subjects: {},
        grades: {},
        timezones: {}
    });

    const [students, setStudents] = useState([]);
    const [tutorNames, setTutorNames] = useState({});
    const topics = ["mathSubjects", "scienceSubjects", "englishSubjects", "socialStudiesSubjects", "miscSubjects", "otherSubjects"];

    const { data: studentQuery, isLoading, studentLoading, error: studentError } = useGetAvailableStudentsQuery();
    const { data: tutorQuery, isLoading: tutorLoading, error: tutorError } = useGetAvailableTutorsQuery();

    useEffect(() => {
        if (tutorQuery && tutorQuery.length > 0) {
            const newTutorNames = {};
            tutorQuery.forEach((t) => {
                if (t.firstName && t.lastName) {
                    newTutorNames[t.id] = `${t.firstName} ${t.lastName}`;
                }
            });
            setTutorNames(newTutorNames); 
        }
    }, [tutorQuery]); 

    useEffect(() => {
        // load students only when tutorNames is set
        if (tutorNames && studentQuery) {
            const newStudents = studentQuery.map((doc) => {
                let subjects = [];
                let subjectTopics = [];
                topics.forEach((topic) => {
                    if (doc[topic] && doc[topic].length >= 1) {
                        subjects.push(...doc[topic]);
                        subjectTopics.push(topic.slice(0, -8));
                    }
                });

                let names = doc["tutors"].map((tutorId) => tutorNames[tutorId] || "[N/A]"); //tutor does not exist

                return {
                    name: doc["firstName"] + " " + doc["lastName"],
                    status: doc["status"],
                    tutors: names.join(", "),
                    subjects: subjects.join(", "),
                    subjectTopics: subjectTopics,
                    grade: doc["grade"],
                    timezone: doc["timezone"],
                    id: doc["id"]
                };
            });
            setStudents(newStudents); 
        }
    }, [tutorNames, studentQuery]);


    const filteredStudents = students.filter(student => {
        const statusMatch = Object.keys(filters.status).every(key => !filters.status[key] || student.status === key);
        const subjectsMatch = Object.keys(filters.subjects).every(key => !filters.subjects[key] || student.subjects.includes(key));
        const gradesMatch = Object.keys(filters.grades).every(key => !filters.grades[key] || student.grade === key);
        const timezonesMatch = Object.keys(filters.timezones).every(key => !filters.timezones[key] || student.timezone === key);
        return statusMatch && subjectsMatch && gradesMatch && timezonesMatch;
    });

    return (
        <>
            <SortOptions filters={filters} setFilters={setFilters} />
            <table className="viewtable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Tutor</th>
                        <th>Subjects</th>
                        <th>Grade</th>
                        <th>Timezone</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student, index) => (
                        <StudentRow key={index} {...student} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ViewStudents;
