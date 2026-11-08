type Prefix = keyof typeof PREFIX;
export const PREFIX = {
  TOPIC: "topic-",
  ARTICLE: "article-",
};

export const getPrefix = (slug: string, prefix: Prefix) => {
  return `${PREFIX[prefix]}${slug}`;
};

export const getCleanedPRefix = (slug: string) => {
  return slug.replace(/^(topic-|article-)/, "");
};

export const getPRefixTYpe = (slug: string): Prefix | null => {
  if (slug.startsWith(PREFIX.TOPIC)) return "TOPIC";
  if (slug.startsWith(PREFIX.ARTICLE)) return "ARTICLE";
  return null;
};
