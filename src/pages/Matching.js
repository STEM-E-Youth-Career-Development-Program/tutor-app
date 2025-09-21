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
import { useNavigate, useParams, Link } from "react-router-dom";
import Availability from "../components/Availability/Availability";

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
    console.log(availableTutors);
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

    // Ranking algorithm calculates a match score for each student based on overlapping properties.
    const rankedTutors = availableTutors
        .map((tutor) => {
            let score = 0;

            // Subject matching awards 5 points per matching subject in key categories.
            if (student.mathSubjects?.length && tutor.mathSubjects?.length) {
                const mathMatches = student.mathSubjects.filter((subj) =>
                    tutor.mathSubjects.includes(subj)
                ).length;
                score += mathMatches * 5;
            }
            if (
                student.scienceSubjects?.length &&
                tutor.scienceSubjects?.length
            ) {
                const scienceMatches = student.scienceSubjects.filter((subj) =>
                    tutor.scienceSubjects.includes(subj)
                ).length;
                score += scienceMatches * 5;
            }
            if (
                student.englishSubjects?.length &&
                tutor.englishSubjects?.length
            ) {
                const englishMatches = student.englishSubjects.filter((subj) =>
                    tutor.englishSubjects.includes(subj)
                ).length;
                score += englishMatches * 5;
            }
            if (
                student.socialStudiesSubjects?.length &&
                tutor.socialStudiesSubjects?.length
            ) {
                const socialMatches = student.socialStudiesSubjects.filter(
                    (subj) => tutor.socialStudiesSubjects.includes(subj)
                ).length;
                score += socialMatches * 5;
            }
            if (student.miscSubjects?.length && tutor.miscSubjects?.length) {
                const miscMatches = student.miscSubjects.filter((subj) =>
                    tutor.miscSubjects.includes(subj)
                ).length;
                score += miscMatches * 3;
            }

            // adds points if both tutor and student prefer in-person or virtual
            if (student.inPerson && tutor.inPerson) score += 10;
            if (student.virtual && tutor.virtual) score += 10;

            // add points if preferences for homework or subject help match.
            if (
                student.prefersHomeworkHelp !== undefined &&
                tutor.prefersHomeworkHelp !== undefined &&
                student.prefersHomeworkHelp === tutor.prefersHomeworkHelp
            ) {
                score += 5;
            }
            if (
                student.prefersSubjectHelp !== undefined &&
                tutor.prefersSubjectHelp !== undefined &&
                student.prefersSubjectHelp === tutor.prefersSubjectHelp
            ) {
                score += 5;
            }

            return { ...tutor, score };
        })
        .sort((a, b) => b.score - a.score); // Highest match score first

    // Handle matching: updates both the student and tutor records.
    const handleMatch = async (tutorIdToMatch) => {
        try {
            // Finds the student to update from the available list.
            const tutorToUpdate = availableTutors.find(
                (s) => s.id === tutorIdToMatch
            );
            if (!tutorToUpdate) {
                alert("Tutor not found");
                return;
            }

            // Updates the student record: adds the tutor's id and sets status to "matched"
            await updateTutor({
                id: tutorIdToMatch,
                students: [...(tutorToUpdate.students ?? []), studentId],
                status: "matched",
            });

            // Updates the tutor record: adds the student's id, updates the student count, and sets status to "matched"
            await updateStudent({
                id: studentId,
                tutors: [...(student.tutors ?? []), tutorIdToMatch],
                status: "matched",
            });

            navigate(`/view-student-info/${studentId}`);
        } catch (error) {
            console.error("Error matching student to tutor:", error);
            alert("Error matching student to tutor. Please try again.");
        }
    };

    return (
        <div className="matching-page">
            <h1>
                Matching for Student: {student.firstName} {student.lastName}
            </h1>
            <div className="table-container">
                <table className="tutors-table">
                    <thead>
                        <tr>
                            <th>Tutor Name</th>
                            <th>Grade</th>
                            <th>Subjects</th>
                            <th>Availability</th>
                            <th>Status</th>
                            <th>Score</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedTutors.map((tutor) => (
                            <tr key={tutor.id}>
                                <td>
                                    <Link
                                        to={`/view-tutor-info/${tutor.id}`}
                                    >
                                        {tutor.firstName} {tutor.lastName}
                                    </Link>
                                </td>
                                <td>{tutor.grade}</td>
                                <td>
                                    {[
                                        ...(tutor.mathSubjects || []),
                                        ...(tutor.scienceSubjects || []),
                                        ...(tutor.englishSubjects || []),
                                        ...(tutor.socialStudiesSubjects ||
                                            []),
                                        ...(tutor.miscSubjects || []),
                                    ].join(", ")}
                                </td>
                                <td><Availability person={tutor} /></td>
                                <td>{tutor.status}</td>
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
