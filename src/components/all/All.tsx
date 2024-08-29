"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "@/app/baseurl/Base";
import './all.css'
interface Movie {
    title: string;
    overview: string;
    poster_path: string;
    id: string;
    release_date: string;
  }
  
  interface ReviewProps {
    movie: Movie[];
    search?: string;
  }
  
export default function All() {
    const [movies, setMovies] = useState<any[]>([]);  // Movie array

    useEffect(() => {
        async function fetchPopularMovies() {
            try {
                const response = await axios.get(`${Base_url}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
                setMovies(response.data.results);  // Set popular movies
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            }
        }

        fetchPopularMovies();
    }, []);  // Empty dependency array means this effect runs once on component mount



    
    return (
        <>
       <h1 className="text-4xl font-bold text-left mt-5 mb-5 p-4 pl-8  text-maincolor-text    ">
    Recent Movie :
</h1>
        <div className="movie-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
                <Link href={`/movies/${movie.id}`} key={movie.id}>
                    <div className="movie-card p-4 m-2 rounded ">
                    
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={300}
                            height={450}
                            className="rounded"
                        />
                        <h3 className="text-lg font-bold mt-2 text-maincolor-text">{movie.title}</h3>
                        <p className="text-sm text-maincolor-text">{movie.release_date}</p>
                    </div>
                </Link>
            ))}
        </div>
        </>

    );
}
