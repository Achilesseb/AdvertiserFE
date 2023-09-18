export const toCapitalised = (toCapitalise: string) => {
  return (
    toCapitalise.charAt(0).toUpperCase() + toCapitalise.slice(1).toLowerCase()
  );
};
