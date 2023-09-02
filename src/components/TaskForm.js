// components/TaskForm.js

import React, { useState } from "react";
import { createTask } from "../components/utils/api";

const TaskForm = ({ onTaskCreated }) => {
  // Stated
  const [title, setTitle] = useState("");

  // Created
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      try {
        const createdTask = await createTask(title);
        onTaskCreated(createdTask.task);
        setTitle("");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-10 flex justify-center items-center"
    >
      <input
        className="w-1/2 h-full border-2 rounded-lg text-center"
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="ml-4 rounded-lg bg-red-300 text-light p-1 px-6 text-lg font-semibold border-2 border-black hover:bg-white"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
