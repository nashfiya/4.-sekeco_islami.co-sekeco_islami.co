/**
 * ==============================================================================
 * APLIKASI ISLAMI.CO - MAIN CONTROLLER JAVASCRIPT
 * ==============================================================================
 * Mengatur seluruh logika interaksi rich-feature ala Islami.co:
 * - Direct Mobile Web App Viewport (Responsive Smartphone Layout)
 * - Official Crimson Red (#B91C1C) Brand Header & Design System
 * - PWA & Offline Support (Service Worker, install prompt, offline badge)
 * - Dark Mode & Light Mode Switcher
 * - Live dynamic prayer time & countdown
 * - Pembaca Artikel Islami.co (Reader Mode dengan font size adjuster)
 * - Al-Qur'an Digital dengan Floating Audio Player & Bookmark
 * - Hadist Tematik, Doa Harian, Khutbah Jumat & Tanya Jawab Syariah
 * - Tasbih Digital haptic & Kompas Kiblat
 * - Booking Ustadz & Layanan Jenazah
 * ==============================================================================
 */

// State Global Aplikasi
const AppState = {
  currentLang: 'id',
  activeTab: 'home',
  theme: 'light',
  tasbihCount: 0,
  activeAudio: null,
  activeAudioId: null,
  activeAudioTitle: '',
  isOnline: navigator.onLine,
  deferredInstallPrompt: null,
  readerFontSize: 15,
  bookmarks: []
};

// Handler Khusus Fitur Direktori Islami.co
function openMasjidDirectory() {
  switchTab('calendar');
  showToast('Membuka Direktori Masjid Ramah & Bersejarah...');
}

function openMakamDirectory() {
  switchTab('articles');
  showToast('Membuka Peta Ziarah Makam Wali & Ulama Nusantara...');
}

// Inisialisasi saat DOM siap

// ==============================================================================
// LOGIKA WELCOME SCREEN ONBOARDING (ALA IPHONE IOS SETUP) & MULTI-BAHASA REAKTIF
// ==============================================================================

let selectedTempLang = 'id';
let greetingInterval = null;

function initWelcomeScreen() {
  const hasOnboarded = localStorage.getItem('islami_onboarded_completed');
  const preferredLang = localStorage.getItem('islami_preferred_lang') || 'id';

  // Set current lang
  AppState.currentLang = preferredLang;
  applyLanguage(preferredLang);

  if (!hasOnboarded) {
    openWelcomeScreen();
  }
}

