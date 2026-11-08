export interface ResponseSubtopic {
  id: string
  label: string
  path: Path[]
  articles: number
  children: Children[]
  page: number
  pages: number
  results: Result[]
  license: License
}

export interface Path {
  id: string
  label: string
  api_url: string
}

export interface Children {
  id: string
  label: string
  articles: number
  api_url: string
}

export interface Result {
  id: string
  slug: string
  title: string
  topic: string
  excerpt: string
  snippet: string
  node: string
  url: string
  markdown_url: string
  api_url: string
}

export interface License {
  name: string
  url: string
  summary: string
}
