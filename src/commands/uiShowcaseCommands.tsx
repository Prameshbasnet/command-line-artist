
import React, { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Check, 
  Boxes, 
  Layers, 
  LayoutGrid,
  PanelRight,
  Sparkles
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";

export const UIShowcase: React.FC = () => {
  const [progress, setProgress] = useState(13);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("cards");

  // Progress demo effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-6 space-y-8">
      <div className="mb-4">
        <h2 className="text-terminal-blue text-xl mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Interactive UI Component Showcase
        </h2>
        <p className="text-terminal-gray mb-4">
          Explore advanced interactive UI components right in your terminal
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-terminal-darkgray bg-opacity-30 border border-terminal-darkgray w-full justify-start">
          <TabsTrigger value="cards" className="data-[state=active]:bg-terminal-blue data-[state=active]:text-terminal-black">
            <LayoutGrid className="w-4 h-4 mr-2" /> Cards
          </TabsTrigger>
          <TabsTrigger value="carousel" className="data-[state=active]:bg-terminal-blue data-[state=active]:text-terminal-black">
            <Layers className="w-4 h-4 mr-2" /> Carousel
          </TabsTrigger>
          <TabsTrigger value="interactive" className="data-[state=active]:bg-terminal-blue data-[state=active]:text-terminal-black">
            <PanelRight className="w-4 h-4 mr-2" /> Interactive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Terminal', icon: 'terminal', description: 'Command-line interface' },
              { title: 'Projects', icon: 'code', description: 'Coding portfolio' },
              { title: 'Games', icon: 'gamepad', description: 'Terminal games' }
            ].map((card, index) => (
              <div key={index} className="bg-terminal-darkgray bg-opacity-50 rounded-md p-4 hover:bg-opacity-70 transition-all hover:translate-y-[-5px] cursor-pointer border border-terminal-darkgray">
                <h4 className="text-terminal-blue mb-2">{card.title}</h4>
                <p className="text-terminal-gray text-sm">{card.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <Badge variant="outline" className="bg-terminal-black text-terminal-green border-terminal-green">
                    {card.icon}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-terminal-blue hover:text-terminal-green">
                    Explore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carousel" className="mt-4">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {[1, 2, 3].map((slide) => (
                <CarouselItem key={slide}>
                  <div className="p-1">
                    <div className="bg-terminal-darkgray bg-opacity-50 rounded-md p-6 text-center border border-terminal-darkgray">
                      <h3 className="text-terminal-blue">Terminal View {slide}</h3>
                      <p className="text-terminal-gray text-sm mt-2">
                        Interactive slide {slide} of 3
                      </p>
                      <div className="mt-4">
                        <AspectRatio ratio={16/9} className="bg-terminal-black rounded border border-terminal-darkgray">
                          <div className="flex items-center justify-center h-full text-terminal-green">
                            Terminal Content {slide}
                          </div>
                        </AspectRatio>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-terminal-darkgray border-terminal-darkgray text-terminal-green hover:bg-terminal-darkgray hover:bg-opacity-70 hover:text-terminal-blue" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-terminal-darkgray border-terminal-darkgray text-terminal-green hover:bg-terminal-darkgray hover:bg-opacity-70 hover:text-terminal-blue" />
            </div>
          </Carousel>
        </TabsContent>

        <TabsContent value="interactive" className="mt-4 space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-terminal-blue text-lg">Progress Indicator</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-terminal-gray">System Status</span>
                  <span className="text-sm text-terminal-blue">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-terminal-black" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-terminal-blue text-lg">Interactive Controls</h3>
              <div className="flex flex-wrap gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border-terminal-blue text-terminal-blue hover:bg-terminal-blue hover:bg-opacity-10">
                      <Check className="mr-2 h-4 w-4" /> Terminal Info
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-terminal-black border border-terminal-darkgray text-terminal-green">
                    <div className="space-y-2">
                      <h4 className="font-medium text-terminal-blue">Terminal Status</h4>
                      <p className="text-sm text-terminal-gray">
                        All systems operational. Type "help" to see available commands.
                      </p>
                      <div className="flex items-center gap-2 text-xs bg-terminal-darkgray bg-opacity-40 p-2 rounded">
                        <Check className="text-terminal-blue h-4 w-4" />
                        <span>Connection secure</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:bg-opacity-10">
                      Advanced Options
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-terminal-black border border-terminal-darkgray text-terminal-green">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-terminal-blue">Terminal Configuration</AlertDialogTitle>
                      <AlertDialogDescription className="text-terminal-gray">
                        Access advanced terminal settings and configurations.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                      <Command className="bg-terminal-darkgray rounded-md">
                        <CommandInput placeholder="Search settings..." className="text-terminal-green" />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup heading="Appearance">
                            <CommandItem className="text-terminal-gray">Font Size</CommandItem>
                            <CommandItem className="text-terminal-gray">Color Theme</CommandItem>
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup heading="Behavior">
                            <CommandItem className="text-terminal-gray">Auto Complete</CommandItem>
                            <CommandItem className="text-terminal-gray">Command History</CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </div>
                    <AlertDialogFooter className="border-t border-terminal-darkgray pt-4">
                      <AlertDialogCancel className="bg-terminal-darkgray text-terminal-gray hover:bg-opacity-70 hover:text-terminal-green border-terminal-darkgray">Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-terminal-blue text-terminal-black hover:bg-opacity-80">Apply Changes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-sm text-terminal-gray mt-6">
        <p>Type <span className="text-terminal-blue">help</span> to return to the main menu</p>
      </div>
    </div>
  );
};

export const showcaseHelp = (
  <div className="mb-4">
    <h2 className="text-terminal-blue mb-2 flex items-center gap-2">
      <Sparkles className="w-4 h-4" /> UI Showcase Commands
    </h2>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <table className="table-auto border-collapse">
        <tbody>
          <tr>
            <td className="pr-4 text-terminal-blue">showcase</td>
            <td className="text-terminal-gray">Display interactive UI components showcase</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
