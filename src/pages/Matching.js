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
import { useParams, Link } from "react-router-dom"; // Import Link for navigation

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
            // In-person and virtual preferences (only check if student's preference exists)
            (!student.inPerson || tutor.inPerson === student.inPerson) &&
            (!student.virtual || tutor.virtual === student.virtual) &&
            // Subject matching (only check if the student has subjects defined)
            (!student.mathSubjects?.length ||
                student.mathSubjects.some((subject) =>
                    tutor.mathSubjects?.includes(subject)
                )) &&
            (!student.scienceSubjects?.length ||
                student.scienceSubjects.some((subject) =>
                    tutor.scienceSubjects?.includes(subject)
                )) &&
            (!student.englishSubjects?.length ||
                student.englishSubjects.some((subject) =>
                    tutor.englishSubjects?.includes(subject)
                )) &&
            (!student.socialStudiesSubjects?.length ||
                student.socialStudiesSubjects.some((subject) =>
                    tutor.socialStudiesSubjects?.includes(subject)
                )) &&
            (!student.miscSubjects?.length ||
                student.miscSubjects.some((subject) =>
                    tutor.miscSubjects?.includes(subject)
                )) &&
            // Preference for homework or subject help (only check if student's preference exists)
            (!student.prefersHomeworkHelp ||
                tutor.prefersHomeworkHelp === student.prefersHomeworkHelp) &&
            (!student.prefersSubjectHelp ||
                tutor.prefersSubjectHelp === student.prefersSubjectHelp)
        );
    });

    const handleMatch = async (tutorId) => {
        await updateStudent({
            id: studentId,
            tutors: [...(student.tutors ?? []), tutorId],
        });

        await updateTutor({
            id: tutorId,
            students: [
                ...(availableTutors.find((t) => t.id === tutorId).students ??
                    []),
                studentId,
            ],
        });

        navigate(`/view-student-info/${studentId}`);
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
                        {filteredTutors.map((tutor) => (
                            <tr key={tutor.id}>
                                <td>
                                    <Link to={`/view-tutor-info/${tutor.id}`}>
                                        {tutor.firstName} {tutor.lastName}
                                    </Link>
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
