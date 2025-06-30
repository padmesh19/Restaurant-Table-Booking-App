import { configureStore } from "@reduxjs/toolkit";

import forgotPasswordReducer from "../pages/ForgotPasswordOld/forgotPasswordSlice";

import resetPasswordReducer from "../pages/PasswordReset/passwordResetSlice";

import authReducer from "./authSlice";
import userReducer from "./UserSlice";
import hotelReducer from "./HotelSlice";
import commentsReducer from "./commentsSlice";

export default configureStore({
  reducer: {
    forgotPassword: forgotPasswordReducer,

    resetPassword: resetPasswordReducer,

    auth: authReducer,
    user: userReducer,
    hotel: hotelReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
