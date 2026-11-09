export interface ResponseRandom {
  result: Result;
  license: License;
}

export interface Result {
  id: string;
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  snippet: string;
  node: string;
  url: string;
  markdown_url: string;
  api_url: string;
}

export interface ResultFavorite {
  id: string;
  slug: string;
  title: string;
  snippet: string;
}

export interface License {
  name: string;
  url: string;
  summary: string;
}

export const MockRandom = {
  result: {
    id: "ep98xk0ge4",
    slug: "jacob-reses",
    title: "Jacob Reses",
    topic: "Society and history",
    excerpt:
      "Jacob Reses, American political advisor and chief of staff to Vice President JD Vance from January 2025, formerly Vance's Senate chief of staff, Princeton and Stanford Law graduate, leaving the administration in summer 2026.",
    snippet:
      "Jacob Reses, American political advisor and chief of staff to Vice President JD Vance from January 2025, formerly Vance's Senate chief of staff, Princeton and Stanford Law graduate, leaving the administration in summer 2026.",
    node: "society.politics.institutions.politicians_and_officeholders.us-senators",
    url: "https://www.edgechat.ai/jacob-reses",
    markdown_url: "https://www.edgechat.ai/jacob-reses.md",
    api_url: "https://www.edgechat.ai/api/v1/articles/jacob-reses",
  },
  license: {
    name: "Edgepedia Community License 1.0",
    url: "https://www.edgechat.ai/edgepedia/license",
    summary:
      "Free with credit, commercial use included. AI training is open to everyone. For other uses, organizations over USD 100M in revenue or 100M monthly users license separately.",
  },
};
