// getRandomQuote.ts

import {Quote} from '../types/types';

export const getRandomQuote = async (): Promise<Quote> => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data: Quote = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error fetching random quote:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
