import React from "react";
import { SwaggerAPI } from "../interfaces/Swagger";
import { Endpoint } from "../interfaces/Misc";

interface EndpointListProps {
  swaggerJson: SwaggerAPI;
  selectedEndpoints: Endpoint[];
  onSelect: (endpoint: Endpoint) => void;
}

const EndpointList: React.FC<EndpointListProps> = ({
  swaggerJson,
  selectedEndpoints,
  onSelect,
}) => {
  return (
    <div>
      <h2 className="text-2xl">Select Endpoints:</h2>
      <ul className="max-h-[40rem] overflow-auto border rounded-lg mb-4">
        {Object.entries(swaggerJson.paths).map(([path, methods]) =>
          Object.keys(methods).map((method) => (
            <li key={`${method}-${path}`}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedEndpoints.some(
                    (item) => item.path === path && item.method === method
                  )}
                  onChange={() => onSelect({ path, method })}
                />
                {`${method.toUpperCase()} ${path}`}
              </label>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EndpointList;
