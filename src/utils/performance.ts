export function debounceAsync<T, U>(
  cb: (props: T) => Promise<U>,
  delayMS: number
): (props: T) => Promise<U> {
  let timer!: NodeJS.Timeout;

  return async (props: T) => {
    clearTimeout(timer);
    return await new Promise((res) => {
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
export function debounce<T, U>(
  cb: (props: T) => U,
  delayMS: number
): (props: T) => undefined {
  let timer!: NodeJS.Timeout;

  return (props: T) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb(props);
    }, delayMS);
  };
}
