import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  push,
  set,
  remove,
} from "firebase/database";
import PropertyCard from "../Components/PropertyCard/PropertyCard";

const FindProperty = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [properties, setProperties] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchCriteria = {
      location,
      priceRange,
      propertyType,
      bedrooms,
    };

    try {
      const matchingProperties = await performPropertySearch(searchCriteria);
      setProperties(matchingProperties);
    } catch (error) {
      console.log("Error performing search:", error);
    }
  };

  const performPropertySearch = async (searchCriteria) => {
    try {
      const db = getDatabase();
      const propertiesRef = ref(db, "properties");
      const queryRef = query(
        propertiesRef,
        orderByChild("location"),
        equalTo(searchCriteria.location)
      );
      const snapshot = await get(queryRef);
      const matchingProperties = [];
      snapshot.forEach((childSnapshot) => {
        matchingProperties.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      return matchingProperties;
    } catch (error) {
      console.log("Error performing search:", error);
      return [];
    }
  };

  const storePropertyData = async () => {
    try {
      const db = getDatabase();
      const propertiesRef = ref(db, "properties");
      const newPropertyRef = push(propertiesRef);
      await set(newPropertyRef, {
        location,
        priceRange,
        propertyType,
        bedrooms,
      });

      setLocation("");
      setPriceRange("");
      setPropertyType("");
      setBedrooms("");

      console.log("Property data stored successfully!");
    } catch (error) {
      console.log("Error storing property data:", error);
    }
  };

  useEffect(() => {
    setProperties([]);
  }, []);

  const handleDelete = (propertiesIdToDelete) => {
    const db = getDatabase();
    const agentRef = ref(db, `properties/${propertiesIdToDelete}`);
    remove(agentRef);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Property Search</h2>
        <form onSubmit={handleSearch}>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-1">
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priceRange" className="block mb-1">
              Price Range:
            </label>
            <select
              id="priceRange"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              <option value="">Any</option>
              <option value="0-100000">$0 - $100,000</option>
              <option value="100000-200000">$100,000 - $200,000</option>
              <option value="200000-300000">$200,000 - $300,000</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="propertyType" className="block mb-1">
              Property Type:
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              <option value="">Any</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="bedrooms" className="block mb-1">
              Bedrooms:
            </label>
            <select
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
          <button
            type="button"
            onClick={storePropertyData}
            className="bg-green-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-600"
          >
            Save Property
          </button>
        </form>

        <div className="mt-8">
          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            properties.map((property) => (
            <PropertyCard key={property.id} property={property} onDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindProperty;
