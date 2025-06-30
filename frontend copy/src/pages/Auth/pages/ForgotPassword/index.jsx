import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  BackLink,
  Button,
  // Spacer,
  TextInput,
} from "../../../../components/common";
import {
  authSelector,
  resetPassword,
  setError,
} from "../../../../redux/authSlice";
import { useErrorMessage } from "../../../../utils/hooks";
import { forgotPasswordSchema } from "../../../../utils/validation";
import { ErrorAlert, Heading } from "../../components";
import "../../elements/index.css";

const FIELDS_IN_ORDER = ["email"];

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();
  const { error: serverError, isLoading } = useSelector(authSelector);

  const onSubmit = useCallback(
    (data) => {
      dispatch(
        resetPassword(data, () => {
          navigate(`/reset-password-confirmation?email=${data.email}`);
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
        <title>Forgot Password | Hotel</title>
      </Helmet>
      {/* <HeroSection /> */}
      <div className="auth-bg" />
      <section className="main-section d-flex flex-column justify-content-center align-items-center position-relative p-4">
        <ErrorAlert isVisible={!!errorMessage} message={errorMessage} />
        <main className="d-flex flex-column main-content w-100">
          {/* <Spacer height="4rem" /> */}
          <div className="d-flex flex-column justify-content-center flex-grow-1 gap-3">
            <BackLink
              className="align-self-start p-0 gap-1"
              onClick={() => {
                navigate(-1);
              }}
            />
            <Heading
              subtitle="Enter your registered email below."
              title="Forgot Your Password?"
            />
            <form
              className="align-items-center d-flex flex-column w-100 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    autoFocus
                    className="input-fields mb-4"
                    hasError={hasServerError || !!errors.email}
                    label="Email"
                    placeholder="Enter email"
                  />
                )}
              />
              <Button
                isLarge
                isLoading={isLoading}
                label="Reset Password"
                type="submit"
              />
            </form>
          </div>
          {/* <Spacer height="4rem" /> */}
        </main>
      </section>
    </div>
  );
};
