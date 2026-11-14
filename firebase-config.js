// Isi dari Firebase Console > Project settings > Your apps > Web app.
// apiKey Firebase untuk web bukan password rahasia. Keamanan ada di Firestore Rules.
export const firebaseConfig = {
  apiKey: "AIzaSyD0dhXqZEFqxjXkDl1LQLyD827G1fAipcc",
  authDomain: "almida-store.firebaseapp.com",
  projectId: "almida-store",
  storageBucket: "almida-store.firebasestorage.app",
  messagingSenderId: "396618690684",
  appId: "1:396618690684:web:ebccb7277ade65749d99f9"
};
export const configured = !firebaseConfig.apiKey.startsWith("ISI_") && !firebaseConfig.projectId.startsWith("ISI_");
