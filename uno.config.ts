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
      'bg-main': 'bg-hex-ffffff dark:bg-hex-121212',
      'bg-drawer': 'bg-hex-ffffff dark:bg-hex-121212',
      'text-main': 'text-hex-555555 dark:text-hex-bbbbbb',
      'text-link': 'text-dark dark:text-white ',
      'border-main': 'border-truegray-300 dark:border-truegray-600',
      'small-margin': 'px-4',
    },
    {
      'text-title': 'text-link text-4xl font-800',
      'nav-link': 'text-link opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer',
      'prose-link': 'text-link text-nowrap cursor-pointer border-b-1 !border-opacity-30 hover:!border-opacity-100 border-neutral-500 hover:border-truegray-600 dark:border-neutral-500 hover:dark:border-truegray-400 transition-border-color duration-200 decoration-none',
      'container-link': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-truegray-500 !bg-opacity-10 transition-colors transition-opacity duration-200',
      'container-project-icon': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-truegray-500 !bg-opacity-10 transition-colors transition-opacity duration-200',
    },
    {
      'hr-line': 'w-14 mx-auto my-8 border-solid border-1px !border-truegray-200 !dark:border-truegray-800',
    },
    {
      'year-background': 'text-7em text-[rgba(170,170,170,0.001)] absolute top--0.2em',
      'year-text': 'absolute left-0 text-8xl font-bold opacity-10 select-none',
      'year-text-hollow': 'year-background text-outline-year font-bold year-typography',
    },
    {
      'publication-item': 'mb-6',
      'year-divider': 'relative h-18 pointer-events-none mb-4',
      'publication-link': 'block hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 p-4',
      'publication-content': 'flex flex-col gap-2',
      'publication-title': 'text-lg font-semibold leading-tight',
      'publication-meta': 'text-sm opacity-60 flex items-center gap-2',
      'external-link-icon': 'text-base',
      'journal-title': 'italic',
      'publication-indicator': 'italic text-muted',
    },
    {
      'hero-image-wrapper': 'margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%); max-height: 562px; overflow: hidden;',
      'hero-image': 'width: 100%; height: auto; max-height: 562px; object-fit: cover;',
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
    // https://icon-sets.iconify.design
    'i-ri-file-list-2-line',
    'i-carbon-campsite',
    // project icons
    'i-material-symbols-electric-car',
    'i-carbon-forecast-lightning',
    'i-carbon-battery-charging',
    'i-wi-forecast-io-partly-cloudy-day',
    'i-mdi-home-energy-outline',
    'i-mdi-solar-power',

    // Language icons
    'i-simple-icons-c',
    'i-simple-icons-cplusplus',
    'i-simple-icons-python',
    'i-simple-icons-javascript',
    'i-simple-icons-typescript',
    'i-simple-icons-html5',
    'i-simple-icons-latex',
    'i-devicon-plain-matlab',
    'i-simple-icons-mysql', // Added for SQL

    // Framework icons
    'i-simple-icons-tensorflow',
    'i-simple-icons-pytorch',
    'i-simple-icons-scipy',
    'i-akar-icons-vue-fill',
    'i-simple-icons-pandas',
    'i-simple-icons-numpy',
    'i-simple-icons-fastapi',
    'i-simple-icons-flask',
    'i-simple-icons-keras',
    'i-simple-icons-opencv',
    'i-simple-icons-celery',
    'i-simple-icons-mqtt',
    'i-simple-icons-nodered',
    'i-simple-icons-astro',
    'i-simple-icons-unocss',
    'i-simple-icons-lodash',

    // Software icons
    'i-simple-icons-microsoftexcel',
    'i-simple-icons-microsoftpowerpoint',
    'i-simple-icons-finalcutpro', // Not found yet

    // Technology icons
    'i-simple-icons-cfdtools',
    'i-simple-icons-dem',
    'i-simple-icons-espressif',
    'i-simple-icons-arduino',
    'i-simple-icons-linux',
    'i-simple-icons-docker',
    'i-simple-icons-git',
    'i-simple-icons-mongodb',
    'i-simple-icons-redis',
    'i-simple-icons-autodesk',
    'i-teenyicons-azure-solid',
    'i-simple-icons-shelly',
    'i-simple-icons-espruino', // Not found yet
    'i-simple-icons-homeassistant',
    'i-simple-icons-grafana',
    'i-simple-icons-influxdb',
    'i-hugeicons-web-design-01',
    'i-simple-icons-mdx',
    'i-simple-icons-rss',
    'i-mdi-sitemap-outline',
    'i-logos-threejs',
    'i-simple-icons-eslint',
    'i-simple-icons-prettier',
    'i-simple-icons-nprogress',

    // Ideas and Principles

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

    // Theme icons
    'i-heroicons-solid-menu-alt-4',
  ],
})
