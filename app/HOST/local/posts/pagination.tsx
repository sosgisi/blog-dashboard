'use client'

import { allPostsAtom, limitPerPageAtom } from "@/atoms/posts-atom";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Pagination() {

    const allPosts = useAtomValue(allPostsAtom);
    const [limitPerPage, setLimitPerPage] = useAtom(limitPerPageAtom);

    // const totalPages = Math.ceil(posts.length / Number(limitPerPage));

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const currentPage = Number(searchParams.get('page')) || 1;

    const filteredPosts = useMemo(() => {
        if (!query) return allPosts;
        return allPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [allPosts, query]);

    const totalPages = Math.ceil(filteredPosts.length / limitPerPage);
    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    useEffect(() => {
        if(currentPage > totalPages && totalPages > 0){
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', '1');
            router.replace(`${pathname}?${newParams.toString()}`);
        }
    }, [currentPage, totalPages, pathname, router, searchParams]);

    return (
        <>
        <div>
            <label htmlFor="limit" className="mr-2">Posts per page:</label>
            <select name="limit" id="limit" value={limitPerPage} onChange={(e) => setLimitPerPage(Number(e.target.value))} className="border border-gray-500 p-2 rounded-md">
                <option value="5" className="bg-background">5</option>
                <option value="10" className="bg-background">10</option>
                <option value="20" className="bg-background">20</option>
            </select>
        </div>
        <div className="flex justify-start mt-5 w-fit">
            <div className="flex gap-3 rounded-xl shadow-md py-1 px-4">
                {/* Previous button */}
                <Link
                    href={createPageURL(currentPage - 1)}
                    className={`flex items-center gap-1 rounded-md border px-3 py-1 text-sm font-medium transition
                        ${currentPage === 1
                            ? 'cursor-default pointer-events-none border-gray-400 text-gray-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white hover:text-white'}
                    `}
                    aria-disabled={currentPage === 1}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Prev
                </Link>

                {/* Page numbers */}
                {allPages.map((page) => (
                    <Link
                        key={page}
                        href={createPageURL(page)}
                        className={`rounded-md px-3 py-1 text-sm font-medium border transition
                            ${page === currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-white dark:hover:text-white' }
                        `}
                    >
                        {page}
                    </Link>
                ))}

                {/* Next button */}
                <Link
                    href={createPageURL(currentPage + 1)}
                    className={`flex items-center gap-1 rounded-md border px-3 py-1 text-sm font-medium transition
                        ${currentPage === totalPages || totalPages === 0
                            ? 'cursor-default pointer-events-none border-gray-400 text-gray-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white hover:text-white'}
                        `}
                    aria-disabled={currentPage === totalPages}
                >
                    Next
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
        </>
    );
}

{/* <>
        <p className="mx-5">Showing {studentLists?.from} to {studentLists?.to} of {studentLists?.total} entries</p>
        <div className="flex justify-center mx-5 pt-2 pb-5">
            <div className="flex gap-3 rounded-xl shadow-md py-1 px-4">
                <Link href={createPageURL(currentPage - 1)} className={`${!Lists.prev_page_url && 'pointer-events-none opacity-50'} px-3 py-1 rounded-lg hover:bg-green-200 transform duration-200`}>
                    <ArrowLeft />
                </Link>
                { currentPage > 3 && 
                    <>
                    <button onClick={() => handlePageChange(Lists.first_page_url)} className="px-3 py-1 rounded-lg hover:bg-green-100 hover:text-opacity-100 transform duration-200">
                        1
                    </button> 
                    <button className="pointer-events-none border px-3 py-1 rounded-lg hover:bg-green-100 hover:text-opacity-100 transform duration-200">...</button>
                    </>
                }
                { Lists.prev_page_url && <button onClick={() => handlePageChange(Lists.prev_page_url)} className="px-3 py-1 rounded-lg hover:bg-green-100 hover:text-opacity-100 transform duration-200">{Lists.current_page-1}</button> }
                <p className="px-3 py-1 bg-green-600 rounded-lg text-white border-none">{Lists.current_page}</p>
                { Lists.next_page_url && <button onClick={() => handlePageChange(Lists.next_page_url)} className="px-3 py-1 rounded-lg hover:bg-green-100 hover:text-opacity-100 transform duration-200">{Lists.current_page+1}</button> }
                { Lists.current_page < Lists.last_page-3 && 
                    <>
                    <button className="pointer-events-none px-3 py-1 rounded-lg hover:bg-green-100 hover:text-opacity-100 transform duration-200">...</button>
                    <button onClick={() => handlePageChange(Lists.last_page_url)} className="px-3 py-1 rounded-lg hover:bg-green-100 hover:text-opacity-100 transform duration-200">
                        {Lists.last_page}
                    </button> 
                    </>
                }
                <button onClick={() => handlePageChange(Lists.next_page_url)} className={`${!Lists.next_page_url && 'pointer-events-none opacity-50'} px-3 py-1 rounded-lg hover:bg-green-200 transform duration-200`}>
                    <FontAwesomeIcon icon={faChevronRight} /> 
                </button>
            </div>
        </div>
        </> */}