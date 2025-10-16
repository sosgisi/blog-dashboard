import axios from "axios";

export async function GET() {
    try{
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const data = await res.data;
        if(res.status === 200){
            const slicesData = data.slice(0,11);
            return new Response (JSON.stringify(slicesData), {status: 200});
        }
        return new Response ("Failed to fetch data", {status: 500});
    }catch(err){
        console.log(err);
        return new Response ("Internal Server Error", {status: 500});
    }
}