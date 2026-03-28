'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProposalFormData } from '@/types';
import { updateProposalStatus } from '@/lib/storage';

interface Props {
  content: string;
  proposalId: string;
  formData: ProposalFormData;
  onBack: () => void;
}

export default function ProposalOutput({ content, proposalId, formData, onBack }: Props) {
  const [copied, setCopied] = useState(false);
  const [markedSent, setMarkedSent] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handlePrint() {
    window.print();
  }

  function handleMarkSent() {
    updateProposalStatus(proposalId, 'Sent');
    setMarkedSent(true);
  }

  return (
    <div>
      {/* Success banner */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8 flex items-start gap-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-green-900 mb-1">Your proposal is ready!</h3>
          <p className="text-green-700 text-sm">
            Professional proposal for <strong>{formData.clientName}</strong>
            {formData.clientCompany ? ` at ${formData.clientCompany}` : ''} has been generated and saved.
          </p>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap gap-3 mb-8 print:hidden">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
            copied
              ? 'border-green-400 bg-green-50 text-green-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Text
            </>
          )}
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save PDF
        </button>

        {!markedSent ? (
          <button
            onClick={handleMarkSent}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Mark as Sent
          </button>
        ) : (
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Marked as Sent
          </span>
        )}

        <div className="ml-auto flex gap-2">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
          >
            ← Edit
          </button>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
          >
            Dashboard →
          </Link>
        </div>
      </div>

      {/* Proposal content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Proposal header accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="p-8 sm:p-12">
          <pre className="font-mono text-sm leading-relaxed text-gray-800 whitespace-pre-wrap break-words">
            {content}
          </pre>
        </div>

        {/* Proposal footer */}
        <div className="px-8 sm:px-12 py-6 bg-gray-50 border-t border-gray-100 print:hidden">
          <p className="text-xs text-gray-400 text-center">
            Generated by <span className="font-semibold text-blue-600">PropFast</span> · This proposal was created in under 60 seconds
          </p>
        </div>
      </div>

      {/* Quick send tip */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5 print:hidden">
        <h4 className="font-semibold text-blue-900 text-sm mb-2">💡 Pro tip: Send it right now</h4>
        <p className="text-blue-700 text-sm">
          Copy the proposal text, paste it into an email, attach a PDF (use Print → Save as PDF above), and send it to{' '}
          <strong>{formData.clientEmail}</strong>. Strike while the iron's hot!
        </p>
      </div>
    </div>
  );
}
