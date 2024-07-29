"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "../app/globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../app//helperFunctions.js";
import { callAllEvents, callMusic, callSports, callArtsAndTheater } from "../app//helperFunctions.js";


var apiKey = process.env.NEXT_PUBLIC_API_KEY;


export default function Home() {
  const router = useRouter();

  const [all, setAll] = useState([]);
  const [music, setMusic] = useState([]);
  const [sports, setSports] = useState([]);
  const [arts, setArts] = useState([]);
  const [option, setOption] = useState("Keyword");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState();

  //console.log("API KEY: " + apiKey);
  var longitude = 0;
    var latitude = 0;

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  useEffect(() => {
    if('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
      })
  }
  });

  useEffect(() => {
    
    async function callEvents() {
      await callAllEvents().then( (allEvents) => setAll(allEvents) );
      await callMusic().then( (music) => setMusic(music) );
      await callSports().then( (sports) => setSports(sports) );
      await callArtsAndTheater().then( (arts) => setArts(arts) );
      
    };

    try {
      callEvents();
      //insertSearchBar();
      console.log(location);
    }
    catch (e) {
      console.log(e);
    }
    
  }, [location]);

  const optionChange = (e) => {
    var value = document.getElementById("dropdown-button").value;
    setOption(e.target.value);
    console.log(option);
  }

  function navigate(option) {
    router.push("/events/" + option );
  }

  const searchValue = (e) => {
    //const data = callAllEvents();
    e.preventDefault();
    router.push("/events/" + option + "/" + search);
  }; 
  
  return (
    <div className="flex flex-col h-svh overflow-auto border-2 border-rose-500">
      
      <div className="flex flex-col border-2">
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

        <div className="flex flex-row justify-evenly max-h-svh h-svh">
          <div className="eventTypeContainer flex">
              <div className="flex flex-row justify-center my-7">
                <a onClick={() => navigate("All")} href="#" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  See All Events
                  <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </a>
              </div>
              
            <div className="eventCardContainer border-4 border-zinc-600 border-solid rounded-md">
              {all.map((e) => 
                  <div key={e.id} className="bg-black m-1">
                    <a href={e.url} target="_blank" className="eventListItem size-full flex flex-col items-center">
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
          

      <div className="eventTypeContainer flex">
          <div className="flex flex-row justify-center my-7">
            <a onClick={() => navigate("Music")} href="#" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See All Music
              <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
          
        <div className="eventCardContainer border-4 border-zinc-600 border-solid rounded-md">
            {music.map((e) => 
                <div key={e.id} className="bg-black m-1">
                  <a href={e.url} target="_blank" className="eventListItem size-full flex flex-col items-center">
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
      
      <div className="eventTypeContainer flex">
          <div className="flex flex-row justify-center my-7">
            <a onClick={() => navigate("Sports")} href="#" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See All Sports
              <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
          
        <div className="eventCardContainer border-4 border-zinc-600 border-solid rounded-md">
            {sports.map((e) => 
                <div key={e.id} className="bg-black m-1">
                  <a href={e.url} target="_blank" className="eventListItem size-full flex flex-col items-center">
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


      <div className="eventTypeContainer flex">
          <div className="flex flex-row justify-center my-7">
            <a onClick={() => navigate("Arts")} href="#" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
              See All Arts
              <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
          
        <div className="eventCardContainer border-4 border-zinc-600 border-solid rounded-md">
            {arts.map((e) => 
                <div key={e.id} className="bg-black m-1">
                  <a href={e.url} target="_blank" className="eventListItem size-full flex flex-col items-center">
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

     <button>Click Me</button>
    </div>
    
      
    </div>
  );
}




/*
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
*/