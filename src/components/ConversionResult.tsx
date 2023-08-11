import React from "react";

interface ConversionResultProps {
  swaggerJson: any;
  postmanJson: any;
}

const ConversionResult: React.FC<ConversionResultProps> = ({
  swaggerJson,
  postmanJson,
}) => {
  return (
    <div>
      <h2>Swagger JSON</h2>
      <pre>{JSON.stringify(swaggerJson, null, 2)}</pre>
      <h2>Postman JSON</h2>
      <pre>{JSON.stringify(postmanJson, null, 2)}</pre>
    </div>
  );
};

export default ConversionResult;
