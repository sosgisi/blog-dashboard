import { idAtom } from "@/app/HOST/local/posts/[ID]/page";
import { toastAtom } from "@/atoms/toast-atom";
import { Button } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function DeleteConfirmation({setDeleteClicked}: {setDeleteClicked?: (val: boolean) => void}) {

    const router = useRouter();

    const id = useAtomValue(idAtom);
    const setToasts = useSetAtom(toastAtom)
    
    const handleDelete = (e:React.FormEvent) => {
        e.preventDefault();

        const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');

        const updatedPosts = storedPosts.filter((p: {id: number}) => p.id !== id);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));

        setToasts((prev) => [...prev, {id: Date.now(), message: "Post deleted successfully!", type: "success"}]);

        router.push('/HOST/local/posts');
        return;
    }

    const handleCancel = (e:React.FormEvent) => {
        e.preventDefault();
        if(setDeleteClicked) setDeleteClicked(false);
    }

    return (
        <>
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete this post? This action cannot be undone.</p>
                <div className="flex justify-end gap-4">
                    <Button onClick={handleCancel} variant="contained">Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </div>
            </div>
        </div>
        </>
    );
}