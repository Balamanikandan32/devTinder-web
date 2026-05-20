import axios from "axios";
import { BASE_URL } from "./constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../store/requests-slice";

function Requests() {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connectionRequests", {
        withCredentials: true,
      });

      dispatch(setRequests(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const reviewRequest = async (status, requestId) => {
    const reviewURL = BASE_URL + "/request/review/" + status + "/" + requestId;
    try {
      const res = await axios.post(reviewURL, {}, { withCredentials: true });
      const filteredRequests = requests.filter(
        (request) => request._id !== requestId,
      );
      dispatch(setRequests(filteredRequests));
      // if need show toast
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!requests) fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div>
        <h1 className="text-center font-bold text-2xl mt-5">
          No Requests found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-5">Requests</h1>
      <ul className="list bg-base-300 rounded-box shadow-md w-1/2 mx-auto my-10">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, _id } = request.fromUserId;
          return (
            <li key={_id} className="list-row">
              <div>
                <img className="size-10 rounded-box" src={photoUrl} />
              </div>
              <div>
                <div>
                  {firstName} {lastName}
                </div>
              </div>
              <div className="flex gap-5">
                <button
                  className="btn btn-error"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Requests;
