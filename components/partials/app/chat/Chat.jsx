import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { useSelector } from "react-redux";

const chatAction = [
  {
    label: "Remove",
    link: "#",
  },
  {
    label: "Forward",
    link: "#",
  },
];

// Helper function to format timestamps
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return `${hours12}:${minutesStr} ${ampm}`;
};

// Helper function to generate initials
const getInitials = (name) => {
  if (!name) return "N/A"; // Default if name is not available
  const words = name.split(" ");
  const initials = words.map((word) => word[0]).join("").toUpperCase();
  return initials;
};
const Chat = ({ contact, messages, setMessages, onSendMessage }) => {
  const [message, setMessage] = useState(""); // Local state for the new message
  const chatHeightRef = useRef(null);
  const { id: currentUserId } = useSelector((state) => state.userAuth); // Get the current user's ID

  // Scroll to the bottom of the chat whenever messages update
  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTop = chatHeightRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log(message)
      const newMessage = {

        content: message.trim(),
        sender: currentUserId,
        timestamp: new Date().toISOString(), // Ensure the timestamp is properly formatted
      };
console.log(newMessage)
      // Optimistic UI Update
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setMessage(""); // Clear input field after sending

      try {
        // Send the message to the backend
        const savedMessage = await onSendMessage(newMessage);

        // Replace the optimistic update with the actual saved message from the backend
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg === newMessage ? savedMessage : msg
          )
        );
      } catch (error) {
        console.error("Failed to send message:", error);

        // Rollback on failure
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg !== newMessage)
        );
      }
    }
  };

  return (
    <div className="h-full">
      {/* Chat Header */}
      <header className="border-b border-slate-100 dark:border-slate-700">
        <div className="flex py-6 md:px-6 px-3 items-center">
          <div className="flex-1">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="h-10 w-10 rounded-full relative">
                  <span
                    className={`status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0 ${
                      contact.onligne ? "bg-success-500" : "bg-secondary-500"
                    }`}
                  ></span>
                  {contact.basicInfo?.avatar ? (
                    <img
                      src={contact.basicInfo.avatar}
                      alt={contact.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-medium text-sm rounded-full">
                      {getInitials(contact.name)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 text-start">
                <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px] truncate">
                  {contact.name}
                </span>
                <span className="block text-slate-500 dark:text-slate-300 text-xs font-normal">
                  {contact.onligne ? "Active now" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="chat-content parent-height">
        <div
          className="msgs overflow-y-auto msg-height pt-6 space-y-6"
          ref={chatHeightRef}
        >
          {messages?.map((msg, i) => (
            <div className="block md:px-6 px-4" key={i}>
              {msg.sender !== currentUserId ? (
                <div className="flex space-x-2 items-start group rtl:space-x-reverse">
                  <div className="flex-none">
                    <div className="h-8 w-8 rounded-full">
                      {contact.basicInfo?.avatar ? (
                        <img
                          src={contact.basicInfo.avatar}
                          alt={contact.name}
                          className="block w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-medium text-sm rounded-full">
                          {getInitials(contact.name)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex space-x-4 rtl:space-x-reverse">
                    <div>
                      <div className="text-contrent p-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-600 text-sm font-normal mb-1 rounded-md flex-1 whitespace-pre-wrap break-all">
                        {msg.content}
                      </div>
                      <span className="font-normal text-xs text-slate-400 dark:text-slate-400">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (


                <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse">
                  <div className="flex space-x-4 rtl:space-x-reverse">
                    <div className="whitespace-pre-wrap break-all">
                      <div className="text-contrent p-3 bg-slate-300 dark:bg-slate-900 dark:text-slate-300 text-slate-800 text-sm font-normal rounded-md flex-1 mb-1">
                        {msg.content}
                      </div>
                      <span className="font-normal text-xs text-slate-400">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <footer className="md:px-6 px-4 sm:flex md:space-x-4 sm:space-x-2 rtl:space-x-reverse border-t md:pt-6 pt-4 border-slate-100 dark:border-slate-700">
        <form
          className="flex-1 relative flex space-x-3 rtl:space-x-reverse"
          onSubmit={handleSendMessage}
        >
          <textarea
            value={message}
            placeholder="Type your message..."
            className="focus:ring-0 focus:outline-0 block w-full bg-transparent dark:text-white resize-none"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex-none md:pr-0 pr-3">
            <button className="h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full">
              <Icon
                icon="heroicons-outline:paper-airplane"
                className="transform rotate-[60deg]"
              />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
