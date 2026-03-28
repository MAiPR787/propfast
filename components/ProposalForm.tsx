'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProposalFormData, ProjectType, Timeline } from '@/types';
import { generateProposal } from '@/lib/templates';
import { saveProposal, generateId } from '@/lib/storage';
import ProposalOutput from './ProposalOutput';

const PROJECT_TYPES: ProjectType[] = [
  'Web Design', 'Graphic Design', 'Copywriting', 'Consulting',
  'Photography', 'Videography', 'Marketing', 'Development', 'Other',
];

const TIMELINES: Timeline[] = [
  '1 week', '2 weeks', '1 month', '2 months', '3+ months',
];

const INITIAL_DATA: ProposalFormData = {
  projectType: '',
  clientName: '',
  clientCompany: '',
  clientEmail: '',
  projectDescription: '',
  timeline: '',
  price: '',
  yourName: '',
  businessName: '',
  yourEmail: '',
};

const STEPS = [
  { number: 1, label: 'Project Type' },
  { number: 2, label: 'Client Details' },
  { number: 3, label: 'Project Details' },
  { number: 4, label: 'Your Info' },
  { number: 5, label: 'Generate' },
];

export default function ProposalForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProposalFormData>(INITIAL_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState<string | null>(null);
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ProposalFormData, string>>>({});

  function update(field: keyof ProposalFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validateStep(): boolean {
    const newErrors: Partial<Record<keyof ProposalFormData, string>> = {};

    if (step === 1 && !formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }
    if (step === 2) {
      if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
      if (!formData.clientEmail.trim()) newErrors.clientEmail = 'Client email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) newErrors.clientEmail = 'Enter a valid email';
    }
    if (step === 3) {
      if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
      if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
      if (!formData.price.trim()) newErrors.price = 'Price is required';
      else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
        newErrors.price = 'Enter a valid price';
      }
    }
    if (step === 4) {
      if (!formData.yourName.trim()) newErrors.yourName = 'Your name is required';
      if (!formData.yourEmail.trim()) newErrors.yourEmail = 'Your email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.yourEmail)) newErrors.yourEmail = 'Enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, 5));
    }
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleGenerate() {
    setIsGenerating(true);
    // Simulate AI processing time for effect
    await new Promise((r) => setTimeout(r, 2200));

    const content = generateProposal(formData);
    const id = generateId();

    const proposal = {
      id,
      formData,
      generatedContent: content,
      createdAt: new Date().toISOString(),
      status: 'Draft' as const,
    };

    saveProposal(proposal);
    setProposalId(id);
    setGeneratedProposal(content);
    setIsGenerating(false);
  }

  if (generatedProposal && proposalId) {
    return (
      <ProposalOutput
        content={generatedProposal}
        proposalId={proposalId}
        formData={formData}
        onBack={() => {
          setGeneratedProposal(null);
          setProposalId(null);
          setStep(4);
        }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((s) => (
            <div key={s.number} className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  s.number < step
                    ? 'bg-blue-600 text-white'
                    : s.number === step
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {s.number < step ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.number
                )}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${s.number === step ? 'text-blue-600' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of project?</h2>
            <p className="text-gray-500 mb-8">Select the service you're proposing to deliver.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => update('projectType', type)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    formData.projectType === type
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg block mb-1">{getProjectEmoji(type)}</span>
                  {type}
                </button>
              ))}
            </div>
            {errors.projectType && (
              <p className="text-red-500 text-sm mt-3">{errors.projectType}</p>
            )}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Client details</h2>
            <p className="text-gray-500 mb-8">Who are you sending this proposal to?</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Client name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => update('clientName', e.target.value)}
                  placeholder="Jane Smith"
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.clientName ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Client company <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.clientCompany}
                  onChange={(e) => update('clientCompany', e.target.value)}
                  placeholder="Acme Inc."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Client email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => update('clientEmail', e.target.value)}
                  placeholder="jane@acme.com"
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.clientEmail ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Project details</h2>
            <p className="text-gray-500 mb-8">Tell the AI what you're building and what you'll charge.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Project description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => update('projectDescription', e.target.value)}
                  rows={5}
                  placeholder="Briefly describe the project. What is the client looking for? What problem does it solve? The more detail, the better the proposal."
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
                    errors.projectDescription ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Estimated timeline <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => update('timeline', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white ${
                    errors.timeline ? 'border-red-400' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a timeline...</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your price (USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => update('price', e.target.value)}
                    placeholder="2500"
                    min="1"
                    className={`w-full pl-8 pr-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      errors.price ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your info</h2>
            <p className="text-gray-500 mb-8">This will appear in the proposal as the service provider.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.yourName}
                  onChange={(e) => update('yourName', e.target.value)}
                  placeholder="Alex Johnson"
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.yourName ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.yourName && <p className="text-red-500 text-sm mt-1">{errors.yourName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Business name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => update('businessName', e.target.value)}
                  placeholder="Johnson Studio"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.yourEmail}
                  onChange={(e) => update('yourEmail', e.target.value)}
                  placeholder="alex@johnsonstudio.com"
                  className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.yourEmail ? 'border-red-400' : 'border-gray-500'
                  }`}
                />
                {errors.yourEmail && <p className="text-red-500 text-sm mt-1">{errors.yourEmail}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 5 - Generate */}
        {step === 5 && (
          <div className="text-center">
            {isGenerating ? (
              <div className="py-12">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                  <span className="absolute inset-0 flex items-center justify-center text-2xl">✍️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">AI is crafting your proposal...</h2>
                <p className="text-gray-500 mb-8">Analyzing your project details and writing a professional proposal.</p>
                <div className="flex flex-col gap-2 text-sm text-gray-400 max-w-xs mx-auto">
                  <LoadingItem delay={0} text="Understanding your project scope" />
                  <LoadingItem delay={600} text="Writing executive summary" />
                  <LoadingItem delay={1200} text="Structuring deliverables" />
                  <LoadingItem delay={1800} text="Finalizing terms & pricing" />
                </div>
              </div>
            ) : (
              <div className="py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
                  🚀
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to generate</h2>
                <p className="text-gray-500 mb-3">
                  Your proposal for <strong>{formData.clientName}</strong> is ready to be written.
                </p>
                <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Project type:</span>
                    <span className="font-semibold text-gray-900">{formData.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Client:</span>
                    <span className="font-semibold text-gray-900">{formData.clientName}{formData.clientCompany ? ` · ${formData.clientCompany}` : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Timeline:</span>
                    <span className="font-semibold text-gray-900">{formData.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Investment:</span>
                    <span className="font-semibold text-gray-900">${parseFloat(formData.price).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={handleGenerate}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-sm hover:shadow-md"
                >
                  Generate Proposal ✨
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        {!isGenerating && step < 5 && (
          <div className={`mt-8 flex ${step > 1 ? 'justify-between' : 'justify-end'}`}>
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                ← Back
              </button>
            )}
            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-sm"
            >
              {step === 4 ? 'Review & Generate →' : 'Continue →'}
            </button>
          </div>
        )}

        {!isGenerating && step === 5 && (
          <div className="mt-4">
            <button
              onClick={prevStep}
              className="w-full px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-sm"
            >
              ← Edit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingItem({ delay, text }: { delay: number; text: string }) {
  const [done, setDone] = useState(false);

  useState(() => {
    const timer = setTimeout(() => setDone(true), delay + 500);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex items-center gap-2" style={{ opacity: 0, animation: `fadeIn 0.3s ${delay}ms forwards` }}>
      <span>{done ? '✓' : '•'}</span>
      <span>{text}</span>
    </div>
  );
}

function getProjectEmoji(type: ProjectType): string {
  const emojis: Record<ProjectType, string> = {
    'Web Design': '🌐',
    'Graphic Design': '🎨',
    'Copywriting': '✍️',
    'Consulting': '💼',
    'Photography': '📷',
    'Videography': '🎬',
    'Marketing': '📈',
    'Development': '💻',
    'Other': '⚡',
  };
  return emojis[type] || '📄';
}
