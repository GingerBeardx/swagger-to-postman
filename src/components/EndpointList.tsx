import React from "react";
import { SwaggerAPI } from "../interfaces/Swagger";
import { Endpoint } from "../interfaces/Misc";
import Button from "./ui/Button";

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
  const areAllSelected = (): boolean => {
    let totalEndpoints = 0;
    for (let path in swaggerJson.paths) {
      totalEndpoints += Object.keys(swaggerJson.paths[path]).length;
    }
    return totalEndpoints === selectedEndpoints.length;
  };

  const handleSelectAll = () => {
    const allEndpoints: Endpoint[] = [];
    for (let path in swaggerJson.paths) {
      for (let method in swaggerJson.paths[path]) {
        allEndpoints.push({ path, method });
      }
    }
    allEndpoints.forEach(onSelect);
  };

  const handleDeselectAll = () => {
    selectedEndpoints.forEach(onSelect);
  };

  return (
    <div>
      <div className="flex">
        <h2 className="text-2xl">Select Endpoints:</h2>
        <div>
          {areAllSelected() ? (
            <Button onClick={handleDeselectAll}>Deselect All</Button>
          ) : (
            <Button onClick={handleSelectAll}>Select All</Button>
          )}
        </div>
      </div>
      <ul className="max-h-[40rem] overflow-auto border rounded-lg mb-4 py-2">
        {Object.entries(swaggerJson.paths).map(([path, methods]) =>
          Object.keys(methods).map((method) => (
            <li key={`${method}-${path}`}>
              <label>
                <input
                  className="mr-2"
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
