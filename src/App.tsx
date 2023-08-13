import React, { useState } from 'react';
import SwaggerInput from './components/SwaggerInput';
import ConversionResult from './components/ConversionResult';
import { SwaggerAPI } from './interfaces/Swagger';
import { PostmanAPI, Info, Item } from './interfaces/Postman';

interface Endpoint {
  path: string;
  method: string;
}

const App: React.FC = () => {
  const [swaggerJson, setSwaggerJson] = useState<SwaggerAPI | null>(null);
  const [selectedEndpoints, setSelectedEndpoints] = useState<Endpoint[]>([]);
  const [postmanJson, setPostmanJson] = useState<PostmanAPI | null>(null);

  const handlePasteFromClipboard = (content: string) => {
    try {
      const parsedSwagger = JSON.parse(content);
      setSwaggerJson(parsedSwagger);
    } catch (error) {
      console.error('Error parsing Swagger JSON:', error);
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
    const info: Info = {
      name: 'ProtoFusionService',
      schema:
        'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    };

    const items: Item[] = selectedEndpoints.map((endpoint) => {
      const pathArray: string[] = endpoint.path.split('/');
      const item: Item = {
        name: endpoint.path,
        request: {
          url: { raw: endpoint.path, path: pathArray },
          method: endpoint.method.toUpperCase(),
          header: [],
          body: {
            mode: 'raw',
            raw: '',
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
    <div>
      <h1 className='text-3xl font-bold'>Swagger to Postman Converter</h1>
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
                      type='checkbox'
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
      {postmanJson && <ConversionResult postmanJson={postmanJson} />}
    </div>
  );
};

export default App;
