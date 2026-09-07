import '@fontsource-variable/geist';
import './style.css';
import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

type Item = {
  company: string;
  title: string;
  role: string;
  date: string;
  description: string;
  focus: string[];
  impact: string[];
  phone: 'green' | 'sports' | 'pmb' | 'tempo' | 'runway' | 'resume' | 'home';
  url: string;
};

type Lang = 'en' | 'id';
type ContributionDay = { date: string; count: number; level: number };

const profile = {
  name: 'Bintang Hari Kahono',
  handle: 'harikahono',
  tagline: 'builder · systems · product tooling',
  line: 'I like to build something.',
  github: 'https://github.com/harikahono',
  linkedin: 'https://www.linkedin.com/in/kahonokun777/',
  email: 'kahonokun@gmail.com',
};
const profileId = { ...profile, tagline: 'pengembang · sistem · produk digital', line: 'Saya suka membangun sesuatu.' };

const work: Item[] = [
  { company: 'SEIRIS', title: 'Dynamic Equity Management Platform', role: 'Full-stack Developer', date: 'Final-year academic project', description: 'A full-stack web application that automates equity allocation for student startup teams using the Slicing Pie model, solving undocumented or unfair early-stage equity splits.', focus: ['Laravel 12', 'React 19', 'PostgreSQL', 'Pusher real-time collaboration'], impact: ['Balanced academic rigor with production-quality engineering', 'Designed UML and FSM diagrams, then shipped a working real-time system solo'], phone: 'green', url: 'https://seiris.codiroom.tech/' },
  { company: 'Z4 Foundation', title: 'Web3 Agricultural Land Investment Platform', role: 'Frontend Developer', date: 'Community Web3 pilot', description: 'A Web3 platform on Solana that fractionalizes agricultural land ownership, opening land investment to smaller-scale investors through blockchain-based smart contracts.', focus: ['Next.js 16', 'React 19 + Tailwind v4', 'Solana wallet adapter', 'Framer Motion + GSAP'], impact: ['Built investor-facing flows for blockchain-backed land assets', 'Translated a complex Web3 concept into a clearer product interface'], phone: 'sports', url: 'https://z4foundation.io/' },
  { company: 'PMB PKU-MI', title: 'New Student Admission System', role: 'Frontend Developer', date: 'Institutional team project', description: 'An end-to-end admission platform for the Ulama Education Program at Istiqlal Mosque Jakarta — covering the full S2/S3 lifecycle: registration, documents, verification, Zoom interviews, and results across Regular and LOA tracks.', focus: ['Next.js 16', 'Laravel 12 REST API', 'MySQL', 'RBAC + queue workers'], impact: ['Automated 11 application statuses through a state-machine workflow', 'Paperless operations: PDF invitations, LOA letters, and Excel exports'], phone: 'pmb', url: 'https://pmbpku.istiqlal.or.id/' },
  { company: 'Ola-ATK', title: 'Stationery Retail SaaS', role: 'Full-stack Developer', date: 'Retail operations platform', description: 'A SaaS platform for managing stationery store operations — inventory, sales, and admin — with a React-based admin dashboard.', focus: ['Express', 'TypeScript', 'Prisma', 'MySQL'], impact: ['Built admin workflows around inventory, sales, and store operations', 'Connected backend data models with a practical dashboard experience'], phone: 'tempo', url: 'https://ola.codiroom.tech/' },
  { company: 'wtf-bro', title: 'CLI Safety Net for AI-Assisted Coding', role: 'Individual project', date: 'Self-initiated', description: 'A command-line tool that gives an instant undo when an AI coding agent damages a codebase — tiered rollback levels, automatic backups, and audit logging before destructive actions.', focus: ['Node 18 + TypeScript', 'tsup build', 'Clack prompts', 'cross-spawn'], impact: ['Designed safety-critical CLI UX', 'Researched risky-change detection for dependency shifts and schema drift'], phone: 'runway', url: 'https://www.npmjs.com/package/wtf-bro' },
];

