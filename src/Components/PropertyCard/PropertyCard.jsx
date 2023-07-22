import React from "react";
import { getDatabase, ref, remove } from "firebase/database";
import PropTypes from "prop-types";

const PropertyCard = ({ property, onDelete }) => {
  const handleDelete = () => {
    const db = getDatabase();
    const propertyRef = ref(db, `properties/${property.id}`);
    remove(propertyRef);
    onDelete();
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 mb-4">
        {/* <h3 className="text-lg font-semibold mb-2">{property.title}</h3> */}
        <p className="mb-2">Price: {property.priceRange}</p>
        <p className="mb-2">Location: {property.location}</p>
        <p className="mb-2">Type: {property.propertyType}</p>
        {/* <p>Description: {property.description}</p> */}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default PropertyCard;
