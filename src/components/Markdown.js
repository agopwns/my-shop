import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-neutral dark:prose-invert max-w-none"
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-600 dark:text-gray-300">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4">{children}</ul>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
