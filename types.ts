export enum Module {
  DASHBOARD = 'Dashboard',
  RESIDENTS = 'Residents',
  DOCUMENTS = 'Documents',
  BLOTTER = 'Blotter',
  HEALTH = 'Health',
  FINANCE = 'Finance',
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum CivilStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  WIDOWED = 'Widowed',
  SEPARATED = 'Separated',
  ANNULLED = 'Annulled',
}

export interface Resident {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  birthDate: string;
  gender: Gender;
  civilStatus: CivilStatus;
  address: string;
  contactNumber: string;
  email?: string;
  householdId: string;
  isVoter: boolean;
  dateRegistered: string;
}

export enum DocumentType {
    BARANGAY_CLEARANCE = 'Barangay Clearance',
    CERTIFICATE_OF_RESIDENCY = 'Certificate of Residency',
    BUSINESS_PERMIT = 'Business Permit',
}

export interface Document {
    id: string;
    residentId: string;
    residentName: string;
    documentType: DocumentType;
    purpose: string;
    dateIssued: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export enum CaseStatus {
    FILED = 'Filed',
    MEDIATION = 'Mediation',
    CONCILIATION = 'Conciliation',
    SETTLED = 'Amicably Settled',
    DISMISSED = 'Dismissed',
    CERTIFIED_FOR_COURT = 'Certified for Court Action',
}

export interface LuponCase {
    id: string;
    caseNumber: string;
    complainant: string;
    respondent: string;
    natureOfComplaint: string;
    dateFiled: string;
    narrative: string;
    status: CaseStatus;
    actionTaken?: string;
    settlementDetails?: string;
}

export interface HealthRecord {
    id: string;
    residentId: string;
    residentName: string;
    checkupDate: string;
    diagnosis: string;
    treatment: string;
    notes?: string;
}

export enum TransactionType {
    INCOME = 'Income',
    EXPENSE = 'Expense',
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    type: TransactionType;
    amount: number;
    category: string;
}