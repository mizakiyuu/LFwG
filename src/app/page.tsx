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
  { name: "Ugi BUMN", role: "Member JRX" },
  { name: "Aden Freshgraduate", role: "Member JRX" },
  { name: "Atep sayang keluarga", role: "Member JRX" },
  { name: "Fajri MBG", role: "Member JRX" },
  { name: "Inoy Service Center", role: "Member JRX" },
  { name: "Maul Tongoh", role: "Member JRX" },
  { name: "Ucup perantau", role: "Member JRX" },
];

const gallery = [
  {
    title: "Nongkrong Malam Minggu",
    images: [],
    description: "Momen kumpul santai bareng anak-anak JRX, dari obrolan ringan sampai rencana kegiatan berikutnya.",
    exif: {
      date: "Dokumentasi komunitas",
      location: "Tongkrongan JRX",
      camera: "Arsip kegiatan",
      activity: "Nongkrong",
    },
  },
  {
    title: "Futsal Rutin",
    images: [],
    description: "Agenda olahraga bareng untuk jaga kompak, sehat, dan tetap ramai di luar tongkrongan.",
    exif: {
      date: "Dokumentasi komunitas",
      location: "Lapangan futsal",
      camera: "Arsip kegiatan",
      activity: "Futsal",
    },
  },
  {
    title: "Healling",
    images: ["/images/pantai.png", "/images/pantai2.png"],
    description: "Pada tahun 2021, JRX melakukan perjalanan ke kawasan Geopark Ciletuh untuk menikmati suasana pantai dan melepas penat bersama.",
    exif: {
      date: "2021",
      location: "Geopark Ciletuh, Sukabumi",
      camera: "Dokumentasi HP member",
      activity: "Perjalanan pantai",
    },
  },
];

