"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "@/app/baseurl/Base";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Pirata_One } from 'next/font/google';
import {Italiana, Medula_One, Roboto} from "@next/font/google";

const pirataOne = Pirata_One({
  weight: '400',
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: ['400', '700'], // Regular and bold weights
  style: ['normal', 'italic'], // Normal and italic styles
  subsets: ['latin'],
});


export default function MoviePage() {
  interface Movie {
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
  }
  
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `${Base_url}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovie(null);
      }
    }

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <title>{movie.title}</title>
      {/* Apply the pirataOne className to use the font */}
      <h1 className={`text-3xl mt-8 text-maincolor-text font-bold text-center `}>
        {movie.title}
      </h1>
      <div className="min-h-screen flex flex-col justify-center items-center text-maincolor-text font-bold p-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 text-center">
          <div>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              className="rounded-md"
              width={350}
              height={470}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="description w-full md:w-2/5 text-center">
            <h2 className={`text-3xl mb-4 ${pirataOne.className}`}>{movie.title}</h2>
            <p className="mb-2">{movie.overview}</p>
            <hr className="pt-6 mt-6" />
            <p className="p-2">Release Date: {movie.release_date}</p>
            <p>
              Rating: {movie.vote_average}  
              <FontAwesomeIcon icon={faStar} className="text-orange-400 pl-2" />
              <FontAwesomeIcon icon={faStar} className="text-orange-400 pl-1" />
            </p>

            <div className="mt-6">
              <Link
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  movie.title
                )}+movie+watch`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 text-white font-semibold py-2 px-4 rounded"
              >
                Watch Movie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
