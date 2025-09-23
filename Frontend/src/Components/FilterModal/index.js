import React, { useState } from "react";
import "./index.css";

const FilterModal = ({ onApply, onClose }) => {
  const [filters, setFilters] = useState({ name: "", email: "", department: "" });

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  return (
    <div className="filter-overlay">
      <div className="filter-modal">
        <h3>Filter Users</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={filters.email} onChange={handleChange} />
          <input name="department" placeholder="Department" value={filters.department} onChange={handleChange} />
          <div className="filter-actions">
            <button type="submit">Apply</button>
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
