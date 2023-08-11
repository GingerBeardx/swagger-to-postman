import React from "react";

interface ConversionResultProps {
  postmanJson: any;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ postmanJson }) => {
  const handleCopyToClipboard = () => {
    // Implement the copy to clipboard logic
    navigator.clipboard.writeText(JSON.stringify(postmanJson, null, 2));
  };

  return (
    <div>
      <h2>Postman JSON</h2>
      <button onClick={handleCopyToClipboard}>Copy To Clipboard</button>
      <pre>{JSON.stringify(postmanJson, null, 2)}</pre>
    </div>
  );
};

export default ConversionResult;
