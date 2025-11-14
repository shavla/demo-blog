import { BASE_URL } from "../utils/consts";

export const fetchUserProfile = async (token: string) => {
    const res = await fetch(`${BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch profile (${res.status})`);
    return res.json();
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