type DataOrError<T, U extends Error> = {
  data?: T;
  error?: U;
};
