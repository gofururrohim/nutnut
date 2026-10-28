'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  Apple,
  ArrowDown,
  ArrowUpRight,
  Gift,
  Heart,
  Leaf,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react'

/* UBAH DI SINI: nama, tanggal, semua teks, foto, dan lagu untuk personalisasi. */
const CONFIG = {
  name: 'Nanat',
  sender: 'Gofur',
  age: 17,
  birthdayISO: '2026-10-28',
  birthdayDisplay: 'Rabu, 28 Oktober 2026',
  brand: 'Ultah Nanat',
  brandCaption: 'sweet seventeen',
  navigation: {
    label: 'Navigasi utama',
    links: [
      { href: '#alasan', label: '17 alasan' },
      { href: '#surat', label: 'Surat' },
      { href: '#permainan', label: 'Mini game' },
    ],
  },
  hero: {
    eyebrow: '28 OKTOBER 2026  ·  SWEET SEVENTEEN',
    titleLead: 'Selamat Ulang Tahun ke-',
    description:
      'Hari ini hari spesial kamu. Bertambah satu tahun lagi, bertambah juga cerita yang bakal kamu lewati. Semoga di umur yang baru ini, ada banyak hal baik yang datang ke hidup kamu.',
    cta: 'Ayo, mulai ceritanya!',
    note: 'Satu hari spesial, buat seseorang yang spesial.',
    scrollLabel: 'Gulir pelan-pelan',
    artLabel: 'Ilustrasi apel merah dan daun musim gugur',
    ribbonLabel: 'sweet seventeen',
    littleNote: 'Semoga banyak hal baik menemuimu',
  },
  countdown: {
    eyebrow: 'SIMPAN TANGGAL INI',
    title: 'Satu hari, seribu alasan untuk tersenyum.',
    todayTitle: 'Hari ini harimu!',
    todayCopy: 'Semoga hari ini dipenuhi hal-hal kecil yang bikin kamu bahagia, banyak senyum, dan kenangan yang menyenangkan.',
    futureTitle: 'Menuju hari istimewamu',
    futureCopy: 'Sebentar lagi, satu hari penuh senyum dan cerita baru akan jadi milikmu.',
    pastTitle: 'Hari istimewamu sudah lewat, tapi hangatnya tetap tinggal.',
    pastCopy: 'Semoga kenangan manis dari hari itu terus menemanimu sepanjang tahun.',
    units: ['Hari', 'Jam', 'Menit', 'Detik'],
    dateLabel: '28 Oktober 2026',
    todayDateCaption: 'Hari yang ditunggu',
    pastDateCaption: 'Tanggal istimewa',
  },
  reasons: {
    eyebrow: '17 KECIL, TAPI BERARTI',
    title: '17 Alasan Kenapa Kamu Spesial',
    description: 'Setiap apel menyimpan satu hal kecil yang layak dirayakan. Ketuk untuk membukanya.',
    openLabel: 'Buka alasan',
    closeLabel: 'Tutup alasan',
    cardHint: 'ketuk untuk membuka',
    cardCloseHint: 'ketuk untuk menutup',
    messages: [
      'Cara kamu tersenyum yang sangat manis sekali.',
      'Kamu punya tingkah lucu seperti anak kecil.',
      'Kamu punya rasa peduli yang tinggi untuk membantu orang lain orang lain .',
      'Kamu punya beranian untuk menjadi diri sendiri.',
      'Kmu orang yang baik dalam menjaga hubungan.',
      'Kamu orang yang setia sama temen.',
      'Kamu tetap berusaha meskipun nggak semua hal berjalan sesuai harapan.',
      'Kehadiran kamu bisa bikin hal sederhana jadi lebih menyenangkan.',
      'Kamu mau mendengarkan orang lain dan mencoba memahami mereka.',
      'Kamu bisa menikmati hal-hal sederhana tanpa harus selalu mencari sesuatu yang besar.',
      'Kamu punya mimpi dan keinginan yang layak untuk terus diperjuangkan.',
      'Kamu teman yang baik untuk diajak cerita.',
      'Kamu punya ciri khas yang bikin kamu berbeda dari orang lain.',
      'Kamu tahu cara menikmati momen tanpa harus membuat semuanya jadi rumit.',
      'Kamu terus bertumbuh dan belajar dari berbagai hal yang kamu alami.',
      'Dari kamu, orang lain bisa belajar bahwa hal-hal kecil juga layak disyukuri.',
      'Dan yang terakhir, karena kamu adalah Nanat. Kamu nggak harus jadi orang lain untuk punya nilai lebih.'
    ],
  },
  letter: {
    eyebrow: 'SEPOTONG SURAT',
    title: 'Sebuah surat kecil untukmu.',
    salutation: 'Untuk Nanat,',
    cardEyebrow: 'selembar cerita',
    message:
      'Di umur yang baru ini, semoga makin banyak hal baik yang datang ke hidup kamu. Semoga apa yang kamu impikan bisa tercapai satu per satu, dikelilingi orang-orang yang tulus, dan punya banyak alasan buat bahagia.\n\nTetap jadi diri sendiri, ya. Terus belajar, coba hal-hal baru, dan jangan takut kalau sesekali ada yang nggak berjalan sesuai rencana. Kamu masih punya banyak waktu buat tumbuh dan menemukan hal-hal yang kamu suka.\n\nSelamat ulang tahun, Nanat! Semoga tahun ini jadi tahun yang menyenangkan buat kamu, dengan banyak pengalaman baru dan kenangan yang bisa kamu ingat nanti.',
    signatureLead: 'Dengan hangat,',
    revealButton: 'Lihat surat lengkap',
    finishedLabel: 'Surat selesai dibaca',
  },
  game: {
    eyebrow: 'SELINGAN MANIS',
    title: 'Tangkap Apelnya!',
    description: 'Apel-apel kecil sedang berjatuhan. Tangkap 17 buah sebelum semuanya mendarat!',
    startButton: 'Mulai bermain',
    restartButton: 'Main lagi',
    activeButton: 'Apel sedang berjatuhan…',
    scoreLabel: 'Apel tertangkap',
    stageLabel: 'Area permainan menangkap apel',
    stageHint: 'Tekan tombol untuk mulai',
    catchLabel: 'Tangkap apel yang jatuh',
    winTitle: 'Semua apel tertangkap!',
    winMessage: 'Kamu keren, Nanat. Ada satu kejutan kecil menunggumu di bawah.',
    progressLabel: 'Progres permainan',
  },
  surprise: {
    eyebrow: 'SEBUAH KADO KECIL',
    title: 'Ada satu hal lagi untukmu.',
    description: 'Tarik napas sebentar, lalu buka kado kecil yang sudah disiapkan khusus untuk hari ini.',
    button: 'Buka Kado',
    openedButton: 'Buka lagi',
    openedTitle: 'Selamat bertambah usia, Nanat!',
    openedMessage:
      'Semoga usia 17 membawamu pada banyak tawa, kesempatan baru, dan hari-hari yang terasa seperti rumah. Teruslah bersinar dengan caramu sendiri. Kamu pantas bahagia, hari ini dan seterusnya.',
    close: 'Peluk hangat dari',
  },
  music: {
    /* Ganti dengan path lagu lokal, misalnya /music/lagu-ulang-tahun.mp3. Musik tidak diputar otomatis. */
    source: '/music/ulang-tahun.mp3',
    buttonLabel: 'Musik',
    playLabel: 'Putar musik',
    pauseLabel: 'Jeda musik',
    notConfigured: 'Tambahkan path lagu di CONFIG.music.source untuk mengaktifkan musik.',
    playing: 'Musik sedang diputar.',
    paused: 'Musik dijeda.',
    error: 'Lagu belum bisa diputar. Periksa kembali file musiknya.',
  },
  footer: 'Dibuat dengan 🍎 oleh ',
} as const

