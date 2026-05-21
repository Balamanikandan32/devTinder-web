import axios from "axios";
import { deleteOneFeed } from "../store/feed-slice";
import { BASE_URL } from "./constants";
import { useDispatch } from "react-redux";

function UserCard({ userData, disbaleActionButtons }) {
  const { _id, firstName, lastName, photoUrl } = userData;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    const sendRequestURL = BASE_URL + "/request/send/" + status + "/" + userId;
    try {
      const res = await axios.post(
        sendRequestURL,
        {},
        { withCredentials: true },
      );

      dispatch(deleteOneFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="card bg-base-300 w-80 h-96 shadow-sm">
      <figure className="h-60 overflow-hidden">
        <img
          src={photoUrl}
          alt="Photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{`${firstName} ${lastName}`}</h2>

        <div className="card-actions justify-between flex-1 ">
          <button
            className="btn btn-error"
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={disbaleActionButtons}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
            disabled={disbaleActionButtons}
          >
            Interest
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
