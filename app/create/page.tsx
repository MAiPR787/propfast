import type { Metadata } from 'next';
import ProposalForm from '@/components/ProposalForm';

export const metadata: Metadata = {
  title: 'Create Proposal — PropFast',
  description: 'Generate a professional freelance proposal in under 60 seconds.',
};

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Create Your Proposal
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Answer a few questions and AI will write a professional proposal in under 60 seconds.
          </p>
        </div>

        <ProposalForm />
      </div>
    </div>
  );
}
