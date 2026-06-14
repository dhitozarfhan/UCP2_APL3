# LAPORAN UCP 2: APLIKASI MULTIMEDIA INTERAKTIF
## ANTI BURNOUT JUNIOR
> **"Belajar Menghadapi Hidup Tanpa Burnout"**

### Tim Penyusun
1. **Dzaky Hanif Annafi** — NIM: 20220140077 (Pembuatan UI/UX Aplikasi)
2. **Pradipta Pratama Putra** — NIM: 20230140037 (Perancang Isi Konten Aplikasi)
3. **Erindhito Nur Fauzan** — NIM: 20230140115 (Pengumpulan Elemen Multimedia & Dokumentasi)

**Dosen Pengampu:** Dr. Reza Giga Isnanda, S.T., M.Sc.  
**Program Studi:** Teknologi Informasi, Fakultas Teknik, Universitas Muhammadiyah Yogyakarta  
**Tahun Akademik:** 2026

---

## 💡 Konsep Utama & Deskripsi Aplikasi
Aplikasi **Adulting 101: The Junior Edition** adalah media *self-healing* digital interaktif berbasis web yang dikembangkan khusus untuk remaja usia 12–15 tahun. Aplikasi ini didesain dengan pendekatan **"Show, Don't Tell"** untuk membantu remaja mengenali, memahami, dan mengelola kejenuhan mental (*burnout*) secara interaktif dan menenangkan tanpa merasa digurui.

### Fitur Utama
1. **Opening Screen:** Splash screen pengenalan dengan logo, slogan, cuplikan video panduan, dan *background music* (BGM) penenang.
2. **Burnout Check (Quiz):** Diagnostik tingkat stres remaja secara interaktif (skala rendah, sedang, tinggi) dengan feedback animasi dan panduan pemulihan.
3. **Kenali Burnout:** Psycho-education visual interaktif mengenai pengertian, penyebab, dampak, serta grid 6 gejala utama burnout.
4. **Mini Solutions:** Kotak relaksasi instan berisi panduan latihan napas (4-4-4s), focus timer Pomodoro yang berfungsi penuh, gerakan stretching, dan digital detox challenge.
5. **Mood Tracker:** Jurnal harian emosi berbasis emoji dengan kalender emosional bulanan yang di-cache menggunakan `localStorage`.
6. **Daily Mindset Boost:** Carousel kutipan afirmasi positif harian dengan simulasi suka/bagikan serta video vlog motivasi pendek.
7. **Self-Healing Checklist:** Check-in rutinitas sehat harian (tidur cukup, air putih, olahraga, detoks layar) dengan bar indikator kemajuan (progress bar).

---

## 🛠️ Cara Menjalankan Aplikasi Secara Lokal
Aplikasi ini dibangun menggunakan framework **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**.

