import React from 'react';
import Image from 'next/image';
import { Pirata_One } from '@next/font/google';
import './review.css';
import logo from '../../image/logo-color.png';
import Link from 'next/link';

// Define the type for the movie prop
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

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Base URL for the images

const Review: React.FC<ReviewProps> = ({ movie }) => {
  return (
    <>
      <h1 className="text-4xl  font-bold text-left p-4 pl-8 text-maincolor-text lol mt-32">
        Your Movies:
      </h1>
      <div className="text-maincolor-text font-serif min-h-screen flex flex-col p-5">
        {movie.length > 0 ? (
          <div className="movie-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {movie.map((m) => (
              <Link href={`/movies/${m.id}`} key={m.id}>
                <div className="movie-card p-4 m-2 rounded ">
                  {m.poster_path ? (
                    <>
                    <Image
                      src={`${IMAGE_BASE_URL}${m.poster_path}`}
                      alt={m.title}
                      width={300}
                      height={450}
                      className="rounded"
                      />
                    <h3 className="text-lg font-bold mt-2 text-maincolor-text">{m.title}</h3>
                    <p className="text-sm text-maincolor-text">{m.release_date}</p>
                      </>
                  ) : (
                    <>
                    <Image
                    src={logo}
                    alt={m.title}
                    width={300}
                    height={450}
                    className="rounded"
                    />
                                        <h3 className="text-lg font-bold mt-2 text-maincolor-text">{m.title}</h3>
                                        <p className="text-sm text-maincolor-text font-serif">{m.release_date}</p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex-col flex justify-center items-center">
            <h1 className="font-bold font-serif">No Movies Found. Scroll down to see updates.</h1>
            <div className="flex-grow flex justify-center items-center">
              <Image
                src={logo}
                alt="Logo"
                width={500}
                height={500}
                className="block"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Review;
