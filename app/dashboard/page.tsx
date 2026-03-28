import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'My Proposals — PropFast',
  description: 'View and manage your generated proposals.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
