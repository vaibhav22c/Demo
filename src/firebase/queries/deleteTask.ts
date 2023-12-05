import { firestore } from "../firebase.ts";
import { collection } from "./utils/collection.utils.ts";

interface IUpdateData {
  [key: string]: string | number;
}
export const deleteTask = (docId: string) => {
  // delete task from firestore
  const docRef = firestore.collection(collection.task).doc(docId);

  return docRef.delete()
    .then(() => {
      return 'updates';
    })
    .catch((error) => {
      throw error;
    });
};