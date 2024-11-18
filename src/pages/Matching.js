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
import { useParams, Link } from "react-router-dom";

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

    // Ranking system: Assign a score to each tutor based on how well they match the student's preferences
    const rankedTutors = availableTutors
        .map((tutor) => {
            let score = 0;

            // In-person and virtual preferences
            if (
                student.inPerson !== undefined &&
                student.inPerson === tutor.inPerson
            ) {
                score += 10; // Add points if the in-person preference matches
            }
            if (
                student.virtual !== undefined &&
                student.virtual === tutor.virtual
            ) {
                score += 10; // Add points if the virtual preference matches
            }

            // Subject matching: Add points for each subject category match
            if (student.mathSubjects?.length) {
                score +=
                    student.mathSubjects.filter((subject) =>
                        tutor.mathSubjects?.includes(subject)
                    ).length * 5; // 5 points per matching subject
            }
            if (student.scienceSubjects?.length) {
                score +=
                    student.scienceSubjects.filter((subject) =>
                        tutor.scienceSubjects?.includes(subject)
                    ).length * 5;
            }
            if (student.englishSubjects?.length) {
                score +=
                    student.englishSubjects.filter((subject) =>
                        tutor.englishSubjects?.includes(subject)
                    ).length * 5;
            }
            if (student.socialStudiesSubjects?.length) {
                score +=
                    student.socialStudiesSubjects.filter((subject) =>
                        tutor.socialStudiesSubjects?.includes(subject)
                    ).length * 5;
            }
            if (student.miscSubjects?.length) {
                score +=
                    student.miscSubjects.filter((subject) =>
                        tutor.miscSubjects?.includes(subject)
                    ).length * 5;
            }

            // Preference for homework or subject help
            if (
                student.prefersHomeworkHelp !== undefined &&
                student.prefersHomeworkHelp === tutor.prefersHomeworkHelp
            ) {
                score += 10;
            }
            if (
                student.prefersSubjectHelp !== undefined &&
                student.prefersSubjectHelp === tutor.prefersSubjectHelp
            ) {
                score += 10;
            }

            // Return tutor with their calculated score
            return { ...tutor, score };
        })
        .sort((a, b) => b.score - a.score); // Sort tutors by score in descending order

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
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedTutors.map((tutor) => (
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
                                <td>{tutor.score}</td>
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
