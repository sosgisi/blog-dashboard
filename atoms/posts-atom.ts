import { atom } from "jotai";

export type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export const allPostsAtom = atom<Post[]>([]);
export const displayedPostsAtom = atom<Post[]>([]);

export const limitPerPageAtom = atom<number>(5);