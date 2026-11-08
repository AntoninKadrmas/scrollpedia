import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { ResponseRandom } from "@/types/random";
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
          {!hasOnboard && (
            <div className="embla__slide">
              <Card className="glass h-100 rounded-0 text-center py-5">
                <CardBody className="d-flex flex-column w-100 h-100 justify-content-center align-items-center ">
                  <CardTitle>Welcome to Scrollpedia</CardTitle>
                  <CardText>
                    Here you can explore various random articles with infinite
                    scroll functionality. Swipe up with your finger on the
                    screen to explore you first article.
                  </CardText>
                  <img
                    src="scrollpedia-swipe-up.svg"
                    width="75rem"
                    height="auto"
                    className=""
                  />
                  <CardText>
                    If you would like to explore articles by your own path use
                    the search button bellow.
                  </CardText>
                  <img
                    src="scrollpedia-arrow-down.svg"
                    width="50rem"
                    height="auto"
                    className=""
                  />
                </CardBody>
              </Card>
            </div>
          )}

          {slides.map((data, index) => (
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
                  <Link
                    to="/$slug"
                    params={{ slug: getPrefix(data?.result?.slug, "ARTICLE") }}
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
          {isLoading && (
            <div className="embla__slide w-100">
              <CardPlaceholder />
            </div>
          )}
        </div>
      </div>
      <div className="embla__arrows d-none d-lg-flex flex-column ms-2 gap-1 h-100 justify-content-end position-absolute end-0 me-5 bottom-50">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
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
