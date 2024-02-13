import React, { useEffect, useLayoutEffect } from "react";
import Rectangle5 from "./_components/Rectangle5";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import bg from "@/public/assets/images/bg.png";
import styled from "styled-components";
import GoogleLoginButton from "./_components/GoogleLoginButton";
import FacebookLoginButton from "./_components/FacebookLoginButton";
import { BiUser, BiLock } from "react-icons/bi";
import { useForm, useController } from "react-hook-form";
import AppLoginButton from "./_components/AppLoginButton";
import Head from "next/head";
import axios from "axios";
import { User } from "@prisma/client";
import { store } from "@/app/lib/store";
import { useRouter } from "next/router";

const BgCol = styled(Col)`
  background-image: url(${bg.src});
  background-size: cover;
`;

 function Login() {
  const router=useRouter()

  useLayoutEffect(()=>{
   const authenticatedUser = localStorage.getItem("authenticatedUser")
   if(authenticatedUser){
    router.replace("/dashboard")
   }
  },[router])

  
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "Haley_Walter@hotmail.com",
      password: "India@2024",
    },
  });
  const emailController = useController({
    name: "email",
    control,
  });
  const passwordController = useController({
    name: "password",
    control,
  });



  const onSubmit = async (data: any) => {
    try {
      store.dispatch({
        type:"app/setIsFetching",
        payload:true
      })
      const result = await axios.post<User>("api/auth/login", data)
      .finally(()=>{
        store.dispatch({
          type:"app/setIsFetching",
          payload:false
        })
      })
      if (typeof result.data === "object" && result.data !== null) {
        localStorage.setItem("authenticatedUser", JSON.stringify(result.data));
        store.dispatch({ type: "app/setAuthenticatedUser", payload: result.data })
        router.replace("/dashboard")
        
      }
     
    } catch (error:any) {
      store.dispatch({
        type:"app/setIsFetching",
        payload:false
      })
      alert(error.message)
    }
  };



  return (
    <React.Fragment>
 
      <Head>
        <title>Test App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className="m-0 p-0">
        <Row>
          <Col lg={6}>
            <Row className="d-flex vh-100 justify-content-center align-items-center">
              <Col xs={8}>
                <div className="fw-bold fs-1 text-center mt-4">LOGIN</div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="text-center mt-4 fs-6">
                    How to i get started lorem ipsum dolor at?
                  </div>

                  <div className="input-group mt-4  ">
                    <span
                      className="input-group-text border-0 rounded-start-4"
                      id="basic-addon1"
                    >
                      <BiUser />
                    </span>
                    <input
                      onChange={emailController.field.onChange}
                      value={emailController.field.value}
                      type="text"
                      className="form-control bg-light py-2 border-0  rounded-end-4 "
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="input-group mt-4">
                    <span
                      className="input-group-text border-0 rounded-start-4 "
                      id="basic-addon1"
                    >
                      <BiLock />
                    </span>
                    <input
                      onChange={passwordController.field.onChange}
                      value={passwordController.field.value}
                      type="text"
                      className="form-control  bg-light py-2 border-0 rounded-end-4 "
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <AppLoginButton />
                  </div>
                </Form>
                <div className="text-center mt-4">
                  <span className="fw-bold">Login</span> with Others
                </div>
                <GoogleLoginButton className="mt-4" />
                <FacebookLoginButton className="mt-4" />
              </Col>
            </Row>
          </Col>
          <BgCol
            lg={6}
            className="vh-100 d-flex align-items-center justify-content-center"
          >
            <Rectangle5></Rectangle5>
          </BgCol>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Login
