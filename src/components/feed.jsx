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

  return (
    userFeed && (
      <div className="flex justify-center my-10">
        <UserCard userData={userFeed[0]} />
      </div>
    )
  );
}

export default Feed;
