import apodImg from "@/assets/images/projects/apod.png";
import cryptocoinImg from "@/assets/images/projects/cryptocoin.png";
import fitnessPalImg from "@/assets/images/projects/fitness-pal.png"
import foreverConnectedImg from "@/assets/images/projects/forever-connected.png"
import funbxImg from "@/assets/images/projects/funbx.png"
import gymStudioImg from "@/assets/images/projects/gym-studio.png";
import ihubImg from "@/assets/images/projects/ihub.png"
import platfomImg from "@/assets/images/projects/platfom.png"
import taskManagerImg from "@/assets/images/projects/task-manager.png";

export const projectsData = {
  featured: [
    {
      id: "funbx",
      title: "FunBx",
      category: "Personal product / Full-stack",
      summary: "A video experience that grew into an entertainment platform.",
      description:
        "Video discovery, browser games and a personal library. I connected the experience with server-rendered pages, authenticated sessions and user-scoped likes, subscriptions and history.",
      image: funbxImg,
      imageAlt: "FunBx video and gaming website",
      technologies: ["Next.js", "Firebase", "Supabase", "Cloudinary"],
      link: "https://funbx.obinestotech.com/",
      linkLabel: "Explore",
      source: "https://github.com/obinesto/funbx",
      detail:
        "Firebase session cookies support authenticated requests. Supabase stores user activity, Cloudinary handles uploads, and GamePix brings browser games into the same experience.",
    },
    {
      id: "task",
      title: "TaskManager",
      category: "Personal product / Full-stack",
      summary: "From a list of tasks to a connected application.",
      description:
        "A task-management application that brings everyday workflows together with authentication, persistent data and a responsive interface.",
      image: taskManagerImg,
      imageAlt: "TaskManager application interface",
      technologies: ["React", "Express", "MongoDB", "TanStack Query"],
      link: "https://task-manager.obinestotech.com/",
      linkLabel: "Explore",
      source: "https://github.com/obinesto/task-manager",
      detail:
        "A React client connects to an Express API and MongoDB. TanStack Query manages server state, Redux manages client state, and the application supports Google sign-in alongside its task workflows.",
    },
    {
      id: "carousel",
      title: "React Infinite Scroll Carousel",
      category: "Open source / Component engineering",
      summary:
        "A typed React component for a repeating, responsive experience.",
      description:
        "I built a generic carousel API with ESM and CommonJS outputs, responsive looping, and tests for edge cases and lifecycle cleanup.",
      technologies: ["React", "TypeScript", "Jest", "Testing Library"],
      link: "https://www.npmjs.com/package/@obinesto/react-infinite-scroll-carousel",
      linkLabel: "Explore",
      source: "https://github.com/obinesto/react-infinite-scroll-carousel",
      detail:
        "The work includes timer and ResizeObserver cleanup, typed props, and tests around boundary conditions. The interactive sketch alongside this description illustrates the looping idea.",
    },
    {
      id: "ihub",
      title: "Ihub",
      category: "Commerce demo / Frontend",
      summary: "An entire shopping journey, connected by one catalog.",
      description:
        "Product discovery, cart, checkout and customer dashboards in a responsive storefront. Connected customer journey with an admin catalog editor and a Paystack checkout integration.",
      image: ihubImg,
      imageAlt: "Ihub electronics storefront",
      technologies: ["JavaScript", "HTML & CSS", "Paystack", "Bootstrap"],
      link: "https://ihub.obinestotech.com/",
      linkLabel: "Explore",
      source: "https://github.com/obinesto/ihub",
      detail:
        "A shared catalog powers listings, search, cart, checkout and receipts. This is a static demo: customer accounts, orders and inventory state are stored in the browser’s localStorage. Checkout supports a Paystack modal and a pay-on-delivery flow.",
    },
    {
      id: "forever-connected",
      title: "Forever Connected",
      category: "Wedding website / Full-stack",
      summary: "A celebration that needed more than an invitation.",
      description:
        "A wedding website bringing the couple’s story, event schedule, guest responses, accommodation and shared memories into one experience.",
      image: foreverConnectedImg,
      imageAlt: "Forever Connected wedding website for Franklin and Cynthia",
      technologies: ["React", "React Router", "Motion", "Playwright"],
      link: "https://franklin-cynthia-wedding.vercel.app/",
      linkLabel: "Explore",
      source: "https://github.com/obinesto/", //leads to my github because the repo is private
      detail:
        "Guest-response forms connect to a separate API, with a client view for reviewing responses. Date-aware content carries the site beyond the wedding day.",
    },
  ],
  extras: [
    {
      id: "apod",
      title: "Apod",
      category: "API-powered exploration",
      description:
        "A focused React application for exploring NASA’s Astronomy Picture of the Day.",
      image: apodImg,
      technologies: ["React", "Vite", "Tailwind CSS", "NASA API"],
      link: "https://apod-cyprianobi.vercel.app/",
      source: "https://github.com/obinesto/apod",
    },
    {
      id: "cryptocoin",
      title: "Cryptocoin",
      category: "Progressive web application",
      description:
        "A progressive web application for browsing cryptocurrency market data from CoinGecko.",
      image: cryptocoinImg,
      technologies: ["React", "Vite", "CoinGecko API", "PWA"],
      link: "https://cryptocoin-cyprianobi.vercel.app/",
      source: "https://github.com/obinesto/cryptocoin",
    },
    {
      id: "gym",
      title: "Gym Studio",
      category: "Fitness website",
      description:
        "A responsive fitness-studio website built with HTML, CSS and JavaScript, including an OpenStreetMap location view.",
      image: gymStudioImg,
      technologies: ["HTML", "CSS", "JavaScript", "OpenStreetMap"],
      link: "https://gym-studio-cyprianobi.vercel.app/",
      source: "https://github.com/obinesto/gym-studio",
    },
    {
      id: "fitness-pal",
      title: "Fitness Pal",
      category: "Workout generator",
      description:
        "A workout-planning demo that turns a chosen workout type, muscle groups and goal into an exercise routine.",
      image: fitnessPalImg,
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      link: "https://fitness-pal-cyprianobi.vercel.app/",
      source: "https://github.com/obinesto/fitness-pal",
    },
    {
      id: "platfom",
      title: "Platfom",
      category: "Product concept / Landing page",
      description:
        "A responsive marketing concept for a WhatsApp messaging platform, built with typed components and animated product storytelling.",
      image: platfomImg,
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
      link: "https://platfom.obinestotech.com/",
      source: "https://github.com/obinesto/platfom",
    },
  ],
  more: "https://github.com/obinesto?tab=repositories",
};

export const slides = [
  {
    number: "01",
    word: "Move.",
    detail: "Responsive by design",
    color: "blue",
  },
  {
    number: "02",
    word: "Loop.",
    detail: "A continuous experience",
    color: "lime",
  },
  {
    number: "03",
    word: "Repeat.",
    detail: "Small component. Many possibilities.",
    color: "coral",
  },
];
