import { useSelector } from "react-redux";
import EditProfile from "./edit-profile";

function Profile() {
  const user = useSelector((store) => store.user);

  return user && <EditProfile user={user} />;
}

export default Profile;
