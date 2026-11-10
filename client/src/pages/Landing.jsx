import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, QrCode, BrainCircuit, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function Landing() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primaryLight text-brand-primary font-bold text-xs uppercase tracking-widest rounded-full border border-brand-primary/20">
          <Heart className="w-3.5 h-3.5 fill-brand-primary" /> Supported for SHG Millet Groups
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.1]">
          {t('landingTitle')}
        </h1>
        <p className="text-lg sm:text-xl text-brand-dark opacity-85 leading-relaxed max-w-2xl mx-auto font-medium">
          {t('landingSubtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" icon={ArrowRight} className="w-full font-bold">
              {t('startJourney')}
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full font-bold">
              {t('facilitatorLogin')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-dark">How Navigator Empowers You</h2>
          <p className="text-brand-dark opacity-75 mt-2 font-medium">
            Take decisions based on real math and buyer feedback, rather than guessworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
          
          <Card title={t('featureCostTitle')} subtitle="Step-by-step calculations">
            <div className="space-y-3 mt-4">
              <div className="p-3 bg-brand-primaryLight/70 text-brand-primary rounded-xl w-fit">
                <Calculator className="w-8 h-8" />
              </div>
              <p className="text-brand-dark opacity-90 leading-relaxed font-semibold text-sm">
                {t('featureCostDesc')} No complex accounts math required; enter raw numbers using simple voice terms.
              </p>
            </div>
          </Card>

          <Card title={t('featureQrTitle')} subtitle="Direct Buyer Review Signals">
            <div className="space-y-3 mt-4">
              <div className="p-3 bg-brand-primaryLight/70 text-brand-primary rounded-xl w-fit">
                <QrCode className="w-8 h-8" />
              </div>
              <p className="text-brand-dark opacity-90 leading-relaxed font-semibold text-sm">
                {t('featureQrDesc')} Collect rating, price reasonability, and repeat-buy intent on a mobile portal.
              </p>
            </div>
          </Card>

          <Card title={t('featureAiTitle')} subtitle="Smart Decision Engine">
            <div className="space-y-3 mt-4">
              <div className="p-3 bg-brand-primaryLight/70 text-brand-primary rounded-xl w-fit">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <p className="text-brand-dark opacity-90 leading-relaxed font-semibold text-sm">
                {t('featureAiDesc')} Analyzes cost margins and feedback levels to suggest Proceed, Pilot, Modify, Collaborate, or Pause.
              </p>
            </div>
          </Card>

        </div>
      </section>

      {/* Evidence Decision Info Section */}
      <section className="bg-white border border-brand-neutralGray rounded-2xl p-8 sm:p-12 shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-extrabold text-brand-primary leading-tight">
            {t('realEvidenceTitle')}
          </h2>
          <p className="text-brand-dark opacity-85 leading-relaxed font-semibold text-base">
            {t('realEvidenceDesc')}
          </p>
          <div className="flex items-center gap-2 text-brand-primary font-bold text-sm bg-brand-primaryLight/50 p-3 rounded-lg border border-brand-primary/10">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <span>Meets rural standards with bilingual interactions and voice-guided forms.</span>
          </div>
        </div>

        {/* Visual Workflow Steps Mock */}
        <div className="bg-brand-light p-6 rounded-xl border border-brand-neutralGray flex flex-col gap-4 w-full md:max-w-xs shadow-inner">
          <span className="font-extrabold text-brand-primary text-xs uppercase tracking-wider">Flow Diagram</span>
          
          <div className="space-y-4 text-xs font-semibold">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">1</span>
              <span className="text-brand-dark">Calculate Production Cost (₹)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">2</span>
              <span className="text-brand-dark">Generate QR & Print on Packets</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">3</span>
              <span className="text-brand-dark">Buyers Scan & Rate Flavor/Price</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">4</span>
              <span className="text-brand-dark">Engine Suggests Defensible Decisions</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
