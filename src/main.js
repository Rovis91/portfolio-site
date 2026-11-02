// Behaviour: language, title options, tooltips, business card, hero before / after.
import { animate, inView, scroll, stagger } from 'motion'
import { ui } from './ui.js'

const root = document.documentElement
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
if (reduced) root.classList.add('rm')
// live source of truth: anything that runs later reads this, not the load-time constant
const isReduced = () => root.classList.contains('rm')
const $ = (s, el = document) => el.querySelector(s)
const $$ = (s, el = document) => [...el.querySelectorAll(s)]
let lang = root.dataset.lang === 'en' ? 'en' : 'fr'
const T = () => ui[lang]

// ─────────────────────────────── language
function applyLang(next, manual) {
  lang = next
  root.lang = next
  root.dataset.lang = next
  if (manual) { try { localStorage.setItem('ah.lang', next) } catch (e) {} }
  document.title = T().title
  $('meta[name="description"]').setAttribute('content', T().description)
  $('meta[property="og:title"]').setAttribute('content', T().title)
  $('meta[property="og:description"]').setAttribute('content', T().description)
  $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', T()[el.dataset.i18nAria]))
  $$('[data-set-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setLang === next)))
  document.dispatchEvent(new CustomEvent('ah:lang'))
}
$$('[data-set-lang]').forEach((b) =>
  b.addEventListener('click', () => { if (b.dataset.setLang !== lang) applyLang(b.dataset.setLang, true) })
)
applyLang(lang, false)

// ─────────────────────────────── header: the brand mark becomes the face once the hero byline is gone
{
  const by = $('.hero-by')
  if (by) new IntersectionObserver(([e]) => $('.top').classList.toggle('face-on', !e.isIntersecting && e.boundingClientRect.top < 0))
    .observe(by)
}

// ─────────────────────────────── hero: "your Monday", before / after
// Loops while in view: before, then the repetitive lines get struck "auto", then back to before, endlessly.
// Paused while hovered or focused. Reduced motion: the after state, still. Without JS the CSS shows the after state.
{
  const fig = $('.hl'), total = $('.hl-n1', fig)
  const hm = (m) => { m = Math.round(m / 5) * 5; const h = Math.floor(m / 60), r = m % 60; return h ? `${h} h${r ? ' ' + String(r).padStart(2, '0') : ''}` : `${r} min` }
  let count
  const set = (after) => {
    fig.classList.toggle('is-after', after)
    count?.stop()
    if (after && !isReduced()) count = animate(390, 20, { duration: 1.3, ease: 'easeOut', onUpdate: (v) => { total.textContent = hm(v) } })
    else total.textContent = '20 min'
  }
  let timer, visible = false, held = false
  const hold = { false: 1400, true: 5000 }
  const stop = () => clearTimeout(timer)
  const play = () => {
    stop()
    if (held || !visible || isReduced()) return
    timer = setTimeout(() => { set(!fig.classList.contains('is-after')); play() }, hold[fig.classList.contains('is-after')])
  }
  // reduced motion switched on while the page is open: rest on "after", still
  document.addEventListener('ah:reduce', () => { stop(); set(true) })
  // back to no-preference while the page is open: the loop resumes if the figure is on screen
  document.addEventListener('ah:unreduce', play)
  if (reduced) set(true)
  inView(fig, () => { visible = true; play(); return () => { visible = false; stop() } }, { amount: 0.4 })
  const pause = (on) => () => { held = on; on ? stop() : play() }
  fig.addEventListener('pointerenter', pause(true)); fig.addEventListener('focusin', pause(true))
  fig.addEventListener('pointerleave', pause(false)); fig.addEventListener('focusout', pause(false))
}

// ─────────────────────────────── key figures band: items come in from the left one after the other, numbers count up.
// Reduced motion or no JS: the final numbers, still.
const statsAnims = []
const settleStats = () => {
  statsAnims.splice(0).forEach((a) => { try { a.stop() } catch (e) {} })
  $$('.stats-list li').forEach((li) => {
    li.style.opacity = li.style.transform = ''
    const c = $('.kpi-c', li)
    if (c && c.dataset.to != null) c.textContent = c.dataset.to
  })
}
if (!reduced) {
  const items = $$('.stats-list li')
  items.forEach((li) => { li.style.opacity = 0; li.style.transform = 'translateX(-32px)' })
  inView('.stats-list', () => {
    if (isReduced()) { settleStats(); return }
    statsAnims.push(animate(items, { opacity: [0, 1], transform: ['translateX(-32px)', 'none'] }, { duration: 0.7, delay: stagger(0.18), ease: [0.22, 1, 0.36, 1] }))
    items.forEach((li, i) => {
      const c = $('.kpi-c', li), to = Number(c.dataset.to)
      statsAnims.push(animate(0, to, { duration: 1.4, delay: 0.15 + i * 0.18, ease: 'easeOut', onUpdate: (v) => { c.textContent = Math.round(v) } }))
    })
  }, { amount: 0.5 })
}

// ─────────────────────────────── "Sound familiar?": every answer is already on the page.
// Each glyph plays its problem again, then settles on the solved state, every time it reaches the middle of the screen.
// Visual only: nothing moves in the layout, and the CSS shows the solved state when this never runs.
if (!reduced) $$('.pb-item').forEach((li) => inView(li, () => {
  if (isReduced()) return
  li.classList.remove('solved'); li.classList.add('play')
  const t = setTimeout(() => li.classList.add('solved'), 1800)
  return () => { clearTimeout(t); li.classList.remove('play', 'solved') }
}, { margin: '-30% 0px -30% 0px' }))

// ─────────────────────────────── tooltips on the example diagrams (tap, hover or keyboard)
{
  const close = (except) => $$('.tip[aria-expanded="true"]').forEach((b) => b !== except && b.setAttribute('aria-expanded', 'false'))
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.tip')
    if (!b) return close()
    b.classList.remove('tip-x')
    const open = b.getAttribute('aria-expanded') !== 'true'
    close(b)
    b.setAttribute('aria-expanded', String(open))
  })
  // Échap : ferme aussi les boîtes affichées au focus ou au survol (classe .tip-x, retirée au blur / à la sortie du survol)
  const hide = (b) => {
    b.classList.add('tip-x')
    const off = () => { b.classList.remove('tip-x'); b.removeEventListener('blur', off); b.parentElement.removeEventListener('pointerleave', off) }
    b.addEventListener('blur', off)
    b.parentElement.addEventListener('pointerleave', off)
  }
  // un nouveau survol ou focus réarme la boîte
  const rearm = (e) => { const b = e.target.closest && e.target.closest('.tip'); if (b) b.classList.remove('tip-x') }
  document.addEventListener('pointerenter', rearm, true)
  document.addEventListener('focusin', rearm)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    $$('.tip').forEach((b) => { const t = b.nextElementSibling; if (t && t.classList.contains('tip-box') && t.offsetParent !== null) hide(b) })
    close()
  })
}