const events = [
  {
    date: "Sabtu, 19 Sep 2026",
    title: "Camping Selabintana",
    place: "Selabintana, Sukabumi",
    cover: "/images/camp.png",
  },
  {
    date: "Coming Soon",
    title: "Gunung Gede",
    place: "Gunung Gede Pangrango, Jawa Barat",
    cover: "/images/gede.jpg",
  },
  { date: "Coming Soon", title: "Trip Ujung Genteng", place: "Pantai Ujung Genteng" },
];

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const selectedGallery = selectedGalleryIndex === null ? null : gallery[selectedGalleryIndex];
  const selectedImage = selectedGallery?.images[selectedImageIndex];

  const getGalleryShareText = (item: (typeof gallery)[number], image: string) => {
    const url = `${window.location.origin}${image}`;
    return {
      url,
      text: `${item.title} - ${item.description} ${url}`,
    };
  };

  const copyGalleryShareText = async (item: (typeof gallery)[number], image: string) => {
    const { text } = getGalleryShareText(item, image);
    await navigator.clipboard?.writeText(text);
  };

  const shareToWhatsApp = (item: (typeof gallery)[number]) => {
    const image = item.images[selectedImageIndex] ?? item.images[0];

    if (!image) {
      return;
    }

    const { text } = getGalleryShareText(item, image);
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const shareToTelegram = (item: (typeof gallery)[number]) => {
    const image = item.images[selectedImageIndex] ?? item.images[0];

    if (!image) {
      return;
    }

    const { url, text } = getGalleryShareText(item, image);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const shareToInstagram = async (item: (typeof gallery)[number]) => {
    const image = item.images[selectedImageIndex] ?? item.images[0];

    if (!image) {
      return;
    }

    await copyGalleryShareText(item, image);
    window.open("https://www.instagram.com/direct/inbox/", "_blank", "noopener,noreferrer");
  };

  const openGallery = (index: number) => {
    setSelectedGalleryIndex(index);
    setSelectedImageIndex(0);
    setIsShareMenuOpen(false);
  };

  const showGalleryImage = (direction: 1 | -1) => {
    if (!selectedGallery?.images.length) {
      return;
    }

    setSelectedImageIndex((currentIndex) => {
      const imageCount = selectedGallery.images.length;
      return (currentIndex + direction + imageCount) % imageCount;
    });
  };

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
    if (selectedGalleryIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedGalleryIndex(null);
        setIsShareMenuOpen(false);
      }

      if (event.key === "ArrowRight") {
        setSelectedImageIndex((currentIndex) => {
          const imageCount = selectedGallery?.images.length ?? 0;
          return imageCount ? (currentIndex + 1) % imageCount : currentIndex;
        });
      }

      if (event.key === "ArrowLeft") {
        setSelectedImageIndex((currentIndex) => {
          const imageCount = selectedGallery?.images.length ?? 0;
          return imageCount ? (currentIndex - 1 + imageCount) % imageCount : currentIndex;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedGalleryIndex, selectedGallery]);

  return (
    <main ref={rootRef} className="min-h-screen overflow-hidden bg-[#ffffff] text-[#1d1d1f]">
      <nav className="nav-shell fixed left-0 right-0 top-0 z-50 bg-black text-white">
        <div className="mx-auto flex h-11 w-[min(980px,calc(100%-32px))] items-center justify-between gap-4">
          <a href="#beranda" className="brand-mark">
            JRX
          </a>
          <div className="nav-links">
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
        <div className="mx-auto grid w-[min(980px,100%)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
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
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
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
        <h2 className="serif-section-title">Momen nongkrong, futsal, dan healling.</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {gallery.map((item, index) => (
            <article key={item.title} className="gallery-card overflow-hidden bg-white">
              {item.images[0] ? (
                <button type="button" className="gallery-image-button" onClick={() => openGallery(index)} aria-label={`Buka foto ${item.title}`}>
                  <Image src={item.images[0]} alt={item.title} width={900} height={640} className="gallery-thumb h-72 w-full object-cover" />
                  {item.images.length > 1 ? <span className="gallery-count">{item.images.length} Foto</span> : null}
                </button>
              ) : (
                <div className="gallery-placeholder h-72" aria-label={`${item.title} belum ada foto`} />
              )}
              <div className="p-5">
                <h3 className="text-[17px] font-semibold leading-[1.24]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.43] text-[#7a7a7a]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      {selectedGallery && selectedImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Foto ${selectedGallery.title}`}>
          <button
            type="button"
            className="lightbox-backdrop"
            onClick={() => {
              setSelectedGalleryIndex(null);
              setIsShareMenuOpen(false);
            }}
            aria-label="Tutup lightbox"
          />
          <div className="lightbox-panel">
            <div className="lightbox-media">
              <Image src={selectedImage} alt={selectedGallery.title} width={1400} height={980} className="lightbox-image" priority />
              {selectedGallery.images.length > 1 ? (
                <>
                  <button type="button" className="lightbox-arrow lightbox-arrow-left" onClick={() => showGalleryImage(-1)} aria-label="Lihat foto sebelumnya">
                    ‹
                  </button>
                  <button type="button" className="lightbox-arrow lightbox-arrow-right" onClick={() => showGalleryImage(1)} aria-label="Lihat foto berikutnya">
                    ›
                  </button>
                  <div className="lightbox-dots" aria-label="Pilih foto">
                    {selectedGallery.images.map((image, index) => (
                      <button
                        type="button"
                        key={image}
                        className={index === selectedImageIndex ? "lightbox-dot lightbox-dot-active" : "lightbox-dot"}
                        onClick={() => setSelectedImageIndex(index)}
                        aria-label={`Lihat foto ${index + 1}`}
                        aria-pressed={index === selectedImageIndex}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <aside className="lightbox-info">
              <div>
                <p className="section-label">Lightbox View</p>
                <h2 className="lightbox-title">{selectedGallery.title}</h2>
                {selectedGallery.images.length > 1 ? (
                  <p className="lightbox-counter">Foto {selectedImageIndex + 1} dari {selectedGallery.images.length}</p>
                ) : null}
                <p className="lightbox-caption">{selectedGallery.description}</p>
              </div>

              <dl className="exif-grid" aria-label="Caption EXIF">
                <div>
                  <dt>Tahun</dt>
                  <dd>{selectedGallery.exif.date}</dd>
                </div>
                <div>
                  <dt>Lokasi</dt>
                  <dd>{selectedGallery.exif.location}</dd>
                </div>
                <div>
                  <dt>Kamera</dt>
                  <dd>{selectedGallery.exif.camera}</dd>
                </div>
                <div>
                  <dt>Aktivitas</dt>
                  <dd>{selectedGallery.exif.activity}</dd>
                </div>
                <div>
                  <dt>File</dt>
                  <dd>{selectedImage.split("/").pop()}</dd>
                </div>
              </dl>

              <div className="lightbox-actions">
                <div className="share-menu">
                  <button
                    type="button"
                    className="primary-chip"
                    onClick={() => setIsShareMenuOpen((isOpen) => !isOpen)}
                    aria-expanded={isShareMenuOpen}
                    aria-haspopup="menu"
                  >
                    Bagikan
                  </button>
                  {isShareMenuOpen ? (
                    <div className="share-menu-panel" role="menu" aria-label="Pilihan bagikan">
                      <button type="button" className="share-option share-option-whatsapp" role="menuitem" onClick={() => shareToWhatsApp(selectedGallery)}>
                        <span className="share-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M12.04 2.5a9.35 9.35 0 0 0-7.94 14.3l-.95 3.55 3.64-.93a9.35 9.35 0 1 0 5.25-16.92Zm0 1.72a7.62 7.62 0 0 1 6.48 11.63 7.63 7.63 0 0 1-9.92 2.5l-.36-.2-2.16.55.56-2.09-.23-.37a7.62 7.62 0 0 1 5.63-12.02Zm-3.18 3.9c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.17.86 2.31.98 2.47.12.16 1.66 2.66 4.1 3.62 2.03.8 2.45.64 2.9.6.44-.04 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46Z" />
                          </svg>
                        </span>
                        WhatsApp
                      </button>
                      <button type="button" className="share-option share-option-telegram" role="menuitem" onClick={() => shareToTelegram(selectedGallery)}>
                        <span className="share-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M20.92 4.3 17.9 18.55c-.23 1.01-.82 1.26-1.66.78l-4.6-3.39-2.22 2.14c-.25.25-.45.45-.92.45l.33-4.68 8.52-7.7c.37-.33-.08-.52-.57-.19L6.25 12.59l-4.54-1.42c-.99-.31-1.01-.99.2-1.46L19.66 2.86c.82-.31 1.54.18 1.26 1.44Z" />
                          </svg>
                        </span>
                        Telegram
                      </button>
                      <button type="button" className="share-option share-option-instagram" role="menuitem" onClick={() => shareToInstagram(selectedGallery)}>
                        <span className="share-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M7.75 2.75h8.5a5 5 0 0 1 5 5v8.5a5 5 0 0 1-5 5h-8.5a5 5 0 0 1-5-5v-8.5a5 5 0 0 1 5-5Zm0 1.75a3.25 3.25 0 0 0-3.25 3.25v8.5a3.25 3.25 0 0 0 3.25 3.25h8.5a3.25 3.25 0 0 0 3.25-3.25v-8.5a3.25 3.25 0 0 0-3.25-3.25h-8.5Zm4.25 3.2a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Zm0 1.75a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Zm4.58-2.1a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16Z" />
                          </svg>
                        </span>
                        Instagram
                      </button>
                    </div>
                  ) : null}
                </div>
                <a className="ghost-chip" href={selectedImage} download>
                  Unduh
                </a>
                <button
                  type="button"
                  className="lightbox-close"
                  onClick={() => {
                    setSelectedGalleryIndex(null);
                    setIsShareMenuOpen(false);
                  }}
                >
                  Tutup
                </button>
              </div>
            </aside>
          </div>
        </div>
      ) : null}

      <section id="event" className="section-reveal product-tile product-tile-dark-2">
        <div className="mx-auto grid w-[min(980px,calc(100%-32px))] gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-label">Kegiatan / Event</p>
            <h2 className="serif-section-title">Agenda yang jangan sampai kelewat.</h2>
            <p className="mt-5 max-w-md text-[17px] leading-[1.55] text-white/70">
              Rencana kegiatan JRX berikutnya bakal muncul di sini begitu tanggal dan titik kumpulnya sudah siap.
            </p>
          </div>
          <div className="space-y-3">
            {events.map(({ date, title, place, cover }) => (
              <article
                key={title}
                className={`event-card grid ${
                  cover
                    ? "grid-cols-[112px_1fr] items-center gap-x-4 gap-y-2 p-4 sm:grid-cols-[132px_1fr] md:grid-cols-[180px_140px_1fr] md:gap-5 md:p-6"
                    : "items-center gap-4 p-5 md:grid-cols-[140px_1fr] md:p-6"
                }`}
              >
                {cover ? (
                  <Image
                    src={cover}
                    alt={`Sampul ${title}`}
                    width={640}
                    height={480}
                    className="row-span-2 h-auto w-full self-center rounded-xl md:row-auto md:max-w-[180px]"
                  />
                ) : null}
                <div className="self-end text-[18px] font-semibold leading-[1.19] text-[#7dd3fc] md:self-center md:text-[21px]">{date}</div>
                <div className="md:self-center">
                  <h3
                    className={`font-semibold leading-[1.24] ${
                      title === "Camping Selabintana" ? "font-serif text-[22px] italic" : "text-[17px]"
                    }`}
                  >
                    {title}
                  </h3>
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
            <p className="mt-4 text-[12px] leading-none text-white/60">WhatsApp: 089627269155 · Instagram: @0xlfwg · Email: mughnialmuzaki74@gmail.com</p>
          </div>
          <a href="#beranda" className="primary-chip">Kembali ke atas</a>
        </div>
      </footer>
    </main>
  );
}
