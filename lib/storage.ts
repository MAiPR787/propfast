import { Proposal } from '@/types';

const STORAGE_KEY = 'propfast_proposals';

export function getProposals(): Proposal[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProposal(proposal: Proposal): void {
  if (typeof window === 'undefined') return;
  const proposals = getProposals();
  const existing = proposals.findIndex((p) => p.id === proposal.id);
  if (existing >= 0) {
    proposals[existing] = proposal;
  } else {
    proposals.unshift(proposal);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
}

export function updateProposalStatus(id: string, status: 'Draft' | 'Sent'): void {
  if (typeof window === 'undefined') return;
  const proposals = getProposals();
  const idx = proposals.findIndex((p) => p.id === id);
  if (idx >= 0) {
    proposals[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
  }
}

export function deleteProposal(id: string): void {
  if (typeof window === 'undefined') return;
  const proposals = getProposals().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
}

export function generateId(): string {
  return `prop_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
