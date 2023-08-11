import React, { useState } from "react";
import SwaggerInput from "./components/SwaggerInput";
import ConversionResult from "./components/ConversionResult";

const App: React.FC = () => {
  const [swaggerJson, setSwaggerJson] = useState("");
  const [postmanJson, setPostmanJson] = useState<any | null>(null);

  const handlePasteFromClipboard = (content: string) => {
    setSwaggerJson(content);
    // Implement your Swagger to Postman conversion logic here and setPostmanJson
  };

  return (
    <div>
      <h1>Swagger to Postman Converter</h1>
      <SwaggerInput onPaste={handlePasteFromClipboard} />
      <ConversionResult swaggerJson={swaggerJson} postmanJson={postmanJson} />
    </div>
  );
};

export default App;