const workId: Item[] = [
  { ...work[0], date: 'Proyek akhir akademik', description: 'Aplikasi web full-stack yang mengotomatiskan pembagian ekuitas untuk tim startup mahasiswa dengan model Slicing Pie — menjawab masalah saham awal yang tidak terdokumentasi atau tidak adil.', impact: ['Menyeimbangkan ketelitian akademik dengan kualitas engineering produksi', 'Merancang diagram UML dan FSM, lalu meluncurkan sistem real-time secara mandiri'] },
  { ...work[1], date: 'Pilot Web3 komunitas', description: 'Platform Web3 di Solana yang memecah kepemilikan lahan pertanian menjadi bagian kecil, membuka investasi lahan untuk investor skala kecil lewat smart contract.', focus: ['Next.js 16', 'React 19 + Tailwind v4', 'Solana wallet adapter', 'Framer Motion + GSAP'], impact: ['Membangun alur investor untuk aset lahan berbasis blockchain', 'Menerjemahkan konsep Web3 yang kompleks menjadi antarmuka produk yang lebih jelas'] },
  { ...work[2], date: 'Proyek tim institusi', description: 'Platform penerimaan end-to-end untuk Program Pendidikan Kader Ulama Masjid Istiqlal Jakarta — mengelola seluruh siklus penerimaan S2/S3: registrasi, dokumen, verifikasi, wawancara Zoom, dan pengumuman hasil untuk jalur Reguler dan LOA.', focus: ['Next.js 16', 'Laravel 12 REST API', 'MySQL', 'RBAC + queue workers'], impact: ['Mengotomatiskan 11 status pendaftaran lewat workflow state machine', 'Operasional paperless: undangan PDF, surat LOA, dan ekspor Excel'] },
  { ...work[3], description: 'Platform SaaS untuk mengelola operasional toko alat tulis — inventaris, penjualan, dan admin — dengan dashboard admin berbasis React.', impact: ['Membangun alur admin untuk inventaris, penjualan, dan operasional toko', 'Menghubungkan model data backend dengan dashboard yang praktis dipakai'] },
  { ...work[4], description: 'Perkakas command-line yang memberi tombol undo instan saat agen coding AI merusak codebase — rollback bertingkat, backup otomatis, dan audit log sebelum aksi destruktif.', focus: ['Node 18 + TypeScript', 'tsup build', 'Clack prompts', 'cross-spawn'], impact: ['Merancang UX CLI untuk skenario yang kritis terhadap keamanan', 'Meneliti deteksi perubahan berisiko seperti dependency shift dan schema drift sebelum menimbulkan kerusakan'] },
];

const label = {
  en: { contact: 'Contact', work: 'Work', resume: 'Resume', description: 'Description', focus: 'Focus', impact: 'Impact', link: 'Link', visit: 'Visit project ↗', openTo: 'Open to', roles: ['Internship', 'Freelance', 'Full-time'], headline: 'Build first. Make it make sense.', subline: 'I turn rough ideas into usable systems, products, and interfaces.', resumes: [{ label: 'ATS', title: 'Clean resume', detail: 'Plain, scanner-safe, built for HR systems and job portals.', cta: 'Download ↓' }, { label: 'Creative', title: 'Portfolio CV', detail: 'Editorial version for founders, design leads, and direct shares.', cta: 'Download ↓' }], emailSubject: 'Interested in your work — [Name / Company]', emailBody: 'Hi Bintang,\n\nI’m interested in your work and would like to invite you to discuss [role / project] at [company].\n\nWould you be open to a quick conversation?\n\nThank you,\n[Name]' },
  id: { contact: 'Kontak', work: 'Proyek', resume: 'Resume', description: 'Deskripsi', focus: 'Fokus', impact: 'Hasil', link: 'Tautan', visit: 'Lihat proyek ↗', openTo: 'Terbuka untuk', roles: ['Magang', 'Freelance', 'Penuh waktu'], headline: 'Dari ide mentah menjadi produk yang siap dipakai.', subline: 'Saya mengubah ide mentah menjadi sistem, produk, dan antarmuka yang siap dipakai.', resumes: [{ label: 'ATS', title: 'Resume bersih', detail: 'Polos, aman untuk ATS, cocok untuk sistem HR dan portal loker.', cta: 'Unduh ↓' }, { label: 'Creative', title: 'CV Portofolio', detail: 'Versi editorial untuk founder, design lead, dan kiriman langsung.', cta: 'Unduh ↓' }], emailSubject: 'Tertarik dengan hasil kerja kamu — [Nama / Perusahaan]', emailBody: 'Halo Bintang,\n\nAku tertarik sama hasil kerjamu dan ingin mengajak kamu [diskusi / interview / kolaborasi] untuk [posisi / proyek] di [perusahaan].\n\nBoleh minta waktu untuk ngobrol lebih lanjut?\n\nTerima kasih,\n[Nama]' },
};

const mailto = (copy: typeof label.en) => `mailto:${profile.email}?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(copy.emailBody)}`;

const sections: (Item | null)[] = [null, ...work, null];
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function useDeck(max: number) {
  const [index, setIndex] = useState(0);
  const lock = useRef(0);
  const touchY = useRef(0);
  const wheel = useRef({ delta: 0, timer: 0 });
  const go = (next: number) => setIndex(Math.max(0, Math.min(max, next)));
  const step = (dir: number) => {
    if (matchMedia('(max-width: 1023px)').matches) return;
    const now = Date.now();
    if (now - lock.current < 750) return;
    lock.current = now;
    setIndex(current => Math.max(0, Math.min(max, current + dir)));
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) step(1); if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) step(-1); };
    const wheelEvent = (e: WheelEvent) => {
      if (matchMedia('(max-width: 1023px)').matches) return;
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1);
      wheel.current.delta += dy;
      window.clearTimeout(wheel.current.timer);
      wheel.current.timer = window.setTimeout(() => { wheel.current.delta = 0; }, 200);
      if (Math.abs(wheel.current.delta) < 60) return;
      step(Math.sign(wheel.current.delta));
      wheel.current.delta = 0;
    };
    const start = (e: TouchEvent) => { touchY.current = e.touches[0]?.clientY ?? 0; };
    const end = (e: TouchEvent) => { const dy = touchY.current - (e.changedTouches[0]?.clientY ?? touchY.current); if (Math.abs(dy) > 42) step(Math.sign(dy)); };
    addEventListener('keydown', key); addEventListener('wheel', wheelEvent, { passive: true }); addEventListener('touchstart', start, { passive: true }); addEventListener('touchend', end, { passive: true });
    return () => { removeEventListener('keydown', key); removeEventListener('wheel', wheelEvent); removeEventListener('touchstart', start); removeEventListener('touchend', end); };
  }, [max]);

  return { index, go };
}

function App() {
  const [lang, setLang] = useState<Lang>(() => localStorage.getItem('lang') === 'id' ? 'id' : 'en');
  const { index, go } = useDeck(sections.length - 1);
  const items = lang === 'id' ? workId : work;
  const item = index > 0 && index <= items.length ? items[index - 1] : null;
  const copy = label[lang];
  const bio = lang === 'id' ? profileId : profile;
  const switchLang = () => setLang(current => { const next = current === 'en' ? 'id' : 'en'; localStorage.setItem('lang', next); return next; });
  return <main className="min-h-dvh bg-stone text-ink antialiased lg:h-dvh lg:overflow-hidden">
    <LangToggle lang={lang} onClick={switchLang} />
    <MobilePage lang={lang} />
    <div className="mx-auto hidden h-full max-w-[1440px] grid-cols-[240px_minmax(300px,1fr)_360px] px-16 py-7 lg:grid">
      <Sidebar index={index} go={go} lang={lang} />
      <section className="grid place-items-center py-0">{item ? <ImacMockup mode={item.phone} label={`${item.company} — ${item.title}`} /> : index === 0 ? <ContributionGraph lang={lang} /> : <Phone mode="resume" />}</section>
      <section className="relative flex items-center"><Detail index={index} item={item} copy={copy} bio={bio} /></section>
    </div>
  </main>;
}

function LangToggle({ lang, onClick }: { lang: Lang; onClick: () => void }) {
  return <button className="lang-toggle" onClick={onClick} aria-label="Switch language"><span className={lang === 'en' ? 'active' : ''}>EN</span><i>/</i><span className={lang === 'id' ? 'active' : ''}>ID</span></button>;
}

