export interface ResponseSearch {
  query: string;
  match: string;
  total: number;
  page: number;
  pages: number;
  results: Result[];
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
  match: string;
  confidence: number;
  importance: number;
  rank: number;
  words: number;
  reading_grade: number;
  reading_minutes: number;
  highlight: string;
}

export interface License {
  name: string;
  url: string;
  summary: string;
}

export const MockSearch = {
  query: "koala",
  match: "exact",
  total: 2,
  page: 1,
  pages: 1,
  results: [
    {
      id: "ep7rbwcy0a",
      slug: "koala",
      title: "Koala",
      topic: "Life and health",
      excerpt:
        "Koala (Phascolarctos cinereus), an arboreal marsupial of eastern Australia, closest relative the wombat, feeding almost entirely on eucalypt leaves; endangered under the EPBC Act in QLD, NSW and ACT since February 2022, with chlamydia, habitat loss and heat as key threats.",
      snippet:
        "Koala (Phascolarctos cinereus), an arboreal marsupial of eastern Australia, closest relative the wombat, feeding almost entirely on eucalypt leaves; endangered under the EPBC Act in QLD, NSW and ACT since February 2022, with chlamydia, habitat loss and heat as key threats.",
      node: "life.animals.mammals.monotremes-marsupials",
      url: "https://www.edgechat.ai/koala",
      markdown_url: "https://www.edgechat.ai/koala.md",
      api_url: "https://www.edgechat.ai/api/v1/articles/koala",
      match: "exact",
      confidence: 1,
      importance: 0.4521,
      rank: 284417,
      words: 1578,
      reading_grade: 14.8,
      reading_minutes: 7,
      highlight:
        "Koala (Phascolarctos cinereus), an arboreal marsupial of eastern Australia, closest relative the wombat, feeding almost entirely on eucalypt leaves; endangered under the EPBC Act in QLD, NSW and ACT since February 2022, with chlamydia, habitat loss and heat as key threats.",
    },
    {
      id: "epxxn3ztv8",
      slug: "koala-man",
      title: "Koala Man",
      topic: "Arts and culture",
      excerpt:
        "Koala Man is a 2023 American-Australian adult animated superhero sitcom created by Michael Cusack for Hulu, starring Cusack, Sarah Snook, and Hugh Jackman in eight episodes.",
      snippet:
        "Koala Man is a 2023 American-Australian adult animated superhero sitcom created by Michael Cusack for Hulu, starring Cusack, Sarah Snook, and Hugh Jackman in eight episodes.",
      node: "culture.performance.screen.series.series_scripted_tv.animated-series.adult-animated-comedy-series",
      url: "https://www.edgechat.ai/koala-man",
      markdown_url: "https://www.edgechat.ai/koala-man.md",
      api_url: "https://www.edgechat.ai/api/v1/articles/koala-man",
      match: "partial",
      confidence: 0.7,
      importance: 0.5059,
      rank: 256465,
      words: 1365,
      reading_grade: 12.8,
      reading_minutes: 6,
      highlight:
        "Koala Man is a 2023 American-Australian adult animated superhero sitcom created by Michael Cusack for Hulu, starring Cusack, Sarah Snook, and Hugh Jackman in eight episodes.",
    },
  ],
  license: {
    name: "Edgepedia Community License 1.0",
    url: "https://www.edgechat.ai/edgepedia/license",
    summary:
      "Free with credit, commercial use included. AI training is open to everyone. For other uses, organizations over USD 100M in revenue or 100M monthly users license separately.",
  },
};
