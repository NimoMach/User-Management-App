import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../UserForm";
import UserTable from "../UserTable";
import FilterModal from "../FilterModal";
import "./index.css";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users`, {
        params: { page, limit, search, sort, order, ...filters },
      });
      setUsers(data.users);
      setTotal(data.total);
      setError("");
    } catch {
      setError("Failed to load users. Try again later.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search, sort, order, filters]);

  const handleAdd = async user => {
    try {
      await axios.post(`${API_URL}/users`, user);
      fetchUsers();
    } catch {
      setError("Failed to add user.");
    }
  };

  const handleEdit = async user => {
    try {
      await axios.put(`${API_URL}/users/${user.id}`, user);
      setEditingUser(null);
      fetchUsers();
    } catch {
      setError("Failed to edit user.");
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      fetchUsers();
    } catch {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="user-page">
      <h2>User Management</h2>
      {error && <p className="error">{error}</p>}

      <UserForm onSubmit={editingUser ? handleEdit : handleAdd} editingUser={editingUser} />

      <div className="actions">
        <input
          placeholder="Search by name/email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button onClick={() => setShowFilter(true)}>Filter</button>
      </div>

      {showFilter && (
        <FilterModal onApply={setFilters} onClose={() => setShowFilter(false)} />
      )}

      <UserTable
        users={users}
        onEdit={setEditingUser}
        onDelete={handleDelete}
        sort={sort}
        order={order}
        setSort={setSort}
        setOrder={setOrder}
      />

      <div className="pagination">
        Page {page} of {Math.ceil(total / limit)}
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page * limit >= total} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UserPage;
