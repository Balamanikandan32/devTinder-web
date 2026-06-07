import { useSelector } from "react-redux";
import { useParams } from "react-router";
import createSocketConnection from "./socket/socket";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./constants";

function Chat() {
  const { toUserId } = useParams();

  const fromUserDetails = useSelector((store) => store.user);

  const { _id: fromUserId } = fromUserDetails || {};

  const [message, setMessage] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const chatContainerRef = useRef(null);

  const fetchMessage = async () => {
    try {
      const reqBody = { participantsId: [toUserId] };
      const res = await axios.post(BASE_URL + "/chat/getMessages", reqBody, {
        withCredentials: true,
      });

      setMessage(res?.data?.message || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [message]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessage();
  }, []);

  useEffect(() => {
    if (!fromUserId) return;

    const socket = createSocketConnection();

    // Join the chat room for the two users
    socket.emit("joinChat", { fromUserId, toUserId });

    socket.on("messageReceived", ({ populatedData }) => {
      setMessage(populatedData.message);
    });

    return () => socket.disconnect();
  }, [fromUserId, toUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      fromUserId,
      toUserId,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="border rounded-xl m-5 p-5 w-1/2 mx-auto h-[calc(100vh-150px)] min-h-0 flex flex-col gap-5 flex-1">
      <div>Chat</div>
      <div ref={chatContainerRef} className="overflow-y-auto flex-1">
        {message?.map((msg, index) => {
          const { senderId, text, updatedAt } = msg;
          const chatPlacement =
            fromUserId === msg.senderId._id ? "chat-end" : "chat-start";

          const time =
            new Date(updatedAt).getHours() +
            ":" +
            new Date(updatedAt).getMinutes();

          return (
            <div className={"chat " + chatPlacement} key={index}>
              <div className="chat-header">
                {senderId.firstName}
                <time className="text-xs opacity-50">{time}</time>
              </div>
              <div className="chat-bubble my-2 break-all max-w-[80%]">
                {text}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 justify-end">
        <input
          type="text"
          className="input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
