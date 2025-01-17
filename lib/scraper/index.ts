import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractDescription, extractPrice, extractCurrency } from '../utils';

export async function scrapeAmazonProduct(url: string) {
    if (!url) return;

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 33335;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        // Fetching
        const response = await axios.get(url, options)
        const $ = cheerio.load(response.data);
        console.log($)

        // Extracting data 
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        );
        const currentPriceFraction = extractPrice(
            $('.priceToPay .a-price-fraction'),
        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const images = 
            $('#imgBlkFront').attr('data-a-dynamic-image') ||
            $('#landingImage').attr('data-a-dynamic-image') ||
            '{}'

        const imageUrls = Object.keys(JSON.parse(images))

        const currency = extractCurrency($('.a-price-symbol'));

        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');

        const description = extractDescription($);

        const data = {
            url, 
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice + currentPriceFraction) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice + currentPriceFraction),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            stars: 4.5,
            isOutOfStock: outOfStock,
            description,
            reviewsCount: 100,
            lowestPrice: Number(currentPrice + currentPriceFraction) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice + currentPriceFraction),
            averagePrice: Number(currentPrice + currentPriceFraction) || Number(originalPrice),
        }

        return data;
        
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}