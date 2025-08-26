# profile-cyber

Web company profile v2.0 UKM Cyber Computer Security Universitas Nahdlatul Ulama Surabaya

## Tech Stack

**Client:** React, TailwindCSS,

**Server:** Node, Express, MongoDB,

# Kolaborasi

Clone projeck

```bash
  git clone https://github.com/cyber-unusa/profile-cyber.git
```

masuk ke projeck directory

```bash
  cd profile-cyber
```

untuk pengguna vs code

```bash
  code .
```

# Development

## Front End Development

untuk set up development

```bash
  cd client
  npm i
```

sebelum menjalankan `client` buat file `.env` untuk koneksi ke server. sesuaikan dengan sample

- `VITE_BACKEND_URL`

menjalankan `client` unutuk development

```bash
  npm run dev
```

untuk set up development

## Backend devlopment

```bash
  cd server
  npm i
```

sebelum menjalankan `server` buat file `.env` untuk koneksi ke server. sesuaikan dengan sample

- `MONGODB_URL` => ada di mogodb cyber
- `SMTP_USER` `SMTP_PASS`
- `SENDER_EMAIL`

menjalankan `server` untuk development

```bash
  npm run server
```

## Push Project

Buat dan pindah ke branch baru.
Contoh nama branch: `feature/user-authentication` atau `fix/header-layout-bug`

```bash
git checkout -b [nama-branch-deskriptif]
```

Tambahkan perubahan ke staging area

```bash
  git add .
```

Commit perubahan dengan pesan yang jelas
Contoh: `feat: Menambahkan validasi form pendaftaran`

```bash
  git commit -m "[pesan]"
```

Push Branch ke Repository Utama 🚀

```bash
  git push -u origin [nama-branch-deskriptif]
```

## Kontribusi

Untuk perubahan besar, silakan buka masalah terlebih dahulu untuk membahas apa yang ingin di ubah atau ditambahkan.

Pastikan untuk memperbarui pengujian sesuai kebutuhan.

#### Link Production

[ukm-cyber-unusa.netlify.app](https://ukm-cyber-unusa.netlify.app)
