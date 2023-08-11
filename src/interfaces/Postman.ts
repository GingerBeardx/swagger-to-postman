export interface Info {
  _postman_id?: string;
  name: string;
  schema: string;
  _exporter_id?: string;
}

export interface Header {
  key: string;
  value: string;
  type: string;
  disabled?: boolean;
}

export interface URL {
  raw: string;
  host?: string[];
  path?: string[];
  query?: Query[];
}

export interface Query {
  key: string;
  value: string | null;
  disabled: boolean;
}

export interface Body {
  mode: string;
  urlencoded?: any[];
  raw?: string;
}

export interface Request {
  method: string;
  header: Header[];
  body: Body;
  url: URL;
}

export interface Event {
  listen: string;
  script: Script;
}

export interface Script {
  exec: string[];
  type: string;
}

export interface ProtocolProfileBehavior {
  disableBodyPruning?: boolean;
  disabledSystemHeaders?: Record<string, boolean>;
}

export interface Item {
  name: string;
  protocolProfileBehavior?: ProtocolProfileBehavior;
  request: Request;
  response: any[];
  event?: Event[];
}

export interface PostmanAPI {
  info: Info;
  item: Item[];
  event?: Event[];
}
