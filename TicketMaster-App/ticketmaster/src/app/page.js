"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/components/page.module.css";

var apiKey = process.env.NEXT_PUBLIC_API_KEY;


export default function Home() {
  const [data, setData] = useState([]);
  const [music, setMusic] = useState([]);
  const [sports, setSports] = useState([]);
  const [arts, setArts] = useState([]);
  //console.log("API KEY: " + apiKey);

  async function callSports() {
    await fetch("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&segmentId=KZFzniwnSyZfZ7v7nE&apikey=" + apiKey)
      .then((data => data.json()))
      .then((data) => {
        //console.log(data);
        const temp = data._embedded.events;
        setSports(temp);
      })
      .catch(setSports([]));
  };

  async function callMusic() {
    await fetch("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&segmentId=KZFzniwnSyZfZ7v7nJ&apikey=" + apiKey)
      .then((data => data.json()))
      .then((data) => {
        console.log(data);
        const temp = data._embedded.events;
        setMusic(temp);
      })
      .catch(setMusic([]));
  };

  async function callArtsAndTheater() {
    await fetch("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&segmentId=KZFzniwnSyZfZ7v7na&apikey=" + apiKey)
      .then((data => data.json()))
      .then((data) => {
        //console.log(data);
        const temp = data._embedded.events;
        setArts(temp);
      })
      .catch(setArts([]));
  };

  async function callEvents() {
    await fetch("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=" + apiKey)
      .then((data) => data.json())
      //.then((data) => JSON.stringify(data))
      .then((data) => {
        //console.log(data);
        const temp = data._embedded.events;
        setData(temp);
      });


      await callMusic();
      await callSports();
      await callArtsAndTheater();
  }

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  return (
    <div>
        <div className="text-center">
          <h1>Hello Kian</h1>
          <h2>This will be the TicketMaster API</h2>
          <button type="button" onClick={() => {callEvents() }}>Click me mister</button>
          
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col items-center m-2">
          <ul>
            {data.map((e) => 
                <li id="eventListItem" key={e.id} className="m-1">
                  <a href={e.url} target="_blank" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <img id="eventImg" className="object-cover w-full rounded-t-lg h-96 md:h-36 md:w-48 md:rounded-none md:rounded-s-lg" src={e.images[3].url} alt=""></img>
                      <div className="flex flex-col justify-between p-4 leading-normal">
                          <h5 id="eventName" className="dark:text-white">{e.name}</h5>
                          <p id="eventDescription" className="dark:text-gray-400">{new Date(e.dates.start.dateTime).toLocaleDateString(undefined, dateOptions)}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{e._embedded.venues[0].name}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{e._embedded.venues[0].city.name}, {e._embedded.venues[0].state.name}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{JSON.stringify(e.classifications[0].segment.name)}</p>

                      </div>
                  </a>
                </li>
              )
            }
          </ul>
        </div>

        <div className="flex flex-col items-center m-2">
          <ul>
            {music.map((e) => 
                <li id="eventListItem" key={e.id} className="m-1">
                  <a href={e.url} target="_blank" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <img id="eventImg" className="object-cover w-full rounded-t-lg h-96 md:h-36 md:w-48 md:rounded-none md:rounded-s-lg" src={e.images[3].url} alt=""></img>
                      <div className="flex flex-col justify-between p-4 leading-normal">
                          <h5 id="eventName" className="dark:text-white">{e.name}</h5>
                          <p id="eventDescription" className="dark:text-gray-400">{new Date(e.dates.start.dateTime).toLocaleDateString(undefined, dateOptions)}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{e._embedded.venues[0].name}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{e._embedded.venues[0].city.name}, {e._embedded.venues[0].state.name}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{JSON.stringify(e.classifications[0].segment.name)}</p>

                      </div>
                  </a>
                </li>
              )
            }
          </ul>
        </div>
        
        <div className="flex flex-col items-center m-2">
          <ul>
            {sports.map((e) => 
                <li id="eventListItem" key={e.id} className="m-1">
                  <a href={e.url} target="_blank" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <img id="eventImg" className="object-cover w-full rounded-t-lg h-96 md:h-36 md:w-48 md:rounded-none md:rounded-s-lg" src={e.images[3].url} alt=""></img>
                      <div className="flex flex-col justify-between p-4 leading-normal">
                          <h5 id="eventName" className="dark:text-white">{e.name}</h5>
                          <p id="eventDescription" className="dark:text-gray-400">{new Date(e.dates.start.dateTime).toLocaleDateString(undefined, dateOptions)}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{e._embedded.venues[0].name}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{e._embedded.venues[0].city.name}, {e._embedded.venues[0].state.name}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{JSON.stringify(e.classifications[0].segment.name)}</p>

                      </div>
                  </a>
                </li>
              )
            }
          </ul>
        </div>


        <div className="flex flex-col items-center m-2">
          <ul>
            {arts.map((e) => 
                <li id="eventListItem" key={e.id} className="m-1">
                  <a href={e.url} target="_blank" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <img id="eventImg" className="object-cover w-full rounded-t-lg h-96 md:h-36 md:w-48 md:rounded-none md:rounded-s-lg" src={e.images[3].url} alt=""></img>
                      <div className="flex flex-col justify-between p-4 leading-normal">
                          <h5 id="eventName" className="dark:text-white">{e.name}</h5>
                          <p id="eventDescription" className="dark:text-gray-400">{new Date(e.dates.start.dateTime).toLocaleDateString(undefined, dateOptions)}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{e._embedded.venues[0].name}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{e._embedded.venues[0].city.name}, {e._embedded.venues[0].state.name}</p>
                          <p id="eventDescription" className="dark:text-gray-400">{JSON.stringify(e.classifications[0].segment.name)}</p>

                      </div>
                  </a>
                </li>
              )
            }
          </ul>
        </div>

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