import PropTypes from "prop-types"

import { useState } from "react"
// import { Spacer } from "../../../../../../components/common"

import { AuthSwitchLink, Heading } from "../../../../components"
import { AccountTypeButton } from "./components"
import TeacherAccountIcon from "../../../../../../assets/icons/teacher-account.svg"
import OrganisationAccountIcon from "../../../../../../assets/icons/school-account.svg"
import SignupArrowIcon from "../../../../../../assets/icons/signup-arrow.svg"
import SignupArrowHoverIcon from "../../../../../../assets/icons/signup-arrow-hover.svg"

export const ChooseAccountType = ({ onClickAccountType }) => {
  const [iconSchool, setIconSchool] = useState(false)
  const [iconTeacher, setIconTeacher] = useState(false)
  return (
    <section className="main-section d-flex flex-column justify-content-center align-items-center position-relative p-4">
      <main className="d-flex flex-column main-content w-100">
        {/* <Spacer height="4rem" /> */}
        <div className="d-flex flex-column justify-content-center flex-grow-1 gap-4">
          <Heading
            subtitle="Choose Create account type"
            title="Create Your Account"
          />
          <div className="d-flex flex-column justify-content-between w-100 gap-3 pt-2">
            <AccountTypeButton
              buttonLabel="Hotel / Restaurant"
              onClick={() => onClickAccountType("Hotel")}
              Icon={OrganisationAccountIcon}
              arrowIcon={!iconSchool ? SignupArrowIcon : SignupArrowHoverIcon}
              onMouseEnter={() => setIconSchool(true)}
              onMouseLeave={() => setIconSchool(false)}
              iconHover={iconSchool}
            />
            <AccountTypeButton
              buttonLabel="User"
              onClick={() => onClickAccountType("User")}
              Icon={TeacherAccountIcon}
              arrowIcon={!iconTeacher ? SignupArrowIcon : SignupArrowHoverIcon}
              onMouseEnter={() => setIconTeacher(true)}
              onMouseLeave={() => setIconTeacher(false)}
              iconHover={iconTeacher}
            />
          </div>

          <AuthSwitchLink
            linkHref="/login"
            linkText="Login"
            text="Already have an account?"
          />
        </div>
        {/* <Spacer height="4rem" /> */}
      </main>
    </section>
  );
}
ChooseAccountType.propTypes = {
  onClickAccountType: PropTypes.func.isRequired,
}
