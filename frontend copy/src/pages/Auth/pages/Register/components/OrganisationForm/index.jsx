import { yupResolver } from "@hookform/resolvers/yup"
import PropTypes from "prop-types"
import { useCallback, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useLocalStorage } from "react-use"

import {
  Button,
  // Spacer,
  TextInput,
  BackLink,
} from "../../../../../../components/common"
import {
  authSelector,
  // fetchOrganisationByRtoCode,
  setError,
  // setIsLoading,
  setOrganisation,
} from "../../../../../../redux/authSlice"
// import {COUNTRIES} from '../../../../../../utils/dummy';
import { useErrorMessage } from "../../../../../../utils/hooks"
import { registerOrganisationSchema } from "../../../../../../utils/validation"
import { AuthSwitchLink, ErrorAlert, Heading } from "../../../../components"

const FIELDS_IN_ORDER = ["state", "district", "restaurantName"]

export const OrganisationForm = ({
  onClickNext,
  onNavigateBackToChooseType,
}) => {
  const dispatch = useDispatch()
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    // register,
    // setValue,
    // watch,
  } = useForm({
    defaultValues: {
      state: "",
      district: "",
      restaurantName: "",
    },
    resolver: yupResolver(registerOrganisationSchema),
  })
  const [, setRestaurantName] = useLocalStorage("restaurantName", "", {
    raw: true,
  })
  const [, setStateName] = useLocalStorage("state", "", {
    raw: true,
  })
  const [, setDistrictName] = useLocalStorage("district", "", {
    raw: true,
  })

  const {
    error: serverError,
    //  isLoading,
    // organisation,
  } = useSelector(authSelector)
  // const rtoCode = watch('rtoCode');

  const onSubmit = useCallback(
    (data) => {
      setRestaurantName(data.restaurantName)
      setStateName(data.state)
      setDistrictName(data.district)
      onClickNext(data.restaurantName)
    },
    [onClickNext, setRestaurantName, setStateName, setDistrictName]
  )
  const goBack = useCallback(() => {
    setRestaurantName("")
    setStateName("")
    setDistrictName("")
    onClickNext("")
    // dispatch(setOrganisation(null));
    reset()
  }, [setRestaurantName, setStateName, setDistrictName, onClickNext, reset])

  const clearServerError = useCallback(() => {
    dispatch(setError(null))
  }, [dispatch])

  const {
    errorMessage,
    // hasServerError,
    // setHasServerError
  } = useErrorMessage(errors, serverError, clearServerError, FIELDS_IN_ORDER)

  // useDebounce(
  //   async () => {
  //     dispatch(fetchOrganisationByRtoCode(rtoCode, setHasServerError));
  //   },
  //   1000,
  //   [dispatch, rtoCode],
  // );

  useEffect(() => {
    dispatch(setOrganisation(null))
  }, [dispatch])

  // useEffect(() => {
  //   if (hasServerError) {
  //     setValue('restaurantName', '');
  //   }
  // }, [hasServerError, setValue]);

  // useEffect(() => {
  //   dispatch(setIsLoading(true));
  //   setValue('restaurantName', '');
  // }, [dispatch, setValue]);

  // useEffect(() => {
  //   if (organisation) {
  //     setValue('restaurantName', organisation?.legal_person_name || '');
  //     setValue('tGovOrgCode', organisation?.code || '');
  //     setValue('tGovOrgId', organisation?.id || '');
  //   }
  // }, [organisation, setValue]);

  return (
    <section className="main-section d-flex flex-column justify-content-center align-items-center position-relative p-4">
      <ErrorAlert isVisible={!!errorMessage} message={errorMessage} />
      <main className="d-flex flex-column main-content w-100">
        {/* <Spacer height="4rem" /> */}
        <div className="d-flex flex-column justify-content-center flex-grow-1 gap-3">
          <BackLink
            className="align-self-start p-0 gap-1"
            onClick={() => {
              onNavigateBackToChooseType();
              goBack();
            }}
          />
          <Heading
            subtitle="Enter your details to create an account."
            title="Create Restaurant"
          />
          <form
            autoComplete="off"
            className="align-items-center d-flex flex-column w-100 gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="state"
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
              name="district"
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
            <Controller
              control={control}
              name="restaurantName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  className="input-fields"
                  hasError={!!errors.restaurantName}
                  label="Hotel / Restaurant Name"
                  placeholder="Enter hotel / restaurant name"
                />
              )}
            />
            <Button isLarge label="Next" type="submit" className="mt-2" />
          </form>
          <AuthSwitchLink
            linkHref="/login"
            linkText="Login"
            onLinkClick={() => {
              dispatch(setOrganisation(null));
              onNavigateBackToChooseType();
              clearServerError();
            }}
            text="Already have an account?"
          />
        </div>
        {/* <Spacer height="4rem" /> */}
      </main>
    </section>
  );
}

OrganisationForm.propTypes = {
  onClickNext: PropTypes.func.isRequired,
  onNavigateBackToChooseType: PropTypes.func.isRequired,
}
