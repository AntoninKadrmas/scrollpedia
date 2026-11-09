import { FC } from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";

export const EmblaCarouselOnboard: FC = () => {
  return (
    <div className="embla__slide">
      <Card className="glass h-100 rounded-0 text-center py-5">
        <CardBody className="d-flex flex-column w-100 h-100 justify-content-center align-items-center ">
          <CardTitle>Welcome to Scrollpedia</CardTitle>
          <CardText>
            Here you can explore various random articles with infinite scroll
            functionality. Swipe up with your finger on the screen to explore
            you first article.
          </CardText>
          <img
            src="scrollpedia-swipe-up.svg"
            width="75rem"
            height="auto"
            className=""
          />
          <CardText>
            If you would like to explore articles by your own path use the
            search button bellow.
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
  );
};
