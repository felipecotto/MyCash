/**
 * Landing image slots — files in /public/images/landing/
 */
export const landingImages = {
  'hero-lifestyle': {
    file: '/images/landing/hero-lifestyle.jpg',
    alt: 'Casal conversando e sorrindo no sofá de uma sala clara',
  },
  'band-secure': {
    file: '/images/landing/band-secure.jpg',
    alt: 'Casal abraçado no sofá, ela apoiada no ombro dele',
  },
  'story-couple': {
    file: '/images/landing/story-couple.jpg',
    alt: 'Casal planejando uma meta com um caderno na mesa da cozinha',
  },
  'brand-juntos': {
    file: '/images/landing/brand-juntos.jpg',
    alt: 'Casal rindo abraçado na varanda',
  },
  'brand-claro': {
    file: '/images/landing/brand-claro.jpg',
    alt: 'Tela do nosso+ no celular: meta Cozinha Nova em 75%, no ritmo',
  },
  'brand-real': {
    file: '/images/landing/brand-real.jpg',
    alt: 'Retrato de mulher sorrindo com calma numa sala clara',
  },
  'brand-real-man': {
    file: '/images/landing/brand-real-man.jpg',
    alt: 'Retrato de homem com cartão verde da marca',
  },
  'testimonial-portrait': {
    file: '/images/landing/testimonial-portrait.jpg',
    alt: 'Retrato do casal Ana e Bruno',
  },
  'footer-couple': {
    file: '/images/landing/footer-couple.jpg',
    alt: 'Casal se abraçando na cozinha',
  },
  'conquista-kitchen': {
    file: '/images/landing/conquista-kitchen.jpg',
    alt: 'Cozinha moderna iluminada — conquista do casal',
  },
} as const

export type LandingImageId = keyof typeof landingImages
