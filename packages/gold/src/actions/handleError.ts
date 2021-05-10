export const handleError = (error: any): void => {
  //  TODO
  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }
};