const FALLING_DECORATIONS = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  symbol: index % 4 === 0 ? '🍎' : index % 3 === 0 ? '🍂' : '🍃',
  left: (index * 31 + 7) % 100,
  duration: 15 + (index % 5) * 2,
  delay: -((index * 3) % 19),
  size: 15 + (index % 4) * 5,
}))

const CONFETTI_APPLES = Array.from({ length: 38 }, (_, index) => ({
  id: index,
  left: (index * 37 + 5) % 100,
  delay: (index % 9) * 0.09,
  duration: 2.6 + (index % 5) * 0.3,
  size: 13 + (index % 4) * 5,
  rotation: (index * 47) % 360,
}))

const REASON_TONES = ['#c8102e', '#6b8e23', '#8a5736', '#b48a43']

type BirthdayStatus = {
  phase: 'today' | 'future' | 'past'
  days: number
  hours: number
  minutes: number
  seconds: number
}

type FallingApple = {
  id: number
  left: number
  duration: number
  bornAt: number
}

const PAGE_STYLES = String.raw`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&display=swap');

:root {
  color-scheme: light;
  scroll-behavior: smooth;
  --apple: #c8102e;
  --apple-deep: #a80d27;
  --leaf: #6b8e23;
  --cream: #fff8e7;
  --cream-deep: #f7eedb;
  --bark: #5c3a21;
  --gold: #c49a5a;
  --ink: #36291f;
  --muted: #766756;
  --line: rgba(92, 58, 33, 0.14);
  --serif: 'Playfair Display', Georgia, serif;
  --sans: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--cream); color: var(--ink); font-family: var(--sans); }
button, a { font: inherit; }
button { color: inherit; }
button:focus-visible, a:focus-visible { outline: 3px solid var(--gold); outline-offset: 4px; }
::selection { background: rgba(200, 16, 46, 0.16); color: var(--bark); }

.birthday-page {
  --content-width: 1200px;
  min-height: 100vh;
  overflow: clip;
  background: var(--cream);
  color: var(--ink);
  font-family: var(--sans);
}
.birthday-page a { color: inherit; text-decoration: none; }
.birthday-page img { display: block; max-width: 100%; }
.site-header { position: relative; z-index: 5; width: 100%; border-bottom: 1px solid rgba(92, 58, 33, 0.08); }
.header-inner { width: min(var(--content-width), calc(100% - 56px)); min-height: 84px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.brand { display: inline-flex; align-items: center; gap: 11px; min-width: max-content; }
.brand-symbol { width: 40px; height: 40px; display: grid; place-items: center; color: var(--apple); background: rgba(200, 16, 46, 0.08); border-radius: 50%; }
.brand-symbol svg { width: 22px; height: 22px; fill: rgba(200,16,46,.13); stroke-width: 1.8; }
.brand-copy { display: grid; gap: 1px; }
.brand-name { font-family: var(--serif); font-size: 18px; font-weight: 600; letter-spacing: -.02em; }
.brand-caption { color: var(--muted); font-size: 9px; font-weight: 700; letter-spacing: .17em; text-transform: uppercase; }
.main-nav { display: flex; align-items: center; justify-content: center; gap: clamp(18px, 3vw, 40px); }
.main-nav a { position: relative; color: #645647; font-size: 12px; font-weight: 600; transition: color .2s ease; }
.main-nav a::after { position: absolute; right: 0; bottom: -7px; left: 0; height: 1px; background: var(--apple); content: ''; transform: scaleX(0); transform-origin: left; transition: transform .25s ease; }
.main-nav a:hover { color: var(--apple); }
.main-nav a:hover::after { transform: scaleX(1); }
.music-toggle { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 40px; padding: 0 15px; border: 1px solid rgba(92,58,33,.18); border-radius: 99px; background: rgba(255,255,255,.45); color: var(--bark); cursor: pointer; transition: border-color .2s ease, background .2s ease, transform .2s ease; }
.music-toggle:hover { border-color: rgba(200,16,46,.4); background: white; transform: translateY(-1px); }
.music-toggle svg { width: 15px; height: 15px; }
.music-toggle span { font-size: 11px; font-weight: 700; }
.music-status, .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

.hero { position: relative; isolation: isolate; min-height: 645px; display: flex; align-items: center; padding: 64px 0 56px; }
.hero-inner { position: relative; z-index: 1; width: min(var(--content-width), calc(100% - 56px)); margin: 0 auto; display: grid; grid-template-columns: 1.08fr .92fr; align-items: center; gap: 40px; }
.hero-copy { max-width: 610px; padding: 12px 0 24px; }
.eyebrow { display: inline-flex; align-items: center; gap: 10px; color: var(--leaf); font-size: 10px; font-weight: 700; letter-spacing: .19em; line-height: 1.6; text-transform: uppercase; }
.eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 4px rgba(196,154,90,.12); }
.hero h1 { max-width: 640px; margin: 22px 0 18px; color: var(--bark); font-family: var(--serif); font-size: clamp(43px, 6.2vw, 77px); font-weight: 500; letter-spacing: -.055em; line-height: 1.06; }
.hero h1 .hero-title-lead { display: block; max-width: 600px; font-size: .67em; letter-spacing: -.045em; line-height: 1.2; }
.hero h1 em { color: var(--apple); font-weight: 600; }
.hero-apple-emoji { display: inline-block; font-family: var(--sans); font-size: .55em; vertical-align: .08em; transform: rotate(-10deg); }
.hero-description { max-width: 480px; margin: 0; color: var(--muted); font-size: 15px; line-height: 1.8; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 21px; margin-top: 30px; }
.button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 0 20px; border: 1px solid transparent; border-radius: 99px; font-size: 12px; font-weight: 700; cursor: pointer; transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
.button:hover { transform: translateY(-2px); }
.button svg { width: 15px; height: 15px; }
.button-primary { background: var(--apple); box-shadow: 0 10px 22px rgba(200,16,46,.16); color: white !important; }
.button-primary:hover { background: var(--apple-deep); box-shadow: 0 14px 26px rgba(200,16,46,.23); }
.hero-note { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 11px; }
.hero-note svg { width: 15px; height: 15px; color: var(--apple); stroke-width: 1.7; }
.hero-art { position: relative; min-height: 445px; display: grid; place-items: center; }
.hero-halo { position: absolute; width: min(38vw, 410px); aspect-ratio: 1; border: 1px solid rgba(196,154,90,.27); border-radius: 50%; background: radial-gradient(circle, rgba(196,154,90,.16) 0%, rgba(196,154,90,.06) 47%, transparent 72%); }
.hero-halo::before, .hero-halo::after { position: absolute; inset: 8%; border: 1px dashed rgba(107,142,35,.19); border-radius: 50%; content: ''; }
.hero-halo::after { inset: 17%; border-style: solid; border-color: rgba(200,16,46,.1); }
.hero-fruit-wrap { position: relative; z-index: 1; width: min(300px, 68%); display: grid; place-items: center; transform: rotate(-4deg); animation: apple-breathe 5s ease-in-out infinite; }
.hero-apple { width: 100%; height: auto; color: #7f1625; fill: var(--apple); stroke: #8e1b2a; stroke-width: .7; filter: drop-shadow(0 25px 24px rgba(92,58,33,.19)); }
.hero-apple-leaf { position: absolute; top: 2%; right: 24%; width: 54px; height: 54px; color: var(--leaf); fill: #8aa64a; stroke-width: 1.4; transform: rotate(-29deg); }
.hero-shine { position: absolute; top: 38%; left: 21%; width: 25px; height: 72px; border-radius: 50%; background: rgba(255,248,231,.33); filter: blur(6px); transform: rotate(25deg); }
.hero-ribbon { position: absolute; z-index: 2; right: 2%; bottom: 11%; width: 132px; padding: 12px 14px; border: 1px solid rgba(92,58,33,.09); border-radius: 16px; background: rgba(255,248,231,.9); box-shadow: 0 14px 36px rgba(92,58,33,.1); transform: rotate(5deg); }
.hero-ribbon span { display: block; color: var(--muted); font-size: 9px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.hero-ribbon strong { display: block; margin-top: 3px; color: var(--apple); font-family: var(--serif); font-size: 31px; font-weight: 600; line-height: 1; }
.hero-ribbon small { display: block; margin-top: 5px; color: var(--bark); font-size: 10px; }
.hero-sticker { position: absolute; z-index: 2; top: 11%; left: 2%; width: 100px; height: 100px; display: grid; place-items: center; border: 1px solid rgba(107,142,35,.23); border-radius: 50%; background: rgba(255,248,231,.82); color: var(--leaf); transform: rotate(-9deg); }
.hero-sticker span { max-width: 68px; font-family: var(--serif); font-size: 12px; font-style: italic; line-height: 1.3; text-align: center; }
.hero-sticker svg { position: absolute; top: 14px; right: 15px; width: 15px; height: 15px; }
.hero-bottomline { position: absolute; right: 0; bottom: 16px; left: 0; display: flex; align-items: center; justify-content: center; gap: 8px; color: #8c7b66; font-size: 10px; letter-spacing: .11em; text-transform: uppercase; }
.hero-bottomline svg { width: 13px; height: 13px; animation: nudge-down 1.8s ease-in-out infinite; }
.falling-layer { position: absolute; z-index: 0; inset: 0; overflow: hidden; pointer-events: none; }
.falling-particle { position: absolute; top: -55px; display: block; opacity: .56; animation-name: fall-gently; animation-timing-function: linear; animation-iteration-count: infinite; filter: saturate(.78); }

.section { position: relative; padding: 104px 0; }
.section-inner { width: min(var(--content-width), calc(100% - 56px)); margin: 0 auto; }
.section-heading { max-width: 680px; margin: 0 auto 47px; text-align: center; }
.section-heading .eyebrow { justify-content: center; }
.section-heading h2 { margin: 13px 0 13px; color: var(--bark); font-family: var(--serif); font-size: clamp(34px, 4.6vw, 52px); font-weight: 500; letter-spacing: -.045em; line-height: 1.14; }
.section-heading p { max-width: 520px; margin: 0 auto; color: var(--muted); font-size: 14px; line-height: 1.8; }

.countdown-section { padding: 40px 0 62px; }
.countdown-panel { width: min(var(--content-width), calc(100% - 56px)); margin: 0 auto; padding: 34px clamp(23px, 5vw, 58px); display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 30px; border: 1px solid rgba(92,58,33,.11); border-radius: 24px; background: linear-gradient(105deg, rgba(247,238,219,.92), rgba(255,255,255,.54)); }
.countdown-copy .eyebrow { margin-bottom: 10px; }
.countdown-copy h2 { margin: 0 0 8px; color: var(--bark); font-family: var(--serif); font-size: clamp(23px, 3vw, 34px); font-weight: 500; letter-spacing: -.035em; }
.countdown-copy p { max-width: 560px; margin: 0; color: var(--muted); font-size: 12px; line-height: 1.7; }
.countdown-date { display: flex; align-items: center; gap: 14px; min-width: 222px; padding-left: 27px; border-left: 1px solid var(--line); }
.countdown-fruit { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; background: rgba(200,16,46,.08); color: var(--apple); }
.countdown-fruit svg { width: 24px; height: 24px; fill: rgba(200,16,46,.15); }
.countdown-date-label { display: grid; gap: 4px; }
.countdown-date-label span:first-child { color: var(--muted); font-size: 9px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.countdown-date-label strong { color: var(--bark); font-family: var(--serif); font-size: 17px; font-weight: 600; }
.countdown-timer { display: flex; align-items: center; gap: 8px; }
.timer-unit { min-width: 58px; text-align: center; }
.timer-unit strong { display: block; color: var(--apple); font-family: var(--serif); font-size: 27px; font-weight: 600; line-height: 1; }
.timer-unit span { display: block; margin-top: 5px; color: var(--muted); font-size: 9px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; }
.timer-divider { color: var(--gold); font-family: var(--serif); font-size: 24px; }

.reasons-section { background: linear-gradient(180deg, rgba(247,238,219,.47), transparent 40%); }
.reason-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 23px; }
.reason-card-shell { position: relative; width: 100%; aspect-ratio: .92; padding: 0; border: 0; border-radius: 0; background: transparent; cursor: pointer; perspective: 1000px; transition: transform .24s ease; }
.reason-card-shell:hover { transform: translateY(-5px); }
.reason-card-inner { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform .72s cubic-bezier(.2,.8,.2,1); }
.reason-card-shell[aria-pressed='true'] .reason-card-inner { transform: rotateY(180deg); }
.reason-face { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(92,58,33,.12); border-radius: 47% 47% 42% 42% / 38% 38% 58% 58%; backface-visibility: hidden; box-shadow: 0 12px 30px rgba(92,58,33,.07); }
.reason-front { background: linear-gradient(155deg, #fffdf7 2%, #f6ead7 100%); }
.reason-front::before { position: absolute; top: -6px; left: 51%; width: 32px; height: 31px; border-left: 1px solid rgba(92,58,33,.11); border-radius: 0 0 55% 55%; background: var(--cream); content: ''; transform: translateX(-50%) rotate(11deg); }
.reason-card-shell:nth-child(4n + 1) .reason-front { background: linear-gradient(145deg, #fffaf0, #f3e5d1); }
.reason-card-shell:nth-child(4n + 2) .reason-front { background: linear-gradient(145deg, #f8f2e3, #e8edda); }
.reason-card-shell:nth-child(4n + 3) .reason-front { background: linear-gradient(145deg, #fff8e7, #f3e1d4); }
.reason-card-shell:nth-child(4n) .reason-front { background: linear-gradient(145deg, #fffaf1, #f4ead6); }
.reason-number { position: absolute; top: 24%; color: rgba(92,58,33,.45); font-size: 9px; font-weight: 700; letter-spacing: .19em; }
.reason-front-apple { width: 43px; height: 43px; margin-top: 14px; color: var(--apple); fill: rgba(200,16,46,.12); stroke-width: 1.25; }
.reason-leaf { position: absolute; top: 16%; right: 31%; width: 20px; height: 20px; color: var(--leaf); stroke-width: 1.6; transform: rotate(-27deg); }
.reason-front-hint { position: absolute; bottom: 23%; color: #8c7b67; font-size: 9px; font-weight: 600; letter-spacing: .04em; }
  .reason-back { padding: 0; border-color: rgba(255,255,255,.25); background: var(--reason-tone); color: var(--cream); transform: rotateY(180deg); }
  .reason-back::before { position: absolute; inset: 8px; border: 1px solid rgba(255,248,231,.27); border-radius: inherit; content: ''; }
  .reason-back p { position: absolute; top: 58%; left: 50%; z-index: 1; width: calc(100% - 46px); margin: 0; font-family: var(--serif); font-size: clamp(13px, 1.55vw, 18px); line-height: 1.34; text-align: center; transform: translate(-50%, -50%); }
  .reason-back svg { position: absolute; top: 15%; left: 50%; z-index: 1; width: 18px; height: 18px; color: rgba(255,248,231,.82); transform: translateX(-50%); }

.letter-section { overflow: hidden; background: radial-gradient(ellipse at 15% 40%, rgba(196,154,90,.1), transparent 33%), var(--cream); }
.letter-section::before { position: absolute; top: 20%; right: -50px; width: 240px; height: 240px; border: 1px solid rgba(107,142,35,.15); border-radius: 50%; content: ''; }
.letter-section::after { position: absolute; top: 22%; right: -29px; width: 198px; height: 198px; border: 1px dashed rgba(200,16,46,.12); border-radius: 50%; content: ''; }
.letter-card { position: relative; z-index: 1; width: min(790px, 100%); margin: 0 auto; padding: clamp(28px, 5vw, 56px) clamp(25px, 7vw, 78px); border: 1px solid rgba(92,58,33,.14); border-radius: 7px 22px 7px 22px; background-color: rgba(255,253,247,.94); background-image: repeating-linear-gradient(transparent, transparent 38px, rgba(92,58,33,.075) 39px, transparent 40px); box-shadow: 0 22px 60px rgba(92,58,33,.1); transform: rotate(-.7deg); }
.letter-card::before { position: absolute; top: 0; right: 24px; width: 43px; height: 52px; background: var(--apple); clip-path: polygon(0 0,100% 0,100% 100%,50% 74%,0 100%); content: ''; opacity: .88; }
.letter-card-top { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding-right: 42px; }
.letter-card-top .eyebrow { font-size: 9px; }
.letter-date { color: #927d64; font-size: 10px; letter-spacing: .07em; }
.letter-to { margin: 35px 0 12px; color: var(--apple); font-family: var(--serif); font-size: 24px; font-style: italic; }
.letter-copy { min-height: 190px; margin: 0; color: #574636; font-size: 13px; line-height: 2.45; white-space: pre-wrap; }
.typewriter-cursor { display: inline-block; width: 1px; height: 15px; margin-left: 2px; background: var(--apple); vertical-align: -2px; animation: cursor-blink 1s step-end infinite; }
.letter-signature { margin-top: 23px; color: var(--muted); font-family: var(--serif); font-size: 14px; font-style: italic; }
.letter-signature strong { display: block; margin-top: 4px; color: var(--bark); font-size: 24px; font-style: normal; }
.letter-actions { display: flex; justify-content: flex-end; margin-top: 20px; }
.letter-actions button { display: inline-flex; align-items: center; gap: 7px; padding: 8px 0; border: 0; background: transparent; color: var(--apple); font-size: 11px; font-weight: 700; cursor: pointer; }
.letter-actions svg { width: 14px; height: 14px; }

.game-section { overflow: hidden; background: #43572c; color: var(--cream); }
.game-section .section-inner { position: relative; z-index: 1; }
.game-layout { display: grid; grid-template-columns: .8fr 1.2fr; align-items: center; gap: clamp(32px, 7vw, 88px); }
.game-copy .eyebrow { color: #e4c58d; }
.game-copy h2 { max-width: 440px; margin: 14px 0 13px; color: var(--cream); font-family: var(--serif); font-size: clamp(38px, 5vw, 59px); font-weight: 500; letter-spacing: -.045em; line-height: 1.05; }
.game-copy > p { max-width: 385px; margin: 0; color: rgba(255,248,231,.75); font-size: 13px; line-height: 1.8; }
.game-score-card { margin-top: 27px; max-width: 340px; padding: 16px 18px; border: 1px solid rgba(255,248,231,.2); border-radius: 16px; background: rgba(255,248,231,.08); }
.game-score-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: rgba(255,248,231,.82); font-size: 10px; font-weight: 600; }
.game-score-top strong { color: var(--cream); font-family: var(--serif); font-size: 20px; font-weight: 600; }
.game-progress { height: 5px; overflow: hidden; margin-top: 12px; border-radius: 99px; background: rgba(255,248,231,.17); }
.game-progress span { display: block; height: 100%; border-radius: inherit; background: #e7bd72; transition: width .3s ease; }
.game-action { margin-top: 19px; }
.game-action button { min-width: 168px; }
.game-win-copy { max-width: 350px; margin-top: 16px !important; color: #f2d39d !important; font-family: var(--serif); font-size: 16px !important; }
.game-stage { position: relative; min-height: 348px; overflow: hidden; border: 1px solid rgba(255,248,231,.28); border-radius: 26px; background: linear-gradient(165deg, #fff9e9, #f3e7d0); box-shadow: 0 24px 50px rgba(28,39,22,.2); --fall-distance: 350px; }
.game-stage::before, .game-stage::after { position: absolute; right: -42px; bottom: -90px; width: 230px; height: 180px; border: 1px solid rgba(107,142,35,.14); border-radius: 50%; content: ''; }
.game-stage::after { right: auto; bottom: -120px; left: -37px; width: 200px; height: 180px; border-color: rgba(200,16,46,.1); }
.stage-ground { position: absolute; z-index: 1; right: 0; bottom: 0; left: 0; height: 28px; border-top: 1px solid rgba(92,58,33,.1); background: linear-gradient(180deg, rgba(247,238,219,.15), rgba(196,154,90,.11)); }
.stage-invite, .stage-win { position: absolute; z-index: 2; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px; text-align: center; }
.stage-invite svg { width: 40px; height: 40px; margin-bottom: 11px; color: var(--apple); fill: rgba(200,16,46,.12); stroke-width: 1.2; }
.stage-invite strong, .stage-win strong { color: var(--bark); font-family: var(--serif); font-size: 21px; font-weight: 600; }
.stage-invite span { margin-top: 7px; color: #8b7962; font-size: 11px; }
.game-apple { position: absolute; z-index: 3; top: 6px; display: grid; width: 54px; height: 54px; place-items: center; padding: 4px; border: 0; background: transparent; cursor: pointer; animation: game-apple-fall var(--fall-time) linear forwards; filter: drop-shadow(0 7px 5px rgba(92,58,33,.18)); }
.game-apple svg { width: 40px; height: 40px; fill: var(--apple); color: #8f182a; stroke-width: .9; transition: transform .16s ease; }
.game-apple:hover svg { transform: scale(1.18) rotate(-9deg); }
.stage-win { z-index: 4; background: rgba(255,248,231,.94); animation: fade-up .45s ease both; }
.stage-win svg { width: 45px; height: 45px; margin-bottom: 8px; color: var(--apple); fill: rgba(200,16,46,.15); }
.stage-win p { max-width: 310px; margin: 8px 0 0; color: var(--muted); font-size: 12px; line-height: 1.65; }

.gift-section { padding: 106px 0 98px; background: #fffaf0; }
.gift-card { position: relative; width: min(900px, 100%); min-height: 280px; margin: 0 auto; padding: clamp(28px, 6vw, 62px); display: grid; grid-template-columns: 160px 1fr; align-items: center; gap: clamp(25px, 6vw, 65px); overflow: hidden; border: 1px solid rgba(92,58,33,.12); border-radius: 28px; background: linear-gradient(120deg, #f6ecd9, #fffdf6); box-shadow: 0 18px 46px rgba(92,58,33,.07); }
.gift-card::after { position: absolute; right: -54px; bottom: -93px; width: 240px; height: 240px; border: 1px solid rgba(107,142,35,.13); border-radius: 50%; content: ''; }
.gift-art { position: relative; width: 140px; height: 140px; display: grid; place-items: center; border: 1px solid rgba(200,16,46,.16); border-radius: 50%; background: rgba(255,248,231,.72); }
.gift-art::before, .gift-art::after { position: absolute; inset: 11px; border: 1px dashed rgba(196,154,90,.42); border-radius: 50%; content: ''; }
.gift-art::after { inset: 24px; border-style: solid; border-color: rgba(107,142,35,.14); }
.gift-art svg { position: relative; z-index: 1; width: 53px; height: 53px; color: var(--apple); stroke-width: 1.1; }
.gift-copy { position: relative; z-index: 1; }
.gift-copy .eyebrow { margin-bottom: 9px; }
.gift-copy h2 { margin: 0 0 11px; color: var(--bark); font-family: var(--serif); font-size: clamp(31px, 4vw, 44px); font-weight: 500; letter-spacing: -.04em; line-height: 1.15; }
.gift-copy > p { max-width: 560px; margin: 0; color: var(--muted); font-size: 13px; line-height: 1.8; }
.gift-button { margin-top: 20px; }
.gift-reveal { max-width: 600px; margin-top: 21px; padding: 16px 18px; border-left: 2px solid var(--gold); background: rgba(255,255,255,.56); animation: fade-up .4s ease both; }
.gift-reveal h3 { margin: 0 0 7px; color: var(--apple); font-family: var(--serif); font-size: 20px; font-weight: 600; }
.gift-reveal p { margin: 0; color: #645342; font-size: 12px; line-height: 1.8; }
.gift-signoff { display: block; margin-top: 11px; color: var(--bark); font-family: var(--serif); font-size: 15px; font-style: italic; }
.site-footer { padding: 25px 28px 33px; border-top: 1px solid rgba(92,58,33,.1); background: #fffaf0; text-align: center; }
.site-footer p { margin: 0; color: #796957; font-size: 11px; letter-spacing: .04em; }
.site-footer span { color: var(--apple); }
.site-footer a { color: var(--bark); font-weight: 700; }

.confetti-layer { position: fixed; z-index: 20; inset: 0; overflow: hidden; pointer-events: none; }
.confetti-apple { position: absolute; top: -44px; display: block; animation: apple-confetti var(--confetti-duration) cubic-bezier(.18,.55,.44,.99) var(--confetti-delay) both; filter: drop-shadow(0 3px 2px rgba(92,58,33,.13)); }
.reveal { opacity: 1; transform: none; }
body[data-scroll-reveal='true'] .reveal { opacity: 0; transform: translateY(22px); transition: opacity .75s ease, transform .75s cubic-bezier(.22,.61,.36,1); }
body[data-scroll-reveal='true'] .reveal.is-visible { opacity: 1; transform: translateY(0); }
  .reason-card-shell.reveal { transition: opacity .75s ease, transform .28s ease; }
  .reason-card-shell.reveal.is-visible { transition: opacity .75s ease, transform .28s ease; }


@keyframes apple-breathe { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-12px) rotate(-1deg); } }
@keyframes nudge-down { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
@keyframes fall-gently { 0% { transform: translate3d(0,-40px,0) rotate(-20deg); opacity: 0; } 12% { opacity: .55; } 83% { opacity: .5; } 100% { transform: translate3d(42px,720px,0) rotate(210deg); opacity: 0; } }
@keyframes cursor-blink { 50% { opacity: 0; } }
@keyframes fade-up { from { opacity: 0; transform: translateY(13px); } to { opacity: 1; transform: translateY(0); } }
@keyframes game-apple-fall { from { transform: translate3d(0,0,0) rotate(-12deg); } to { transform: translate3d(0,var(--fall-distance),0) rotate(210deg); opacity: .38; } }
@keyframes apple-confetti { 0% { transform: translate3d(0,-20px,0) rotate(0); opacity: 0; } 9% { opacity: 1; } 100% { transform: translate3d(32px,110vh,0) rotate(540deg); opacity: .82; } }

@media (max-width: 900px) {
  .header-inner, .hero-inner, .section-inner, .countdown-panel { width: min(var(--content-width), calc(100% - 40px)); }
  .hero { min-height: 600px; }
  .hero-inner { grid-template-columns: 1fr .82fr; gap: 15px; }
  .hero-art { min-height: 390px; }
  .hero-halo { width: 36vw; }
  .hero-ribbon { right: -1%; }
  .reason-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
  .game-layout { grid-template-columns: .86fr 1.14fr; gap: 35px; }
  .game-stage { min-height: 330px; --fall-distance: 330px; }
}
@media (max-width: 700px) {
  .header-inner { min-height: 69px; width: calc(100% - 32px); gap: 8px 12px; flex-wrap: wrap; padding: 10px 0 8px; }
  .brand-symbol { width: 36px; height: 36px; }
  .brand-name { font-size: 16px; }
  .brand-caption { font-size: 8px; }
  .main-nav { order: 3; width: 100%; display: flex; justify-content: space-between; gap: 14px; overflow-x: auto; padding-top: 4px; scrollbar-width: none; }
  .main-nav::-webkit-scrollbar { display: none; }
  .main-nav a { font-size: 10px; white-space: nowrap; }
  .music-toggle { order: 2; min-height: 37px; gap: 6px; padding: 0 12px; }
  .music-toggle span { font-size: 10px; }
  .hero { min-height: initial; padding: 49px 0 52px; }
  .hero-inner { width: calc(100% - 38px); grid-template-columns: 1fr; gap: 0; }
  .hero-copy { padding: 0; }
  .hero h1 { margin: 17px 0 14px; font-size: clamp(43px, 12vw, 64px); }
  .hero h1 .hero-title-lead { max-width: 500px; font-size: .61em; }
  .hero-description { max-width: 420px; font-size: 13px; }
  .hero-actions { gap: 15px; margin-top: 23px; }
  .button { min-height: 45px; padding: 0 17px; }
  .hero-art { min-height: 320px; margin-top: 10px; }
  .hero-halo { width: min(72vw, 300px); }
  .hero-fruit-wrap { width: min(230px, 62%); }
  .hero-ribbon { right: 4%; bottom: 5%; width: 118px; }
  .hero-sticker { top: 8%; left: 5%; width: 82px; height: 82px; }
  .hero-sticker span { font-size: 10px; }
  .hero-sticker svg { top: 10px; right: 12px; }
  .hero-bottomline { bottom: 9px; font-size: 9px; }
  .section { padding: 78px 0; }
  .section-inner { width: calc(100% - 38px); }
  .section-heading { margin-bottom: 34px; }
  .section-heading h2 { font-size: clamp(33px, 9vw, 43px); }
  .section-heading p { font-size: 12px; }
  .countdown-section { padding: 23px 0 40px; }
  .countdown-panel { width: calc(100% - 38px); grid-template-columns: 1fr; gap: 20px; padding: 25px 22px; border-radius: 20px; }
  .countdown-copy h2 { font-size: 26px; }
  .countdown-date { min-width: 0; padding: 17px 0 0; border-top: 1px solid var(--line); border-left: 0; }
  .countdown-timer { justify-content: flex-start; }
  .timer-unit { min-width: 49px; }
  .timer-unit strong { font-size: 24px; }
  .reason-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 15px; }
  .reason-face { border-radius: 47% 47% 41% 41% / 37% 37% 57% 57%; }
  .reason-back { padding: 0; }
  .reason-back p { top: 58%; font-size: 12.5px; line-height: 1.32; }
  .reason-number { top: 23%; }
  .reason-front-hint { bottom: 20%; font-size: 8px; }
  .letter-section::before { top: 14%; right: -160px; }
  .letter-section::after { top: 16%; right: -140px; }
  .letter-card { padding: 29px 24px 27px; border-radius: 5px 18px 5px 18px; transform: rotate(-.35deg); }
  .letter-card::before { right: 17px; width: 35px; height: 43px; }
  .letter-card-top { padding-right: 34px; }
  .letter-card-top .eyebrow { font-size: 8px; letter-spacing: .13em; }
  .letter-date { font-size: 9px; }
  .letter-to { margin-top: 27px; font-size: 22px; }
  .letter-copy { min-height: 240px; font-size: 12px; line-height: 2.35; }
  .game-layout { grid-template-columns: 1fr; gap: 28px; }
  .game-copy h2 { font-size: 44px; }
  .game-copy > p { font-size: 12px; }
  .game-score-card { max-width: none; }
  .game-stage { min-height: 278px; --fall-distance: 278px; border-radius: 21px; }
  .gift-section { padding: 78px 0 72px; }
  .gift-card { grid-template-columns: 1fr; justify-items: center; gap: 25px; padding: 32px 24px; border-radius: 22px; text-align: center; }
  .gift-art { width: 119px; height: 119px; }
  .gift-art svg { width: 45px; height: 45px; }
  .gift-copy .eyebrow { justify-content: center; }
  .gift-copy h2 { font-size: 34px; }
  .gift-copy > p { font-size: 12px; }
  .gift-reveal { text-align: left; }
}
@media (max-width: 380px) {
  .hero-inner, .section-inner, .countdown-panel { width: calc(100% - 30px); }
  .hero h1 { font-size: 40px; }
  .hero h1 .hero-title-lead { font-size: .58em; }
  .hero-note { max-width: 160px; font-size: 10px; line-height: 1.5; }
  .reason-back { padding: 18px 12px; }
  .reason-back p { font-size: 12px; line-height: 1.3; }
  .reason-front-hint { font-size: 7px; }
  .letter-card { padding-right: 19px; padding-left: 19px; }
  .letter-card-top { gap: 9px; }
  .letter-date { font-size: 8px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  body[data-scroll-reveal='true'] .reveal { opacity: 1; transform: none; }
}
`

