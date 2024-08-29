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

const Review: React.FC<ReviewProps> = ({ movie ,}) => {
  return (

<>
<h1 className="text-4xl font-bold text-left mt-5 mb-5 p-4 pl-8  text-maincolor-text    ">
Your Movies  :
</h1>
    <div className={`text-maincolor-text font-serif min-h-screen flex flex-col  p-5`}>
      {movie.length > 0 ? (
        <ul className="movie-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {movie.map((m, index) => (

            
            <li key={index} className="movie-item text-maincolor-text overflow-hidden p-4 m-2 rounded ">
              {m.poster_path ? (
                <Link href={`/movies/${m.id}`}>
                  <div className="movie-card p-4 rounded ">
                    <Image
                      src={`${IMAGE_BASE_URL}${m.poster_path}`}
                      alt={m.title}
                      width={300}
                      height={450}
                      className="rounded  shadow-lg"
                      style={{ objectFit: 'cover', width: '300px', height: '450px' }}
                      />
                    <h3 className="text-lg font-bold mt-2 text-maincolor-text text-left">{m.title}</h3>
                    <p className="text-sm text-maincolor-text text-left font-bold font-mono">{m.release_date}</p>
                  </div>
                </Link>
              ) : (
                <div className="movie-card p-4 rounded shadow-lg bg-gray-200  items-center justify-center hidden">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-col flex justify-center items-center">
          <h1 className='font-bold font-serif'>No Movies Found you scroll down and see updates </h1>
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
