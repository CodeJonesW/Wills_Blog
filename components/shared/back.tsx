import Router from "next/router";
import { theme } from "../../enums";
import { BackArrow, BackArrowContainer, Circle } from "./styles";

interface backProps {
  themeProp: string;
  onClick?: () => void;
}

export default function Back({ themeProp }: backProps) {
  return (
    <BackArrowContainer>
      <Circle
        onClick={() => {
          Router.push("/");
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
