"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navItems = [
  ["Beranda", "beranda"],
  ["Tentang", "tentang"],
  ["Member", "anggota"],
  ["Galeri", "galeri"],
  ["Event", "event"],
  ["Kas", "kas"],
  ["Kontak", "kontak"],
];

const members = [
  { name: "Iyan indomert", role: "Member JRX" },
  { name: "Padli Resign", role: "Member JRX" },
  { name: "Agis Ipone", role: "Member JRX" },
  { name: "Yana bucin", role: "Member JRX" },
  { name: "salji GSI", role: "Member JRX" },
  { name: "Apep WIFI", role: "Member JRX" },
  { name: "Rendi WIFI", role: "Member JRX" },
  { name: "Ugi info loker", role: "Member JRX" },
  { name: "Aden Freshgraduate", role: "Member JRX" },
];

const gallery = [
  {
    title: "Nongkrong Malam Minggu",
    image: "",
  },
  {
    title: "Futsal Rutin",
    image: "",
  },
  {
    title: "Healing atau Camping",
    image: "",
  },
];

const events = [
  ["23 Mei", "Nonton bareng Persib Bandung menuju hattrick juara", "Sukabumi Kota"],
];

const countdownTarget = new Date("2026-05-23T16:00:00+07:00").getTime();

function getCountdown() {
  const distance = Math.max(countdownTarget - Date.now(), 0);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return [
    ["Hari", days],
    ["Jam", hours],
    ["Menit", minutes],
    ["Detik", seconds],
  ].map(([label, value]) => ({
    label,
    value: String(value).padStart(2, "0"),
  }));
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [countdown, setCountdown] = useState(() => [
    { label: "Hari", value: "00" },
    { label: "Jam", value: "00" },
    { label: "Menit", value: "00" },
    { label: "Detik", value: "00" },
  ]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".nav-shell", { y: -24, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-copy > *", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".reveal", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-start",
          start: "top 78%",
        },
      });
      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
        gsap.from(section, {
          y: 44,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setCountdown(getCountdown());
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen overflow-hidden bg-[#ffffff] text-[#1d1d1f]">
      <nav className="nav-shell fixed left-0 right-0 top-0 z-50 bg-black text-white">
        <div className="mx-auto flex h-11 w-[min(980px,calc(100%-32px))] items-center justify-between gap-4">
          <a href="#beranda" className="brand-mark">
            JRX
          </a>
          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="nav-link text-white/80 transition">
                {label}
              </a>
            ))}
          </div>
          <a href="#forum" className="primary-chip">
            Forum
          </a>
        </div>
      </nav>

      <section id="beranda" className="product-tile product-tile-dark relative min-h-screen overflow-hidden pt-11 text-white">
        <div className="hero-peaky-bg" aria-hidden="true">
          <span className="hero-depth-card" />
          <span className="hero-light-sweep" />
          <span className="hero-foreground-fog" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-44px)] w-[min(980px,calc(100%-32px))] items-center justify-center py-20">
          <div className="hero-copy poster-copy mx-auto max-w-4xl text-center">
            <p className="eyebrow text-white/70">Teman kampung, satu wadah</p>
            <h1 className="hero-title mt-3 text-[40px] font-semibold leading-[1.07] md:text-[56px]">JRX</h1>
            <p className="mx-auto mt-4 max-w-3xl text-[24px] font-light leading-[1.5] text-white/80 md:text-[28px] md:leading-[1.14]">
              Wadah berkumpulnya sirkel tongkrongan yang kini berkembang menjadi ekosistem kolaboratif. Berawal dari pergerakan <em className="foreign-word">LFWG Community</em> dalam mengeksplorasi proyek <em className="foreign-word">cryptocurrency</em>, sirkel ini kini bergerak lebih jauh melalui sinergi strategis bersama <em className="foreign-word">Ceeberlogi Science</em> dan <em className="foreign-word">Tim Phoenix-007</em> untuk membangun tim yang jauh lebih solid, adaptif, dan maju.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#event" className="primary-chip">
                Lihat Event
              </a>
              <a href="#anggota" className="ghost-chip ghost-chip-dark">
                Kenal Member
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="content-start product-tile product-tile-parchment px-4">
        <div className="mx-auto grid w-[min(980px,100%)] gap-5 md:grid-cols-4">
          {[
            ["16", "Member aktif"],
            ["12", "Agenda tahun ini"],
            ["28,8jt", "Saldo kas"],
            ["2016", "Mulai nongkrong"],
          ].map(([value, label]) => (
            <div key={label} className="stat-card reveal p-6">
              <p className="text-[40px] font-semibold leading-[1.1] text-[#1d1d1f]">{value}</p>
              <p className="mt-2 text-[14px] leading-[1.43] text-[#7a7a7a]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tentang" className="history-section section-reveal product-tile product-tile-light mx-auto w-full px-4">
        <div className="mx-auto grid w-[min(1080px,100%)] gap-10 md:grid-cols-[0.78fr_1.22fr]">
          <div className="history-heading">
            <p className="section-label">Tentang</p>
            <h2 className="history-title">Sejarah tongkrongan yang jadi keluarga kecil.</h2>
            <p className="history-note">Dari nama permainan, jadi identitas yang tumbuh bersama.</p>
          </div>

          <article className="history-copy">
            <p className="history-kicker">Sejarah dan Asal-Usul JRX</p>
            <p>
              Nama JRX memiliki ikatan emosional yang kuat bagi sirkel ini. Identitas tersebut lahir dari nama sebuah <em>squad</em> <em>Mobile Legends</em> bernama <em>Jerinx Petarunx</em>. Seiring waktu, nama itu melekat sebagai simbol kebersamaan yang sulit tergantikan, lalu bertransformasi dari sekadar nama <em>squad game</em> menjadi identitas utama tongkrongan ini.
            </p>
            <p>
              Kisah pergerakan digital komunitas dimulai dari inisiatif sederhana melalui pendirian <em>LFWG Community</em>. Pada awal terbentuknya, <em>LFWG</em> berjalan sebagai ruang diskusi interaktif untuk mencari, membaca, dan membedah berbagai peluang proyek di dunia <em>cryptocurrency</em>.
            </p>
            <p>
              Visi tersebut kemudian berkembang. Untuk memperluas dampak dan skala pergerakan, ruang sinergi dibuka lebih lebar lewat kolaborasi bersama <em>Ceeberlogi Science</em>, komunitas yang bergerak di bidang ilmiah dan teknologi.
            </p>
            <p>
              Langkah ekspansi itu semakin kuat setelah hadirnya kolaborasi strategis dengan <em>Tim Phoenix-007</em>. Penggabungan visi, keahlian, dan semangat dari tiga pilar komunitas ini menjadi titik balik penting: seluruh elemen kini bergerak sebagai satu kesatuan tim yang lebih kokoh, adaptif, dan siap melangkah maju.
            </p>
          </article>
        </div>
      </section>

      <section id="anggota" className="section-reveal product-tile product-tile-dark">
        <div className="mx-auto w-[min(980px,calc(100%-32px))]">
          <p className="section-label">Anggota</p>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="serif-section-title">Profil member.</h2>
            <a href="#kontak" className="text-link-on-dark">Gabung circle</a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <article key={member.name} className="member-card">
                <div className="avatar">{member.name.slice(0, 1)}</div>
                <p className="mt-5 text-[17px] font-semibold leading-[1.24]">{member.name}</p>
                <p className="mt-1 text-[14px] leading-[1.43] text-[#7a7a7a]">{member.role}</p>
                <span className="mt-6 inline-flex rounded-full border border-[#e0e0e0] px-3 py-1 text-[12px] text-[#7a7a7a]">#{String(index + 1).padStart(2, "0")}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="galeri" className="section-reveal product-tile product-tile-light mx-auto w-full px-4">
        <div className="mx-auto w-[min(980px,100%)]">
        <p className="section-label">Galeri</p>
        <h2 className="serif-section-title">Momen nongkrong, futsal, dan healing atau camping.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {gallery.map((item) => (
            <article key={item.title} className="gallery-card overflow-hidden bg-white">
              {item.image ? (
                <Image src={item.image} alt={item.title} width={900} height={640} className="h-72 w-full object-cover" />
              ) : (
                <div className="gallery-placeholder h-72" aria-label={`${item.title} belum ada foto`} />
              )}
              <div className="p-5">
                <h3 className="text-[17px] font-semibold leading-[1.24]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.43] text-[#7a7a7a]">Dokumentasi kegiatan yang bisa diganti dengan foto asli komunitas.</p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section id="event" className="section-reveal product-tile product-tile-dark-2">
        <div className="mx-auto grid w-[min(980px,calc(100%-32px))] gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-label">Kegiatan / Event</p>
            <h2 className="serif-section-title">Agenda yang jangan sampai kelewat.</h2>
            <p className="mt-5 max-w-md text-[17px] leading-[1.55] text-white/70">
             Satu layar, satu dukungan demi Persib Bandung menuju hattrick juara. Hayu ramaikeun nobar jeung dukung Maung Bandung bareng-bareng.
            </p>
          </div>
          <div className="space-y-3">
            <article className="nobar-card">
              <div className="nobar-card-glow" aria-hidden="true" />
              <div className="relative z-10">
                <p className="nobar-kicker">Sabtu, 23 Mei 2026 · 16.00 WIB</p>
                <h3>Nobar Persib Bandung Menuju Hattrick Juara</h3>
                <p>
                  Ngadukung Persib Bandung bareng-bareng, datang leuwih tiheula jeung ramaikeun nepi ka beres pertandingan.
Konvoi 24 jam tanpa aturan 🔥
                </p>
                <div className="nobar-details" aria-label="Detail nobar Persib Bandung">
                  <div>
                    <span>Dress code</span>
                    <strong>Biru, putih, atau hitam</strong>
                  </div>
                  <div>
                    <span>Awal titik kumpul</span>
                    <strong>Rumah Fadli</strong>
                  </div>
                  <div>
                    <span>Pukul</span>
                    <strong>14.00 WIB 🔥</strong>
                  </div>
                </div>
                <div className="countdown-panel" aria-label="Hitung mundur menuju nobar Persib Bandung">
                  {countdown.map((item, index) => (
                    <div key={item.label} className="countdown-unit">
                      <span className="countdown-value">{item.value}</span>
                      <span className="countdown-label">{item.label}</span>
                      {index < countdown.length - 1 ? <span className="countdown-separator">:</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            </article>
            {events.map(([date, title, place]) => (
              <article key={title} className="event-card grid gap-4 p-6 md:grid-cols-[120px_1fr]">
                <div className="text-[21px] font-semibold leading-[1.19] text-[#7dd3fc]">{date}</div>
                <div>
                  <h3 className="text-[17px] font-semibold leading-[1.24]">{title}</h3>
                  <p className="mt-1 text-[14px] leading-[1.43] text-[#cccccc]">{place}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="kas" className="section-reveal product-tile product-tile-parchment px-4">
        <div className="mx-auto grid w-[min(980px,100%)] gap-6 md:grid-cols-[1fr_1fr]">
        <div className="kas-panel p-6">
          <p className="section-label">Kas / Donasi</p>
          <h2 className="serif-section-title">Transparan, biar semua enak.</h2>
          <p className="mt-5 text-[17px] leading-[1.47] text-[#1d1d1f]">Saldo bulan ini Rp7.800.000 untuk sewa lapangan, konsumsi rapat, perlengkapan 17-an, dan dana sosial.</p>
        </div>
        <div className="grid gap-3">
          {["Iuran member: Rp20.000 / bulan", "Donasi acara: terbuka", "Laporan kas: update tiap akhir bulan"].map((item) => (
            <div key={item} className="info-row p-6 text-[17px] font-semibold leading-[1.24]">
              {item}
            </div>
          ))}
        </div>
        </div>
      </section>

      <section id="forum" className="section-reveal product-tile product-tile-light">
        <div className="mx-auto grid w-[min(980px,calc(100%-32px))] gap-6 md:grid-cols-2">
          <div>
            <p className="section-label">Pengumuman</p>
            <h2 className="serif-section-title">Info penting.</h2>
            <div className="mt-6 space-y-3">
              <p className="notice">Rapat panitia 17-an dipindah ke Jumat malam.</p>
              <p className="notice">Jersey futsal batch baru tutup order akhir bulan.</p>
            </div>
          </div>
          <div>
            <p className="section-label">Chat / Forum</p>
            <h2 className="serif-section-title">Topik diskusi.</h2>
            <div className="mt-6 space-y-3">
              <p className="notice">Usulan touring pendek ke pantai.</p>
              <p className="notice">Voting jadwal futsal mingguan.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="kontak" className="section-reveal footer-surface px-4 py-16">
        <div className="mx-auto flex w-[min(980px,100%)] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Kontak</p>
            <h2 className="serif-section-title">Admin & media sosial.</h2>
            <p className="mt-4 text-[12px] leading-none text-white/60">WhatsApp: 0812-0000-2026 · Instagram: @jrxcircle · Email: admin@jrx.test</p>
          </div>
          <a href="#beranda" className="primary-chip">Kembali ke atas</a>
        </div>
      </footer>
    </main>
  );
}
