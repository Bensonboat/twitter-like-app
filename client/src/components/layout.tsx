import { Outlet } from "react-router-dom";
import Navigation from "./navigation";

const Layout = () => {
  return (
    <div className="md:w-8/12 mx-auto">
      <Navigation />
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
