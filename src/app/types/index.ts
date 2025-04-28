export interface Domain {
  id: string;
  url: string;
  status: boolean;
  last_checked: string;
  registrar: string;
  creation_date: string;
  updated_date: string;
  expiration_date: string;
  name_servers: string[];
  registrant: string;
  ssl_issuer: string;
  ssl_valid_from: string;
  ssl_valid_till: string;
  ssl_status: boolean;
  alternative_urls: string[];
  createdAt: string;
  email_issues: EmailIssue[];
  dkim_selector: string | null;
  email_deliverability_score: number;
  email_deliverability_score_updated_at: string | null;
}

export interface EmailIssue {
  issue: string;
  severity: "High" | "Medium" | "Low";
  description: string;
  remediation: string;
}