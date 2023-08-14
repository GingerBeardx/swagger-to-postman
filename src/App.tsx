import React, { useState } from "react";
import SwaggerInput from "./components/SwaggerInput";
import ConversionResult from "./components/ConversionResult";
import { SwaggerAPI } from "./interfaces/Swagger";
import { PostmanAPI, Info, Item } from "./interfaces/Postman";
import Button from "./components/ui/Button";
import Notification from "./components/Notofication";

interface Endpoint {
  path: string;
  method: string;
}

const App: React.FC = () => {
  const [swaggerJson, setSwaggerJson] = useState<SwaggerAPI | null>(null);
  const [selectedEndpoints, setSelectedEndpoints] = useState<Endpoint[]>([]);
  const [postmanJson, setPostmanJson] = useState<PostmanAPI | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasteFromClipboard = (content: string) => {
    try {
      const parsedSwagger = JSON.parse(content);
      setSwaggerJson(parsedSwagger);
    } catch (error) {
      setError("Invalid JSON was found during conversion.");
    }
  };

  const handleClearEndpoints = () => {
    setSwaggerJson(null);
    setSelectedEndpoints([]);
    setPostmanJson(null);
    setError(null);
  };

  const handleError = (error: unknown) => {
    setError(error as string);

    setTimeout(() => {
      setError(null);
    }, 10000);
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
    const info: Info = {
      name: "ProtoEndpoints",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    };

    const items: Item[] = selectedEndpoints.map((endpoint) => {
      const pathArray: string[] = endpoint.path.split("/");
      const item: Item = {
        name: endpoint.path,
        request: {
          url: { raw: endpoint.path, path: pathArray },
          method: endpoint.method.toUpperCase(),
          header: [],
          body: {
            mode: "raw",
            raw: "",
          },
        },
        response: [],
      };
      return item;
    });

    const postmanJson: PostmanAPI = {
      info: info,
      item: items,
    };
    setPostmanJson(postmanJson);
  };

  return (
    <div className="w-screen min-h-screen bg-blue-900 text-white">
      <h1 className="text-3xl text-center py-2">
        Swagger to Postman Converter
      </h1>
      <SwaggerInput
        onPaste={handlePasteFromClipboard}
        onClear={handleClearEndpoints}
        onError={handleError}
      />
      {error && <Notification type="error">{error}</Notification>}
      {swaggerJson && (
        <div>
          <h2 className="text-2xl">Select Endpoints:</h2>
          <ul className="mx-4 my-2">
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
          <Button onClick={convertSelectedToPostman}>
            Convert Selected to Postman
          </Button>
        </div>
      )}
      {postmanJson && <ConversionResult postmanJson={postmanJson} />}
    </div>
  );
};

export default App;
