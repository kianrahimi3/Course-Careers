"use client";
import { useRouter } from "next/navigation";

export default function User({params}) {
    const router = useRouter();
    return (
        <div>
            <h1>{params.id} Page</h1>
            <button onClick={router.back}>Go Back</button>
        </div>
    );
}