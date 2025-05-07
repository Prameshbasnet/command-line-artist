
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
  PanelRight
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const ReactBitsShowcase: React.FC = () => {
  const [progress, setProgress] = useState(13);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Progress demo effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (section: string) => {
    setExpanded(prev => prev === section ? null : section);
  };

  return (
    <div className="mb-6 space-y-8">
      <div className="mb-4">
        <h2 className="text-terminal-blue text-xl mb-2 flex items-center gap-2">
          <Boxes className="w-5 h-5" /> ReactBits Component Showcase
        </h2>
        <p className="text-terminal-gray mb-4">
          Interactive demo of complex UI components for your terminal portfolio
        </p>
      </div>

      {/* Interactive Card Section */}
      <div className={`bg-terminal-darkgray bg-opacity-30 rounded-md p-4 mb-4 transition-all duration-300 ${expanded === 'cards' ? 'ring-1 ring-terminal-blue' : ''}`}>
        <button 
          onClick={() => toggleExpand('cards')} 
          className="flex justify-between items-center w-full text-left mb-2"
        >
          <h3 className="text-terminal-green flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" /> Interactive Cards
          </h3>
          <span className="text-sm text-terminal-gray">{expanded === 'cards' ? 'Click to collapse' : 'Click to expand'}</span>
        </button>
        
        {expanded === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { title: 'Terminal', icon: 'terminal', description: 'Command-line interface' },
              { title: 'Projects', icon: 'code', description: 'Coding portfolio' },
              { title: 'Games', icon: 'gamepad', description: 'Terminal games' }
            ].map((card, index) => (
              <div key={index} className="bg-terminal-darkgray rounded-md p-4 hover:bg-opacity-70 transition-all hover:translate-y-[-5px] cursor-pointer">
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
        )}
      </div>

      {/* Carousel Section */}
      <div className={`bg-terminal-darkgray bg-opacity-30 rounded-md p-4 mb-4 transition-all duration-300 ${expanded === 'carousel' ? 'ring-1 ring-terminal-blue' : ''}`}>
        <button 
          onClick={() => toggleExpand('carousel')} 
          className="flex justify-between items-center w-full text-left mb-2"
        >
          <h3 className="text-terminal-green flex items-center gap-2">
            <Layers className="w-4 h-4" /> Carousel Component
          </h3>
          <span className="text-sm text-terminal-gray">{expanded === 'carousel' ? 'Click to collapse' : 'Click to expand'}</span>
        </button>
        
        {expanded === 'carousel' && (
          <Carousel className="w-full max-w-xs mx-auto mt-4">
            <CarouselContent>
              {[1, 2, 3].map((slide) => (
                <CarouselItem key={slide}>
                  <div className="p-1">
                    <div className="bg-terminal-darkgray rounded-md p-6 text-center">
                      <h3 className="text-terminal-blue">Slide {slide}</h3>
                      <p className="text-terminal-gray text-sm mt-2">
                        Interactive carousel slide {slide} of 3
                      </p>
                      <div className="mt-4">
                        <AspectRatio ratio={16/9} className="bg-terminal-black rounded">
                          <div className="flex items-center justify-center h-full text-terminal-green">
                            Slide Content {slide}
                          </div>
                        </AspectRatio>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
          </Carousel>
        )}
      </div>

      {/* Progress & Popover Section */}
      <div className={`bg-terminal-darkgray bg-opacity-30 rounded-md p-4 mb-4 transition-all duration-300 ${expanded === 'progress' ? 'ring-1 ring-terminal-blue' : ''}`}>
        <button 
          onClick={() => toggleExpand('progress')} 
          className="flex justify-between items-center w-full text-left mb-2"
        >
          <h3 className="text-terminal-green flex items-center gap-2">
            <PanelRight className="w-4 h-4" /> Progress & Popover
          </h3>
          <span className="text-sm text-terminal-gray">{expanded === 'progress' ? 'Click to collapse' : 'Click to expand'}</span>
        </button>
        
        {expanded === 'progress' && (
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-terminal-gray">Loading Progress</span>
                <span className="text-sm text-terminal-blue">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-terminal-black" />
            </div>
            
            <div className="flex justify-center mt-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-terminal-blue text-terminal-blue hover:bg-terminal-blue hover:bg-opacity-10">
                    <Check className="mr-2 h-4 w-4" /> Click for more info
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-terminal-black border border-terminal-darkgray text-terminal-green">
                  <div className="space-y-2">
                    <h4 className="font-medium text-terminal-blue">ReactBits Components</h4>
                    <p className="text-sm text-terminal-gray">
                      These components demonstrate advanced UI patterns that can be used in your terminal portfolio.
                    </p>
                    <div className="flex items-center gap-2 text-xs bg-terminal-darkgray bg-opacity-40 p-2 rounded">
                      <Check className="text-terminal-blue h-4 w-4" />
                      <span>Type 'reactbits' to see this showcase anytime</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-terminal-gray mt-6">
        <p>Type <span className="text-terminal-blue">help</span> to return to the main menu</p>
      </div>
    </div>
  );
};

export const reactBitsHelp = (
  <div className="mb-4">
    <h2 className="text-terminal-blue mb-2 flex items-center gap-2">
      <Boxes className="w-4 h-4" /> ReactBits Commands
    </h2>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <table className="table-auto border-collapse">
        <tbody>
          <tr>
            <td className="pr-4 text-terminal-blue">reactbits</td>
            <td className="text-terminal-gray">Display interactive ReactBits components showcase</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
