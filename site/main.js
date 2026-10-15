(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const fanCards = $$('.fan-card');
  // Where each screenshot sits in the open fan, relative to the middle one.
  const spread = () => (window.innerWidth < 680 ? 120 : window.innerWidth < 980 ? 170 : 245);
  const fanPose = (k, extra = 0) => {
    const d = k - (fanCards.length - 1) / 2;
    return {
      x: d * (spread() + extra),
      y: Math.abs(d) * 46,
      rotate: d * 7,
      scale: 1 - Math.abs(d) * 0.07,
    };
  };

  // Without GSAP the fan is laid out statically and the page is plain HTML.
  if (typeof window.gsap === 'undefined') {
    fanCards.forEach((card, k) => {
      const p = fanPose(k);
      card.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotate}deg) scale(${p.scale})`;
    });
    return;
  }
  // With reduced motion: keep the short entrance fades, drop scroll-driven motion.
  const calm = reduce && !/[?&]motion=1/.test(location.search);

  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ─── Hero ────────────────────────────────────────────────────── */
  gsap.set(fanCards, { x: 0, y: 260, rotate: 0, scale: 0.9, opacity: 0 });
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.nav', { y: -30, opacity: 0, duration: 1 })
    .from('.hero-title .word', { yPercent: 115, rotate: 4, duration: 1.3, stagger: 0.09 }, 0.1)
    .from('.hero .reveal', { y: 26, opacity: 0, duration: 1, stagger: 0.08 }, 0.45)
    .to(fanCards, { y: 40, opacity: 1, scale: 0.92, duration: 0.9, stagger: 0.06 }, 0.55)
    .to(fanCards, {
      x: (k) => fanPose(k).x, y: (k) => fanPose(k).y, rotate: (k) => fanPose(k).rotate, scale: (k) => fanPose(k).scale,
      duration: 1.5, ease: 'expo.inOut',
    }, 1.1);

  // Scrolling opens the fan wider and lifts it toward the reader.
  if (!calm) gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
  }).to(fanCards, {
    x: (k) => fanPose(k, 70).x,
    y: (k) => fanPose(k).y - 70,
    rotate: (k) => fanPose(k).rotate * 1.4,
    ease: 'none',
  });

  // Each card leans toward the pointer a little, the outer ones more.
  if (fine && !calm) {
    const fan = $('.fan');
    fan.addEventListener('pointermove', (e) => {
      const r = fan.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      fanCards.forEach((card, k) => {
        const d = k - (fanCards.length - 1) / 2;
        gsap.to(card, { xPercent: px * (6 + Math.abs(d) * 4), duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
      });
    });
    fan.addEventListener('pointerleave', () => gsap.to(fanCards, { xPercent: 0, duration: 0.8, ease: 'power3.out' }));
  }

  /* ─── Marquee ─────────────────────────────────────────────────── */
  const track = $('.marquee-track');
  track.innerHTML += track.innerHTML;
  if (!calm) {
  const marquee = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    onUpdate: (self) => {
      const dir = self.direction;
      const boost = Math.min(Math.abs(self.getVelocity()) / 400, 5);
      gsap.to(marquee, {
        timeScale: dir * (1 + boost), duration: 0.2, overwrite: true,
        onComplete: () => gsap.to(marquee, { timeScale: dir, duration: 1.2 }),
      });
    },
  });
  }

  /* ─── Gallery: the strip moves sideways while the section is pinned ── */
  const gallery = $('.gallery');
  const strip = $('.gallery-track');
  const mm = gsap.matchMedia();
  mm.add(calm ? '(min-width: 99999px)' : '(min-width: 681px)', () => {
      gallery.classList.add('is-pinned');
      const distance = () => strip.scrollWidth - window.innerWidth;
      const tween = gsap.to(strip, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: gallery,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set('.gallery-bar span', { width: `${self.progress * 100}%` }),
        },
      });
      // Cards straighten up as they slide into view.
      $$('.g-card').forEach((card) => {
        gsap.from(card, {
          rotate: 6, y: 60, opacity: 0.4, ease: 'power2.out',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 95%', end: 'left 60%', scrub: true },
        });
      });
  });
  mm.add(calm ? 'all' : '(max-width: 680px)', () => {
      gsap.from('.g-card', {
        y: 60, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: gallery, start: 'top 75%' },
      });
  });

  /* ─── Headings that build word by word ────────────────────────── */
  $$('.split').forEach((h) => {
    h.innerHTML = h.textContent.trim().split(/\s+/)
      .map((w) => `<span class="w" style="overflow:hidden;display:inline-block;vertical-align:top"><span style="display:inline-block">${w}</span></span>`)
      .join(' ');
    gsap.from($$('.w > span', h), {
      yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.045,
      scrollTrigger: { trigger: h, start: 'top 85%' },
    });
  });

  /* ─── Bento ───────────────────────────────────────────────────── */
  gsap.from('.tile', {
    y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08,
    scrollTrigger: { trigger: '.bento', start: 'top 80%' },
  });
  gsap.from('.h-row', {
    x: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
    scrollTrigger: { trigger: '.history-mock', start: 'top 85%' },
  });
  gsap.from('.pin-dots i.on', {
    scale: 0, duration: 0.4, ease: 'back.out(3)', stagger: 0.25,
    scrollTrigger: { trigger: '.pin-mock', start: 'top 85%' },
  });
  gsap.from('.code', {
    clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'power3.inOut',
    scrollTrigger: { trigger: '.code', start: 'top 85%' },
  });
  $$('.count').forEach((el) => {
    const obj = { n: 0 };
    gsap.to(obj, {
      n: Number(el.dataset.to), duration: 1.6, ease: 'power3.out',
      onUpdate: () => { el.textContent = Math.round(obj.n); },
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
  $$('.tile').forEach((tile) => {
    tile.addEventListener('pointermove', (e) => {
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', `${e.clientX - r.left}px`);
      tile.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ─── Privacy and download ────────────────────────────────────── */
  gsap.from('.p-item', {
    y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1,
    scrollTrigger: { trigger: '.privacy-grid', start: 'top 82%' },
  });
  gsap.from('.dl-card', {
    scale: 0.92, opacity: 0, duration: 1.3, ease: 'expo.out',
    scrollTrigger: { trigger: '.download', start: 'top 80%' },
  });
  gsap.from('.dl-icon', {
    rotate: -20, y: 30, duration: 1.4, ease: 'elastic.out(1, 0.5)',
    scrollTrigger: { trigger: '.download', start: 'top 75%' },
  });

  /* ─── Pointer niceties ────────────────────────────────────────── */
  if (fine) {
    const glow = $('.glow');
    const gx = gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3.out' });
    const gy = gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3.out' });
    window.addEventListener('pointermove', (e) => { gx(e.clientX); gy(e.clientY); });

    $$('.magnetic').forEach((btn) => {
      const mx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const my = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.3);
        my((e.clientY - r.top - r.height / 2) * 0.4);
      });
      btn.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  } else {
    $('.glow').style.display = 'none';
  }

  // Re-measure once images have their real size.
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
