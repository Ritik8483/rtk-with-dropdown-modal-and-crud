import React, { useEffect, useState } from "react";
// import styled, { css } from 'styled-components'
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useLoginStudentApiMutation, useRegisterStudentApiMutation } from "../redux/AuthStudentApi";
import { toast } from "react-toastify";
import { setUser } from "../redux/AuthApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../hooks/hooks";

const AuthDiv = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const AuthCard = styled.div`
  height: auto;
  width: 50%;
  padding: 10px;
  border-radius: 10px;
`;
const AuthMainHeading = styled.h2`
  text-align: center;
`;
const AuthSmallHeading = styled.h5`
  text-align: center;
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AuthBelowHeading = styled.h6`
  text-align: center;
  margin-top: 40px;
`;
const ToggleBtn = styled.a`
  text-align: center;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
`;
const initialValues = {
  firstName: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [switchBtn, setSwitchBtn] = useState<boolean>(false);
  const [formValues, setFormvalues] = useState(initialValues);
  const { firstName, lastname, email, password, confirmPassword } = formValues;
  const inputEvent = (e: any) => {
    setFormvalues({ ...formValues, [e.target.name]: e.target.value });
  };

  const [
    loginStudentApi,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginStudentApiMutation();

  const [registerStudentApi,{data:registerData,isSuccess:isRegisterSuccess,isError:isRegisterError,error:registerError}]=useRegisterStudentApiMutation();
  console.log('registerData',registerData)

  const handleLogin = async () => {
    if (email && password) {
      await loginStudentApi({ email, password });
      navigate('/home');
    } else {
      toast.error("Please fill all the inputs");
    }
  };

  const handleRegister = async() => {
    if(password !== confirmPassword){
        toast.error('Passwords do not match')
    }
    if(firstName && lastname && email && password && confirmPassword){
        await registerStudentApi({email,password,firstName,lastname,confirmPassword})
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User logged in successfully!");
      dispatch(
        setUser({ token: loginData.token, name: loginData.result.name })
      );
      navigate("/home");
    }
    if (isRegisterSuccess) {
        toast.success("User registered successfully!");
        dispatch(
          setUser({ token: registerData.token, name: registerData.result.name })
        );
        navigate("/home");
      }
  }, [isLoginSuccess,isRegisterSuccess]);

  useEffect(() => {
    if (isLoginError) {
      toast.error((loginError as any).data.message);
    }
    if (isRegisterError) {
        toast.error((registerError as any).data.message);
      }
  }, [isLoginError,isRegisterError]);

  console.log("value : ", email, password);

  

  return (
    <div>
      <AuthDiv>
        <AuthCard>
          <AuthMainHeading>{switchBtn ? "Register" : "Login"}</AuthMainHeading>
          <AuthSmallHeading>
            {switchBtn
              ? "Please enter the user details"
              : "Please enter your Email and Password"}
          </AuthSmallHeading>
          {switchBtn && (
            <>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  value={firstName}
                  onChange={inputEvent}
                  type="text"
                  placeholder="Enter your first name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastname"
                  value={lastname}
                  onChange={inputEvent}
                  type="text"
                  placeholder="Enter your last name"
                />
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              value={email}
              onChange={inputEvent}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={inputEvent}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          {switchBtn && (
            <>
              <Form.Group className="mb-3" controlId="formBasicConfirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={inputEvent}
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
            </>
          )}
          <BtnDiv>
            {switchBtn ? (
              <Button
                className="w-25"
                variant="primary"
                onClick={handleRegister}
              >
                Register
              </Button>
            ) : (
              <Button className="w-25" variant="primary" onClick={handleLogin}>
                Login
              </Button>
            )}
          </BtnDiv>
          <AuthBelowHeading>
            {switchBtn ? "Already have an account?" : "Dont have an account?"}
          </AuthBelowHeading>
          <BtnDiv>
            <ToggleBtn onClick={() => setSwitchBtn(!switchBtn)}>
              {switchBtn ? "Sign in" : "Sign up"}
            </ToggleBtn>
          </BtnDiv>
        </AuthCard>
      </AuthDiv>
    </div>
  );
};

export default AuthPage;
