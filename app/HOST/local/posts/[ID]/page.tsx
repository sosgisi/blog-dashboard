'use client'

import Navbar from "@/components/navbar";
import { use, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@mui/material";
import DeleteConfirmation from "@/components/pop-ups/delete-confirmation";
import { atom, useSetAtom } from "jotai";
import { Post } from "@/atoms/posts-atom";

export const idAtom = atom(0);

export default function DetailedPostPage({params}: {params: Promise<{ID: string}>}) {
    
    const { ID } = use(params);

    const setId = useSetAtom(idAtom);

    const [post, setPost] = useState<Post|null>(null);
    const [deleteClicked, setDeleteClicked] = useState(false);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        const post = storedPosts.find((p: {id: number}) => p.id === parseInt(ID));
        setPost(post)
        setId(parseInt(ID));
    }, [ID])

    return (
        <>
        <Navbar />
        <div className="flex flex-col gap-5 m-5 sm:m-10 md:m-20 px-5 sm:px-10 py-2 sm:py-5 rounded-lg border border-gray-500 shadow-md">
            <div className="flex justify-between items-center text-2xl sm:text-4xl">
                <ReactMarkdown>{post?.title}</ReactMarkdown>
                <h1 className="text-sm text-end opacity-50">{post?.createdAt}</h1>
            </div>
            <div className="whitespace-pre-line break-words">
                <ReactMarkdown>{post?.content}</ReactMarkdown>
            </div>
        </div>
        <div className="flex gap-3 justify-end mr-5 sm:mr-10 md:mr-20">
            <Button href="/HOST/local/posts" variant="outlined" color="warning" className="m-5">Back to Posts</Button>
            <Button onClick={() => setDeleteClicked(true)} variant="contained" color="error">Delete</Button>
        </div>
        { deleteClicked && <DeleteConfirmation setDeleteClicked={setDeleteClicked}/> }
        </>
    )
}