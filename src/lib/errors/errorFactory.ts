export default class ErrorFactory {
  static createFetchError(status: number, statusText: string, cause?: string) {
    return new Error(`FetchError: status ${status} statusText ${statusText}`, {
      cause,
    });
  }
  static createRedisError(message: string) {
    return new Error(`Redis Error: ${message}`);
  }
  static createInvalidArgumentsError(message: string, cause?: string) {
    return new Error(`InvalidArgumentsError: ${message}`, {
      cause,
    });
  }
}