// ─────────────────────────────── business card: tilt, flip, share, vCard
{
  const card = $('.bcard')
  const scene = $('.bcard-scene')
  const status = $('.bc-status')
  const say = (msg) => { status.textContent = msg; setTimeout(() => (status.textContent = ''), 2600) }
  // the links on the card open; a click anywhere else on it flips it
  let noTiltUntil = 0 // the flip keeps its slow 0.8s: no fast tilt transition while it plays
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return
    noTiltUntil = performance.now() + 800
    card.classList.remove('tilting')
    card.classList.toggle('is-flipped')
  })
  // the idle sway plays each time the card enters the screen (the class is removed on exit so it replays)
  inView(scene, () => { scene.classList.add('in'); return () => scene.classList.remove('in') }, { amount: 0.3 })
  if (matchMedia('(hover: hover)').matches) {
    let rect = null, raf = 0, px = 0, py = 0
    const apply = () => {
      raf = 0
      if (!rect || isReduced()) return
      card.style.setProperty('--ry', `${((px - rect.left) / rect.width - 0.5) * 22}deg`)
      card.style.setProperty('--rx', `${-((py - rect.top) / rect.height - 0.5) * 16}deg`)
    }
    scene.addEventListener('pointerenter', () => { rect = scene.getBoundingClientRect() })
    addEventListener('scroll', () => { rect = null }, { passive: true })
    addEventListener('resize', () => { rect = null })
    scene.addEventListener('pointermove', (e) => {
      if (isReduced()) return
      if (!rect) rect = scene.getBoundingClientRect()
      px = e.clientX; py = e.clientY
      if (performance.now() > noTiltUntil) card.classList.add('tilting')
      if (!raf) raf = requestAnimationFrame(apply)
    })
    scene.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf); raf = 0; rect = null
      card.classList.remove('tilting')
      card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg')
    })
  }
  $('[data-share]').addEventListener('click', async () => {
    const url = location.origin + location.pathname
    try {
      if (navigator.share) await navigator.share({ title: 'Antoine Hostier', text: T().shareText, url })
      else { await navigator.clipboard.writeText(url); say(T().linkCopied) }
    } catch (e) { /* share sheet dismissed */ }
  })
  // the card lifts, flies into the button and shrinks away; the button confirms; a new card settles in
  const vbtn = $('[data-vcard]')
  let doneT
  async function flyCard() {
    if (scene.dataset.flying) return
    scene.dataset.flying = '1'
    const a = scene.getBoundingClientRect(), b = vbtn.getBoundingClientRect()
    const dx = b.left + b.width / 2 - (a.left + a.width / 2)
    const dy = b.top + b.height / 2 - (a.top + a.height / 2)
    const s = Math.max(0.1, (b.width * 0.45) / a.width)
    // reduced motion switched on mid-flight: rest on the final state, no further animation
    const settle = () => {
      scene.style.transform = scene.style.opacity = vbtn.style.transform = ''
      vbtn.classList.add('is-done')
      delete scene.dataset.flying
    }
    await animate(scene, { transform: 'translate(0px, -12px) scale(1.03) rotate(-2deg)' }, { duration: 0.22, ease: 'easeOut' })
    if (isReduced()) return settle()
    await animate(scene, { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(8deg)`, opacity: 0 }, { duration: 0.55, ease: [0.6, 0, 0.8, 0.4] })
    if (isReduced()) return settle()
    vbtn.classList.add('is-done')
    animate(vbtn, { transform: ['scale(0.92)', 'scale(1)'] }, { type: 'spring', bounce: 0.5, visualDuration: 0.35 })
    await animate(scene, { transform: ['translate(0px, 28px) scale(0.96) rotate(0deg)', 'translate(0px, 0px) scale(1) rotate(0deg)'], opacity: [0, 1] },
      { type: 'spring', bounce: 0.25, visualDuration: 0.5, delay: 0.3 })
    scene.style.transform = scene.style.opacity = vbtn.style.transform = ''
    delete scene.dataset.flying
  }
  vbtn.addEventListener('click', () => {
    if (!isReduced()) {
      flyCard()
      clearTimeout(doneT)
      doneT = setTimeout(() => vbtn.classList.remove('is-done'), 3200)
    }
    const v = [
      'BEGIN:VCARD', 'VERSION:3.0', 'N:Hostier;Antoine;;;', 'FN:Antoine Hostier', 'ORG:DirectivAI',
      `TITLE:${T().vcardTitle}`, 'EMAIL;TYPE=INTERNET:netechoppe@proton.me',
      'URL:https://www.linkedin.com/in/antoine-hostier', 'URL:https://github.com/Rovis91', 'URL:https://www.malt.fr/profile/antoinehostier', 'END:VCARD',
    ].join('\r\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([v], { type: 'text/vcard' }))
    a.download = 'antoine-hostier.vcf'
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
    say(T().vcardDone)
  })
}

// ─────────────────────────────── scroll cues (native scroll, no hijacking)
// the bar stays scroll-linked in reduced motion too: it is a position indicator, not decoration
if (!reduced) scroll(animate('.progress i', { transform: ['scaleX(0)', 'scaleX(1)'] }, { ease: 'linear' }))
else scroll((p) => { $('.progress i').style.transform = `scaleX(${p})` })
// the two method cards loop endlessly, but only while on screen (the CSS pauses them without .in)
$$('.fit').forEach((el) => {
  inView(el, () => { el.classList.add('in'); return () => el.classList.remove('in') }, { amount: 0.3 })
})

const navLinks = $$('.nav a')
$$('main > section[id]').forEach((sec) => {
  inView(sec, () => {
    navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === `#${sec.id}`)))
    return () => navLinks.forEach((a) => a.getAttribute('href') === `#${sec.id}` && a.setAttribute('aria-current', 'false'))
  }, { margin: '-45% 0px -45% 0px' })
})
// each example diagram builds itself in the order of its story.
// Every part carries data-s (its step), data-i (its rank within the step) and data-a (how it appears).
// Without this (no JS, reduced motion) the diagrams simply show their final state.
if (!reduced) {
  const STEP = 0.24, RANK = 0.07
  const spring = (bounce) => ({ type: 'spring', bounce, visualDuration: 0.4 })
  const ways = {
    pop: [{ opacity: [0, 1], transform: ['scale(0.6)', 'scale(1)'] }, spring(0.3)],
    grow: [{ opacity: [0, 1], transform: ['scaleY(0)', 'scaleY(1)'] }, spring(0.2)],
    slide: [{ opacity: [0, 1], transform: ['translateX(-8px)', 'translateX(0px)'] }, { duration: 0.45, ease: 'easeOut' }],
    lift: [{ opacity: [0, 1], transform: ['translateY(6px)', 'translateY(0px)'] }, { duration: 0.35, ease: 'easeOut' }],
    fade: [{ opacity: [0, 1] }, { duration: 0.4 }],
    wipe: [{ opacity: [1, 1], clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }, { duration: 0.55, ease: 'easeInOut' }],
    wipev: [{ opacity: [1, 1], clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] }, { duration: 0.35, ease: 'easeInOut' }],
    stamp: [{ opacity: [0, 1], transform: ['scale(2.6)', 'scale(1)'] }, spring(0.45)], // the human decision lands last, like a stamp
  }
  $$('.stage-case').forEach((stage) => {
    stage.dataset.draw = 'wait'
    inView(stage, () => {
      if (isReduced()) { delete stage.dataset.draw; return }
      if (stage.dataset.draw !== 'wait') return
      stage.dataset.draw = 'run'
      let end = 0
      for (const el of $$('[data-s]', stage)) {
        const delay = Number(el.dataset.s) * STEP + Number(el.dataset.i || 0) * RANK
        const [keys, opts] = ways[el.dataset.a] || ways.fade
        end = Math.max(end, delay)
        animate(el, { ...keys }, { ...opts, delay })
      }
      setTimeout(() => {
        for (const el of $$('[data-s]', stage)) el.style.clipPath = el.style.transform = el.style.opacity = ''
        delete stage.dataset.draw
      }, (end + 1) * 1000)
    }, { amount: 0.5 })
    // the flowing dashes loop forever once drawn, but only while the diagram is on screen
    inView(stage, () => { stage.classList.add('live'); return () => stage.classList.remove('live') }, { amount: 0.2 })
  })
}

