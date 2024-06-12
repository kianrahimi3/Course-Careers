"use client";
import { Post } from "@/components/Post";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Home() {
    const [userId, setUserId] = useState("");
    const router = useRouter();

    function navigate() {
        router.push("/user/" + userId);
    } 

    return (
        <div>
            <Link href="/about/contact">Contact</Link>
            <Link href="/about">About</Link>
            
            <div>
                <input type="text" placeholder="User ID"  onChange={(e) => (setUserId(e.target.value))}></input>
            </div>
            <button onClick={navigate}>Go to Profile</button>
            
        </div>
    );
}