function MobilePage({ lang }: { lang: Lang }) {
  const items = lang === 'id' ? workId : work;
  const bio = lang === 'id' ? profileId : profile;
  const copy = label[lang];
  return <div className="mobile-page w-full px-5 py-5 lg:hidden">
    <header className="sticky top-0 z-20 -mx-5 border-b border-ink/5 bg-stone/88 px-5 py-4 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div><h1 className="text-[20px] font-semibold leading-none tracking-[-.03em]">{bio.name}</h1><p className="mt-1 text-[13px] text-muted">{bio.tagline}</p></div>
        <a className="text-[13px] text-ink underline decoration-faint underline-offset-4" href="#resume">{copy.contact}</a>
      </div>
      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 text-[12px] text-muted" aria-label="Mobile sections">
        {items.map((item) => <a key={item.title} className="shrink-0 rounded-full bg-white/45 px-3 py-1.5" href={`#${slug(item.company)}`}>{item.company}</a>)}
        <a className="shrink-0 rounded-full bg-white/45 px-3 py-1.5" href="#resume">{copy.resume}</a>
      </nav>
    </header>
    <section className="mobile-hero py-12"><Detail index={0} item={null} copy={copy} bio={bio} /><ContributionGraph lang={lang} /></section>
    {items.map((item, i) => <article id={slug(item.company)} key={item.title} className="scroll-mt-28 border-t border-ink/8 py-10">
      <MobileProjectPreview index={i + 1} item={item} />
      <div className="mb-8 grid place-items-center"><ImacMockup mode={item.phone} label={`${item.company} — ${item.title}`} /></div>
      <Detail index={i + 1} item={item} copy={copy} bio={bio} />
    </article>)}
    <section id="resume" className="scroll-mt-28 border-t border-ink/8 py-10">
      <Detail index={sections.length - 1} item={null} copy={copy} bio={bio} />
    </section>
  </div>;
}

function MobileProjectPreview({ index, item }: { index: number; item: Item }) {
  return <div className="mobile-project mb-8 ease-page">
    <div className="flex items-start justify-between gap-5"><p>{`{0${index}}`}</p><span>{item.role}</span></div>
    <h2><a href={item.url} target="_blank" rel="noreferrer">{item.company}</a></h2>
    <h3>{item.title}</h3>
    <div>{item.focus.slice(0, 3).map(value => <span key={value}>{value}</span>)}</div>
  </div>;
}

function Sidebar({ index, go, lang }: { index: number; go: (i: number) => void; lang: Lang }) {
  const bio = lang === 'id' ? profileId : profile;
  const copy = label[lang];
  const items = lang === 'id' ? workId : work;
  return <aside className="relative z-10 flex h-full flex-col justify-between text-[13px]">
    <div className="space-y-10">
      <div className="hidden lg:block"><h1 className="ease-text text-2xl font-semibold leading-none">{bio.name}</h1><p className="ease-text mt-2 text-muted">{bio.tagline}</p></div>
      <div className="flex gap-2 pt-1" aria-label="Section navigation">{sections.map((_, i) => <button key={i} aria-label={`Go to section ${i + 1}`} onClick={() => go(i)} className={`h-[2px] rounded-full transition-all duration-300 ${i === index ? 'w-9 bg-ink' : 'w-4 bg-faint hover:bg-muted'}`} />)}</div>
      <nav className="space-y-6 md:space-y-5">
        <button onClick={() => go(0)} className={`block space-y-1 text-left ease-text ${index === 0 ? 'opacity-100' : 'opacity-45 hover:opacity-80'}`} aria-label="Go to intro"><p className="font-medium text-ink">{bio.name}</p><p className="text-muted">{copy.work}</p></button>
        {items.map((item, i) => <button key={item.title} onClick={() => go(i + 1)} aria-label={`Open details for ${item.company} ${item.title}`} aria-expanded={index === i + 1} className={`block text-left transition-all duration-500 ${index === i + 1 ? 'translate-x-0 opacity-100' : 'opacity-45 hover:opacity-80 lg:translate-x-0'}`}><p className="text-ink">{item.company}</p><p className="text-muted">{item.title}</p></button>)}
        <button onClick={() => go(sections.length - 1)} className={`block space-y-1 pt-1 text-left transition-all duration-500 ${index === sections.length - 1 ? 'opacity-100' : 'opacity-45 hover:opacity-80'}`}><p className="text-ink">{copy.resume}</p><p className="text-muted">ATS + Creative</p></button>
      </nav>
    </div>
    <p className="hidden text-xs text-faint lg:block">Designed &amp; built by hand</p>
  </aside>;
}

