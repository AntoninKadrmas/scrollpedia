import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { ResponseRandom } from "../types/random";
import "./embla.css";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import { useArticleStore } from "../store/use-article-store";
import { getWikipediaImage } from "../utils/image";
type EmblaCarouselProps = {
  slides: ResponseRandom[];
  position: number;
  isLoading: boolean;
} & HTMLAttributes<HTMLOrSVGElement>;

export const EmblaCarousel: FC<EmblaCarouselProps> = ({
  slides,
  isLoading,
  ...props
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });
  const setPosition = useArticleStore((state) => state.setPosition);
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
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() === props.position) return;

    emblaApi.scrollTo(props.position, true);
  }, [emblaApi, props.position]);

  useEffect(() => {
    getWikipediaImage(slides[props.position]?.result?.slug).then((image) => {
      console.log(image);
      console.log(slides[props.position]?.result?.slug);
    });
  }, [emblaApi, slides, props.position]);

  return (
    <div {...props} className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((data, index) => (
            <div className="embla__slide" key={index}>
              <Link
                to="/$slug"
                params={{ slug: data?.result?.slug }}
                className="text-decoration-none"
              >
                <Card className="glass h-100 rounded-0">
                  <CardBody>
                    <CardTitle>{data?.result?.title}</CardTitle>
                    <CardSubtitle>{data?.result?.topic}</CardSubtitle>
                    <CardText className="mt-1">{data?.result?.excerpt}</CardText>
                    <div className="d-flex justify-content-end text-muted mt-auto">
                      <CardText>Read more...</CardText>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </div>
          ))}
          {isLoading && (
            <div className="embla__slide">
              <CardPlaceholder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CardPlaceholder = () => {
  return (
    <Card className="glass h-100 rounded-0">
      <CardBody>
        <Placeholder as={CardTitle} animation="glow">
          <Placeholder xs={10} />
        </Placeholder>
        <Placeholder as={CardText} animation="glow">
          <Placeholder xs={12} />
          <Placeholder xs={8} />
          <Placeholder xs={10} />
          <Placeholder xs={6} />
        </Placeholder>
        <div className="w-full text-end">
          <Placeholder as={CardText} animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </div>
      </CardBody>
    </Card>
  );
};
