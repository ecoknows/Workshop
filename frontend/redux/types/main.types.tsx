export interface RequestInterface<type> {
  type;
  payload: boolean;
}

export interface SuccessAndFailInterface<type, payload> {
  type;
  payload;
}

export interface DefaultPropertiesInterface {
  loading?: boolean;
  error?: any;
}
