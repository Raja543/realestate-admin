import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, push, set } from "firebase/database";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { NavLink } from "react-router-dom";

const FindProperty = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [properties, setProperties] = useState([]);
  const [matchingProperties, setMatchingProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchCriteria = {
      location,
      priceRange,
      propertyType,
      bedrooms,
    };

    try {
      setLoading(true); // Set loading to true while fetching data
      setError(null); // Clear any previous error
      const matchingProperties = await performPropertySearch(searchCriteria);
      setMatchingProperties(matchingProperties);
    } catch (error) {
      setError("Error performing search");
    } finally {
      setLoading(false); // Set loading back to false after fetching data
    }
  };

  const performPropertySearch = async (searchCriteria) => {
    try {
      const db = getDatabase();
      const propertiesRef = ref(db, "properties");
      const snapshot = await get(propertiesRef);

      const allProperties = [];
      snapshot.forEach((childSnapshot) => {
        allProperties.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      // Apply client-side filtering based on the search criteria
      const matchingProperties = allProperties.filter((property) => {
        if (
          searchCriteria.location &&
          property.location !== searchCriteria.location
        ) {
          return false;
        }

        if (
          searchCriteria.priceRange &&
          property.priceRange !== searchCriteria.priceRange
        ) {
          return false;
        }

        if (
          searchCriteria.propertyType &&
          property.propertyType !== searchCriteria.propertyType
        ) {
          return false;
        }

        if (
          searchCriteria.bedrooms &&
          property.bedrooms !== searchCriteria.bedrooms
        ) {
          return false;
        }

        // Add other filtering conditions as needed

        return true;
      });

      console.log("Matching Properties:", matchingProperties);

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
    const fetchProperties = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data
        setError(null); // Clear any previous error
        const db = getDatabase();
        const propertiesRef = ref(db, "properties");
        const snapshot = await get(propertiesRef);
        const allProperties = [];
        snapshot.forEach((childSnapshot) => {
          allProperties.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setProperties(allProperties);
      } catch (error) {
        setError("Error fetching properties");
      } finally {
        setLoading(false); // Set loading back to false after fetching data
      }
    };
    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container flex-col mx-auto px-4 py-8">
        <div className="flex-row">
          <ul
            className={`md:flex md:items-center hidden space-x-3  "block" : "hidden"
            }`}
          >
            <NavLink to="/">
              <li className="text-gray-800 text-xl hover:text-gray-500 pr-4">
                Home
              </li>
            </NavLink>
            <NavLink to="/findproperty">
              <li className="text-gray-800 text-xl hover:text-gray-500 pr-4">
                Find Property
              </li>
            </NavLink>
            <NavLink to="/listproperty">
              <li className="text-gray-800 text-xl hover:text-gray-500 pr-2">
                List Property
              </li>
            </NavLink>
            <NavLink to="/agents">
              <li className="text-gray-800 text-xl hover:text-gray-500 pr-2">
                Agents
              </li>
            </NavLink>
            <NavLink to="/contacts">
              <li className="text-gray-800 text-xl hover:text-gray-500 pr-2">
                Contact Us
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="search"
            placeholder="Search"
            className="border border-gray-300 px-2 py-1 rounded"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Property Search</h2>
        <div className="mb-4">
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
        </div>

        <div className="mt-8">
          {/* Render loading message while fetching data */}
          {loading && <p>Loading...</p>}

          {/* Render error message if there was an error */}
          {error && <p>{error}</p>}

          {/* Conditionally render properties based on whether a search is performed */}
          {matchingProperties.length === 0
            ? properties.map((property) => (
                <div
                  key={property.id}
                  className="border border-gray-200 rounded p-4 mb-4"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {property.location}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Price: {property.priceRange}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Type: {property.propertyType}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Bedrooms: {property.bedrooms}
                  </p>
                </div>
              ))
            : matchingProperties.map((property) => (
                <div key={property.id} className="bg-gray-100 p-4 mb-4">
                  <p className="mb-2">Price: {property.priceRange}</p>
                  <p className="mb-2">Location: {property.location}</p>
                  <p className="mb-2">Type: {property.propertyType}</p>
                  <p className="mb-2">Bedrooms: {property.bedrooms}</p>
                  {/* ... Render other property details ... */}
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindProperty;