'use client'

import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Post } from "../page";
import { Button } from "@mui/material";
import DeleteConfirmation from "@/components/delete-confirmation";
import { atom, useSetAtom } from "jotai";

export const idAtom = atom(0);

export default function DetailedPostPage({params}: {params: {ID: string}}) {
    
    const { ID } = params;

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
        <Navbar/>
        <div className="flex flex-col gap-5 m-20 px-10 py-5 bg-foreground/80 text-background rounded-lg">
            <h1 className="flex justify-between items-center text-4xl">
                <ReactMarkdown>{post?.title}</ReactMarkdown>
                <h1 className="text-sm text-background/70">{post?.createdAt}</h1>
            </h1>
            <h1>
                <ReactMarkdown>{post?.content}</ReactMarkdown>
            </h1>
        </div>
        <div className="flex gap-3 justify-end mr-20">
            <Button href="/HOST/local/posts" variant="outlined" color="warning" className="m-5">Back to Posts</Button>
            <Button onClick={() => setDeleteClicked(true)} variant="contained" color="error">Delete</Button>
        </div>
        { deleteClicked && <DeleteConfirmation setDeleteClicked={setDeleteClicked}/> }
        </>
    )
}