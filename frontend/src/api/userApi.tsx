import { BASE_URL } from "../utils/consts";

export const fetchUserProfile = async (token: string) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch profile (${res.status})`);
  return res.json();
};

export const createBlog = async (token: string, blogData: { title: string; content: string }) => {
  const response = await fetch(`${BASE_URL}/createblog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create blog");
  }

  return response.json();
};


export const getBlog = async (blogId: number, token: string) => {
  console.log("startt")
  const response = await fetch(`${BASE_URL}/blog/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to load blog");
  }

  return response.json();
};

export const deleteBlog = async (blogId: number, token: string) => {
  const response = await fetch(`${BASE_URL}/blog/${blogId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete blog");
  }

  return true;
};

export const updateBlog = async (blogId: number, token: string, blogData: { title: string; text: string }) => {
  const response = await fetch(`${BASE_URL}/blog/${blogId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update blog");
  }

  return await response.json();
};