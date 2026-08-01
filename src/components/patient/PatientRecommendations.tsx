import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, ShieldCheck, Heart, Zap, ArrowRight, Sparkles, Stethoscope, Utensils, Activity, Moon, Droplets, CigaretteOff, WineOff, Brain } from 'lucide-react';

interface LifestyleRecommendation {
  id: string;
  category: 'Diet' | 'Exercise' | 'Sleep' | 'Hydration' | 'Smoking' | 'Alcohol' | 'Stress';
  title: string;
  reason: string;
  expectedBenefit: string;
  suggestedFrequency: string;
  doctorAlignedTip: string;
  icon: React.ForwardRefExoticComponent<any>;
  badgeColor: string;
}

const LIFESTYLE_COACH_ITEMS: LifestyleRecommendation[] = [
  {
    id: 'lc-1',
    category: 'Diet',
    title: 'Low-Sodium Mediterranean Glycemic Plan',
    reason: 'Elevated systolic blood pressure (136 mmHg) and fasting glucose (138 mg/dL).',
    expectedBenefit: 'Reduces blood pressure by 5-8 mmHg and lowers postprandial glucose spikes.',
    suggestedFrequency: 'Daily meal preparation',
    doctorAlignedTip: 'Limit total daily sodium under 2,000 mg and choose whole grain carbohydrates with high soluble fiber.',
    icon: Utensils,
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  },
  {
    id: 'lc-2',
    category: 'Exercise',
    title: '30-Minute Aerobic Brisk Walking',
    reason: 'Improves peripheral muscle insulin sensitivity and arterial compliance.',
    expectedBenefit: 'Lowers HbA1c by 0.4-0.6% over 12 weeks and increases cardiac stroke volume.',
    suggestedFrequency: '5 days per week (150 mins total)',
    doctorAlignedTip: 'Walk at a pace where you can converse but not sing. Include light resistance exercises twice weekly.',
    icon: Activity,
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },
  {
    id: 'lc-3',
    category: 'Sleep',
    title: '7.5-Hour Restorative Sleep Hygiene Schedule',
    reason: 'Chronic sleep fragmentation elevates nocturnal cortisol and sympathetic nervous tone.',
    expectedBenefit: 'Optimizes morning fasting glucose and stabilizes vascular endothelial function.',
    suggestedFrequency: 'Every night (Consistent bedtime 10:30 PM)',
    doctorAlignedTip: 'Maintain a dark, cool room environment and discontinue screen usage 45 minutes prior to sleep.',
    icon: Moon,
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
  },
  {
    id: 'lc-4',
    category: 'Hydration',
    title: '2.5 Liters Pure Water Intake',
    reason: 'Preserves glomerular filtration rate (eGFR 68 mL/min) and aids metabolic clearance.',
    expectedBenefit: 'Protects renal nephron micro-vessels and prevents hemoconcentration.',
    suggestedFrequency: 'Throughout the day (8-10 glasses)',
    doctorAlignedTip: 'Carry a reusable water bottle; avoid sugary beverages and artificial syrups.',
    icon: Droplets,
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
  },
  {
    id: 'lc-5',
    category: 'Smoking',
    title: 'Zero Smoking & Environmental Smoke Avoidance',
    reason: 'Inhaled nicotine causes immediate vasoconstriction and arterial wall stiffness.',
    expectedBenefit: 'Reduces cardiovascular stroke risk by 50% within 1 year of sustained avoidance.',
    suggestedFrequency: 'Continuous 100% adherence',
    doctorAlignedTip: 'If exposed to second-hand smoke, use HEPA air purification in living areas.',
    icon: CigaretteOff,
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  },
  {
    id: 'lc-6',
    category: 'Alcohol',
    title: 'Alcohol Limitation or Complete Abstinence',
    reason: 'Ethanol metabolism interferes with hepatic gluconeogenesis and elevates triglycerides.',
    expectedBenefit: 'Helps maintain liver insulin clearance and prevents nocturnal BP elevations.',
    suggestedFrequency: 'Limit to < 1 standard drink or abstain',
    doctorAlignedTip: 'Replace alcoholic beverages with sparkling mineral water infused with fresh lemon or mint.',
    icon: WineOff,
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  },
  {
    id: 'lc-7',
    category: 'Stress',
    title: '10-Minute Diaphragmatic Breathing Routine',
    reason: 'Acute emotional stress triggers epinephrine surges, raising heart rate and blood pressure.',
    expectedBenefit: 'Stimulates parasympathetic vagal nerve tone, lowering acute BP spikes.',
    suggestedFrequency: 'Twice daily (Morning & Evening)',
    doctorAlignedTip: 'Practice 4-7-8 breathing (inhale 4s, hold 7s, exhale slow 8s) when feeling overwhelmed.',
    icon: Brain,
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  }
];

export const PatientRecommendations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredItems = selectedCategory === 'All'
    ? LIFESTYLE_COACH_ITEMS
    : LIFESTYLE_COACH_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-600" />
          AI Lifestyle Coach & Doctor Recommendations
        </h1>
        <p className="text-xs text-slate-500">
          Personalized evidence-based guidance mapped across Diet, Exercise, Sleep, Hydration, Smoking, Alcohol, and Stress
        </p>
      </div>

      {/* DOCTOR APPROVED RECOMMENDATIONS BANNER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            Approved Doctor Care Instructions
          </h2>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
            Verified by Primary Physician
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
            <span className="font-bold text-emerald-900 dark:text-emerald-200 block">• Complete HbA1c within 1 week</span>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Lab referral sent to quest diagnostics.</p>
          </div>

          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
            <span className="font-bold text-emerald-900 dark:text-emerald-200 block">• Reduce sodium intake to &lt;2,000 mg/day</span>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Monitored in dietary log.</p>
          </div>

          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
            <span className="font-bold text-emerald-900 dark:text-emerald-200 block">• Walk 30 minutes daily</span>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Moderate pace 5 days/week.</p>
          </div>

          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
            <span className="font-bold text-emerald-900 dark:text-emerald-200 block">• Monitor BP twice weekly</span>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Morning & evening resting logs.</p>
          </div>

          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
            <span className="font-bold text-emerald-900 dark:text-emerald-200 block">• Repeat creatinine after 1 month</span>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Scheduled for August 28, 2026.</p>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER BUTTONS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Diet', 'Exercise', 'Sleep', 'Hydration', 'Smoking', 'Alcohol', 'Stress'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AI LIFESTYLE COACH CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${item.badgeColor}`}>
                    {item.category} Category
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Frequency: {item.suggestedFrequency}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Reason & Expected Benefit Breakdown */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Clinical Reason</span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{item.reason}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/40">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase block mb-0.5">Expected Benefit</span>
                    <p className="text-emerald-900 dark:text-emerald-200 font-bold">{item.expectedBenefit}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Doctor-Aligned Action</span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item.doctorAlignedTip}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
