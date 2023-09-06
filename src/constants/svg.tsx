export type SvgProps = {
  disabled?: boolean;
  color?: string;
  width?: string;
  height?: string;
};

export const NavigateNextSVG = ({
  disabled,
  color,
  width,
  height,
}: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "5"}`}
      height={`${height ? height : "8"}`}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.70492 0L0.294922 1.41L4.87492 6L0.294922 10.59L1.70492 12L7.70492 6L1.70492 0Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};
export const NavigateBeforeSVG = ({
  disabled,
  color,
  width,
  height,
}: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "5"}`}
      height={`${height ? height : "8"}`}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.70492 1.41L6.29492 0L0.294922 6L6.29492 12L7.70492 10.59L3.12492 6L7.70492 1.41Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};
