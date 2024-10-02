import type { ProjectData } from '@/types'

export const projectData: ProjectData = [
  {
    title: 'Renewable Energy Transition',
    projects: [
      {
        text: 'Hoywei Turbo',
        description: 'ESP32 firmware for AC-powered batteries, supporting AC charging and discharging to enhance modularity and enable dynamic pricing compatibility.',
        icon: 'i-mdi-home-energy-outline',
        href: 'https://github.com/Robert-Schimanek/Hoywei-Turbo',
        technologies: [
          { name: 'C++', icon: 'i-simple-icons-cplusplus' },
          { name: 'ESP32', icon: 'i-simple-icons-espressif' },
          { name: 'Arduino', icon: 'i-simple-icons-arduino' },
          { name: 'Python', icon: 'i-simple-icons-python' },
          { name: 'Vue', icon: 'i-akar-icons-vue-fill' },
        ],
      },
      {
        text: 'It Just Works Battery',
        description: 'Batteries for Home Energy Storage for reasonable prices.',
        icon: 'i-carbon-home-energy',
        href: '/',
      },
      {
        text: 'Harbinger',
        description: 'Harbinger supplies you with a sustainable and efficient energy prediction model for the future.',
        icon: 'i-carbon-forecast-lightning',
        href: '/',
        technologies: [
          { name: 'Python', icon: 'i-simple-icons-python' },
          { name: 'SciPy', icon: 'i-simple-icons-scipy' },
          { name: 'TensorFlow', icon: 'i-simple-icons-tensorflow' },
          { name: 'Pandas', icon: 'i-simple-icons-pandas' },
          { name: 'Numpy', icon: 'i-simple-icons-numpy' },
          { name: 'MQTT', icon: 'i-simple-icons-mqtt' },
          { name: 'InfluxDB', icon: 'i-simple-icons-influxdb' },
        ],
      },
    ],
  },
  {
    title: 'Sustainable Vehicles',
    projects: [
      {
        text: 'Undisclosed Industry Project',
        description: 'Created tools for a leading automotive OEM for the development of electric vehicle battery packs.',
        icon: 'i-material-symbols-electric-car',
        href: 'https://www.tu.berlin',
        technologies: [
          { name: 'Python', icon: 'i-simple-icons-python' },
          { name: 'TensorFlow', icon: 'i-simple-icons-tensorflow' },
          { name: 'Pandas', icon: 'i-simple-icons-pandas' },
          { name: 'Numpy', icon: 'i-simple-icons-numpy' },
          { name: 'Excel', icon: 'i-simple-icons-microsoftexcel' },
          { name: 'PowerPoint', icon: 'i-simple-icons-microsoftpowerpoint' },
        ],
      },
      {
        text: 'KontiBat',
        description: 'Your project description information is a long piece of text.',
        icon: 'i-carbon-campsite',
        href: '/',
        technologies: [
          { name: 'Python', icon: 'i-simple-icons-python' },
          { name: 'SciPy', icon: 'i-simple-icons-scipy' },
          { name: 'cfdtools', icon: 'i-simple-icons-cfdtools' },
          { name: 'DEM', icon: 'i-simple-icons-dem' },
          { name: 'Excel', icon: 'i-simple-icons-microsoftexcel' },
          { name: 'PowerPoint', icon: 'i-simple-icons-microsoftpowerpoint' },
        ],
      },
      {
        text: 'Human-machine interaction for a second product life (EIBA)',
        description: 'Artificial intelligence, self-learning technology, Circular Economy, automation, data utilization, remanufacturing, end-of-life sorting, human-machine interaction.',
        icon: 'i-carbon-artificial-intelligence',
        href: 'https://innovative-produktkreislaeufe.de/Publikationen/_/ReziProk_Abschlusspublikation_Langfassung_2023_englisch_final%20-%20Kopie.pdf',
        technologies: [
          // Languages
          { name: 'Python', icon: 'i-simple-icons-python' },
          { name: 'SQL', icon: 'i-simple-icons-mysql' },

          // Frameworks and Libraries
          { name: 'Celery', icon: 'i-simple-icons-celery' },
          { name: 'FastAPI', icon: 'i-simple-icons-fastapi' },
          { name: 'Flask', icon: 'i-simple-icons-flask' },
          { name: 'Keras', icon: 'i-simple-icons-keras' },
          { name: 'Numpy', icon: 'i-simple-icons-numpy' },
          { name: 'OpenCV', icon: 'i-simple-icons-opencv' },
          { name: 'Pandas', icon: 'i-simple-icons-pandas' },
          { name: 'PyTorch', icon: 'i-simple-icons-pytorch' },
          { name: 'Redis', icon: 'i-simple-icons-redis' },
          { name: 'SciPy', icon: 'i-simple-icons-scipy' },
          { name: 'TensorFlow', icon: 'i-simple-icons-tensorflow' },
          { name: 'Vue', icon: 'i-akar-icons-vue-fill' },

          // Other Tools and Platforms
          { name: 'Azure', icon: 'i-teenyicons-azure-solid' },
          { name: 'Docker', icon: 'i-simple-icons-docker' },
          { name: 'Git', icon: 'i-simple-icons-git' },
          { name: 'MongoDB', icon: 'i-simple-icons-mongodb' },
        ],
      },
    ],
  },
  {
    title: 'Personal Projects',
    projects: [
      {
        text: 'robertschimanek.com',
        description: 'This website you are currently viewing. Built as my tech stack demo. Click to view the code on Github.',
        icon: 'i-carbon-campsite',
        href: 'https://github.com/Robert-Schimanek/robertschimanek.com',
        technologies: [
          { name: 'Webdesign', icon: 'i-hugeicons-web-design-01' },
          { name: 'JavaScript', icon: 'i-simple-icons-javascript' },
          { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
          { name: 'Astro', icon: 'i-simple-icons-astro' },
          { name: 'Vue', icon: 'i-akar-icons-vue-fill' },
          { name: 'Svelte', icon: 'i-simple-icons-svelte' },
          { name: 'UnoCSS', icon: 'i-simple-icons-unocss' },
          { name: 'MDX', icon: 'i-simple-icons-mdx' },
          { name: 'RSS', icon: 'i-simple-icons-rss' },
          { name: 'Sitemap', icon: 'i-mdi-sitemap-outline' },
          { name: 'Three.js', icon: 'i-logos-threejs' },
          { name: 'Git', icon: 'i-simple-icons-git' },
          { name: 'ESLint', icon: 'i-simple-icons-eslint' },
          { name: 'Prettier', icon: 'i-simple-icons-prettier' },
          { name: 'NProgress', icon: 'i-simple-icons-nprogress' },
          { name: 'Lodash', icon: 'i-simple-icons-lodash' },
        ],
      },
      {
        text: 'Balcony Power Plant Monitoring',
        description: 'A 100% solar-powered balcony power plant.',
        icon: 'i-mdi-solar-power',
        href: '',
        technologies: [
          { name: 'Shelly', icon: 'i-simple-icons-shelly' },
          { name: 'JavaScript', icon: 'i-simple-icons-javascript' },
          { name: 'Home Assistant', icon: 'i-simple-icons-homeassistant' },
          { name: 'Grafana', icon: 'i-simple-icons-grafana' },
          { name: 'InfluxDB', icon: 'i-simple-icons-influxdb' },
          { name: 'MQTT', icon: 'i-simple-icons-mqtt' },
          { name: 'Node-RED', icon: 'i-simple-icons-nodered' },
        ],
      },
    ],
  },
]
