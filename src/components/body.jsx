import { Outlet, useNavigate } from "react-router";
import Footer from "./footer";
import Header from "./header";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/user-slice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        console.log(err.response?.data || "Unauthorized access");
        navigate("/login");
      } else {
        console.log(err.response);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
