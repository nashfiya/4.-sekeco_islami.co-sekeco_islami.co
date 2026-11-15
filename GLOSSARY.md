# Project Glossary: Islami.co

Daftar istilah dan konvensi domain untuk aplikasi web Islami.co:

## 1. Konsep & Fitur Utama
- **Kolom & Opini Islami.co**: Artikel editorial keislaman berwawasan sejuk dan moderat (wasathiyah) oleh para cendekiawan dan intelektual muda.
- **Reader Mode**: Mode baca nyaman ala portal media dengan pengatur ukuran font (A- / A+) dan tema gelap/terang.
- **Al-Qur'an & Floating Audio**: Teks ayat berharakat naskh (`Amiri`), transliterasi Latin, terjemahan resmi, audio murottal, dan floating player yang dapat terus berputar saat menjelajah tab lain.
- **Hadits & Tanya Jawab Syariah**: Kumpulan hadits tematik shahih dan rubrik tanya jawab fiqih praktis santun.
- **Naskah Khutbah Jumat**: Referensi materi khutbah sejuk, inklusif, dan sarat ukhuwah insaniyah.
- **Jadwal Sholat & Countdown Dinamis**: Perhitungan waktu sholat riil 5 waktu ditambah waktu terbit dan hitung mundur otomatis.
- **Arah Kiblat**: Kompas digital penunjuk Ka'bah Makkah (~295° barat laut).
- **Tasbih Digital**: Penghitung zikir interaktif dengan feedback haptic bergetar.
- **Sistem Bookmark / Tersimpan**: Penyimpanan ayat, doa, dan artikel favorit di `localStorage`.

## 2. Istilah Teknis & Arsitektur
- **Mock Data (`js/mock-data.js`)**: Sumber data lokal tiruan yang dipisahkan dari DOM untuk kemudahan pengembangan.
- **Multi-Bahasa (`js/translations.js`)**: Sistem lokalisasi statis berbasis atribut `data-i18n` (mendukung `id`, `en`, `ms`).
- **Design System Islami.co**: Identitas visual resmi portal [islami.co](https://islami.co/) dengan **Crimson Red Header (#B91C1C)**, tipografi kufic geometris *إسلامي.co*, navigasi mobile app responsif, tipografi Latin *Plus Jakarta Sans*, dan kaligrafi Arab naskh *Amiri*.
- **Mobile Viewport Format**: Format tampilan aplikasi yang dioptimalkan secara langsung untuk layar smartphone (Direct Mobile Web App) dengan tata letak native, sticky red header, navigasi tab horizontal, dan floating audio player.
- **PWA & Offline Support**: Progressive Web App dengan Service Worker (`sw.js`) berskema Cache-First untuk aset lokal dan Stale-While-Revalidate untuk aset font dan ikon CDN.

