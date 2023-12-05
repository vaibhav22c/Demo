import { firestore } from "../firebase.ts";
import { collection } from "./utils/collection.utils.ts";


export const addTask = (payload: any) => {
  // create task and store into firestore
  const collectionRef = firestore.collection(collection.task);

  return collectionRef
    .add(payload)
    .then((docRef) => {
      return docRef.id;
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      throw error;
    });
};