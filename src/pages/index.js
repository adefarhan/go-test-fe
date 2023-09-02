import React, { useEffect, useState } from "react";
import {
  fetchTaskOngoing,
  fetchTaskCompleted,
  deleteTask,
  editTask,
  editDeadlineTask,
  fetchOneTask,
} from "../components/utils/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  // Stated
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mounted
  useEffect(() => {
    Promise.all([fetchTaskOngoing(), fetchTaskCompleted()])
      .then(([ongoingData, completedData]) => {
        setOngoingTasks(ongoingData.task);
        setCompletedTasks(completedData.task);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Created Task
  const handleTaskCreated = (newTask) => {
    setOngoingTasks([...ongoingTasks, newTask]);
  };

  // Deleted Task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      if (response.message === "Task deleted successfully") {
        setOngoingTasks(ongoingTasks.filter((task) => task.ID !== taskId));
        setCompletedTasks(completedTasks.filter((task) => task.ID !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Updated Task
  const handleEditTask = async (taskId, newTitle) => {
    try {
      const response = await editTask(taskId, newTitle);
      if (response.message === "Task successfully updated") {
        const isTaskInOngoingTasks = ongoingTasks.some(
          (task) => task.ID === taskId
        );
        const isTaskInCompletedTasks = completedTasks.some(
          (task) => task.ID === taskId
        );
        if (isTaskInOngoingTasks) {
          setOngoingTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.ID === taskId ? { ...task, Title: newTitle } : task
            )
          );
        } else if (isTaskInCompletedTasks) {
          setCompletedTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.ID === taskId ? { ...task, Title: newTitle } : task
            )
          );
        }
      } else {
        console.error("Error editing task:", response.message);
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Completed Task
  const handleCompleteTask = async (taskId) => {
    const completedTask = await fetchOneTask(taskId);
    setOngoingTasks(ongoingTasks.filter((task) => task.ID !== taskId));
    if (completedTask.task) {
      setCompletedTasks([...completedTasks, completedTask.task]);
    }
  };

  // Edit deadline
  const handleEditDeadline = async (id, newDeadline) => {
    try {
      const response = await editDeadlineTask(id, newDeadline);
      if (response.message === "Task successfully updated") {
        setOngoingTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.ID === id ? { ...task, Deadline: newDeadline } : task
          )
        );
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Fetch Task
  const handleFetchTask = async (taskId) => {
    const fetchTask = await fetchOneTask(taskId);
    if (fetchTask.task.Status === "completed") {
      await handleCompleteTask(taskId);
    }
  };

  return (
    <div className="p-12 flex flex-col justify-center items-center">
      <h1 className=" text-4xl p-4 font-bold">Todo App</h1>

      <TaskForm onTaskCreated={handleTaskCreated} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl pt-5 text-center font-semibold lg:text-left">
            Ongoing Tasks
          </h2>
          {ongoingTasks.length === 0 ? (
            <p className="text-lg text-center font-bold pt-8">
              No ongoing tasks yet.
            </p>
          ) : (
            <TaskList
              tasks={ongoingTasks}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onTaskCompleted={handleCompleteTask}
              onEditDeadline={handleEditDeadline}
              fetchTask={handleFetchTask}
            />
          )}

          <h2 className="text-2xl pt-5 text-center font-semibold lg:text-left">
            Completed Tasks
          </h2>
          {completedTasks.length === 0 ? (
            <p className="text-lg text-center font-bold pt-8">
              No completed tasks yet.
            </p>
          ) : (
            <TaskList
              tasks={completedTasks}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              fetchTask={handleFetchTask}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
