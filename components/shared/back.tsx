import Link from "next/link";
import { routes, theme } from "../../enums";
import { BackArrow, BackArrowContainer, Circle } from "./styles";
import { useHtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";
import { useTheme } from "@mui/material";

interface backProps {
  themeProp: string;
  route?: string;
}

export default function Back({ themeProp, route = "" }: backProps) {
  const myTheme = useTheme();
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
            borderColor:
              themeProp === theme.dark
                ? myTheme.palette.text.primary
                : myTheme.palette.text.secondary,
          }}
        >
          <BackArrow
            style={{
              position: "relative",
              top: "0",
              left: "-2px",
              borderRight: `10px solid ${
                themeProp === theme.dark
                  ? myTheme.palette.text.primary
                  : myTheme.palette.text.secondary
              }`,
            }}
          />
        </Circle>
      </BackArrowContainer>
    </Link>
  );
}
