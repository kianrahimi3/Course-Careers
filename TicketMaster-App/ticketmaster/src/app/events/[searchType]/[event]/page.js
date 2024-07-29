"use client";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { useEffect, useState } from "react";
import { callSearchData, dateOptions } from "@/app/helperFunctions";

export default function Event({params}) {
    const [option, setOption] = useState("Keyword");
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        async function callEvents(searchInput) {
            console.log("about to run function");
            await callSearchData(params.searchType, params.event).then((e) => setData(e));
        }
        
        try {
            const searchInput = params.event.replaceAll('%20', ' ');
            callEvents(searchInput);
        } catch (e) {
            console.log(e);
        }
    }, []);

    

    const searchValue = (e) => {
        //const data = callAllEvents();
        router.push("/events/" + option + "/" + search);
      }; 

    const router = useRouter();
    return (
        <div className="flex flex-col max-h-svh h-screen overflow-hidden">
            <div className="text-center mt-4">
                <form onSubmit={searchValue} onChange={(e) => setSearch(e.target.value)} className="max-w-lg mx-auto">
                <div className="flex">
                    <select id="dropdown-button" onChange={(e) => setOption(e.target.value)}
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" 
                            >All categories

                    <option value="Keyword" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Keyword</option>
                    <option value="Venue" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Venue</option>
                    <option value="City" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">City</option>
                    <option value="Genre" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Genre</option>
                    </select>

                    
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                        <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
                </form>
            </div>

            <Link href="/">Home Page</Link>
            <div>
                <p id="demo"></p>
            </div>
            

            <div className="flex flex-col">
                <div className="flex flex-row justify-center my-7">
                    <a href="/" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        See All Events
                        <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
                
                <div className="grid grid-rows-5 grid-flow-col overflow-x-scroll border-4 border-zinc-600 border-solid rounded-md">
                    {data.map((e) => 
                        <div key={e.id} className="bg-black m-1">
                            <a href={e.url} target="_blank" className="eventListItem flex flex-row items-center">
                                <img id="eventImg" className="object-cover w-full rounded-t-lg h-96 md:h-36 md:w-48 md:rounded-none md:rounded-s-lg" src={e.images[3].url} alt=""></img>
                                <div className="overflow-hidden flex flex-col justify-between p-3 leading-normal">
                                    <h5 className="truncate dark:text-white">{e.name}</h5>
                                    <p className="truncate dark:text-gray-400">{new Date(e.dates.start.dateTime).toLocaleDateString(undefined, dateOptions)}</p>
                                    <p  className="truncate dark:text-gray-400">{e._embedded.venues[0].name}</p>
                                    <p className="truncate dark:text-gray-400">{e._embedded.venues[0].city.name}, {e._embedded.venues[0].state.name}</p>
                                </div>
                            </a>
                        </div>
                        )
                    }
                </div>
            </div>
            

        </div>
    );
}