// a rail runs along the three steps with the scroll; each step lights up when the marker reaches it
if (!reduced) {
  const steps = $('.steps'), rail = $('.st-rail', steps)
  const fill = $('.st-rail-fill', rail), dot = $('.st-rail-dot', rail)
  const items = $$('li:not(.st-rail)', steps)
  const wide = matchMedia('(min-width: 900px)')
  root.classList.add('anim-2')
  let len = 0, at = [], last = 0
  const draw = (p) => {
    last = p
    const w = wide.matches
    fill.style.transform = w ? `scaleX(${p})` : `scaleY(${p})`
    dot.style.transform = w ? `translateX(${p * len}px)` : `translateY(${p * len}px)`
    for (let i = 0; i < items.length; i++) items[i].classList.toggle('on', p >= at[i])
  }
  const measure = () => {
    const r = rail.getBoundingClientRect()
    len = wide.matches ? r.width : r.height
    at = items.map((li) => {
      const b = li.getBoundingClientRect()
      return Math.max(0, (wide.matches ? b.left - r.left : b.top - r.top) / len)
    })
    draw(last)
  }
  new ResizeObserver(measure).observe(steps)
  scroll(draw, { target: steps, offset: ['start 75%', 'end 60%'] })
}

// reduced motion switched on while the page is open: everything rests on its final state
function applyReduced() {
  root.classList.add('rm')
  $$('.pb-item').forEach((li) => li.classList.add('solved'))
  $$('.stage-case[data-draw="wait"]').forEach((s) => delete s.dataset.draw) // not drawn yet: show the final state
  settleStats()
  const card = $('.bcard')
  if (card) { card.classList.remove('tilting'); card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg') }
  document.dispatchEvent(new CustomEvent('ah:reduce'))
  // motion's time-based WAAPI animations jump to their end state; scroll-linked ones (progress bar) keep following the scroll
  document.getAnimations().forEach((a) => {
    // the progress bar is a position indicator: keep it (motion's controls are not native Animations, so match on the target)
    try { if (a.effect?.target?.closest?.('.progress')) return } catch (e) {}
    if (!a.timeline || a.timeline instanceof DocumentTimeline) { try { a.finish() } catch (e) {} }
  })
}
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  if (e.matches) applyReduced()
  else { root.classList.remove('rm'); document.dispatchEvent(new CustomEvent('ah:unreduce')) }
})


// WebMCP: expose in-page tools to browser agents (no-op where unsupported).
const mc = document.modelContext || navigator.modelContext
if (mc?.registerTool) {
  const text = (t) => ({ content: [{ type: 'text', text: t }] })
  mc.registerTool({
    name: 'get_contact',
    description: 'Get Antoine Hostier (DirectivAI, freelance AI/automation consultant, Paris) contact details.',
    inputSchema: { type: 'object', properties: {} },
    execute: async () => text('Email: netechoppe@proton.me | LinkedIn: https://www.linkedin.com/in/antoine-hostier | GitHub: https://github.com/Rovis91 | Malt: https://www.malt.fr/profile/antoinehostier')
  })
  mc.registerTool({
    name: 'book_call',
    description: 'Get the link to book a free 30-minute discovery call.',
    inputSchema: { type: 'object', properties: {} },
    execute: async () => text('https://calendly.com/antoine-rtc3/30min')
  })
}
