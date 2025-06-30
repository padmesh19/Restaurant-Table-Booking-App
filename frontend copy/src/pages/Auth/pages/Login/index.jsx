import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Button, Link, TextInput } from "../../../../components/common";
import { authSelector, logIn, setError } from "../../../../redux/authSlice";
import { useErrorMessage } from "../../../../utils/hooks";
import { loginSchema } from "../../../../utils/validation";
import {
  AuthSwitchLink,
  ErrorAlert,
  Heading,
  // HeroSection,
} from "../../components";
import "../../elements/index.css";
import StateDistrictSelector from "../../../../components/common/StateDistrictSelect";

const FIELDS_IN_ORDER = ["email", "password"];

export const Login = () => {
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },

    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const history = useNavigate();
  const { error: serverError, isLoading } = useSelector(authSelector);

  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      dispatch(
        logIn(data, (userProfile) => {
          const isAdmin = userProfile?.user_type === 1;
          history(isAdmin ? "/hotel" : "/admin");
        })
      );
    },
    [dispatch, history]
  );

  const clearServerError = useCallback(() => {
    dispatch(setError(null));
  }, [dispatch]);

  const { errorMessage, hasServerError } = useErrorMessage(
    errors,
    serverError,
    clearServerError,
    FIELDS_IN_ORDER
  );

  return (
    <div className="auth-container">
      <Helmet>
        <title>Login | Restaurant Table Booking</title>
      </Helmet>
      {/* <HeroSection /> */}
      <div className="auth-bg"></div>
      <section className="main-section d-flex flex-column justify-content-center align-items-center position-relative p-4">
        <ErrorAlert isVisible={!!errorMessage} message={errorMessage} />
        <main className="d-flex flex-column main-content w-100">
          {/* <Spacer height="4rem" /> */}
          <div className="d-flex gap-3 flex-column justify-content-center flex-grow-1">
            <Heading
              subtitle="Enter your credentials to access your account."
              title="Welcome Back"
            />
            <form
              className="align-items-center d-flex flex-column w-100"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    autoFocus
                    className="input-field mb-2"
                    hasError={hasServerError || !!errors.email}
                    label="Email"
                    placeholder="Enter your email address"
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    className="input-field mb-2 mt-3"
                    hasError={hasServerError || !!errors.password}
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                  />
                )}
              />
              <div className="align-items-center d-flex justify-content-between mb-4 mt-2 w-100">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <Button
                isLarge
                isLoading={isLoading}
                label="Log In"
                type="submit"
              />
            </form>
            <AuthSwitchLink
              linkHref="/register"
              linkText="Register"
              onLinkClick={clearServerError}
              text="Don't have an account?"
            />
          </div>
          {/* <Spacer height="1rem" /> */}
        </main>
      </section>
    </div>
  );
};
