import React, { useEffect, useState } from "react";
import {
  doneTask,
  createSubtask,
  editSubtask,
  deleteSubtask,
} from "../components/utils/api";

const Subtask = ({ subtask, onUpdateSubtask, onDeleteSubtask }) => {
  // Edit Subtask
  const handleEditClick = () => {
    const editedTitle = prompt("Edit subtask title:", subtask.Title);
    if (editedTitle !== null && editedTitle !== subtask.Title) {
      onUpdateSubtask(subtask.ID, editedTitle);
    }
  };

  // Delete Subtask
  const handleDeleteClick = () => {
    onDeleteSubtask(subtask.ID);
  };

  return (
    <li
      className="border border-black rounded-xl flex items-center justify-between p-2 mt-2"
      key={subtask.ID}
    >
      <div className="flex flex-col w-full">
        <p>{subtask.Title}</p>
        <p>Status: {subtask.Status}</p>
      </div>
      <div>
        <button
          className="m-1 rounded-lg bg-indigo-300 text-light py-1 px-2 font-semibold border border-black hover:bg-white"
          onClick={handleEditClick}
        >
          edit
        </button>
        <button
          className="m-1 rounded-lg bg-fuchsia-300 text-light py-1 px-2 font-semibold border border-black hover:bg-white"
          onClick={handleDeleteClick}
        >
          delete
        </button>
        <button className="m-1 rounded-lg bg-red-300 text-light py-1 px-2 font-semibold border border-black hover:bg-white">
          complete
        </button>
      </div>
    </li>
  );
};

const Task = ({
  task,
  onDelete,
  onEditTask,
  onTaskCompleted,
  onEditDeadline,
}) => {
  // State
  const [subtasks, setSubtasks] = useState(task.Subtasks || []);

  // Delete Task
  const handleDeleteClick = () => {
    onDelete(task.ID);
  };

  // Edit Task
  const handleEditClick = () => {
    const newTitle = prompt("Enter the new title:", task.Title);
    if (newTitle !== null && newTitle !== task.Title) {
      onEditTask(task.ID, newTitle);
    }
  };

  // Make Task Completed
  const handleTaskCompleted = async () => {
    try {
      const response = await doneTask(task.ID);
      if (response.message === "Task successfully completed") {
        onTaskCompleted(task.ID);
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  // Edit Deadline Task
  const handleEditDeadline = () => {
    const newDeadline = prompt(
      "Enter the new deadline (YYYY-MM-DD):",
      task.Deadline || ""
    );
    if (newDeadline !== null && newDeadline !== task.Deadline) {
      onEditDeadline(task.ID, newDeadline);
    }
  };

  // Add Subtask
  const handleAddSubtask = async () => {
    const subtaskTitle = prompt("Enter the subtask title:");
    if (subtaskTitle) {
      try {
        const response = await createSubtask(task.ID, subtaskTitle);
        if (response.message === "Subtask created successfully") {
          setSubtasks([...subtasks, response.subtask]);
        }
      } catch (error) {
        console.error("Error creating subtask:", error);
      }
    }
  };

  // Handle Edit Subtask
  const handleEditSubtask = async (subtaskId, title) => {
    try {
      const response = await editSubtask(subtaskId, title);
      if (response.message === "Subtask successfully updated") {
        setSubtasks((prevSubtasks) =>
          prevSubtasks.map((subtask) =>
            subtask.ID === subtaskId ? { ...subtask, Title: title } : subtask
          )
        );
      }
    } catch (error) {
      console.error("Error editing subtask:", error);
    }
  };

  // Handle Delete Subtask
  const handleDeleteSubtask = async (subtaskId) => {
    try {
      const response = await deleteSubtask(subtaskId);
      if (response.message === "Subtask deleted successfully") {
        setSubtasks(subtasks.filter((subtask) => subtask.ID !== subtaskId));
      }
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  return (
    <div className=" bg-green-200 border border-black m-8 p-6 rounded-xl shadow-lg flex flex-col">
      <h3 className="font-medium text-2xl text-center">{task.Title}</h3>
      <p className="text-center">Status: {task.Status}</p>
      <p className="text-center">
        Created At:{" "}
        {task.CreatedAt
          ? new Date(task.CreatedAt).toLocaleDateString("en-GB")
          : "No date"}
      </p>
      <p className="text-center py-2">
        Deadline:{" "}
        {task.Deadline ? (
          <span>
            {new Date(task.Deadline).toLocaleDateString("en-GB")}
            <button
              className="ml-2 rounded-lg bg-red-300 text-light py-1 px-2 font-semibold border border-black hover:bg-white"
              onClick={handleEditDeadline}
            >
              Edit
            </button>
            {new Date(task.Deadline) < new Date() && (
              <span style={{ color: "red" }}> (Deadline has passed)</span>
            )}
          </span>
        ) : (
          <>
            No deadline
            <button
              className="ml-2 rounded-lg bg-red-300 text-light py-1 px-2 font-semibold border border-black hover:bg-white"
              onClick={handleEditDeadline}
            >
              Add
            </button>
          </>
        )}
      </p>
      <div className="flex items-center justify-center">
        <p className="text-center">Subtask: </p>
        <button
          className="ml-2 rounded-lg bg-lime-300 text-light py-1 px-2 font-semibold border border-black hover:bg-white"
          onClick={handleAddSubtask}
        >
          Add
        </button>
      </div>

      {subtasks.length > 0 ? (
        <ul className="text-center my-2">
          {subtasks.map((subtask) => (
            <Subtask
              key={subtask.ID}
              subtask={subtask}
              onUpdateSubtask={handleEditSubtask}
              onDeleteSubtask={handleDeleteSubtask}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center">No subtasks yet.</p>
      )}

      <div className="flex items-center justify-between pt-3">
        <button
          className="ml-2 rounded-lg bg-cyan-300 text-light py-1 px-2 font-semibold border border-black hover:bg-white"
          onClick={handleEditClick}
        >
          Edit Task
        </button>
        {task.Status === "completed" ? (
          <p className="ml-2 rounded-lg bg-green-500 text-light py-1 px-2 font-semibold border border-black">
            This task is completed
          </p>
        ) : (
          <button
            className="ml-2 rounded-lg bg-orange-400 text-light py-1 px-2 font-semibold border border-black hover:bg-white"
            onClick={handleTaskCompleted}
          >
            Mark as Completed
          </button>
        )}

        <button
          className="ml-2 rounded-lg bg-red-500 text-light py-1 px-2 font-semibold border border-black hover:bg-white"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const TaskList = ({
  tasks,
  onDeleteTask,
  onEditTask,
  onTaskCompleted,
  onEditDeadline,
}) => (
  <div>
    {tasks.map((task) => (
      <Task
        key={task.ID}
        task={task}
        onDelete={onDeleteTask}
        onEditTask={onEditTask}
        onTaskCompleted={onTaskCompleted}
        onEditDeadline={onEditDeadline}
      />
    ))}
  </div>
);

export default TaskList;
