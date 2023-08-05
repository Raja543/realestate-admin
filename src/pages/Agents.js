import React, { useEffect, useState, useRef } from "react";
import AgentsProfile from "../Components/AgentProfile/AgentProfile.jsx";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Agents = () => {
  const [agentIds, setAgentIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAgent, setNewAgent] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
    designation: "",
  });

  const fileInputRef = useRef(null); // Create a ref for the file input element

  const fetchAgentIds = () => {
    const db = getDatabase();
    const agentsRef = ref(db, "agents");
    onValue(agentsRef, (snapshot) => {
      const data = snapshot.val();
      const ids = data ? Object.keys(data) : [];
      setAgentIds(ids);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAgentIds();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Upload the agent's image to Firebase Storage, if provided
    const uploadImage = async () => {
      if (newAgent.image) {
        const storage = getStorage();
        const imageRef = storageRef(
          storage,
          `agent_images/${newAgent.image.name}`
        );
        await uploadBytes(imageRef, newAgent.image);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
      }
      return null;
    };

    // Call the uploadImage function to get the image URL
    uploadImage()
      .then((imageUrl) => {
        // Save the agent's details along with the image URL in the Firebase Realtime Database
        const db = getDatabase();
        const agentsRef = ref(db, "agents");
        const newAgentRef = push(agentsRef);

        // Update the newAgent object with the image URL before saving it to the database
        const agentWithImage = {
          ...newAgent,
          image: imageUrl || "", // If imageUrl is null, set it to an empty string
        };

        set(newAgentRef, agentWithImage);

        // Reset the form fields after submission
        setNewAgent({
          image: "",
          name: "",
          email: "",
          phone: "",
          designation: "",
        });

        // Reset the file input element
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the file input value
        }
      })
      .catch((error) => {
        console.error("Error uploading image or saving data:", error);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      // Set the selected image file to the state
      setNewAgent({
        ...newAgent,
        [e.target.name]: e.target.files[0],
      });
    } else {
      // For other input fields (name, email, phone, designation), handle as before
      setNewAgent({
        ...newAgent,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDelete = (agentIdToDelete) => {
    const db = getDatabase();
    const agentRef = ref(db, `agents/${agentIdToDelete}`);
    remove(agentRef);
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 md:grid-cols-4 p-10">
        <div>
          <h2>Add New Agent</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              name="image"
              ref={fileInputRef} // Attach the ref to the file input element
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              value={newAgent.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={newAgent.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="tel"
              name="phone"
              value={newAgent.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
            <input
              type="text"
              name="designation"
              value={newAgent.designation}
              onChange={handleChange}
              placeholder="Designation"
              required
            />
            <button type="submit">Add Agent</button>
          </form>
        </div>
        {loading ? (
          <div>Loading agents...</div>
        ) : (
          agentIds.map((agentId) => (
            <AgentsProfile
              key={agentId}
              agentId={agentId}
              onDelete={() => handleDelete(agentId)}
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Agents;
