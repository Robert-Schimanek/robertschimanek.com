export const siteConfig = {
  author: 'Robert Schimanek',
  title: 'Robert Schimanek',
  subtitle: 'Engineer',
  description:
    'Engineer based in Berlin. I like to build things. Sometimes I write too, check out my papers. Always learning. Fun fact: I once built a robot that was controlled by a neural network.',
  image: {
    src: '/hero.jpg',
    alt: 'Website Main Image',
  },
  email: 'info@robertschimanek.com',
  socialLinks: [
    {
      text: 'GitHub',
      href: 'https://github.com/Robert-Schimanek',
      icon: 'i-simple-icons-github',
      header: 'i-ri-github-line',
    },
    {
      text: 'Twitter',
      href: 'https://x.com/robertschimanek',
      icon: 'i-simple-icons-x',
      header: 'i-ri-twitter-x-line',
    },
    {
      text: 'Linkedin',
      href: 'https://www.linkedin.com/in/robert-schimanek/',
      icon: 'i-simple-icons-linkedin',
    },
  ],
  header: {
    logo: {
      src: '/favicon.ico',
      alt: 'Logo',
    },
    navLinks: [
      {
        text: 'Expertise',
        href: '/expertise',
      },
      {
        text: 'Projects',
        href: '/projects',
      },
      {
        text: 'Publications',
        href: '/blog/publications',
      },
      {
        text: 'Blog',
        href: '/blog',
      },
    ],
  },
  page: {
    blogLinks: [
      {
        text: 'Publications',
        href: '/blog/publications',
      },
      {
        text: 'Blog',
        href: '/blog',
      },
    ],
  },
  footer: {
    navLinks: [
      {
        text: 'This site',
        href: '/this-site',
      },
      {
        text: 'Imprint',
        href: '/imprint',
      },
      {
        text: 'GitHub Repository',
        href: 'https://github.com/robert-schimanek/robertschimanek.com',
      },
    ],
  },
}

export default siteConfig
