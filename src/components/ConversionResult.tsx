import React from "react";

interface ConversionResultProps {
  postmanJson: any;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ postmanJson }) => {
  return (
    <div className="mb-4 ">
      <h2 className="text-2xl">Postman JSON:</h2>
      <pre className="max-h-[40rem] overflow-auto border rounded-lg">
        {JSON.stringify(postmanJson, null, 2)}
      </pre>
    </div>
  );
};

export default ConversionResult;
