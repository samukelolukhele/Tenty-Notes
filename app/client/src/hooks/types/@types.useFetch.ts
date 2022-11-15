import { AxiosResponse } from "axios";

export interface UseFetchTypes {
  GET: () => Promise<void | AxiosResponse<any, any>>;
  POST: () => Promise<void | AxiosResponse<any, any>>;
  PATCH: () => Promise<void | AxiosResponse<any, any>>;
  DELETE: () => Promise<void | AxiosResponse<any, any>>;
  LOGIN: () => Promise<void | AxiosResponse<any, any>>;
  GETUSER: () => Promise<void | AxiosResponse<any, any>>;
}
