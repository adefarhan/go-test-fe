import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchTaskOngoing = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/ongoing`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchTaskCompleted = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/completed`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const createTask = async (title) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, {
      title: title,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const editTask = async (id, newTitle) => {
  try {
    const response = await axios.patch(`${BASE_URL}/tasks/${id}`, {
      title: newTitle,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const doneTask = async (id) => {
  try {
    const response = await axios.patch(`${BASE_URL}/tasks/done/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const editDeadlineTask = async (id, newDeadline) => {
  try {
    const response = await axios.patch(`${BASE_URL}/tasks/deadline/${id}`, {
      time: newDeadline,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const fetchOneTask = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const createSubtask = async (id, title) => {
  try {
    const response = await axios.post(`${BASE_URL}/subtasks/${id}`, {
      title: title,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating subtask:", error);
    throw error;
  }
};

export const editSubtask = async (id, newTitle) => {
  try {
    const response = await axios.patch(`${BASE_URL}/subtasks/${id}`, {
      title: newTitle,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const deleteSubtask = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/subtasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};
