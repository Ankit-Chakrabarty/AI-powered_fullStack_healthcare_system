import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState(null);
  const [isServiceSelection, setIsServiceSelection] = useState(false);
  const [isDoctorSelection, setIsDoctorSelection] = useState(false);
  const [isThankYou, setIsThankYou] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setMessages([{ sender: "bot", text: "What is your name?" }]);
  }, []);

  const handleServiceSelection = (service) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: `You selected ${service}.` }
    ]);

    if (service === "Paid Services") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: `${userName}, which type of doctor do you need?` }
      ]);
      setIsDoctorSelection(true);
    } else if (service === "Free Services") {
      navigate("/about");
    }
  };

  const handleDoctorSelection = (doctor) => {
    navigate(`/doctors/${doctor.replace(/\s+/g, "-").toLowerCase()}`);
  };

  const handleUnavailableDoctor = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: "Sorry, this type of doctor is not available. Thank you for visiting DoctorWallah! 😊" }
    ]);
    setIsThankYou(true);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);

    if (!userName) {
      setUserName(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: `Welcome ${input} to DoctorWallah! What service do you need?` }
      ]);
      setIsServiceSelection(true);
    } else if (isServiceSelection) {
      if (input.toLowerCase() === "paid services") {
        handleServiceSelection("Paid Services");
      } else if (input.toLowerCase() === "free services") {
        handleServiceSelection("Free Services");
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Please select a valid service." }
        ]);
      }
    }
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4 mt-10 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h2 className="text-xl font-bold text-center mb-3 text-blue-600">DoctorWallah</h2>
      
      <div className="h-64 overflow-y-auto border p-2 rounded mb-2 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded max-w-xs break-words ${
              msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"
            }`}
          >
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow border rounded p-2 w-full"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Send
        </button>
      </div>

      {isServiceSelection && !isDoctorSelection && (
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => handleServiceSelection("Paid Services")} className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto">Paid Services</button>
          <button onClick={() => handleServiceSelection("Free Services")} className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto">Free Services</button>
        </div>
      )}

      {isDoctorSelection && !isThankYou && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map((doctor) => (
            <button
              key={doctor}
              onClick={() => handleDoctorSelection(doctor)}
              className="bg-purple-600 text-white px-3 py-2 rounded text-sm"
            >
              {doctor}
            </button>
          ))}
          <button
            onClick={handleUnavailableDoctor}
            className="bg-red-600 text-white px-3 py-2 rounded text-sm"
          >
            Another Doctor
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
