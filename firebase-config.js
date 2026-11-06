// Salin konfigurasi aplikasi WEB dari Firebase Console > Project settings > Your apps.
// Ini konfigurasi publik, BUKAN service account/private key.
const firebaseConfig = {
  apiKey: "AIzaSyD0dhXqZEFqxjXkDl1LQLyD827G1fAipcc",
  authDomain: "almida-store.firebaseapp.com",
  projectId: "almida-store",
  storageBucket: "almida-store.firebasestorage.app",
  messagingSenderId: "396618690684",
  appId: "1:396618690684:web:ebccb7277ade65749d99f9"
};
// Firebase Console > Authentication > Users > pilih user admin > salin User UID.
// Harus cocok dengan UID pada firestore.rules.
export const ADMIN_UID = 'YFfLMVGc7MUFTDlBVrzYNQzH9lI3';
