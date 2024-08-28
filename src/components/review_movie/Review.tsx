// review_movie/Review.tsx

import React from 'react';
import Image from 'next/image';
import { Pirata_One } from '@next/font/google';
import './review.css';
import logo from '../../image/logo-color.png';
import Link from 'next/link';

const pirataOne = Pirata_One({
  weight: '400',
  subsets: ['latin'],
});

// Define the type for the movie prop
interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  id:string;
}

interface ReviewProps {
  movie: Movie[];
  search?: string;

}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Base URL for the images

const Review: React.FC<ReviewProps> = ({ movie, search }) => {


  return (
    <div className={`text-maincolor-text text-center font-serif min-h-screen flex flex-col ${pirataOne.className} p-5`}>

      {movie.length > 0 ? (
        <ul className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
          {movie.map((m, index) => (
            
            <li key={index} className="movie-item text-maincolor-text overflow-hidden">
              {m.poster_path ? (
              <Link href={`/movies/${m.id}`}>
                <Image
                  src={`${IMAGE_BASE_URL}${m.poster_path}`}
                  alt={m.title}
                  width={450}
                  height={700}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }} 
                  />
                  </Link>
              ) : (
              
                <div className="w-full h-full bg-gray-200  items-center justify-center hidden">
                  <p className="text-gray-500 h-64 w-full">No image available</p>
                </div>
              
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-col flex justify-center items-center"> {/* Full-page centering */}
          <h1 className='font-bold font-serif'>Not Found Movies </h1>
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
  );
};

export default Review;
