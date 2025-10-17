import Navbar from "@/components/navbar"
import { Suspense } from "react";
import Pagination from "./pagination";
import { Button } from "@mui/material"
import PostsTable from "./table";

export default async function PostsPage(
    props: {
        searchParams?: Promise<{
            query?: string;
            page?: string;
        }>;
    }
) {

    const searchParams = await props.searchParams;
    const query:string = searchParams?.query || '';
    const currentPage:number = Number(searchParams?.page) || 1;

    return (
        <>
        <Navbar searchBar={true} />
        <div className="mb-10">
            <div className="flex justify-end items-center px-10">
                <Button variant="outlined" color="warning" href="/HOST/local/posts/new">New Post</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 overflow-y-auto">
                <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                    <PostsTable query={query} />
                </Suspense>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row justify-between items-end mx-10">
                <Pagination />
            </div>
        </div>
        </>
    )
}