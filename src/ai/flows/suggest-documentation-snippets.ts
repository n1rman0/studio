// This is an AI-powered code! Check carefully before using.
'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests relevant documentation snippets
 * based on the current context and user interactions.
 *
 * - suggestDocumentationSnippets - A function that suggests documentation snippets.
 * - SuggestDocumentationSnippetsInput - The input type for the suggestDocumentationSnippets function.
 * - SuggestDocumentationSnippetsOutput - The return type for the suggestDocumentationSnippets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDocumentationSnippetsInputSchema = z.object({
  currentSection: z
    .string()
    .describe('The name or identifier of the documentation section currently being viewed.'),
  userQuery: z
    .string()
    .optional()
    .describe('The user query related to current documentation section.'),
  interactionHistory: z
    .array(z.string())
    .optional()
    .describe('A list of previous user interactions within the documentation.'),
});

export type SuggestDocumentationSnippetsInput = z.infer<
  typeof SuggestDocumentationSnippetsInputSchema
>;

const SuggestDocumentationSnippetsOutputSchema = z.object({
  suggestedSnippets: z
    .array(z.string())
    .describe(
      'A list of suggested documentation snippets that are relevant to the current section and user interactions.'
    ),
});

export type SuggestDocumentationSnippetsOutput = z.infer<
  typeof SuggestDocumentationSnippetsOutputSchema
>;

export async function suggestDocumentationSnippets(
  input: SuggestDocumentationSnippetsInput
): Promise<SuggestDocumentationSnippetsOutput> {
  return suggestDocumentationSnippetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDocumentationSnippetsPrompt',
  input: {schema: SuggestDocumentationSnippetsInputSchema},
  output: {schema: SuggestDocumentationSnippetsOutputSchema},
  prompt: `You are an AI assistant that suggests relevant documentation snippets based on the current section, user query, and interaction history.

  Current Section: {{{currentSection}}}
  User Query: {{{userQuery}}}
  Interaction History: {{#each interactionHistory}}{{{this}}}\n{{/each}}

  Suggest documentation snippets that would be helpful to the user. Only return actual documentation snippets.  Each snippet should be no more than 3 sentences.
  Respond in markdown format.`,
});

const suggestDocumentationSnippetsFlow = ai.defineFlow(
  {
    name: 'suggestDocumentationSnippetsFlow',
    inputSchema: SuggestDocumentationSnippetsInputSchema,
    outputSchema: SuggestDocumentationSnippetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
