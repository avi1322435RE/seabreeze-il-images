/* OHAYON PROPERTIES | BAKU – lead forms
 * Two modes, chosen by LEAD_ENDPOINT below:
 *  - '' (empty): no lead service yet. The button says in advance that it opens an email,
 *    and the message never claims the enquiry was received.
 *  - an https URL: the form is sent to that service. Success is shown ONLY when the server
 *    answers HTTP 2xx with JSON {"ok": true}. Anything else shows an error and an email fallback.
 * No secret keys belong in this file: it is public. The endpoint URL is not a secret.
 */
(function () {
  'use strict';
  var LEAD_ENDPOINT = '';            // e.g. Google Apps Script web-app URL (see docs/lead-backend/)
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) && window.LEAD_TEST_ENDPOINT !== undefined) LEAD_ENDPOINT = window.LEAD_TEST_ENDPOINT;
  var TIMEOUT_MS = window.LEAD_TEST_TIMEOUT || 15000;
  var EMAIL = 'ohayon.baku@gmail.com';

  var T = {
    he: {
      reqName: 'נא למלא שם מלא (2 תווים לפחות).',
      reqPhone: 'נא למלא מספר טלפון תקין (7–15 ספרות, אפשר עם +).',
      fix: 'יש לתקן את השדות המסומנים.',
      mailBtn: 'פתיחת פנייה בדוא״ל', sendBtn: 'שליחת בקשה למידע',
      mailNote: 'הלחיצה תפתח הודעה באפליקציית הדוא״ל שלכם. יש לשלוח אותה כדי להשלים את הפנייה.',
      mailOpened: 'אם נפתחה אפליקציית הדוא״ל, יש ללחוץ שם "שליחה" כדי להשלים את הפנייה. אם היא לא נפתחה, אפשר לכתוב לנו ישירות: ',
      sending: 'שולח…',
      ok: 'הבקשה התקבלה. נחזור אליכם בפרטי הקשר שמסרתם.',
      okRef: 'מספר פנייה: ',
      fail: 'הבקשה לא נשלחה. נסו שוב או פנו אלינו בדוא״ל: ',
      net: 'הבקשה לא נשלחה כי אין חיבור לשרת. בדקו את החיבור ונסו שוב, או פנו אלינו בדוא״ל: ',
      mailLink: 'שליחה בדוא״ל',
      subject: 'פנייה חדשה מהאתר – ', nameL: 'שם', phoneL: 'טלפון', pageL: 'עמוד'
    },
    en: {
      reqName: 'Please enter your full name (at least 2 characters).',
      reqPhone: 'Please enter a valid phone number (7–15 digits, + allowed).',
      fix: 'Please correct the highlighted fields.',
      mailBtn: 'Open an email enquiry', sendBtn: 'Send a request for information',
      mailNote: 'This button opens your email app with your details. The enquiry is sent only after you press "Send" in your email app.',
      mailOpened: 'Your email app has opened with your details. We receive the enquiry only after you press "Send" there. If it did not open, write to us directly: ',
      sending: 'Sending…',
      ok: 'Your details were received. We will get back to you personally.',
      okRef: 'Reference: ',
      fail: 'Your details were not sent because of an error. Please try again shortly, or email us: ',
      net: 'The server cannot be reached right now and your details were not sent. Check your connection and try again, or email us: ',
      mailLink: 'Send by email',
      subject: 'New website enquiry – ', nameL: 'Name', phoneL: 'Phone', pageL: 'Page'
    },
    ru: {
      reqName: 'Пожалуйста, укажите имя (не менее 2 символов).',
      reqPhone: 'Пожалуйста, укажите корректный номер телефона (7–15 цифр, можно с +).',
      fix: 'Исправьте отмеченные поля.',
      mailBtn: 'Открыть заявку по e-mail', sendBtn: 'Отправить запрос',
      mailNote: 'Кнопка откроет почтовое приложение с вашими данными. Заявка будет отправлена только после того, как вы нажмёте «Отправить» в почте.',
      mailOpened: 'Открылось почтовое приложение с вашими данными. Мы получим заявку только после того, как вы нажмёте «Отправить». Если приложение не открылось, напишите нам: ',
      sending: 'Отправка…',
      ok: 'Ваши данные получены. Мы свяжемся с вами лично.',
      okRef: 'Номер заявки: ',
      fail: 'Данные не отправлены из-за ошибки. Попробуйте ещё раз чуть позже или напишите нам: ',
      net: 'Сервер сейчас недоступен, данные не отправлены. Проверьте подключение и попробуйте снова или напишите нам: ',
      mailLink: 'Отправить по e-mail',
      subject: 'Новая заявка с сайта – ', nameL: 'Имя', phoneL: 'Телефон', pageL: 'Страница'
    },
    az: {
      reqName: 'Zəhmət olmasa adınızı daxil edin (ən azı 2 simvol).',
      reqPhone: 'Zəhmət olmasa düzgün telefon nömrəsi daxil edin (7–15 rəqəm, + ola bilər).',
      fix: 'Qeyd olunan sahələri düzəldin.',
      mailBtn: 'E-poçtla sorğu açın', sendBtn: 'Məlumat sorğusu göndərin',
      mailNote: 'Düymə məlumatlarınızla e-poçt tətbiqini açır. Sorğu yalnız e-poçtda "Göndər" düyməsini basdıqdan sonra göndərilir.',
      mailOpened: 'E-poçt tətbiqi məlumatlarınızla açıldı. Sorğunu yalnız orada "Göndər" basdıqdan sonra alırıq. Açılmadısa, bizə birbaşa yazın: ',
      sending: 'Göndərilir…',
      ok: 'Məlumatlarınız qəbul edildi. Sizinlə şəxsən əlaqə saxlayacağıq.',
      okRef: 'Sorğu nömrəsi: ',
      fail: 'Xəta səbəbindən məlumatlar göndərilmədi. Bir az sonra yenidən cəhd edin və ya bizə yazın: ',
      net: 'Hazırda serverə qoşulmaq mümkün deyil, məlumatlar göndərilmədi. Bağlantını yoxlayıb yenidən cəhd edin və ya bizə yazın: ',
      mailLink: 'E-poçtla göndərin',
      subject: 'Saytdan yeni sorğu – ', nameL: 'Ad', phoneL: 'Telefon', pageL: 'Səhifə'
    },
    ar: {
      reqName: 'يرجى إدخال الاسم الكامل (حرفان على الأقل).',
      reqPhone: 'يرجى إدخال رقم هاتف صحيح (من 7 إلى 15 رقمًا، ويمكن استخدام +).',
      fix: 'يرجى تصحيح الحقول المحددة.',
      mailBtn: 'فتح استفسار عبر البريد الإلكتروني', sendBtn: 'إرسال طلب معلومات',
      mailNote: 'يفتح هذا الزر تطبيق البريد الإلكتروني مع بياناتك. لا يُرسل الاستفسار إلا بعد الضغط على "إرسال" في البريد.',
      mailOpened: 'تم فتح تطبيق البريد الإلكتروني مع بياناتك. لن يصلنا الاستفسار إلا بعد الضغط على "إرسال" هناك. إذا لم يُفتح، راسلنا مباشرة: ',
      sending: 'جارٍ الإرسال…',
      ok: 'تم استلام بياناتك. سنتواصل معك شخصيًا.',
      okRef: 'رقم الطلب: ',
      fail: 'لم تُرسل البيانات بسبب خطأ. حاول مرة أخرى بعد قليل، أو راسلنا عبر البريد: ',
      net: 'تعذّر الوصول إلى الخادم حاليًا ولم تُرسل البيانات. تحقق من الاتصال وحاول مجددًا، أو راسلنا عبر البريد: ',
      mailLink: 'إرسال عبر البريد',
      subject: 'استفسار جديد من الموقع – ', nameL: 'الاسم', phoneL: 'الهاتف', pageL: 'الصفحة'
    }
  };
  var lang = (document.documentElement.lang || 'he').slice(0, 2).toLowerCase();
  var L = T[lang] || T.he;

  var css = '.lead-err{display:block;margin-top:6px;font-size:14px;line-height:1.5;color:var(--lead-err,#A3302B);font-weight:400}' +
    '.form input[aria-invalid=true]{border-bottom-color:var(--lead-err,#A3302B)!important}' +
    '.lead-note{margin:12px 0 0;font-size:14px;line-height:1.6;opacity:.85}' +
    '.fmsg.lead-bad{color:var(--lead-err,#A3302B)}.fmsg a{text-decoration:underline;color:inherit}' +
    '.form button[aria-busy=true]{opacity:.7;cursor:progress}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function digits(s) { return (s.match(/\d/g) || []).length; }
  function field(f, sel) { return f.querySelector(sel); }
  function val(e) { return e ? e.value.trim() : ''; }

  function msg(f, btn) {
    var m = f.querySelector('.fmsg');
    if (!m) {
      m = document.createElement('p'); m.className = 'fmsg'; m.setAttribute('role', 'status'); m.setAttribute('aria-live', 'polite');
      m.style.cssText = 'margin:14px 0 0;font-size:15px;line-height:1.6';
      btn.insertAdjacentElement('afterend', m);
    }
    return m;
  }
  function setErr(input, text) {
    if (!input) return;
    var id = (input.id || (input.id = 'lf-' + Math.random().toString(36).slice(2, 8))) + '-err';
    var e = document.getElementById(id);
    if (text) {
      if (!e) { e = document.createElement('span'); e.className = 'lead-err'; e.id = id; input.insertAdjacentElement('afterend', e); }
      e.textContent = text; input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', id);
    } else {
      if (e) e.remove(); input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby');
    }
  }
  function extras(f) {
    return [].slice.call(f.querySelectorAll('select,textarea')).map(function (e) {
      var l = e.closest('label'); var k = l ? l.firstChild && l.firstChild.nodeType === 3 ? l.firstChild.nodeValue.trim() : '' : '';
      var v = e.tagName === 'SELECT' ? (e.options[e.selectedIndex] || {}).text || e.value : e.value;
      return { label: k, value: (v || '').trim() };
    }).filter(function (x) { return x.value; });
  }
  function mailHref(d) {
    var body = L.nameL + ': ' + d.name + '\n' + L.phoneL + ': ' + d.phone +
      d.extra.map(function (x) { return '\n' + (x.label ? x.label + ': ' : '') + x.value; }).join('') +
      '\n' + L.pageL + ': ' + document.title + '\n' + location.href;
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(L.subject + document.title) + '&body=' + encodeURIComponent(body);
  }
  function mailLink(href, text) {
    var a = document.createElement('a'); a.href = href; a.textContent = text; a.setAttribute('dir', 'ltr'); return a;
  }

  function validate(f) {
    var nIn = field(f, 'input[autocomplete=name]'), pIn = field(f, 'input[type=tel]');
    var n = val(nIn), p = val(pIn), bad = [];
    var nOk = n.length >= 2, pOk = /^[+\d\s\-().]+$/.test(p) && digits(p) >= 7 && digits(p) <= 15;
    setErr(nIn, nOk ? '' : L.reqName); if (!nOk) bad.push(nIn);
    setErr(pIn, pOk ? '' : L.reqPhone); if (!pOk) bad.push(pIn);
    return { ok: !bad.length, first: bad[0], name: n, phone: p };
  }

  function sendLead(btn) {
    var f = btn.closest('form') || btn.closest('.form'); if (!f) return false;
    if (btn.getAttribute('aria-busy') === 'true') return false;
    var m = msg(f, btn); m.classList.remove('lead-bad');
    var v = validate(f);
    if (!v.ok) { m.textContent = L.fix; m.classList.add('lead-bad'); v.first && v.first.focus(); return false; }
    var hp = field(f, 'input[name=website]');
    var d = { name: v.name, phone: v.phone, extra: extras(f) };
    var href = mailHref(d);

    if (!LEAD_ENDPOINT) {
      location.href = href;
      m.textContent = L.mailOpened; m.appendChild(mailLink('mailto:' + EMAIL, EMAIL));
      return false;
    }

    var label = btn.textContent;
    btn.setAttribute('aria-busy', 'true'); btn.disabled = true; btn.textContent = L.sending; m.textContent = '';
    var ctrl = ('AbortController' in window) ? new AbortController() : null;
    var timer = setTimeout(function () { ctrl && ctrl.abort(); }, TIMEOUT_MS);
    var payload = {
      name: d.name, phone: d.phone,
      project: (d.extra[0] || {}).value || '',
      extra: d.extra, page: document.title, url: location.href, lang: lang,
      website: hp ? hp.value : ''
    };
    function done() { clearTimeout(timer); btn.removeAttribute('aria-busy'); btn.disabled = false; btn.textContent = label; }
    function fail(text) {
      done(); m.classList.add('lead-bad'); m.textContent = text;
      m.appendChild(mailLink(href, L.mailLink)); m.appendChild(document.createTextNode(' (' + EMAIL + ')'));
    }
    fetch(LEAD_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload), signal: ctrl ? ctrl.signal : undefined, credentials: 'omit'
    }).then(function (r) {
      return r.text().then(function (t) { var j = null; try { j = JSON.parse(t); } catch (e) {} return { r: r, j: j }; });
    }).then(function (x) {
      if (x.r.ok && x.j && x.j.ok === true) {
        done(); m.textContent = L.ok + (x.j.id ? ' ' + L.okRef + x.j.id : '');
        [].slice.call(f.querySelectorAll('input:not([type=hidden])')).forEach(function (i) { i.value = ''; });
      } else { fail(L.fail); }
    }).catch(function () { fail(L.net); });
    return false;
  }

  function isDark(el) {
    for (var e = el; e && e.nodeType === 1; e = e.parentElement) {
      var c = getComputedStyle(e).backgroundColor, m = c.match(/[\d.]+/g);
      if (m && (m.length < 4 || +m[3] > 0.3)) { return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) < 140; }
    }
    return false;
  }
  function init() {
    [].slice.call(document.querySelectorAll('form.form')).forEach(function (f) {
      if (!field(f, 'input[type=tel]')) return;
      f.setAttribute('novalidate', '');
      f.style.setProperty('--lead-err', isDark(f) ? '#F2A79C' : '#A3302B');
      f.removeAttribute('onsubmit');
      var btn = f.querySelector('button'); if (!btn) return;
      btn.removeAttribute('onclick'); btn.type = 'submit';
      if (!field(f, 'input[name=website]')) {
        var hp = document.createElement('input');
        hp.type = 'text'; hp.name = 'website'; hp.tabIndex = -1; hp.autocomplete = 'off'; hp.setAttribute('aria-hidden', 'true');
        hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
        f.appendChild(hp);
      }
      if (LEAD_ENDPOINT) { btn.textContent = L.sendBtn; }
      if (!LEAD_ENDPOINT) {
        btn.textContent = L.mailBtn;
        if (!f.querySelector('.lead-note')) {
          var n = document.createElement('p'); n.className = 'lead-note'; n.textContent = L.mailNote;
          btn.insertAdjacentElement('beforebegin', n);
        }
      }
      [].slice.call(f.querySelectorAll('input[autocomplete=name],input[type=tel]')).forEach(function (i) {
        i.addEventListener('input', function () { if (i.getAttribute('aria-invalid')) setErr(i, ''); });
      });
      f.addEventListener('submit', function (e) { e.preventDefault(); sendLead(btn); });
    });
  }
  window.sendLead = sendLead;
  window.__leadConfig = { mode: LEAD_ENDPOINT ? 'server' : 'email' };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
