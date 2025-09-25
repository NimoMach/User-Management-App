import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// ------------------- GET USERS -------------------
app.get("/api/users", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "",
      order = "asc",
      name = "",
      email = "",
      department = "",
    } = req.query;

    const { data } = await axios.get(BASE_URL);

    let users = data.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      department: u.company?.name || "N/A",
    }));

    // search
    if (search) {
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // filters
    if (name) users = users.filter((u) => u.name.toLowerCase().includes(name.toLowerCase()));
    if (email) users = users.filter((u) => u.email.toLowerCase().includes(email.toLowerCase()));
    if (department)
      users = users.filter((u) => u.department.toLowerCase().includes(department.toLowerCase()));

    // sort
    if (sort) {
      users.sort((a, b) => {
        if (a[sort] < b[sort]) return order === "asc" ? -1 : 1;
        if (a[sort] > b[sort]) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    // pagination
    const start = (page - 1) * limit;
    const paginated = users.slice(start, start + Number(limit));

    res.json({ users: paginated, total: users.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ------------------- ADD USER -------------------
app.post("/api/users", async (req, res) => {
  try {
    const { data } = await axios.post(BASE_URL, req.body);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to add user" });
  }
});

// ------------------- EDIT USER -------------------
app.put("/api/users/:id", async (req, res) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/${req.params.id}`, req.body);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to edit user" });
  }
});

// ------------------- DELETE USER -------------------
app.delete("/api/users/:id", async (req, res) => {
  try {
    await axios.delete(`${BASE_URL}/${req.params.id}`);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Export for Vercel
export default app;
