# ALMIDA STORE — GitHub Pages + Firebase

## Berkas publik (unggah ke GitHub Pages)
- `index.html` katalog pelanggan, **tanpa modal**.
- `firebase-config.js` konfigurasi proyek Firebase Web.
- `firebase-public.js` sinkronisasi katalog dari Firestore.
- `.nojekyll` untuk GitHub Pages.

`firestore.rules` hanya untuk disalin ke Firebase Console, tidak perlu dipublikasikan.

## Setup Firebase
1. Buat proyek di Firebase Console. Daftarkan aplikasi Web dan salin nilai `firebaseConfig` ke `firebase-config.js` di folder publik **dan** folder admin pribadi.
2. Aktifkan **Authentication > Sign-in method > Email/Password**. Buat satu akun admin di **Authentication > Users**.
3. Salin **UID** admin dari Authentication > Users, ganti `GANTI_DENGAN_UID_ADMIN` pada `firestore.rules`.
4. Buat database **Cloud Firestore**. Pada tab **Rules**, tempel isi `firestore.rules` dan tekan Publish. Jangan gunakan rules `allow read, write: if true`.
5. Pada **Authentication > Settings > Authorized domains**, tambahkan domain GitHub Pages Anda jika memakai admin yang dihosting di domain tersebut. Untuk admin lokal, jalankan lewat localhost (bukan file://) dan izinkan localhost bila diperlukan.
6. Buka `admin.html` dari folder admin pribadi melalui server lokal, misalnya `python -m http.server 8000` di folder itu lalu akses `http://localhost:8000/admin.html`.
7. Login, impor `data-modal-awal.json`, simpan privat, lalu klik **Publikasikan katalog pelanggan**.

**Penting:** jangan unggah folder admin pribadi atau `data-modal-awal.json` ke repository publik. Harga modal adalah data rahasia; semua dokumen yang dibaca pelanggan hanya boleh mengandung harga jual. Firebase Web API key bukan password; Firestore Rules yang membatasi akses.

## GitHub Pages
1. Buat repository GitHub baru, misalnya `almida-store` (Public).
2. Unggah isi folder `ALMIDA-GITHUB-FIREBASE` (terutama `index.html`, `firebase-config.js`, `firebase-public.js`, `.nojekyll`) ke root branch `main`.
3. Repository > Settings > Pages > Build and deployment > Deploy from a branch > `main` / `(root)` > Save.
4. Link umumnya `https://USERNAME.github.io/almida-store/` (ganti USERNAME dengan username GitHub).

## Catatan operasional
- Tanpa konfigurasi Firebase, halaman publik menampilkan katalog awal tertanam, bukan harga terbaru.
- Setelah Firebase terhubung dan katalog diterbitkan, halaman publik menerima perubahan Firestore secara real-time.
- Harga/ketersediaan dari Order Kuota **tidak otomatis** disinkronkan; admin harus memperbarui sumber data.
- File JSON privat adalah cadangan harga modal, simpan dengan aman.
- Admin HTML ini alat pengelolaan sederhana, bukan panel lengkap untuk mengedit produk satu per satu; edit JSON secara lokal sebelum impor ulang, atau gunakan admin offline sebelumnya untuk mengelola harga.
- GitHub Pages dan Firebase memiliki kuota gratis dan batas penggunaan; pantau billing/kuota di konsol Firebase.
