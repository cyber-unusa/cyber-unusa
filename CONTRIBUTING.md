# Panduan Kontribusi - Sistem Informasi UKM Cyber UNUSA 🚀

Halo! Selamat datang di repositori resmi Sistem Informasi UKM Cyber Security Universitas Nahdlatul Ulama Surabaya.

Kami sangat mengapresiasi waktu dan tenaga yang kamu berikan untuk mengembangkan sistem ini. Agar proses _development_ kita berjalan rapi, minim _error_, dan mudah di-_maintenance_ oleh kepengurusan selanjutnya, mohon baca dan ikuti panduan kontribusi di bawah ini ya!

---

## 🛠️ 1. Persiapan Awal (Setup)

Sebelum mulai menulis kode, pastikan kamu sudah melakukan hal berikut:

1. Pastikan akun GitHub kamu sudah diundang (_invited_) ke dalam repositori ini oleh Kepala Divisi / Pengurus Harian.
2. Lakukan _clone_ repositori ke komputer lokal kamu:
   ```bash
   git clone https://github.com/cyber-unusa/cyber-unusa.git
   ```
3. Masuk ke folder project, lalu install semua dependency (baik di folder client maupun server):

   ```bash
   cd cyber-unusa/client && npm install
   cd ../server && npm install
   ```

4. Mintalah file .env (Environment Variables) kepada Tech Lead atau Kadiv kamu dan letakkan di folder client dan server. JANGAN PERNAH mengunggah file .env ke GitHub!

---

## 🌿 2. Aturan Branching (Cabang)

Kita menggunakan sistem branching agar fitur yang sedang kamu kerjakan tidak merusak aplikasi utama.

- main: Adalah branch utama (Production). Dilarang keras melakukan commit atau push langsung ke branch ini.

- Branch Fitur/Bug: Saat mendapat tugas, buatlah branch baru dari main dengan format penamaan berikut:
  - Untuk fitur baru: feat/nama-fitur (Contoh: feat/login-page)

  - Untuk perbaikan error: fix/nama-error (Contoh: fix/button-bug)

  - Untuk dokumentasi/desain: docs/update-readme atau ui/header-design

Cara membuat branch baru:

```bash
  git checkout -b feat/nama-fitur-kamu
```

---

## 💬 3. Aturan Pesan Commit (Commit Messages)

Pesan commit yang rapi akan sangat membantu kita melacak perubahan di masa depan. Gunakan format [Tipe]: [Pesan Singkat].

Tipe yang diizinkan:

- feat: : Menambahkan fitur baru.

- fix: : Memperbaiki bug / error.

- ui: : Mengubah tampilan CSS/Tailwind tanpa mengubah logika.

- refactor: : Merapikan struktur kode tanpa mengubah fungsinya.

- docs: : Mengubah dokumentasi (README, komentar kode).

Contoh yang Benar ✅:

```bash
feat: menambahkan fitur pop-up modal pada halaman merchandise
fix: mengatasi error gagal login pada sisi client
```

Contoh yang Salah ❌:

```bash
update codingan
benerin error dikit
push hari ini
```

---

## 🚀 4. Alur Penggabungan Kode (Pull Request)

Sudah selesai coding? Bagus! Ini cara mengirimkan kodemu:

1. Simpan dan dorong (push) branch kamu ke GitHub:

```bash
git add .
git commit -m "feat: deskripsi pekerjaanmu"
git push origin feat/nama-fitur-kamu
```

2. Buka GitHub repositori ini, lalu klik tombol "Compare & pull request".

3. Isi deskripsi PR dengan jelas:

- Apa yang kamu ubah/tambahkan?
- Apakah ada instalasi library baru (`npm install <sesuatu>`)?
- (Opsional) Lampirkan screenshot jika kamu mengubah tampilan antarmuka (UI).

4. Minta setidaknya 1 Reviewer (biasanya Kadiv atau Programmer Senior) untuk mengecek kodenya (Code Review).

5. Jika sudah di- Approve, kode kamu akan di- Merge ke branch main oleh reviewer.

---

## 🧹 5. Standar Penulisan Kode (Clean Code)

- Gunakan bahasa Inggris untuk penamaan variabel dan fungsi (contoh: getUser, isClosed, productData).

- Hapus semua console.log() yang tidak penting sebelum membuat Pull Request.

- Berikan komentar (//) pada bagian kode yang logikanya rumit agar temanmu yang lain mudah memahaminya.

- Format kode kamu dengan Prettier atau ekstensi formatter bawaan VS Code sebelum di- commit.

---

## Terima kasih sudah berkontribusi! Mari kita bangun sistem UKM Cyber yang lebih baik! 💻🔥
