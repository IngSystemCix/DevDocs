import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, solarizedlight } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeComponentProps {
    codeString: string;
    language: string;
    style?: "dracula" | "solarizedlight";
}

const CodeComponent: React.FC<CodeComponentProps> = ({ codeString, language, style = "dracula" }) => {
    const [copied, setCopied] = useState(false);
    const selectedStyle = style === "solarizedlight" ? solarizedlight : dracula;

    const handleCopy = async () => {
        try {
            await (navigator.clipboard as Clipboard).writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Error copying text: ", err);
            if (navigator.clipboard) {
              // Si navigator.clipboard está presente pero falla, es probable que sea un problema de permisos o HTTPS
              alert("Failed to copy text. Please ensure you are using HTTPS and have granted clipboard permissions.");
            } else {
              // Si navigator.clipboard no está presente, usar una solución alternativa (ej. execCommand, que está en desuso)
              const textArea = document.createElement('textarea');
              textArea.value = codeString;
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();
              try {
                await (navigator.clipboard as Clipboard).writeText(codeString);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch (copyError) {
                console.error("Fallback copy failed:", copyError);
                alert("Copying is not supported in this browser. Please copy manually.");
              }
              document.body.removeChild(textArea);
            }
        }
    };

    return (
        <div className="relative">
            <SyntaxHighlighter language={language} style={selectedStyle}>
                {codeString.trim()}
            </SyntaxHighlighter>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
                aria-label="Copy code"
            >
                <i className="bi bi-clipboard"></i>
            </button>
            {copied && (
                <div className="absolute bottom-2 z-10 right-16 text-sm text-green-500">
                    Copied!
                </div>
            )}
        </div>
    );
};

export default CodeComponent;