// Primitivas de UI: criação segura de elementos (nunca innerHTML), formatação pt-BR, toast, modal, estados.
import { icon } from './icons.js';

export function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k === 'class') e.className = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (k === 'text') e.textContent = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) {
    if (c == null || c === false) continue;
    e.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return e;
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const brlShort = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const int = new Intl.NumberFormat('pt-BR');
export const fmt = {
  money: (v) => brl.format(v || 0),
  moneyShort: (v) => brlShort.format(v || 0),
  int: (v) => int.format(v || 0),
  percent: (v) => int.format(Math.round(v || 0)) + '%',
  date: (s) => { const [y, m, d] = String(s).split('-'); return y && m && d ? `${d}/${m}/${y}` : String(s || ''); },
};
export function fmtKpi(value, format) { return (fmt[format] || fmt.int)(value); }

export function fieldText(field, v) {
  if (v == null || v === '') return '—';
  if (field.type === 'money') return fmt.money(v);
  if (field.type === 'number') return fmt.int(v);
  if (field.type === 'date') return fmt.date(v);
  if (field.options) return (field.options.find((o) => o.value === v) || { label: v }).label;
  return String(v);
}

const TONE_ICON = { ok: 'check', warn: 'clock', bad: 'alert' };
export function badge(field, v) {
  const o = (field.options || []).find((x) => x.value === v) || { label: v, tone: 'neutral' };
  return h('span', { class: 'badge ' + (o.tone || '') }, TONE_ICON[o.tone] ? icon(TONE_ICON[o.tone]) : null, o.label);
}

export function toast(msg, kind = 'ok') {
  const box = document.getElementById('toasts');
  const t = h('div', { class: 'toast ' + (kind === 'bad' ? 'bad' : '') }, icon(kind === 'bad' ? 'alert' : 'check'), h('span', {}, msg));
  box.append(t);
  setTimeout(() => t.remove(), kind === 'bad' ? 7000 : 4500);
}

let lastFocus = null;
export function openModal(title, body, { onClose, wide } = {}) {
  lastFocus = document.activeElement;
  const dlg = h('dialog', { 'aria-labelledby': 'dlg-t', style: wide ? 'width:min(780px, calc(100% - 32px))' : null });
  const close = () => { if (dlg.open) dlg.close(); };
  dlg.append(
    h('div', { class: 'dh' }, h('h2', { id: 'dlg-t', style: 'font-size:1.3rem' }, title),
      h('button', { class: 'btn btn-ghost', type: 'button', 'aria-label': 'Fechar', onclick: close }, icon('x'))),
    h('div', { class: 'db' }, body));
  dlg.addEventListener('close', () => { dlg.remove(); onClose && onClose(); if (lastFocus && lastFocus.focus) lastFocus.focus(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  document.body.append(dlg);
  dlg.showModal();
  return { close, el: dlg };
}

export function confirmDialog({ title, text, confirm = 'Confirmar', danger = false }) {
  return new Promise((resolve) => {
    let ok = false;
    const m = openModal(title, [
      h('p', {}, text),
      h('div', { class: 'actions' },
        h('button', { class: 'btn btn-secondary', type: 'button', onclick: () => m.close() }, 'Cancelar'),
        h('button', { class: 'btn ' + (danger ? 'btn-danger' : 'btn-primary'), type: 'button', onclick: () => { ok = true; m.close(); } }, confirm)),
    ], { onClose: () => resolve(ok) });
  });
}

export function stateBox({ icon: ic = 'info', title, text, action, bad = false }) {
  return h('div', { class: 'state' + (bad ? ' bad' : ''), role: bad ? 'alert' : null },
    h('div', { class: 'ic' }, icon(ic)), h('h3', {}, title), text ? h('p', {}, text) : null, action || null);
}

export const skeleton = (cls) => h('div', { class: 'skel ' + (cls || ''), 'aria-hidden': 'true' });
