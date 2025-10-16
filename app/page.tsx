'use client'

import Navbar from "@/components/navbar";
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react"

interface Blog {
  userId: number;
  title: string;
  body: string;
}

export default function Home() {

  const [blogs, setBlogs] = useState<Blog[]|null>(null);

  useEffect(() => {
      const fetchData = async () => {
          try{
              const res = await fetch("/HOST");
              const data:Blog[] = await res.json();
              setBlogs(data);
          }catch(err){
              console.log(err);
          }
      }
      fetchData();
  }, [])

  return (
    <>
    <Navbar/>
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 overflow-y-auto">
        { blogs ? blogs.map((blog:any, i:number) => (
          <Card key={i} sx={{ marginBottom: '20px', backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--foreground)' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {blog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ color: 'var(--foreground)' }}>
                {blog.body.length > 50 ? blog.body.substring(0,50) + '...' : blog.body}
              </Typography>
            </CardContent>
          </Card>
        ))
          : 'Loading...'
        }
      </div>
    </div>
    </>
  )
}
