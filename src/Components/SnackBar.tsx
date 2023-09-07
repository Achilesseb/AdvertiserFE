type SnackbarProps = { type: "error" | "warning" | "success"; message: string };

export const Snackbar = ({ type, message }: SnackbarProps) => {
  const types = {
    error: { mainDiv: "border-error-60 bg-error-99", sideDiv: "bg-error-90" },
    warning: {
      mainDiv: "border-warning-60 bg-warning-99",
      sideDiv: "bg-warning-90",
    },
    success: {
      mainDiv: "border-success-60 bg-success-99",
      sideDiv: "bg-success-90",
    },
  };
  return (
    <div
      className={`pr-8 h-17 max-w-max flex items-center gap-4 border rounded ${
        types[type as keyof typeof types].mainDiv
      }`}
    >
      <div
        className={`w-4 h-full ${types[type as keyof typeof types].sideDiv}`}
      ></div>
      <div className="w-full text-center ">{message}</div>
    </div>
  );
};
