import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { firebaseApp } from "@/setup/api";

export default {
  get(context) {
    return new Promise((resolve, reject) => {
      getDocs(collection(firebaseApp.db, "products"))
        .then((snapshot) => {
          const products = [];
          for (let i in snapshot.docs) {
            const product = snapshot.docs[i];
            products.push({ id: product.id, ...product.data() });
          }
          context.commit("setProducts", products);
          resolve(products);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
