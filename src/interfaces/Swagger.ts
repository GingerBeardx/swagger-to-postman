export interface SwaggerInfo {
  title: string;
  description: string;
  version: string;
}

export interface SwaggerServer {
  url: string;
}

export interface SwaggerParameter {
  name: string;
  in: "path" | "query" | "header" | "cookie";
  description?: string;
  required: boolean;
  schema: {
    type: string;
    format?: string;
    default?: any;
  };
}

export interface SwaggerResponse {
  description: string;
  content: {
    [mediaType: string]: {
      schema: {
        type: string;
        items: {
          $ref: string;
        };
      };
    };
  };
}

export interface SwaggerPath {
  [path: string]: {
    [method: string]: {
      tags: string[];
      summary: string;
      parameters: SwaggerParameter[];
      responses: {
        [statusCode: string]: SwaggerResponse;
      };
    };
  };
}

export interface SwaggerPaths {
  paths: SwaggerPath;
}

export interface SwaggerAPI extends SwaggerInfo, SwaggerPaths {}
