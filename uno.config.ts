import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-main': 'bg-hex-eef5fc dark:bg-hex-0d1117',
      'text-main': 'text-hex-555555 dark:text-hex-bbbbbb',
      'text-link': 'text-dark dark:text-white ',
      'border-main': 'border-truegray-300 dark:border-truegray-600',
    },
    {
      'text-title': 'text-link text-4xl font-800',
      'nav-link': 'text-link opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer',
      'prose-link': 'text-link text-nowrap cursor-pointer border-b-1 !border-opacity-30 hover:!border-opacity-100 border-neutral-500 hover:border-truegray-600 dark:border-neutral-500 hover:dark:border-truegray-400 transition-border-color duration-200 decoration-none',
      'container-link': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-truegray-500 !bg-opacity-10 transition-colors transition-opacity duration-200',
    },
    {
      'hr-line': 'w-14 mx-auto my-8 border-solid border-1px !border-truegray-200 !dark:border-truegray-800',
    },
    {
      'year-background': 'text-7em text-[rgba(170,170,170,0.001)] absolute top--0.2em',
      'year-background-bold': 'text-[rgba(170,170,170,0.14)]',
      'year-background-simple': 'text-7em text-[rgba(170,170,170,0.14)] absolute top--0.2em',
      'year-background-bold-simple': 'text-7em text-[rgba(170,170,170,0.14)] absolute top--0.2em font-bold',
      'year-background-outline': 'text-7em text-[rgba(170,170,170,0.14)] absolute top--0.2em',
      'year-background-outline-bold': 'text-7em text-[rgba(170,170,170,0.14)] absolute top--0.2em font-bold',
      'year-background-background-clip': 'text-7em text-[rgba(170,170,170,0.14)] absolute top--0.2em',
      'year-background-background-clip-bold': 'text-7em text-[rgba(170,170,170,0.14)] absolute top--0.2em font-bold',
    },
  ],
  theme: {
    extend: {
      textShadow: {
        year: '-2px -2px 0 rgba(170,170,170,0.14), 2px -2px 0 rgba(170,170,170,0.14), -2px 2px 0 rgba(170,170,170,0.14), 2px 2px 0 rgba(170,170,170,0.14)',
      },
    },
  },
  rules: [
    ['year-typography', {
      'font-family': '"Kras", sans-serif',
      'font-weight': '900',
      'letter-spacing': '-0.02em',
    }],
    ['text-shadow-year', {
      'color': '#ffffff dark:#121212',
      'text-shadow': '-2px -2px 0 rgba(170,170,170,0.14), 2px -2px 0 rgba(170,170,170,0.14), -2px 2px 0 rgba(170,170,170,0.14), 2px 2px 0 rgba(170,170,170,0.14)',
    }],
    ['text-outline-year', {
      '-webkit-text-fill-color': 'bg-main',
      '-webkit-text-stroke': '2px rgba(170,170,170,0.14)',
    }],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
        noto: 'Noto Sans:400,700',
        montserrat: 'Montserrat:400,700',
        rajdhani: 'Rajdhani:400,700',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'i-ri-file-list-2-line',
    'i-carbon-campsite',
    // project icons
    'i-material-symbols-electric-car',
    'i-carbon-forecast-lightning',
    'i-carbon-battery-charging',
    'i-wi-forecast-io-partly-cloudy-day',
    'i-mdi-home-energy-outline',
    // social icons
    'i-simple-icons-github',
    'i-simple-icons-x',
    'i-simple-icons-linkedin',
    'i-simple-icons-instagram',
    'i-simple-icons-youtube',
    'i-simple-icons-bilibili',
    'i-simple-icons-zhihu',
    'i-simple-icons-sinaweibo',
    'i-ri-github-line',
    'i-ri-twitter-x-line',
  ],
})
