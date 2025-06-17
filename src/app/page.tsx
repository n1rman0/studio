import { AppContextProvider } from '@/components/docuproto/AppContextProvider';
import FigmaEmbed from '@/components/docuproto/FigmaEmbed';
import DocumentationDisplay from '@/components/docuproto/DocumentationDisplay';
import NavigationMenu from '@/components/docuproto/NavigationMenu';
import EventDisplay from '@/components/docuproto/ContextualSuggestions';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SquareTerminal } from 'lucide-react';

export default function DocuProtoPage() {
  return (
    <AppContextProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="p-4 flex items-center gap-2">
              <SquareTerminal className="h-8 w-8 text-primary" />
              <h1 className="font-headline text-2xl font-semibold text-primary">DocuProto</h1>
            </SidebarHeader>
            <SidebarContent className="p-0">
              <NavigationMenu />
            </SidebarContent>
          </Sidebar>

          <SidebarInset>
            <div className="p-2 md:hidden sticky top-0 bg-background z-10 border-b">
               <SidebarTrigger />
            </div>
            <div className="flex flex-col lg:flex-row h-full max-h-[calc(100vh-3.5rem)] lg:max-h-screen overflow-hidden"> {/* Adjust max-h for mobile header */}
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
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AppContextProvider>
  );
}
