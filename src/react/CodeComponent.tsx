import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeComponentProps {
  codeString: string;
  language: string;
}

const CodeComponent: React.FC<CodeComponentProps> = ({ codeString, language }) => {
  return (
    <SyntaxHighlighter language={language} style={solarizedDarkAtom}>
      {codeString}
    </SyntaxHighlighter>
  );
}

export default CodeComponent;