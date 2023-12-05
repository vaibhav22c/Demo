import { firestore } from "../firebase.ts";
import { collection } from "./utils/collection.utils.ts";

interface IUpdateData {
  [key: string]: string | number;
}
export const updateTask = (docId: string, updateData: IUpdateData) => {
  // update task in firestore
  const docRef = firestore.collection(collection.task).doc(docId);

  return docRef
    .update(updateData)
    .then(() => {
      return 'updates';
    })
    .catch((error) => {
      throw error;
    });
};