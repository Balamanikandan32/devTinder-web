import { useState } from "react";
import UserCard from "./user-card";
import { BASE_URL } from "./constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/user-slice";

function EditProfile({ user }) {
  const [userDetails, setUserDetails] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl: user.photoUrl || "",
  });

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", userDetails, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setError("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  // This is for sample coding, here we do not handlevalidation and error handling
  return (
    <div className="flex justify-center gap-10 my-10">
      {/* Edit user form */}
      <div>
        <div className="card bg-base-200 w-96 shadow-sm ">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            {error && <h6 className="text-error">{error}</h6>}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                value={userDetails.firstName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, firstName: e.target.value })
                }
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                value={userDetails.lastName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, lastName: e.target.value })
                }
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input"
                value={userDetails.photoUrl}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, photoUrl: e.target.value })
                }
              />
            </fieldset>

            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Preview user card */}
      <UserCard userData={userDetails} />

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