function Detail({ index, item, copy, bio }: { index: number; item: Item | null; copy: typeof label.en; bio: typeof profile }) {
  if (!item && index === 0) return <div className="w-full ease-page"><p className="text-[22px] font-semibold leading-tight">{copy.headline}</p><p className="mt-4 max-w-[290px] text-[17px] leading-snug text-muted">{bio.line} {copy.subline}</p></div>;
  if (!item) return <div className="w-full ease-page space-y-9 text-[14px]"><ResumeChoices items={copy.resumes} /><Group title={copy.openTo} values={copy.roles} /><div className="mb-6 grid grid-cols-[92px_1fr] items-start gap-5"><p className="text-muted">{copy.contact}</p><div className="flex items-center gap-3"><IconLink href={mailto(copy)} label="Gmail" icon="mail" /><IconLink href={profile.github} label="GitHub" icon="github" /><IconLink href={profile.linkedin} label="LinkedIn" icon="linkedin" /></div></div></div>;
  return <div key={item.title} className="w-full max-w-[340px] ease-page text-[13px] leading-snug">
    <h2 className="mb-6 flex justify-between text-[13px] font-normal text-ink"><span>{item.role}</span><span>{`{0${index}}`}</span></h2>
    <h3 className="mb-7 flex justify-between gap-5 text-[13px] font-normal"><a className="project-link font-medium" href={item.url} target="_blank" rel="noreferrer">{item.company}</a><span className="text-muted">{item.date}</span></h3>
    <Group title={copy.description} values={[item.description]} />
    <Group title={copy.focus} values={item.focus} />
    <Group title={copy.impact} values={item.impact} />
    <div className="mb-6 grid grid-cols-[92px_1fr] gap-5"><p className="text-muted">{copy.link}</p><a className="project-link" href={item.url} target="_blank" rel="noreferrer">{copy.visit}</a></div>
  </div>;
}

function Group({ title, values }: { title: string; values: string[] }) {
  return <div className="mb-6 grid grid-cols-[92px_1fr] gap-5"><p className="text-muted">{title}</p><div className="space-y-1.5">{values.map(v => <p key={v}>{v}</p>)}</div></div>;
}

function ResumeChoices({ items }: { items: { label: string; title: string; detail: string; cta: string }[] }) {
  return <div className="grid gap-3">{items.map(r => <a key={r.label} className="resume-choice" href="#" onClick={(e) => e.preventDefault()}><span>{r.label}</span><b>{r.title}</b><p>{r.detail}</p><em>{r.cta}</em></a>)}</div>;
}

