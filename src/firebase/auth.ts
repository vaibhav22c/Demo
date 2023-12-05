import { toast } from "react-toastify";
import { auth, firestore } from "./firebase.ts";
import { collection } from "./queries/utils/collection.utils.ts";
interface IProps {
  email: string;
  password: string;
  navigate: any
}
export interface UserData {
  id?: string;
  email: string;
  name: string;
  role: string;
}

export const signIn = async (props: IProps) => {
  const { email, password } = props;
  try {
    // sign in with email and password in firebase query
    const res = await auth.signInWithEmailAndPassword(email, password)
    return res
  } catch (error) {
    toast(error.message, { type: 'error' })
  }
};

export const registerUser = async (props: any) => {
  const { email, password, name, role } = props;

  try {
    // register user with email and password
    // email and password are reqired
    const res = await auth.createUserWithEmailAndPassword(email, password)
    await addUser({ email, name, role, id: res?.user?.uid })
    return { email, name, role, id: res?.user?.uid }
  } catch (error) {
    toast(error.message, { type: 'error' })
    return false
  }
};

export const sendResetPassMail = async (props: any) => {
  const { email, navigate } = props;
  try {
    // email are required
    // enter email and sent reset password link into mail
    // user can change the password from reset link
    await auth.sendPasswordResetEmail(email)
    return true
  } catch (error) {
    toast(error.message, { type: 'error' })
    return false
  }
};

export const addUser = async (payload: any) => {
  // entry into user collection after register in auth and entry into user for same id
  await firestore.collection(collection.users).doc(payload?.id).set(payload)
  return true;
};

export const signOut = async () => {
  await auth.signOut()
  return true;
};

const fetchUserData = async (uid: string | null): Promise<any> => {
  try {
    if (uid) {
      // get data from firestore
      const snapshot = await firestore.collection(collection.users).doc(uid).get();
      return snapshot.data() as UserData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};


export const checkAuth = (navigate: any, userId): Promise<UserData | null> => {
  return new Promise(async (resolve, reject) => {

    // check auth and which user are loggedin
    // and return login user data
    auth.onAuthStateChanged(async (user: any) => {
      if (!user) {
        console.error('Access to protected route denied, redirecting to login...');
        navigate('/login');
        reject('Access denied');
      } else {
        try {
          const userData = await fetchUserData(userId);
          if (userData) {
            resolve(userData);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}
