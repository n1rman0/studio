
import {genkit} from 'genkit';
// import {googleAI} from '@genkit-ai/googleai'; // Removed Google AI plugin

export const ai = genkit({
  plugins: [], // Removed googleAI() plugin
  // model: 'googleai/gemini-2.0-flash', // Removed model dependent on Google AI
});
