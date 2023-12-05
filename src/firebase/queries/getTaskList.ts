import { firestore } from "../firebase.ts";
import { collection } from "./utils/collection.utils.ts";

const fetchTaskList = async () => {
  try {
    const collectionRef = firestore.collection(collection.task);
    const snapshot = await collectionRef.get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      status: doc.data().status,
      description: doc.data().description,
      title: doc.data().title,
    }));
    return data;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
  }
};

export default fetchTaskList;