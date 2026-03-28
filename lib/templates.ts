import { ProposalFormData } from '@/types';

function formatCurrency(amount: string): string {
  const num = parseFloat(amount);
  return isNaN(num) ? amount : `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getExpiryDate(date: Date, days = 14): string {
  const expiry = new Date(date);
  expiry.setDate(expiry.getDate() + days);
  return formatDate(expiry);
}

function getProjectTypeIntro(type: string): string {
  const intros: Record<string, string> = {
    'Web Design': 'a comprehensive website design solution',
    'Graphic Design': 'a complete graphic design package',
    'Copywriting': 'compelling, conversion-focused copy',
    'Consulting': 'expert consulting and strategic guidance',
    'Photography': 'professional photography services',
    'Videography': 'high-quality videography and production',
    'Marketing': 'a results-driven marketing strategy',
    'Development': 'a robust software development solution',
    'Other': 'professional services tailored to your needs',
  };
  return intros[type] || 'professional services';
}

function getDeliverables(type: string): string[] {
  const deliverables: Record<string, string[]> = {
    'Web Design': [
      'Discovery & requirements workshop',
      'Wireframes and UX flow diagrams',
      'Full visual design (desktop & mobile)',
      'Design system & component library',
      'Developer handoff with annotated files',
      'Up to 2 rounds of revisions',
    ],
    'Graphic Design': [
      'Creative brief and concept development',
      'Initial design concepts (3 variations)',
      'Refinement and revision rounds (up to 2)',
      'Final deliverables in all required formats',
      'Source files (AI, PSD, or Figma)',
      'Brand usage guidelines',
    ],
    'Copywriting': [
      'Audience and brand voice discovery call',
      'Research and competitor analysis',
      'First draft delivery',
      'SEO optimization and keyword integration',
      'Up to 2 rounds of revisions',
      'Final copy in Word/Google Docs format',
    ],
    'Consulting': [
      'Initial discovery and audit session',
      'Comprehensive analysis and findings report',
      'Strategic recommendations document',
      'Implementation roadmap and prioritization',
      'Executive summary presentation',
      'Post-engagement Q&A support (30 days)',
    ],
    'Photography': [
      'Pre-shoot planning and location scouting',
      'Full photography session',
      'Professional editing and color grading',
      `Delivery of ${type === 'Photography' ? '50+' : '20+'} high-resolution images`,
      'Web-optimized and print-ready exports',
      'Online gallery for client review & download',
    ],
    'Videography': [
      'Pre-production planning and storyboard',
      'Professional filming session',
      'Professional editing with music and graphics',
      'Color grading and audio mastering',
      'Up to 2 rounds of revision',
      'Delivery in multiple formats (web, social, broadcast)',
    ],
    'Marketing': [
      'Market research and competitor analysis',
      'Target audience persona development',
      'Multi-channel marketing strategy',
      'Content calendar and campaign planning',
      'Performance metrics and KPI framework',
      'Monthly reporting and optimization',
    ],
    'Development': [
      'Technical discovery and architecture planning',
      'Development environment setup',
      'Core feature development',
      'Testing and quality assurance',
      'Deployment and launch support',
      'Documentation and handoff',
    ],
    'Other': [
      'Initial consultation and requirements gathering',
      'Project planning and milestone definition',
      'Execution of agreed deliverables',
      'Progress updates and client check-ins',
      'Final delivery and review',
      'Post-completion support period',
    ],
  };
  return deliverables[type] || deliverables['Other'];
}

function getTimelineBreakdown(timeline: string, type: string): string {
  const phases: Record<string, string[]> = {
    '1 week': [
      'Days 1–2: Discovery, planning & kickoff',
      'Days 3–5: Core execution and development',
      'Day 6: Review, revisions, and refinements',
      'Day 7: Final delivery and handoff',
    ],
    '2 weeks': [
      'Week 1, Days 1–3: Discovery, planning & strategy',
      'Week 1, Days 4–5: Initial execution and first draft',
      'Week 2, Days 1–3: Refinements and revisions',
      'Week 2, Days 4–5: Final polish and delivery',
    ],
    '1 month': [
      'Week 1: Discovery, research & planning',
      'Week 2: Initial execution and draft delivery',
      'Week 3: Client feedback and revisions',
      'Week 4: Final refinements and project delivery',
    ],
    '2 months': [
      'Weeks 1–2: Discovery, strategy & project setup',
      'Weeks 3–5: Core execution and development phase',
      'Weeks 6–7: Testing, revisions & refinements',
      'Week 8: Final delivery, handoff & launch support',
    ],
    '3+ months': [
      'Month 1: Discovery, planning & foundation',
      'Month 2: Core build and primary deliverables',
      'Month 3: Refinement, testing & iteration',
      'Final month: Launch, handoff & documentation',
    ],
  };
  return (phases[timeline] || phases['1 month']).map((p) => `• ${p}`).join('\n');
}

// Template A — Modern & Direct
function templateA(data: ProposalFormData, date: Date): string {
  const { projectType, clientName, clientCompany, clientEmail, projectDescription, timeline, price, yourName, businessName, yourEmail } = data;
  const deliverables = getDeliverables(projectType);
  const intro = getProjectTypeIntro(projectType);

  return `PROPOSAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prepared by:  ${businessName}
Contact:      ${yourEmail}

Prepared for: ${clientName}${clientCompany ? ` · ${clientCompany}` : ''}
Date:         ${formatDate(date)}
Valid until:  ${getExpiryDate(date)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


EXECUTIVE SUMMARY
─────────────────

Thank you for the opportunity to work together, ${clientName}. I'm excited to present this proposal for ${intro} that will help ${clientCompany || 'your business'} achieve its goals.

${projectDescription}

Based on our conversation and an understanding of your needs, I've outlined a clear scope of work, timeline, and investment below. My goal is to deliver exceptional results efficiently so you can move forward with confidence.


SCOPE OF WORK
─────────────

This engagement covers the following deliverables:

${deliverables.map((d) => `  ✓  ${d}`).join('\n')}

All work will be delivered to professional standards with clear communication throughout the project.


PROJECT TIMELINE
────────────────

Estimated duration: ${timeline}

${getTimelineBreakdown(timeline, projectType)}

All milestones are subject to timely feedback and approvals from ${clientName}. Delays in feedback may impact the final delivery date.


INVESTMENT
──────────

  Total Project Fee:    ${formatCurrency(price)}

Payment terms:
  • 50% deposit due upon project kickoff
  • 50% final payment due upon delivery

Accepted payment methods: Bank transfer, PayPal, or credit card.

This proposal is valid for 14 days from the date above.


TERMS & CONDITIONS
──────────────────

• Any work outside the defined scope above will be quoted separately.
• The client agrees to provide feedback within 5 business days of each delivery.
• Intellectual property transfers to the client upon receipt of final payment.
• ${businessName} retains the right to showcase this work in its portfolio.


NEXT STEPS
──────────

Ready to move forward? Here's how we get started:

  1.  Review and sign this proposal
  2.  Submit the 50% deposit to lock in your project start date
  3.  We'll schedule a kickoff call to align on details

I'm looking forward to working with you. Please don't hesitate to reach out with any questions.


Warmly,

${yourName}
${businessName}
${yourEmail}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated with PropFast · propfast.io`;
}

// Template B — Formal & Structured
function templateB(data: ProposalFormData, date: Date): string {
  const { projectType, clientName, clientCompany, clientEmail, projectDescription, timeline, price, yourName, businessName, yourEmail } = data;
  const deliverables = getDeliverables(projectType);
  const intro = getProjectTypeIntro(projectType);

  return `PROJECT PROPOSAL
${businessName.toUpperCase()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROPOSAL DETAILS

Service Provider:   ${businessName}
Provider Contact:   ${yourEmail}
Client:             ${clientName}${clientCompany ? `, ${clientCompany}` : ''}
Project Type:       ${projectType}
Proposal Date:      ${formatDate(date)}
Expiration Date:    ${getExpiryDate(date)}
Project Ref:        #${Date.now().toString().slice(-6)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


1. INTRODUCTION & OVERVIEW
───────────────────────────

Dear ${clientName},

Thank you for considering ${businessName} for your upcoming ${projectType.toLowerCase()} project. This proposal outlines the recommended approach for providing ${intro} to ${clientCompany || 'your organization'}.

Project Overview:
${projectDescription}

${businessName} is committed to delivering high-quality work on time and within budget. The following sections detail our proposed scope, timeline, and investment for this engagement.


2. SCOPE OF WORK
─────────────────

The following deliverables are included in this proposal:

${deliverables.map((d, i) => `  ${i + 1}. ${d}`).join('\n')}

Note: Any requirements outside this defined scope will be addressed through a separate change order and may affect the project timeline and budget.


3. PROJECT TIMELINE
────────────────────

Proposed Project Duration: ${timeline}

Phase Breakdown:
${getTimelineBreakdown(timeline, projectType)}

Timeline assumes prompt client feedback (within 5 business days per milestone). ${businessName} will provide regular progress updates throughout the engagement.


4. INVESTMENT SUMMARY
──────────────────────

  ┌─────────────────────────────────────────────┐
  │  ${projectType} Services
  │  Total Investment:        ${formatCurrency(price).padEnd(16)}│
  └─────────────────────────────────────────────┘

Payment Schedule:
  Invoice 1:  50% (${formatCurrency(String(parseFloat(price) * 0.5))}) — Due at project start
  Invoice 2:  50% (${formatCurrency(String(parseFloat(price) * 0.5))}) — Due upon final delivery

This proposal is valid for 14 days from the date of issue.


5. TERMS & CONDITIONS
──────────────────────

5.1 Revisions: Up to two (2) rounds of revisions are included per deliverable.
5.2 Feedback: Client agrees to provide feedback within 5 business days.
5.3 Intellectual Property: Full ownership transfers to client upon final payment.
5.4 Confidentiality: Both parties agree to keep project details confidential.
5.5 Portfolio: ${businessName} may use this work in its portfolio unless requested otherwise.


6. ACCEPTANCE & NEXT STEPS
────────────────────────────

To proceed with this engagement:

  □  Review and approve this proposal
  □  Sign the project agreement
  □  Submit the initial 50% deposit
  □  Schedule project kickoff meeting

Please feel free to contact me with any questions or clarifications.


Respectfully submitted,

${yourName}
${businessName}
${yourEmail}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated with PropFast · propfast.io`;
}

// Template C — Warm & Conversational
function templateC(data: ProposalFormData, date: Date): string {
  const { projectType, clientName, clientCompany, clientEmail, projectDescription, timeline, price, yourName, businessName, yourEmail } = data;
  const deliverables = getDeliverables(projectType);
  const intro = getProjectTypeIntro(projectType);

  return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ${businessName}
  ${formatDate(date)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hi ${clientName}! 👋

I'm really excited about the possibility of working together. After learning about what you're building at ${clientCompany || 'your company'}, I put together this proposal — I think we can do something great here.

Here's what I have in mind for your ${projectType.toLowerCase()} project:


WHAT YOU'RE GETTING
────────────────────

${projectDescription}

To bring this to life, here's exactly what I'll deliver:

${deliverables.map((d) => `  → ${d}`).join('\n')}

I've done projects like this many times, and I know what it takes to get it right. My job is to make this as smooth and stress-free as possible for you.


HOW LONG IT TAKES
──────────────────

I'm estimating we can wrap this up in ${timeline}.

Here's how I see the project unfolding:

${getTimelineBreakdown(timeline, projectType)}

That said, I'm flexible — if you have a harder deadline, let me know and we can talk about what's possible.


WHAT IT COSTS
─────────────

  Total: ${formatCurrency(price)}

I split this into two easy payments:
  • First half upfront when we kick off
  • Second half when I deliver the final work

No hidden fees. No surprises. Just great work.

This price is locked in for the next 14 days.


A FEW QUICK NOTES
──────────────────

• If you need something outside of what's listed above, I'm happy to quote it separately.
• I'll need your feedback within 5 business days to keep things moving on schedule.
• Once you've paid in full, everything is yours — files, assets, all of it.


READY TO KICK THINGS OFF?
──────────────────────────

Here's how simple it is to get started:

  1.  Give this a read and let me know if you have questions
  2.  Reply to confirm you're in
  3.  We'll sort out the deposit and book a kickoff call

Honestly, I can't wait to get started on this. Let me know what you think!

Talk soon,

${yourName}
${businessName}
${yourEmail}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated with PropFast · propfast.io`;
}

export function generateProposal(data: ProposalFormData): string {
  const date = new Date();
  // Pick template based on project type
  const formal = ['Consulting', 'Development', 'Marketing'];
  const warm = ['Photography', 'Videography', 'Graphic Design', 'Copywriting'];

  if (formal.includes(data.projectType)) {
    return templateB(data, date);
  } else if (warm.includes(data.projectType)) {
    return templateC(data, date);
  } else {
    return templateA(data, date);
  }
}
