import React, { useState } from "react";
import SwaggerInput from "./components/SwaggerInput";
import ConversionResult from "./components/ConversionResult";
import { SwaggerAPI } from "./interfaces/Swagger";
import { PostmanAPI, Info, Item } from "./interfaces/Postman";
import { Endpoint } from "./interfaces/Misc";
import Button from "./components/ui/Button";
import Notification from "./components/Notofication";
import EndpointList from "./components/EndpointList";

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

  const handleCopyToClipboard = () => {
    // Implement the copy to clipboard logic
    navigator.clipboard.writeText(JSON.stringify(postmanJson, null, 2));
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
      <div className="w-screen flex gap-3 p-4">
        {swaggerJson && (
          <div className="w-1/2">
            <EndpointList
              swaggerJson={swaggerJson}
              selectedEndpoints={selectedEndpoints}
              onSelect={handleEndpointSelect}
            />
            <Button onClick={convertSelectedToPostman}>
              Convert Selected to Postman
            </Button>
          </div>
        )}
        {postmanJson && (
          <div className="w-1/2">
            <ConversionResult postmanJson={postmanJson} />
            <Button onClick={handleCopyToClipboard}>Copy To Clipboard</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
