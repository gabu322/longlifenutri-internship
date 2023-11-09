// pages/api/scrape.js
import axios from 'axios';
import * as cheerio from 'cheerio';

export const GET = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const param = searchParams.get('keyword')

        // Fetch Amazon search results page
        const response = await axios.get(`https://www.amazon.com/s?k=${param}`);
        const html = response.data;

        // Use cheerio to parse HTML
        const $ = cheerio.load(html);

        // Extract product details
        const products = [];
        $('.s-result-item').each((index, element) => {
            const title = $(element).find('h2 a span').text();
            const rating = $(element).find('.a-icon-star-small .a-icon-alt').text();
            const reviews = $(element).find('span a span.a-size-base').text();
            const imageUrl = $(element).find('.s-image').attr('src');
            const price = $(element).find('.a-price-symbol').text() + $(element).find('.a-price-whole').text() + $(element).find('.a-price-fraction').text();

            products.push({ title, rating, reviews, imageUrl, price });
        });

        // Create a new array to store filtered products
        const filteredProducts = products.filter((product) => {
            return !(product.title === '' || product.rating === '' || product.reviews === '' || product.imageUrl === '' || product.price === '');
        });

        console.log("FILTERED PRODUCTS");
        console.log(filteredProducts);

        // Return the extracted data in JSON format
        return new Response(JSON.stringify(filteredProducts), { status: 200 });
    } catch (error) {
        console.error(error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
