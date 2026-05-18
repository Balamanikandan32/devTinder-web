import { Outlet } from "react-router";
import Footer from "./footer";
import Header from "./header";

function Body() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
