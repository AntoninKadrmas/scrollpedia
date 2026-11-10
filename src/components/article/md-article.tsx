import { Markdown } from "@tanstack/markdown/react";
import { autolinksExtension } from "@tanstack/markdown/extensions/autolinks";
import type { MarkdownExtension } from "@tanstack/markdown";
import { FC, HTMLAttributes } from "react";
import Table from "react-bootstrap/Table";
import "./md-article.css";

type articleProps = {
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
        extensions={[superscriptExtension, autolinksExtension()]}
        components={{
          a: ({ href, children, ...linkProps }) => {
            let isExternal = false;

            if (href && typeof window !== "undefined") {
              try {
                const url = new URL(href, window.location.href);
                isExternal = url.origin !== window.location.origin;
              } catch {}
            }

            return (
              <a
                {...linkProps}
                href={href}
                className={isExternal ? "text-accent" : "text-info"}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
          table: ({ children, ...tableProps }) => (
            <div
              className="my-4"
              role="region"
              aria-label="Article table"
              tabIndex={0}
            >
              <Table {...tableProps} striped bordered responsive variant="dark">
                {children}
              </Table>
            </div>
          ),
        }}
      >
        {markdown}
      </Markdown>
    </article>
  );
};
