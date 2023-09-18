import React from "react";

export type SvgProps = {
  disabled?: boolean;
  color?: string;
  width?: string;
  height?: string;
};

export const DeleteSVG = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "16"}`}
      height={`${height ? height : "18"}`}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 0V1H16V3H15V16C15 17.1 14.1 18 13 18H3C1.9 18 1 17.1 1 16V3H0V1H5V0H11ZM3 16H13V3H3V16ZM5 5H7V14H5V5ZM11 5H9V14H11V5Z"
        fill={`${disabled ? "#858E97" : color ? color : "#286DA9"}`}
      />
    </svg>
  );
};

export const AddSVG = ({
  disabled,
  color = "#286DA9",
  width,
  height,
}: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "16"}`}
      height={`${height ? height : "16"}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 9H9V16H7V9H0V7H7V0H9V7H16V9Z"
        fill={`${disabled ? "#858E97" : color ? color : "#286DA9"}`}
      />
    </svg>
  );
};
export const ArrowDropdownSVG = ({
  disabled,
  color,
  width,
  height,
}: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "10"}`}
      height={`${height ? height : "5"}`}
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0L5 5L10 0H0Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};

export const CheckSVG = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "18"}`}
      height={`${height ? height : "14"}`}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00016 11.17L1.83016 6.99997L0.410156 8.40997L6.00016 14L18.0002 1.99997L16.5902 0.589966L6.00016 11.17Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
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

export const CloseSVG = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "14"}`}
      height={`${height ? height : "14"}`}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};

export const DotSVG = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "12"}`}
      height={`${height ? height : "12"}`}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};

export const DotOtlinedSVG = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "12"}`}
      height={`${height ? height : "12"}`}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10ZM12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};

export const HomeOutlinedSVG = ({
  disabled,
  color,
  width,
  height,
}: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "20"}`}
      height={`${height ? height : "17"}`}
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2.69L15 7.19V15H13V9H7V15H5V7.19L10 2.69ZM10 0L0 9H3V17H9V11H11V17H17V9H20L10 0Z"
        fill={`${disabled ? "#858E97" : color ? color : "#555A63"}`}
      />
    </svg>
  );
};

export const ArrowForward = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "16"}`}
      height={`${height ? height : "16"}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};

export const ArrowBack = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "16"}`}
      height={`${height ? height : "16"}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};

export const ModeEdit = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "19"}`}
      height={`${height ? height : "18"}`}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.06 0.590005L17.41 1.94C18.2 2.72 18.2 3.99 17.41 4.77L4.18 18H0V13.82L10.4 3.41L13.23 0.590005C14.01 -0.189995 15.28 -0.189995 16.06 0.590005ZM2 16L3.41 16.06L13.23 6.23L11.82 4.82L2 14.64V16Z"
        fill={`${disabled ? "#858E97" : color ? color : "#17181D"}`}
      />
    </svg>
  );
};

export const HomeFilled = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "20"}`}
      height={`${height ? height : "17"}`}
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.0001 16L8.0001 11L12.0001 11L12.0001 16C12.0001 16.55 12.4501 17 13.0001 17L16.0001 17C16.5501 17 17.0001 16.55 17.0001 16L17.0001 8.99997L18.7001 8.99997C19.1601 8.99997 19.3801 8.42997 19.0301 8.12997L10.6701 0.599969C10.2901 0.259969 9.7101 0.259969 9.3301 0.599969L0.970099 8.12997C0.6301 8.42997 0.8401 8.99997 1.3001 8.99997L3.0001 8.99997L3.0001 16C3.0001 16.55 3.4501 17 4.0001 17L7.0001 17C7.5501 17 8.0001 16.55 8.0001 16Z"
        fill={`${disabled ? "#858E97" : color ? color : "#286DA9"}`}
      />
    </svg>
  );
};

export const PolygonSVG = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "16"}`}
      height={`${height ? height : "13"}`}
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.6341 0.846886C8.83729 -0.282296 7.16268 -0.282297 6.36587 0.846885L0.698704 8.87801C-0.236181 10.2029 0.711319 12.0311 2.33282 12.0311L13.6672 12.0311C15.2887 12.0311 16.2362 10.2029 15.3013 8.87801L9.6341 0.846886Z"
        fill={`${disabled ? "#858E97" : color ? color : "#3E424B"}`}
      />{" "}
    </svg>
  );
};
export const BoxSvg = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width ? width : "20"}`}
      height={`${height ? height : "17"}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m11.553 22.894-10-5A1 1 0 0 1 1 17V7.02a.995.995 0 0 1 .562-.919l9.991-4.995a1 1 0 0 1 .894 0L22.438 6.1a.995.995 0 0 1 .562.92V17a1 1 0 0 1-.553.894l-10 5a1 1 0 0 1-.894 0zM3 16.382V8.618l8.553 4.276a1 1 0 0 0 .894 0L21 8.618v7.764l-1.125.563V12a1 1 0 0 0-1.447-.894l-3.75 1.875a1 1 0 0 0-.553.894v5.945L12 20.882l-9-4.5zm13.125 2.438 1.75-.875v-4.327l-1.75.875v4.327zM12 10.882 4.236 7 12 3.118 19.764 7 12 10.882z"
        fill={`${disabled ? "#858E97" : color ? color : "#286DA9"}`}
      />
    </svg>
  );
};
export const MessageSvg = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width ? width : "20"}`}
      height={`${height ? height : "17"}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7V9zm8 0h2v2h-2V9zm-4 0h2v2h-2V9z"
        fill={`${disabled ? "#858E97" : color ? color : "#286DA9"}`}
      />
    </svg>
  );
};

export const ProfileSVG = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width ? width : "20"}`}
      height={`${height ? height : "17"}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM8.5 9.5C8.5 7.56 10.06 6 12 6s3.5 1.56 3.5 3.5S13.94 13 12 13s-3.5-1.56-3.5-3.5z"
        fill={`${disabled ? "#858E97" : color ? color : "#286DA9"}`}
      />
    </svg>
  );
};

export const AttentionSVG = ({ disabled, color, width, height }: SvgProps) => {
  return (
    <svg
      width={`${width ? width : "22"}`}
      height={`${height ? height : "19"}`}
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 19H22L11 0L0 19ZM12 16H10V14H12V16ZM12 12H10V8H12V12Z"
        fill={`${disabled ? "#858E97" : color ? color : "#555A63"}`}
      />
    </svg>
  );
};