function openWelcomeScreen() {
  const modal = document.getElementById('welcomeOnboardingModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  selectOnboardingLang(AppState.currentLang || 'id');

  // Animasi sapaan bergantian ala iOS
  const greetings = [
    "Assalamu'alaikum",
    "Selamat Datang",
    "Welcome to Islami.co",
    "Ahlan wa Sahlan"
  ];
  let gIdx = 0;
  const greetingEl = document.getElementById('onboardingGreeting');
  if (greetingInterval) clearInterval(greetingInterval);
  greetingInterval = setInterval(() => {
    gIdx = (gIdx + 1) % greetings.length;
    if (greetingEl) {
      greetingEl.style.opacity = '0';
      setTimeout(() => {
        greetingEl.textContent = greetings[gIdx];
        greetingEl.style.opacity = '1';
      }, 200);
    }
  }, 2400);

  if (window.lucide) lucide.createIcons();
}

function closeWelcomeScreen() {
  const modal = document.getElementById('welcomeOnboardingModal');
  if (modal) modal.classList.add('hidden');
  if (greetingInterval) clearInterval(greetingInterval);
}

function selectOnboardingLang(lang) {
  selectedTempLang = lang;
  ['id', 'en', 'ms'].forEach(l => {
    const card = document.getElementById('card-lang-' + l);
    const check = document.getElementById('check-lang-' + l);
    if (card && check) {
      if (l === lang) {
        card.classList.add('border-2', 'border-[#8B1E1E]', 'bg-red-50/60', 'dark:bg-red-950/30');
        card.classList.remove('border', 'border-stone-200', 'dark:border-stone-800', 'bg-white', 'dark:bg-stone-900/60');
        check.classList.remove('hidden');
        check.classList.add('flex');
      } else {
        card.classList.remove('border-2', 'border-[#8B1E1E]', 'bg-red-50/60', 'dark:bg-red-950/30');
        card.classList.add('border', 'border-stone-200', 'dark:border-stone-800', 'bg-white', 'dark:bg-stone-900/60');
        check.classList.add('hidden');
        check.classList.remove('flex');
      }
    }
  });

  const btnText = document.querySelector('#btnContinueOnboarding span');
  if (btnText) {
    if (lang === 'en') btnText.textContent = "Continue";
    else if (lang === 'ms') btnText.textContent = "Seterusnya";
    else btnText.textContent = "Lanjutkan";
  }
}

function confirmWelcomeScreen() {
  localStorage.setItem('islami_preferred_lang', selectedTempLang);
  localStorage.setItem('islami_onboarded_completed', 'true');
  switchLanguage(selectedTempLang);
  closeWelcomeScreen();
  showToast(selectedTempLang === 'en' ? "Welcome to Islami.co!" : (selectedTempLang === 'ms' ? "Selamat datang ke Islami.co!" : "Selamat datang di Islami.co!"));
}

// ==============================================================================
// MULTI-LANGUAGE DAILY VERSE & TODAY'S DU'A CAROUSEL
// ==============================================================================
AppState.dailyVerseIndex = 0;

function switchDailyVerseSlide(index) {
  if (!window.IslamiMockData || !window.IslamiMockData.dailyVerses) return;
  const list = window.IslamiMockData.dailyVerses;
  if (index < 0 || index >= list.length) return;
  AppState.dailyVerseIndex = index;
  renderDailyVerse(index);
}

function renderDailyVerse(index = (AppState.dailyVerseIndex || 0)) {
  if (!window.IslamiMockData || !window.IslamiMockData.dailyVerses) return;
  const list = window.IslamiMockData.dailyVerses;
  const item = list[index] || list[0];
  const lang = AppState.currentLang || 'id';

  const arabicEl = document.getElementById('dailyVerseArabic');
  const transEl = document.getElementById('dailyVerseTranslation');
  const surahEl = document.getElementById('dailyVerseSurah');
  const dotsContainer = document.getElementById('dailyVerseDots');

  if (arabicEl) arabicEl.textContent = item.arabic;
  if (transEl) transEl.textContent = item.translation[lang] || item.translation['id'];
  if (surahEl) surahEl.textContent = item.surah[lang] || item.surah['id'];

  if (dotsContainer) {
    dotsContainer.innerHTML = list.map((_, i) => {
      const isActive = i === index;
      return '<button onclick="switchDailyVerseSlide(' + i + ')" class="' +
        (isActive ? 'w-3.5 h-1 rounded-full bg-amber-400' : 'w-1 h-1 rounded-full bg-white/40 hover:bg-white/80') +
        ' transition-all" aria-label="Slide ' + (i + 1) + '"></button>';
    }).join('');
  }
}

function shareDailyVerse() {
  const index = AppState.dailyVerseIndex || 0;
  if (!window.IslamiMockData || !window.IslamiMockData.dailyVerses) return;
  const item = window.IslamiMockData.dailyVerses[index] || window.IslamiMockData.dailyVerses[0];
  const lang = AppState.currentLang || 'id';
  const text = item.arabic + '\n\n' + (item.translation[lang] || item.translation['id']) + '\n(' + (item.surah[lang] || item.surah['id']) + ')\n\nDibagikan via Islami.co';
  copyToClipboard(text);
  showToast(lang === 'en' ? 'Verse copied to clipboard!' : (lang === 'ms' ? 'Ayat disalin ke papan keratan!' : 'Ayat berhasil disalin!'));
}

function renderTodaysDua() {
  if (!window.IslamiMockData || !window.IslamiMockData.dailyDuas) return;
  const item = window.IslamiMockData.dailyDuas[0];
  const lang = AppState.currentLang || 'id';

  const arabicEl = document.getElementById('todaysDuaArabic');
  const transEl = document.getElementById('todaysDuaTranslation');

  if (arabicEl) arabicEl.textContent = item.arabic;
  if (transEl) transEl.textContent = item.translation[lang] || item.translation['id'];
}

// Override switchLanguage with reactive translations
function switchLanguage(lang) {
  if (!['id', 'en', 'ms'].includes(lang)) lang = 'id';
  AppState.currentLang = lang;
  localStorage.setItem('islami_preferred_lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  if (!['id', 'en', 'ms'].includes(lang)) lang = 'id';
  AppState.currentLang = lang;

  const dict = window.IslamiTranslations ? (window.IslamiTranslations[lang] || window.IslamiTranslations['id']) : null;
  if (!dict) return;

  // Scan and translate all [data-i18n] tags
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Scan and translate all [data-i18n-placeholder] tags
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // 1. Update top bar language toggle buttons
  ['id', 'en', 'ms'].forEach(l => {
    const btn = document.getElementById('btn-lang-' + l);
    if (btn) {
      if (l === lang) {
        btn.className = "px-1.5 py-0.5 rounded-full text-[9px] bg-[#8B1E1E] text-white font-bold transition shadow-xs";
      } else {
        btn.className = "px-1.5 py-0.5 rounded-full text-[9px] text-stone-600 dark:text-stone-300 hover:text-red-700 transition";
      }
    }
  });

  // 2. Next Prayer Title
  const npTitle = document.querySelector('#view-home span.tracking-wider');
  if (npTitle && dict.next_prayer_title) {
    npTitle.textContent = dict.next_prayer_title;
  }

  // 3. Search Placeholder
  const homeSearchInput = document.getElementById('homeSearchInput');
  if (homeSearchInput && dict.ask_question_placeholder) {
    homeSearchInput.placeholder = dict.ask_question_placeholder;
  }
  // Search input placeholder handled directly via [data-i18n-placeholder]

  // 4. Daily Verse Label
  const dvLabel = document.querySelector('#view-home .uppercase.tracking-wider');
  if (dvLabel && dict.daily_verse_title) {
    dvLabel.textContent = dict.daily_verse_title;
  }

  // 5. Weather text
  const weatherEl = document.getElementById('heroWeatherText');
  if (weatherEl && dict.weather_clear) {
    weatherEl.textContent = dict.weather_clear;
  }

  // 6. Update date display based on locale
  const d = new Date();
  const dateOptions = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
  const gregEl = document.getElementById('heroGregorianDate');
  if (gregEl) {
    const localeStr = lang === 'en' ? 'en-US' : (lang === 'ms' ? 'ms-MY' : 'id-ID');
    gregEl.textContent = d.toLocaleDateString(localeStr, dateOptions);
  }

  // 7. Dynamic components
  if (typeof renderDailyVerse === 'function') renderDailyVerse();
  if (typeof renderTodaysDua === 'function') renderTodaysDua();
  if (typeof renderHomeDailyReportCard === 'function') renderHomeDailyReportCard();
  if (typeof renderDailyPlans === 'function') renderDailyPlans();
  if (typeof renderQuranList === 'function') renderQuranList();
  if (typeof renderHadithList === 'function') renderHadithList();
  if (typeof renderPrayersList === 'function') renderPrayersList();
  if (typeof renderArticlesList === 'function') renderArticlesList();
  if (typeof updatePrayerTimesCountdown === 'function') updatePrayerTimesCountdown();
  if (typeof updateSettingLangUI === 'function') updateSettingLangUI(lang);
  if (typeof renderMoreFeaturesDrawer === 'function') renderMoreFeaturesDrawer();
  if (typeof renderAllFeatures === 'function') renderAllFeatures();

  if (window.lucide) lucide.createIcons();
}

  // ==============================================================================
  // MODAL DIREKTORI MASJID & MAKAM ULAMA INTERAKTIF
  // ==============================================================================

  function openMasjidDirectory() {
    const modal = document.getElementById('modalMasjidDirectory');
    const container = document.getElementById('masjidListContainer');
    if (!modal || !container || !window.IslamiMockData) return;

    const list = window.IslamiMockData.masjidDirectory || [];
    container.innerHTML = list.map(m => `
    <div class="card-islami p-3.5 bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 space-y-2 hover:border-[#8B1E1E] transition">
      <div class="flex items-start justify-between gap-2">
        <div>
          <span class="text-[9.5px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full inline-block mb-1">
            📍 ${m.city} • ${m.distance}
          </span>
          <h4 class="font-extrabold text-xs text-stone-900 dark:text-white leading-tight">${m.name}</h4>
          <p class="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">${m.address}</p>
        </div>
        <span class="text-[9px] font-semibold text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-lg shrink-0">
          ${m.capacity}
        </span>
      </div>
      <div class="flex flex-wrap gap-1 pt-1">
        ${m.facilities.map(f => `<span class="text-[8.5px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-full">✓ ${f}</span>`).join('')}
      </div>
      <div class="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
        <span class="text-[9.5px] text-stone-500 italic">${m.activities}</span>
        <a href="tel:${m.phone}" class="px-2.5 py-1 rounded-full bg-[#8B1E1E] hover:bg-[#991B1B] text-white text-[9.5px] font-bold flex items-center gap-1 shadow-xs">
          <i data-lucide="phone" class="w-3 h-3"></i> Kontak
        </a>
      </div>
    </div>
  `).join('');

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  function closeMasjidDirectory() {
    const modal = document.getElementById('modalMasjidDirectory');
    if (modal) modal.classList.add('hidden');
  }

  function openMakamDirectory() {
    const modal = document.getElementById('modalMakamDirectory');
    const container = document.getElementById('makamListContainer');
    if (!modal || !container || !window.IslamiMockData) return;

    const list = window.IslamiMockData.makamDirectory || [];
    container.innerHTML = list.map(mk => `
    <div class="card-islami p-3.5 bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 space-y-2 hover:border-[#8B1E1E] transition">
      <div>
        <span class="text-[9.5px] font-bold text-[#8B1E1E] dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-full inline-block mb-1">
          🕌 ${mk.title}
        </span>
        <h4 class="font-extrabold text-xs text-stone-900 dark:text-white leading-tight">${mk.name}</h4>
        <p class="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">${mk.location}</p>
      </div>
      <p class="text-[10.5px] text-stone-600 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-800/50 p-2.5 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
        "${mk.biography}"
      </p>
      <div class="space-y-1 pt-1">
        <span class="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Adab Ziarah:</span>
        <ul class="text-[9.5px] text-stone-500 dark:text-stone-400 space-y-0.5 pl-3 list-disc">
          ${mk.adab.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  function closeMakamDirectory() {
    const modal = document.getElementById('modalMakamDirectory');
    if (modal) modal.classList.add('hidden');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initWelcomeScreen();

    // 1. Inisialisasi ikon Lucide
    if (window.lucide) {
      lucide.createIcons();
    }

    // 2. Load theme preferensi
    const savedTheme = localStorage.getItem('islami_theme') || 'light';
    setTheme(savedTheme);

    // 3. Load bookmarks
    AppState.bookmarks = JSON.parse(localStorage.getItem('islami_bookmarks') || '[]');

    // 4. Cek preferensi bahasa & status onboarding
    const savedLang = localStorage.getItem('islami_preferred_lang');
    const hasOnboarded = localStorage.getItem('islami_onboarded_completed');

    if (savedLang && ['id', 'en', 'ms'].includes(savedLang)) {
      AppState.currentLang = savedLang;
    }

    if (hasOnboarded === 'true') {
      const onboardingEl = document.getElementById('onboardingScreen');
      if (onboardingEl) {
        onboardingEl.classList.add('hidden');
      }
    } else {
      startGreetingAnimation();
    }

    // 5. Terapkan bahasa, render semua fitur, jam & countdown
    initDailyPlans();
    applyLanguage(AppState.currentLang);
    renderAllFeatures();
    renderHomeDailyReportCard();
    startRealPrayerCountdown();
    startDigitalClock();

    // 6. Inisialisasi PWA & Network Listener
    initPWAAndNetwork();
  });

  // ------------------------------------------------------------------------------
  // 1. THEME SWITCHER (DARK / LIGHT MODE)
  // ------------------------------------------------------------------------------
  function toggleTheme() {
    const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function setTheme(theme) {
    AppState.theme = theme;
    localStorage.setItem('islami_theme', theme);
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (window.lucide) lucide.createIcons();
  }

  // ------------------------------------------------------------------------------
  // 2. PWA, SERVICE WORKER & OFFLINE DETECTION
  // ------------------------------------------------------------------------------
  function initPWAAndNetwork() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => {
            console.log('[Islami.co PWA] Service Worker aktif:', reg.scope);
          })
          .catch(err => {
            console.warn('[Islami.co PWA] Service Worker gagal:', err);
          });
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      AppState.deferredInstallPrompt = e;
      const installBtn = document.getElementById('btnInstallPWA');
      if (installBtn) {
        installBtn.classList.remove('hidden');
      }
    });

    window.addEventListener('online', () => {
      AppState.isOnline = true;
      updateOnlineStatusUI(true);
      showToast("Kembali terhubung ke internet");
    });

    window.addEventListener('offline', () => {
      AppState.isOnline = false;
      updateOnlineStatusUI(false);
      showToast("Mode offline aktif (Aplikasi tetap dapat dibaca)");
    });

    updateOnlineStatusUI(navigator.onLine);
  }

  function updateOnlineStatusUI(isOnline) {
    const badge = document.getElementById('offlineBadge');
    if (!badge) return;
    if (isOnline) {
      badge.classList.add('hidden');
    } else {
      badge.classList.remove('hidden');
    }
  }

  function promptPWAInstall() {
    if (AppState.deferredInstallPrompt) {
      AppState.deferredInstallPrompt.prompt();
      AppState.deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          showToast("Terima kasih telah memasang Islami.co!");
        }
        AppState.deferredInstallPrompt = null;
        const installBtn = document.getElementById('btnInstallPWA');
        if (installBtn) installBtn.classList.add('hidden');
      });
    }
  }

  // ------------------------------------------------------------------------------
  // 3. ONBOARDING & LANGUAGE SWITCHER
  // ------------------------------------------------------------------------------
  function startGreetingAnimation() {
    const greetings = [
      { text: "Selamat Datang", sub: "Media Islam Ramah yang Mencerahkan" },
      { text: "Ahlan Wa Sahlan", sub: "أهلاً وسهلاً بكم في إسلامي" },
      { text: "Welcome", sub: "Enlightening and Friendly Islamic Media" },
      { text: "Salam Sejahtera", sub: "Kesejukan literasi keislaman Nusantara" }
    ];
    let idx = 0;
    const greetingEl = document.getElementById('onboardingGreeting');
    const subtitleEl = document.getElementById('onboardingSub');

    setInterval(() => {
      if (!greetingEl || !subtitleEl) return;
      idx = (idx + 1) % greetings.length;
      greetingEl.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => {
        greetingEl.textContent = greetings[idx].text;
        subtitleEl.textContent = greetings[idx].sub;
        greetingEl.classList.remove('opacity-0', 'translate-y-2');
      }, 250);
    }, 2800);
  }

  function selectLanguageFromOnboarding(lang) {
    AppState.currentLang = lang;
    localStorage.setItem('islami_preferred_lang', lang);
    localStorage.setItem('islami_onboarded_completed', 'true');

    const onboardingEl = document.getElementById('onboardingScreen');
    if (onboardingEl) {
      onboardingEl.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
      setTimeout(() => {
        onboardingEl.classList.add('hidden');
      }, 400);
    }

    applyLanguage(lang);
    showToast(lang === 'en' ? 'Language set to English' : (lang === 'ms' ? 'Bahasa ditukar ke Melayu' : 'Bahasa disetel ke Indonesia'));
  }

  function switchLanguage(lang) {
    AppState.currentLang = lang;
    localStorage.setItem('islami_preferred_lang', lang);
    applyLanguage(lang);
  }

  // ------------------------------------------------------------------------------
  // 4. JAM DIGITAL & HITUNG MUNDUR SHALAT REAL TIME
  // ------------------------------------------------------------------------------
  function startDigitalClock() {
    const clockEl = document.getElementById('digitalClock');
    const dateEl = document.getElementById('digitalDate');

    function update() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      if (clockEl) clockEl.textContent = `${hours}:${minutes}:${seconds} WIB`;

      if (dateEl && window.IslamiMockData) {
        dateEl.textContent = `${window.IslamiMockData.prayerSchedule.dateHijri}`;
      }
    }
    update();
    setInterval(update, 1000);
  }

  function startRealPrayerCountdown() {
    const timerEl = document.getElementById('prayerCountdownDisplay');
    const nextPrayerNameEl = document.getElementById('nextPrayerName');

    function updatePrayerTime() {
      if (!window.IslamiMockData) return;
      const times = window.IslamiMockData.prayerSchedule.times;
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let targetPrayer = null;
      let targetTotalSeconds = 0;

      for (let p of times) {
        const [h, m] = p.time.split(':').map(Number);
        const prayerMinutes = h * 60 + m;
        if (prayerMinutes > currentMinutes) {
          targetPrayer = p;
          targetTotalSeconds = (prayerMinutes * 60) - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
          break;
        }
      }

      if (!targetPrayer) {
        targetPrayer = times[0];
        const [h, m] = targetPrayer.time.split(':').map(Number);
        const subuhTomorrowSec = (24 * 3600) + (h * 3600 + m * 60);
        const currentSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        targetTotalSeconds = subuhTomorrowSec - currentSec;
      }

      if (nextPrayerNameEl) {
        nextPrayerNameEl.textContent = targetPrayer.name.toUpperCase();
      }

      const nextPrayerTimeEl = document.getElementById('nextPrayerTime');
      if (nextPrayerTimeEl) {
        nextPrayerTimeEl.textContent = `${targetPrayer.time} WIB`;
      }

      if (timerEl && targetTotalSeconds >= 0) {
        const hrs = Math.floor(targetTotalSeconds / 3600);
        const mins = Math.floor((targetTotalSeconds % 3600) / 60);
        const secs = targetTotalSeconds % 60;
        timerEl.textContent = `-${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }

      renderPrayerTimesGrid(targetPrayer.id);
    }

    updatePrayerTime();
    setInterval(updatePrayerTime, 1000);
  }

  function renderPrayerTimesGrid(activePrayerId) {
    const container = document.getElementById('prayerTimesRow');
    if (!container || !window.IslamiMockData) return;

    const times = window.IslamiMockData.prayerSchedule.times;
    container.innerHTML = times.map(p => {
      const isTarget = p.id === activePrayerId;
      return `
      <div class="px-2.5 py-1.5 rounded-xl text-center shrink-0 border transition ${isTarget
          ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-md scale-105'
          : 'bg-black/20 text-white/90 border-white/10'
        }">
        <span class="text-[9px] block opacity-85 uppercase font-medium">${p.name}</span>
        <span class="text-xs font-mono font-bold">${p.time}</span>
      </div>
    `;
    }).join('');
  }

  // ------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------
  // 5. TAB NAVIGATION & BACK BUTTON STACK
  // ------------------------------------------------------------------------------
  const TABS = ['home', 'quran', 'articles', 'calendar', 'settings', 'hadith', 'consultation', 'khutbah', 'doa', 'yasin', 'qibla', 'services', 'funeral', 'bookmarks'];

  let navigationHistory = ['home'];

  function switchTab(targetTab, pushHistory = true) {
    if (pushHistory && targetTab !== AppState.activeTab) {
      navigationHistory.push(targetTab);
    }
    AppState.activeTab = targetTab;

    // 1. Back button visibility di header
    const backBtn = document.getElementById('btnHeaderBack');
    if (backBtn) {
      if (targetTab === 'home') {
        backBtn.classList.add('hidden');
      } else {
        backBtn.classList.remove('hidden');
      }
    }

    // 2. Tampilkan view yang aktif dan sembunyikan yang lain
    TABS.forEach(t => {
      const viewEl = document.getElementById(`view-${t}`);
      if (viewEl) {
        if (t === targetTab) {
          viewEl.classList.remove('hidden');
          viewEl.classList.add('animate-fadeIn');
        } else {
          viewEl.classList.add('hidden');
        }
      }

      const navBtn = document.getElementById(`tab-${t}`);
      if (navBtn) {
        if (t === targetTab) {
          navBtn.classList.add('active');
          navBtn.classList.remove('text-stone-400', 'text-slate-400');
        } else {
          navBtn.classList.remove('active');
        }
      }
    });

    if (targetTab === 'quran') {
      if (typeof renderQuranSurahs === 'function') {
        renderQuranSurahs();
        renderQuranJuz();
        renderQuranRiwayat();
      }
    }

    if (targetTab === 'calendar') {
      if (typeof renderCalendar === 'function') {
        renderCalendar();
      }
    }

    if (targetTab === 'doa') {
      if (typeof renderDailyPlans === 'function') {
        renderDailyPlans();
      }
    }

    if (window.lucide) lucide.createIcons();

    const mainContent = document.getElementById('appMain');
    if (mainContent) mainContent.scrollTop = 0;
  }

  function navigateBack() {
    // Jika modal reader sedang terbuka, tutup dulu
    const readerModal = document.getElementById('readerModal');
    if (readerModal && !readerModal.classList.contains('hidden')) {
      closeReaderMode();
      return;
    }

    // Jika modal booking sedang terbuka, tutup dulu
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal && !bookingModal.classList.contains('hidden')) {
      closeBookingModal();
      return;
    }

    // Navigasi mundur sesuai history
    if (navigationHistory.length > 1) {
      navigationHistory.pop(); // buang tab saat ini
      const prevTab = navigationHistory[navigationHistory.length - 1] || 'home';
      switchTab(prevTab, false);
    } else {
      switchTab('home', false);
    }
  }

  function focusSearch() {
    const input = document.getElementById('homeSearchInput');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function clearHomeSearch() {
    const input = document.getElementById('homeSearchInput');
    const clearBtn = document.getElementById('btnHomeSearchClear');
    const resultsDropdown = document.getElementById('homeSearchResults');
    if (input) {
      input.value = '';
      input.focus();
    }
    if (clearBtn) clearBtn.classList.add('hidden');
    if (resultsDropdown) {
      resultsDropdown.innerHTML = '';
      resultsDropdown.classList.add('hidden');
    }
  }

  function startVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const input = document.getElementById('homeSearchInput');
    if (!SpeechRecognition) {
      showToast('Pencarian suara belum didukung peramban ini. Silakan ketik kata kunci.');
      if (input) input.focus();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = AppState.currentLang === 'en' ? 'en-US' : (AppState.currentLang === 'ms' ? 'ms-MY' : 'id-ID');
      recognition.interimResults = false;
      showToast('🎙️ Mendengarkan suara... Silakan ucapkan kata kunci');

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (input) {
          input.value = transcript;
          handleHomeSearch(transcript);
        }
      };
      recognition.onerror = () => {
        showToast('Tidak ada suara terdeteksi. Silakan coba lagi.');
      };
      recognition.start();
    } catch (e) {
      if (input) input.focus();
    }
  }

  function handleHomeSearch(query) {
    const clearBtn = document.getElementById('btnHomeSearchClear');
    const resultsDropdown = document.getElementById('homeSearchResults');
    if (!resultsDropdown) return;

    const q = (query || '').trim().toLowerCase();

    if (!q) {
      if (clearBtn) clearBtn.classList.add('hidden');
      resultsDropdown.innerHTML = '';
      resultsDropdown.classList.add('hidden');
      return;
    }

    if (clearBtn) clearBtn.classList.remove('hidden');

    const results = [];

    // A. Fitur & Layanan Utama
    const mainFeatures = [
      { title: "Praying Time (Jadwal Sholat)", desc: "Jadwal 5 waktu sholat & pengingat adzan", category: "Layanan", icon: "clock", action: "switchTab('calendar')" },
      { title: "Al-Qur'an 30 Juz", desc: "Baca mushaf lengkap & audio murottal", category: "Ibadah", icon: "book-open", action: "switchTab('quran')" },
      { title: "Hadits Nabawi", desc: "Kumpulan hadits shahih Bukhari, Muslim & Syarah", category: "Literasi", icon: "book-marked", action: "switchTab('hadith')" },
      { title: "Doa Harian & Zikir", desc: "Kumpulan doa harian mustajab & zikir nabawi", category: "Ibadah", icon: "heart-handshake", action: "switchTab('doa')" },
      { title: "Yasin & Tahlil", desc: "Teks bacaan surat Yasin, tahlil lengkap & doa arwah", category: "Ibadah", icon: "scroll", action: "switchTab('yasin')" },
      { title: "Direktori Masjid", desc: "Peta masjid terdekat, ramah & bersejarah", category: "Layanan", icon: "landmark", action: "openMasjidDirectory()" },
      { title: "Makam Ulama & Wali", desc: "Peta ziarah makam wali & habaib Nusantara", category: "Ziarah", icon: "map-pin", action: "openMakamDirectory()" },
      { title: "Cari Ustadz & Khotib", desc: "Layanan pemesanan khotib Jumat & ustadz kajian", category: "Layanan", icon: "mic", action: "switchTab('services')" },
      { title: "Tanggap Jenazah 24 Jam", desc: "Ambulan darurat, pemulasaraan & imam shalat jenazah", category: "Darurat", icon: "truck", action: "switchTab('funeral')" },
      { title: "Arah Kiblat (Kompas)", desc: "Penunjuk arah Ka'bah presisi real-time", category: "Ibadah", icon: "compass", action: "switchTab('qibla')" },
      { title: "Kalkulator Zakat Maal", desc: "Simulasi hitung nisab 85g emas & zakat 2.5%", category: "Finansial", icon: "coins", action: "openZakatFeature()" },
      { title: "Tasbih Digital", desc: "Penghitung zikir interaktif dengan getar haptic", category: "Ibadah", icon: "circle-dot", action: "openTasbihFeature()" },
      { title: "Maulid & Sholawat", desc: "Simtudduror, Ad-Diba'i & Qasidah Burdah", category: "Kitab", icon: "book", action: "openMaulidFeature()" }
    ];

    mainFeatures.forEach(f => {
      if (f.title.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)) {
        results.push({ ...f, type: 'feature' });
      }
    });

    // B. Surah Al-Qur'an (114 Surah) & Potongan Ayat
    if (window.quranData && window.quranData.surahs) {
      window.quranData.surahs.forEach(s => {
        const matchName = s.name.toLowerCase().includes(q);
        const matchMeaning = s.meaning.toLowerCase().includes(q);
        const matchNum = s.number.toString() === q;

        let matchedVerseSnippet = '';
        if (window.quranData.verses && window.quranData.verses[s.number]) {
          const foundV = window.quranData.verses[s.number].find(v =>
            v.translation.toLowerCase().includes(q) ||
            v.latin.toLowerCase().includes(q) ||
            v.arabic.includes(q)
          );
          if (foundV) {
            matchedVerseSnippet = 'Ayat ' + foundV.number + ': "' + foundV.translation.substring(0, 60) + '..."';
          }
        }

        if (matchName || matchMeaning || matchNum || matchedVerseSnippet) {
          results.push({
            title: 'Surah ' + s.name + ' (' + s.number + ')',
            desc: matchedVerseSnippet || (s.meaning + ' • ' + s.ayahs + ' Ayat • ' + s.type),
            category: "Al-Qur'an",
            icon: "book-open",
            action: "openQuranReader(" + s.number + ")"
          });
        }
      });
    }

    // C. Hadits
    if (window.IslamiMockData && window.IslamiMockData.hadith) {
      window.IslamiMockData.hadith.forEach(h => {
        const idStr = (h.id || '').toLowerCase();
        const narration = (h.narrator || h.perawi || '').toLowerCase();
        const text = (h.text || h.matan || h.content || '').toLowerCase();
        if (idStr.includes(q) || narration.includes(q) || text.includes(q)) {
          results.push({
            title: 'Hadits ' + (h.narrator || 'Shahih'),
            desc: text.substring(0, 65) + '...',
            category: "Hadits",
            icon: "book-marked",
            action: "switchTab('hadith')"
          });
        }
      });
    }

    // D. Artikel Islami.co
    if (window.IslamiMockData && window.IslamiMockData.articles) {
      window.IslamiMockData.articles.forEach(a => {
        if (a.title.toLowerCase().includes(q) || (a.summary || '').toLowerCase().includes(q)) {
          results.push({
            title: a.title,
            desc: a.category + ' • ' + a.author,
            category: "Artikel",
            icon: "newspaper",
            action: "openArticleModal('" + a.id + "')"
          });
        }
      });
    }

    // Render hasil
    if (results.length === 0) {
      resultsDropdown.innerHTML = `
      <div class="py-6 px-4 text-center">
        <i data-lucide="search-x" class="w-7 h-7 mx-auto mb-2 text-stone-400 opacity-60"></i>
        <p class="text-xs font-bold text-stone-700 dark:text-stone-300">Tidak ada hasil untuk "${query}"</p>
        <p class="text-[10.5px] text-stone-400 mt-1">Coba kata kunci: Al-Baqarah, ustadz, jenazah, zakat, doa, atau jadwal</p>
      </div>
    `;
    } else {
      const limited = results.slice(0, 8);
      resultsDropdown.innerHTML = `
      <div class="pb-1 px-1 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
        <span>Ditemukan ${results.length} hasil</span>
        <button onclick="clearHomeSearch()" class="hover:text-red-700 font-bold">Tutup</button>
      </div>
      <div class="space-y-1.5 pt-1">
        ${limited.map(r => `
          <div onclick="${r.action}; clearHomeSearch()"
            class="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 dark:hover:border-red-900 flex items-center justify-between gap-2.5 cursor-pointer transition group">
            <div class="flex items-center gap-2.5 flex-1 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-white dark:bg-stone-800 flex items-center justify-center text-[#8B1E1E] dark:text-amber-400 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <i data-lucide="${r.icon || 'search'}" class="w-4 h-4"></i>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5">
                  <h4 class="text-xs font-bold text-stone-900 dark:text-white truncate group-hover:text-[#8B1E1E] dark:group-hover:text-amber-300 transition">${r.title}</h4>
                  <span class="text-[8.5px] font-bold px-1.5 py-0.2 rounded-full bg-stone-200/70 dark:bg-stone-700 text-stone-600 dark:text-stone-300 shrink-0">${r.category}</span>
                </div>
                <p class="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">${r.desc}</p>
              </div>
            </div>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-stone-400 group-hover:text-[#8B1E1E] transition shrink-0"></i>
          </div>
        `).join('')}
      </div>
    `;
    }

    resultsDropdown.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  // Tutup dropdown pencarian beranda saat klik di luar
  document.addEventListener('click', (e) => {
    const container = document.getElementById('homeSearchContainer');
    const dropdown = document.getElementById('homeSearchResults');
    if (container && dropdown && !container.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });


  // ------------------------------------------------------------------------------
  // 6. RENDER ALL RICH FEATURES (CRIMSON RED BRANDING)
  // ------------------------------------------------------------------------------
  function renderAllFeatures() {
    renderArticles();
    renderQuran();
    if (typeof renderQuranSurahs === 'function') {
      renderQuranSurahs();
      renderQuranJuz();
      renderQuranRiwayat();
    }
    renderHadith();
    renderConsultations();
    renderKhutbah();
    renderDoa();
    renderScholars();
    renderFuneralServices();
    renderBookmarks();
    renderCalendar();
    renderSettings();
  }

  // 6a. Render Artikel & Kolom Editorial Islami.co
  function renderArticles() {
    const container = document.getElementById('articlesList');
    const homeArticles = document.getElementById('homeArticlesList');
    if (!window.IslamiMockData || !window.IslamiMockData.articles) return;

    const articles = window.IslamiMockData.articles;

    const html = articles.map(art => `
    <article class="card-islami p-3.5 space-y-2.5 cursor-pointer group hover:border-[#B91C1C] transition" onclick="openReaderMode('${art.id}')">
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span class="badge-editorial">${art.category}</span>
        <div class="flex items-center gap-1 font-medium text-[10px]">
          <span>${art.readTime}</span>
          <span>•</span>
          <span>${art.date}</span>
        </div>
      </div>

      <h3 class="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-[#B91C1C] dark:group-hover:text-red-400 transition">
        ${art.title}
      </h3>

      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
        ${art.summary}
      </p>

      <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-[#B91C1C] text-white flex items-center justify-center font-bold text-[10px]">
            ${art.author.charAt(0)}
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-slate-100 text-xs leading-none">${art.author}</p>
            <p class="text-[10px] text-slate-400 mt-0.5">${art.authorRole}</p>
          </div>
        </div>

        <button onclick="event.stopPropagation(); toggleBookmark('article', '${art.id}', '${encodeURIComponent(art.title)}')"
          class="p-1.5 rounded-lg text-slate-400 hover:text-[#B91C1C] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 transition" title="Simpan Artikel">
          <i data-lucide="${isBookmarked('article', art.id) ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked('article', art.id) ? 'text-[#B91C1C] fill-[#B91C1C]' : ''}"></i>
        </button>
      </div>
    </article>
  `).join('');

    if (container) container.innerHTML = html;

    if (window.lucide) lucide.createIcons();
  }

  function filterArticleCategory(category) {
    const container = document.getElementById('articlesList');
    if (!window.IslamiMockData || !window.IslamiMockData.articles || !container) return;

    // Update pills UI
    document.querySelectorAll('.art-filter-pill').forEach(btn => {
      if (btn.textContent.trim() === category) {
        btn.classList.add('bg-[#B91C1C]', 'text-white', 'shadow-sm', 'font-bold');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300', 'font-medium');
      } else {
        btn.classList.remove('bg-[#B91C1C]', 'text-white', 'shadow-sm', 'font-bold');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300', 'font-medium');
      }
    });

    const articles = window.IslamiMockData.articles;
    const filtered = category === 'Semua'
      ? articles
      : articles.filter(a => a.category.toLowerCase().includes(category.toLowerCase()));

    if (filtered.length === 0) {
      container.innerHTML = `
      <div class="card-islami p-6 text-center text-slate-400 text-xs">
        Belum ada artikel dalam kategori "${category}".
      </div>
    `;
      return;
    }

    container.innerHTML = filtered.map(art => `
    <article class="card-islami p-3.5 space-y-2.5 cursor-pointer group hover:border-[#B91C1C] transition" onclick="openReaderMode('${art.id}')">
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span class="badge-editorial">${art.category}</span>
        <div class="flex items-center gap-1 font-medium text-[10px]">
          <span>${art.readTime}</span>
          <span>•</span>
          <span>${art.date}</span>
        </div>
      </div>

      <h3 class="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-[#B91C1C] dark:group-hover:text-red-400 transition">
        ${art.title}
      </h3>

      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
        ${art.summary}
      </p>

      <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-[#B91C1C] text-white flex items-center justify-center font-bold text-[10px]">
            ${art.author.charAt(0)}
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-slate-100 text-xs leading-none">${art.author}</p>
            <p class="text-[10px] text-slate-400 mt-0.5">${art.authorRole}</p>
          </div>
        </div>

        <button onclick="event.stopPropagation(); toggleBookmark('article', '${art.id}', '${encodeURIComponent(art.title)}')"
          class="p-1.5 rounded-lg text-slate-400 hover:text-[#B91C1C] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 transition" title="Simpan Artikel">
          <i data-lucide="${isBookmarked('article', art.id) ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked('article', art.id) ? 'text-[#B91C1C] fill-[#B91C1C]' : ''}"></i>
        </button>
      </div>
    </article>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  function filterArticlesSearch() {
    const query = (document.getElementById('articleSearchInput').value || '').toLowerCase().trim();
    const container = document.getElementById('articlesList');
    if (!window.IslamiMockData || !window.IslamiMockData.articles || !container) return;

    const articles = window.IslamiMockData.articles;
    const filtered = articles.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query) ||
      a.author.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      container.innerHTML = `
      <div class="card-islami p-6 text-center text-slate-400 text-xs">
        Tidak ditemukan artikel untuk kata kunci "${query}".
      </div>
    `;
      return;
    }

    container.innerHTML = filtered.map(art => `
    <article class="card-islami p-3.5 space-y-2.5 cursor-pointer group hover:border-[#B91C1C] transition" onclick="openReaderMode('${art.id}')">
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span class="badge-editorial">${art.category}</span>
        <div class="flex items-center gap-1 font-medium text-[10px]">
          <span>${art.readTime}</span>
          <span>•</span>
          <span>${art.date}</span>
        </div>
      </div>

      <h3 class="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-[#B91C1C] dark:group-hover:text-red-400 transition">
        ${art.title}
      </h3>

      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
        ${art.summary}
      </p>

      <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-[#B91C1C] text-white flex items-center justify-center font-bold text-[10px]">
            ${art.author.charAt(0)}
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-slate-100 text-xs leading-none">${art.author}</p>
            <p class="text-[10px] text-slate-400 mt-0.5">${art.authorRole}</p>
          </div>
        </div>

        <button onclick="event.stopPropagation(); toggleBookmark('article', '${art.id}', '${encodeURIComponent(art.title)}')"
          class="p-1.5 rounded-lg text-slate-400 hover:text-[#B91C1C] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 transition" title="Simpan Artikel">
          <i data-lucide="${isBookmarked('article', art.id) ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked('article', art.id) ? 'text-[#B91C1C] fill-[#B91C1C]' : ''}"></i>
        </button>
      </div>
    </article>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  function resetReaderFontSize() {
    AppState.readerFontSize = 16;
    const body = document.getElementById('readerBody');
    if (body) body.style.fontSize = '16px';
    showToast("Ukuran teks disetel standar (16px)");
  }

  // 6b. Reader Mode Modal
  function openReaderMode(articleId) {
    if (!window.IslamiMockData || !window.IslamiMockData.articles) return;
    const article = window.IslamiMockData.articles.find(a => a.id === articleId);
    if (!article) return;

    const modal = document.getElementById('readerModal');
    const title = document.getElementById('readerTitle');
    const meta = document.getElementById('readerMeta');
    const body = document.getElementById('readerBody');

    if (title) title.textContent = article.title;
    if (meta) {
      meta.innerHTML = `
      <span class="badge-editorial">${article.category}</span>
      <span>Oleh <strong>${article.author}</strong> (${article.authorRole})</span>
      <span>•</span>
      <span>${article.date}</span>
      <span>•</span>
      <span>${article.readTime}</span>
    `;
    }
    if (body) {
      body.style.fontSize = `${AppState.readerFontSize}px`;
      body.innerHTML = article.content;
    }

    if (modal) modal.classList.remove('hidden');
  }

  function closeReaderMode() {
    const modal = document.getElementById('readerModal');
    if (modal) modal.classList.add('hidden');
  }

  function adjustReaderFontSize(delta) {
    AppState.readerFontSize = Math.min(22, Math.max(12, AppState.readerFontSize + delta));
    const body = document.getElementById('readerBody');
    if (body) {
      body.style.fontSize = `${AppState.readerFontSize}px`;
    }
  }

  // 6c. Render Al-Qur'an
  function renderQuran(filter = '') {
    const container = document.getElementById('quranList');
    if (!container || !window.IslamiMockData) return;

    const currentLang = AppState.currentLang;
    const list = window.IslamiMockData.quran || [];
    const search = filter.toLowerCase().trim();

    const filtered = list.filter(item => {
      const surah = item.surahName.toLowerCase();
      const textTrans = (item.translations[currentLang] || '').toLowerCase();
      const latin = (item.latin || '').toLowerCase();
      const arabic = item.arabic || '';
      return surah.includes(search) || textTrans.includes(search) || latin.includes(search) || arabic.includes(search);
    });

    if (filtered.length === 0) {
      container.innerHTML = `
      <div class="card-islami p-6 text-center">
        <i data-lucide="search-x" class="w-8 h-8 text-red-600 mx-auto mb-2 opacity-60"></i>
        <p class="text-slate-900 dark:text-white font-semibold text-sm">Ayat tidak ditemukan</p>
      </div>
    `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(item => `
    <div class="card-islami p-3.5 space-y-2.5">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 flex items-center justify-center text-xs font-bold font-mono">
            ${item.verseNumber}
          </span>
          <div>
            <span class="text-xs font-bold text-slate-900 dark:text-white">QS. ${item.surahName}</span>
            <span class="text-[10px] text-red-600 dark:text-red-400 ml-1">• Juz ${item.juz}</span>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button onclick="playQuranAudio('${item.audio}', ${item.id}, 'QS. ${item.surahName}: ${item.verseNumber}')" id="audio-btn-${item.id}"
            class="px-2 py-0.5 rounded-lg bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900 text-red-700 dark:text-red-300 text-[10px] font-semibold flex items-center gap-1 transition">
            <i data-lucide="volume-2" class="w-3 h-3"></i>
            <span id="audio-label-${item.id}">Murottal</span>
          </button>
          
          <button onclick="toggleBookmark('quran', '${item.id}', 'QS. ${item.surahName}: ${item.verseNumber}')"
            class="p-1 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <i data-lucide="${isBookmarked('quran', item.id) ? 'bookmark-check' : 'bookmark'}" class="w-3.5 h-3.5 ${isBookmarked('quran', item.id) ? 'text-red-600 fill-red-600' : ''}"></i>
          </button>

          <button onclick="copyToClipboard('${item.arabic} - QS. ${item.surahName}: ${item.verseNumber}')"
            class="p-1 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition" title="Salin">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <p class="text-right font-arabic text-xl text-slate-900 dark:text-slate-100 leading-[2.2] select-all pt-1">
        ${item.arabic}
      </p>

      <p class="text-[11px] text-red-800 dark:text-red-400 italic">
        ${item.latin}
      </p>

      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1.5 border-t border-slate-100 dark:border-slate-800">
        ${item.translations[currentLang] || item.translations.id}
      </p>
    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  function filterQuran() {
    const val = document.getElementById('quranSearchInput').value;
    renderQuran(val);
  }

  // 6d. Floating Audio Player
  function playQuranAudio(url, id, title = 'Ayat Al-Qur\'an') {
    const floatingBar = document.getElementById('floatingAudioPlayer');
    const floatingTitle = document.getElementById('floatingAudioTitle');

    if (AppState.activeAudio && AppState.activeAudioId === id) {
      if (!AppState.activeAudio.paused) {
        AppState.activeAudio.pause();
        updateAudioButton(id, false);
        updateFloatingPlayIcon(false);
        return;
      } else {
        AppState.activeAudio.play();
        updateAudioButton(id, true);
        updateFloatingPlayIcon(true);
        return;
      }
    }

    if (AppState.activeAudio) {
      AppState.activeAudio.pause();
      updateAudioButton(AppState.activeAudioId, false);
    }

    const audio = new Audio(url);
    AppState.activeAudio = audio;
    AppState.activeAudioId = id;
    AppState.activeAudioTitle = title;

    updateAudioButton(id, true);

    if (floatingBar) floatingBar.classList.remove('hidden');
    if (floatingTitle) floatingTitle.textContent = title;
    updateFloatingPlayIcon(true);

    audio.play().catch(e => {
      console.warn("Autoplay restriction:", e);
      showToast("Klik tombol lagi untuk memutar audio");
      updateAudioButton(id, false);
      updateFloatingPlayIcon(false);
    });

    audio.onended = () => {
      updateAudioButton(id, false);
      updateFloatingPlayIcon(false);
      if (floatingBar) floatingBar.classList.add('hidden');
    };
  }

  function toggleFloatingAudio() {
    if (!AppState.activeAudio) return;
    if (AppState.activeAudio.paused) {
      AppState.activeAudio.play();
      updateAudioButton(AppState.activeAudioId, true);
      updateFloatingPlayIcon(true);
    } else {
      AppState.activeAudio.pause();
      updateAudioButton(AppState.activeAudioId, false);
      updateFloatingPlayIcon(false);
    }
  }

  function closeFloatingAudio() {
    if (AppState.activeAudio) {
      AppState.activeAudio.pause();
      updateAudioButton(AppState.activeAudioId, false);
      AppState.activeAudio = null;
      AppState.activeAudioId = null;
    }
    const floatingBar = document.getElementById('floatingAudioPlayer');
    if (floatingBar) floatingBar.classList.add('hidden');
  }

  function updateFloatingPlayIcon(isPlaying) {
    const btn = document.getElementById('floatingPlayBtn');
    if (!btn) return;
    btn.innerHTML = `<i data-lucide="${isPlaying ? 'pause' : 'play'}" class="w-4 h-4"></i>`;
    if (window.lucide) lucide.createIcons();
  }

  function updateAudioButton(id, isPlaying) {
    const btnLabel = document.getElementById(`audio-label-${id}`);
    const btn = document.getElementById(`audio-btn-${id}`);
    if (!btn || !btnLabel) return;

    if (isPlaying) {
      btn.className = "px-2 py-0.5 rounded-lg bg-[#B91C1C] text-white text-[10px] font-bold flex items-center gap-1 shadow-sm";
      btnLabel.textContent = "Pause";
    } else {
      btn.className = "px-2 py-0.5 rounded-lg bg-red-50 dark:bg-red-950/50 hover:bg-red-100 text-red-700 dark:text-red-300 text-[10px] font-semibold flex items-center gap-1 transition";
      btnLabel.textContent = "Murottal";
    }
  }

  // 6e. Render Tanya Jawab Syariah
  function renderConsultations() {
    const container = document.getElementById('consultationList');
    if (!container || !window.IslamiMockData || !window.IslamiMockData.consultations) return;

    const faqs = window.IslamiMockData.consultations;
    container.innerHTML = faqs.map(f => `
    <div class="card-islami p-3.5 space-y-2">
      <div class="flex items-center justify-between">
        <span class="badge-editorial">${f.category}</span>
        <span class="text-[10px] text-slate-400">Tanya Jawab</span>
      </div>
      <h4 class="font-bold text-xs text-slate-900 dark:text-white leading-snug">
        ${f.question}
      </h4>
      <div class="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p class="font-bold text-red-700 dark:text-red-400 text-[10px] mb-1">
          Dijawab oleh: ${f.answeredBy}
        </p>
        <p>${f.answer}</p>
      </div>
    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // 6f. Render Khutbah Jumat
  function renderKhutbah() {
    const container = document.getElementById('khutbahList');
    if (!container || !window.IslamiMockData || !window.IslamiMockData.khutbahList) return;

    const list = window.IslamiMockData.khutbahList;
    container.innerHTML = list.map(k => `
    <div class="card-islami p-3.5 space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="badge-editorial">Khutbah Jumat</span>
        <span class="text-[10px] text-red-600 dark:text-red-400 font-bold">${k.duration}</span>
      </div>
      <h4 class="font-bold text-sm text-slate-900 dark:text-white">${k.title}</h4>
      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${k.summary}</p>
      <div class="p-3 bg-red-50/50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-200 leading-relaxed border border-red-100 dark:border-slate-700 font-serif">
        ${k.content}
      </div>
      <button onclick="copyToClipboard('${k.title}\\n\\n${k.content}')"
        class="w-full py-1.5 rounded-xl bg-red-50 dark:bg-red-950/50 hover:bg-red-100 text-red-700 dark:text-red-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-red-200 dark:border-red-900">
        <i data-lucide="copy" class="w-3.5 h-3.5"></i> Salin Naskah Khutbah
      </button>
    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // 6g. Render Hadits
  function renderHadith(filter = '') {
    const container = document.getElementById('hadithList');
    if (!container || !window.IslamiMockData) return;

    const currentLang = AppState.currentLang;
    const list = window.IslamiMockData.hadith || [];
    const search = filter.toLowerCase().trim();

    const filtered = list.filter(h => {
      const narrator = h.narrator.toLowerCase();
      const topic = h.topic.toLowerCase();
      const text = (h.translations[currentLang] || '').toLowerCase();
      return narrator.includes(search) || topic.includes(search) || text.includes(search);
    });

    if (filtered.length === 0) {
      container.innerHTML = `
      <div class="card-islami p-6 text-center">
        <i data-lucide="search-x" class="w-8 h-8 text-red-600 mx-auto mb-2 opacity-60"></i>
        <p class="text-slate-900 dark:text-white font-semibold text-sm">Hadist tidak ditemukan</p>
      </div>
    `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(item => `
    <div class="card-islami p-3.5 space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900">
          HR. ${item.narrator}
        </span>
        <span class="text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-semibold">
          ${item.grade}
        </span>
      </div>

      <h4 class="font-bold text-xs text-slate-900 dark:text-white tracking-wide">${item.topic}</h4>

      <p class="text-right font-arabic text-xl text-slate-900 dark:text-slate-100 leading-relaxed pt-1">
        ${item.arabic}
      </p>

      <p class="text-[11px] text-red-800 dark:text-red-400 italic">
        ${item.latin}
      </p>

      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-1.5">
        "${item.translations[currentLang] || item.translations.id}"
      </p>
    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  function filterHadith() {
    const val = document.getElementById('hadithSearchInput').value;
    renderHadith(val);
  }

// ==============================================================================
// 6h. DOA & AMALAN SEHARIAN (DAILY PLAN & DAILY REPORT ENGINE)
// ==============================================================================

function initDailyPlans() {
  const version = localStorage.getItem('islami_daily_plans_version');
  const existing = localStorage.getItem('islami_daily_plans');
  if (!existing || existing === '[]' || version !== 'v4') {
    const defaults = (window.IslamiMockData && window.IslamiMockData.defaultDailyRoutines) ? window.IslamiMockData.defaultDailyRoutines : [];
    localStorage.setItem('islami_daily_plans', JSON.stringify(defaults));
    localStorage.setItem('islami_daily_plans_version', 'v4');
    return defaults;
  }
  try {
    const parsed = JSON.parse(existing);
    if (!Array.isArray(parsed) || parsed.length < 14) {
      const defaults = (window.IslamiMockData && window.IslamiMockData.defaultDailyRoutines) ? window.IslamiMockData.defaultDailyRoutines : [];
      localStorage.setItem('islami_daily_plans', JSON.stringify(defaults));
      localStorage.setItem('islami_daily_plans_version', 'v3');
      return defaults;
    }
    return parsed;
  } catch (e) {
    const defaults = (window.IslamiMockData && window.IslamiMockData.defaultDailyRoutines) ? window.IslamiMockData.defaultDailyRoutines : [];
    localStorage.setItem('islami_daily_plans', JSON.stringify(defaults));
    localStorage.setItem('islami_daily_plans_version', 'v3');
    return defaults;
  }
}

function getDailyPlans() {
  const existing = localStorage.getItem('islami_daily_plans');
  if (!existing) return initDailyPlans();
  try {
    const parsed = JSON.parse(existing);
    if (!Array.isArray(parsed) || parsed.length === 0) return initDailyPlans();
    return parsed;
  } catch (e) {
    return initDailyPlans();
  }
}

function saveDailyPlans(plans) {
  localStorage.setItem('islami_daily_plans', JSON.stringify(plans));
}

function toggleDailyPlan(id) {
  const plans = getDailyPlans();
  const target = plans.find(p => p.id === id);
  if (target) {
    target.completed = !target.completed;
    saveDailyPlans(plans);
    renderDailyPlans();
    renderHomeDailyReportCard();
  }
}

function renderHomeDailyReportCard() {
  const plans = getDailyPlans();
  const total = plans.length;
  const completed = plans.filter(p => p.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const lang = AppState.currentLang || 'id';

  const badgeEl = document.getElementById('homeDailyReportPercentBadge');
  if (badgeEl) badgeEl.textContent = `${percent}%`;

  const barEl = document.getElementById('homeDailyReportProgressBar');
  if (barEl) barEl.style.width = `${percent}%`;

  const textEl = document.getElementById('homeDailyReportText');
  if (textEl) {
    if (lang === 'en') {
      textEl.textContent = `${completed} of ${total} Routines Completed • ${percent}%`;
    } else if (lang === 'ms') {
      textEl.textContent = `${completed} daripada ${total} Amalan Terlaksana • ${percent}%`;
    } else {
      textEl.textContent = `${completed} dari ${total} Amalan Terlaksana • ${percent}%`;
    }
  }

  // Active routine snippet preview
  const activePlan = plans.find(p => !p.completed) || plans[0];
  const titleEl = document.getElementById('homeDailyActiveTitle');
  const duaEl = document.getElementById('homeDailyActiveDua');
  if (activePlan) {
    const title = typeof activePlan.title === 'object' ? (activePlan.title[lang] || activePlan.title.id) : activePlan.title;
    const snippet = activePlan.latin || (typeof activePlan.translation === 'object' ? (activePlan.translation[lang] || activePlan.translation.id) : activePlan.translation) || activePlan.time;
    if (titleEl) titleEl.textContent = title;
    if (duaEl) duaEl.textContent = snippet;
  }
}

function renderDailyPlans() {
  const container = document.getElementById('dailyPlansListContainer');
  if (!container) return;

  const plans = getDailyPlans();
  const total = plans.length;
  const completed = plans.filter(p => p.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const lang = AppState.currentLang || 'id';

  // Update Daily Report Header Card
  const badgeEl = document.getElementById('viewDoaPercentBadge');
  if (badgeEl) badgeEl.textContent = `${percent}%`;

  const statsEl = document.getElementById('viewDoaReportStats');
  if (statsEl) {
    if (lang === 'en') {
      statsEl.textContent = `${completed} of ${total} Routines Completed • ${percent}%`;
    } else if (lang === 'ms') {
      statsEl.textContent = `${completed} daripada ${total} Amalan Terlaksana • ${percent}%`;
    } else {
      statsEl.textContent = `${completed} dari ${total} Amalan Terlaksana • ${percent}%`;
    }
  }

  const progressBar = document.getElementById('viewDoaProgressBar');
  if (progressBar) progressBar.style.width = `${percent}%`;

  const catNames = {
    sholat: { id: "Sholat & Niat", en: "Prayers & Intentions", ms: "Solat & Niat" },
    subuh: { id: "Bangun & Subuh", en: "Wake & Fajr", ms: "Bangun & Subuh" },
    dhuha: { id: "Dhuha & Pagi", en: "Duha & Morning", ms: "Dhuha & Pagi" },
    amal: { id: "Amal & Jariyah", en: "Charity & Jariyah", ms: "Amal & Jariah" },
    malam: { id: "Malam & Tidur", en: "Night & Sleep", ms: "Malam & Tidur" }
  };
  const catColors = {
    sholat: 'bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900',
    subuh: 'bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900',
    dhuha: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
    amal: 'bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900',
    malam: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900'
  };

  const activeCategory = AppState.dailyPlanCategory || 'all';
  const keyword = (AppState.dailyPlanKeyword || '').toLowerCase().trim();

  const filtered = plans.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    if (!matchesCat) return false;
    if (!keyword) return true;

    const t = typeof p.title === 'object' ? `${p.title.id} ${p.title.en} ${p.title.ms}`.toLowerCase() : (p.title || '').toLowerCase();
    const tr = typeof p.translation === 'object' ? `${p.translation.id} ${p.translation.en} ${p.translation.ms}`.toLowerCase() : (p.translation || '').toLowerCase();
    const l = (p.latin || '').toLowerCase();
    return t.includes(keyword) || tr.includes(keyword) || l.includes(keyword);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 card-islami p-6 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl">
        <p class="text-xs text-stone-500 dark:text-stone-400">${lang === 'en' ? 'No routines found for this category or search.' : (lang === 'ms' ? 'Tiada amalan dijumpai untuk kategori ini.' : 'Belum ada rencana amalan di kategori ini.')}</p>
        <button onclick="openAddDailyPlanModal()" class="mt-3 px-3.5 py-1.5 rounded-full bg-[#8B1E1E] text-white text-xs font-bold inline-flex items-center gap-1 shadow-xs">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> ${lang === 'en' ? 'Add Routine' : (lang === 'ms' ? 'Tambah Amalan' : 'Tambah Rencana')}
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(plan => {
    const localizedTitle = typeof plan.title === 'object' ? (plan.title[lang] || plan.title.id) : plan.title;
    const localizedTranslation = typeof plan.translation === 'object' ? (plan.translation[lang] || plan.translation.id) : plan.translation;
    const catLabel = catNames[plan.category] ? (catNames[plan.category][lang] || catNames[plan.category].id) : plan.category;
    const badgeColor = catColors[plan.category] || 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700';
    const hasDua = Boolean(plan.arabic || plan.latin || localizedTranslation);

    return `
      <div class="card-islami p-3.5 space-y-2.5 transition border ${plan.completed ? 'border-emerald-300/80 dark:border-emerald-800/60 bg-emerald-50/20 dark:bg-emerald-950/20' : 'border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900'}">
        <div class="flex items-start justify-between gap-2.5">
          <div class="flex items-start gap-2.5 min-w-0 flex-1">
            <button onclick="toggleDailyPlan('${plan.id}')" aria-label="Tandai selesai" class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition cursor-pointer ${plan.completed ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' : 'border-stone-300 dark:border-stone-600 hover:border-[#8B1E1E] bg-stone-50 dark:bg-stone-800 text-transparent'}">
              <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3] ${plan.completed ? 'opacity-100' : 'opacity-0'}"></i>
            </button>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-1.5 mb-1">
                <span class="text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}">
                  ${catLabel}
                </span>
                <span class="text-[9.5px] font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <i data-lucide="clock" class="w-2.5 h-2.5"></i> ${plan.time}
                </span>
              </div>
              <h4 class="text-xs font-bold ${plan.completed ? 'line-through text-stone-400 dark:text-stone-500' : 'text-stone-900 dark:text-white'} leading-tight">
                ${localizedTitle}
              </h4>
            </div>
          </div>

          <div class="flex items-center gap-0.5 shrink-0">
            <button onclick="openEditDailyPlanModal('${plan.id}')" class="w-7 h-7 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition" title="Edit Rencana">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="deleteDailyPlan('${plan.id}')" class="w-7 h-7 rounded-lg text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 flex items-center justify-center transition" title="Hapus Rencana">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        ${hasDua ? `
          <div class="pt-2 border-t border-stone-100 dark:border-stone-800/80">
            <button onclick="toggleDailyDuaDetails('${plan.id}')" class="w-full flex items-center justify-between text-[11px] font-semibold text-[#8B1E1E] dark:text-amber-400 hover:opacity-80 transition py-0.5">
              <span class="flex items-center gap-1.5">
                <i data-lucide="book-open" class="w-3 h-3"></i>
                <span>${plan.category === 'sholat' || plan.niat ? (lang === 'en' ? 'Prayer Intention & After-Prayer Dhikr' : (lang === 'ms' ? 'Lafaz Niat & Zikir Selepas Solat' : 'Lafal Niat & Dzikir Ba\'da Sholat')) : (lang === 'en' ? 'Related Prayer & Dhikr' : (lang === 'ms' ? 'Doa Berkaitan & Zikir' : 'Teks Doa & Zikir'))}</span>
              </span>
              <i data-lucide="chevron-down" id="duaChevron-${plan.id}" class="w-3.5 h-3.5 transition-transform duration-200"></i>
            </button>
            
            <div id="duaDetails-${plan.id}" class="hidden mt-2 space-y-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
              ${plan.niat ? `
                <!-- 1. Lafal Niat Sholat -->
                <div class="space-y-1 pb-2 border-b border-stone-200/60 dark:border-stone-700/60">
                  <span class="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 inline-block">
                    ${lang === 'en' ? '1. Prayer Intention (Niyyah)' : (lang === 'ms' ? '1. Lafaz Niat Solat' : '1. Lafal Niat Sholat')}
                  </span>
                  <p class="font-arabic text-base text-right leading-relaxed text-stone-900 dark:text-stone-100 pt-0.5">${plan.niat.arabic}</p>
                  <p class="text-[10.5px] italic text-[#8B1E1E] dark:text-amber-400 leading-snug">${plan.niat.latin}</p>
                  <p class="text-[11px] text-stone-600 dark:text-stone-300 leading-snug"><strong class="text-[#8B1E1E] dark:text-amber-400">${lang === 'en' ? 'Meaning:' : (lang === 'ms' ? 'Maksud:' : 'Artinya:')}</strong> "${plan.niat.meaning}"</p>
                </div>
              ` : ''}

              ${plan.dzikir ? `
                <!-- 2. Doa & Dzikir Setelah Sholat -->
                <div class="space-y-1 pt-0.5">
                  <span class="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 inline-block">
                    ${lang === 'en' ? '2. After-Prayer Dhikr & Supplication' : (lang === 'ms' ? '2. Zikir & Doa Selepas Solat' : '2. Bacaan Doa & Dzikir Setelah Sholat')}
                  </span>
                  <p class="font-arabic text-base text-right leading-relaxed text-stone-900 dark:text-stone-100 pt-0.5">${plan.dzikir.arabic}</p>
                  <p class="text-[10.5px] italic text-[#8B1E1E] dark:text-amber-400 leading-snug">${plan.dzikir.latin}</p>
                  <p class="text-[11px] text-stone-600 dark:text-stone-300 leading-snug"><strong class="text-[#8B1E1E] dark:text-amber-400">${lang === 'en' ? 'Meaning:' : (lang === 'ms' ? 'Maksud:' : 'Artinya:')}</strong> "${plan.dzikir.meaning}"</p>
                </div>
              ` : ''}

              ${!plan.niat && !plan.dzikir ? `
                ${plan.arabic ? `<p class="font-arabic text-base text-right leading-relaxed text-stone-900 dark:text-stone-100 pt-1">${plan.arabic}</p>` : ''}
                ${plan.latin ? `<p class="text-[10.5px] italic text-[#8B1E1E] dark:text-amber-400 leading-snug">${plan.latin}</p>` : ''}
                ${localizedTranslation ? `<p class="text-[11px] text-stone-600 dark:text-stone-300 leading-snug"><strong class="text-[#8B1E1E] dark:text-amber-400">${lang === 'en' ? 'Translation:' : (lang === 'ms' ? 'Terjemahan:' : 'Artinya:')}</strong> ${localizedTranslation}</p>` : ''}
              ` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function renderDoa(filter = '') {
  renderDailyPlans();
}

function filterDailyPlansByCategory(category) {
  AppState.dailyPlanCategory = category;
  ['all', 'sholat', 'subuh', 'dhuha', 'amal', 'malam'].forEach(c => {
    const btn = document.getElementById(`btnFilterCat-${c}`);
    if (btn) {
      if (c === category) {
        btn.className = "px-3 py-1.5 rounded-full text-xs font-bold bg-[#8B1E1E] text-white transition shadow-2xs shrink-0";
      } else {
        btn.className = "px-3 py-1.5 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition shrink-0";
      }
    }
  });
  renderDailyPlans();
}

function filterDailyPlansByKeyword(keyword) {
  AppState.dailyPlanKeyword = keyword || '';
  renderDailyPlans();
}

function toggleDailyDuaDetails(id) {
  const details = document.getElementById(`duaDetails-${id}`);
  const chevron = document.getElementById(`duaChevron-${id}`);
  if (!details) return;
  const isHidden = details.classList.contains('hidden');
  if (isHidden) {
    details.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    details.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

function openAddDailyPlanModal() {
  const modal = document.getElementById('modalDailyPlanForm');
  if (!modal) return;
  document.getElementById('inputPlanId').value = '';
  document.getElementById('inputPlanTitle').value = '';
  document.getElementById('inputPlanCategory').value = 'subuh';
  document.getElementById('inputPlanTime').value = '05:00 WIB';
  document.getElementById('inputPlanArabic').value = '';
  document.getElementById('inputPlanTranslation').value = '';

  const titleEl = document.getElementById('dailyPlanModalTitle');
  const dict = window.IslamiTranslations ? (window.IslamiTranslations[AppState.currentLang || 'id'] || window.IslamiTranslations['id']) : null;
  if (titleEl && dict && dict.modal_plan_title) {
    titleEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-[#801818]"></span><span>${dict.modal_plan_title}</span>`;
  }
  modal.classList.remove('hidden');
}

function openEditDailyPlanModal(id) {
  const plans = getDailyPlans();
  const plan = plans.find(p => p.id === id);
  if (!plan) return;

  const modal = document.getElementById('modalDailyPlanForm');
  if (!modal) return;

  const lang = AppState.currentLang || 'id';
  document.getElementById('inputPlanId').value = plan.id;
  document.getElementById('inputPlanTitle').value = typeof plan.title === 'object' ? (plan.title[lang] || plan.title.id) : plan.title;
  document.getElementById('inputPlanCategory').value = plan.category;
  document.getElementById('inputPlanTime').value = plan.time;
  document.getElementById('inputPlanArabic').value = plan.arabic || '';
  document.getElementById('inputPlanTranslation').value = typeof plan.translation === 'object' ? (plan.translation[lang] || plan.translation.id) : (plan.translation || '');

  const titleEl = document.getElementById('dailyPlanModalTitle');
  const dict = window.IslamiTranslations ? (window.IslamiTranslations[AppState.currentLang || 'id'] || window.IslamiTranslations['id']) : null;
  if (titleEl && dict && dict.modal_plan_edit_title) {
    titleEl.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-[#801818]"></span><span>${dict.modal_plan_edit_title}</span>`;
  }
  modal.classList.remove('hidden');
}

function closeDailyPlanModal() {
  const modal = document.getElementById('modalDailyPlanForm');
  if (modal) modal.classList.add('hidden');
}

function saveDailyPlan() {
  const title = document.getElementById('inputPlanTitle').value.trim();
  if (!title) {
    showToast(AppState.currentLang === 'en' ? 'Please enter activity name' : 'Mohon masukkan nama kegiatan amalan');
    return;
  }

  const id = document.getElementById('inputPlanId').value;
  const category = document.getElementById('inputPlanCategory').value;
  const time = document.getElementById('inputPlanTime').value.trim() || '05:00 WIB';
  const arabic = document.getElementById('inputPlanArabic').value.trim();
  const translation = document.getElementById('inputPlanTranslation').value.trim();

  let plans = getDailyPlans();
  if (id) {
    const idx = plans.findIndex(p => p.id === id);
    if (idx !== -1) {
      const existing = plans[idx];
      plans[idx] = {
        ...existing,
        title: typeof existing.title === 'object' ? { ...existing.title, [AppState.currentLang || 'id']: title } : title,
        category,
        time,
        arabic,
        translation: typeof existing.translation === 'object' ? { ...existing.translation, [AppState.currentLang || 'id']: translation } : translation
      };
    }
  } else {
    const newPlan = {
      id: 'routine-' + Date.now(),
      title: title,
      category,
      time,
      arabic,
      latin: '',
      translation: translation,
      completed: false
    };
    plans.push(newPlan);
  }

  saveDailyPlans(plans);
  closeDailyPlanModal();
  renderDailyPlans();
  renderHomeDailyReportCard();
  showToast(AppState.currentLang === 'en' ? 'Routine saved successfully!' : (AppState.currentLang === 'ms' ? 'Amalan berjaya disimpan!' : 'Rencana amalan berhasil disimpan!'));
}

function deleteDailyPlan(id) {
  const lang = AppState.currentLang || 'id';
  const msg = lang === 'en' ? 'Delete this routine?' : (lang === 'ms' ? 'Padam amalan ini?' : 'Hapus rencana amalan ini?');
  if (!confirm(msg)) return;

  let plans = getDailyPlans();
  plans = plans.filter(p => p.id !== id);
  saveDailyPlans(plans);
  renderDailyPlans();
  renderHomeDailyReportCard();
  showToast(lang === 'en' ? 'Routine deleted' : (lang === 'ms' ? 'Amalan dipadam' : 'Rencana amalan dihapus'));
}

  // 6i. Render Cari Ustadz
  function renderScholars() {
    const container = document.getElementById('scholarsList');
    if (!container || !window.IslamiMockData) return;

    const list = window.IslamiMockData.scholars || [];
    container.innerHTML = list.map(s => `
    <div class="card-islami p-3.5 space-y-2.5">
      <div class="flex items-start gap-2.5">
        <div class="w-10 h-10 rounded-2xl bg-[#B91C1C] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
          ${s.name.substring(0, 2)}
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-xs text-slate-900 dark:text-white">${s.name}</h4>
          <p class="text-[11px] text-red-700 dark:text-red-400 font-medium">${s.institution}</p>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="inline-flex items-center text-xs text-amber-500 font-bold">
              ★ ${s.rating}
            </span>
            <span class="text-[10px] text-slate-400">(${s.reviewsCount} review)</span>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl border border-slate-200 dark:border-slate-800 space-y-0.5 text-xs">
        <p class="text-slate-700 dark:text-slate-300"><strong class="text-red-700 dark:text-red-400">Spesialisasi:</strong> ${s.expertise}</p>
        <p class="text-slate-500 text-[10px]">${s.city} • ${s.experience}</p>
      </div>

      <div class="flex items-center justify-between pt-1">
        <span class="text-[10px] px-2 py-0.5 rounded-full border border-red-200 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 font-medium">
          ● ${s.status}
        </span>
        <button onclick="openBookingModal('${s.name}')"
          class="px-3 py-1 rounded-xl bg-[#B91C1C] hover:bg-red-800 text-white text-xs font-bold transition shadow-sm">
          Undang
        </button>
      </div>
    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // 6j. Render Layanan Tanggap Jenazah
  function renderFuneralServices() {
    const container = document.getElementById('funeralServicesList');
    if (!container || !window.IslamiMockData) return;

    const data = window.IslamiMockData.funeralServices;
    container.innerHTML = data.servicesList.map(srv => `
    <div class="card-islami p-3 flex items-start gap-2.5">
      <div class="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 flex items-center justify-center shrink-0">
        <i data-lucide="${srv.icon}" class="w-4 h-4"></i>
      </div>
      <div>
        <h4 class="font-bold text-xs text-slate-900 dark:text-white">${srv.title}</h4>
        <p class="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">${srv.desc}</p>
        <span class="inline-block mt-1 text-[9px] bg-slate-100 dark:bg-slate-800 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 font-semibold">
          ${srv.coverage}
        </span>
      </div>
    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // ------------------------------------------------------------------------------
  // 7. BOOKMARKS SYSTEM
  // ------------------------------------------------------------------------------
  function isBookmarked(type, id) {
    return AppState.bookmarks.some(b => b.type === type && String(b.id) === String(id));
  }

  function toggleBookmark(type, id, title) {
    const decodedTitle = decodeURIComponent(title);
    const existsIdx = AppState.bookmarks.findIndex(b => b.type === type && String(b.id) === String(id));

    if (existsIdx > -1) {
      AppState.bookmarks.splice(existsIdx, 1);
      showToast(`Dihapus dari bookmark`);
    } else {
      AppState.bookmarks.push({ type, id, title: decodedTitle, date: new Date().toLocaleDateString('id-ID') });
      showToast(`Tersimpan ke bookmark`);
    }

    localStorage.setItem('islami_bookmarks', JSON.stringify(AppState.bookmarks));
    renderAllFeatures();
  }

  function renderBookmarks() {
    const container = document.getElementById('bookmarksList');
    if (!container) return;

    if (AppState.bookmarks.length === 0) {
      container.innerHTML = `
      <div class="card-islami p-6 text-center">
        <i data-lucide="bookmark" class="w-8 h-8 text-red-600 mx-auto mb-2 opacity-50"></i>
        <p class="text-slate-900 dark:text-white font-semibold text-sm">Belum ada item tersimpan</p>
        <p class="text-slate-500 text-xs mt-1">Tekan ikon bookmark pada artikel atau ayat Al-Qur'an untuk membacanya nanti.</p>
      </div>
    `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = AppState.bookmarks.map(b => `
    <div class="card-islami p-3 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 flex items-center justify-center shrink-0">
          <i data-lucide="${b.type === 'quran' ? 'book-open' : 'newspaper'}" class="w-3.5 h-3.5"></i>
        </div>
        <div>
          <span class="text-[9px] text-red-600 dark:text-red-400 font-bold uppercase">${b.type}</span>
          <h4 class="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">${b.title}</h4>
        </div>
      </div>
      <button onclick="toggleBookmark('${b.type}', '${b.id}', '${encodeURIComponent(b.title)}')" class="text-rose-600 p-1 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg">
        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // ------------------------------------------------------------------------------
  // 8. TASBIH DIGITAL INTERAKTIF
  // ------------------------------------------------------------------------------
  function incrementTasbih() {
    AppState.tasbihCount++;
    const countEl = document.getElementById('tasbihCounterNumber');
    if (countEl) {
      countEl.textContent = AppState.tasbihCount;
      countEl.classList.add('scale-110', 'text-red-600');
      setTimeout(() => {
        countEl.classList.remove('scale-110', 'text-red-600');
      }, 150);
    }

    if (navigator.vibrate) {
      navigator.vibrate(25);
    }

    if (AppState.tasbihCount > 0 && AppState.tasbihCount % 33 === 0) {
      showToast(`Alhamdulillah! Telah menyelesaikan ${AppState.tasbihCount} kali tasbih.`);
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    }
  }

  function resetTasbih() {
    AppState.tasbihCount = 0;
    const countEl = document.getElementById('tasbihCounterNumber');
    if (countEl) countEl.textContent = "0";
    showToast("Tasbih direset ke 0");
  }

  // ------------------------------------------------------------------------------
  // 9. KOMPAS KIBLAT
  // ------------------------------------------------------------------------------
  function calibrateCompass() {
    const dial = document.getElementById('compassDial');
    if (!dial) return;

    showToast("Menyelaraskan sensor arah Ka'bah (Makkah)...");
    dial.style.transform = `rotate(${295 + Math.floor(Math.random() * 4 - 2)}deg)`;
  }

  // ------------------------------------------------------------------------------
  // 10. MODAL BOOKING USTADZ & INTEGRASI WHATSAPP
  // ------------------------------------------------------------------------------
  function openBookingModal(scholarName) {
    const modal = document.getElementById('bookingModal');
    const scholarTarget = document.getElementById('bookingScholarName');
    if (scholarTarget) scholarTarget.textContent = scholarName;
    if (modal) modal.classList.remove('hidden');
  }

  function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.add('hidden');
  }

  function submitBookingForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.elements['inviterName'] ? form.elements['inviterName'].value : 'Jamaah';
    const eventType = form.elements['eventType'] ? form.elements['eventType'].value : 'Kajian';
    const whatsapp = form.elements['whatsappNumber'] ? form.elements['whatsappNumber'].value : '';
    const scholar = document.getElementById('bookingScholarName').textContent || 'Ustadz';

    const newBooking = { id: Date.now(), scholar, name, eventType, whatsapp, date: new Date().toLocaleDateString('id-ID') };
    const existing = JSON.parse(localStorage.getItem('islami_bookings') || '[]');
    existing.push(newBooking);
    localStorage.setItem('islami_bookings', JSON.stringify(existing));

    closeBookingModal();
    showToast("Permintaan undangan berhasil dicatat!");

    const msg = encodeURIComponent(`Halo Redaksi Islami.co, saya ${name} ingin mengajukan undangan dakwah untuk ${scholar} pada agenda: ${eventType}. Kontak saya: ${whatsapp}`);
    const waUrl = `https://wa.me/6281234567890?text=${msg}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  }

  // ------------------------------------------------------------------------------
  // 11. TOAST & CLIPBOARD
  // ------------------------------------------------------------------------------
  function showToast(message) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-red-500/40 px-3.5 py-1.5 rounded-2xl text-xs font-semibold shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none opacity-0';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2');
    }, 2400);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Teks berhasil disalin!");
    }).catch(() => {
      showToast("Berhasil disalin");
    });
  }

  // ------------------------------------------------------------------------------
  // 12. RENDER KALENDER HIJRIAH & JADWAL SHOLAT
  // ------------------------------------------------------------------------------
  // ==============================================================================
  // 12. NUSANTARA CALENDAR ENGINE (MASEHI + ARAB HIJRIAH + PASARAN JAWA + INDIKATOR)
  // ==============================================================================

  AppState.calYear = 2026;
  AppState.calMonth = 10; // November (0-indexed: 10 = November)
  AppState.calSelectedDate = new Date(2026, 10, 22); // Default: Ahad Pon, 22 November 2026
  AppState.calActiveTab = 'hari-besar';

  const PASARAN_JAWA = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
  const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  function toArabicDigits(num) {
    return String(num).split('').map(d => ARABIC_DIGITS[parseInt(d, 10)] || d).join('');
  }

  function getPasaranJawa(date) {
    const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    const epoch = Date.UTC(1970, 0, 1, 12, 0, 0); // 1 Jan 1970 is Kamis Wage (Wage = index 3)
    const diffDays = Math.round((utc - epoch) / 86400000);
    const idx = ((diffDays + 3) % 5 + 5) % 5;
    return PASARAN_JAWA[idx];
  }

  function getHijriDetails(date) {
    // Exact mapping for 2026-11-22 = 12 Jumadal Akhirah 1448
    const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    const refUtc = Date.UTC(2026, 10, 22, 12, 0, 0);
    const diffDays = Math.round((utc - refUtc) / 86400000);

    let hDay = 12 + diffDays;
    let hMonth = "Jumadal Akhirah";
    let hYear = 1448;

    if (hDay <= 0) {
      hDay += 30;
      hMonth = "Jumadal Ula";
    } else if (hDay > 29) {
      hDay -= 29;
      hMonth = "Rajab";
    }

    return { day: hDay, month: hMonth, year: hYear, arabicDay: toArabicDigits(hDay) };
  }

  function navigateCalendarMonth(delta) {
    AppState.calMonth += delta;
    if (AppState.calMonth > 11) {
      AppState.calMonth = 0;
      AppState.calYear++;
    } else if (AppState.calMonth < 0) {
      AppState.calMonth = 11;
      AppState.calYear--;
    }
    renderCalendar();
  }

  function selectCalendarDate(year, month, day) {
    AppState.calSelectedDate = new Date(year, month, day);
    renderCalendar();
  }

  function switchCalendarTab(tab) {
    AppState.calActiveTab = tab;
    ['hari-besar', 'puasa', 'agenda'].forEach(t => {
      const btn = document.getElementById(`calTabBtn-${t}`);
      if (btn) {
        if (t === tab) {
          btn.className = "pb-2 px-2 border-b-2 border-[#8B1E1E] text-[#8B1E1E] dark:text-amber-400 font-extrabold transition";
        } else {
          btn.className = "pb-2 px-2 border-b-2 border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition";
        }
      }
    });
    renderCalendarTabContent();
  }

  function renderCalendarTabContent() {
    const container = document.getElementById('calendarTabContent');
    if (!container) return;

    const tab = AppState.calActiveTab || 'hari-besar';
    const lang = AppState.currentLang || 'id';

    if (tab === 'hari-besar') {
      const events = [
        {
          date: "10 Nov 2026",
          hijri: "30 Jumadal Ula 1448 H",
          title: "Hari Pahlawan & Peringatan Resolusi Jihad",
          desc: "Mengenang perjuangan santri dan ulama dalam mempertahankan kedaulatan bangsa di Surabaya.",
          badge: "Peringatan Nasional & Ulama"
        },
        {
          date: "11 Nov 2026",
          hijri: "1 Jumadal Akhirah 1448 H",
          title: "Awal Bulan Jumadal Akhirah 1448 H",
          desc: "Bulan ke-6 dalam penanggalan Hijriah, momentum memperkuat amalan harian.",
          badge: "Awal Bulan Hijriah"
        },
        {
          date: "15 Jan 2027",
          hijri: "27 Rajab 1448 H",
          title: "Isra Mi'raj Nabi Muhammad SAW",
          desc: "Perjalanan agung Rasulullah SAW menjemput perintah sholat lima waktu.",
          badge: "Hari Besar Islam"
        },
        {
          date: "09 Feb 2027",
          hijri: "1 Ramadhan 1448 H",
          title: "Awal Puasa Ramadhan 1448 H",
          desc: "Bulan suci penuh berkah, rahmat, dan ampunan bagi seluruh kaum beriman.",
          badge: "Puasa Wajib"
        }
      ];

      container.innerHTML = events.map(ev => `
        <div class="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 flex items-start gap-3">
          <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-[#8B1E1E] dark:text-red-300 flex flex-col items-center justify-center font-bold shrink-0 text-center">
            <span class="text-[9px] uppercase leading-none font-medium text-stone-400">${ev.date.split(' ')[1]}</span>
            <span class="text-sm font-black leading-none mt-0.5">${ev.date.split(' ')[0]}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5 mb-0.5">
              <span class="text-[8.5px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">${ev.badge}</span>
              <span class="text-[9.5px] text-stone-400 font-mono">${ev.hijri}</span>
            </div>
            <h4 class="text-xs font-bold text-stone-900 dark:text-white leading-tight">${ev.title}</h4>
            <p class="text-[10px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">${ev.desc}</p>
          </div>
        </div>
      `).join('');

    } else if (tab === 'puasa') {
      const fasts = [
        {
          title: "Puasa Sunnah Senin & Kamis",
          schedule: "Setiap hari Senin & Kamis (2, 5, 9, 12, 16, 19, 23, 26, 30 Nov 2026)",
          fadhilah: "Hari diangkatnya amalan manusia kepada Allah SWT dan Rasulullah SAW senang saat berpuasa.",
          badge: "Sunnah Mingguan"
        },
        {
          title: "Puasa Ayyamul Bidh (13, 14, 15 Hijriah)",
          schedule: "23, 24, 25 November 2026 (13, 14, 15 Jumadal Akhirah 1448 H)",
          fadhilah: "Pahalanya seperti berpuasa sepanjang tahun jika rutin dikerjakan setiap pertengahan bulan.",
          badge: "Sunnah Bulanan"
        },
        {
          title: "Puasa Daud",
          schedule: "Sehari berpuasa, sehari berbuka secara istiqamah",
          fadhilah: "Puasa yang paling dicintai Allah sebagaimana dicontohkan oleh Nabi Daud AS.",
          badge: "Sunnah Utama"
        }
      ];

      container.innerHTML = fasts.map(f => `
        <div class="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60 flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
            <i data-lucide="moon" class="w-4 h-4"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5 mb-0.5">
              <span class="text-[8.5px] font-bold px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900 text-amber-900 dark:text-amber-200">${f.badge}</span>
            </div>
            <h4 class="text-xs font-bold text-stone-900 dark:text-white leading-tight">${f.title}</h4>
            <p class="text-[10px] text-amber-900/80 dark:text-amber-300/80 font-medium mt-0.5">${f.schedule}</p>
            <p class="text-[10px] text-stone-500 dark:text-stone-400 mt-1 leading-snug"><strong>Fadhilah:</strong> ${f.fadhilah}</p>
          </div>
        </div>
      `).join('');

    } else if (tab === 'agenda') {
      let agendas = [];
      try {
        agendas = JSON.parse(localStorage.getItem('islami_user_agendas') || '[]');
      } catch (e) {
        agendas = [];
      }

      if (agendas.length === 0) {
        // Starter sample agendas
        agendas = [
          {
            id: "agenda-1",
            title: "Pengajian Kitab Ihya' Ulumiddin bersama Ustadz",
            date: "2026-11-22",
            notes: "Pukul 19.30 WIB di Masjid Agung Al-Ikhlas"
          },
          {
            id: "agenda-2",
            title: "Khataman Al-Qur'an & Doa Bersama Keluarga",
            date: "2026-11-27",
            notes: "Ba'da Sholat Ashar berjamaah"
          }
        ];
        localStorage.setItem('islami_user_agendas', JSON.stringify(agendas));
      }

      container.innerHTML = agendas.map(ag => `
        <div class="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 flex items-start justify-between gap-3">
          <div class="flex items-start gap-2.5 min-w-0 flex-1">
            <div class="w-9 h-9 rounded-xl bg-[#8B1E1E] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <i data-lucide="calendar" class="w-4 h-4"></i>
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-xs font-bold text-stone-900 dark:text-white leading-tight">${ag.title}</h4>
              <p class="text-[10px] text-[#8B1E1E] dark:text-amber-400 font-semibold mt-0.5">${ag.date}</p>
              ${ag.notes ? `<p class="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">${ag.notes}</p>` : ''}
            </div>
          </div>
          <button onclick="deleteUserAgenda('${ag.id}')" class="p-1.5 text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition" title="Hapus Agenda">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  function openAddAgendaModal() {
    const modal = document.getElementById('modalAddAgenda');
    if (!modal) return;
    const dateInput = document.getElementById('inputAgendaDate');
    if (dateInput) {
      const sel = AppState.calSelectedDate || new Date();
      const y = sel.getFullYear();
      const m = String(sel.getMonth() + 1).padStart(2, '0');
      const d = String(sel.getDate()).padStart(2, '0');
      dateInput.value = `${y}-${m}-${d}`;
    }
    modal.classList.remove('hidden');
  }

  function closeAddAgendaModal() {
    const modal = document.getElementById('modalAddAgenda');
    if (modal) modal.classList.add('hidden');
  }

  function saveUserAgenda() {
    const title = document.getElementById('inputAgendaTitle').value.trim();
    const date = document.getElementById('inputAgendaDate').value;
    const notes = document.getElementById('inputAgendaNotes').value.trim();

    if (!title) {
      showToast('Mohon masukkan judul agenda');
      return;
    }

    let agendas = [];
    try {
      agendas = JSON.parse(localStorage.getItem('islami_user_agendas') || '[]');
    } catch (e) {
      agendas = [];
    }

    agendas.push({
      id: 'agenda-' + Date.now(),
      title,
      date: date || '2026-11-22',
      notes
    });

    localStorage.setItem('islami_user_agendas', JSON.stringify(agendas));
    closeAddAgendaModal();
    document.getElementById('inputAgendaTitle').value = '';
    document.getElementById('inputAgendaNotes').value = '';
    switchCalendarTab('agenda');
    showToast('Agenda berhasil ditambahkan!');
  }

  function deleteUserAgenda(id) {
    if (!confirm('Hapus agenda ini?')) return;
    let agendas = [];
    try {
      agendas = JSON.parse(localStorage.getItem('islami_user_agendas') || '[]');
    } catch (e) {
      agendas = [];
    }
    agendas = agendas.filter(a => a.id !== id);
    localStorage.setItem('islami_user_agendas', JSON.stringify(agendas));
    renderCalendarTabContent();
    showToast('Agenda dihapus');
  }

  function renderCalendar() {
    const daysContainer = document.getElementById('calendarDaysGrid');
    if (!daysContainer) return;

    const year = AppState.calYear || 2026;
    const month = AppState.calMonth !== undefined ? AppState.calMonth : 10;
    const selectedDate = AppState.calSelectedDate || new Date(2026, 10, 22);

    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    // 1. Header Month & Year
    const headerTitle = document.getElementById('calHeaderMonthYear');
    if (headerTitle) {
      headerTitle.textContent = `${monthNames[month]} ${year}`;
    }

    const headerHijri = document.getElementById('calHeaderHijriSpan');
    if (headerHijri) {
      if (year === 2026 && month === 10) {
        headerHijri.textContent = "Jumadal Ula - Jumadal Akhirah 1448 H";
      } else {
        const startHijri = getHijriDetails(new Date(year, month, 1));
        const endHijri = getHijriDetails(new Date(year, month, 28));
        headerHijri.textContent = `${startHijri.month} - ${endHijri.month} ${endHijri.year} H`;
      }
    }

    // 2. Banner Tanggal Terpilih
    const bannerTitle = document.getElementById('calSelectedDateTitle');
    const bannerSub = document.getElementById('calSelectedDateSub');
    if (bannerTitle && bannerSub && selectedDate) {
      const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const dayName = dayNames[selectedDate.getDay()];
      const pasaran = getPasaranJawa(selectedDate);
      const hijri = getHijriDetails(selectedDate);

      bannerTitle.textContent = `${dayName} ${pasaran}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
      bannerSub.textContent = `${hijri.day} ${hijri.month} ${hijri.year} H`;
    }

    // 3. Grid 7 Kolom
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Ahad
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let gridHtml = '';

    // Empty cells before first day
    for (let e = 0; e < firstDayIndex; e++) {
      gridHtml += `<div class="p-1 min-h-[52px] rounded-xl opacity-20"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(year, month, day);
      const dayOfWeek = thisDate.getDay();
      const pasaran = getPasaranJawa(thisDate);
      const hijri = getHijriDetails(thisDate);

      const isSunday = dayOfWeek === 0;
      const isSelected = selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day;
      const isToday = new Date().toDateString() === thisDate.toDateString();

      // Indikator Titik
      const isMondayThursdayFast = dayOfWeek === 1 || dayOfWeek === 4;
      const isAyyamulBidh = hijri.day === 13 || hijri.day === 14 || hijri.day === 15;
      const hasFastingDot = isMondayThursdayFast || isAyyamulBidh;

      const isHolidayOrEvent = (year === 2026 && month === 10 && (day === 10 || day === 11)) || isSunday;
      const hasEventDot = (year === 2026 && month === 10 && day === 10) || isAyyamulBidh;

      // Styling kotak tanggal
      let cellClass = "p-1 min-h-[54px] rounded-xl transition cursor-pointer flex flex-col items-center justify-between relative group ";
      if (isSelected) {
        cellClass += "bg-[#801818]/15 dark:bg-[#801818]/30 border-2 border-[#801818] shadow-xs ";
      } else {
        cellClass += "border border-stone-200/50 dark:border-stone-800/80 hover:bg-stone-100/80 dark:hover:bg-stone-800/60 bg-white/70 dark:bg-stone-900/60 ";
      }

      // Angka Masehi Color: Merah jika Ahad/Libur
      let masehiColor = (isSunday || (month === 10 && day === 10)) ? "text-red-600 dark:text-red-400 font-black" : "text-stone-900 dark:text-white font-extrabold";
      if (isSelected) masehiColor = "text-[#801818] dark:text-amber-400 font-black";

      gridHtml += `
        <div onclick="selectCalendarDate(${year}, ${month}, ${day})" class="${cellClass}">
          <!-- Top Row: Angka Arab Hijriah di Kiri Atas -->
          <div class="w-full flex items-center justify-start px-0.5">
            <span class="text-[9.5px] font-arabic font-bold text-stone-400 dark:text-stone-500 leading-none">
              ${hijri.arabicDay}
            </span>
          </div>

          <!-- Middle: Angka Tanggal Masehi Utama Tebal -->
          <span class="text-sm ${masehiColor} leading-none my-0.5">
            ${day}
          </span>

          <!-- Bottom: Pasaran Jawa (Legi, Pahing, Pon, Wage, Kliwon) -->
          <span class="text-[8.5px] font-semibold text-stone-500 dark:text-stone-400 leading-none">
            ${pasaran}
          </span>

          <!-- Titik Indikator (Dot Indicator): Kuning = Puasa Sunnah, Biru = Hari Besar -->
          <div class="flex items-center justify-center gap-0.5 h-1.5 mt-0.5">
            ${hasFastingDot ? '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-2xs"></span>' : ''}
            ${hasEventDot ? '<span class="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-2xs"></span>' : ''}
          </div>
        </div>
      `;
    }

    daysContainer.innerHTML = gridHtml;

    // 4. Update Tab Content & Prayer Cards
    renderCalendarTabContent();

    const prayerCards = document.getElementById('calendarPrayerCards');
    if (prayerCards) {
      const prayers = [
        { name: 'Subuh', time: '04:14', icon: 'sunrise' },
        { name: 'Dzuhur', time: '11:46', icon: 'sun' },
        { name: 'Ashar', time: '15:05', icon: 'cloud-sun' },
        { name: 'Maghrib', time: '17:58', icon: 'sunset' },
        { name: 'Isya', time: '19:10', icon: 'moon' }
      ];

      prayerCards.innerHTML = prayers.map(p => `
        <div class="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/50 dark:border-stone-700/50 text-center">
          <span class="text-[9px] font-bold text-stone-400 block">${p.name}</span>
          <span class="text-xs font-black text-stone-900 dark:text-white font-mono mt-0.5 block">${p.time}</span>
        </div>
      `).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  // ------------------------------------------------------------------------------
  // 13. PENGATURAN & PREFERENSI APLIKASI
  // ------------------------------------------------------------------------------
  function renderSettings() {
    const adzanSound = localStorage.getItem('islami_setting_adzan') !== 'false';
    const preAlert = localStorage.getItem('islami_setting_pre_alert') !== 'false';

    const chkAdzan = document.getElementById('settingAdzanSound');
    const chkPre = document.getElementById('settingPrePrayerAlert');
    if (chkAdzan) chkAdzan.checked = adzanSound;
    if (chkPre) chkPre.checked = preAlert;

    updateSettingLangUI(AppState.currentLang);
  }

  function toggleSettingAdzan() {
    const chk = document.getElementById('settingAdzanSound');
    const val = chk ? chk.checked : true;
    localStorage.setItem('islami_setting_adzan', val.toString());
    showToast(val ? "Notifikasi Adzan diaktifkan" : "Notifikasi Adzan dinonaktifkan");
  }

  function toggleSettingPreAlert() {
    const chk = document.getElementById('settingPrePrayerAlert');
    const val = chk ? chk.checked : true;
    localStorage.setItem('islami_setting_pre_alert', val.toString());
    showToast(val ? "Pengingat 10 menit aktif" : "Pengingat 10 menit dinonaktifkan");
  }

  function updateSettingLangUI(lang) {
    ['id', 'en', 'ms'].forEach(l => {
      const btn = document.getElementById(`settingLang${l.charAt(0).toUpperCase() + l.slice(1)}`);
      if (!btn) return;
      if (l === lang) {
        btn.className = 'p-2.5 rounded-xl border border-red-600 bg-red-50 dark:bg-red-950 text-center font-bold text-xs text-[#B91C1C] dark:text-red-300 transition shadow-sm';
      } else {
        btn.className = 'p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-center font-medium text-xs text-slate-700 dark:text-slate-300 transition';
      }
    });
  }


  // ==============================================================================
  // MODUL AL-QUR'AN MODERN (SESUAI GAMBAR REFERENSI & TEMA MARUN ISLAMI.CO)
  // ==============================================================================

  let currentQuranTab = 'surah';
  let currentReadingSurah = 1;

  // 1. Switch Tab Kapsul: Surah | Juz | Riwayat
  function switchQuranTab(tab) {
    currentQuranTab = tab;

    const btnSurah = document.getElementById('quran-btn-surah');
    const btnJuz = document.getElementById('quran-btn-juz');
    const btnRiwayat = document.getElementById('quran-btn-riwayat');

    const tabSurah = document.getElementById('quranTabSurah');
    const tabJuz = document.getElementById('quranTabJuz');
    const tabRiwayat = document.getElementById('quranTabRiwayat');
    const searchContainer = document.getElementById('quranSearchContainer');

    const activeClasses = ['bg-white', 'text-[#8B1E1E]', 'shadow-sm', 'font-black'];
    const inactiveClasses = ['text-white/80', 'hover:text-white', 'font-semibold'];

    function setBtnStyle(btn, isActive) {
      if (!btn) return;
      if (isActive) {
        btn.classList.add(...activeClasses);
        btn.classList.remove(...inactiveClasses);
      } else {
        btn.classList.remove(...activeClasses);
        btn.classList.add(...inactiveClasses);
      }
    }

    setBtnStyle(btnSurah, tab === 'surah');
    setBtnStyle(btnJuz, tab === 'juz');
    setBtnStyle(btnRiwayat, tab === 'riwayat');

    if (tabSurah) tabSurah.classList.toggle('hidden', tab !== 'surah');
    if (tabJuz) tabJuz.classList.toggle('hidden', tab !== 'juz');
    if (tabRiwayat) tabRiwayat.classList.toggle('hidden', tab !== 'riwayat');

    if (searchContainer) {
      searchContainer.classList.toggle('hidden', tab === 'riwayat');
    }

    if (tab === 'surah') {
      renderQuranSurahs();
    } else if (tab === 'juz') {
      renderQuranJuz();
    } else if (tab === 'riwayat') {
      renderQuranRiwayat();
    }

    if (window.lucide) lucide.createIcons();
  }

  // 2. Render Ornate Islamic Medallion SVG for Surah Number
  function getSurahMedallionSvg(number) {
    return `
    <div class="relative w-11 h-11 flex items-center justify-center shrink-0">
      <svg width="42" height="42" viewBox="0 0 44 44" class="text-stone-300 dark:text-stone-700 fill-none stroke-current" stroke-width="1.3">
        <circle cx="22" cy="22" r="16" stroke-dasharray="2.5,2"/>
        <path d="M22 2 L26 12 L37 7 L32 18 L42 22 L32 26 L37 37 L26 32 L22 42 L18 32 L7 37 L12 26 L2 22 L12 18 L7 7 L18 12 Z" opacity="0.6"/>
      </svg>
      <span class="absolute text-[11px] font-mono font-bold text-stone-700 dark:text-stone-300">${number}</span>
    </div>
  `;
  }

  // 3. Render Daftar 114 Surah (Persis Seperti Gambar Referensi)
  function renderQuranSurahs(filter = '') {
    const container = document.getElementById('quranTabSurah');
    if (!container || !window.quranData) return;

    const surahs = window.quranData.surahs || [];
    const q = filter.toLowerCase().trim();

    const filtered = [];
    const verseMatchesMap = {};

    surahs.forEach(s => {
      const matchName = s.name.toLowerCase().includes(q);
      const matchMeaning = s.meaning.toLowerCase().includes(q);
      const matchNum = s.number.toString() === q;

      // Search verses mock data for matching snippet
      let matchedVerse = null;
      if (q && window.quranData.verses && window.quranData.verses[s.number]) {
        matchedVerse = window.quranData.verses[s.number].find(v =>
          v.translation.toLowerCase().includes(q) ||
          v.latin.toLowerCase().includes(q) ||
          v.arabic.includes(q)
        );
      }

      if (!q || matchName || matchMeaning || matchNum || matchedVerse) {
        filtered.push(s);
        if (matchedVerse) {
          verseMatchesMap[s.number] = matchedVerse;
        }
      }
    });

    if (filtered.length === 0) {
      container.innerHTML = `
      <div class="p-8 text-center text-stone-400">
        <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
        <p class="text-xs font-semibold">Surah tidak ditemukan</p>
      </div>
    `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(s => `
    <div onclick="openQuranReader(${s.number})" 
      class="py-3 px-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-100/70 dark:hover:bg-stone-900/50 rounded-xl transition group">
      
      <!-- Kiri: Medali Ornamen Islami & Nomor Surah -->
      ${getSurahMedallionSvg(s.number)}

      <!-- Tengah: Nama Transliterasi Latin & Terjemahan + Jumlah Ayat -->
      <div class="flex-1 min-w-0 pr-1">
        <h4 class="text-sm font-bold text-stone-900 dark:text-white leading-tight group-hover:text-[#8B1E1E] dark:group-hover:text-red-400 transition truncate">
          ${s.name}
        </h4>
        <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
          ${s.meaning} (${s.ayahs} Ayat)
        </p>
      </div>

      <!-- Kanan: Kaligrafi Arab Surah -->
      <div class="text-right shrink-0">
        <span class="font-arabic text-base sm:text-lg text-stone-800 dark:text-stone-200 font-bold leading-none tracking-normal group-hover:text-[#8B1E1E] dark:group-hover:text-red-400 transition">
          ${s.arabic}
        </span>
      </div>

    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // 4. Filter Input Surah
  function filterQuranSurahs() {
    const input = document.getElementById('quranSearchInput');
    const clearBtn = document.getElementById('btnQuranSearchClear');
    const val = input ? input.value : '';
    if (clearBtn) {
      if (val.trim()) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }
    renderQuranSurahs(val);
  }

  function clearQuranSearch() {
    const input = document.getElementById('quranSearchInput');
    const clearBtn = document.getElementById('btnQuranSearchClear');
    if (input) {
      input.value = '';
      input.focus();
    }
    if (clearBtn) clearBtn.classList.add('hidden');
    renderQuranSurahs('');
  }

  function focusQuranSearchInput() {
    const input = document.getElementById('quranSearchInput');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // 5. Render Daftar 30 Juz
  function renderQuranJuz() {
    const container = document.getElementById('quranTabJuz');
    if (!container || !window.quranData) return;

    const juzs = window.quranData.juzs || [];

    container.innerHTML = juzs.map(j => `
    <div onclick="openQuranReaderByJuz(${j.number})" 
      class="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between cursor-pointer hover:border-[#8B1E1E] transition group shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#8B1E1E] dark:text-red-400 font-bold text-xs flex items-center justify-center border border-red-200/60 dark:border-red-900/40 font-mono">
          ${j.number}
        </div>
        <div>
          <h4 class="text-xs font-black text-stone-900 dark:text-white group-hover:text-[#8B1E1E] transition">${j.name}</h4>
          <p class="text-[10px] text-stone-400 mt-0.5">${j.start} - ${j.end}</p>
        </div>
      </div>
      <i data-lucide="chevron-right" class="w-4 h-4 text-stone-400 group-hover:text-[#8B1E1E] transition"></i>
    </div>
  `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // 6. Render Riwayat & Bookmark
  function renderQuranRiwayat() {
    const container = document.getElementById('quranTabRiwayat');
    if (!container || !window.quranData) return;

    const last = window.quranData.lastRead;
    const bookmarks = window.quranData.bookmarks || [];

    container.innerHTML = `
    <!-- Kartu Terakhir Dibaca -->
    <div class="p-4 rounded-2xl bg-[#FFF9EE] dark:bg-[#1C1814] border border-amber-200 dark:border-amber-900/60 space-y-2 shadow-xs">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-extrabold uppercase text-amber-800 dark:text-amber-400 tracking-wider flex items-center gap-1.5">
          <i data-lucide="clock" class="w-3.5 h-3.5"></i> Terakhir Dibaca
        </span>
        <span class="text-[10px] text-amber-700/80 font-semibold">Juz ${last.juz}</span>
      </div>
      <div>
        <h4 class="text-sm font-black text-stone-900 dark:text-white">QS. ${last.surahName}: Ayat ${last.verse}</h4>
        <p class="font-arabic text-sm text-right text-stone-800 dark:text-stone-200 pt-1 leading-relaxed font-bold">${last.arabic}</p>
        <p class="text-[11px] text-stone-500 dark:text-stone-400 italic pt-1 leading-snug">"${last.translation}"</p>
      </div>
      <button onclick="openLastReadQuran()" class="w-full mt-2 py-2 rounded-xl bg-[#8B1E1E] hover:bg-[#991B1B] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
        <span>Lanjutkan Membaca</span>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </button>
    </div>

    <!-- Daftar Penanda Bookmark -->
    <div class="space-y-1.5 pt-2">
      <h5 class="text-xs font-extrabold text-stone-600 dark:text-stone-400 uppercase tracking-wider px-1">Penanda Ayat (Bookmarks)</h5>
      ${bookmarks.map(b => `
        <div onclick="openQuranReader(${b.surahNumber})" class="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between cursor-pointer hover:border-red-600 transition shadow-xs">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950 text-[#8B1E1E] dark:text-red-400 flex items-center justify-center">
              <i data-lucide="bookmark" class="w-4 h-4 fill-current"></i>
            </div>
            <div>
              <p class="text-xs font-bold text-stone-900 dark:text-white">${b.title}</p>
              <p class="text-[10px] text-stone-400">QS. ${b.surahName}: ${b.verse} • ${b.date}</p>
            </div>
          </div>
          <i data-lucide="chevron-right" class="w-4 h-4 text-stone-400"></i>
        </div>
      `).join('')}
    </div>
  `;

    if (window.lucide) lucide.createIcons();
  }

  // 7. Reader View Modal: Buka Ayat Lengkap
  function openQuranReader(surahNumber) {
    currentReadingSurah = surahNumber;
    const modal = document.getElementById('modalQuranReader');
    const title = document.getElementById('readerSurahTitle');
    const subtitle = document.getElementById('readerSurahSubtitle');
    const container = document.getElementById('readerVersesContainer');
    if (!modal || !window.quranData) return;

    const surahInfo = (window.quranData.surahs || []).find(s => s.number === surahNumber) || {
      number: surahNumber,
      name: 'Surah ' + surahNumber,
      meaning: "Al-Qur'an",
      ayahs: 7,
      type: 'Makkiyyah'
    };

    if (title) title.textContent = surahInfo.name;
    if (subtitle) subtitle.textContent = `${surahInfo.meaning} • ${surahInfo.ayahs} Ayat • ${surahInfo.type}`;

    const verses = (window.quranData.verses && window.quranData.verses[surahNumber]) || [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", latin: "Bismillaahir-rohmaanir-rohiim", translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang." },
      { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", latin: "Al-hamdu lillaahi robbil-'aalamiin", translation: "Segala puji bagi Allah, Tuhan seluruh alam." },
      { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", latin: "Ar-rohmaanir-rohiim", translation: "Yang Maha Pengasih, Maha Penyayang." }
    ];

    let bismillahBanner = '';
    if (surahNumber !== 9) { // At-Taubah tidak diawali Basmalah
      bismillahBanner = `
      <div class="py-4 text-center border-b border-stone-200/60 dark:border-stone-800/60 mb-2">
        <span class="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-white font-bold tracking-wide">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </span>
      </div>
    `;
    }

    container.innerHTML = bismillahBanner + verses.map(v => `
    <div class="p-3.5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 space-y-2.5 shadow-xs">
      <div class="flex items-center justify-between pb-1.5 border-b border-stone-100 dark:border-stone-800">
        <span class="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/60 text-[#8B1E1E] dark:text-red-400 font-mono text-xs font-bold flex items-center justify-center border border-red-200 dark:border-red-900">
          ${v.number}
        </span>
        <div class="flex items-center gap-1">
          <button onclick="playVerseAudio(${surahNumber}, ${v.number})" class="p-1.5 rounded-lg text-stone-400 hover:text-[#8B1E1E] transition" title="Dengarkan Audio">
            <i data-lucide="volume-2" class="w-4 h-4"></i>
          </button>
          <button onclick="copyToClipboard('${v.arabic} (${surahInfo.name}: ${v.number})')" class="p-1.5 rounded-lg text-stone-400 hover:text-[#8B1E1E] transition" title="Salin Ayat">
            <i data-lucide="copy" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <p class="font-arabic text-xl sm:text-2xl text-right text-stone-900 dark:text-stone-100 leading-[2.2] select-all font-bold pt-1">
        ${v.arabic}
      </p>

      <p class="text-xs text-[#8B1E1E] dark:text-red-400 font-medium italic">
        ${v.latin}
      </p>

      <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1 border-t border-stone-100 dark:border-stone-800">
        ${v.translation}
      </p>
    </div>
  `).join('');

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    if (window.lucide) lucide.createIcons();
  }

  function closeQuranReader() {
    const modal = document.getElementById('modalQuranReader');
    if (modal) modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  function openLastReadQuran() {
    if (window.quranData && window.quranData.lastRead) {
      openQuranReader(window.quranData.lastRead.surahNumber);
    } else {
      openQuranReader(3);
    }
  }

  function openQuranReaderByJuz(juzNumber) {
    // Mapping Juz ke Surah terdekat
    const juzMap = { 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 30: 78 };
    const sNum = juzMap[juzNumber] || 1;
    openQuranReader(sNum);
  }

  function playCurrentSurahAudio() {
    const surahNumStr = currentReadingSurah.toString().padStart(3, '0');
    const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${surahNumStr}001.mp3`;
    playQuranAudio(audioUrl, 'surah-' + currentReadingSurah, 'Murottal Surah ke-' + currentReadingSurah);
  }

  function playVerseAudio(surah, verse) {
    const sStr = surah.toString().padStart(3, '0');
    const vStr = verse.toString().padStart(3, '0');
    const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${sStr}${vStr}.mp3`;
    playQuranAudio(audioUrl, `${surah}-${verse}`, `QS. ${surah}: ${verse}`);
  }


  // ==============================================================================
  // 15. MODULAR EXTRA FEATURES (MENU LAINNYA - EXTENSIBLE ARRAY)
  // ==============================================================================


  window.IslamiExtraMenus = [
    {
      category: {
        id: "Ibadah & Dzikir",
        en: "Worship & Dhikr",
        ms: "Ibadah & Zikir"
      },
      badge: {
        id: "Utama",
        en: "Core",
        ms: "Utama"
      },
      description: {
        id: "Sarana penunjang kekhusyukan dan kontinuitas ibadah yaumiyah",
        en: "Essential tools to enrich daily devotions and mindfulness",
        ms: "Kemudahan untuk mempertingkat kekhusyukan ibadah harian"
      },
      items: [
        {
          id: "qibla",
          title: { id: "Arah Kiblat", en: "Qibla Direction", ms: "Arah Kiblat" },
          subtitle: { id: "Kompas presisi & penentu arah Ka'bah interaktif", en: "Precise compass pointing to the Kaaba", ms: "Kompas tepat menunjukkan arah Kaabah" },
          icon3d: "assets/3d/real_kiblat.png?v=4.0.0",
          colorClass: "card-warm-cream",
          badgeText: { id: "Kompas", en: "Compass", ms: "Kompas" },
          badgeColor: "bg-red-100 text-[#8B1E1E] dark:bg-red-950 dark:text-red-300",
          action: "closeMoreFeaturesDrawer(); switchTab('qibla')"
        },
        {
          id: "tasbih",
          title: { id: "Tasbih Digital", en: "Digital Tasbih", ms: "Tasbih Digital" },
          subtitle: { id: "Penghitung zikir harian dengan target & getar", en: "Interactive dhikr counter with haptic targets", ms: "Pengira zikir dengan sasaran & getaran" },
          icon3d: "assets/3d/real_doa.png?v=4.0.0",
          colorClass: "card-warm-amber",
          badgeText: { id: "Interaktif", en: "Interactive", ms: "Interaktif" },
          badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
          action: "openTasbihFeature()"
        },
        {
          id: "maulid",
          title: { id: "Maulid & Sholawat", en: "Mawlid & Salawat", ms: "Maulid & Selawat" },
          subtitle: { id: "Teks Simtudduror, Ad-Diba'i & Qasidah Burdah", en: "Simtudduror, Diba', Barzanji & Burdah texts", ms: "Teks Simtudduror, Diba', Barzanji & Burdah" },
          icon3d: "assets/3d/real_yasin.png?v=4.0.0",
          colorClass: "card-warm-ivory",
          badgeText: { id: "Kitab", en: "Book", ms: "Kitab" },
          badgeColor: "bg-red-100 text-[#8B1E1E] dark:bg-red-950 dark:text-red-300",
          action: "openMaulidFeature()"
        },
        {
          id: "hijriah",
          title: { id: "Kalender Hijriah & Puasa", en: "Hijri Calendar & Fasting", ms: "Kalendar Hijriah & Puasa" },
          subtitle: { id: "Jadwal Ayyamul Bidh, puasa sunnah & hari besar", en: "Ayyam al-Bid, Sunnah fasts and holy days", ms: "Jadual Ayyamul Bidh, puasa sunat & hari kebesaran" },
          icon3d: "assets/3d/icon_prayer_time.png?v=3.5.0",
          colorClass: "card-warm-cream",
          badgeText: { id: "1448 H", en: "1448 AH", ms: "1448 H" },
          badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
          action: "closeMoreFeaturesDrawer(); switchTab('calendar')"
        }
      ]
    },
    {
      category: {
        id: "Muamalah & Sosial",
        en: "Islamic Finance & Social",
        ms: "Muamalah & Sosial"
      },
      badge: {
        id: "Finansial",
        en: "Finance",
        ms: "Kewangan"
      },
      description: {
        id: "Kalkulator dan panduan ekonomi syariah untuk kemaslahatan",
        en: "Islamic financial calculators and guides for public benefit",
        ms: "Kalkulator dan panduan ekonomi syariah untuk kemaslahatan"
      },
      items: [
        {
          id: "zakat",
          title: { id: "Kalkulator Zakat", en: "Zakat Calculator", ms: "Kalkulator Zakat" },
          subtitle: { id: "Hitung zakat maal, fitrah, tabungan & profesi (nisab emas)", en: "Calculate wealth, savings & gold-based zakat", ms: "Kira zakat pendapatan, wang simpanan & emas" },
          icon3d: "assets/3d/icon_ramadan.png?v=2.4.7",
          colorClass: "card-warm-amber",
          badgeText: { id: "Zakat", en: "Zakat", ms: "Zakat" },
          badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
          action: "openZakatFeature()"
        },
        {
          id: "waris",
          title: { id: "Kalkulator Waris (Faraidh)", en: "Inheritance Calculator", ms: "Kalkulator Faraid" },
          subtitle: { id: "Simulasi pembagian hak waris sesuai syariat Islam", en: "Sharia inheritance calculation according to Faraidh", ms: "Simulasi pembahagian harta pusaka syariah" },
          icon3d: "assets/3d/real_quran.png?v=4.0.0",
          colorClass: "card-warm-cream",
          badgeText: { id: "Faraidh", en: "Faraidh", ms: "Faraid" },
          badgeColor: "bg-red-100 text-[#8B1E1E] dark:bg-red-950 dark:text-red-300",
          action: "openWarisFeature()"
        }
      ]
    },
    {
      category: {
        id: "Edukasi & Konsultasi",
        en: "Education & Guidance",
        ms: "Pendidikan & Bimbingan"
      },
      badge: {
        id: "Wasathiyah",
        en: "Moderate",
        ms: "Wasathiyah"
      },
      description: {
        id: "Bimbingan keislaman moderat dan mutiara hikmah",
        en: "Moderate Islamic guidance and pearls of wisdom",
        ms: "Bimbingan keislaman wasathiyah dan mutiara hikmah"
      },
      items: [
        {
          id: "tausiyah",
          title: { id: "Tausiyah Harian", en: "Daily Pearls of Wisdom", ms: "Tausiyah Harian" },
          subtitle: { id: "Nasihat penyejuk hati dari ulama dan habaib Nusantara", en: "Uplifting reminders from Islamic scholars", ms: "Mutiara hikmah penyejuk hati ulama Nusantara" },
          icon3d: "assets/3d/real_hadith.png?v=4.0.0",
          colorClass: "card-warm-maroon",
          badgeText: { id: "Harian", en: "Daily", ms: "Harian" },
          badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300",
          action: "openTausiyahFeature()"
        },
        {
          id: "tanya-ustadz",
          title: { id: "Tanya Ustadz & Konsultasi", en: "Ask an Islamic Scholar", ms: "Tanya Ustaz & Kaunseling" },
          subtitle: { id: "Tanya jawab fiqih, muamalah, dan problematika keluarga", en: "Direct Q&A on fiqh, family, and religious life", ms: "Soal jawab fiqah, muamalah & kekeluargaan" },
          icon3d: "assets/3d/real_ustadz.png?v=4.0.0",
          colorClass: "card-warm-ivory",
          badgeText: { id: "Respon Cepat", en: "Fast Reply", ms: "Pantas" },
          badgeColor: "bg-red-100 text-[#8B1E1E] dark:bg-red-950 dark:text-red-300",
          action: "closeMoreFeaturesDrawer(); switchTab('services')"
        }
      ]
    }
  ];

  function openMoreFeaturesDrawer() {
    const drawer = document.getElementById('drawerMoreFeatures');
    if (!drawer) return;
    renderMoreFeaturesDrawer();
    drawer.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    if (window.lucide) lucide.createIcons();
  }

  function closeMoreFeaturesDrawer() {
    const drawer = document.getElementById('drawerMoreFeatures');
    if (drawer) drawer.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  function renderMoreFeaturesDrawer() {
    const container = document.getElementById('moreFeaturesContent');
    if (!container || !window.IslamiExtraMenus) return;

    const currentLang = AppState.currentLang || 'id';

    const html = window.IslamiExtraMenus.map(section => {
      const secTitle = section.category[currentLang] || section.category['id'];
      const secBadge = section.badge[currentLang] || section.badge['id'];
      const secDesc = section.description[currentLang] || section.description['id'];

      const itemsHtml = section.items.map(item => {
        const itemTitle = item.title[currentLang] || item.title['id'];
        const itemSub = item.subtitle[currentLang] || item.subtitle['id'];
        const itemBadge = item.badgeText[currentLang] || item.badgeText['id'];

        return `
        <div onclick="${item.action}" class="clay-card ${item.colorClass} p-2.5 flex items-center justify-between gap-3 cursor-pointer group hover:scale-[1.01] active:scale-[0.99] transition-all border border-amber-200/40 dark:border-stone-800 shadow-xs">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <!-- 3D Luxury Icon Container -->
            <div class="w-12 h-12 rounded-2xl bg-white/95 dark:bg-stone-800/95 shadow-xs flex items-center justify-center p-1.5 shrink-0 group-hover:scale-108 transition-transform border border-amber-200/50 dark:border-stone-700">
              <img src="${item.icon3d}" alt="${itemTitle}" class="w-full h-full object-contain filter drop-shadow-xs">
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <h4 class="text-xs font-bold text-stone-900 dark:text-white leading-tight truncate">${itemTitle}</h4>
                <span class="text-[8.5px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor} shrink-0 shadow-2xs">${itemBadge}</span>
              </div>
              <p class="text-[9.5px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5 line-clamp-1">${itemSub}</p>
            </div>
          </div>
          <div class="w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-[#8B1E1E] dark:group-hover:text-amber-400 transition shrink-0">
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </div>
        </div>
      `;
      }).join('');

      return `
      <div class="space-y-2">
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-4 rounded-full bg-[#8B1E1E]"></span>
            <h4 class="text-xs font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider">${secTitle}</h4>
          </div>
          <span class="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/60">${secBadge}</span>
        </div>
        <p class="text-[10px] text-stone-500 dark:text-stone-400 px-1 -mt-1">${secDesc}</p>
        <div class="space-y-2">
          ${itemsHtml}
        </div>
      </div>
    `;
    }).join('');

    container.innerHTML = html;
  }

  function openOnboardingScreen() {
    const onboardingEl = document.getElementById('onboardingScreen');
    if (onboardingEl) {
      onboardingEl.classList.remove('hidden', 'opacity-0', 'scale-95', 'pointer-events-none');
      if (typeof startGreetingAnimation === 'function') startGreetingAnimation();
    }
  }

  let tasbihCount = 0;
  let tasbihTarget = 33;

  function openTasbihFeature() {
    closeMoreFeaturesDrawer();
    const existing = document.getElementById('modalTasbih');
    if (existing) existing.remove();

    const modalHtml = `
    <div id="modalTasbih" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div class="bg-[#FAF7F2] dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200/80 dark:border-stone-800 text-center space-y-4 animate-scaleUp">
        <div class="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <i data-lucide="circle-dot" class="w-4 h-4"></i>
            </div>
            <h3 class="text-sm font-extrabold text-stone-900 dark:text-white">Tasbih Digital</h3>
          </div>
          <button onclick="document.getElementById('modalTasbih').remove()" class="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-700">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <div class="space-y-1">
          <p class="font-arabic text-xl text-stone-900 dark:text-white font-bold">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
          <p class="text-xs text-[#8B1E1E] dark:text-red-400 font-medium italic">Subhanallahi wa bihamdihi</p>
        </div>

        <!-- Counter Circle -->
        <div onclick="incrementTasbih()" class="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-[#8B1E1E] to-[#681414] text-white shadow-xl flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform select-none border-4 border-amber-300/40">
          <span id="tasbihCounterNum" class="text-4xl font-black font-mono tracking-tight">${tasbihCount}</span>
          <span class="text-[10px] text-amber-200 uppercase tracking-widest mt-0.5">Target: <span id="tasbihTargetNum">${tasbihTarget}</span></span>
        </div>

        <p class="text-[11px] text-stone-400">Ketuk lingkaran untuk menghitung zikir</p>

        <div class="flex items-center justify-center gap-2 pt-1">
          <button onclick="resetTasbih()" class="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-300 transition">
            Reset (0)
          </button>
          <button onclick="setTasbihTarget(33)" class="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 text-xs font-medium">
            33x
          </button>
          <button onclick="setTasbihTarget(100)" class="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 text-xs font-medium">
            100x
          </button>
        </div>
      </div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    if (window.lucide) lucide.createIcons();
  }

  function incrementTasbih() {
    tasbihCount++;
    const el = document.getElementById('tasbihCounterNum');
    if (el) {
      el.textContent = tasbihCount;
      el.classList.add('scale-110');
      setTimeout(() => el.classList.remove('scale-110'), 150);
    }
    if (navigator.vibrate) navigator.vibrate(25);
    if (tasbihCount % tasbihTarget === 0) {
      if (navigator.vibrate) navigator.vibrate([60, 50, 60]);
      showToast("Alhamdulillah, target " + tasbihCount + "x zikir tercapai!");
    }
  }

  function resetTasbih() {
    tasbihCount = 0;
    const el = document.getElementById('tasbihCounterNum');
    if (el) el.textContent = '0';
  }

  function setTasbihTarget(t) {
    tasbihTarget = t;
    const el = document.getElementById('tasbihTargetNum');
    if (el) el.textContent = t;
  }

  function openZakatFeature() {
    closeMoreFeaturesDrawer();
    const existing = document.getElementById('modalZakat');
    if (existing) existing.remove();

    const modalHtml = `
    <div id="modalZakat" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div class="bg-[#FAF7F2] dark:bg-slate-900 rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-stone-200/80 dark:border-stone-800 space-y-4 animate-scaleUp">
        <div class="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <i data-lucide="coins" class="w-4 h-4"></i>
            </div>
            <h3 class="text-sm font-extrabold text-stone-900 dark:text-white">Kalkulator Zakat Maal</h3>
          </div>
          <button onclick="document.getElementById('modalZakat').remove()" class="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-700">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <div class="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
          <p class="font-bold">Nisab Zakat Maal (85 gram Emas):</p>
          <p class="text-[11px] opacity-90">Rp 102.000.000 / tahun (Kadar zakat 2.5%)</p>
        </div>

        <div class="space-y-2 text-left">
          <label class="text-[11px] font-bold text-stone-700 dark:text-stone-300">Total Harta Simpanan / Tabungan (Rp):</label>
          <input type="number" id="inputZakatHarta" placeholder="Contoh: 150000000" oninput="calculateZakat()"
            class="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono font-bold text-stone-900 dark:text-white focus:outline-none focus:border-[#8B1E1E]">
        </div>

        <div id="zakatResultBox" class="p-3.5 rounded-2xl bg-white dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 text-center space-y-1">
          <span class="text-[10px] text-stone-400 uppercase tracking-wider block">Kewajiban Zakat (2.5%):</span>
          <span id="zakatResultText" class="text-lg font-black text-[#8B1E1E] dark:text-red-400 font-mono">Rp 0</span>
          <p id="zakatStatusText" class="text-[10px] text-stone-500">Masukkan jumlah harta untuk menghitung</p>
        </div>

        <button onclick="document.getElementById('modalZakat').remove(); showToast('Tersimpan di catatan zakat!');" class="w-full py-2.5 rounded-xl bg-[#8B1E1E] text-white text-xs font-bold shadow-md hover:bg-[#991B1B] transition">
          Selesai & Catat
        </button>
      </div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    if (window.lucide) lucide.createIcons();
  }

  function calculateZakat() {
    const val = parseFloat(document.getElementById('inputZakatHarta').value) || 0;
    const nisab = 102000000;
    const resultText = document.getElementById('zakatResultText');
    const statusText = document.getElementById('zakatStatusText');

    if (val >= nisab) {
      const zakat = val * 0.025;
      resultText.textContent = 'Rp ' + zakat.toLocaleString('id-ID');
      statusText.textContent = '✅ Harta telah mencapai nisab. Wajib mengeluarkan zakat 2.5%';
      statusText.className = 'text-[10px] text-emerald-600 dark:text-emerald-400 font-bold';
    } else if (val > 0) {
      resultText.textContent = 'Rp 0';
      statusText.textContent = 'Belum mencapai nisab (Rp 102.000.000). Dianjurkan Infaq/Sedekah sukarela.';
      statusText.className = 'text-[10px] text-amber-600 dark:text-amber-400 font-medium';
    } else {
      resultText.textContent = 'Rp 0';
      statusText.textContent = 'Masukkan jumlah harta untuk menghitung';
      statusText.className = 'text-[10px] text-stone-500';
    }
  }

  function openMaulidFeature() {
    closeMoreFeaturesDrawer();
    const existing = document.getElementById('modalMaulid');
    if (existing) existing.remove();

    const modalHtml = `
    <div id="modalMaulid" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div class="bg-[#FAF7F2] dark:bg-slate-900 rounded-3xl p-5 max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200/80 dark:border-stone-800 space-y-3 animate-scaleUp">
        <div class="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800 shrink-0">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <i data-lucide="book-open" class="w-4 h-4"></i>
            </div>
            <h3 class="text-sm font-extrabold text-stone-900 dark:text-white">Kitab Maulid & Sholawat</h3>
          </div>
          <button onclick="document.getElementById('modalMaulid').remove()" class="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-700">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <div class="overflow-y-auto space-y-2.5 flex-1 pr-1 no-scrollbar">
          <div class="p-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700 space-y-1">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-stone-900 dark:text-white">Maulid Simtudduror</h4>
              <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-800">Habib Ali Al-Habsyi</span>
            </div>
            <p class="font-arabic text-lg text-right text-stone-800 dark:text-stone-100 leading-loose pt-1">يَا رَبِّ صَلِّ عَلَى مُحَمَّدْ مَالاَحَ فِي الأُفْقِ نُورُ كَوْكَبْ</p>
            <p class="text-[10px] text-stone-500 italic">"Ya Rabbi limpahkanlah shalawat atas Nabi Muhammad, selama bintang masih bersinar di ufuk cakrawala."</p>
          </div>

          <div class="p-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700 space-y-1">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-stone-900 dark:text-white">Maulid Ad-Diba'i</h4>
              <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">Imam Ad-Diba'i</span>
            </div>
            <p class="font-arabic text-lg text-right text-stone-800 dark:text-stone-100 leading-loose pt-1">يَا نَبِي سَلَامٌ عَلَيْكَ • يَا رَسُول سَلَامٌ عَلَيْكَ</p>
            <p class="text-[10px] text-stone-500 italic">"Wahai Nabi salam sejahtera untukmu, wahai Rasul salam sejahtera untukmu."</p>
          </div>

          <div class="p-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700 space-y-1">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-stone-900 dark:text-white">Qasidah Al-Burdah</h4>
              <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Imam Al-Bushiri</span>
            </div>
            <p class="font-arabic text-lg text-right text-stone-800 dark:text-stone-100 leading-loose pt-1">مَوْلَايَ صَلِّ وَسَلِّمْ دَائِمًا أَبَدًا • عَلَى حَبِيبِكَ خَيْرِ الْخَلْقِ كُلِّهِمِ</p>
            <p class="text-[10px] text-stone-500 italic">"Wahai Tuhanku, limpahkanlah selalu shalawat dan salam selamanya atas kekasih-Mu makhluk terbaik seluruhnya."</p>
          </div>
        </div>

        <button onclick="document.getElementById('modalMaulid').remove()" class="w-full py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold">
          Tutup
        </button>
      </div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    if (window.lucide) lucide.createIcons();
  }

  function openWarisFeature() {
    closeMoreFeaturesDrawer();
    showToast("Fitur Kalkulator Waris (Faraidh Syar'i) aktif!");
  }

  function openTausiyahFeature() {
    closeMoreFeaturesDrawer();
    showToast("Membuka Tausiyah & Hikmah Harian Islami.co");
  }

  function openTanyaUstadzFeature() {
    closeMoreFeaturesDrawer();
    switchTab('services');
  }
