/**
 * Landing image slots — files in /public/images/landing/
 */
export const landingImages = {
  'hero-lifestyle': {
    file: '/images/landing/hero-lifestyle.jpg',
    alt: 'Casal sorrindo no sofá enquanto usa o nosso+ no celular',
  },
  'band-secure': {
    file: '/images/landing/band-secure.jpg',
    alt: 'Casal sorrindo em fundo verde da marca',
  },
  'story-couple': {
    file: '/images/landing/story-couple.jpg',
    alt: 'Casal planejando uma meta juntos na cozinha',
  },
  'brand-juntos': {
    file: '/images/landing/brand-juntos.jpg',
    alt: 'Casal no sofá verde usando o app juntos',
  },
  'brand-claro': {
    file: '/images/landing/brand-claro.jpg',
    alt: 'Mãos segurando o celular com o progresso da meta',
  },
  'brand-real': {
    file: '/images/landing/brand-real.jpg',
    alt: 'Retrato de mulher com expressão confiante',
  },
  'brand-real-man': {
    file: '/images/landing/brand-real-man.jpg',
    alt: 'Retrato de homem com cartão verde da marca',
  },
  'testimonial-portrait': {
    file: '/images/landing/testimonial-portrait.jpg',
    alt: 'Retrato do casal Luiz e Carol',
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
