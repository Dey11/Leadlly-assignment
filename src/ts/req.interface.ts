import { Request } from "express";
export interface IAuthRequest extends Request {
  decodedId: string; // or any other type
}
