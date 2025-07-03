import { useState } from "react";
import useStudentUser from "./useStudentUser";

// Custom hook to encapsulate and manage all state variables for the student dashboard
export default function useStudentState() {
  // Extract user information from localStorage using custom hook
  const { user, firstname, middlename, lastname } = useStudentUser();

  // Track which dashboard section is currently active (default: "calendar")
  const [activeSection, setActiveSection] = useState("calendar");

  // State for storing all events (fetched from backend)
  const [events, setEvents] = useState([]);

  // State for storing events joined by the student
  const [joinedEvents, setJoinedEvents] = useState([]);

  // Loading state used during fetch operations
  const [loading, setLoading] = useState(false);

  // Message text for success/error feedback
  const [message, setMessage] = useState("");

  // Type of message (e.g., "success", "error") for styling
  const [messageType, setMessageType] = useState("");

  // Selected event (e.g., for showing event details or joining)
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Form state for the profile edit fields
  const [editData, setEditData] = useState({
    firstname: firstname || "",
    middlename: middlename || "",
    lastname: lastname || "",
    password: "",
    confirmPassword: "",
  });

  // User type (e.g., "student", "eventManager") from user object
  const typeUser = user?.typeUser;

  // Return all relevant state variables and their setters
  return {
    typeUser, 
    activeSection,
    setActiveSection,
    events,
    setEvents,
    joinedEvents,
    setJoinedEvents,
    loading,
    setLoading,
    message,
    setMessage,
    messageType,           
    setMessageType,  
    selectedEvent,
    setSelectedEvent,
    editData,
    setEditData,
  };
}
