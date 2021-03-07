const CONFIG = require("../config/Config");

const { API_URL, TOKEN } = CONFIG;

const token = localStorage.getItem("token") || TOKEN;

export const CreateDepartment = async (dept) => {
  let response;
  try {
    response = await fetch(`${API_URL}/dept/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name: dept }),
    });
    if (response) return response.json();
  } catch (error) {
    throw error;
  }
};

export const getDepartments = async () => {
  let response;
  try {
    response = await fetch(`${API_URL}/dept/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if(response) return response.json();
  } catch (error) {
    throw error;
  }
};

export const CreateModule = async (body) => {
  let response;
  try {
    response = await fetch(`${API_URL}/module/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });
    if (response) return response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllModule = async (department) => {
  let response;
  try {
    response = await fetch(`${API_URL}/module/getAll?department=${department}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if(response) return response.json();
  } catch (error) {
    throw error;
  }
};

export const CreateTool = async (body) => {
  let response;
  try {
    response = await fetch(`${API_URL}/tool/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });
    if (response) return response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllTools = async (department, module) => {
  let response;
  try {
    response = await fetch(`${API_URL}/tool/getAll?department=${department}&&module=${module}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if(response) return response.json();
  } catch (error) {
    throw error;
  }
};



