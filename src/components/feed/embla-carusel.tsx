import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { ResponseRandom, ResultFavorite } from "@/types/random";
import "./embla.css";
import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import { useArticleStore } from "@/store/use-article-store";
import { AsciiAvatar } from "@/components/ascii/ascii-avatar";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./embla-carusel-arrows";
import { useOnboard } from "@/store/use-onboard";
import { getPrefix } from "@/lib/prefix";
import { Path } from "@/types/subtopic";
import { EmblaCarouselOnboard } from "./embla-carusel-onboard";
import { FavoriteButton } from "../favorite-button";
import { EmblaCarouselLast } from "./embla-carusel-last";
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
            <CaruselCard
              data={data}
              index={index}
              topicPath={topicPath}
              key={data.result.id}
            />
          ))}
          {isLoading && (
            <div className="embla__slide w-100">
              <CardPlaceholder />
            </div>
          )}
          <EmblaCarouselLast />
        </div>
      </div>
      <div className="embla__arrows d-none d-lg-flex flex-column ms-2 gap-1 h-100 justify-content-end position-absolute end-0 me-5 bottom-50">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

const CaruselCard = ({
  data,
  index,
  topicPath,
}: {
  data: ResponseRandom;
  index: number;
  topicPath: Path[];
}) => {
  return (
    <div className="embla__slide" key={data.result.id}>
      <Card className="glass h-100 rounded-0">
        {topicPath && topicPath.length > 0 && (
          <CardHeader className="d-flex">
            <Breadcrumb>
              <BreadcrumbItem
                key="home"
                linkAs={Link}
                linkProps={{ to: "/" }}
                className="text-muted me-2"
              >
                Home
              </BreadcrumbItem>
              {topicPath.map((path, index) => (
                <BreadcrumbItem
                  key={path.id}
                  linkAs={Link}
                  linkProps={{ to: `/${getPrefix(path.id, "TOPIC")}` }}
                  className="text-muted me-2"
                  active={index === topicPath.length - 1}
                >
                  {path.label}
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </CardHeader>
        )}
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
          <CardText>{data?.result?.snippet}</CardText>
          <br />
          <div className="d-flex gap-2">
            <Link
              to="/$slug"
              style={{ flex: 1 }}
              params={{ slug: getPrefix(data?.result?.slug, "ARTICLE") }}
              className="text-decoration-none"
            >
              <Button variant="secondary" className="w-100 mt-auto glass py-4">
                Read more...
              </Button>
            </Link>
            <FavoriteButton
              article={{
                ...(data?.result as ResultFavorite),
              }}
              style={{ aspectRatio: "1 / 1" }}
              className="h-100 mt-auto glass py-4 d-flex align-items-center justify-content-center"
              slug={data?.result?.slug}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const CardPlaceholder = () => {
  return (
    <Card className="glass h-100 rounded-0 w-100">
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
