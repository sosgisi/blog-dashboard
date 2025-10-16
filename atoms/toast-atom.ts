import { atom } from "jotai";

export type Toast = {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

export const toastAtom = atom<Toast[]>([]);