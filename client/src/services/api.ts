const API_URL = 'http://localhost:5001/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const api = {
  // User Profile
  async getProfile() {
    const response = await fetch(`${API_URL}/user/profile`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  async updateProfile(data: { name: string; email: string }) {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Tasks
  async getTasks(params?: { search?: string; status?: string; sort?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.sort) queryParams.append('sort', params.sort);
    
    const response = await fetch(`${API_URL}/tasks?${queryParams.toString()}`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  async createTask(data: { title: string; description?: string; status: string }) {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateTask(id: number, data: { title?: string; description?: string; status?: string }) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteTask(id: number) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    return response.json();
  },
};
