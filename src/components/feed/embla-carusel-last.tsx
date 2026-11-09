import { RefreshCcw } from "lucide-react";
import { FC } from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";

export const EmblaCarouselLast: FC = () => {
  return (
    <div className="embla__slide">
      <Card className="glass h-100 rounded-0 text-center py-5">
        <CardBody className="d-flex flex-column w-100 h-100 justify-content-center align-items-center ">
          <CardTitle>You have reached the end</CardTitle>
          <CardText>To access more articles try to refresh the page.</CardText>
          <RefreshCcw size={"3rem"} />
        </CardBody>
      </Card>
    </div>
  );
};
