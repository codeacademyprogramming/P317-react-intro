import { oneOf, shape, string } from "prop-types";
import { createElement } from "react";

export const Flex = ({
  display,
  alignItems,
  justifyContent,
  tag,
  style,
  children,
  ...rest
}) => {
  return createElement(
    tag,
    {
      style: {
        display,
        alignItems,
        justifyContent,
        ...style,
      },
      ...rest,
    },
    children
  );
};

Flex.propTypes = {
  display: oneOf(["flex", "inline-flex"]),
  alignItems: string,
  justifyContent: string,
  tag: string,
  style: shape({}),
};

Flex.defaultProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  tag: "div",
  style: {},
};
