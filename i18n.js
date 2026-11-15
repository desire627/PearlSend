/* English / Russian translations.
   Mark elements with:
     data-i18n="key"       -> replaces text
     data-i18n-html="key"  -> replaces HTML (for text containing <span> etc.)
     data-i18n-ph="key"    -> replaces placeholder
*/
(function () {
  const STRINGS = {
    en: {
      'title.home': 'MefraPay – Money transfers Russia ⇄ Uganda',
      'title.send': 'Send Money – MefraPay',
      'title.thanks': 'Request Received – MefraPay',

      'nav.home': 'Home',
      'nav.send': 'Send Money',

      'hero.eyebrow': 'Russia ⇄ Uganda',
      'hero.title': 'Send money between <span>Russia</span> &amp; <span>Uganda</span> — fast, simple, and secure.',
      'hero.lead': 'Your money. Your people. One easy transfer.',
      'route.to': 'Russia → Uganda',
      'route.from': 'Uganda → Russia',

      'how.eyebrow': 'How it works',
      'how.title': 'From your form to their phone in three steps',
      'how.lead': 'No account, no app to download. Just tell us who should get the money and we take it from there.',
      'how.b1': '✓ No sign-up',
      'how.b2': '✓ Roubles & shillings',
      'how.b3': '✓ Both directions',
      'how.cta': 'Start now →',

      's1.label': 'Step 1',
      's1.title': 'Fill the form',
      's1.text': 'Enter the amount, plus the name and phone number of the person receiving the money.',
      'pf.amount': 'Amount',
      'pf.recipient': 'Recipient',
      'pf.phone': 'Phone',
      's2.label': 'Step 2',
      's2.title': 'We confirm with you',
      's2.text': 'We review your request and contact you by phone or email to agree the details.',
      'chat.in': "Hi! Confirming 10 000 ₽ to Sarah N. in Kampala 👍",
      'chat.out': "Yes, that's correct ✓",
      's3.label': 'Step 3',
      's3.title': 'Money is delivered',
      's3.text': 'The recipient gets the money on Mobile Money in Uganda, or on a bank card in Russia.',
      'notify.title': 'Money received',
      'notify.text': "You have received UGX 450,000",
      'notify.time': 'now',

      'dir.to.title': 'Sending to Uganda?',
      'dir.to.text': 'Support family and friends in Uganda. You pay in roubles, they receive shillings on MTN or Airtel Mobile Money.',
      'dir.from.title': 'Sending to Russia?',
      'dir.from.text': 'In Uganda and need to send money to Russia? Pay in shillings and the recipient gets roubles on their bank card.',
      'dir.cta': 'Start a transfer →',

      'footer.send': 'Send money →',
      'footer.back': '← Back to home',

      'aside.to': 'Send money to your loved ones in Uganda',
      'aside.from': 'Send money from Uganda to Russia',
      'aside.text': "Fill in the details and we'll get back to you to confirm the transfer.",
      'aside.li1': 'RUB ⇄ UGX transfers',
      'aside.li2': 'We confirm every request personally',
      'aside.li3': 'Your details are kept private',

      'form.title': 'Transfer request',
      'form.sub': 'All fields are required unless marked optional.',
      'legend.transfer': 'Transfer',
      'f.amount': 'Amount to send',
      'f.payout': 'Recipient receives via',
      'legend.recipient.to': 'Recipient in Uganda',
      'legend.recipient.from': 'Recipient in Russia',
      'f.fullname': 'Full name',
      'f.phone': 'Phone number',
      'legend.sender': 'Your details',
      'f.yourname': 'Your full name',
      'f.yourphone': 'Your phone number',
      'f.email': 'Email',
      'f.notes': 'Message',
      'opt': '(optional)',
      'ph.amount': 'e.g. 10 000',
      'ph.notes': 'e.g. Birthday gift',
      'payout.mtn': 'MTN Mobile Money',
      'payout.airtel': 'Airtel Money',
      'payout.card': 'Bank card',
      'payout.sbp': 'SBP (Fast Payment System)',
      'consent': 'I confirm these details are correct and agree to be contacted about this request.',
      'submit': 'Submit request',
      'footer.rights': "All rights reserved.",
      'footer.join': "Join our channel for rates, news and updates.",
      'footer.telegram': "Telegram channel",
      'footer.contact': "Contact us",
      'footer.tagline': "Fast, personal money transfers between Russia and Uganda.",
      'pay.pending': "We'll send you the payment details when we contact you.",
      'pay.receipt': "After paying, send us the receipt and your reference number:",
      'pay.comment': "Write your reference {ref} in the payment comment.",
      'pay.holder': "Account name",
      'pay.amount': "Amount to pay",
      'pay.title': "Pay to this account",
      'ok.w3': "The money is delivered to the recipient",
      'ok.w2': "We call or message you to confirm",
      'ok.w1': "We check your request",
      'ok.textPending': "Thank you, {name}. We've received your request and will contact you shortly to confirm.",
      'limit.over': "This is above our limit. Maximum per transfer: {max}",
      'limit.max': "Maximum per transfer: {max}",
      'sending': 'Sending…',

      'ok.title': 'Request sent!',
      'ok.text': "Thank you, {name}. Your request is registered. To complete the transfer, pay to the account below.",
      'ok.ref': 'Reference number',
      'ok.copy': 'Copy',
      'ok.copied': 'Copied ✓',
      'ok.route': 'Route',
      'ok.next': 'What happens next',
      'ok.n1': "Pay to the account above",
      'ok.n2': "Send us the payment receipt",
      'ok.n3': "We deliver the money to the recipient",
      'ok.keep': 'Save your reference number in case you need to contact us.',
      'ok.again': 'Send another',
      'ok.home': 'Back to home',

      'conv.eyebrow': 'Converter',
      'conv.title': 'How much will they receive?',
      'conv.lead': "Type how much you want to send, or how much the other person should get. We work it out at our current rate.",
      'conv.p1': 'Rouble ⇄ Ugandan shilling',
      'conv.p2': 'Updated exchange rate',
      'conv.p3': 'Works in both directions',
      'conv.send': 'You send',
      'conv.receive': 'They receive',
      'conv.rate': 'Exchange rate',
      'conv.fee': 'Our fee',
      'conv.note': 'Estimate only. The final amount is confirmed when we contact you.',
      'conv.offline': 'Approximate rate',
      'conv.cta': 'Send this amount →',
      'conv.live': 'Live rate',
      'conv.ours': "Our rate",
      'conv.updated': 'Updated',
      'cur.RUB': 'Russian rouble',
      'cur.UGX': 'Ugandan shilling',
      'est.gets': 'Recipient gets',
      'est.pay': 'You pay',

      'thanks.title': 'Request received!',
      'thanks.text': "Thank you. We've received your transfer details and will contact you shortly to confirm.",
      'thanks.back': 'Back to home'
    },

    ru: {
      'title.home': 'MefraPay – Денежные переводы Россия ⇄ Уганда',
      'title.send': 'Отправить деньги – MefraPay',
      'title.thanks': 'Заявка получена – MefraPay',

      'nav.home': 'Главная',
      'nav.send': 'Отправить деньги',

      'hero.eyebrow': 'Россия ⇄ Уганда',
      'hero.title': 'Переводы между <span>Россией</span> и <span>Угандой</span> — быстро, просто и надёжно.',
      'hero.lead': 'Ваши деньги. Ваши близкие. Один простой перевод.',
      'route.to': 'Россия → Уганда',
      'route.from': 'Уганда → Россия',

      'how.eyebrow': 'Как это работает',
      'how.title': 'От заявки до получателя — за три шага',
      'how.lead': 'Без регистрации и приложений. Просто укажите, кому отправить деньги, — остальное мы сделаем сами.',
      'how.b1': '✓ Без регистрации',
      'how.b2': '✓ Рубли и шиллинги',
      'how.b3': '✓ В обе стороны',
      'how.cta': 'Начать →',

      's1.label': 'Шаг 1',
      's1.title': 'Заполните форму',
      's1.text': 'Укажите сумму, а также имя и номер телефона получателя.',
      'pf.amount': 'Сумма',
      'pf.recipient': 'Получатель',
      'pf.phone': 'Телефон',
      's2.label': 'Шаг 2',
      's2.title': 'Мы подтверждаем детали',
      's2.text': 'Мы проверим заявку и свяжемся с вами по телефону или email, чтобы согласовать детали.',
      'chat.in': "Здравствуйте! Подтверждаем перевод 10 000 ₽ для Sarah N. в Кампалу 👍",
      'chat.out': 'Да, всё верно ✓',
      's3.label': 'Шаг 3',
      's3.title': 'Деньги доставлены',
      's3.text': 'Получатель получает деньги на Mobile Money в Уганде или на банковскую карту в России.',
      'notify.title': 'Деньги получены',
      'notify.text': "Вам зачислено 450 000 UGX",
      'notify.time': 'сейчас',

      'dir.to.title': 'Отправляете в Уганду?',
      'dir.to.text': 'Поддержите родных и друзей в Уганде. Вы платите в рублях — они получают шиллинги на MTN или Airtel Mobile Money.',
      'dir.from.title': 'Отправляете в Россию?',
      'dir.from.text': 'Находитесь в Уганде и нужно отправить деньги в Россию? Оплатите в шиллингах — получатель получит рубли на банковскую карту.',
      'dir.cta': 'Начать перевод →',

      'footer.send': 'Отправить деньги →',
      'footer.back': '← На главную',

      'aside.to': 'Отправьте деньги близким в Уганду',
      'aside.from': 'Отправьте деньги из Уганды в Россию',
      'aside.text': 'Заполните данные, и мы свяжемся с вами для подтверждения перевода.',
      'aside.li1': 'Переводы RUB ⇄ UGX',
      'aside.li2': 'Мы лично подтверждаем каждую заявку',
      'aside.li3': 'Ваши данные конфиденциальны',

      'form.title': 'Заявка на перевод',
      'form.sub': 'Все поля обязательны, кроме отмеченных «необязательно».',
      'legend.transfer': 'Перевод',
      'f.amount': 'Сумма перевода',
      'f.payout': 'Способ получения',
      'legend.recipient.to': 'Получатель в Уганде',
      'legend.recipient.from': 'Получатель в России',
      'f.fullname': 'Полное имя',
      'f.phone': 'Номер телефона',
      'legend.sender': 'Ваши данные',
      'f.yourname': 'Ваше полное имя',
      'f.yourphone': 'Ваш номер телефона',
      'f.email': 'Email',
      'f.notes': 'Сообщение',
      'opt': '(необязательно)',
      'ph.amount': 'например, 10 000',
      'ph.notes': 'например, подарок на день рождения',
      'payout.mtn': 'MTN Mobile Money',
      'payout.airtel': 'Airtel Money',
      'payout.card': 'Банковская карта',
      'payout.sbp': 'СБП (Система быстрых платежей)',
      'consent': 'Я подтверждаю правильность данных и согласен(на), чтобы со мной связались по этой заявке.',
      'submit': 'Отправить заявку',
      'footer.rights': "Все права защищены.",
      'footer.join': "Подписывайтесь на наш канал: курсы, новости и обновления.",
      'footer.telegram': "Telegram-канал",
      'footer.contact': "Свяжитесь с нами",
      'footer.tagline': "Быстрые и надёжные переводы между Россией и Угандой.",
      'pay.pending': "Реквизиты для оплаты мы отправим вам, когда свяжемся с вами.",
      'pay.receipt': "После оплаты отправьте нам чек и номер заявки:",
      'pay.comment': "Укажите номер заявки {ref} в комментарии к платежу.",
      'pay.holder': "Получатель",
      'pay.amount': "Сумма к оплате",
      'pay.title': "Реквизиты для оплаты",
      'ok.w3': "Деньги доставляются получателю",
      'ok.w2': "Мы звоним или пишем вам для подтверждения",
      'ok.w1': "Мы проверяем вашу заявку",
      'ok.textPending': "Спасибо, {name}! Мы получили вашу заявку и скоро свяжемся с вами для подтверждения.",
      'limit.over': "Сумма превышает лимит. Максимум за один перевод: {max}",
      'limit.max': "Максимум за один перевод: {max}",
      'sending': 'Отправка…',

      'ok.title': 'Заявка отправлена!',
      'ok.text': "Спасибо, {name}! Заявка зарегистрирована. Чтобы завершить перевод, оплатите на указанный ниже счёт.",
      'ok.ref': 'Номер заявки',
      'ok.copy': 'Копировать',
      'ok.copied': 'Скопировано ✓',
      'ok.route': 'Направление',
      'ok.next': 'Что дальше',
      'ok.n1': "Оплатите на указанный счёт",
      'ok.n2': "Отправьте нам чек об оплате",
      'ok.n3': "Мы доставляем деньги получателю",
      'ok.keep': 'Сохраните номер заявки — он пригодится, если вы будете связываться с нами.',
      'ok.again': 'Новая заявка',
      'ok.home': 'На главную',

      'conv.eyebrow': 'Калькулятор',
      'conv.title': 'Сколько получит получатель?',
      'conv.lead': "Введите сумму, которую хотите отправить, или сумму, которую должен получить получатель. Мы рассчитаем остальное по нашему курсу.",
      'conv.p1': 'Рубль ⇄ угандийский шиллинг',
      'conv.p2': 'Актуальный курс',
      'conv.p3': 'В обе стороны',
      'conv.send': 'Вы отправляете',
      'conv.receive': 'Получатель получит',
      'conv.rate': 'Курс обмена',
      'conv.fee': 'Комиссия',
      'conv.note': 'Расчёт предварительный. Точную сумму мы подтвердим при связи с вами.',
      'conv.offline': 'Приблизительный курс',
      'conv.cta': 'Отправить эту сумму →',
      'conv.live': 'Актуальный курс',
      'conv.ours': "Наш курс",
      'conv.updated': 'Обновлено',
      'cur.RUB': 'Российский рубль',
      'cur.UGX': 'Угандийский шиллинг',
      'est.gets': 'Получатель получит',
      'est.pay': 'Вы заплатите',

      'thanks.title': 'Заявка получена!',
      'thanks.text': 'Спасибо! Мы получили данные вашего перевода и скоро свяжемся с вами для подтверждения.',
      'thanks.back': 'На главную'
    }
  };

  const KEY = 'mefrapay-lang';

  function detect() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl === 'en' || fromUrl === 'ru') return fromUrl;
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'en' || saved === 'ru') return saved;
    } catch (e) {}
    const langs = navigator.languages || [navigator.language || 'en'];
    return langs.some(l => /^(ru|be|kk|uk)\b/i.test(l)) ? 'ru' : 'en';
  }

  let lang = detect();

  function t(key) {
    return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply();
  }

  document.querySelectorAll('.lang-switch button').forEach(b => {
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });

  window.I18N = { t, setLang, get lang() { return lang; } };
  apply();
})();
