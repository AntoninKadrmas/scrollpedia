import { generateGradient } from "@marko19907/string-to-color";
import { FC, HTMLAttributes } from "react";

type backgroundProps = {
  className?: string;
  value: string;
} & HTMLAttributes<HTMLOrSVGElement>;

export const Background: FC<backgroundProps> = ({ ...props }) => {
  return (
    <div
      className="position-absolute top-50 start-50 translate-middle vw-100 vh-100 z-n1"
      style={{
        filter: "blur(150px)",
        backgroundImage: generateGradient(props.value),
        animation: "rotate 30s linear infinite",
        opacity: "0.75",
        borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
      }}
    />
  );
};
