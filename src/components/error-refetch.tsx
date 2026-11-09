import { cn } from "@/lib/utils";
import { GlobeOff } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { Button } from "react-bootstrap";

type errorProps = {
  className?: string;
  disabled: boolean;
  refetch: () => void;
} & HTMLAttributes<HTMLOrSVGElement>;

export const ErrorRefetch: FC<errorProps> = ({
  disabled,
  refetch,
  ...props
}) => {
  return (
    <div
      className={cn(
        "vw-100 d-flex align-items-center justify-content-center flex-column gap-2",
        props.className,
      )}
    >
      <GlobeOff size={"3rem"} />
      An error occurred while fetching the data.
      <Button disabled={disabled} className="glass" onClick={() => refetch()}>
        Refetch
      </Button>
    </div>
  );
};
