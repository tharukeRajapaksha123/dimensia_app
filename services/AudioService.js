import { firestore } from "../firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import SongModel from "../models/SongModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchAudio = async (emotion) => {
  let audios = [];
  const age = await ageRangeGetter();
  console.log(`current user age is ${age}`);
  const q = query(
    collection(firestore, "audio"),
    where("category", "==", emotion),
    where("ageRange", "==", age)
  );
  await getDocs(q)
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        const track = new SongModel(
          doc.data()["url"],
          doc.data()["artist"],
          doc.data()["category"],
          doc.data()["ageRange"]
        );
        audios.push(track);
      });
    })
    .catch((err) => {
      console.log(`Error in get auidos ${err}`);
      return [];
    });
  console.log(audios);
  return audios;
};

const ageRangeGetter = async () => {
  const age = await AsyncStorage.getItem("age");
  if (age >= 40 && age <= 50) {
    return 1;
  }
  if (age > 50 && age <= 60) {
    return 2;
  }
  if (age > 60 && age <= 70) {
    return 3;
  }
  if (age > 70 && age <= 80) {
    return 4;
  }
};
