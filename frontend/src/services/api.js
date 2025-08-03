// src/services/api.js
const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

// Submissions API
export const submitForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error submitting form");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getSubmissions = async (token) => {
  try {
    const response = await fetch(`${API_URL}/submissions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error fetching submissions");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteSubmission = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/submissions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error deleting submission");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Queue API
export const getQueueStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/submissions/queue-status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error fetching queue status");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const resetQueue = async (token) => {
  try {
    const response = await fetch(`${API_URL}/submissions/reset-queue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error resetting queue");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Auth API
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid credentials");
    }

    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return false;
    }

    const response = await fetch(`${API_URL}/auth/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error("Verify Token Error:", error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
};
