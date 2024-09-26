// src/components/CodeComponent.tsx
import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeComponentProps {
  codeString: string;
  language: string;
  style?: 'dracula' | 'solarizedlight';
}

const CodeComponent: React.FC<CodeComponentProps> = ({ codeString, language, style = 'dracula' }) => {
  const selectedStyle = style === 'solarizedlight' ? solarizedlight : dracula;

  return (
    <SyntaxHighlighter language={language} style={selectedStyle}>
      {codeString.trim()}
    </SyntaxHighlighter>
  );
};

export default CodeComponent;
