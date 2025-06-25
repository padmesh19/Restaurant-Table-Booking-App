// import React from "react";
// import { useMatch, Route, Routes as Switch } from "react-router";

// import Navbar from "../../components/shared/Navbar";
// import {
//   HotelMenuList,
//   OffersList,
//   ViewHotelTables,
//   BookingCalender,
//   BookedTables,
//   HotelUserComments,
// } from "./pages";

// const Hotel = () => {
//   const match = useMatch();
//   return (
//     <>
//       <Switch>
//         <Route component={Navbar} />
//       </Switch>
//       <Switch>
//         <Route component={HotelMenuList} exact path={`${match.path}/`} />
//         <Route component={OffersList} exact path={`${match.path}/offers`} />
//         <Route
//           component={ViewHotelTables}
//           exact
//           path={`${match.path}/tables`}
//         />
//         <Route
//           component={BookingCalender}
//           exact
//           path={`${match.path}/reservations/calender`}
//         />
//         <Route
//           component={BookedTables}
//           exact
//           path={`${match.path}/reservations`}
//         />
//         <Route
//           component={HotelUserComments}
//           exact
//           path={`${match.path}/comments`}
//         />
//       </Switch>
//     </>
//   );
// };

// export default Hotel;

import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/shared/Navbar";

const Hotel = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Hotel;
