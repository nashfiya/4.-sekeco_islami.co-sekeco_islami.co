# Skills & Engineering Guidelines
## Islami.co Web Application

Dokumen ini menjadi rujukan teknis (engineering guidelines & skills) untuk pengembang atau AI agent yang akan melanjutkan pemeliharaan dan ekspansi aplikasi Islami.co.

---

## 1. Stack & Tools Overview
- **UI Framework**: HTML5 Semantik + Tailwind CSS (via CDN) + Kustomisasi Variabel CSS (`css/style.css`).
- **Icons**: Lucide Icons (CDN). Jalankan `lucide.createIcons()` setiap kali ada elemen DOM baru yang di-render ulang secara dinamis.
- **Typography**: 
  - `Amiri` (Google Fonts): Khusus teks bahasa Arab dan ayat suci Al-Qur'an agar kaidah khat tetap terjaga.
  - `Plus Jakarta Sans`: Tipografi modern geometris untuk teks antarmuka Latin.
- **Package Manager / Runtime**:
  - **Bun**: Runtime utama yang direkomendasikan. Jalankan `bun run dev` untuk menyalakan local server.
  - **Node.js**: Fallback runtime dengan `npm run serve:node` atau `node server.js`.

---

## 2. Struktur Mock Data (`js/mock-data.js`)
Semua tiruan data (Mock Data) **dipisahkan secara ketat** dari logika tampilan agar mudah dipelajari oleh pemula.

### Cara Menambah Data Baru:
1. Buka file `js/mock-data.js`.
2. Temukan objek yang ingin ditambah, misalnya `IslamiMockData.quran` atau `IslamiMockData.hadith`.
3. Tambahkan objek baru dengan struktur atribut yang sesuai:
   ```javascript
   {
     id: 7,
     surahNumber: 114,
     surahName: "An-Nas",
     verseNumber: 1,
     arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
     latin: "Qul a'uudzu birobbin-naas",
     translations: {
       id: "Katakanlah, 'Aku berlindung kepada Tuhannya manusia'",
       en: "Say, 'I seek refuge in the Lord of mankind'",
       ms: "Katakanlah (wahai Muhammad): 'Aku berlindung kepada Tuhan sekalian manusia'"
     }
   }
   ```
4. Simpan file, data akan otomatis ter-render di aplikasi tanpa perlu menyentuh file HTML!

---

## 3. Sistem Multi-Bahasa (`js/translations.js`)
- Seluruh label statis yang ingin diterjemahkan diberi atribut `data-i18n="KEY_NAME"`.
- Untuk input placeholder, gunakan atribut `data-i18n-placeholder="KEY_NAME"`.
- Tambahkan terjemahan untuk key tersebut di 3 cabang bahasa (`id`, `en`, `ms`) pada file `js/translations.js`.
- Fungsi `applyLanguage(lang)` pada `js/app.js` akan otomatis memperbarui seluruh teks pada DOM.

---

## 4. Pola Desain Sistem Islami.co ("Media Islam Ramah yang Mencerahkan")
- Mengadopsi identitas resmi portal Islami.co:
  - **Primary Green**: `#15803D`, `#0D542B`, `#ECFDF5`.
  - **Teal / Emerald Accent**: `#0D9488`, `#059669`.
  - **Editorial Clean Surface**: Background `#F8FAFC`, kartu putih `#FFFFFF` dengan shadow lembut.
- Tipografi:
  - Teks Arab menggunakan font `Amiri` kaligrafi naskh berharakat jelas.
  - Teks antarmuka menggunakan `Plus Jakarta Sans` yang modern dan bersahabat.
- PWA & Offline Support: Terdaftar otomatis melalui `sw.js` dengan fallback navigasi offline dan tombol instalasi di header.

