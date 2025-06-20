import { AppContextProvider } from '@/components/docuproto/AppContextProvider';
import EventDisplay from '@/components/docuproto/ContextualSuggestions';
import DocumentationDisplay from '@/components/docuproto/DocumentationDisplay';
import FigmaEmbed from '@/components/docuproto/FigmaEmbed';
import TopNavigation from '@/components/docuproto/TopNavigation';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';

export default function DocuProtoPage() {
  return (
    <AppContextProvider>
      <div className="h-screen flex flex-col w-full overflow-hidden">
        <TopNavigation />
        <SidebarProvider defaultOpen={true}>
          <div className="flex flex-1 w-full overflow-hidden">
            <SidebarInset className="w-full overflow-hidden flex flex-col">
              <div className="p-2 md:hidden bg-background z-10 border-b shrink-0">
                <SidebarTrigger />
              </div>
              <div className="flex flex-col lg:flex-row flex-1 w-full overflow-hidden">
                <div className="w-full lg:w-1/2 p-2 md:p-4 h-full overflow-hidden flex-shrink-0">
                  <div className="h-full overflow-hidden">
                    <FigmaEmbed />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 p-2 md:p-4 flex flex-col h-full overflow-hidden flex-shrink-0">
                  <div className="flex-grow overflow-hidden mb-4">
                    <DocumentationDisplay />
                  </div>
                  <div className="shrink-0">
                    <EventDisplay />
                  </div>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </AppContextProvider>
  );
}
