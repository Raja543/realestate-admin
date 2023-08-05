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

const Contacts = () => {
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
      <div className="p-16">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <strong>Filter:</strong>
            <select
              className="border p-1 rounded"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="unviewed">Backlog</option>
              <option value="progress">InProgress</option>
              <option value="review">Done</option>
            </select>
            <div className="flex space-x-2">
              <strong>Sort By:</strong>
              <select
                className="border p-1 rounded"
                value={sortFilter}
                onChange={handleSortFilterChange}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by Subject"
              value={searchSubject}
              onChange={handleSearchChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full p-8">
            <thead className="bg-gray-700 text-white h-10">
              <tr>
                <th className="px-4">NAME</th>
                <th className="px-4">MOBILE</th>
                <th className="px-4">EMAIL</th>
                <th className="px-4">SUBJECT</th>
                <th className="px-4">DESCRIPTION</th>
                <th className="px-4">TIME</th>
                <th className="px-4">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="even:bg-gray-200 hover:bg-gray-300">
                  <td className="px-4">{user.name}</td>
                  <td className="px-4">{user.mobile}</td>
                  <td className="px-4">{user.email}</td>
                  <td className="px-4">{user.subject}</td>
                  <td className="px-4">{user.description}</td>
                  <td className="px-4">{user.time}</td>
                  <td className="px-4">
                    <div className="selectContainer">
                      <select
                        value={status[user.id] || "unviewed"}
                        onChange={(event) => handleStatusChange(event, user.id)}
                        className="border p-1 rounded"
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

export default Contacts;
