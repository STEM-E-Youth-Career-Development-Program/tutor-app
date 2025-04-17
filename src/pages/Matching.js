import React from "react";
import "./Matching.css";
import {
    useGetTutorByIdQuery,
    useUpdateTutorByIdMutation,
} from "../state/tutorsSlice";
import {
    useGetAvailableStudentsQuery,
    useUpdateStudentByIdMutation,
} from "../state/studentsSlice";
import { useNavigate, useParams, Link } from "react-router-dom";

function Matching() {
    const { id: tutorId } = useParams();
    const {
        data: tutor,
        isLoading: tutorLoading,
        error: tutorError,
    } = useGetTutorByIdQuery(tutorId);
    const {
        data: availableStudents,
        isLoading: studentsLoading,
        error: studentsError,
    } = useGetAvailableStudentsQuery();
    console.log(availableStudents);
    const [updateTutor] = useUpdateTutorByIdMutation();
    const [updateStudent] = useUpdateStudentByIdMutation();
    const navigate = useNavigate();

    if (tutorLoading || studentsLoading) {
        return <div>Loading...</div>;
    }
    if (tutorError || studentsError) {
        return (
            <div>Error: {tutorError?.message || studentsError?.message}</div>
        );
    }
    if (!tutor) {
        return <div>Tutor not found.</div>;
    }

    // Ranking algorithm calculates a match score for each student based on overlapping properties.
    const rankedStudents = availableStudents
        .map((student) => {
            let score = 0;

            // Subject matching awards 5 points per matching subject in key categories.
            if (tutor.mathSubjects?.length && student.mathSubjects?.length) {
                const mathMatches = tutor.mathSubjects.filter((subj) =>
                    student.mathSubjects.includes(subj)
                ).length;
                score += mathMatches * 5;
            }
            if (
                tutor.scienceSubjects?.length &&
                student.scienceSubjects?.length
            ) {
                const scienceMatches = tutor.scienceSubjects.filter((subj) =>
                    student.scienceSubjects.includes(subj)
                ).length;
                score += scienceMatches * 5;
            }
            if (
                tutor.englishSubjects?.length &&
                student.englishSubjects?.length
            ) {
                const englishMatches = tutor.englishSubjects.filter((subj) =>
                    student.englishSubjects.includes(subj)
                ).length;
                score += englishMatches * 5;
            }
            if (
                tutor.socialStudiesSubjects?.length &&
                student.socialStudiesSubjects?.length
            ) {
                const socialMatches = tutor.socialStudiesSubjects.filter(
                    (subj) => student.socialStudiesSubjects.includes(subj)
                ).length;
                score += socialMatches * 5;
            }
            if (tutor.miscSubjects?.length && student.miscSubjects?.length) {
                const miscMatches = tutor.miscSubjects.filter((subj) =>
                    student.miscSubjects.includes(subj)
                ).length;
                score += miscMatches * 3;
            }

            // adds points if both tutor and student prefer in-person or virtual
            if (tutor.inPerson && student.inPerson) score += 10;
            if (tutor.virtual && student.virtual) score += 10;

            // add points if preferences for homework or subject help match.
            if (
                tutor.prefersHomeworkHelp !== undefined &&
                student.prefersHomeworkHelp !== undefined &&
                tutor.prefersHomeworkHelp === student.prefersHomeworkHelp
            ) {
                score += 5;
            }
            if (
                tutor.prefersSubjectHelp !== undefined &&
                student.prefersSubjectHelp !== undefined &&
                tutor.prefersSubjectHelp === student.prefersSubjectHelp
            ) {
                score += 5;
            }

            return { ...student, score };
        })
        .sort((a, b) => b.score - a.score); // Highest match score first

    // Handle matching: updates both the student and tutor records.
    const handleMatch = async (studentIdToMatch) => {
        try {
            // Finds the student to update from the available list.
            const studentToUpdate = availableStudents.find(
                (s) => s.id === studentIdToMatch
            );
            if (!studentToUpdate) {
                alert("Student not found");
                return;
            }

            // Updates the student record: adds the tutor's id and sets status to "matched"
            await updateStudent({
                id: studentIdToMatch,
                tutors: [...(studentToUpdate.tutors ?? []), tutorId],
                status: "matched",
            });

            // Updates the tutor record: adds the student's id, updates the student count, and sets status to "matched"
            await updateTutor({
                id: tutorId,
                students: [...(tutor.students ?? []), studentIdToMatch],
                numStudents: (tutor.numStudents || 0) + 1,
                status: "matched",
            });

            navigate(`/view-tutor-info/${tutorId}`);
        } catch (error) {
            console.error("Error matching tutor to student:", error);
            alert("Error matching tutor to student. Please try again.");
        }
    };

    return (
        <div className="matching-page">
            <h1>
                Matching for Tutor: {tutor.firstName} {tutor.lastName}
            </h1>
            <div className="table-container">
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Grade</th>
                            <th>Subjects</th>
                            <th>Availability</th>
                            <th>Status</th>
                            <th>Score</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedStudents.map((student) => (
                            <tr key={student.id}>
                                <td>
                                    <Link
                                        to={`/view-student-info/${student.id}`}
                                    >
                                        {student.firstName} {student.lastName}
                                    </Link>
                                </td>
                                <td>{student.grade}</td>
                                <td>
                                    {[
                                        ...(student.mathSubjects || []),
                                        ...(student.scienceSubjects || []),
                                        ...(student.englishSubjects || []),
                                        ...(student.socialStudiesSubjects ||
                                            []),
                                        ...(student.miscSubjects || []),
                                    ].join(", ")}
                                </td>
                                <td>{student.availability?.join(", ")}</td>
                                <td>{student.status}</td>
                                <td>{student.score}</td>
                                <td>
                                    <button
                                        onClick={() => handleMatch(student.id)}
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
