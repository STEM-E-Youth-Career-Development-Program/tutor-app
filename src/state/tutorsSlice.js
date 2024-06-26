import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseApp } from "../firebaseApp";
import { getFirestore, getDoc, setDoc, collection, where, getCountFromServer, query, doc } from "firebase/firestore";

// TODO: Caching

/**
 * @typedef {Object} TutorData
 * @property {string} firstName
 * @property {string} lastName
 * @property {boolean} attendedOrientation
 * @property {string} tutorManager // Note: this may change
 * @property {string} notes
 * @property {string} status
 * @property {number} lastUpdated timestamp (seconds since epoch)
 * @property {string} email
 * @property {string} gender
 * @property {number} grade The student's grade (0 is K, 1 is 1st grade, ..., 13 is post-secondary)
 * @property {string} timezone
 * @property {Array} availability A 1-D array of the tutor's availability between days, where index a+3b represents day a and slot b
 *  with days 0-6 where 0 is Sunday and slots 0-2 where 0 is morning (before noon), 1 is afternoon (noon-5pm), and 2 is evening (after 5pm)
 * @property {boolean} inPerson Whether the tutor is available in person; if virtual is also true, no preference was specified
 * @property {boolean} virtual Whether the tutor is available virtually; if inPerson is also true, no preference was specified
 * @property {string} city
 * 
 * @property {Array[string]} mathSubjects
 * @property {Array[string]} scienceSubjects
 * @property {Array[string]} englishSubjects
 * @property {Array[string]} socialStudiesSubjects
 * @property {Array[string]} miscSubjects
 * @property {string} otherSubjects
 * 
 * @property {string} numStudentsRange
 * @property {string} numHoursRange
 * 
 * @property {boolean} prefersHomeworkHelp Whether the tutor prefers to provide occasional homework help; 
 *  if both this and prefersSubjectHelp are false, no preference was specified
 * @property {boolean} prefersSubjectHelp Whether the tutor prefers to provide subject help;
 *  if both this and prefersHomeworkHelp are false, no preference was specified
 * 
 * @property {string} priorExperienceDescription
 * @property {string} gpa
 * @property {string} letterGradeInSubjectsTutoring
 * @property {string} reasonForTutoring
 * @property {string} fluentLanguages
 */

const tutorsSlice = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Tutors"],
    reducerPath: "api",
    endpoints: (builder) => ({
        /**
         * @type {builder.query<TutorData, string>}
         */
        getTutorById: builder.query({
            async queryFn(id) {
                const db = getFirestore(firebaseApp)
                const docRef = doc(db, "tutors", id)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    return { data: docSnap.data() }
                } else {
                    throw new Error("Document does not exist")
                }
            },
            providesTags: ["Tutors"]
        }),

        updateTutorById: builder.mutation({
            /**
             * @param {string} id 
             * @param {TutorData} tutorData 
             */
            async queryFn({ id, ...tutorData }) {
                const db = getFirestore(firebaseApp)
                const docRef = doc(db, "tutors", id)
                await setDoc(docRef, tutorData)
                return {}
            },
            invalidatesTags: ["Tutors"]
        }),

        /**
         * @type {builder.query<number, void>}
         */
        getNumberOfTutors: builder.query({
            async queryFn() {
                const db = getFirestore(firebaseApp)
                const tutorsCollection = collection(db, "tutors")
                const snapshot = await getCountFromServer(tutorsCollection);

                return { data: snapshot.data().count }
            },
            providesTags: ["Tutors"]
        }),

        /**
         * @type {builder.query<number, void>}
         */
        getNumberOfAvailableTutors: builder.query({
            async queryFn() {
                const db = getFirestore(firebaseApp)
                const tutorsCollection = collection(db, "tutors")
                const q = query(tutorsCollection, where("status", "==", "currentlyTutoringNeedsMoreStudents"))
                const snapshot = await getCountFromServer(q);

                return { data: snapshot.data().count }
            },
            providesTags: ["Tutors"]
        })
    })
})

export const { 
    useGetTutorByIdQuery,
    useUpdateTutorByIdMutation,
    useGetNumberOfTutorsQuery,
    useGetNumberOfAvailableTutorsQuery,
} = tutorsSlice
export default tutorsSlice;
