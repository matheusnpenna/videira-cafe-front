import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { firebaseApp } from "@/setup/api";

export default {
  get(context) {
    return new Promise((resolve, reject) => {
      getDocs(collection(firebaseApp.db, "inventory"))
        .then((snapshot) => {
          const inventories = [];
          for (let i in snapshot.docs) {
            const inventory_day = snapshot.docs[i];
            inventories.push({ id: inventory_day.id, ...inventory_day.data() });
          }
          context.commit("setInventories", inventories);
          resolve(inventories);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
