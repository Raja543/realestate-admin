import React, { useEffect, useState } from "react";
import AgentsProfile from "../Components/AgentProfile/AgentProfile.jsx";
import { getDatabase, ref, onValue, push, set , remove } from "firebase/database";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Agents = () => {
  const [agentIds, setAgentIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
  });

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

    const db = getDatabase();
    const agentsRef = ref(db, "agents");
    const newAgentRef = push(agentsRef);
    set(newAgentRef, newAgent);

    setNewAgent({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleChange = (e) => {
    setNewAgent({
      ...newAgent,
      [e.target.name]: e.target.value,
    });
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
            <button type="submit">Add Agent</button>
            <button onClick={handleDelete}>Delete</button>
          </form>
        </div>
        {loading ? (
          <div>Loading agents...</div>
        ) : (
          agentIds.map((agentId) => (
            <AgentsProfile key={agentId} agentId={agentId}  onDelete={() => handleDelete(agentId)}  />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};



export default Agents;
