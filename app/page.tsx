import Link from 'next/link';

const PAIN_POINTS = [
  {
    icon: '⏱️',
    stat: '3+ hours',
    title: 'Wasted per proposal',
    desc: 'Staring at a blank page, second-guessing every sentence, starting over. Sound familiar?',
  },
  {
    icon: '👻',
    stat: 'Clients ghost you',
    title: 'While you\'re still writing',
    desc: 'By the time your proposal is ready, the client has already hired someone faster.',
  },
  {
    icon: '📋',
    stat: 'Generic templates',
    title: 'That don\'t convert',
    desc: 'Copy-pasted proposals look copy-pasted. Clients can tell — and they pass.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '📝',
    title: 'Answer 5 quick questions',
    desc: 'Tell us about the project type, client, timeline, and price. Takes about 2 minutes.',
  },
  {
    step: '02',
    icon: '🤖',
    title: 'AI writes the proposal',
    desc: 'Our AI generates a professional, tailored proposal in under 60 seconds. No templates that look like templates.',
  },
  {
    step: '03',
    icon: '🚀',
    title: 'Send it to your client',
    desc: 'Copy, download as PDF, or paste into your email. Done. Send it before your competitors.',
  },
];

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for getting started.',
    features: [
      '3 proposals per month',
      'All project types',
      'PDF download',
      'PropFast watermark',
    ],
    cta: 'Start for Free',
    href: '/create',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/mo',
    desc: 'For active freelancers closing deals.',
    features: [
      'Unlimited proposals',
      'No watermark',
      'Custom branding',
      'Priority generation',
      'Email delivery',
    ],
    cta: 'Start Pro',
    href: '/create',
    featured: true,
  },
  {
    name: 'Team',
    price: '$29.99',
    period: '/mo',
    desc: 'For agencies and small teams.',
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Shared template library',
      'Priority support',
      'Team analytics',
    ],
    cta: 'Start Team',
    href: '/create',
    featured: false,
  },
];

const FAQS = [
  {
    q: 'Does the AI actually write a real proposal, or just fill in a template?',
    a: 'PropFast uses intelligent templates that are dynamically customized based on your specific project type, client, scope, and pricing. Each proposal is structured to read as professionally written — because the structure is battle-tested and the content is personalized to your inputs.',
  },
  {
    q: 'Can I edit the proposal after it\'s generated?',
    a: 'Yes. After generation, you can copy the full text and paste it anywhere to edit — your email client, Google Docs, Word, Notion. We recommend adding a personal touch before sending.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'Not right now. PropFast stores your proposals in your browser\'s local storage. No sign-up required. An account system with cloud sync is on the roadmap.',
  },
  {
    q: 'How do I send the proposal to my client?',
    a: 'Use the "Print / Save PDF" button to get a PDF, then attach it to an email. Or use "Copy Text" to paste the content directly. Either works great.',
  },
  {
    q: 'What types of freelance projects does it support?',
    a: 'Web Design, Graphic Design, Copywriting, Consulting, Photography, Videography, Marketing, Development, and Other. Each type generates a proposal with appropriate deliverables, timeline structure, and tone.',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-50 to-transparent rounded-b-full opacity-60" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            AI-powered · Ready in 60 seconds
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            Stop Writing Proposals.<br />
            <span className="text-blue-600">Start Closing Deals.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI generates professional proposals in 60 seconds. Not hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Create Your First Proposal — Free →
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors flex items-center gap-1.5"
            >
              See how it works
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No account needed
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              3 free proposals/month
            </span>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-gray-950 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Sound familiar?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Every freelancer has been here. PropFast fixes it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PAIN_POINTS.map((p) => (
              <div
                key={p.stat}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <div className="text-2xl font-black text-red-400 mb-1">{p.stat}</div>
                <div className="text-lg font-bold text-white mb-3">{p.title}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              3 steps to a winning proposal
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From blank page to professional proposal in the time it takes to make a coffee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -z-0" />

            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-blue-200">
                  {step.icon}
                </div>
                <div className="text-xs font-black text-blue-400 tracking-widest mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Try it now — it's free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              PRICING
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Simple, honest pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Start for free. Upgrade when you're closing more deals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border ${
                  plan.featured
                    ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200 md:-mt-4 md:mb-4'
                    : 'bg-white border-gray-200'
                }`}
              >
                {plan.featured && (
                  <div className="inline-block bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full mb-4 tracking-wider">
                    MOST POPULAR
                  </div>
                )}
                <div className={`text-sm font-bold mb-2 ${plan.featured ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-black ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.featured ? 'text-blue-200' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${plan.featured ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.featured ? 'text-white' : 'text-gray-700'}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${plan.featured ? 'text-blue-200' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center font-bold py-3 px-6 rounded-xl transition-all ${
                    plan.featured
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-blue-50 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Common questions
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-7">
                <h3 className="font-bold text-gray-900 mb-3 text-lg leading-snug">{faq.q}</h3>
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Your next client is waiting.
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
            Write your first AI proposal in 60 seconds. For free. Right now.
          </p>
          <Link
            href="/create"
            className="inline-block bg-white text-blue-600 font-black text-xl px-10 py-5 rounded-2xl transition-all hover:bg-blue-50 shadow-2xl hover:-translate-y-1"
          >
            Create Your First Proposal →
          </Link>
          <p className="text-blue-200 text-sm mt-6">No account. No credit card. No excuses.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm font-bold">PROP</span>
              <span className="text-blue-400">Fast</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link>
              <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/create" className="hover:text-white transition-colors">Create Proposal</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© 2025 PropFast. Built for freelancers who ship.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
