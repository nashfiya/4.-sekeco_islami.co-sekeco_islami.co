/**
 * ==============================================================================
 * MOCK DATA REPOSITORY - ISLAMI.CO
 * ==============================================================================
 * File ini berisi seluruh tiruan data (Mock Data) yang digunakan oleh aplikasi.
 * Setiap bagian dikelompokkan dengan jelas berdasarkan fitur aplikasi.
 * Anda dapat dengan mudah mengedit, menambah, atau mengurangi data di bawah ini!
 * ==============================================================================
 */

const IslamiMockData = {
  // ----------------------------------------------------------------------------
  // 6. DATA DIREKTORI MASJID RAMAH & BERSEJARAH
  // ----------------------------------------------------------------------------
  masjidDirectory: [
    {
      id: "m-1",
      name: "Masjid Istiqlal",
      city: "Jakarta Pusat",
      distance: "1.2 km",
      address: "Jl. Taman Wijaya Kusuma, Ps. Baru, Sawah Besar, Jakarta Pusat",
      capacity: "200.000 Jamaah",
      facilities: ["Ramah Difabel", "Klinik 24 Jam", "Perpustakaan Digital", "Taman Edukasi"],
      activities: "Kajian Dzuhur Tematik, Bimbingan Muallaf, Kajian Subuh Gabungan",
      phone: "+62 21 3811708"
    },
    {
      id: "m-2",
      name: "Masjid Sunda Kelapa",
      city: "Menteng, Jakarta Pusat",
      distance: "3.5 km",
      address: "Jl. Taman Sunda Kelapa No.16, Menteng, Jakarta Pusat",
      capacity: "4.500 Jamaah",
      facilities: ["Aula Pernikahan", "Sentra Kuliner Halal", "Layanan Ambulan", "Pojok Literasi"],
      activities: "Kajian Tafsir Al-Misbah, Dialog Kebangsaan, Kursus Bahasa Arab",
      phone: "+62 21 31934261"
    },
    {
      id: "m-3",
      name: "Masjid Agung Al-Azhar",
      city: "Kebayoran Baru, Jakarta Selatan",
      distance: "6.8 km",
      address: "Jl. Sisingamangaraja No.1, Selong, Kebayoran Baru, Jakarta Selatan",
      capacity: "10.000 Jamaah",
      facilities: ["Pusat ZISWAF", "Konseling Keluarga", "Area Parkir Luas", "Kantin Sehat"],
      activities: "Kuliah Subuh Ahad, Bimbingan Haji & Umrah, Gerakan Subuh Berkah",
      phone: "+62 21 72783683"
    },
    {
      id: "m-4",
      name: "Masjid Kubah Emas (Dian Al-Mahri)",
      city: "Depok, Jawa Barat",
      distance: "18.4 km",
      address: "Jl. Meruyung Raya, Meruyung, Limo, Kota Depok",
      capacity: "20.000 Jamaah",
      facilities: ["Taman Wisata Religi", "Kubah Emas Murni", "Area Istirahat Musafir"],
      activities: "Kajian Fiqih Kontemporer, Pengajian Akbar Bulanan",
      phone: "+62 21 77889900"
    }
  ],

  // ----------------------------------------------------------------------------
  // 7. DATA DIREKTORI MAKAM ULAMA & AULIYA NUSANTARA
  // ----------------------------------------------------------------------------
  makamDirectory: [
    {
      id: "mk-1",
      name: "Makam K.H. Abdurrahman Wahid (Gus Dur)",
      title: "Presiden RI ke-4 & Tokoh Pluralisme Dunia",
      location: "Kompleks Ponpes Tebuireng, Jombang, Jawa Timur",
      distance: "Akses Kereta / Tol Jombang",
      biography: "Pejuang kemanusiaan, demokrasi, dan Islam ramah yang mengajarkan nilai persaudaraan lintas peradaban.",
      adab: ["Berwudhu sebelum memasuki area", "Membaca Al-Fatihah & Tahlil", "Menjaga ketenangan peziarah lain"]
    },
    {
      id: "mk-2",
      name: "Makam Sunan Ampel (Raden Rahmat)",
      title: "Wali Songo Perintis Dakwah Damai Nusantara",
      location: "Ampel, Semampir, Kota Surabaya, Jawa Timur",
      distance: "Kawasan Wisata Religi Surabaya",
      biography: "Penyebar Islam dengan falsafah 'Moh Limo' yang mengedepankan keluhuran budi pekerti dan akulturasi budaya.",
      adab: ["Tertib dalam antrean ziarah", "Menjaga kebersihan kompleks makam", "Menghormati tradisi setempat"]
    },
    {
      id: "mk-3",
      name: "Makam Hadratussyaikh K.H. Hasyim Asy'ari",
      title: "Pendiri Nahdlatul Ulama & Pahlawan Nasional",
      location: "Tebuireng, Cukir, Diwek, Jombang",
      distance: "Satu kompleks dengan Makam Gus Dur",
      biography: "Mahaguru ulama Nusantara, perumus Resolusi Jihad 1945, dan tokoh pemersatu umat Islam Indonesia.",
      adab: ["Menghaturkan doa khusyuk", "Membaca tahlil & surah pendek", "Meresapi teladan perjuangan beliau"]
    },
    {
      id: "mk-4",
      name: "Makam K.H. Ahmad Dahlan",
      title: "Pendiri Muhammadiyah & Tokoh Pembaharu Islam",
      location: "Karangkajen, Brontokusuman, Mergangsan, Yogyakarta",
      distance: "Pusat Kota Yogyakarta",
      biography: "Pelopor pembaruan pendidikan Islam, gerakan filantropi Penolong Kesengsaraan Oemoem (PKO), dan dakwah pencerahan.",
      adab: ["Mendoakan ampunan dan rahmat", "Meneladani amal sosial kemasyarakatan", "Menjaga kekhidmatan"]
    }
  ],

  // ----------------------------------------------------------------------------
  // 1. DATA JADWAL SHALAT (PRAYING TIME)
  // ----------------------------------------------------------------------------
  prayerSchedule: {
    city: "Jakarta, Indonesia",
    timezone: "WIB (UTC+7)",
    dateHijri: "23 Jumadil Awal 1448 H",
    dateMasehi: "Kamis, 12 November 2026",
    nextPrayerKey: "asr", // 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha'
    countdownSeconds: 5240, // Hitungan mundur dinamis
    times: [
      { id: "fajr", name: "Subuh", time: "04:14", arabic: "الفجر", passed: true },
      { id: "sunrise", name: "Terbit", time: "05:32", arabic: "الشروق", passed: true },
      { id: "dhuhr", name: "Dzuhur", time: "11:46", arabic: "الظهر", passed: true },
      { id: "asr", name: "Ashar", time: "15:05", arabic: "العصر", passed: false, isNext: true },
      { id: "maghrib", name: "Maghrib", time: "17:58", arabic: "المغرب", passed: false },
      { id: "isha", name: "Isya", time: "19:10", arabic: "العشاء", passed: false }
    ]
  },

  // ----------------------------------------------------------------------------
  // 2. DATA AL-QUR'AN (DENGAN SEARCH AYAT & MULTI-BAHASA)
  // ----------------------------------------------------------------------------
  quran: [
    {
      id: 1,
      surahNumber: 1,
      surahName: "Al-Fatihah",
      surahNameArabic: "الفاتحة",
      verseNumber: 1,
      juz: 1,
      type: "Makkiyyah",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      latin: "Bismillaahir-rohmaanir-rohiim",
      audio: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3",
      translations: {
        id: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
        en: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        ms: "Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani."
      }
    },
    {
      id: 2,
      surahNumber: 1,
      surahName: "Al-Fatihah",
      surahNameArabic: "الفاتحة",
      verseNumber: 2,
      juz: 1,
      type: "Makkiyyah",
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      latin: "Al-hamdu lillaahi robbil-'aalamiin",
      audio: "https://everyayah.com/data/Alafasy_128kbps/001002.mp3",
      translations: {
        id: "Segala puji bagi Allah, Tuhan seluruh alam.",
        en: "[All] praise is [due] to Allah, Lord of the worlds.",
        ms: "Segala puji tertentu bagi Allah, Tuhan yang memelihara dan mentadbirkan sekalian alam."
      }
    },
    {
      id: 3,
      surahNumber: 2,
      surahName: "Al-Baqarah",
      surahNameArabic: "البقرة",
      verseNumber: 255,
      verseTitle: "Ayat Kursi",
      juz: 3,
      type: "Madaniyyah",
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
      latin: "Allaahu laaa ilaaha illaa Huwal-Hayyul-Qoyyuum, laa ta'khuzuhuu sinatuw-wa laa nawm...",
      audio: "https://everyayah.com/data/Alafasy_128kbps/002255.mp3",
      translations: {
        id: "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus-menerus mengurus makhluk-Nya, tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan di bumi.",
        en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep.",
        ms: "Allah, tiada Tuhan melainkan Dia, Yang Tetap Hidup, Yang Kekal selama-lamanya mentadbirkan sekalian makhluk-Nya. Tiada mengantuk dan tidak tidur."
      }
    },
    {
      id: 4,
      surahNumber: 36,
      surahName: "Yasin",
      surahNameArabic: "يس",
      verseNumber: 1,
      juz: 22,
      type: "Makkiyyah",
      arabic: "يس ۝ وَالْقُرْآنِ الْحَكِيمِ ۝ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ۝",
      latin: "Yaa-Siiin. Wal-Qur'aanil-hakiim. Innaka laminal-mursaliin.",
      audio: "https://everyayah.com/data/Alafasy_128kbps/036001.mp3",
      translations: {
        id: "Ya Sin. Demi Al-Qur'an yang penuh hikmah. Sungguh, engkau (Muhammad) adalah salah seorang dari rasul-rasul.",
        en: "Ya, Seen. By the wise Qur'an. Indeed you, [O Muhammad], are from among the messengers.",
        ms: "Yaa, Siin. Demi Al-Quran yang mengandungi hikmat-hikmat dan kebenaran yang tetap kukuh. Sesungguhnya engkau (wahai Muhammad) adalah seorang Rasul."
      }
    },
    {
      id: 5,
      surahNumber: 94,
      surahName: "Al-Insyirah",
      surahNameArabic: "الشرح",
      verseNumber: 5,
      juz: 30,
      type: "Makkiyyah",
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا ۝",
      latin: "Fa inna ma'al-'usri yusroo. Inna ma'al-'usri yusroo.",
      audio: "https://everyayah.com/data/Alafasy_128kbps/094005.mp3",
      translations: {
        id: "Maka sesungguhnya bersama kesulitan ada kemudahan, sesungguhnya bersama kesulitan ada kemudahan.",
        en: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
        ms: "Oleh itu, sesungguhnya bersama kesulitan ada kesenangan. Sesungguhnya bersama kesulitan ada kesenangan."
      }
    },
    {
      id: 6,
      surahNumber: 112,
      surahName: "Al-Ikhlas",
      surahNameArabic: "الإخلاص",
      verseNumber: 1,
      juz: 30,
      type: "Makkiyyah",
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝",
      latin: "Qul Huwallaahu Ahad. Allaahus-Samad.",
      audio: "https://everyayah.com/data/Alafasy_128kbps/112001.mp3",
      translations: {
        id: "Katakanlah (Muhammad), 'Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu.'",
        en: "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge.'",
        ms: "Katakanlah (wahai Muhammad): '(Tuhanku) ialah Allah Yang Maha Esa; Allah Yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat.'"
      }
    }
  ],

  // ----------------------------------------------------------------------------
  // 3. DATA HADIST NABAWI (DENGAN SEARCH PERAWI / MATAN)
  // ----------------------------------------------------------------------------
  hadith: [
    {
      id: 1,
      narrator: "Shahih Bukhari No. 1",
      book: "Kitab Permulaan Wahyu",
      topic: "Niat dalam Amalan",
      grade: "Shahih",
      arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      latin: "Innamal-a'maalu bin-niyyaat, wa innamaa likullimri'im-maa nawaa",
      translations: {
        id: "Sesungguhnya setiap amalan tergantung pada niatnya, dan setiap orang akan mendapatkan balasan sesuai apa yang diniatkannya.",
        en: "Actions are but by intentions, and each man shall have but that which he intended.",
        ms: "Sesungguhnya segala amalan adalah berdasarkan niat, dan setiap orang hanya memperoleh apa yang diniatkannya."
      }
    },
    {
      id: 2,
      narrator: "Shahih Muslim No. 223",
      book: "Kitab Thaharah",
      topic: "Kebersihan & Keimanan",
      grade: "Shahih",
      arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ",
      latin: "Ath-thuhuuru syathrul-iimaan, wal-hamdulillaahi tamla'ul-miizaan",
      translations: {
        id: "Bersuci (kebersihan) itu sebagian dari iman, dan ucapan 'Alhamdulillah' memenuhi timbangan amal kebaikan.",
        en: "Purity is half of iman (faith), and 'Praise be to Allah' fills the scale of good deeds.",
        ms: "Kebersihan itu sebahagian daripada iman, dan 'Alhamdulillah' itu memenuhi timbangan pahala."
      }
    },
    {
      id: 3,
      narrator: "HR. Tirmidzi No. 2516",
      book: "Sunan Tirmidzi",
      topic: "Pertolongan Allah",
      grade: "Hasan Shahih",
      arabic: "احْفَظِ اللَّهَ يَحْفَظْكَ، احْفَظِ اللَّهَ تَجِدْهُ تُجَاهَكَ",
      latin: "Ihfazhillaaha yahfazhk, ihfazhillaaha tajid-hu tujaahak",
      translations: {
        id: "Jagalah Allah (aturan-Nya), niscaya Dia akan menjagamu. Jagalah Allah, niscaya engkau mendapati-Nya di hadapanmu.",
        en: "Be mindful of Allah, and He will protect you. Be mindful of Allah, and you will find Him in front of you.",
        ms: "Peliharalah Allah (hukum-hukum-Nya), nescaya Dia akan memeliharamu. Peliharalah Allah nescaya engkau mendapati-Nya sentiasa bersamamu."
      }
    },
    {
      id: 4,
      narrator: "HR. Bukhari & Muslim",
      book: "Riyadhus Shalihin",
      topic: "Persaudaraan Muslim",
      grade: "Muttafaq 'Alaih",
      arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      latin: "Laa yu'minu ahadukum hattaa yuhibba li-akhiihi maa yuhibbu linafsih",
      translations: {
        id: "Tidak sempurna iman seseorang di antara kalian sampai dia mencintai saudaranya seperti mencintai dirinya sendiri.",
        en: "None of you truly believes until he loves for his brother what he loves for himself.",
        ms: "Tidak sempurna iman seseorang daripada kamu sehingga dia mengasihi saudaranya seperti mana dia mengasihi dirinya sendiri."
      }
    }
  ],

  // ----------------------------------------------------------------------------
  // 4. DATA DOA-DOA HARIAN (DAILY SUPPLICATIONS)
  // ----------------------------------------------------------------------------
  prayers: [
    {
      id: 1,
      category: "daily",
      categoryName: "Aktivitas Harian",
      title: "Doa Sebelum Tidur",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ",
      latin: "Bismika Allahumma ahyaa wa amuut.",
      fadhilah: "Memohon perlindungan jiwa raga selama tidur di malam hari.",
      translations: {
        id: "Dengan nama-Mu ya Allah, aku hidup dan aku mati.",
        en: "In Your name, O Allah, I live and I die.",
        ms: "Dengan nama-Mu ya Allah, aku hidup dan aku mati."
      }
    },
    {
      id: 2,
      category: "daily",
      categoryName: "Aktivitas Harian",
      title: "Doa Bangun Tidur",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
      latin: "Alhamdu lillaahil-ladzii ahyaanaa ba'da maa amaatanaa wa ilaihin-nusyuur.",
      fadhilah: "Bersyukur atas nikmat nafas dan kesempatan beribadah hari baru.",
      translations: {
        id: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami kembali.",
        en: "All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection.",
        ms: "Segala puji bagi Allah yang telah menghidupkan kami selepas mematikan kami, dan kepada-Nya tempat kembali."
      }
    },
    {
      id: 3,
      category: "place",
      categoryName: "Masjid & Tempat Ibadah",
      title: "Doa Masuk Masjid",
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      latin: "Allahummaf-tah lii abwaaba rohmatik.",
      fadhilah: "Membuka pintu rahmat dan kedamaian hati di rumah Allah.",
      translations: {
        id: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.",
        en: "O Allah, open for me the doors of Your mercy.",
        ms: "Ya Allah, bukakanlah bagiku pintu-pintu rahmat-Mu."
      }
    },
    {
      id: 4,
      category: "family",
      categoryName: "Keluarga & Orang Tua",
      title: "Doa Untuk Kedua Orang Tua",
      arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      latin: "Rabbigh-fir lii wa liwaalidayya warhamhumaa kamaa robbayaanii shoghiiroo.",
      fadhilah: "Bentuk bakti teragung dan penjamin ampunan bagi kedua orang tua.",
      translations: {
        id: "Wahai Tuhanku, ampunilah aku dan kedua orang tuaku, dan sayangilah mereka sebagaimana mereka merawatku di waktu kecil.",
        en: "My Lord, forgive me and my parents and have mercy upon them as they brought me up [when I was] small.",
        ms: "Wahai Tuhanku! Ampunkanlah bagiku dan kedua ibu bapaku, dan kasihanilah mereka sebagaimana mereka telah memeliharaku semasa kecil."
      }
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. DATA YASIN & TAHLIL LENGKAP
  // ----------------------------------------------------------------------------
  yasinTahlil: {
    title: "Surah Yasin & Bacaan Tahlil Kubur",
    fadhilah: "Jantung Al-Qur'an (Qalb al-Qur'an) untuk ketenangan hati dan dihadiahkan kepada para ahli kubur.",
    yasinOpening: {
      arabic: "يس ۝ وَالْقُرْآنِ الْحَكِيمِ ۝ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ۝ عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ ۝ تَنزِيلَ الْعَزِيزِ الرَّحِيمِ ۝",
      transliteration: "Yaa-Siiin. Wal-Qur'aanil-hakiim. Innaka laminal-mursaliin. 'Alaa shiraathim-mustaqiim. Tanziilal-'Aziizir-Rahiim.",
      meaning: "Yaa Siin. Demi Al-Qur'an yang penuh hikmah. Sungguh engkau adalah salah satu rasul yang berada di atas jalan yang lurus. Diturunkan oleh Yang Maha Perkasa, Maha Penyayang."
    },
    tahlilSequence: [
      {
        step: 1,
        title: "Pengantar Al-Fatihah Khususon",
        arabic: "إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَآلِهِ وَأَصْحَابِهِ... الفَاتِحَة",
        note: "Membaca surah Al-Fatihah dihadiahkan kepada Rasulullah SAW, para sahabat, dan kaum muslimin."
      },
      {
        step: 2,
        title: "Kalimat Tauhid (Tahlil)",
        arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ (٣٣×)",
        note: "Membaca kalimat tahlil sebanyak 33 kali dengan penuh penghayatan."
      },
      {
        step: 3,
        title: "Tasbih & Tahmid",
        arabic: "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ سُبْحَانَ اللّٰهِ الْعَظِيمِ (٣٣×)",
        note: "Dua kalimat ringan di lisan namun amat berat dalam timbangan amal."
      },
      {
        step: 4,
        title: "Doa Arwah Penutup Tahlil",
        arabic: "اللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ وَاجْعَلِ الْجَنَّةَ مَثْوَاهُمْ",
        note: "Permohonan pengampunan dosa, kelapangan kubur, dan rahmat surga."
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // 6. DATA MASJID TERDEKAT (NEARBY MOSQUE)
  // ----------------------------------------------------------------------------
  mosques: [
    {
      id: 1,
      name: "Masjid Istiqlal",
      city: "Jakarta Pusat",
      distance: "1.2 km",
      address: "Jl. Taman Wijaya Kusuma, Ps. Baru, Sawah Besar, Jakarta",
      capacity: "250.000 Jamaah",
      facilities: ["Parkir Luas", "Akses Difabel", "AC Sentral", "Klinik Gratis", "Perpustakaan"],
      contact: "+62 21 3811708",
      isFridayFriendly: true
    },
    {
      id: 2,
      name: "Masjid Agung Sunda Kelapa",
      city: "Menteng, Jakarta Pusat",
      distance: "2.8 km",
      address: "Jl. Taman Sunda Kelapa No.16, Menteng",
      capacity: "10.000 Jamaah",
      facilities: ["Kantin Halal", "Ruang Pengajian", "Area Ramah Anak", "Parkir Mobil"],
      contact: "+62 21 31924765",
      isFridayFriendly: true
    },
    {
      id: 3,
      name: "Masjid Raya Al-Jabbar",
      city: "Bandung, Jawa Barat",
      distance: "Regional Fav",
      address: "Jl. Cimencrang No.216, Gedebage, Bandung",
      capacity: "60.000 Jamaah",
      facilities: ["Museum Rasulullah", "Danau Retensi", "Taman Edukasi Islami"],
      contact: "+62 22 7831123",
      isFridayFriendly: true
    }
  ],

  // ----------------------------------------------------------------------------
  // 7. DATA SITUS ZIARAH MAKAM ULAMA & AULIYA (SHRINES & SCHOLARS GRAVES)
  // ----------------------------------------------------------------------------
  ulamaGraves: [
    {
      id: 1,
      name: "Makam Syekh Maulana Malik Ibrahim",
      title: "Sunan Gresik (Walisongo Pertama)",
      location: "Gresik, Jawa Timur",
      distance: "Ziarah Utama",
      history: "Pelopor dakwah Islam di tanah Jawa dengan pendekatan sosial kemasyarakatan, perdagangan ramah tamah, dan pengobatan gratis bagi kaum dhuafa.",
      address: "Jl. Malik Ibrahim, Gapuro Sukolilo, Kec. Gresik",
      visitingHours: "24 Jam Setiap Hari",
      facilities: ["Masjid Jami'", "Area Pejalan Kaki", "Penginapan Peziarah", "Pusat Oleh-Oleh"]
    },
    {
      id: 2,
      name: "Makam Sunan Kalijaga (Raden Said)",
      title: "Walisongo - Akulturasi Budaya & Wayang",
      location: "Kadilangu, Demak, Jawa Tengah",
      distance: "Ziarah Utama",
      history: "Ulama berwawasan luas yang menyebarkan Islam melalui karya seni, gamelan, tembang Lir-Ilir, dan tata kelola masyarakat yang bijaksana.",
      address: "Kadilangu, Kec. Demak, Kabupaten Demak",
      visitingHours: "24 Jam (Disarankan Subuh - Isya)",
      facilities: ["Museum Pusaka", "Pendopo Shalat", "Area Bersuci Luas"]
    },
    {
      id: 3,
      name: "Makam Habib Ali bin Abdurrahman Al-Habsyi",
      title: "Habib Ali Kwitang (Ulama Pejuang Kemerdekaan)",
      location: "Kwitang, Senen, Jakarta Pusat",
      distance: "3.4 km",
      history: "Pendiri Majelis Taklim Kwitang, sosok pemersatu umat, dan guru bagi ratusan ulama terkemuka di tanah Betawi dan nusantara.",
      address: "Jl. Kwitang II No.1, Senen, Jakarta Pusat",
      visitingHours: "06:00 - 22:00 WIB",
      facilities: ["Majelis Taklim", "Masjid Al-Riyadh Kwitang", "Dapur Berkah"]
    }
  ],

  // ----------------------------------------------------------------------------
  // 8. DATA LAYANAN SERVICE (CARI USTADZ & KHOTIB JUMAT)
  // ----------------------------------------------------------------------------
  scholars: [
    {
      id: 1,
      name: "KH. Ahmad Fauzan Al-Hafidz, Lc., M.A.",
      institution: "Al-Azhar University Kairo",
      expertise: "Fiqih Muamalah, Tafsir Tematik & Khutbah Jumat",
      experience: "14 Tahun Berdakwah",
      rating: 4.9,
      reviewsCount: 128,
      status: "Tersedia Jumat Ini",
      statusClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      city: "Jakarta & Sekitarnya",
      languages: ["Indonesia", "Arab", "Inggris"]
    },
    {
      id: 2,
      name: "Ustadzah Fatimah Azzahra, S.Th.I., M.Ag.",
      institution: "UIN Syarif Hidayatullah",
      expertise: "Fiqih Wanita, Parenting Islami & Tahsin Al-Qur'an",
      experience: "9 Tahun Berdakwah",
      rating: 4.95,
      reviewsCount: 94,
      status: "Tersedia Kajian Akhir Pekan",
      statusClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      city: "Jabodetabek",
      languages: ["Indonesia", "Arab"]
    },
    {
      id: 3,
      name: "Ust. Muhammad Ridwan, S.Sos.I.",
      institution: "Institut PTIQ Jakarta",
      expertise: "Khotib Jumat Berwawasan Kebangsaan & Motivasi Hijrah",
      experience: "7 Tahun Berdakwah",
      rating: 4.85,
      reviewsCount: 76,
      status: "Booking Jadwal Terbuka",
      statusClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      city: "Jakarta & Tangerang",
      languages: ["Indonesia", "Melayu"]
    }
  ],

  // ----------------------------------------------------------------------------
  // 9. DATA LAYANAN JENAZAH (DARURAT & PEMULASARAAN LENGKAP)
  // ----------------------------------------------------------------------------
  funeralServices: {
    hotline: "1500-999",
    hotlineWhatsapp: "+62 811-9999-786",
    callCenterStatus: "Siaga 24 Jam Nonstop",
    servicesList: [
      {
        id: "ambulance",
        title: "Ambulan Siaga Jenazah 24 Jam",
        desc: "Armada berpendingin medis standar resmi, cepat sampai ke lokasi rumah sakit atau rumah duka.",
        icon: "truck",
        coverage: "Seluruh Wilayah Jabodetabek & Luar Kota"
      },
      {
        id: "mandi",
        title: "Pemulasaraan & Mandi Jenazah Syar'i",
        desc: "Tim amil & amilah bersertifikat MUI, dilengkapi perlengkapan mandi bidara, kapur barus, dan kain kafan lengkap.",
        icon: "droplets",
        coverage: "Petugas Ikhwan & Akhwat Terpisah"
      },
      {
        id: "imam",
        title: "Imam Shalat Jenazah & Pembimbing Doa",
        desc: "Asatidz berpengalaman memandu shalat fardhu kifayah, doa kubur, talqin, serta pendampingan keluarga.",
        icon: "user-check",
        coverage: "Termasuk Tahlil Malam ke-1 s.d ke-7"
      },
      {
        id: "makam",
        title: "Pengurusan Lahan Pemakaman",
        desc: "Bantuan birokrasi TPU Muslim, liang lahat syar'i, nisan batu alam, dan tenda upacara pemakaman.",
        icon: "layers",
        coverage: "TPU Pemerintah & Pemakaman Muslim Wakaf"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // 10. DATA ARAH KIBLAT (QIBLA COMPASS)
  // ----------------------------------------------------------------------------
  qibla: {
    degree: 295,
    compassDirection: "295° NW (Barat Laut)",
    distanceToKaaba: "7.920 km dari Jakarta",
    kaabaCoordinates: "21.4225° N, 39.8262° E",
    accuracy: "Akurat (Koreksi Deklinasi Magnetik Aktif)"
  },

  // ----------------------------------------------------------------------------
  // 11. ARTIKEL EDITORIAL & KOLOM ISLAMI.CO (RICH FEATURE)
  // ----------------------------------------------------------------------------
    articles: [
    {
      id: "art-1",
      title: "Islam Ramah: Ikhtiar Merawat Persaudaraan di Ruang Digital",
      author: "Savic Ali",
      authorRole: "Pendiri Islami.co",
      date: "12 Nov 2026",
      readTime: "4 min baca",
      category: "Kolom",
      tag: "Islam Ramah",
      imageUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=500&q=80",
      url: "https://islami.co/islam-ramah-merawat-kebinekaan/",
      summary: "Mengapa penting menghadirkan narasi keislaman yang menyejukkan, inklusif, dan berpijak pada kebudayaan luhur Nusantara di era banjir informasi.",
      content: `
        <p class="mb-3">Islam sejak awal kehadirannya di Nusantara dibawa dengan penuh kearifan, santun, dan menghargai keragaman tradisi lokal. Para pendahulu kita tidak membakar jembatan kebudayaan, melainkan meneranginya dengan nilai-nilai tauhid dan kemanusiaan.</p>
        <p class="mb-3">Di era ruang digital saat ini, tantangan terbesar kita adalah polarisasi dan kemarahan yang kerap dibungkus atas nama agama. <strong>Islami.co</strong> hadir sebagai ikhtiar sadar untuk mengarusutamakan nilai-nilai <em>wasathiyah</em> (moderasi), bukan dengan membalas kemarahan, tetapi dengan menyajikan teladan, kajian ilmiah yang mendalam, dan bahasa yang merangkul.</p>
        <blockquote class="p-3 my-3 bg-red-50 dark:bg-red-950/40 border-l-4 border-[#801818] rounded-r-xl italic text-red-900 dark:text-red-200 font-serif">
          "Agama diturunkan untuk membimbing manusia menuju keselamatan dan kebahagiaan, bukan untuk memecah belah dan menyemai kebencian."
        </blockquote>
        <p>Mari terus menyalakan lentera literasi yang ramah di setiap sudut ruang siber kita.</p>
      `
    },
    {
      id: "art-2",
      title: "Menghidupkan Spirit Wasathiyah dalam Keseharian Muslim",
      author: "Prof. Nadirsyah Hosen",
      authorRole: "Cendekiawan Muslim",
      date: "11 Nov 2026",
      readTime: "5 min baca",
      category: "Keislaman",
      tag: "Tafsir Sosial",
      imageUrl: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=500&q=80",
      url: "https://islami.co/wasathiyah-islam-jalan-tengah/",
      summary: "Memahami konsep moderasi beragama bukan berarti berkompromi dalam akidah, melainkan bersikap adil dan proporsional dalam menyikapi perbedaan.",
      content: `
        <p class="mb-3">Banyak yang salah kaprah mengartikan moderasi beragama sebagai sikap ragu-ragu atau mencampuradukkan ajaran. Padahal, makna <em>ummatan wasathan</em> (QS. Al-Baqarah: 143) adalah umat pilihan yang berada di posisi tengah yang adil, seimbang, dan menjadi saksi kebenaran bagi seluruh umat manusia.</p>
        <p class="mb-3">Sikap ekstrem (<em>ghuluw</em>) dalam beragama justru seringkali lahir dari keterbatasan literasi dan pemahaman teks yang terlepas dari konteks maqashid asy-syariah (tujuan-tujuan luhur syariat). Ketika kita mengedepankan rahmah, kita sedang meneladani akhlak Rasulullah SAW secara paripurna.</p>
      `
    },
    {
      id: "art-3",
      title: "Tafsir Ayat Rahmatan lil 'Alamin: Makna Universal Kasih Sayang",
      author: "Tim Redaksi Islami.co",
      authorRole: "Rubrik Tafsir Tematik",
      date: "10 Nov 2026",
      readTime: "6 min baca",
      category: "Tafsir",
      tag: "Kajian Qur'an",
      imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=500&q=80",
      url: "https://islami.co/tafsir-rahmatan-lil-alamin/",
      summary: "Menelaah firman Allah QS. Al-Anbiya: 107 tentang misi utama kenabian Muhammad SAW sebagai rahmat bagi segenap semesta alam.",
      content: `
        <p class="mb-3">Firman Allah SWT: <em>"Dan tiadalah Kami mengutus kamu, melainkan untuk (menjadi) rahmat bagi semesta alam"</em> (QS. Al-Anbiya: 107). Kata <em>'alamin</em> mencakup seluruh ciptaan: manusia, hewan, tumbuhan, dan lingkungan hidup.</p>
        <p class="mb-3">Ibnu Katsir menjelaskan bahwa rahmat ini berlaku umum bagi orang-orang mukmin di dunia dan akhirat, serta bagi orang-orang non-muslim dalam bentuk perlindungan dan penangguhan siksa duniawi. Ini menegaskan bahwa nilai universal Islam adalah kedamaian dan kesejahteraan.</p>
      `
    },
    {
      id: "art-4",
      title: "Hukum Shalat di Kendaraan dan Menghormati Waktu Shalat",
      author: "Lembaga Bahtsul Masail",
      authorRole: "Rubrik Tanya Jawab Fiqih",
      date: "09 Nov 2026",
      readTime: "4 min baca",
      category: "Tanya Jawab",
      tag: "Fiqih Praktis",
      imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=500&q=80",
      url: "https://islami.co/shalat-di-kendaraan-dan-fiqih-safar/",
      summary: "Panduan lengkap fiqih safar ketika waktu shalat tiba saat menempuh perjalanan darat, laut, atau penerbangan jarak jauh.",
      content: `
        <p class="mb-3">Islam memberikan keringanan (rukhshah) bagi musafir dalam menjalankan shalat fardhu, baik berupa jamak, qashar, maupun shalat li hurmatil waqti di atas kendaraan bila tidak memungkinkan turun.</p>
        <p class="mb-3">Ulama mazhab Syafi'i menegaskan bahwa seorang musafir yang kesulitan berdiri atau menghadap kiblat tetap dianjurkan shalat semampunya, lalu mengulanginya jika rukun-rukun utama belum terpenuhi sempurna saat tiba di tujuan.</p>
      `
    },
    {
      id: "art-5",
      title: "Jejak Ulama Nusantara Menyebarkan Islam Damai Tanpa Pedang",
      author: "Zainul Milal Bizawie",
      authorRole: "Sejarawan Islam Nusantara",
      date: "08 Nov 2026",
      readTime: "7 min baca",
      category: "Khazanah",
      tag: "Sejarah Peradaban",
      imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=500&q=80",
      url: "https://islami.co/jejak-wali-songo-islam-nusantara/",
      summary: "Bagaimana strategi kebudayaan Walisongo berhasil mengislamkan kepulauan Nusantara dengan seni, dialog, dan keteladanan akhlak mulia.",
      content: `
        <p class="mb-3">Penyebaran Islam di Nusantara adalah salah satu peristiwa paling damai dan menakjubkan dalam sejarah peradaban dunia. Tidak ada penaklukan militer; yang ada adalah akulturasi yang indah antara nilai tauhid dengan kearifan lokal seperti tembang, wayang, dan tradisi kenduri.</p>
        <p class="mb-3">Pendekatan ini melahirkan peradaban Islam yang kokoh, berkarakter tasamuh (toleran), tawazun (seimbang), dan senantiasa menjadi benteng kerukunan bangsa hingga saat ini.</p>
      `
    }
  ],
  // ----------------------------------------------------------------------------
  // 12. TANYA JAWAB SYARIAH & KONSULTASI AGAMA (RICH FEATURE)
  // ----------------------------------------------------------------------------
  consultations: [
    {
      id: "faq-1",
      question: "Bagaimana hukum shalat di atas kendaraan (pesawat / kereta) saat waktu shalat hampir habis?",
      answeredBy: "Lembaga Bahtsul Masail Islami.co",
      category: "Fiqih Ibadah",
      answer: "Jika masih memungkinkan berhenti atau menjumpai waktu shalat di stasiun/bandara, utamakan shalat di darat dengan sempurna. Namun jika waktu habis sebelum tiba di tujuan, shalatlah di tempat duduk semampunya menghadap kiblat saat takbiratul ihram (jika bisa) untuk menghormati waktu (hurmatul waqti), dan diqadha bila rukun shalat belum sempurna."
    },
    {
      id: "faq-2",
      question: "Apakah menyebarkan berita yang belum jelas kebenarannya di medsos termasuk ghibah atau buhtan?",
      answeredBy: "Dewan Pakar Syariah Digital",
      category: "Etika Medsos",
      answer: "Rasulullah SAW bersabda: 'Cukuplah seseorang dianggap berdusta ketika ia menceritakan setiap apa yang ia dengar' (HR. Muslim). Menyebarkan kabar burung tanpa tabayyun (verifikasi) tergolong dosa fitnah atau buhtan jika isinya keliru, dan ghibah jika membongkar aib sesama."
    }
  ],

  // ----------------------------------------------------------------------------
  // 13. NASKAH KHUTBAH JUMAT PILIHAN (RICH FEATURE)
  // ----------------------------------------------------------------------------
  khutbahList: [
    {
      id: "khutbah-1",
      title: "Menebar Kebaikan Tanpa Memandang Perbedaan",
      theme: "Ukhuwah Insaniyah",
      duration: "10-12 Menit",
      summary: "Khotbah yang mengajak jamaah menghidupkan spirit kerukunan dan tolong-menolong kepada sesama hamba Allah.",
      content: "Alhamdulillahilladzi arsala rasulahu bil huda wa dinil haq... Jamaah shalat Jumat yang dirahmati Allah, persaudaraan kemanusiaan (ukhuwah insaniyah) mengajarkan kita bahwa setiap tetangga dan sesama manusia memiliki hak atas perlakuan santun dan kasih sayang kita..."
    }
  ],

  // ----------------------------------------------------------------------------
  // 14. DATA AYAT HARIAN MULTI-BAHASA (DAILY VERSES CAROUSEL)
  // ----------------------------------------------------------------------------
  dailyVerses: [
    {
      id: 1,
      arabic: "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًۭى لِّلْمُتَّقِينَ",
      surah: {
        id: "Surah Al-Baqarah: 2",
        en: "Surah Al-Baqarah: 2",
        ms: "Surah Al-Baqarah: 2"
      },
      translation: {
        id: "\"Kitab (Al-Qur'an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa.\"",
        en: "\"This is the Book about which there is no doubt, a guidance for those conscious of Allah.\"",
        ms: "\"Kitab (Al-Quran) ini tidak ada sebarang keraguan padanya; menjadi petunjuk bagi orang-orang yang bertaqwa.\""
      }
    },
    {
      id: 2,
      arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا • إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
      surah: {
        id: "Surah Al-Insyirah: 5-6",
        en: "Surah Ash-Sharh: 5-6",
        ms: "Surah Asy-Syarh: 5-6"
      },
      translation: {
        id: "\"Karena sesungguhnya sesudah kesulitan itu ada kemudahan, sesungguhnya sesudah kesulitan itu ada kemudahan.\"",
        en: "\"For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.\"",
        ms: "\"Oleh itu, maka (tetapkanlah kepercayaanmu) bahawa sesungguhnya tiap-tiap kesukaran disertai kemudahan.\""
      }
    },
    {
      id: 3,
      arabic: "وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
      surah: {
        id: "Surah At-Talaq: 2-3",
        en: "Surah At-Talaq: 2-3",
        ms: "Surah At-Talaq: 2-3"
      },
      translation: {
        id: "\"Barangsiapa bertakwa kepada Allah niscaya Dia akan mengadakan baginya jalan keluar dan memberinya rezeki dari arah yang tiada disangka-sangka.\"",
        en: "\"And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.\"",
        ms: "\"Dan sesiapa yang bertaqwa kepada Allah, nescaya Allah memudahkan baginya jalan keluar serta memberinya rezeki dari jalan yang tidak terlintas di hatinya.\""
      }
    }
  ],

  // ----------------------------------------------------------------------------
  // 15. DATA DOA HARIAN MULTI-BAHASA (TODAY'S DU'A)
  // ----------------------------------------------------------------------------
  
  // ----------------------------------------------------------------------------
  // 16. DATA HARI BESAR ISLAM & NASIONAL (CALENDAR EVENTS)
  // ----------------------------------------------------------------------------
  
  // ----------------------------------------------------------------------------
  
  // ----------------------------------------------------------------------------
  // KAJIAN VIDEO YOUTUBE ISLAMI.CO & ULAMA NUSANTARA
  // ----------------------------------------------------------------------------
  kajianVideos: [
    {
      id: "vid-1",
      title: "Islam Ramah: Merajut Keberagaman dan Kemanusiaan",
      speaker: "Prof. Dr. KH. Quraish Shihab",
      channel: "Islami.co Official",
      videoId: "oF_B6p9m924",
      duration: "18:24",
      summary: "Kajian mendalam tentang konsep persaudaraan sejati dalam Islam dan tafsir kemanusiaan universal.",
      thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "vid-2",
      title: "Memahami Hikmah dan Kearifan Fiqih Keseharian",
      speaker: "KH. Ahmad Bahauddin Nursalim (Gus Baha)",
      channel: "Santri Gayeng & Islami.co",
      videoId: "c5s7Z9s51pA",
      duration: "24:15",
      summary: "Penjelasan fiqih yang santai, mendalam dan penuh kearifan khas tradisi pesantren Nusantara.",
      thumbnail: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "vid-3",
      title: "Tafsir Maqashid Syariah di Era Modern & Digital",
      speaker: "Prof. Dr. Nadirsyah Hosen",
      channel: "Islami TV",
      videoId: "kL6nL6h294M",
      duration: "15:40",
      summary: "Menelaah tujuan luhur syariat Islam dalam merespons perkembangan peradaban teknologi informasi.",
      thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "vid-4",
      title: "Kisah Para Ulama & Tradisi Keilmuan Pesantren",
      speaker: "KH. Zulfa Mustofa",
      channel: "Islami.co Official",
      videoId: "8VbQ_kG7m2w",
      duration: "21:05",
      summary: "Napak tilas sanad keilmuan dan perjuangan dakwah para wali dan kiai di tanah air.",
      thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80"
    }
  ],

  // 17. PRESET DEFAULT AMALAN NABAWI SEHARIAN (DAILY ROUTINES PRESET)
  // ----------------------------------------------------------------------------
      defaultDailyRoutines: [
    {
      id: "routine-tahajud",
      title: {
        id: "Sholat Tahajud & Witir",
        en: "Tahajjud & Witr Night Prayer",
        ms: "Solat Tahajud & Witir"
      },
      category: "sholat",
      time: "03:15 WIB",
      arabic: "أُصَلِّي سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
      latin: "Ushalli sunnatat tahajjudi rak'ataini lillahi ta'ala",
      translation: {
        id: "Aku berniat sholat sunnah Tahajud dua rakaat karena Allah Ta'ala.",
        en: "I intend to pray two rak'ahs of Tahajjud sunnah prayer for Allah the Almighty.",
        ms: "Sahaja aku solat sunat Tahajud dua rakaat kerana Allah Ta'ala."
      },
      niat: {
        arabic: "أُصَلِّي سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
        latin: "Ushalli sunnatat tahajjudi rak'ataini lillahi ta'ala",
        meaning: "Aku berniat sholat sunnah Tahajud dua rakaat karena Allah Ta'ala."
      },
      dzikir: {
        arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ • سُبْحَانَ الْمَلِكِ الْقُدُّوسِ (٣×)",
        latin: "Allahumma lakal hamdu anta nurus samawati wal ardhi wa man fihinna, wa lakal hamdu anta qayyimus samawati wal ardhi wa man fihinna. Subhanal malikil quddus (3x)",
        meaning: "Ya Allah, bagi-Mu segala puji, Engkau cahaya langit dan bumi serta seisinya. Maha Suci Raja Yang Maha Kudus (3x)."
      },
      completed: true
    },
    {
      id: "routine-bangun",
      title: {
        id: "Doa Bangun Tidur & Mensyukuri Hidup",
        en: "Waking Up & Gratitude Prayer",
        ms: "Doa Bangun Tidur & Mensyukuri Hidup"
      },
      category: "subuh",
      time: "04:30 WIB",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
      latin: "Alhamdulillahilladzi ahyana ba'da ma amatana wa ilaihin nusyur",
      translation: {
        id: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami dan kepada-Nya tempat kembali.",
        en: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
        ms: "Segala puji bagi Allah yang menghidupkan kami selepas mematikan kami dan kepada-Nya tempat kembali."
      },
      completed: true
    },
    {
      id: "routine-subuh",
      title: {
        id: "Sholat Subuh Berjamaah & Qobliyah",
        en: "Fajr Congregational Prayer & Sunnah",
        ms: "Solat Subuh Berjemaah & Qobliyah"
      },
      category: "sholat",
      time: "04:45 WIB",
      arabic: "أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
      latin: "Ushalli fardhash shubhi rak'ataini mustaqbilal qiblati adaan lillahi ta'ala",
      translation: {
        id: "Aku berniat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala.",
        en: "I intend to pray the two rak'ahs of obligatory Fajr prayer facing the Qiblah for Allah.",
        ms: "Sahaja aku solat fardhu Subuh dua rakaat menghadap kiblat tunai kerana Allah Ta'ala."
      },
      niat: {
        arabic: "أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
        latin: "Ushalli fardhash shubhi rak'ataini mustaqbilal qiblati adaan lillahi ta'ala",
        meaning: "Aku berniat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala."
      },
      dzikir: {
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ (٣×) • اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ • سُبْحَانَ اللَّهِ (٣٣×) • الْحَمْدُ لِلَّهِ (٣٣×) • اللَّهُ أَكْبَرُ (٣٣×) • اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
        latin: "Astaghfirullahal 'adzim (3x). Allahumma antas salam wa minkas salam tabarakta ya dzal jalali wal ikram. Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x). Allahumma inni as'aluka 'ilman nafi'an wa rizqan thayyiban wa 'amalan mutaqabbala",
        meaning: "Istighfar 3x, Doa Keselamatan, Tasbih 33x, Tahmid 33x, Takbir 33x, dan Doa Ilmu, Rezeki & Amal Maqbul."
      },
      completed: true
    },
    {
      id: "routine-dzikir-pagi",
      title: {
        id: "Dzikir Pagi Pembuka Berkah",
        en: "Morning Dhikr for Blessings",
        ms: "Zikir Pagi Pembuka Berkah"
      },
      category: "subuh",
      time: "05:30 WIB",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      latin: "Ashbahna wa ashbahal mulku lillah, walhamdulillah, la ilaha illallahu wahdahu la syarika lah, lahul mulku wa lahul hamdu wa huwa 'ala kulli syai'in qadir",
      translation: {
        id: "Kami telah memasuki waktu pagi dan kerajaan milik Allah, segala puji bagi Allah, tiada sesembahan selain Allah Yang Maha Esa.",
        en: "We have entered morning and dominion belongs to Allah, all praise to Allah, there is no god but Allah alone.",
        ms: "Kami telah memasuki waktu pagi dan kerajaan milik Allah, segala puji bagi Allah, tiada tuhan melainkan Allah semata-mata."
      },
      completed: true
    },
    {
      id: "routine-sedekah",
      title: {
        id: "Sedekah Subuh / Infaq Jariyah Harian",
        en: "Morning Charity & Ongoing Infaq",
        ms: "Sedekah Subuh / Infaq Jariah Harian"
      },
      category: "amal",
      time: "06:00 WIB",
      arabic: "اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا وَأَعْطِ مُمْسِكًا تَلَفًا • رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
      latin: "Allahumma a'thi munfiqan khalafan wa a'thi mumsikan talafa. Rabbana taqabbal minna innaka antas sami'ul 'alim",
      translation: {
        id: "Ya Allah, berikanlah ganti bagi orang yang berinfak dan berikanlah kehancuran bagi orang yang bakhil. Ya Tuhan kami, terimalah amal kami.",
        en: "O Allah, give recompense to the one who spends, and give destruction to the one who withholds. Our Lord, accept from us.",
        ms: "Ya Allah, berikanlah ganti kepada yang berinfak dan kebinasaan kepada yang bakhil. Wahai Tuhan kami, terimalah daripada kami."
      },
      completed: true
    },
    {
      id: "routine-dhuha",
      title: {
        id: "Sholat Dhuha & Doa Pembuka Rezeki",
        en: "Duha Prayer & Sustenance Dhikr",
        ms: "Solat Dhuha & Doa Pembuka Rezeki"
      },
      category: "sholat",
      time: "07:30 WIB",
      arabic: "أُصَلِّي سُنَّةَ الضُّحَى رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
      latin: "Ushalli sunnatadh dhuha rak'ataini mustaqbilal qiblati adaan lillahi ta'ala",
      translation: {
        id: "Aku berniat sholat sunnah Dhuha dua rakaat menghadap kiblat karena Allah Ta'ala.",
        en: "I intend to pray two rak'ahs of Duha sunnah prayer facing Qiblah for Allah.",
        ms: "Sahaja aku solat sunat Dhuha dua rakaat menghadap kiblat tunai kerana Allah Ta'ala."
      },
      niat: {
        arabic: "أُصَلِّي سُنَّةَ الضُّحَى رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
        latin: "Ushalli sunnatadh dhuha rak'ataini mustaqbilal qiblati adaan lillahi ta'ala",
        meaning: "Aku berniat sholat sunnah Dhuha dua rakaat menghadap kiblat karena Allah Ta'ala."
      },
      dzikir: {
        arabic: "اللَّهُمَّ إِنَّ الضُّحَاءَ ضُحَاؤُكَ وَالْبَهَاءَ بَهَاؤُكَ وَالْجَمَالَ جَمَالُكَ، اللَّهُمَّ إِنْ كَانَ رِزْقِي فِي السَّمَاءِ فَأَنْزِلْهُ وَإِنْ كَانَ فِي الأَرْضِ فَأَخْرِجْهُ",
        latin: "Allahumma innadh dhuha'a dhuha'uka wal baha'a baha'uka wal jamala jamaluka, Allahumma in kana rizqi fis sama'i fa anzilhu wa in kana fil ardhi fa akhrijhu",
        meaning: "Ya Allah, sesungguhnya waktu dhuha adalah dhuha-Mu, keindahan adalah keindahan-Mu. Jika rezekiku di langit turunkanlah, jika di bumi keluarkanlah."
      },
      completed: true
    },
    {
      id: "routine-keluar-rumah",
      title: {
        id: "Doa Keluar Rumah & Safar Berangkat Kerja",
        en: "Leaving Home & Travel Prayer",
        ms: "Doa Keluar Rumah & Safar"
      },
      category: "dhuha",
      time: "07:00 WIB",
      arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ • اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ",
      latin: "Bismillahi tawakkaltu 'alallah la hawla wa la quwwata illa billah. Allahumma inni a'udzu bika an adhilla aw udhalla",
      translation: {
        id: "Dengan nama Allah, aku berserah diri kepada Allah, tiada daya dan upaya kecuali dengan pertolongan Allah. Ya Allah lindungilah daku dari kesesatan.",
        en: "In the name of Allah, I trust in Allah, there is no might nor power except with Allah. O Allah, I seek refuge in You from going astray.",
        ms: "Dengan nama Allah, aku bertawakal kepada Allah, tiada daya melainkan dengan Allah. Ya Allah lindungilah daku daripada kesesatan."
      },
      completed: true
    },
    {
      id: "routine-kerja",
      title: {
        id: "Doa Memulai Aktivitas / Bekerja",
        en: "Prayer for Starting Work & Tasks",
        ms: "Doa Memulakan Aktiviti / Bekerja"
      },
      category: "dhuha",
      time: "08:30 WIB",
      arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ • اللَّهُمَّ بَارِكْ لِي فِي وَقْتِي وَسَعْيِي",
      latin: "Bismillahi tawakkaltu 'alallah la hawla wa la quwwata illa billah. Allahumma barik li fi waqti wa sa'yi",
      translation: {
        id: "Dengan menyebut nama Allah, aku bertawakkal kepada Allah, tiada daya dan kekuatan kecuali dengan pertolongan Allah. Ya Allah berkahilah ikhtiar dan waktuku.",
        en: "In the name of Allah, I rely upon Allah; no power nor strength except with Allah. O Allah bless my time and effort.",
        ms: "Dengan nama Allah, aku bertawakal kepada Allah, tiada daya dan kekuatan melainkan dengan Allah. Ya Allah berkati ikhtiar dan waktuku."
      },
      completed: true
    },
    {
      id: "routine-lisan",
      title: {
        id: "Menjaga Lisan & Membantu Sesama",
        en: "Guarding Speech & Helping Others",
        ms: "Menjaga Lisan & Membantu Sesama"
      },
      category: "amal",
      time: "11:30 WIB",
      arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ • اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ",
      latin: "Man kana yu'minu billahi wal yaumil akhiri fal yaqul khoiran aw liyashmut. Allahummah dini li ahsanil akhlaq",
      translation: {
        id: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah berkata baik atau diam. Ya Allah tunjukilah aku akhlak yang paling mulia.",
        en: "Whoever believes in Allah and the Last Day, let him speak good or remain silent. O Allah guide me to the best of morals.",
        ms: "Barangsiapa beriman kepada Allah dan hari akhirat, hendaklah berkata baik atau diam. Ya Allah tunjukkanlah daku akhlak terbaik."
      },
      completed: true
    },
    {
      id: "routine-dzuhur",
      title: {
        id: "Sholat Dzuhur Berjamaah",
        en: "Zuhr Congregational Prayer",
        ms: "Solat Zohor Berjemaah"
      },
      category: "sholat",
      time: "11:55 WIB",
      arabic: "أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
      latin: "Ushalli fardhazh zhuhri arba'a raka'atin mustaqbilal qiblati adaan lillahi ta'ala",
      translation: {
        id: "Aku berniat sholat fardhu Dzuhur empat rakaat menghadap kiblat karena Allah Ta'ala.",
        en: "I intend to pray four rak'ahs of obligatory Zuhr prayer facing Qiblah for Allah.",
        ms: "Sahaja aku solat fardhu Zohor empat rakaat menghadap kiblat tunai kerana Allah Ta'ala."
      },
      niat: {
        arabic: "أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
        latin: "Ushalli fardhazh zhuhri arba'a raka'atin mustaqbilal qiblati adaan lillahi ta'ala",
        meaning: "Aku berniat sholat fardhu Dzuhur empat rakaat menghadap kiblat karena Allah Ta'ala."
      },
      dzikir: {
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ (٣×) • لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ • سُبْحَانَ اللَّهِ (٣٣×) • الْحَمْدُ لِلَّهِ (٣٣×) • اللَّهُ أَكْبَرُ (٣٣×) • اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ",
        latin: "Astaghfirullahal 'adzim (3x). La ilaha illallahu wahdahu la syarika lah. Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x). Allahumma la mani'a lima a'thaita",
        meaning: "Istighfar 3x, Tahlil, Tasbih 33x, Tahmid 33x, Takbir 33x, dan Doa Pasrah atas karunia Allah."
      },
      completed: true
    },
    {
      id: "routine-makan",
      title: {
        id: "Doa Sebelum & Sesudah Makan",
        en: "Prayer Before & After Meals",
        ms: "Doa Sebelum & Selepas Makan"
      },
      category: "amal",
      time: "12:30 WIB",
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ • الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
      latin: "Allahumma barik lana fima razaqtana wa qina 'adzaban nar. Alhamdulillahilladzi ath'amana wa saqana wa ja'alana muslimin",
      translation: {
        id: "Ya Allah, berkahilah kami atas apa yang Engkau rezekikan dan peliharalah kami dari siksa neraka. Segala puji bagi Allah yang memberi kami makan dan minum.",
        en: "O Allah, bless us in what You provided and save us from the Fire. Praise be to Allah who fed us and gave us drink.",
        ms: "Ya Allah, berkati rezeki kami dan peliharalah kami dari azab neraka. Segala puji bagi Allah yang memberi kami makan dan minum."
      },
      completed: true
    },
    {
      id: "routine-ashar",
      title: {
        id: "Sholat Ashar Berjamaah",
        en: "Asr Congregational Prayer",
        ms: "Solat Asar Berjemaah"
      },
      category: "sholat",
      time: "15:15 WIB",
      arabic: "أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
      latin: "Ushalli fardhal 'ashri arba'a raka'atin mustaqbilal qiblati adaan lillahi ta'ala",
      translation: {
        id: "Aku berniat sholat fardhu Ashar empat rakaat menghadap kiblat karena Allah Ta'ala.",
        en: "I intend to pray four rak'ahs of obligatory Asr prayer facing Qiblah for Allah.",
        ms: "Sahaja aku solat fardhu Asar empat rakaat menghadap kiblat tunai kerana Allah Ta'ala."
      },
      niat: {
        arabic: "أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
        latin: "Ushalli fardhal 'ashri arba'a raka'atin mustaqbilal qiblati adaan lillahi ta'ala",
        meaning: "Aku berniat sholat fardhu Ashar empat rakaat menghadap kiblat karena Allah Ta'ala."
      },
      dzikir: {
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ (٣×) • سُبْحَانَ اللَّهِ (٣٣×) • الْحَمْدُ لِلَّهِ (٣٣×) • اللَّهُ أَكْبَرُ (٣٣×) • اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        latin: "Astaghfirullahal 'adzim alladzi la ilaha illa huwal hayyul qayyum wa atubu ilaih (3x). Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x). Allahumma a'inni 'ala dzikrika wa syukrika wa husni 'ibadatik",
        meaning: "Istighfar Taubat 3x, Tasbih 33x, Tahmid 33x, Takbir 33x, dan Doa memohon pertolongan ibadah terbaik."
      },
      completed: false
    },
    {
      id: "routine-maghrib",
      title: {
        id: "Sholat Maghrib & Doa Keselamatan",
        en: "Maghrib Prayer & Safety Dua",
        ms: "Solat Maghrib & Doa Keselamatan"
      },
      category: "sholat",
      time: "18:00 WIB",
      arabic: "أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
      latin: "Ushalli fardhal maghribi tsalatsa raka'atin mustaqbilal qiblati adaan lillahi ta'ala",
      translation: {
        id: "Aku berniat sholat fardhu Maghrib tiga rakaat menghadap kiblat karena Allah Ta'ala.",
        en: "I intend to pray three rak'ahs of obligatory Maghrib prayer facing Qiblah for Allah.",
        ms: "Sahaja aku solat fardhu Maghrib tiga rakaat menghadap kiblat tunai kerana Allah Ta'ala."
      },
      niat: {
        arabic: "أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
        latin: "Ushalli fardhal maghribi tsalatsa raka'atin mustaqbilal qiblati adaan lillahi ta'ala",
        meaning: "Aku berniat sholat fardhu Maghrib tiga rakaat menghadap kiblat karena Allah Ta'ala."
      },
      dzikir: {
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ (٧×) • أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ (٣×) • سُبْحَانَ اللَّهِ (٣٣×) • الْحَمْدُ لِلَّهِ (٣٣×) • اللَّهُ أَكْبَرُ (٣٣×) • رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin: "Allahumma ajirni minan nar (7x). Astaghfirullahal 'adzim (3x). Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x). Rabbana atina fid dunya hasanatan wa fil akhirati hasanatan wa qina 'adzaban nar",
        meaning: "Doa Selamat dari Neraka (7x), Istighfar, Tasbih 33x, Tahmid 33x, Takbir 33x, dan Doa Sapu Jagad."
      },
      completed: false
    },
    {
      id: "routine-isya",
      title: {
        id: "Sholat Isya & Ba'diyah",
        en: "Isha Prayer & Ba'diyah Sunnah",
        ms: "Solat Isyak & Ba'diyah"
      },
      category: "sholat",
      time: "19:15 WIB",
      arabic: "أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
      latin: "Ushalli fardhal 'isya-i arba'a raka'atin mustaqbilal qiblati adaan lillahi ta'ala",
      translation: {
        id: "Aku berniat sholat fardhu Isya empat rakaat menghadap kiblat karena Allah Ta'ala.",
        en: "I intend to pray four rak'ahs of obligatory Isha prayer facing Qiblah for Allah.",
        ms: "Sahaja aku solat fardhu Isyak empat rakaat menghadap kiblat tunai kerana Allah Ta'ala."
      },
      niat: {
        arabic: "أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
        latin: "Ushalli fardhal 'isya-i arba'a raka'atin mustaqbilal qiblati adaan lillahi ta'ala",
        meaning: "Aku berniat sholat fardhu Isya empat rakaat menghadap kiblat karena Allah Ta'ala."
      },
      dzikir: {
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ (٣×) • اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ • سُبْحَانَ اللَّهِ (٣٣×) • الْحَمْدُ لِلَّهِ (٣٣×) • اللَّهُ أَكْبَرُ (٣٣×) • اللَّهُمَّ حَاسِبْنِي حِسَابًا يَسِيرًا",
        latin: "Astaghfirullahal 'adzim (3x). Allahumma antas salam wa minkas salam. Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x). Allahumma hasibni hisaban yasira",
        meaning: "Istighfar, Doa Keselamatan, Tasbih 33x, Tahmid 33x, Takbir 33x, dan Doa Hisab yang Ringan."
      },
      completed: false
    },
    {
      id: "routine-tilawah",
      title: {
        id: "Tilawah Al-Qur'an / Baca Surat Al-Mulk",
        en: "Quran Recitation / Surah Al-Mulk",
        ms: "Tilawah Al-Qur'an / Membaca Surah Al-Mulk"
      },
      category: "malam",
      time: "19:45 WIB",
      arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ • اللَّهُمَّ ارْحَمْنَا بِالْقُرْآنِ وَاجْعَلْهُ لَنَا نُورًا وَهُدًى",
      latin: "Tabarakalladzi biyadihil mulku wa huwa 'ala kulli syai'in qadir. Allahummarhamna bil qur'an waj'alhu lana nuran wa huda",
      translation: {
        id: "Maha Suci Allah yang di tangan-Nyalah segala kerajaan, dan Dia Maha Kuasa atas segala sesuatu. Ya Allah jadikan Al-Qur'an sebagai cahaya dan petunjuk kami.",
        en: "Blessed is He in whose hand is dominion, and He is over all things competent. O Allah make the Quran a light and guidance for us.",
        ms: "Maha Suci Allah yang di tangan-Nya kekuasaan. Ya Allah jadikanlah Al-Qur'an sebagai cahaya dan panduan buat kami."
      },
      completed: false
    },
    {
      id: "routine-dzikir-petang",
      title: {
        id: "Dzikir Petang & Muhasabah Harian",
        en: "Evening Dhikr & Self-Reflection",
        ms: "Zikir Petang & Muhasabah Harian"
      },
      category: "malam",
      time: "20:45 WIB",
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي",
      latin: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastatha'tu, abu'u laka bini'matika 'alayya wa abu'u bidzanbi faghfir li",
      translation: {
        id: "(Sayyidul Istighfar) Ya Allah, Engkau adalah Tuhanku, tiada tuhan selain Engkau. Aku mengakui nikmat-Mu dan dosaku, maka ampunilah aku.",
        en: "O Allah, You are my Lord, there is no god but You. I acknowledge Your blessing upon me and acknowledge my sin, so forgive me.",
        ms: "Ya Allah, Engkaulah Tuhanku tiada tuhan melainkan Engkau. Aku mengakui nikmat-Mu dan dosaku, maka ampunilah daku."
      },
      completed: false
    },
    {
      id: "routine-tidur",
      title: {
        id: "Doa & Adab Sebelum Tidur",
        en: "Bedtime Prayer & Sunnah Ethics",
        ms: "Doa & Adab Sebelum Tidur"
      },
      category: "malam",
      time: "21:30 WIB",
      arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
      latin: "Bismika rabbi wadha'tu janbi wa bika arfa'uh, in amsakta nafsi farhamha, wa in arsaltaha fahfazhha bima tahfazhu bihi 'ibadakas shalihin",
      translation: {
        id: "Dengan nama-Mu wahai Tuhanku, aku meletakkan lambungku dan dengan nama-Mu aku mengangkatnya. Jika Engkau menahan jiwaku sayangilah, dan lindungilah ia.",
        en: "In Your name my Lord, I lie down and rise. If You take my soul have mercy, and if You return it protect it.",
        ms: "Dengan nama-Mu wahai Tuhanku, aku meletakkan rusukku dan mengangkatnya. Jika Engkau mengambil jiwaku sayangilah ia dan peliharalah ia."
      },
      completed: false
    }
  ]
};

// Pastikan variabel mock data tersedia di browser window
if (typeof window !== "undefined") {
  window.IslamiMockData = IslamiMockData;
}

