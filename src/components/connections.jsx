import { useEffect } from "react";
import { BASE_URL } from "./constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../store/connections-slice";

function Connections() {
  const userConnections = useSelector((store) => store.connections);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(setConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!userConnections) fetchConnections();
  }, []);

  if (!userConnections) return null;

  if (userConnections.length === 0) {
    return (
      <div>
        <h1 className="text-center font-bold text-2xl mt-5">
          No connections found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-5">Connections</h1>
      <ul className="list bg-base-300 rounded-box shadow-md w-1/2 mx-auto my-10">
        {userConnections.map((connection) => {
          const { firstName, lastName, photoUrl, _id } = connection;
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Connections;