function getBirthdayStatus(): BirthdayStatus {
  const [year, month, day] = CONFIG.birthdayISO.split('-').map(Number)
  const now = new Date()
  const birthday = new Date(year, month - 1, day)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dayDifference = birthday.getTime() - today.getTime()

  if (dayDifference === 0) {
    return { phase: 'today', days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  if (dayDifference < 0) {
    return { phase: 'past', days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const remainingSeconds = Math.max(0, Math.floor((birthday.getTime() - now.getTime()) / 1000))
  return {
    phase: 'future',
    days: Math.floor(remainingSeconds / 86400),
    hours: Math.floor((remainingSeconds % 86400) / 3600),
    minutes: Math.floor((remainingSeconds % 3600) / 60),
    seconds: remainingSeconds % 60,
  }
}

export default function BirthdayPage() {
  const [flippedReasons, setFlippedReasons] = useState<Set<number>>(() => new Set())
  const [birthdayStatus, setBirthdayStatus] = useState<BirthdayStatus>({
    phase: 'today',
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [letterStarted, setLetterStarted] = useState(false)
  const [letterComplete, setLetterComplete] = useState(false)
  const [typedLetter, setTypedLetter] = useState('')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicStatus, setMusicStatus] = useState('')
  const [gameActive, setGameActive] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [fallingApples, setFallingApples] = useState<FallingApple[]>([])
  const [surpriseOpen, setSurpriseOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const letterRef = useRef<HTMLElement | null>(null)
  const confettiTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const updateBirthdayStatus = () => setBirthdayStatus(getBirthdayStatus())
    updateBirthdayStatus()
    const interval = window.setInterval(updateBirthdayStatus, 1000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

    document.body.dataset.scrollReveal = 'true'
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
      delete document.body.dataset.scrollReveal
    }
  }, [])

  useEffect(() => {
    const letterSection = letterRef.current
    if (!letterSection || letterStarted) return

    if (!('IntersectionObserver' in window)) {
      setLetterStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLetterStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(letterSection)
    return () => observer.disconnect()
  }, [letterStarted])

  useEffect(() => {
    if (!letterStarted || letterComplete) return

    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setTypedLetter(CONFIG.letter.message.slice(0, index))
      if (index >= CONFIG.letter.message.length) {
        window.clearInterval(interval)
        setLetterComplete(true)
      }
    }, 19)

    return () => window.clearInterval(interval)
  }, [letterStarted, letterComplete])

  useEffect(() => {
    if (!gameActive) return

    const spawnApple = () => {
      const now = Date.now()
      setFallingApples((current) => {
        const stillFalling = current.filter((apple) => now - apple.bornAt < apple.duration + 100)
        const nextApple: FallingApple = {
          id: now + Math.random(),
          left: 7 + Math.random() * 84,
          duration: 2550 + Math.random() * 650,
          bornAt: now,
        }
        return [...stillFalling, nextApple].slice(-7)
      })
    }

    spawnApple()
    const interval = window.setInterval(spawnApple, 780)
    return () => window.clearInterval(interval)
  }, [gameActive])

  useEffect(
    () => () => {
      if (confettiTimeoutRef.current !== null) window.clearTimeout(confettiTimeoutRef.current)
    },
    [],
  )

  function launchConfetti() {
    setShowConfetti(true)
    if (confettiTimeoutRef.current !== null) window.clearTimeout(confettiTimeoutRef.current)
    confettiTimeoutRef.current = window.setTimeout(() => setShowConfetti(false), 4400)
  }

  function toggleReason(index: number) {
    setFlippedReasons((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  async function toggleMusic() {
    if (!CONFIG.music.source) {
      setMusicStatus(CONFIG.music.notConfigured)
      return
    }

    const audio = audioRef.current
    if (!audio) return

    if (musicPlaying) {
      audio.pause()
      setMusicPlaying(false)
      setMusicStatus(CONFIG.music.paused)
      return
    }

    try {
      await audio.play()
      setMusicPlaying(true)
      setMusicStatus(CONFIG.music.playing)
    } catch {
      setMusicStatus(CONFIG.music.error)
    }
  }

  function startGame() {
    setGameScore(0)
    setGameWon(false)
    setFallingApples([])
    setGameActive(true)
  }

  function catchApple(id: number) {
    if (!gameActive) return
    const wasFalling = fallingApples.some((apple) => apple.id === id)
    if (!wasFalling) return

    setFallingApples((current) => current.filter((apple) => apple.id !== id))
    const nextScore = gameScore + 1
    setGameScore(nextScore)

    if (nextScore >= CONFIG.age) {
      setGameActive(false)
      setFallingApples([])
      setGameWon(true)
      launchConfetti()
    }
  }

  const countdownTitle =
    birthdayStatus.phase === 'today'
      ? CONFIG.countdown.todayTitle
      : birthdayStatus.phase === 'future'
        ? CONFIG.countdown.futureTitle
        : CONFIG.countdown.pastTitle
  const countdownDescription =
    birthdayStatus.phase === 'today'
      ? CONFIG.countdown.todayCopy
      : birthdayStatus.phase === 'future'
        ? CONFIG.countdown.futureCopy
        : CONFIG.countdown.pastCopy
  const timerValues = [
    birthdayStatus.days,
    birthdayStatus.hours,
    birthdayStatus.minutes,
    birthdayStatus.seconds,
  ]

  return (
    <div className="birthday-page" id="atas">
      <style>{PAGE_STYLES}</style>

      {showConfetti && (
        <div className="confetti-layer" aria-hidden="true">
          {CONFETTI_APPLES.map((apple) => (
            <span
              className="confetti-apple"
              key={apple.id}
              style={
                {
                  left: `${apple.left}%`,
                  fontSize: `${apple.size}px`,
                  '--confetti-delay': `${apple.delay}s`,
                  '--confetti-duration': `${apple.duration}s`,
                  '--confetti-rotation': `${apple.rotation}deg`,
                } as CSSProperties
              }
            >
              🍎
            </span>
          ))}
        </div>
      )}

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#atas" aria-label={`${CONFIG.brand} — ${CONFIG.name}`}>
            <span className="brand-symbol"><Apple aria-hidden="true" /></span>
            <span className="brand-copy">
              <span className="brand-name">{CONFIG.brand}</span>
              <span className="brand-caption">{CONFIG.brandCaption}</span>
            </span>
          </a>

          <nav className="main-nav" aria-label={CONFIG.navigation.label}>
            {CONFIG.navigation.links.map((link) => (
              <a href={link.href} key={link.href}>{link.label}</a>
            ))}
          </nav>

          <button
            className="music-toggle"
            type="button"
            onClick={toggleMusic}
            aria-label={musicPlaying ? CONFIG.music.pauseLabel : CONFIG.music.playLabel}
            aria-pressed={musicPlaying}
            title={CONFIG.music.source ? CONFIG.music.buttonLabel : CONFIG.music.notConfigured}
          >
            {musicPlaying ? <Pause aria-hidden="true" /> : CONFIG.music.source ? <Play aria-hidden="true" /> : <Music2 aria-hidden="true" />}
            <span>{musicPlaying ? CONFIG.music.pauseLabel : CONFIG.music.buttonLabel}</span>
          </button>
          <audio
            ref={audioRef}
            src={CONFIG.music.source || undefined}
            preload="none"
            loop
            onPause={() => setMusicPlaying(false)}
            onError={() => {
              setMusicPlaying(false)
              setMusicStatus(CONFIG.music.error)
            }}
          />
          <p className="music-status" role="status" aria-live="polite">{musicStatus}</p>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="falling-layer" aria-hidden="true">
            {FALLING_DECORATIONS.map((item) => (
              <span
                className="falling-particle"
                key={item.id}
                style={{
                  left: `${item.left}%`,
                  fontSize: `${item.size}px`,
                  animationDuration: `${item.duration}s`,
                  animationDelay: `${item.delay}s`,
                }}
              >
                {item.symbol}
              </span>
            ))}
          </div>

          <div className="hero-inner">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="eyebrow-dot" />{CONFIG.hero.eyebrow}</div>
              <h1 id="hero-title">
                <span className="hero-title-lead">{CONFIG.hero.titleLead}{CONFIG.age},</span>
                <em>{CONFIG.name}!</em> <span className="hero-apple-emoji" aria-label="apel">🍎</span>
              </h1>
              <p className="hero-description">{CONFIG.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#alasan">
                  {CONFIG.hero.cta}<ArrowDown aria-hidden="true" />
                </a>
                <span className="hero-note"><Heart aria-hidden="true" />{CONFIG.hero.note}</span>
              </div>
            </div>

            <div className="hero-art reveal" role="img" aria-label={CONFIG.hero.artLabel}>
              <div className="hero-halo" />
              <div className="hero-sticker"><span>{CONFIG.hero.littleNote}</span><Sparkles aria-hidden="true" /></div>
              <div className="hero-fruit-wrap">
                <Apple className="hero-apple" aria-hidden="true" />
                <Leaf className="hero-apple-leaf" aria-hidden="true" />
                <span className="hero-shine" />
              </div>
              <div className="hero-ribbon">
                <span>{CONFIG.hero.ribbonLabel}</span>
                <strong>{CONFIG.age}</strong>
                <small>{CONFIG.birthdayDisplay}</small>
              </div>
            </div>
          </div>
          <div className="hero-bottomline"><span>{CONFIG.hero.scrollLabel}</span><ArrowDown aria-hidden="true" /></div>
        </section>

        <section className="countdown-section" aria-labelledby="countdown-title">
          <div className="countdown-panel reveal">
            <div className="countdown-copy">
              <span className="eyebrow"><span className="eyebrow-dot" />{CONFIG.countdown.eyebrow}</span>
              <h2 id="countdown-title">{countdownTitle}</h2>
              <p>{countdownDescription}</p>
            </div>
            {birthdayStatus.phase === 'future' ? (
              <div className="countdown-timer" aria-label={CONFIG.countdown.futureTitle}>
                {timerValues.map((value, index) => (
                  <div className="timer-unit" key={CONFIG.countdown.units[index]}>
                    <strong>{String(value).padStart(2, '0')}</strong>
                    <span>{CONFIG.countdown.units[index]}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="countdown-date">
                <span className="countdown-fruit"><Apple aria-hidden="true" /></span>
                <span className="countdown-date-label">
                  <span>{birthdayStatus.phase === 'today' ? CONFIG.countdown.todayDateCaption : CONFIG.countdown.pastDateCaption}</span>
                  <strong>{CONFIG.countdown.dateLabel}</strong>
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="section reasons-section" id="alasan" aria-labelledby="reasons-title">
          <div className="section-inner">
            <div className="section-heading reveal">
              <span className="eyebrow"><span className="eyebrow-dot" />{CONFIG.reasons.eyebrow}</span>
              <h2 id="reasons-title">{CONFIG.reasons.title}</h2>
              <p>{CONFIG.reasons.description}</p>
            </div>
            <div className="reason-grid">
              {CONFIG.reasons.messages.map((message, index) => {
                const isFlipped = flippedReasons.has(index)
                const reasonNumber = String(index + 1).padStart(2, '0')
                return (
                  <button
                    className="reason-card-shell reveal"
                    type="button"
                    key={reasonNumber}
                    onClick={() => toggleReason(index)}
                    aria-pressed={isFlipped}
                    aria-label={`${isFlipped ? CONFIG.reasons.closeLabel : CONFIG.reasons.openLabel} ${index + 1}: ${message}`}
                    style={{ '--reason-tone': REASON_TONES[index % REASON_TONES.length] } as CSSProperties}
                  >
                    <span className="reason-card-inner">
                      <span className="reason-face reason-front" aria-hidden="true">
                        <span className="reason-number">{reasonNumber}</span>
                        <Leaf className="reason-leaf" />
                        <Apple className="reason-front-apple" />
                        <span className="reason-front-hint">{isFlipped ? CONFIG.reasons.cardCloseHint : CONFIG.reasons.cardHint}</span>
                      </span>
                      <span className="reason-face reason-back" aria-hidden="true">
                        <Heart />
                        <p>{message}</p>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section letter-section" id="surat" aria-labelledby="letter-title" ref={letterRef}>
          <div className="section-inner">
            <div className="section-heading reveal">
              <span className="eyebrow"><span className="eyebrow-dot" />{CONFIG.letter.eyebrow}</span>
              <h2 id="letter-title">{CONFIG.letter.title}</h2>
            </div>
            <article className="letter-card reveal" aria-label={`${CONFIG.letter.title} ${CONFIG.sender}`}>
              <div className="letter-card-top">
                <span className="eyebrow"><span className="eyebrow-dot" />{CONFIG.letter.cardEyebrow}</span>
                <span className="letter-date">{CONFIG.birthdayDisplay}</span>
              </div>
              <p className="letter-to">{CONFIG.letter.salutation}</p>
              <p className="letter-copy" aria-label={CONFIG.letter.message}>
                <span aria-hidden="true">{typedLetter}</span>
                {!letterComplete && letterStarted && <span className="typewriter-cursor" aria-hidden="true" />}
                <span className="sr-only">{CONFIG.letter.message}</span>
              </p>
              <div className="letter-signature">
                {CONFIG.letter.signatureLead}
                <strong>{CONFIG.sender}</strong>
              </div>
              {!letterComplete && (
                <div className="letter-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setLetterStarted(true)
                      setTypedLetter(CONFIG.letter.message)
                      setLetterComplete(true)
                    }}
                  >
                    {CONFIG.letter.revealButton}<ArrowUpRight aria-hidden="true" />
                  </button>
                </div>
              )}
            </article>
          </div>
        </section>

        <section className="section game-section" id="permainan" aria-labelledby="game-title">
          <div className="section-inner">
            <div className="game-layout">
              <div className="game-copy reveal">
                <span className="eyebrow"><span className="eyebrow-dot" />{CONFIG.game.eyebrow}</span>
                <h2 id="game-title">{CONFIG.game.title}</h2>
                <p>{CONFIG.game.description}</p>
                <div className="game-score-card">
                  <div className="game-score-top" aria-live="polite">
                    <span>{CONFIG.game.scoreLabel}</span>
                    <strong>{gameScore} / {CONFIG.age}</strong>
                  </div>
                  <div
                    className="game-progress"
                    role="progressbar"
                    aria-label={CONFIG.game.progressLabel}
                    aria-valuemin={0}
                    aria-valuemax={CONFIG.age}
                    aria-valuenow={gameScore}
                  >
                    <span style={{ width: `${Math.min((gameScore / CONFIG.age) * 100, 100)}%` }} />
                  </div>
                </div>
                {gameWon && <p className="game-win-copy" role="status">{CONFIG.game.winMessage}</p>}
                <div className="game-action">
                  <button className="button button-primary" type="button" onClick={startGame} disabled={gameActive}>
                    {gameActive ? CONFIG.game.activeButton : gameWon ? <>{CONFIG.game.restartButton}<RotateCcw aria-hidden="true" /></> : <>{CONFIG.game.startButton}<ArrowUpRight aria-hidden="true" /></>}
                  </button>
                </div>
              </div>

              <div className="game-stage reveal" aria-label={CONFIG.game.stageLabel}>
                <div className="stage-ground" />
                {fallingApples.map((apple) => (
                  <button
                    className="game-apple"
                    type="button"
                    key={apple.id}
                    aria-label={CONFIG.game.catchLabel}
                    onClick={() => catchApple(apple.id)}
                    onAnimationEnd={() => setFallingApples((current) => current.filter((item) => item.id !== apple.id))}
                    style={{ left: `${apple.left}%`, '--fall-time': `${apple.duration}ms` } as CSSProperties}
                  >
                    <Apple aria-hidden="true" />
                  </button>
                ))}
                {!gameActive && !gameWon && (
                  <div className="stage-invite">
                    <Apple aria-hidden="true" />
                    <strong>{CONFIG.game.title}</strong>
                    <span>{CONFIG.game.stageHint}</span>
                  </div>
                )}
                {gameWon && (
                  <div className="stage-win" role="status" aria-live="polite">
                    <Apple aria-hidden="true" />
                    <strong>{CONFIG.game.winTitle}</strong>
                    <p>{CONFIG.game.winMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="gift-section" id="kejutan" aria-labelledby="gift-title">
          <div className="section-inner">
            <div className="gift-card reveal">
              <div className="gift-art" aria-hidden="true"><Gift /></div>
              <div className="gift-copy">
                <span className="eyebrow"><span className="eyebrow-dot" />{CONFIG.surprise.eyebrow}</span>
                <h2 id="gift-title">{CONFIG.surprise.title}</h2>
                <p>{CONFIG.surprise.description}</p>
                <button
                  className="button button-primary gift-button"
                  type="button"
                  onClick={() => {
                    setSurpriseOpen(true)
                    launchConfetti()
                  }}
                  aria-expanded={surpriseOpen}
                  aria-controls="gift-reveal"
                >
                  {surpriseOpen ? CONFIG.surprise.openedButton : CONFIG.surprise.button}
                  {surpriseOpen ? <Sparkles aria-hidden="true" /> : <Gift aria-hidden="true" />}
                </button>
                {surpriseOpen && (
                  <div className="gift-reveal" id="gift-reveal" role="status" aria-live="polite">
                    <h3>{CONFIG.surprise.openedTitle}</h3>
                    <p>{CONFIG.surprise.openedMessage}</p>
                    <span className="gift-signoff">{CONFIG.surprise.close} {CONFIG.sender}.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{CONFIG.footer}<a href="#atas">{CONFIG.sender}</a></p>
      </footer>
    </div>
  )
}
