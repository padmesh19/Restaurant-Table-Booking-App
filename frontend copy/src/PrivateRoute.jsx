import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { authSelector } from "./redux/authSlice";
import TableSpinnerIcon from "./assets/icons/refactor/table-spinner.svg"


export const PrivateRoute = ({ element, allowHotel = false, allowCustomer = false }) => {
  const location = useLocation();
  const {user, isLoading} = useSelector(authSelector)


  if (isLoading) {
    return  <img alt="Loading" className="spinner-icon" src={TableSpinnerIcon} />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userType = parseInt(user?.user_type); 

  if (allowHotel && userType !== 1) {
    return <Navigate to="/customer" replace />;
  }

  if (allowCustomer && userType !== 2) {
    return <Navigate to="/admin" replace />;
  }

  return element;
};



export const LoginRoute = ({ element }) => {
 const { user } = useSelector(authSelector);

  if (user) {
    const userType = user?.user_type;
    if (userType === 1) return <Navigate to="/admin" replace />;
    if (userType === 2) return <Navigate to="/customer" replace />;
    return <Navigate to="/" replace />;
  }

  return element;
};

