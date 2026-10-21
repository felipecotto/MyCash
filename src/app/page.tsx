import {
  LandingHeader,
  LandingHero,
  TrustBar,
  ProblemSection,
  GoalRange,
  SoftCtaBand,
  Storytelling,
  Scoreboard,
  SimpleAsThat,
  BrandMoments,
  Testimonial,
  Faq,
  FooterCTA,
} from '@/components/landing'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <LandingHeader />
      <main className="w-full flex-1">
        <LandingHero />
        <ProblemSection />
        <TrustBar />
        <GoalRange />
        <SoftCtaBand />
        <Storytelling />
        <Scoreboard />
        <SimpleAsThat />
        <BrandMoments />
        <Testimonial />
        <Faq />
      </main>
      <FooterCTA />
    </div>
  )
}
