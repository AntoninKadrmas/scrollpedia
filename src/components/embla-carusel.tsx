import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { ResponseRandom } from "@/types/random";
import "./embla.css";
import { Link } from "@tanstack/react-router";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import { useArticleStore } from "@/store/use-article-store";
import { AsciiAvatar } from "@/components/ascii/ascii-avatar";
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

  return (
    <div {...props} className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((data, index) => (
            <div className="embla__slide" key={data.result.id}>
              <Card className="glass h-100 rounded-0">
                <CardBody className="d-flex flex-column">
                  <CardTitle>
                    <small style={{ fontSize: 15 }} className="text-muted">
                      {index}.{" "}
                    </small>
                    {data?.result?.title}
                  </CardTitle>
                  <AsciiAvatar
                    name={data?.result?.slug}
                    colored={false}
                    width="auto"
                    height={10}
                    className="w-50 align-self-center mb-3 mt-2 text-center"
                  />
                  <CardSubtitle>{data?.result?.topic}</CardSubtitle>
                  <br />
                  <CardText>{data?.result?.excerpt}</CardText>
                  <br />
                  <Link
                    to="/$slug"
                    params={{ slug: data?.result?.slug }}
                    className="text-decoration-none"
                  >
                    <Button
                      variant="secondary"
                      className="w-100 mt-auto glass py-4"
                    >
                      Read more...
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </div>
          ))}
          {!isLoading && (
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
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as={"div"} animation="glow" className="text-center">
          <Placeholder xs={6} className="mb-3 mt-2 h-40 align-self-center" />
        </Placeholder>
        <Placeholder as={CardSubtitle} animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
        <br />
        <Placeholder as={CardText} animation="glow">
          <Placeholder xs={12} />
          <Placeholder xs={8} />
          <Placeholder xs={10} />
          <Placeholder xs={6} />
        </Placeholder>
        <br />
        <Placeholder
          as={Button}
          className="w-100 bg-secondary border-secondary py-4"
          animation="glow"
        >
          <Placeholder xs={3} />
        </Placeholder>
      </CardBody>
    </Card>
  );
};
