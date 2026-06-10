export interface LeadDraft {
  need: string;
  operationType: string;
  state: string;
  units: string;
  name: string;
  phone: string;
  email: string;
  preferredLanguage: "en" | "es";
}

export interface LeadSubmissionResult {
  ok: boolean;
  reference?: string;
  message?: string;
}

export interface LeadSubmissionAdapter {
  submit(lead: LeadDraft): Promise<LeadSubmissionResult>;
}

export const mockLeadSubmissionAdapter: LeadSubmissionAdapter = {
  async submit() {
    await new Promise((resolve) => setTimeout(resolve, 550));
    return {
      ok: true,
      reference: "preview-only",
      message: "Preview mode: this request was not stored or transmitted.",
    };
  },
};
