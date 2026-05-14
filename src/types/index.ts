export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  plan: string;
  billing_cycle: string;
  status: string;
}

export interface Usage {
  kb_files: {
    used: number;
    limit: number;
    percentage: number;
  };
  vocab_terms: number;
  notes: number;
}

export interface DashboardResponse {
  user: User;
  subscription: Subscription | null;
  usage: Usage;
}

export type ProfileResponse = User;

export interface CallSessionStats {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
}

export interface Participant {
  name: string;
  isUser: boolean;
}

export interface CallSession {
  _id: string;
  user_id: string;
  status: string;
  client: string;
  description: string;
  started_at: string;
  ended_at: string;
  total_duration_seconds: number;
  language: string[];
  auto_gen_ai_response: boolean;
  save_transcript: boolean;
  transcript: null;
  transcript_final: boolean;
  ai_interactions: number;
  call_framework_id: string | null;
  participants: Participant[];
  ended_reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CallSessionsResponse {
  callSessions: CallSession[];
  pagination: Pagination;
}

export interface Feedback {
  id: string;
  type: "bug" | "feature" | "improvement";
  message: string;
  rating?: number;
  createdAt: string;
}
