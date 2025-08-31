import flowData from './integration-flow.json';
import { z } from 'zod';

// A simple markdown-to-HTML converter
const processMarkdown = (md: string): string => {
    return md
        .replace(/^(#+)\s*(.*)/gm, (_, hashes, text) => `<h${hashes.length} class="font-headline text-${4 - hashes.length}xl mt-${8 - hashes.length} mb-2">${text}</h${hashes.length}>`)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-slate-800 rounded px-1 py-0.5 text-sm">$1</code>')
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-white rounded-md p-4 text-sm overflow-x-auto"><code>$2</code></pre>')
        .replace(/^-\s(.*)/gm, '<ul class="list-disc pl-5"><li>$1</li></ul>') // Basic list support
        .replace(/^>\s(.*)/gm, '<blockquote class="border-l-4 border-slate-300 pl-4 text-slate-600 italic my-2">$1</blockquote>')
        .replace(/(\d)\.\s(.*)/g, '<ol class="list-decimal pl-5"><li>$2</li></ol>') // Basic ordered list support
        .replace(/\n/g, '<br/>')
        .replace(/<br\/><(h\d|ul|ol|blockquote|pre)/g, '<$1') // Correct spacing for block elements
        .replace(/<\/li><br\/><li>/g, '</li><li>');
};

// Zod schema to validate flow data
const StepSchema = z.object({
    id: z.string(),
    title: z.string(),
    right_md: z.string(),
    left: z.any(), // Keep flexible; only minimal shape validation is required now
});

const FlowSchema = z.object({
    steps: z.array(StepSchema)
});

const parsedFlow = FlowSchema.parse(flowData);

export interface DocSection {
    id: string;
    title: string;
    content: string; // HTML content
    left: any; // Keeping this flexible to match the JSON structure
    iconName?: string;
}

const steps = parsedFlow.steps.map(step => {
    let iconName = 'BookOpen';
    if (step.id.includes('SERVER')) iconName = 'Database';
    else if (step.id.includes('GOLIVE')) iconName = 'Rocket';
    else if (step.id.includes('ORDER')) iconName = 'Settings';
    else if (step.id.includes('CHECKOUT')) iconName = 'CreditCard';
    else if (step.id.includes('PAYMENT')) iconName = 'ShieldCheck';

    return {
        id: step.id,
        title: step.title,
        content: processMarkdown(step.right_md),
        left: step.left,
        iconName: iconName,
    };
});

export const IOS_DOCUMENTATION: DocSection[] = steps;
