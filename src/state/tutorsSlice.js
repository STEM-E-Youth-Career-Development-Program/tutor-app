import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseApp } from "../firebaseApp";
import { getFirestore, getDocs, collection, where, getCountFromServer, query, doc } from "firebase/firestore";

// TUDO: fix caching
const tutorsSlice = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Tutors"],
    reducerPath: "api",
    endpoints: (builder) => ({
        /**
         * @type {builder.query<Record<string, any>, string>}
         */
        getTutorById: builder.query({
            async queryFn(id) {
                const db = getFirestore(firebaseApp)
                const docRef = doc(db, "tutors", id)
                const docSnap = await getDocs(docRef)
                if (docSnap.exists()) {
                    return { data: docSnap.data() }
                } else {
                    throw new Error("Document does not exist")
                }
            },
            providesTags: ["Tutors"]
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

export const { useGetTutorByIdQuery, useGetNumberOfTutorsQuery } = tutorsSlice
export default tutorsSlice;
