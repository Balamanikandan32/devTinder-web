import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "./constants";

function SignUp() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(BASE_URL + "/signup", signupData, {
        withCredentials: true,
      });

      //we are using sign up + login method
      // when user signup redirect to login page and then user can login with same credentials and server response with token
      // Instead we can alosuse signup endpointto return token and redirect user to feed or profile page directly.

      navigate("/login");
      setSignupError("");
    } catch (err) {
      setSignupError(err.response?.data || "Something went wrong");
    }
  };

  // This is for sample coding, here we do not handlevalidation and  error handling
  return (
    <div className="flex justify-center my-5">
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>
          {signupError && <h6>{signupError}</h6>}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter first Name"
              value={signupData.firstName}
              onChange={(e) =>
                setSignupData({ ...signupData, firstName: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter last Name"
              value={signupData.lastName}
              onChange={(e) =>
                setSignupData({ ...signupData, lastName: e.target.value })
              }
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
          </fieldset>
          <div className="card-actions justify-center my-3">
            <button className="btn btn-primary" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
          <p className="text-center">
            Already user ?{" "}
            <span
              className="text-bold underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login in Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
