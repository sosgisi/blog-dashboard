'use client'

import { allPostsAtom } from "@/atoms/posts-atom";
import { toastAtom } from "@/atoms/toast-atom";
import Navbar from "@/components/navbar";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function NewPostsPage() {

    const router = useRouter();

    const setAllPosts = useSetAtom(allPostsAtom);
    const setToasts = useSetAtom(toastAtom);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const isAlphabet = (str:string) => {
        return /^[a-zA-Z ]+$/.test(str);
    }

    const handleCancel = (e:React.FormEvent) => {
        e.preventDefault();
        if(!title && !content) return router.push('/HOST/local/posts');
        const confirm = window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.");
        if(confirm) router.push('/HOST/local/posts');
        return;
    }

    const handlePost = async (e:React.FormEvent) => {
        e.preventDefault();
        if(!title || !content) {
            return alert("Title and content are required.");
        }else if(!title || !content || title.length<5 || !isAlphabet(title[0])) {
            return alert("Title must be at least 5 characters long and first character can only be alphabets.");
        }else if(content.length < 20) {
            return alert("Content must be at least 20 characters long.");
        }
        
        const previousPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        const lastId = previousPosts.length > 0 
            ? Math.max(...previousPosts.map((post: {id: number}) => post.id)) 
            : 0;

        const newPost = {
            id: lastId + 1,
            title,
            content,
            createdAt: new Date().toISOString()
        }

        const updatedPosts = [...previousPosts, newPost];
        
        setAllPosts(updatedPosts)
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setToasts((prev) => [...prev, {id: Date.now(), message: "Post created successfully!", type: "success"}]);

        return router.push('/HOST/local/posts');
    }

    return (
        <>
        <Navbar />
        <div className="h-screen m-5 mb-10 py-10 px-5 bg-foreground/10 rounded-2xl shadow-2xl border border-foreground/10">
            <div className="flex flex-col sm:flex-row gap-5 justify-between">
                <h1 className="text-2xl whitespace-nowrap">Create your new post</h1>
                <div className="flex justify-end gap-5 items-center">
                    <Button onClick={handleCancel} variant="outlined" color="error" className="mt-5">Cancel</Button>
                    <Button onClick={handlePost} variant="contained" color="primary" className="mt-5">Post</Button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 h-full py-5">
                <div className="relative flex flex-col sm:w-1/2 p-3 rounded-md h-full bg-background">
                    <h1 className="absolute text-sm right-3 opacity-50 cursor-default">Text Editor</h1>
                    <label className="mt-7">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 mb-5 px-2 border border-gray-400 rounded outline-none" />
                    <label>Content</label>
                    <textarea name="editor" id="editor" value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-full p-2 border border-gray-400 rounded outline-none"></textarea>
                </div>
                <div className="relative sm:w-1/2 h-full p-3 bg-background rounded-md mb-10 sm:mb-0 overflow-y-auto">
                    <h1 className="absolute text-sm right-3 opacity-50 cursor-default">Preview</h1>
                    <div className="mt-7 sm:mt-13 text-xl prose prose-invert max-w-none break-words whitespace-pre-wrap">
                        <ReactMarkdown>{title}</ReactMarkdown>
                    </div>
                    <div className="mt-3 sm:mt-14 prose prose-invert max-w-none break-words whitespace-pre-wrap">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}