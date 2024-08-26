import React from "react";
import "./Matching.css";
import { useGetStudentByIdQuery } from "../state/studentsSlice";
import {
    useGetNumberOfAvailableTutorsQuery,
    useGetTutorByIdQuery,
} from "../state/tutorsSlice";
import { useParams } from "react-router-dom";

function Matching() {
    const { id: studentId } = useParams();
    const { data: student, isLoading: studentLoading } =
        useGetStudentByIdQuery(studentId);
    const { data: availableTutors, isLoading: tutorsLoading } =
        useGetNumberOfAvailableTutorsQuery();

    if (studentLoading || tutorsLoading) {
        return <div>Loading...</div>;
    }

    if (!student) {
        return <div>Student not found.</div>;
    }

    const filteredTutors = availableTutors.filter((tutor) => {
        return (
            (!student.inPerson || tutor.inPerson) &&
            (!student.virtual || tutor.virtual) &&
            student.mathSubjects.some((subject) =>
                tutor.mathSubjects.includes(subject)
            ) &&
            student.scienceSubjects.some((subject) =>
                tutor.scienceSubjects.includes(subject)
            ) &&
            student.englishSubjects.some((subject) =>
                tutor.englishSubjects.includes(subject)
            ) &&
            student.socialStudiesSubjects.some((subject) =>
                tutor.socialStudiesSubjects.includes(subject)
            ) &&
            student.miscSubjects.some((subject) =>
                tutor.miscSubjects.includes(subject)
            ) &&
            (!student.prefersHomeworkHelp || tutor.prefersHomeworkHelp) &&
            (!student.prefersSubjectHelp || tutor.prefersSubjectHelp)
        );
    });

    return (
        <div className="matching-page">
            <h1>
                Matching for {student.firstName} {student.lastName}
            </h1>
            <div className="table-container">
                <table className="tutors-table">
                    <thead>
                        <tr>
                            <th>Tutor Name</th>
                            <th>Email</th>
                            <th>Availability</th>
                            <th>Preferred Subjects</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTutors.map((tutor) => (
                            <tr key={tutor.id}>
                                <td>
                                    {tutor.firstName} {tutor.lastName}
                                </td>
                                <td>{tutor.email}</td>
                                <td>
                                    {tutor.availability
                                        .map((available, index) =>
                                            available ? `${index} ` : ""
                                        )
                                        .join(", ")}
                                </td>
                                <td>
                                    {[
                                        ...tutor.mathSubjects,
                                        ...tutor.scienceSubjects,
                                        ...tutor.englishSubjects,
                                        ...tutor.socialStudiesSubjects,
                                        ...tutor.miscSubjects,
                                    ].join(", ")}
                                </td>
                                <td>{tutor.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Matching;
