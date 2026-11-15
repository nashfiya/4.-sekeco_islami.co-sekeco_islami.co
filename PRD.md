# Product Requirement Document (PRD)
## Islami.co - SuperApp Ekosistem Muslim Modern

**Versi Dokumen:** 1.0.0  
**Status:** Ready for Development / Prototype Complete  
**Tanggal:** 12 November 2026  
**Target Platform:** Mobile-First Web Application (PWA Ready), Responsive Desktop  
**Design Theme:** Luxury Islamic Dark Obsidian & Metallic Amber Gold  

---

## 1. Executive Summary
**Islami.co** adalah platform digital komprehensif (SuperApp) yang dirancang untuk memenuhi kebutuhan spiritual, edukatif, dan sosial umat Muslim di era modern. Aplikasi ini memadukan kemudahan teknologi masa kini dengan keluhuran nilai-nilai Islam moderat (*Rahmatan Lil 'Alamin*). 

Desain visual mengadopsi nuansa kemewahan Islami bernuansa **Deep Obsidian Charcoal** dipadu dengan aksen **Imperial Amber Gold** serta ornamen mandala geometri Islam yang tenang, khidmat, dan elegan.

---

## 2. User Persona & Target Audiens
1. **Muslim Urban & Profesional Muda**: Membutuhkan jadwal shalat akurat, kompas kiblat cepat saat mobilitas tinggi, dan bacaan Qur'an/Hadits harian yang mudah diakses.
2. **Pengurus DKM / Panitia Masjid**: Memerlukan akses cepat pencarian khotib shalat Jumat dan ustadz berkompetensi untuk kajian rutin.
3. **Masyarakat Umum & Keluarga Muslim**: Membutuhkan panduan ziarah makam auliya/ulama, panduan Yasin & Tahlil, serta layanan tanggap darurat jenazah (ambulan & pemulasaraan syar'i 24 jam).
4. **Komunitas Muslim Serantau (Nusantara & Global)**: Pengguna dari Indonesia, Malaysia, Singapura, dan ekspatriat berbahasa Inggris.

---

## 3. Fitur Utama (Core Features)

| No | Fitur | Deskripsi Fungsional | Status Implementasi |
|---|---|---|---|
| 1 | **Praying Time** | Menampilkan jadwal 5 waktu shalat + waktu terbit, jam digital live, hitung mundur menuju shalat berikutnya, dan kartu highlight shalat aktif. | Selesai (Mock & Realtime Engine) |
| 2 | **Al-Qur'an & Search** | Penjelajahan surah dan ayat dengan pencarian real-time (nama surah, terjemahan, teks latin), murottal audio player, dan tombol salin ayat. | Selesai (Mock Data + Audio Player) |
| 3 | **Hadist & Search** | Kumpulan hadits shahih (Bukhari, Muslim, Tirmidzi), derajat hadits, teks Arab, latin, dan terjemahan 3 bahasa. | Selesai (Search Filter Interaktif) |
| 4 | **Doa Harian** | Kumpulan doa harian ma'tsur dikelompokkan berdasarkan kategori (tidur, masjid, orang tua, rezeki) dilengkapi fadhilah. | Selesai |
| 5 | **Yasin & Tahlil** | Ayat pembuka Surah Yasin lengkap khat tebal, urutan bacaan tahlil arwah, serta **Tasbih Digital Interaktif** dengan getar haptic. | Selesai |
| 6 | **Masjid Terdekat** | Direktori masjid terdekat dengan jarak, kapasitas jamaah, fasilitas (difabel, AC, parkir), kontak, dan tombol integrasi rute Google Maps. | Selesai |
| 7 | **Makam Ulama** | Panduan wisata religi ke makam ulama & auliya (Walisongo, Habaib, Ulama Nusantara), sejarah ringkas, dan etika ziarah. | Selesai |
| 8 | **Cari Ustadz & Khotib** | Profil ustadz berlatar belakang kredibel (Al-Azhar, UIN, PTIQ), rating review, spesialisasi fiqih/khutbah, dan form modal booking. | Selesai |
| 9 | **Layanan Jenazah 24 Jam** | Hotline darurat panggilan ambulan, pemulasaraan mandikan jenazah bersertifikat MUI, tim kafan, dan bimbingan imam shalat jenazah. | Selesai |
| 10 | **Kompas Kiblat** | Dial visual arah Ka'bah 295° Barat Laut (NW) dengan derajat presisi, indikator jarak ke Makkah (7.920 km), dan fitur kalibrasi. | Selesai |

---

## 4. Multi-Language System (3 Bahasa)
Aplikasi mendukung **3 bahasa utama**:
1. **Bahasa Indonesia (ID)** - Standar bahasa Nusantara.
2. **English (EN)** - Bahasa internasional untuk Muslim global.
3. **Bahasa Melayu (MS)** - Penyesuaian kosa kata syariah untuk Malaysia, Singapura, dan Brunei.

### Fitur Onboarding Setup ala iPhone:
- Saat pengguna pertama kali membuka aplikasi, muncul layar boarding elegan gelap-emas dengan sambutan berganti otomatis (*"Hello", "Selamat Datang", "Ahlan Wa Sahlan", "Salam Sejahtera"*).
- Pengguna memilih bahasa awal melalui kartu pilihan responsif.
- Pilihan bahasa tersimpan otomatis di `localStorage`.
- Pengguna tetap dapat mengganti bahasa kapan saja via pill switcher di header atas.

---

## 5. Arsitektur Teknis
- **Struktur File**:
  - `index.html`: Entry point antarmuka responsif.
  - `css/style.css`: Token warna dark-gold, mandala background, animations, and typography styling.
  - `js/mock-data.js`: Penyimpanan mock data terpusat, modular, dan didokumentasikan rapi agar mudah diedit pengguna.
  - `js/translations.js`: Kamus string i18n untuk 3 bahasa.
  - `js/app.js`: Kontroller interaksi, countdown shalat, search filter, audio engine, tasbih counter, dan booking modal.
  - `server.js`: Server static development kompatibel native dengan Bun (`Bun.serve`) dan Node.js.
  - `package.json`: Konfigurasi dependensi dan script dev Bun.

---

## 6. Identitas Visual & Filosofi Logo
- **Warna Utama**:
  - *Deep Obsidian Charcoal* (`#08090C` - `#12151E`): Keteguhan iman, kekhidmatan, keanggunan modern.
  - *Radiant Amber Gold* (`#E5A93C` - `#FDE68A`): Kemuliaan akhlak, peradaban emas Islam, cahaya ilmu.
- **Elemen Geometri Logo**:
  - Kubah Masjid (Spiritualitas & Naungan Kebajikan).
  - Bulan Sabit & Bintang (Pencerahan & Penanggalan Hijriyah).
  - Al-Qur'an / Lembaran Kitab Terbuka (Literasi, Sains, dan Nilai Moderat).
  - Orbit Satelit Digital (.co) (Konektivitas komunitas muslim global).

