// import axios from "axios";
// import Vue from "vue";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// window.axios = axios;

// window.axios.defaults.baseURL = "BASE_PRODUCTION_URL";

// if (process.env.NODE_ENV === "development") {
//   window.axios.defaults.baseURL = "BASE_DEV_URL";
// }

// window.axios.defaults.timeout = 1000 * 60 * 5;

const TOKEN_KEY = "@VIDEIRA_CAFE@";
const USER_KEY = "@VIDEIRA_CAFE_USER@";

// const setAxiosHeader = token => {
//   if (token) {
//     window.axios.defaults.headers.common.Authorization = `JWT ${token}`;
//   } else {
//     delete window.axios.defaults.headers.common.Authorization;
//   }
// };

const app = initializeApp({
  apiKey: "AIzaSyDBTJvimwo32tqC0QmC3iv4xCdg5L0DgEo",
  authDomain: "videiracafe-4ee95.firebaseapp.com",
  projectId: "videiracafe-4ee95",
  storageBucket: "videiracafe-4ee95.appspot.com",
  messagingSenderId: "720935133612",
  appId: "1:720935133612:web:67a56937b8cf3b2ca51a09",
});
const db = getFirestore(app);
const auth = getAuth(app);

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

const saveUserInfo = (userInfo) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
};

const getUserInfo = () => {
  const info = localStorage.getItem(USER_KEY);
  if (info) {
    return JSON.parse(info);
  }
  return null;
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const init = () => {
  auth.useDeviceLanguage();
};

const firebaseApp = {
  app,
  db,
  auth,
};

export {
  setToken,
  getToken,
  removeToken,
  saveUserInfo,
  getUserInfo,
  init,
  firebaseApp,
};
