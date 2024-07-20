import React, { useState } from 'react';
import "./ViewStudents.css";
import { useId } from 'react';

function CheckboxElement({ label, onChange }) {
    const id = useId();
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type="checkbox" id={id} onChange={onChange} />
        </>
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
                <div className="StatusSection">
                    Status
                    <br />
                    <div className="Dropdowndiv">
                        <ul className="cols-2">
                            {['Newly Signed Up', 'Update Needed', 'Unmatched Student', 'Currently being Tutored', 'Matching in Progress', 'No Longer a Student'].map((status) => (
                                <li key={status}>
                                    <CheckboxElement label={status} onChange={() => handleCheckboxChange('status', status)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="SubjectsSection">
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
                <div className="GradeSection">
                    Grade
                    <br />
                    <div className="Dropdowndiv">
                        {['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'].map((grade) => (
                            <div key={grade}>
                                <input type="checkbox" name={grade} value={grade} onChange={() => handleCheckboxChange('grades', grade)} />
                                <label htmlFor={grade}>{grade}</label>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="TimezoneSection">
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

function StudentRow({ name, status, tutor, subjects }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{status}</td>
            <td>{tutor}</td>
            <td>{subjects}</td>
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

    const students = [
        { name: "John Doe", status: "Matching in Progress", tutor: "Mr. Smith", subjects: "Math", grade: "First", timezone: "EST" },
        // Add more student objects here
    ];

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
