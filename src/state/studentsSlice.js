import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseApp } from "../firebaseApp";
import { getFirestore, getDoc, setDoc, doc, collection, getDocs } from "firebase/firestore";

// TODO: Caching

/**
 * @typedef {Object} StudentData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} tutorManager // Note: this may change
 * @property {string[]} tutors // Note: this may change
 * @property {string} notes
 * @property {string} status
 * @property {number} lastUpdated timestamp (seconds since epoch)
 * @property {string} email
 * @property {string} gender
 * @property {number} grade The student's grade (0 is K, 1 is 1st grade, ..., 13 is post-secondary)
 * @property {string} timezone
 * @property {boolean[]} availability A 1-D array of the tutor's availability between days, where index a+3b represents day a and slot b
 *  with days 0-6 where 0 is Sunday and slots 0-2 where 0 is morning (before noon), 1 is afternoon (noon-5pm), and 2 is evening (after 5pm)
 * @property {boolean} inPerson Whether the tutor is available in person; if virtual is also true, no preference was specified
 * @property {boolean} virtual Whether the tutor is available virtually; if inPerson is also true, no preference was specified
 *
 * @property {string} legalGuardianFirstName
 * @property {string} legalGuardianLastName
 * @property {string} legalGuardianHomeAddress
 * @property {string} legalGuardianPhoneNumber
 * @property {string} legalGuardianPhoneType
 *
 * @property {string} emergencyContactFullName
 * @property {string} emergencyContactPhoneNumber
 * @property {string} emergencyContactRelationship relationship to student
 *
 * @property {string[]} mathSubjects
 * @property {string[]} scienceSubjects
 * @property {string[]} englishSubjects
 * @property {string[]} socialStudiesSubjects
 * @property {string[]} miscSubjects
 * @property {string} otherSubjects
 *
 * @property {boolean} permitsMultipleTutors
 *
 * @property {boolean} prefersHomeworkHelp Whether the tutor prefers to provide occasional homework help;
 *  if both this and prefersSubjectHelp are false, no preference was specified
 * @property {boolean} prefersSubjectHelp Whether the tutor prefers to provide subject help;
 *  if both this and prefersHomeworkHelp are false, no preference was specified
 *
 * @property {string} primaryLanguage
 * @property {string} schoolName
 * @property {string} schoolDistrictName
 *
 * @property {string} sourceOfStudent How did you hear about this program?
 *
 * @property {string} ethnicityAndNationality
 *
 * @property {string} foodAllergies
 * @property {string} otherHealthConcerns
 * @property {boolean} hasEpipen
 */

const studentsSlice = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Students"],
    reducerPath: "students",
    endpoints: (builder) => ({
        /**
         * @type {builder.query<StudentData, string>}
         */
        getStudentById: builder.query({
            async queryFn(id) {
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "students", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { data: docSnap.data() };
                } else {
                    throw new Error("Document does not exist");
                }
            },
            providesTags: ["Tutors"],
        }),

        updateStudentById: builder.mutation({
            /**
             * @param {string} id
             * @param {StudentData} studentData
             */
            async queryFn({ id, ...studentData }) {
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "students", id);
                await setDoc(docRef, studentData);
                return {};
            },
            invalidatesTags: ["Tutors"],
        }),
        getAvailableStudents: builder.query({
            async queryFn() {
                const db = getFirestore(firebaseApp);
                const studentsCollection = collection(db, "students");

                try {
                    const snapshot = await getDocs(studentsCollection);
                    const students = snapshot.docs.map((doc) => ({
                        id: doc.id, // Include the document ID
                        ...doc.data(), // Spread the document data
                    }));
                    return { data: students };
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: ["Students"],
        }),
    })
})

export const {
    useGetStudentByIdQuery,
    useUpdateStudentByIdMutation,
    useGetAvailableStudentsQuery,
} = studentsSlice

export default studentsSlice;
