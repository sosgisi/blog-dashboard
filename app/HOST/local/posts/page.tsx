'use client'

import Navbar from "@/components/navbar"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown";

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export default function PostsPage() {

    const [posts, setPosts] = useState<Post[]|null>(null);

    useEffect(() => {
        const getPosts = async () => {
            const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
            // console.log(storedPosts)
            setPosts(storedPosts);
        }
        getPosts();
    }, [])

    return(
        <>
        <Navbar/>
        <div>
            <div className="flex justify-end items-center px-10">
                <Button variant="outlined" color="warning" href="/HOST/local/posts/new">New Post</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 overflow-y-auto">
                { posts ? posts.map((post:any, i:number) => (
                    <Card key={i} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--foreground)' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" >
                                <ReactMarkdown>{post.title}</ReactMarkdown>
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom sx={{ color: 'var(--foreground) '}}>
                                {post.createdAt && new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line", color: 'var(--foreground)' }}>
                                <ReactMarkdown>{post.content.length > 50 ? post.content.substring(0,50) + '...' : post.content}</ReactMarkdown>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button href={`/HOST/local/posts/${post.id}`} variant="text" size="medium">Detail</Button>
                        </CardActions>
                    </Card>
                ))
                    : 'Loading...'
                }
            </div>
        </div>
        </>
    )
}