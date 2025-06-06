import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseApp } from "../firebaseApp";
import {
    getFirestore,
    getDoc,
    setDoc,
    collection,
    where,
    getCountFromServer,
    query,
    doc,
    getDocs,
} from "firebase/firestore";

// TODO: Caching

/**
 * @typedef {Object} TutorData
 * @property {string} firstName
 * @property {string} lastName
 * @property {boolean} attendedOrientation
 * @property {string} tutorManager // Note: this may change

 * @property {string[]} students // Note: this may change

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
 * @property {string} city
 * @property {string[]} mathSubjects
 * @property {string[]} scienceSubjects
 * @property {string[]} englishSubjects
 * @property {string[]} socialStudiesSubjects
 * @property {string[]} miscSubjects
 * @property {string} otherSubjects
 * @property {string[]} students 
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
 */

const tutorsSlice = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Tutors"],
    reducerPath: "tutors",
    endpoints: (builder) => ({
        /**
         * @type {builder.query<TutorData, string>}
         */
        getTutorById: builder.query({
            async queryFn(id) {
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "tutors", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { data: docSnap.data() };
                } else {
                    throw new Error("Document does not exist");
                }
            },
            providesTags: ["Tutors"],
        }),

        updateTutorById: builder.mutation({
            /**
             * @param {string} id
             * @param {TutorData} tutorData
             */
            async queryFn({ id, ...tutorData }) {
                const db = getFirestore(firebaseApp);
                const docRef = doc(db, "tutors", id);
                await setDoc(docRef, tutorData);
                return {};
            },
            invalidatesTags: ["Tutors"],
        }),

        /**
         * @type {builder.query<number, void>}
         */
        getNumberOfTutors: builder.query({
            async queryFn() {
                const db = getFirestore(firebaseApp);
                const tutorsCollection = collection(db, "tutors");
                const snapshot = await getCountFromServer(tutorsCollection);

                return { data: snapshot.data().count };
            },
            providesTags: ["Tutors"],
        }),

        /**
         * @type {builder.query<number, void>}
         */
        getNumberOfAvailableTutors: builder.query({
            async queryFn() {
                const db = getFirestore(firebaseApp);
                const tutorsCollection = collection(db, "tutors");
                const q = query(
                    tutorsCollection,
                    where("status", "==", "currentlyTutoringNeedsMoreStudents")
                );
                const snapshot = await getCountFromServer(q);

                return { data: snapshot.data().count };
            },
            providesTags: ["Tutors"],
        }),
        /**
         * @type {builder.query<TutorData[], void>}
         */
        getAvailableTutors: builder.query({
            async queryFn() {
                const db = getFirestore(firebaseApp);
                const tutorsCollection = collection(db, "tutors");

                try {
                    const snapshot = await getDocs(tutorsCollection);
                    const tutors = snapshot.docs.map((doc) => ({
                        id: doc.id, // Include the document ID
                        ...doc.data(), // Spread the document data
                    }));
                    return { data: tutors };
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: ["Tutors"],
        }),
    }),
});

export const {
    useGetTutorByIdQuery,
    useUpdateTutorByIdMutation,
    useGetNumberOfTutorsQuery,
    useGetNumberOfAvailableTutorsQuery,
    useGetAvailableTutorsQuery,
} = tutorsSlice;
export default tutorsSlice;
