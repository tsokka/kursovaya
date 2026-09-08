import {DefaultResponseType} from "../../../types";

export class TypeGuardUtil {
  static isDefaultResponse(data: unknown): data is DefaultResponseType {
    return typeof data === 'object' && data !== null && 'error' in data;
  }
}
