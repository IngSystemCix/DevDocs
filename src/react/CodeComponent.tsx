import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  solarizedlight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import pkg from "react-copy-to-clipboard"; // Importa el paquete de forma predeterminada
const { CopyToClipboard } = pkg; // Desestructura CopyToClipboard del paquete

interface CodeComponentProps {
  codeString: string;
  language: string;
  style?: "dracula" | "solarizedlight";
}

const CodeComponent: React.FC<CodeComponentProps> = ({
  codeString,
  language,
  style = "dracula",
}) => {
  const [copied, setCopied] = useState(false);
  const selectedStyle = style === "solarizedlight" ? solarizedlight : dracula;

  const handleCopy = () => {
    console.log("Copying to clipboard...");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <div className="relative">
        <SyntaxHighlighter language={language} style={selectedStyle}>
          {codeString.trim()}
        </SyntaxHighlighter>

        <CopyToClipboard text={codeString} onCopy={handleCopy}>
          <button
            className="absolute z-50 top-2 right-2 px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
            aria-label="Copy code"
          >
            <i className="bi bi-clipboard"></i>
          </button>
        </CopyToClipboard>
      </div>
      {copied && (
        <div
          className="fixed bottom-4 right-4 z-30 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Información</span>
          <div>
            <span className="font-medium">Código copiado con éxito!</span>{" "}
            Puedes pegarlo donde lo necesites.
          </div>
        </div>
      )}
    </>
  );
};

export default CodeComponent;
