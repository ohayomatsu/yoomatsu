'use server';
/**
 * @fileOverview A Genkit flow to generate engaging video titles and captions for a video editor's portfolio.
 *
 * - generateVideoContentHooks - A function that handles the generation of video content hooks.
 * - GenerateVideoContentHooksInput - The input type for the generateVideoContentHooks function.
 * - GenerateVideoContentHooksOutput - The return type for the generateVideoContentHooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoContentHooksInputSchema = z.object({
  videoDescription: z.string().describe('A brief description of the video content.'),
});
export type GenerateVideoContentHooksInput = z.infer<typeof GenerateVideoContentHooksInputSchema>;

const GenerateVideoContentHooksOutputSchema = z.object({
  title: z
    .string()
    .describe('An engaging and catchy title for the video, suitable for a portfolio.'),
  caption: z
    .string()
    .describe(
      'A concise and descriptive caption for the video, highlighting its key features and impact, suitable for a portfolio.'
    ),
});
export type GenerateVideoContentHooksOutput = z.infer<typeof GenerateVideoContentHooksOutputSchema>;

export async function generateVideoContentHooks(
  input: GenerateVideoContentHooksInput
): Promise<GenerateVideoContentHooksOutput> {
  return generateVideoContentHooksFlow(input);
}

const generateVideoContentHooksPrompt = ai.definePrompt({
  name: 'generateVideoContentHooksPrompt',
  input: {schema: GenerateVideoContentHooksInputSchema},
  output: {schema: GenerateVideoContentHooksOutputSchema},
  prompt: `You are an AI assistant specialized in creating engaging marketing copy for video editors. Your task is to generate a compelling title and a concise, descriptive caption for a video project, suitable for a professional portfolio.

The content should highlight the video's essence and impact, making it appealing to potential clients.

Video Description: {{{videoDescription}}}

Generate an engaging title and a descriptive caption based on the provided video description. The output should be a JSON object with 'title' and 'caption' fields.`,
});

const generateVideoContentHooksFlow = ai.defineFlow(
  {
    name: 'generateVideoContentHooksFlow',
    inputSchema: GenerateVideoContentHooksInputSchema,
    outputSchema: GenerateVideoContentHooksOutputSchema,
  },
  async input => {
    const {output} = await generateVideoContentHooksPrompt(input);
    return output!;
  }
);
