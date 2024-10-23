import { Head, Html, Link, Meta, Title } from "#build/components";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "decohome",
      htmlAttrs: {
        lang: "fr",
      },

      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "magasin de vente de fourtniture enligne",
        },
        { name: "format-detection", content: "telephone=no" },
      ],

      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-09-21",
  css: ["@/assets/scss/app.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/_colors.scss" as *;
            @use "@/assets/scss/_layouts.scss" as *;
            @use "@/assets/scss/_typography.scss" as *;
          `,
        },
      },
    },
  },

  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@hypernym/nuxt-anime",
    "@pinia/nuxt",
    "@nuxt/ui",
  ],

  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },

  i18n: {
    locales: [
      {
        code: "fr",
        iso: "fr-FR",
        name: "français(FR)",
        dir: "ltr",
        files: ["fr/common.json"],
      },
      {
        code: "en",
        iso: "en-US",
        name: "english(EN)",
        dir: "ltr",
        files: ["en/common.json"],
      },
      {
        code: "ar",
        iso: "ar-DZ",
        name: "arabic(AR)",
        dir: "rtl",
        files: ["ar/common.json"],
      },
    ],

    defaultLocale: "fr",
    lazy: true,
    langDir: "locales",
  },
  runtimeConfig: {
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  },
});
