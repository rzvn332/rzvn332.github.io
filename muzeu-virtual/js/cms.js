/* Muzeu CMS bootloader — leagă site-ul static de Google Apps Script API.
 * Pune link-ul Web App în CMS_API_URL (…/exec), apoi Deploy pe Vercel.
 * Ordine: încearcă API-ul live → fallback cache localStorage → fallback js/data.js + js/raioane.js
 * muzeu.js se încarcă DINAMIC abia după ce MUZEU/RAIOANE sunt gata. */
(function () {
  'use strict';
  var CMS_API_URL = 'https://script.google.com/macros/s/AKfycbyE0kWKxc1VZ5j5oWseXkEK8-2Xsyw4hjHpxwUttr1c4dLf3ow5vPcXW1OAPWyWc5X7wA/exec'; // ex: https://script.google.com/macros/s/AKfy.../exec
  var CACHE_KEY = 'muzeu-cms-cache-v1';
  var TIMEOUT_MS = 8000;

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = false;
      s.onload = res;
      s.onerror = function () { rej(new Error('Nu s-a încărcat ' + src)); };
      document.body.appendChild(s);
    });
  }
  function fetchJSON(url, ms) {
    var c = ('AbortController' in window) ? new AbortController() : null;
    var t = setTimeout(function () { if (c) c.abort(); }, ms);
    var opt = c ? { signal: c.signal, cache: 'no-store' } : { cache: 'no-store' };
    return fetch(url, opt).then(function (r) {
      clearTimeout(t);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).catch(function (e) { clearTimeout(t); throw e; });
  }
  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || !o.MUZEU || !o.RAIOANE) return null;
      return o;
    } catch (e) { return null; }
  }
  function writeCache(muzeu, raioane) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), MUZEU: muzeu, RAIOANE: raioane })); } catch (e) {}
  }
  function useData(muzeu, raioane) {
    window.MUZEU = muzeu;
    window.RAIOANE = raioane;
  }
  function apiURL() {
    if (!CMS_API_URL || CMS_API_URL.indexOf('PASTE_AICI') !== -1) return null;
    return CMS_API_URL + (CMS_API_URL.indexOf('?') === -1 ? '?action=getData' : '&action=getData');
  }

  async function boot() {
    var url = apiURL();
    if (url) {
      try {
        var data = await fetchJSON(url, TIMEOUT_MS);
        if (data && data.ok && data.MUZEU && data.RAIOANE) {
          useData(data.MUZEU, data.RAIOANE);
          writeCache(data.MUZEU, data.RAIOANE);
          window.CMS_STATUS = 'live';
          await loadScript('js/muzeu.js');
          return;
        }
        throw new Error('Răspuns API invalid');
      } catch (e) {
        console.warn('[cms] API indisponibil, încerc cache:', e.message || e);
      }
    }
    var c = readCache();
    if (c) {
      useData(c.MUZEU, c.RAIOANE);
      window.CMS_STATUS = 'cache';
      await loadScript('js/muzeu.js');
      return;
    }
    window.CMS_STATUS = 'static';
    await loadScript('js/data.js');
    await loadScript('js/raioane.js');
    await loadScript('js/muzeu.js');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot().catch(function (e) { console.error('[cms]', e); }); });
  } else {
    boot().catch(function (e) { console.error('[cms]', e); });
  }
})();
