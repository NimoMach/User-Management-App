import React from "react";
import "./index.css";

const UserTable = ({ users, onEdit, onDelete, sort, order, setSort, setOrder }) => {
  const handleSort = field => {
    if (sort === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(field);
      setOrder("asc");
    }
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th onClick={() => handleSort("id")}>ID</th>
          <th onClick={() => handleSort("name")}>Name</th>
          <th onClick={() => handleSort("email")}>Email</th>
          <th onClick={() => handleSort("department")}>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.department}</td>
              <td>
                <button onClick={() => onEdit(u)}>Edit</button>
                <button onClick={() => onDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>No users found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
