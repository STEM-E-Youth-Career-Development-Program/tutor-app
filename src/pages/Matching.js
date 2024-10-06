import React from "react";
import "./Matching.css";
import {
    useGetStudentByIdQuery,
    useUpdateStudentByIdMutation,
} from "../state/studentsSlice";
import {
    useGetAvailableTutorsQuery,
    useUpdateTutorByIdMutation,
} from "../state/tutorsSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Matching() {
    const { id: studentId } = useParams();
    const {
        data: student,
        isLoading: studentLoading,
        error: studentError,
    } = useGetStudentByIdQuery(studentId);
    const {
        data: availableTutors,
        isLoading: tutorsLoading,
        error: tutorsError,
    } = useGetAvailableTutorsQuery();

    const [updateStudent] = useUpdateStudentByIdMutation();
    const [updateTutor] = useUpdateTutorByIdMutation();
    const navigate = useNavigate();

    // Debugging statements
    console.log("Student:", student);
    console.log("Available Tutors:", availableTutors);
    if (studentLoading || tutorsLoading) {
        return <div>Loading...</div>;
    }
    if (studentError || tutorsError) {
        return (
            <div>Error: {studentError?.message || tutorsError?.message}</div>
        );
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

    // Function to handle matching
    const handleMatch = async (tutorId) => {
        updateStudent({
            id: studentId,
            tutors: [new Set([...(student.tutors ?? []), tutorId])],
        });

        updateTutor({
            id: tutorId,
            tutors: [new Set([...(student.tutors ?? []), tutorId])],
        });

        // redirect to Student Profile
        navigate(`/view-student-info/${studentId}`);

        /*
        Add tutor to student.tutors
        useUpdateStudentByIdMutation(
            'studentId': studentId,
            studentData: {...studentData, ["tutors"]: ...studentData["tutors"], tutorId }
        })
        */
    };

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
                            <th># of Students</th>
                            <th>Max Students</th>
                            <th>Subjects</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableTutors.map((tutor) => (
                            <tr key={tutor.id}>
                                <td>
                                    <a
                                        href={`/view-tutor-info/${tutor.id}`}
                                        target="_blank"
                                    >
                                        {tutor.firstName} {tutor.lastName}
                                    </a>
                                </td>
                                <td>{tutor.numStudents}</td>
                                <td>{tutor.maxStudents}</td>
                                <td>
                                    {[
                                        ...(tutor.mathSubjects || []),
                                        ...(tutor.scienceSubjects || []),
                                        ...(tutor.englishSubjects || []),
                                        ...(tutor.socialStudiesSubjects || []),
                                        ...(tutor.miscSubjects || []),
                                    ].join(", ")}
                                </td>
                                <td>{tutor.city}</td>
                                <td>
                                    <button
                                        onClick={() => handleMatch(tutor.id)}
                                    >
                                        Match
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Matching;
