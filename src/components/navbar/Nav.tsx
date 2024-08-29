'use client';

import { Base_url } from '@/app/baseurl/Base';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './nav.css';

import Review from '../review_movie/Review';

export default function Nav() {
    const [data, setdata] = useState<string>('');
    const [movie, setMovie] = useState<any[]>([]);  // Movie array
    const [bool, setbool] = useState<boolean>(false);

    // Fetch popular movies on initial load
// Empty dependency array means this effect runs once on component mount

    async function search(value: string) {
        try {
            const response = await axios.get(`${Base_url}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(value)}`);
            return response.data;
        } catch (error) {
            console.error('Error during search:', error);
            return { results: [] };
        }
    }

    async function getdata(el: React.FormEvent) {
        el.preventDefault();
        if (!data) {
            return;
        }
        const results = await search(data);
        setMovie(results.results);  // Set search results
        setbool(true);  // Show search results
    }

    return (
        <>
            <nav className='text-maincolor-text p-4 text-center'>
                <div className="second flex justify-center">
                    <div className="serach">
                        <form onSubmit={getdata} className='flex'>
                            <input
                                type="search"
                                name="Search"
                                id="search"
                                placeholder='Search for movie'
                                className='text-maincolor-text p-1 text-center mr-2 font-serif bg-transparent'
                                onChange={(e) => setdata(e.target.value)}
                                value={data}
                            />
                            <button type='submit' id='submit' className='bg-blue-800 p-1'>
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {bool && <Review movie={movie} search={data} />}
        </>
    );
}
