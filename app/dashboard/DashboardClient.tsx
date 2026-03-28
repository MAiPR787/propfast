'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Proposal } from '@/types';
import { getProposals, deleteProposal, updateProposalStatus } from '@/lib/storage';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatAmount(price: string): string {
  const num = parseFloat(price);
  return isNaN(num) ? price : `$${num.toLocaleString()}`;
}

const PROJECT_EMOJI: Record<string, string> = {
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

export default function DashboardClient() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setProposals(getProposals());
    setLoaded(true);
  }, []);

  function handleDelete(id: string) {
    deleteProposal(id);
    setProposals(getProposals());
    setDeletingId(null);
  }

  function handleToggleStatus(id: string, current: 'Draft' | 'Sent') {
    const next = current === 'Draft' ? 'Sent' : 'Draft';
    updateProposalStatus(id, next);
    setProposals(getProposals());
  }

  const viewing = proposals.find((p) => p.id === viewingId);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Your Proposals</h1>
            <p className="text-gray-500">
              {proposals.length === 0
                ? 'No proposals yet. Create your first one!'
                : `${proposals.length} proposal${proposals.length === 1 ? '' : 's'} · ${proposals.filter((p) => p.status === 'Sent').length} sent`}
            </p>
          </div>
          <Link
            href="/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Proposal
          </Link>
        </div>

        {/* Stats row */}
        {proposals.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <StatCard
              label="Total Proposals"
              value={proposals.length.toString()}
              icon="📄"
            />
            <StatCard
              label="Sent"
              value={proposals.filter((p) => p.status === 'Sent').length.toString()}
              icon="📤"
            />
            <StatCard
              label="Drafts"
              value={proposals.filter((p) => p.status === 'Draft').length.toString()}
              icon="✏️"
            />
            <StatCard
              label="Total Value"
              value={`$${proposals.reduce((sum, p) => sum + (parseFloat(p.formData.price) || 0), 0).toLocaleString()}`}
              icon="💰"
            />
          </div>
        )}

        {/* Empty state */}
        {proposals.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="text-6xl mb-6">📄</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No proposals yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Create your first AI-powered proposal in under 60 seconds. Impress clients before your competition even opens their laptop.
            </p>
            <Link
              href="/create"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              Create Your First Proposal →
            </Link>
          </div>
        )}

        {/* Proposal list */}
        {proposals.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <span>Client</span>
              <span>Project</span>
              <span>Amount</span>
              <span>Date</span>
              <span>Status</span>
            </div>

            {/* Proposal rows */}
            <div className="divide-y divide-gray-100">
              {proposals.map((proposal) => (
                <div key={proposal.id}>
                  {/* Row */}
                  <div className="px-6 py-5 flex flex-col sm:grid sm:grid-cols-[1fr_1fr_auto_auto_auto] gap-3 sm:gap-4 items-start sm:items-center hover:bg-gray-50/50 transition-colors">
                    {/* Client */}
                    <div>
                      <div className="font-semibold text-gray-900">{proposal.formData.clientName}</div>
                      {proposal.formData.clientCompany && (
                        <div className="text-sm text-gray-400">{proposal.formData.clientCompany}</div>
                      )}
                      <div className="text-xs text-gray-400 sm:hidden">{formatDate(proposal.createdAt)}</div>
                    </div>

                    {/* Project type */}
                    <div className="flex items-center gap-2">
                      <span>{PROJECT_EMOJI[proposal.formData.projectType] || '📄'}</span>
                      <span className="text-sm text-gray-600">{proposal.formData.projectType}</span>
                    </div>

                    {/* Amount */}
                    <div className="font-bold text-gray-900 tabular-nums">
                      {formatAmount(proposal.formData.price)}
                    </div>

                    {/* Date */}
                    <div className="hidden sm:block text-sm text-gray-400 whitespace-nowrap">
                      {formatDate(proposal.createdAt)}
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(proposal.id, proposal.status)}
                        className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
                          proposal.status === 'Sent'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {proposal.status}
                      </button>

                      {/* View button */}
                      <button
                        onClick={() => setViewingId(viewingId === proposal.id ? null : proposal.id)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                        title="View proposal"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>

                      {/* Delete button */}
                      {deletingId === proposal.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(proposal.id)}
                            className="text-xs text-red-600 font-semibold hover:text-red-800 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="text-xs text-gray-400 font-semibold hover:text-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(proposal.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete proposal"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded proposal view */}
                  {viewingId === proposal.id && (
                    <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50/50">
                      <div className="mt-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
                        <div className="p-6">
                          <div className="flex flex-wrap gap-3 mb-4">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(proposal.generatedContent);
                              }}
                              className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy Text
                            </button>
                            <button
                              onClick={() => window.print()}
                              className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                              </svg>
                              Print / PDF
                            </button>
                          </div>
                          <pre className="font-mono text-xs leading-relaxed text-gray-700 whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
                            {proposal.generatedContent}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {proposals.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/create" className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors">
              + Create another proposal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  );
}
