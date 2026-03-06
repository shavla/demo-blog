import type { BlogInfoType } from "./blog.type";

export type PageInfoType = {
    blogs: BlogInfoType[];
    totalPages: number;
    page: number;
    limit: number
}