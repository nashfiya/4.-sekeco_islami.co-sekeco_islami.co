# TODO & Development Roadmap
## Islami.co - SuperApp Ekosistem Muslim Modern

Catatan progres pengerjaan fitur aplikasi Islami.co.

---

### Phase 1: Core Setup & UI Architecture (Completed ✔)
- [x] Inisialisasi struktur proyek (`index.html`, `css/`, `js/`, `assets/`).
- [x] Desain ulang antarmuka mengadopsi tema **Luxury Dark Obsidian & Amber Gold** sesuai gambar referensi.
- [x] Pembuatan background ornamen mandala geometri Islam halus (Arabesque watermark).
- [x] Pembuatan komponen Dynamic Island & Smartphone Frame responsif dengan toggle Desktop Fullscreen.
- [x] Implementasi logo SVG vektor resmi `islami.co` beserta filosofi makna warna dan lambang.
- [x] Konfigurasi `package.json` dan server native Bun (`bun run dev`) + fallback Node.js.

---

### Phase 2: Boarding & Multi-Language System (Completed ✔)
- [x] Layar Onboarding ala iOS / iPhone setup saat pertama kali membuka aplikasi.
- [x] Animasi transisi greeting sapaan ("Hello", "Selamat Datang", "Ahlan Wa Sahlan", "Salam Sejahtera").
- [x] Pemilihan 3 bahasa utama: **Indonesia (ID)**, **English (EN)**, dan **Melayu (MS)**.
- [x] Integrasi `localStorage` agar preferensi bahasa tersimpan otomatis.
- [x] Header quick switcher pill bahasa untuk berganti bahasa kapan saja tanpa refresh.

---

### Phase 3: Core Features & Mock Data Separation (Completed ✔)
- [x] **Pemisahan Mock Data ke `js/mock-data.js`**:
  - Diberikan komentar penjelasan yang sangat jelas dan ramah pemula.
  - Mudah ditambah, diedit, atau dihapus oleh siapa saja.
- [x] **Fitur 1: Praying Time**:
  - Jam digital live WIB.
  - Tanggal Hijriyah & Masehi.
  - Kartu shalat berikutnya dengan hitung mundur dinamis (*countdown timer*).
  - Baris horizontal waktu 5 shalat dengan penanda emas pada shalat yang sedang aktif.
- [x] **Fitur 2: Al-Qur'an**:
  - Search real-time berdasarkan ayat, surah, dan terjemahan.
  - Teks Arab khat Amiri berskala nyaman dibaca.
  - Transliterasi Latin font monospace.
  - Terjemahan dinamis dalam 3 bahasa.
  - Audio Murottal Player preview (Play/Pause).
  - Tombol salin ayat ke clipboard.
- [x] **Fitur 3: Hadist Shahih**:
  - Search hadits, perawi (Bukhari, Muslim, Tirmidzi), dan matan.
  - Badge derajat keshahihan hadits.
- [x] **Fitur 4: Kumpulan Doa**:
  - Kategori doa harian, masjid, keluarga, dan perlindungan.
  - Fadhilah dan keutamaan doa.
  - Fitur search doa.
- [x] **Fitur 5: Yasin & Tahlil**:
  - Teks Surah Yasin ayat pembuka lengkap.
  - Bacaan Tahlil lengkap dengan panduan doa arwah.
  - **Tasbih Digital Interaktif** dengan tombol tekan getar, counter visual, dan reset.
- [x] **Fitur 6: Masjid Terdekat**:
  - Daftar masjid sekitar dengan jarak (km), kapasitas jamaah, badge fasilitas.
  - Tombol rute langsung menuju Google Maps.
- [x] **Fitur 7: Makam Ulama**:
  - Situs ziarah makam auliya / Walisongo / habaib nusantara.
  - Biografi ringkas dakwah dan panduan ziarah santun.
- [x] **Fitur 8: Cari Ustadz & Khotib**:
  - Profil asatidz dengan gelar, latar belakang universitas, rating, spesialisasi.
  - Modal form interaktif untuk pemesanan jadwal khutbah Jumat atau kajian.
- [x] **Fitur 9: Layanan Tanggap Jenazah**:
  - Banner darurat 24 jam di beranda.
  - Call center panggilan ambulan (1500-999).
  - Layanan pemulasaraan/mandi jenazah syar'i & imam shalat jenazah.
- [x] **Fitur 10: Kompas Arah Kiblat**:
  - Dial kompas presisi 295° NW berputar menuju Ka'bah.
  - Indikator jarak Makkah (7.920 km).
  - Tombol kalibrasi sensor kompas.

---

### Phase 4: Next Roadmap & Future Enhancements (Backlog)
- [ ] Integrasi Geolocation API browser untuk otomatisasi koordinat lintang & bujur kota pengguna.
- [ ] Integrasi Audio Adzan full berdurasi 3 menit dengan notifikasi browser Web Push API.
- [ ] Fitur Bookmark ayat Qur'an & Hadist favorit ke local storage.
- [ ] Kalkulator Zakat Maal & Zakat Fitrah terintegrasi.
- [ ] Mode Offline PWA (Progressive Web App) dengan Service Worker.

