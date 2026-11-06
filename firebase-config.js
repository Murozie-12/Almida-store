// Salin konfigurasi aplikasi WEB dari Firebase Console > Project settings > Your apps.
// Ini konfigurasi publik, BUKAN service account/private key.
export const firebaseConfig = {
  apiKey: 'GANTI_API_KEY',
  authDomain: 'GANTI_PROJECT_ID.firebaseapp.com',
  projectId: 'GANTI_PROJECT_ID',
  storageBucket: 'GANTI_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'GANTI_SENDER_ID',
  appId: 'GANTI_APP_ID'
};
// Firebase Console > Authentication > Users > pilih user admin > salin User UID.
// Harus cocok dengan UID pada firestore.rules.
export const ADMIN_UID = 'GANTI_UID_ADMIN';
