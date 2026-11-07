import { Markdown } from "@tanstack/markdown/react";
import type { MarkdownExtension } from "@tanstack/markdown";
import { FC, HTMLAttributes } from "react";
import "./article.css";

type articleProps = {
  className?: string;
  markdown: string;
} & HTMLAttributes<HTMLOrSVGElement>;

const superscriptExtension: MarkdownExtension = {
  name: "superscript",
  inlineParser: {
    markers: "<",
    parse: ({ source, index, parseInline }) => {
      const match = /^<sup>([\s\S]*?)<\/sup>/i.exec(source.slice(index));
      if (!match) return;

      return {
        node: {
          type: "inlineComponent",
          name: "sup",
          tagName: "sup",
          attributes: {},
          children: parseInline(match[1]),
        },
        length: match[0].length,
      };
    },
  },
};

export const MdArticle: FC<articleProps> = ({ markdown, ...props }) => {
  return (
    <article
      {...props}
      className={"markdown-content mx-auto " + (props.className ?? "")}
    >
      <Markdown
        extensions={[superscriptExtension]}
        components={{
          table: ({ children, ...tableProps }) => (
            <div
              className="markdown-table-scroll"
              role="region"
              aria-label="Article table"
              tabIndex={0}
            >
              <table {...tableProps}>{children}</table>
            </div>
          ),
        }}
      >
        {markdown}
      </Markdown>
    </article>
  );
};
