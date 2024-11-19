export default class ErrorFactory {
  static createFetchError(status: number, statusText: string, cause?: string) {
    return new Error(`FetchError: status ${status} statusText ${statusText}`, {
      cause,
    });
  }
  static createRedisError() {
    return new Error("RedisError");
  }
}
