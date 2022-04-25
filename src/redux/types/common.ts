export interface IHandlingError {
  code: string;
  v: any;
}

export interface IDetailError {
  loc: string[];
  msg: string;
  type: string;
}

export interface IResponseError {
  detail: IDetailError[];
}

export interface IStoreCommon {
  isLoading: boolean;
  err: IHandlingError | null;
}

export interface IResponseData<T> {
  ok: boolean;
  result: T;
  err: IHandlingError;
}
