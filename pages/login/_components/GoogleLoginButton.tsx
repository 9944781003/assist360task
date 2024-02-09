// import { View, Text, Image, styled } from 'dripsy'
// import React from 'react'
// import { TouchableOpacity } from 'react-native'

import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import GoogleIcon from "@/public/assets/icons/google.png";

const StyledGoogleLoginButton = styled("div")({
  border: "1px solid #F0EDFF",
  paddingVertical: 2,
  borderRadius: 12,
  // width: 124,
});

const GoogleLoginButton = (props:React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (

    <StyledGoogleLoginButton  className={`${props.className} btn d-flex justify-content-center align-items-center `}>
      <Image src={GoogleIcon.src} alt="" />
      <div className="ms-2  text-dark">
        login with <span className="fw-bold">google</span>
      </div>
    </StyledGoogleLoginButton>
  );
};

export default GoogleLoginButton;
