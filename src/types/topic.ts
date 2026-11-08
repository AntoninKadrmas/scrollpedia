export interface ResponseTopic {
  topics: Topic[];
  license: License;
}

export interface Topic {
  id: string;
  label: string;
  articles: number;
  api_url: string;
}

export interface License {
  name: string;
  url: string;
  summary: string;
}
