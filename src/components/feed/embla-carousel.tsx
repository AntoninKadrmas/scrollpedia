import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { ResponseRandom } from "@/types/random";
import "./embla.css";
import { useArticleStore } from "@/store/use-article-store";
import {
  FileButton,
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./embla-carousel-arrows";
import { useOnboard } from "@/store/use-onboard";
import { Path } from "@/types/subtopic";
import { EmblaCarouselOnboard } from "./embla-carousel-onboard";
import { EmblaCarouselLast } from "./embla-carousel-last";
import {
  EmblacarouselCard,
  EmblacarouselCardPlaceholder,
} from "./embla-carousel-card";
import { RoundedButtonPlaceholder } from "../favorite/favorite-button";

type EmblaCarouselProps = {
  slides: ResponseRandom[];
  position: number;
  isLoading: boolean;
  topicPath?: Path[];
} & HTMLAttributes<HTMLOrSVGElement>;

export const EmblaCarousel: FC<EmblaCarouselProps> = ({
  slides,
  isLoading,
  topicPath = [],
  ...props
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });
  const setPosition = useArticleStore((state) => state.setPosition);
  const hasOnboard = useOnboard((state) => state.hasOnboarded);
  const setHasOnboarded = useOnboard((state) => state.setHasOnboarded);
  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setPosition(emblaApi.selectedScrollSnap());
    },
    [setPosition],
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("reInit", onSelect).on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!hasOnboard && props.position > 0) {
      setHasOnboarded(true);
      setPosition(0);
    }
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() === props.position) return;

    emblaApi.scrollTo(props.position, true);
  }, [emblaApi, props.position]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div {...props} className="embla d-flex">
      <div className="embla__viewport w-100" ref={emblaRef}>
        <div className="embla__container">
          {!hasOnboard && <EmblaCarouselOnboard />}
          {slides.map((data, index) => (
            <EmblacarouselCard
              data={data}
              index={index}
              topicPath={topicPath}
              key={data.result.id}
            />
          ))}
          {isLoading && <EmblacarouselCardPlaceholder />}
          {!isLoading && <EmblaCarouselLast />}
        </div>
      </div>
      <div className="d-none d-lg-flex flex-column ms-2 gap-1 position-fixed top-50 end-0 translate-middle-y me-5">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        {slides.length > 0 ? (
          <FileButton data={slides[props.position]} />
        ) : (
          <RoundedButtonPlaceholder rounded />
        )}
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};
