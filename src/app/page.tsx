import { AppContextProvider } from '@/components/docuproto/AppContextProvider';
import EventDisplay from '@/components/docuproto/ContextualSuggestions';
import DocumentationDisplay from '@/components/docuproto/DocumentationDisplay';
import FigmaEmbed from '@/components/docuproto/FigmaEmbed';
import TopNavigation from '@/components/docuproto/TopNavigation';

export default function DocuProtoPage() {
  return (
    <AppContextProvider>
      <div className="min-h-screen bg-background">
        <TopNavigation />
        <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
          <div className="w-full lg:w-1/2 p-1 sm:p-2 md:p-4 h-1/2 lg:h-full overflow-hidden">
            <FigmaEmbed />
          </div>
          <div className="w-full lg:w-1/2 p-1 sm:p-2 md:p-4 flex flex-col h-1/2 lg:h-full overflow-hidden">
            <div className="flex-grow mb-4 overflow-hidden">
              <DocumentationDisplay />
            </div>
            <div className="shrink-0">
              <EventDisplay />
            </div>
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
}
