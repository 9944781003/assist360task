import { Button, ButtonProps } from "react-bootstrap";

import React from "react";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";

export default function AppLoginButton(props:React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  
  return (
    <input
    type="submit"
    value={"Login now"}
     onClick={props.onClick}
      style={{
        paddingBlock: 12,
        backgroundImage:
          "linear-gradient(99.78deg, #9181F4 -5.85%, #5038ED 109.55%)",
      }}
      className="btn rounded-4  px-4 text-white"
    />
  );
}
