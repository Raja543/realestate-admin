import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import "./Contact.css";

const Agents = () => {
  const [filter, setFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("latest");
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState({});
  const [searchSubject, setSearchSubject] = useState("");
  const userCollection = collection(db, "contacts");

  const getUser = async () => {
    const q = query(userCollection, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      time: doc.data().timestamp?.toDate().toString().slice(4, 24),
    }));
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(userCollection, (querySnapshot) => {
      const updatedStatus = {};
      querySnapshot.forEach((doc) => {
        updatedStatus[doc.id] = doc.data().status || "unviewed";
      });
      setStatus(updatedStatus);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSortFilterChange = (event) => {
    setSortFilter(event.target.value);
  };

  const handleStatusChange = async (event, userId) => {
    const newStatus = { ...status };
    newStatus[userId] = event.target.value;
    setStatus(newStatus);

    try {
      const userDocRef = doc(db, "", userId);
      await updateDoc(userDocRef, { status: event.target.value });
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchSubject(event.target.value);
  };

  const filteredUsers = user
    .filter((userData) => {
      if (filter === "all") {
        return userData.subject
          .toLowerCase()
          .includes(searchSubject.toLowerCase());
      } else {
        return (
          userData.subject
            .toLowerCase()
            .includes(searchSubject.toLowerCase()) &&
          status[userData.id] === filter
        );
      }
    })
    .sort((a, b) => {
      if (sortFilter === "latest") {
        return new Date(b.time) - new Date(a.time);
      } else if (sortFilter === "oldest") {
        return new Date(a.time) - new Date(b.time);
      }
      return 0;
    });

  return (
    <>
      <Navbar />
      <div>
        <div className="upperContainer">
          <div className="filterContainer">
            <label htmlFor="status-filter">
              <strong>Filter:</strong>
            </label>
            <select
              id="status-filter"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="unviewed">Backlog</option>
              <option value="progress">InProgress</option>
              <option value="review">Done</option>
            </select>
            <div className="filterSection">
              <label htmlFor="sort-filter">
                <strong>&nbsp;&nbsp;&nbsp;Sort By:</strong>
              </label>
              <select
                id="sort-filter"
                value={sortFilter}
                onChange={handleSortFilterChange}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <div className="searchInp">
            <input
              type="text"
              placeholder="Search by Subject"
              value={searchSubject}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="tableContainer">
          <table className="adminTable">
            <thead className="tableHead">
              <tr>
                <th>NAME</th>
                <th>MOBILE</th>
                <th>EMAIL</th>
                <th>SUBJECT</th>
                <th>DESCRIPTION</th>
                <th>TIME</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.email}</td>
                  <td>{user.subject}</td>
                  <td>{user.description}</td>
                  <td>{user.time}</td>
                  <td>
                    <div className="selectContainer">
                      <label htmlFor={`status-${user.id}`}></label>
                      <select
                        id={`status-${user.id}`}
                        value={status[user.id] || "unviewed"}
                        onChange={(event) => handleStatusChange(event, user.id)}
                      >
                        <option value="unviewed">Backlog</option>
                        <option value="progress">InProgress</option>
                        <option value="review">Done</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Agents;
