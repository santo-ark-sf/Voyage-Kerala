//To-do List Tracker
const express = require("express");
const app = express();

app.use(express.json());

// Middleware
app.use((req, res, next) => {
  console.log("Middleware Running");
  next();
});

// Sample Data
let tasks = [
  { id: 1, title: "Buy groceries", status: "pending" },
  { id: 2, title: "Complete assignment", status: "completed" },
  { id: 3, title: "Gym session", status: "pending" },
];

// GET
// Used to view all tasks
app.get("/tasks", (req, res) => {
  res.json({
    message: "Tasks Retrieved Successfully",
    data: tasks,
  });
});

// POST
// Used to add a new task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: req.body.status || "pending", 
  };

  tasks.push(newTask);
  res.json({
    message: "Task Created Successfully",
    data: newTask,
  });
});

// PUT
// Used toupdate an existing task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.json({ message: "Task Not Found" });
  }

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;

  res.json({
    message: "Task Updated Successfully",
    data: task,
  });
});

// DELETE
// Used to remove a task from the list
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);

  res.json({
    message: "Task Deleted Successfully",
  });
});

// Start the server
app.listen(3000, () => {
  console.log(" Server is running on port 3000");
});