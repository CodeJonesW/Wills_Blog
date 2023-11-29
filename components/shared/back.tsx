import Link from "next/link";
import Router from "next/router";
import { routes, theme } from "../../enums";
import { BackArrow, BackArrowContainer, Circle } from "./styles";

interface backProps {
  themeProp: string;
  route?: string;
}

export default function Back({ themeProp, route = "" }: backProps) {
  return (
    <Link href={!!route ? route : routes.home}>
      <BackArrowContainer
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 2, type: "spring" }}
        style={{ paddingTop: "16px" }}
      >
        <Circle
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
    </Link>
  );
}
