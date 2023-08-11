import React, { useState } from "react";
import SwaggerInput from "./components/SwaggerInput";
import ConversionResult from "./components/ConversionResult";
import { SwaggerAPI } from "./interfaces/Swagger";

interface Endpoint {
  path: string;
  method: string;
}

const App: React.FC = () => {
  const [swaggerJson, setSwaggerJson] = useState<SwaggerAPI | null>(null);
  const [selectedEndpoints, setSelectedEndpoints] = useState<Endpoint[]>([]);
  const [postmanJson, setPostmanJson] = useState<any | null>(null);

  const handlePasteFromClipboard = (content: string) => {
    try {
      const parsedSwagger = JSON.parse(content);
      setSwaggerJson(parsedSwagger);
    } catch (error) {
      console.error("Error parsing Swagger JSON:", error);
    }
  };

  const handleEndpointSelect = (endpoint: Endpoint) => {
    setSelectedEndpoints((prevSelected) =>
      prevSelected.some(
        (item) => item.path === endpoint.path && item.method === endpoint.method
      )
        ? prevSelected.filter(
            (item) =>
              !(item.path === endpoint.path && item.method === endpoint.method)
          )
        : [...prevSelected, endpoint]
    );
  };

  const convertSelectedToPostman = () => {
    // Implement the conversion logic for selected endpoints to Postman format
    // Update the postmanJson state with the converted data
    console.log("Selected endpoints:", selectedEndpoints);
  };

  return (
    <div>
      <h1>Swagger to Postman Converter</h1>
      <SwaggerInput onPaste={handlePasteFromClipboard} />
      {swaggerJson && (
        <div>
          <h2>Select Endpoints</h2>
          <ul>
            {Object.entries(swaggerJson.paths).map(([path, methods]) =>
              Object.keys(methods).map((method) => (
                <li key={`${method}-${path}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedEndpoints.some(
                        (item) => item.path === path && item.method === method
                      )}
                      onChange={() => handleEndpointSelect({ path, method })}
                    />
                    {`${method.toUpperCase()} ${path}`}
                  </label>
                </li>
              ))
            )}
          </ul>
          <button onClick={convertSelectedToPostman}>
            Convert Selected to Postman
          </button>
        </div>
      )}
      {postmanJson && (
        <ConversionResult swaggerJson={swaggerJson} postmanJson={postmanJson} />
      )}
    </div>
  );
};

export default App;
