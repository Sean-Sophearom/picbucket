import { initializeApp, getApps, getApp } from "firebase/app";

import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  if (!getApps().length) {
    console.log("✔ Initialized Firebase");
    initializeApp(firebaseConfig);
  }
};

export const uploadImage = async (file: File, path: string) => {
  const app = getApp();
  const storage = getStorage(app, process.env.FIREBASE_BUCKET_URL);

  const time = new Date().getTime();
  const splitPath = path.split(".");
  const extension = splitPath.pop();
  path = splitPath.join(".") + "_" + time + "." + extension;

  const myref = ref(storage, path);

  const snapshot = await uploadBytes(myref, file);
  const url = await getDownloadURL(snapshot.ref);

  return { snapshot, url };
};

export const deleteImage = async (path: string) => {
  const app = getApp();
  const storage = getStorage(app, process.env.FIREBASE_BUCKET_URL);

  const myref = ref(storage, path);

  await deleteObject(myref);
}