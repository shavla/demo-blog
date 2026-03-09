import type { BlogInfoType } from "./blog.type";

export type UserType ={
    avatar: string;
    blogs: BlogInfoType[];
    created_at: string;
    email: string;
    id: number;
    role: string;
    username: string;
}   