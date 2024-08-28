'use client'

import { Base_url } from '@/app/baseurl/Base';
import axios from 'axios';
import { useState } from 'react';
import './nav.css'

import Review from '../review_movie/Review';
import logo from '../../image/logo-color.png';
import Image from 'next/image';
import { useRef } from 'react';

export default function Nav() {
    const [data, setdata] = useState<string>('');
    const [movie, setMovie] = useState<any[]>([]);  // Assuming movie is an array of objects
    let [bool ,setbool ]=useState<boolean>(false);
    let [apper ,setapper ]=useState<boolean>(true);
    async function search(value: string) {
        try {
            const response = await axios.get(`${Base_url}/search/movie?api_key=6f90a5f0dc0168ebbbc0a517b3611f90&query=${encodeURIComponent(value)}`);
            return response.data; 
        } catch (error) {
            console.error('Error message:', error);
            return { results: [] };  
        }
    }

    async function getdata(el: React.FormEvent) {
        el.preventDefault();
        if (!data) {
            return;
        }
        const results = await search(data);
        setMovie(results.results);  // Access results from the returned data
    }
let check=()=> {
    setbool(!bool);
    setapper(!apper);
    
    }



  return (
    <>
    <nav  className=' text-maincolor-text   p-4 text-center  '  >
        
        <div className="second flex justify-center">
            <div className="serach ">
                <form onSubmit={getdata} className='flex' >
                <input type="search"
                name="Search" 
                id="search"
                placeholder='Search for movie' 
                className='text-black_color-black p-1 text-center mr-2 font-serif' 
                onChange={(e)=>setdata(e.target.value)}
                value={data}
                />
                <button type='submit' id='submit' className='bg-blue-800 p-1 '  onClick={check} >
                    Search
                </button>
                </form>
                
            </div>
        </div>
    
        
    </nav>
    {apper &&     
      <div className="flex-grow flex justify-center items-center">
            <Image
              src={logo}
              alt="Logo"
              width={500}
              height={500}
              className="block"
            />
        </div>
        }      
    {
        bool&& <Review movie={movie}  search={data} />
        
    }
    </>
)
}