1. Pastikan Anda telah memasang **Node.js** di komputer Anda.
2. Buka folder workspace `D:\UCPMUL_AUB` di terminal Anda.
3. Pasang semua dependensi yang dibutuhkan:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka peramban (browser) Anda di: **[http://localhost:3000](http://localhost:3000)**.

---

## 📂 Tabel Registrasi Aset Multimedia & Link Sumber
Berikut adalah daftar seluruh aset multimedia yang digunakan dalam aplikasi. Aset-aset ini ditempatkan di dalam direktori `/public` dan dipetakan sesuai dengan halaman yang bersangkutan. Anda dapat mengunduh aset asli menggunakan tautan bebas lisensi (copyright-free) di bawah ini untuk menggantikan placeholder bawaan aplikasi:

| No | Halaman Konten | Elemen | Nama Aset | Path File Lokal | Deskripsi Visual / Audio | Link Sumber Bebas Lisensi (Copyright-Free) |
|---|---|---|---|---|---|---|
| **1** | Content 1: Opening | Gambar | `logo.png` | `/public/images/logo.png` | Ilustrasi ikon logo Adulting 101 bergradasi kalem. | [Download via Pixabay](https://pixabay.com/illustrations/lotus-flower-yoga-meditation-zen-7994468/) |
| **2** | Content 1: Opening | Gambar | `study-table.png` | `/public/images/study-table.png` | Ilustrasi suasana meja belajar anak sekolah penuh buku/tugas. | [Download via Pixabay](https://pixabay.com/illustrations/girl-studying-room-illustration-8293021/) |
| **3** | Content 1: Opening | Video | `opening-intro.mp4` | `/public/videos/opening-intro.mp4` | Video pendek remaja yang terlihat lelah belajar, lalu membuka aplikasi. | [Download via Pexels](https://www.pexels.com/video/a-student-yawning-while-studying-5904838/) |
| **4** | Content 1: Opening | Audio | `calm-bg.mp3` | `/public/audio/calm-bg.mp3` | Background music piano lofi ambient damai (disintesis otomatis via Web Audio API). | [Download mp3 Piano](https://pixabay.com/music/meditation-piano-calm-ambient-166299/) |
| **5** | Content 3: Kenali | Video | `burnout-explained.mp4` | `/public/videos/burnout-explained.mp4` | Animasi visualisasi sel otak remaja ketika kelelahan dan stres. | [Download via Pexels](https://www.pexels.com/video/close-up-view-of-brain-activity-simulation-6582531/) |
| **6** | Content 4: Solutions | Video | `solutions-demo.mp4` | `/public/videos/solutions-demo.mp4` | Demonstrasi latihan peregangan (stretching) & pernapasan rileks. | [Download via Pexels](https://www.pexels.com/video/young-woman-doing-deep-breathing-stretching-exercises-8334460/) |
| **7** | Content 4: Solutions | Audio | `nature-relax.mp3` | `/public/audio/nature-relax.mp3` | Suara alam menenangkan (suara hujan & kicau burung di hutan). | [Download mp3 Rain](https://pixabay.com/sound-effects/soft-rain-ambient-111154/) |
| **8** | Content 4: Solutions | Audio | `focus-chime.wav` | `/public/audio/focus-chime.wav` | Sound effect denting lonceng kecil penanda sesi Focus Timer selesai. | [Download wav Bell](https://pixabay.com/sound-effects/desk-bell-single-ring-81033/) |
| **9** | Content 5: Mood | Gambar | `mood-calendar.png` | `/public/images/mood-calendar.png` | Ilustrasi latar emosional bertabur bintang pastel yang damai. | [Download via Pixabay](https://pixabay.com/illustrations/background-starry-sky-clouds-purple-8461019/) |
| **10** | Content 6: Mindset | Video | `motivational-vlog.mp4` | `/public/videos/motivational-vlog.mp4` | Video pemandangan alam estetik (pantai/hutan) berdurasi 1 menit. | [Download via Pexels](https://www.pexels.com/video/aerial-footage-of-a-pine-forest-9634790/) |
| **11** | Content 6: Mindset | Audio | `boost-bg.mp3` | `/public/audio/boost-bg.mp3` | Latar musik meditasi gitar akustik untuk menambah kehangatan hati. | [Download mp3 Guitar](https://pixabay.com/music/acoustic-calm-acoustic-guitar-for-study-break-111818/) |
| **12** | Content 7: Checklist | Gambar | `checklist-bg.png` | `/public/images/checklist-bg.png` | Ilustrasi botol minum air putih, ranjang tidur, dan ikon bebas HP. | [Download via Pixabay](https://pixabay.com/illustrations/water-bottle-fitness-diet-icon-3353597/) |

---

## 🛡️ Catatan Tambahan bagi Pengembang (Tips Mengganti Aset)
1. **Mengganti Video/Audio:** Simpan file baru di direktori yang sesuai (misal `/public/videos/opening-intro.mp4`). Pastikan namanya sama persis, atau ubah tag `<video>` / `<audio>` di dalam masing-masing file komponen.
2. **Web Audio API Fallback:** Jika Anda belum memindahkan file `calm-bg.mp3` ke folder `/public/audio/`, sistem secara cerdas akan mensintesis nada penenang (akor C3 & G3) menggunakan gelombang sinus (*sine wave*) bawaan browser agar aplikasi tidak hening dan terhindar dari *crash*.
