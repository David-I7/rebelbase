export function debounce<T extends CallableFunction, U>(
  cb: T,
  delayMS: number,
  ...args: U[]
) {
  let timer!: NodeJS.Timeout;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return cb(args);
    }, delayMS);
  };
}
