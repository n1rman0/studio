export const processMarkdown = (md: string): string => {
  return md
    .replace(/^(#+)\s*(.*)/gm, (_, hashes, text) => `<h${hashes.length} class="font-headline text-${4 - hashes.length}xl mt-${8 - hashes.length} mb-2">${text}</h${hashes.length}>`)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-slate-800 rounded px-1 py-0.5 text-sm">$1</code>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-white rounded-md p-4 text-sm overflow-x-auto"><code>$2</code></pre>')
    .replace(/^-\s(.*)/gm, '<ul class="list-disc pl-5"><li>$1</li></ul>')
    .replace(/^>\s(.*)/gm, '<blockquote class="border-l-4 border-slate-300 pl-4 text-slate-600 italic my-2">$1</blockquote>')
    .replace(/(\d)\.\s(.*)/g, '<ol class="list-decimal pl-5"><li>$2</li></ol>')
    .replace(/\n/g, '<br/>')
    .replace(/<br\/><(h\d|ul|ol|blockquote|pre)/g, '<$1')
    .replace(/<\/li><br\/><li>/g, '</li><li>');
}; 