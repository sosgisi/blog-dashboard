import { SearchRounded } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search({placeholder}: {placeholder: string}) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (q: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if(q){
            params.set('query', q);
        }else{
            params.delete('query');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative w-full p-5 pt-0 sm:p-0">
            <SearchRounded className="absolute left-8 sm:left-3 top-[10px] opacity-50"/>
            <input 
                type="text" 
                placeholder={placeholder} 
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-foreground/20 focus:outline-none focus:ring focus:ring-foreground/50 bg-background/50 text-foreground outline-none"
            />
        </div>
    )
}