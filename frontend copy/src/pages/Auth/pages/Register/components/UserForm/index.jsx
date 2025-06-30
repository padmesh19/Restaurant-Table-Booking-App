/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import {useLocalStorage} from 'react-use';

import {
  BackLink,
  Button,
  Select,
  Spacer,
  TextInput,
} from "../../../../../../components/common";
import {
  authSelector,
  register as registerTeacher,
  setError,
} from "../../../../../../redux/authSlice";
import { State, City } from "country-state-city";

import { useErrorMessage } from "../../../../../../utils/hooks";
import { registerTeacherSchema } from "../../../../../../utils/validation";
import { ErrorAlert, Heading, AuthSwitchLink } from "../../../../components";
import { UserFormContainer } from "./elements";
import FileInput from "../../../../../FileUploader/FileUploader";

const FIELDS_IN_ORDER = [
  "name",
  "email",
  "password",
  "confirmPassword",
  "stateName",
  "districtName",
];

export const UserForm = ({ onNavigateBack, accountType }) => {
  const dispatch = useDispatch();
  const [imgData, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      stateName: "",
      districtName: "",
    },
    resolver: yupResolver(registerTeacherSchema),
  });
  const history = useNavigate();
  const { error: serverError, isLoading } = useSelector(authSelector);

  const onSubmit = useCallback(
    (data) => {
      const details = {
        ...data,
        userType: accountType,
        imgLoca: imgUrl,
      };
      dispatch(
        registerTeacher(details, () => {
          history(`/register-success?email=${data.email}`);
          // history(`/login`)
        })
      );
    },
    [accountType, dispatch, history, imgUrl]
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
    <UserFormContainer className="main-section d-flex flex-column justify-content-center align-items-center position-relative p-4">
      <ErrorAlert isVisible={!!errorMessage} message={errorMessage} />
      {/* <Spacer height="20rem" /> */}
      <main className="d-flex flex-column main-content w-100">
        <div className="d-flex flex-column justify-content-center flex-grow-1 gap-3">
          <BackLink
            className="align-self-start p-0 gap-1"
            onClick={() => {
              onNavigateBack();
            }}
          />
          <Heading
            subtitle="Enter your details to create an account."
            title="Create User"
          />
          <form
            autoComplete="off"
            className="align-items-center d-flex flex-column w-100 gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  {...field}
                  autoFocus
                  className="input-fields"
                  hasError={hasServerError || !!errors.name}
                  label="Full Name"
                  placeholder="Enter your full name"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextInput
                  {...field}
                  className="input-fields"
                  hasError={hasServerError || !!errors.email}
                  autoComplete="off"
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
                  className="input-fields"
                  autoComplete="off"
                  hasError={hasServerError || !!errors.password}
                  label="Password"
                  placeholder="Enter a password"
                  type="password"
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <TextInput
                  {...field}
                  className="input-fields"
                  hasError={hasServerError || !!errors.confirmPassword}
                  label="Confirm Password"
                  placeholder="Confirm the password"
                  type="password"
                />
              )}
            />
            <Controller
              control={control}
              name="stateName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  className="input-fields"
                  hasError={!!errors.state}
                  label="State"
                  placeholder="Enter your state name"
                />
              )}
            />
            <Controller
              control={control}
              name="districtName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  className="input-fields"
                  hasError={!!errors.district}
                  label="District"
                  placeholder="Enter your district name"
                />
              )}
            />

            <FileInput
              accept="image/*"
              setImgUrl={setImgUrl}
              type="image"
              setImg={setImg}
              upload={imgData}
            />

            <Button isLoading={isLoading} label="Register" type="submit" />
          </form>
          <AuthSwitchLink
            linkHref="/login"
            linkText="Login"
            onLinkClick={() => {
              clearServerError();
              onNavigateBack();
            }}
            text="Already have an account?"
          />
        </div>
      </main>
      {/* <Spacer height="2rem" /> */}
    </UserFormContainer>
  );
};

UserForm.propTypes = {
  onNavigateBack: PropTypes.func.isRequired,
};
