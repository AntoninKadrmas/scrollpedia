import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { Button } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "lucide-react";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props;

  return (
    <Button
      className={"embla__button embla__button--prev h-10 w-10 p-2 d-flex justify-content-center align-items-center rounded-circle glass".concat(
        disabled ? " embla__button--disabled" : "",
      )}
      type="button"
      {...restProps}
    >
      <ChevronUp className="h-6 w-6" />
      {children}
    </Button>
  );
};

export const NextButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props;

  return (
    <Button
      className={"embla__button embla__button--next h-10 p-2 w-10 d-flex justify-content-center align-items-center rounded-circle glass".concat(
        disabled ? " embla__button--disabled" : "",
      )}
      type="button"
      {...restProps}
    >
      <ChevronDown className="h-6 w-6" />
      {children}
    </Button>
  );
};
