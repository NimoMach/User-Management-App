import React, { useEffect, useState } from "react";
import "./index.css";

const UserForm = ({ onSubmit, editingUser }) => {
  const [form, setForm] = useState({ id: "", name: "", email: "", department: "" });

  useEffect(() => {
    if (editingUser) setForm(editingUser);
  }, [editingUser]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name and Email required");
    onSubmit(form);
    setForm({ id: "", name: "", email: "", department: "" });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
      <button type="submit">{editingUser ? "Update" : "Add"}</button>
    </form>
  );
};

export default UserForm;
