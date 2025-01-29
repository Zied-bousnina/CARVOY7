import Image from "next/image";
import React from "react";

const Contacts = ({ contact, onClick }) => {
  const {
    name = "Unknown Contact",
    email,
    phoneNumber,
    onligne,
    chat,
    basicInfo,
    addressPartner,
    kbis,
  } = contact;

  const lastMessage = chat?.lastMessage || "Pas encore de message...";
  const unreadMessages = chat?.unreadCount || 0;

  // Helper to generate initials from the name
  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0)).join("");
    return initials.toUpperCase();
  };

  // Check for avatar or create initials
  const avatarContent = basicInfo?.avatar ? (
    // <img
    //   src={basicInfo.avatar}
    //   alt={name}
    //   className="block w-full h-full object-cover rounded-full"
    // />
    <Image
    src={basicInfo.avatar || '/assets/images/users/user-1.jpg'} // Fallback image
    alt="Profile"
    width={32} // Set width
    height={32} // Set height
    className="block w-full h-full object-cover rounded-full"
    onError={(e) => {
      e.target.src = '/assets/images/users/user-1.jpg'; // Fallback image on error
    }}
    unoptimized
  />
  ) : (
    <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-medium text-sm rounded-full">
      {getInitials(name)}
    </div>
  );

  return (
    <div
      className="block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
      onClick={() => onClick(contact)} // Pass the contact to the callback
    >
      <div className="flex space-x-3 px-6 rtl:space-x-reverse">
        {/* Avatar and Online Status */}
        <div className="flex-none">
          <div className="h-10 w-10 rounded-full relative">
            <span
              className={`status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0 ${
                onligne ? "bg-success-500" : "bg-secondary-500"
              }`}
            ></span>
            {avatarContent}
          </div>
        </div>
        {/* Partner Details */}
        <div className="flex-1 text-start flex">
          <div className="flex-1">
            <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]">
              {name}
            </span>
            <span className="block text-slate-600 dark:text-slate-300 text-xs font-normal">
              {lastMessage}
            </span>
          </div>
          {/* Chat Details */}
          <div className="flex-none ltr:text-right rtl:text-end">
            <span className="block text-xs text-slate-400 dark:text-slate-400 font-normal">
              {chat?.lastMessageTimestamp
                ? new Date(chat.lastMessageTimestamp).toLocaleTimeString()
                : ""}
            </span>
            {unreadMessages > 0 && (
              <span className="inline-flex flex-col items-center justify-center text-[10px] font-medium w-4 h-4 bg-[#FFC155] text-white rounded-full">
                {unreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
