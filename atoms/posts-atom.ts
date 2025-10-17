import { atom } from "jotai";

export type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export const limitPerPageAtom = atom<number>(5);