function IconLink({ href, label, icon }: { href: string; label: string; icon: 'mail' | 'github' | 'linkedin' }) {
  return <a className="icon-link" href={href} aria-label={label} title={label} target="_blank" rel="noreferrer">
    {icon === 'mail' && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 6.2v11.6c0 .7-.5 1.2-1.2 1.2h-3.1V9.9l4.3-3.7ZM2.5 6.2 6.8 10v9H3.7c-.7 0-1.2-.5-1.2-1.2V6.2Zm14.7 3.8L12 14 6.8 10V5.7L12 9.7l5.2-4V10ZM2.5 6.2v-.1c0-1 .9-1.5 1.7-.9l2.6 2v2.8L2.5 6.2Zm19 0-4.3 3.8V7.2l2.6-2c.8-.6 1.7-.1 1.7.9v.1Z"/></svg>}
    {icon === 'github' && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z" /></svg>}
    {icon === 'linkedin' && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v12H3v-12Zm7 0h3.8v1.6h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v6.3h-4v-5.6c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.7h-4v-12Z" /></svg>}
  </a>;
}

function ContributionGraph({ lang }: { lang: Lang }) {
  const [days, setDays] = useState<ContributionDay[]>(fallbackDays);
  const total = days.reduce((sum, day) => sum + day.count, 0);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${profile.handle}?y=last`)
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => {
        const fetched = (data.contributions ?? []).map((day: { date: string; count: number; level?: number }) => ({ date: day.date, count: day.count, level: day.level ?? Math.min(4, day.count) }));
        if (fetched.length) setDays(fetched.slice(-364));
      })
      .catch(() => undefined);
  }, []);

  return <a className="contrib" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub activity">
    <div className="contrib-head"><span>@{profile.handle}</span><b>{lang === 'id' ? 'Aktivitas GitHub' : 'GitHub activity'}</b></div>
    <div className="contrib-grid">{days.slice(-364).map(day => <i key={day.date} data-level={day.level} title={`${day.date}: ${day.count}`} />)}</div>
    <p>{total.toLocaleString()} {lang === 'id' ? 'kontribusi dalam setahun terakhir' : 'contributions in the last year'}</p>
  </a>;
}

const fallbackDays: ContributionDay[] = Array.from({ length: 364 }, (_, i) => {
  const count = (i * 17 + i % 9) % 11;
  return { date: `day-${i}`, count, level: count > 8 ? 4 : count > 5 ? 3 : count > 2 ? 2 : count > 0 ? 1 : 0 };
});

function Phone({ mode }: { mode: Item['phone'] }) {
  return <div className="phone transition-fade" key={mode}>
    <div className="status"><span>9:41</span><span>▴ ))) ▰</span></div>
    {mode === 'home' && <ResumeScreen />}
    {mode === 'green' && <GreenScreen />}
    {mode === 'sports' && <SportsScreen />}
    {mode === 'tempo' && <TempoScreen />}
    {mode === 'runway' && <RunwayScreen />}
    {mode === 'resume' && <ResumeScreen />}
  </div>;
}

function ImacMockup({ mode, label }: { mode: Item['phone']; label: string }) {
  return <div className="imac transition-fade" key={mode}>
    <img src="/imac.webp" alt={`${label} website preview on iMac mockup`} />
    <div className="imac-screen"><WebPreview mode={mode} /></div>
  </div>;
}

function WebPreview({ mode }: { mode: Item['phone'] }) {
  if (mode === 'green') return <SequencedVideo files={['/seiris1.webm', '/seiris2.webm']} />;
  if (mode === 'sports') return <SequencedVideo files={['/z4-1.webm']} />;
  if (mode === 'tempo') return <SequencedVideo files={['/olaatk1.webm', '/olaatk2.webm']} />;
  if (mode === 'pmb') return <SequencedVideo files={['/pkumi1.webm']} />;
  return <SequencedVideo files={['/wtf1.webm', '/wtf2.webm']} />;
}

function SequencedVideo({ files }: { files: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [flash, setFlash] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hide = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: '240px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => () => window.clearTimeout(hide.current), []);
  useEffect(() => { if (visible) hide.current = window.setTimeout(() => setFlash(false), 1600); }, [visible]);
  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { void v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
    setFlash(true);
    window.clearTimeout(hide.current);
    hide.current = window.setTimeout(() => setFlash(false), 1200);
  };
  return <div ref={ref} className="web-video-wrap" onClick={toggle} role="button" aria-label={playing ? 'Pause preview' : 'Play preview'}>
    {visible && <video ref={video} className="web-video" src={files[index]} autoPlay muted loop={index === files.length - 1} playsInline preload="metadata" onEnded={() => setIndex(i => Math.min(i + 1, files.length - 1))} />}
    <span className={`play-badge${!playing || flash ? ' show' : ''}`} aria-hidden="true">{playing
      ? <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      : <svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>}</span>
  </div>;
}

function GreenScreen() { return <div className="screen"><p className="top">Cash App</p><h2>$4,280</h2><div className="green-card">Green status<br/><b>Direct deposit active</b></div><div className="tile-grid"><span>Pools</span><span>Bitcoin</span><span>Card</span><span>Save</span></div></div>; }
function SportsScreen() { return <div className="screen"><p className="top">Live</p><h2>3–2</h2><div className="play">Scoring drive<br/><b>Goal at 89'</b></div><p className="caption">Key moments, translated fast.</p></div>; }
function TempoScreen() { return <div className="screen readiness"><p className="top">Readiness</p><div className="score">89</div><b>Strong</b><p>Your body is recovered and ready for a challenging workout.</p><div className="muscles"><span/><span/></div></div>; }
function RunwayScreen() { return <div className="screen"><p className="top">Runway</p><h2>12 roles</h2><div className="play"><b>Next move</b><br/>Follow up with Foundry before 3 PM.</div><div className="tile-grid"><span>Email</span><span>Calendar</span><span>Notes</span><span>Offers</span></div></div>; }
function ResumeScreen() { return <div className="screen resume"><p className="top">Resume</p><div className="doc doc-ats"><b>ATS</b><span>{profile.name}</span><i/><i/><i/><i/></div><div className="doc doc-creative"><b>Creative CV</b><span>@{profile.handle}</span><i/><i/><i/></div></div>; }

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
