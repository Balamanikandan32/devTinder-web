import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/user-slice";
import { BASE_URL } from "./constants";
import { useNavigate } from "react-router";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "rohit@gmail.com",
    password: "Rohit@123",
  });

  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(BASE_URL + "/login", credentials, {
        withCredentials: true,
      });
      dispatch(addUser(response.data.userDetails));
      setLoginError("");
      navigate("/");
    } catch (err) {
      dispatch(removeUser());
      setLoginError(err.response?.data || "Something went wrong");
    }
  };

  // This is for sample coding, here we do not handlevalidation and  error handling
  return (
    <div className="flex justify-center my-5">
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          {loginError && <h6>{loginError}</h6>}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
