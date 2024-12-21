"use client";

import React, { useState, useEffect } from "react";
import SimpleBar from "simplebar-react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Contacts from "@/components/partials/app/chat/Contacts";
import MyProfile from "@/components/partials/app/chat/MyProfile";
import Blank from "@/components/partials/app/chat/Blank";
import Chat from "@/components/partials/app/chat/Chat";
import { chatService } from "@/_services/chat.service";

const ChatPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [activeChatMessages, setActiveChatMessages] = useState([]);

  // Fetch contacts when the component loads
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const results = await chatService.searchPartners(""); // Fetch all contacts
        setContacts(results);
        setFilteredContacts(results); // Initially set all contacts to filtered
      } catch (error) {
        console.error("Failed to fetch contacts", error);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on the search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = contacts?.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerCaseQuery) ||
        contact.email.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);
  const [messages, setMessages] = useState([]);

  // Fetch messages for the active chat
  useEffect(() => {
    if (activeChat) {
      const fetchMessages = async () => {
        try {
          const messages = await chatService.getMessages(activeChat._id); // Replace with actual API
          setActiveChatMessages(messages);
        } catch (error) {
          console.error("Failed to fetch messages", error);
        }
      };

      fetchMessages();
    }
  }, [activeChat]);

  // Handle sending a new message
  const handleSendMessage = async (newMessage) => {
    try {
      // Send the message to the backend
      const sentMessage = await chatService.sendMessage(activeChat._id, newMessage);

      // Update the messages in the UI
      setActiveChatMessages((prev) => [...prev, sentMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex lg:space-x-5 chat-height overflow-hidden relative rtl:space-x-reverse">
      {/* Sidebar for contacts */}
      <div className="transition-all duration-150 flex-none min-w-[260px]">
        <Card
          bodyClass="relative p-0 h-full overflow-hidden"
          className="h-full bg-white"
        >
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <MyProfile />
          </div>
          {/* Search bar */}
          <div className="border-b border-slate-100 dark:border-slate-700 py-1">
            <div className="search px-3 mx-6 rounded flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex-none text-base text-slate-900 dark:text-slate-400">
                <Icon icon="bytesize:search" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contacts..."
                className="w-full flex-1 block bg-transparent placeholder:font-normal placeholder:text-slate-400 py-2 focus:ring-0 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-400"
              />
            </div>
          </div>
          {/* Contact list */}
          <SimpleBar className="contact-height">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, i) => (
                <Contacts
                  key={i}
                  contact={contact}
                  onClick={(contact) => {
                    console.log("Clicked on contact", contact);
                    setActiveChat(contact); // Set active chat
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No contacts found</p>
            )}
          </SimpleBar>
        </Card>
      </div>

      {/* Chat and Blank state */}
      <div className="flex-1">
        <Card bodyClass="p-0 h-full" className="h-full bg-white">
          {activeChat ? (
            <Chat
              contact={activeChat}
              messages={activeChatMessages}
              setMessages={setMessages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <Blank />
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
