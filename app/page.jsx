// pages/index.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Product from '@/components/Product';

export default function Home() {
    const [keyword, setKeyword] = useState(''); //Hook to store the keyword that will be searched
    const [results, setResults] = useState([]); //Hook to store the results
    const [error, setError] = useState(null); //Hook to handle errors

    //Function to handle the scraping process
    const handleScrape = async () => {
        try {
            const response = await axios.get(`/api/scrape?keyword=${keyword}`);
            console.log(response.data);

            setResults(response.data);
        } catch (error) {
            console.error(error);
            setError('An error occurred during the scraping process.');
        }
    };

    return <main className="flex flex-col gap-4 w-full sm:w-4/5 lg:w-2/3 xl:w-3/5 m-auto mb-4 p-4 mt-4 items-center mainContent relative shadow-lg">
        
        <h1 className="text-2xl font-bold">Amazon Scraper</h1>
        <div className="flex gap-4 flex-row w-full">
            {/* Input to write the keyword that will be search */}
            <Input id="keyword"
                type="text"
                label="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            {/* Do the search on click */}
            <Button onClick={handleScrape}>Scrape</Button>
        </div>

        {error
            //If there is a error, show the error message
            ? <p style={{ color: 'red' }}>{error}</p>

            //If there is no error, show the results
            : <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {results.map((product, index) => (
                    <Product product={product} key={index} />
                ))}
            </div>
        }


    </main>

}
