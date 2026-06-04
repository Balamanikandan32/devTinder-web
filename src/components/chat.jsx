import { useSelector } from "react-redux";
import { useParams } from "react-router";
import createSocketConnection from "./socket/socket";
import { useEffect, useState } from "react";

function Chat() {
  const { toUserId } = useParams();

  const fromUserDetails = useSelector((store) => store.user);

  const { _id: fromUserId } = fromUserDetails || {};

  const [message, setMessage] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!fromUserId) return;

    const socket = createSocketConnection();

    // Join the chat room for the two users
    socket.emit("joinChat", { fromUserId, toUserId });

    socket.on("messageReceived", ({ fromUserId1, toUserId, message }) => {
      setMessage((prevMessages) => [...prevMessages, message]);
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
      <div className="overflow-y-auto flex-1">
        {message.map((msg, index) => (
          <div className="chat chat-start" key={index}>
            <div className="chat-header">
              To User
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble my-2">{msg}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
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
