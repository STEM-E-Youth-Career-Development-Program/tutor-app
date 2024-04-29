import { createContext, useContext } from "react";

export const FirebaseAppContext = createContext(null);

/**
 * @returns {import("firebase/app").FirebaseApp}
 */
export function useFirebaseApp() {
  return useContext(FirebaseAppContext);
}