import { setToken } from "../../setup/api";
import { collection, doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  updatePassword,
} from "firebase/auth";
import { firebaseApp, saveUserInfo, removeToken } from "@/setup/api";

export default {
  login(context, { email, password }) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(firebaseApp.auth, email, password)
        .then((response) => {
          setToken(response.user);
          context.commit("setUser", response.user);
          context.commit("setLogged", true);
          resolve();
        })
        .catch(reject);
    });
  },

  register(context, data) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(
        firebaseApp.auth,
        data.email,
        data.password
      )
        .then((response) => {
          setDoc(doc(firebaseApp.db, "user-data", data.email), {
            ...data,
            created_at: Timestamp.fromDate(new Date()),
          }).then();
          signInWithEmailAndPassword(data.email, data.password).then(() => {
            setToken(response.user);
            context.commit("setLogged", true);
            context.dispatch("postLogin", null, { root: true });
            resolve();
          });
        })
        .catch(reject);
    });
  },

  forgot(context, email) {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(firebaseApp.auth, email)
        .then(resolve)
        .catch(reject);
    });
  },

  resetPassword(context, data) {
    return new Promise((resolve, reject) => {
      confirmPasswordReset(firebaseApp.auth, data.code, data.password)
        .then(resolve)
        .catch(reject);
    });
  },

  get(context) {
    return new Promise((resolve, reject) => {
      const onSuccess = (doc) => {
        context.commit("setUser", { id: doc.id, ...doc.data() });
        saveUserInfo({ id: doc.id, ...doc.data() });
        if (window.FS) {
          window.FS.identify(doc.data().email, {
            displayName: doc.data().name,
            email: doc.data().email,
          });
        }
      };
      const onError = (error) => {
        context.commit("user/setLogged", false);
        context.commit("user/setUser", null);
        removeToken();
        reject(error);
      };
      const loggedUser = firebaseApp.auth.currentUser;
      if (loggedUser) {
        getDoc(doc(firebaseApp.db, "user-data", loggedUser.email))
          .then(onSuccess)
          .catch(onError);
      } else {
        onAuthStateChanged(firebaseApp.auth, (user) => {
          if (user === null) {
            setToken(null);
            reject();
          } else {
            getDoc(doc(firebaseApp.db, "user-data", user.email))
              .then(onSuccess)
              .catch(onError);
          }
        });
      }
    });
  },

  update(context, data) {
    return new Promise((resolve, reject) => {
      collection(firebaseApp.db, "user-data")
        .doc(data.email)
        .set(data, { merge: true })
        .then(function () {
          context.commit("updateUser", data);
          resolve();
        })
        .catch(reject);
    });
  },
  updateFirebasePassword(context, { newPassword }) {
    return new Promise((resolve, reject) => {
      updatePassword(newPassword).then(resolve).catch(reject);
    });
  },
  updateProgress(context, { progress, email }) {
    return new Promise((resolve, reject) => {
      collection(firebaseApp.db, "progress")
        .doc(email)
        .set(progress, { merge: true })
        .then(() => {
          context.commit("updateUser", { progress });
          resolve();
        })
        .catch(reject);
    });
  },
};
