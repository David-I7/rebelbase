export function debounceAsync<T, U>(
  cb: (props: T) => Promise<U>,
  delayMS: number
): (props: T) => Promise<U> {
  let timer!: NodeJS.Timeout;

  return async (props: T) => {
    clearTimeout(timer);
    return await new Promise((res, rej) => {
      timer = setTimeout(async () => {
        try {
          return res(await cb(props));
        } catch (error) {
          throw error;
        }
      }, delayMS);
    });
  };
}
