// import { createI18n } from 'vue-i18n';
// import request from '@/plugins/axios';
// import axios from "axios";


// const LANG_API_URL = import.meta.env.VITE_LANG_API_URL;

// interface langsResType {
//   totalLang: number;
//   list: {
//     askPayload: string;
//     downloadPath: string;
//     downloadUrl: string;
//   }[];
// }

// async function LoadLangs() {
//   let langs = {};
//   const { data: res }: { data: langsResType } = await axios.get(`${LANG_API_URL}/lang`);
//   for (let i = 0; i < res.list.length; i++) {
//     const lang = res.list[i];
//     const lang_res = await axios.get(`${LANG_API_URL}${lang.downloadPath}`);
//     if (lang_res.status === 200) langs[lang.askPayload] = lang_res.data;
//   }
//   return langs;
// }

// function DetermineLocale() {
//   const _lang = localStorage.getItem('lang');
//   let locale = navigator.language || 'zh-CN';

//   if (import.meta.env.DEV) {
//     locale = _lang || 'zh-CN';
//   }

//   if (locale.includes('vi')) {
//     locale = 'vi';
//   } else if (locale.includes('zh')) {
//     locale = 'zh-CN';
//   }
//   return locale;
// }

// export const langs = await LoadLangs();
// const locale = DetermineLocale();

// const i18n = createI18n({
//   legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
//   locale,
//   // 各國貨幣設定檔
//   numberFormats: {
//     'en-US': {
//       currency: {
//         style: 'currency',
//         currency: 'USD',
//         notation: 'standard',
//       },
//       decimal: {
//         style: 'decimal',
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       },
//       percent: {
//         style: 'percent',
//         useGrouping: false,
//       },
//     },
//     'zh-TW': {
//       currency: {
//         style: 'currency',
//         currency: 'TWD',
//         notation: 'standard',
//       },
//       decimal: {
//         style: 'decimal',
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       },
//       percent: {
//         style: 'percent',
//         useGrouping: false,
//       },
//     },
//     'zh-CN': {
//       currency: {
//         style: 'currency',
//         currency: 'CNY',
//         notation: 'standard',
//       },
//       decimal: {
//         style: 'decimal',
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       },
//       percent: {
//         style: 'percent',
//         useGrouping: false,
//       },
//     },
//     vi: {
//       currency: {
//         style: 'currency',
//         currency: 'VND',
//         notation: 'standard',
//       },
//       decimal: {
//         style: 'decimal',
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       },
//       percent: {
//         style: 'percent',
//         useGrouping: false,
//       },
//     },
//     'ja-JP': {
//       currency: {
//         style: 'currency',
//         currency: 'JPY',
//         useGrouping: true,
//         currencyDisplay: 'symbol',
//       },
//       decimal: {
//         style: 'decimal',
//         minimumSignificantDigits: 3,
//         maximumSignificantDigits: 5,
//       },
//       percent: {
//         style: 'percent',
//         useGrouping: false,
//       },
//     },
//   },
//   fallbackLocale: 'zh-CN',
//   globalInjection: true,
//   messages: langs,
//   warnHtmlInMessage: 'off',
// });

// export default i18n;