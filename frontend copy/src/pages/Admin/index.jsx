import { Outlet } from "react-router";
import Navbar from "../../components/shared/Navbar";
import { useLocation } from "react-router";

const Admin = () => {
   const location = useLocation();

  const hideNavbarPaths = [
    "/customer/:hotelId/view",
    "/customer/:hotelId/view-comments",
    "/customer/:hotelId/menu-offer",
    "/customer/:hotelId/book-table",
  ];

  const shouldHideNavbar = hideNavbarPaths.some((pattern) => {
    const regex = new RegExp(
      pattern.replace(":hotelId", "[^/]+") + "$"
    );
    return regex.test(location.pathname);
  });
  return (
    <>
      {!shouldHideNavbar &&<Navbar />}
      <Outlet />
    </>
  );
};

export default Admin;
