# Almida Store

Website katalog produk digital bertema biru modern. Hosting GitHub Pages + Firebase Spark (Firestore & Authentication). Checkout via WhatsApp 085222433800.

## Publikasi

1. Upload `index.html` dan `firebase-config.js` ke **root** branch `main` repository `Murozie-12/Almida-store` (jangan upload ZIP tanpa diekstrak).
2. GitHub > Settings > Pages > Deploy from a branch > `main` > `/(root)` > Save.
3. Situs: https://murozie-12.github.io/Almida-store/ (tunggu deployment selesai).
4. Firebase Console: buat **proyek Firebase terpisah** dari B26MI, pilih paket **Spark**, daftarkan aplikasi Web (Firebase Hosting tidak diperlukan).
5. Aktifkan Firestore Database dan Authentication > Sign-in method > Email/Password.
6. Authentication > Users > Add user: buat email/password admin, lalu salin **User UID**.
7. Ganti `GANTI_UID_ADMIN` di **dua file**: `firebase-config.js` dan `firestore.rules`. Jangan memasukkan password admin ke kode.
8. Salin `firebaseConfig` aplikasi Web ke `firebase-config.js`. Publikasikan isi `firestore.rules` pada Firestore Database > Rules > Publish.
9. Commit file yang diperbarui. Buka website > Login Admin > masukkan email/password admin > tambahkan produk asli beserta harga dan deskripsi.

## Fitur

- Katalog dinamis dari Firestore, filter kategori/promo dan pencarian.
- Keranjang disimpan di localStorage browser.
- Checkout menyusun pesan dan membuka WhatsApp admin. **Tidak ada payment gateway atau transaksi otomatis.**
- Riwayat pesanan tersimpan **lokal pada browser yang sama** saat checkout ditekan. Tidak ada riwayat lintas perangkat, status otomatis, atau database pesanan pelanggan.
- Admin dapat login dan menambah/mengubah/menghapus produk. Firestore Rules membatasi perubahan ke UID admin.
- Bila Firebase belum dikonfigurasi, katalog menampilkan **produk contoh dengan harga ilustrasi**, tetapi checkout dinonaktifkan. Setelah Firebase aktif, katalog membaca produk asli dari database.

## Keamanan & batasan

- Jangan unggah service account JSON, private key, password, atau API secret. `firebaseConfig` web memang publik; pengamanan data wajib melalui Rules.
- Aturan Firestore membolehkan siapa pun membaca **semua** dokumen di koleksi `products`; jangan simpan data pribadi/rahasia di sana.
- Admin UID di JavaScript hanya untuk mengatur tampilan; **otorisasi sebenarnya dilakukan oleh Firestore Rules**.
- Jangan membuka akses publik write ke Firestore untuk order. Sistem ini sengaja tidak menyimpan order publik agar tidak rentan spam dan penyalahgunaan database gratis.
- Harga harus dikonfirmasi admin sebelum pembayaran; pelanggan dapat mengubah isi pesan WhatsApp dan keranjang di perangkatnya.
- Firebase Spark memiliki batas kuota. Penggunaan dan ketersediaan layanan dapat berubah.
- Saat menguji dengan browser, pastikan JavaScript module berjalan melalui GitHub Pages/HTTPS, bukan membuka file HTML lokal langsung.
