import Router from "next/router";
import { routes, theme } from "../../enums";
import { BackArrow, BackArrowContainer, Circle } from "./styles";

interface backProps {
  themeProp: string;
  route?: string;
}

export default function Back({ themeProp, route = "" }: backProps) {
  return (
    <BackArrowContainer>
      <Circle
        onClick={() => {
          Router.push(!!route ? route : routes.home);
        }}
        style={{
          borderColor: themeProp === theme.dark ? "white" : "black",
        }}
      >
        <BackArrow
          style={{
            position: "relative",
            top: "0",
            left: "-2px",
            borderRight: `10px solid ${
              themeProp === theme.dark ? "white" : "black"
            }`,
          }}
        />
      </Circle>
    </BackArrowContainer>
  );
}
