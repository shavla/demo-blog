import { BASE_URL } from "../utils/consts";

const apiFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const response = await fetch(url, options);

    if (response.status === 401) {
        const cloned = response.clone();
        const data = await cloned.json().catch(() => ({}));

        if (data.error === 'SESSION_EXPIRED') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    }

    return response;
};

export const fetchUserInfo = async (token: string, id: number) => {
    const res = await apiFetch(`${BASE_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch profile (${res.status})`);
    return res.json();
};

export const createBlog = async (token: string, blogData: { title: string; content: string }) => {
    const response = await apiFetch(`${BASE_URL}/createblog`, {
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

export const createComment = async (token: string, commentData: { text: string; blogId: number }) => {
    const response = await apiFetch(`${BASE_URL}/createComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create comment");
    }
    return response.json();
};

export const getComments = async (blogId: number, token: string) => {
    const response = await apiFetch(`${BASE_URL}/getComments/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
    }
    return response.json();
};

export const deleteComment = async (commentId: number, token: string) => {
    const response = await apiFetch(`${BASE_URL}/comment/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete blog");
    }
    return true;
};

export const updateComment = async (commentId: number, text: string, token: string) => {
    const response = await apiFetch(`${BASE_URL}/comment/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update comment");
    }
    return response.json();
};

export const getBlog = async (blogId: number, token: string) => {
    const response = await apiFetch(`${BASE_URL}/blog/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
    }
    return response.json();
};

export const getPaginatedBlogs = async (page: number, token: string) => {
    const response = await apiFetch(`${BASE_URL}/blogs?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
    }
    return response.json();
};

export const deleteBlog = async (blogId: number, token: string) => {
    const response = await apiFetch(`${BASE_URL}/blog/${blogId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete blog");
    }
    return true;
};

export const updateBlog = async (blogId: number, token: string, blogData: { title: string; text: string }) => {
    const response = await apiFetch(`${BASE_URL}/blog/${blogId}`, {
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
    return response.json();
};

export const searchBlogs = async (title: string, token: string) => {
    const response = await apiFetch(`${BASE_URL}/blog/search?q=${title}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
    }
    return response.json();
};