import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, push, set , remove} from "firebase/database";
import PropertyCard from "../Components/PropertyCard/PropertyCard";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    location: "",
    price: "",
    propertyType: "",
    bedrooms: "",
  });

  const addProperty = async (e) => {
    e.preventDefault();

    try {
      const db = getDatabase();
      const propertiesRef = ref(db, "properties");
      const newPropertyRef = push(propertiesRef);
      await set(newPropertyRef, {
        location: newProperty.location,
        price: newProperty.price,
        propertyType: newProperty.propertyType,
        bedrooms: newProperty.bedrooms,
      });

      setNewProperty({
        location: "",
        price: "",
        propertyType: "",
        bedrooms: "",
      });

      console.log("Property data stored successfully!");
    } catch (error) {
      console.log("Error storing property data:", error);
    }
  };

  const handleChange = (e) => {
    setNewProperty({
      ...newProperty,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const db = getDatabase();
        const propertiesRef = ref(db, "properties");
        const snapshot = await get(propertiesRef);
        const propertyData = [];
        snapshot.forEach((childSnapshot) => {
          propertyData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setProperties(propertyData);
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = (propertiesIdToDelete) => {
    const db = getDatabase();
    const agentRef = ref(db, `properties/${propertiesIdToDelete}`);
    remove(agentRef);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Property List</h1>
        <form onSubmit={addProperty} className="mb-4">
          <input
            type="text"
            name="location"
            value={newProperty.location}
            onChange={handleChange}
            placeholder="Location"
            className="border border-gray-300 rounded py-2 px-4 mb-2"
            required
          />
          <input
            type="text"
            name="price"
            value={newProperty.price}
            onChange={handleChange}
            placeholder="Price"
            className="border border-gray-300 rounded py-2 px-4 mb-2"
            required
          />
          <input
            type="text"
            name="propertyType"
            value={newProperty.propertyType}
            onChange={handleChange}
            placeholder="Property Type"
            className="border border-gray-300 rounded py-2 px-4 mb-2"
            required
          />
          <input
            type="text"
            name="bedrooms"
            value={newProperty.bedrooms}
            onChange={handleChange}
            placeholder="No. of Bedrooms"
            className="border border-gray-300 rounded py-2 px-4 mb-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Add Property
          </button>
        </form>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ListProperty;
