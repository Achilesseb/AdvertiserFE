import firebase_app from "./config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(firebase_app);
let result = null,
  token: string | null = null,
  error = null;
export const signUp = async (email: string, password: string) => {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const logIn = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    token = await getIdToken(user);
  } catch (e) {
    error = e;
  }

  return { result, token, error };
};
