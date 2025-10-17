'use client'

import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown";
import { useEffect } from "react"
import { allPostsAtom, displayedPostsAtom, limitPerPageAtom, Post } from "@/atoms/posts-atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";

export default function PostsTable({query}: {query: string}) {

    const setAllPosts = useSetAtom(allPostsAtom);
    const [displayedPosts, setDisplayedPosts] = useAtom(displayedPostsAtom);
    const limitPerPage = useAtomValue(limitPerPageAtom);

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        setAllPosts(storedPosts);

        let filteredPosts = storedPosts;
        if(query){
            filteredPosts = storedPosts.filter((post:Post) => 
                post.title.toLowerCase().replace(/\*/g, '').includes(query.toLowerCase())
            );
        }

        const indexStart = (currentPage - 1) * limitPerPage;
        const indexEnd = indexStart + limitPerPage;
        const paginatedPosts = filteredPosts.slice(indexStart, indexEnd);
        setDisplayedPosts(paginatedPosts);
    }, [limitPerPage, query, currentPage, setAllPosts, setDisplayedPosts])

    return(
        <>
        { displayedPosts.length!==0 ? displayedPosts.map((post:any, i:number) => (
            <Card key={i} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--foreground)' }}>
                <CardContent>
                    <Typography variant="h5" component="div" >
                        <ReactMarkdown>{post.title}</ReactMarkdown>
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom sx={{ color: 'var(--foreground) '}}>
                        {post.createdAt && new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div" sx={{ whiteSpace: "pre-line", color: 'var(--foreground)' }}>
                        <ReactMarkdown>{post.content.length > 50 ? post.content.substring(0,50) + '...' : post.content}</ReactMarkdown>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={`/HOST/local/posts/${post.id}`} variant="text" size="medium">Detail</Button>
                </CardActions>
            </Card>
        ))
            : <div className="col-span-full text-center text-2xl font-semibold text-foreground/70 mt-10">No Posts are available.</div>
        }
        </>
    )
}