import axios from "axios";
import { BASE_URL } from "./constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feed-slice";
import UserCard from "./user-card";

function Feed() {
  const dispatch = useDispatch();

  const userFeed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userFeed) getFeed();
  }, []);

  if (!userFeed) return null;

  // write logic to first render 10 or 20 user when last user card is clicked then render next 10 or 20 user and so on, if empty show no user found.
  // if initial it show empty feed then show no user found
  if (userFeed.length == 0)
    return (
      <div>
        <h1 className="text-center font-bold text-2xl mt-5">
          No New User found
        </h1>
      </div>
    );

  return (
    userFeed && (
      <div className="flex justify-center my-10">
        <UserCard userData={userFeed[0]} />
      </div>
    )
  );
}

export default Feed;
