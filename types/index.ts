export type ProjectType =
  | 'Web Design'
  | 'Graphic Design'
  | 'Copywriting'
  | 'Consulting'
  | 'Photography'
  | 'Videography'
  | 'Marketing'
  | 'Development'
  | 'Other';

export type Timeline =
  | '1 week'
  | '2 weeks'
  | '1 month'
  | '2 months'
  | '3+ months';

export type ProposalStatus = 'Draft' | 'Sent';

export interface ProposalFormData {
  // Step 1
  projectType: ProjectType | '';
  // Step 2
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  // Step 3
  projectDescription: string;
  timeline: Timeline | '';
  price: string;
  // Step 4
  yourName: string;
  businessName: string;
  yourEmail: string;
}

export interface Proposal {
  id: string;
  formData: ProposalFormData;
  generatedContent: string;
  createdAt: string;
  status: ProposalStatus;
}
