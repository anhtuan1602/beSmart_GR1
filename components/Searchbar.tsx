'use client'

import { useRouter } from 'next/navigation';
import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react'
import { getAllProducts } from '@/lib/actions';
import Product from '../lib/models/product.model';

const isValidAmazonProductURL = (url: string) => {
    try {
        const parseURL = new URL(url);
        const hostname = parseURL.hostname;

        if (hostname.includes('amazon.com') || 
            hostname.includes('amazon.') ||
            hostname.includes('amazon')) {
            return true;
        }

    } catch (error) {
        return false;
    }

    return false;
}

const Searchbar = () => {
    const router = useRouter()
    const [searchPrompt, setsearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPrompt)

        if (!isValidLink) return alert('Please provide a valid Amazon link')

        try {
            setIsLoading(true)

            //scraping
            const searchingProduct = await scrapeAndStoreProduct(searchPrompt)
                        
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form 
            className ='flex flex-wrap gap-4 mt-12'
            onSubmit={handleSubmit}
        >
            <input 
                type='text'
                value={searchPrompt}
                onChange={(e) => setsearchPrompt(e.target.value)}
                placeholder='Enter product link'
                className='searchbar-input'
            />

            <button 
                type='submit' 
                className='searchbar-btn'
                disabled={searchPrompt === ''}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar