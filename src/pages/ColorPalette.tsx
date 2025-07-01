
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ColorPalette {
  id: string;
  title: string;
  colors: string[];
  tags: string[];
  likes: number;
}

const fetchColorPalettes = async (): Promise<ColorPalette[]> => {
  // Since ColorHunt doesn't provide a public API, we'll simulate data
  // In a real implementation, you would use their API endpoint
  const mockPalettes: ColorPalette[] = [
    {
      id: '1',
      title: 'Sunset Vibes',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
      tags: ['warm', 'sunset', 'tropical'],
      likes: 1247
    },
    {
      id: '2',
      title: 'Ocean Breeze',
      colors: ['#0F3460', '#16537e', '#1e6091', '#266ca9'],
      tags: ['cool', 'ocean', 'blue'],
      likes: 892
    },
    {
      id: '3',
      title: 'Forest Dreams',
      colors: ['#2D5016', '#3E7B27', '#4E9A39', '#5FAD56'],
      tags: ['nature', 'green', 'forest'],
      likes: 1056
    },
    {
      id: '4',
      title: 'Royal Purple',
      colors: ['#4A148C', '#6A1B9A', '#7B1FA2', '#8E24AA'],
      tags: ['purple', 'royal', 'elegant'],
      likes: 743
    },
    {
      id: '5',
      title: 'Autumn Leaves',
      colors: ['#D84315', '#FF5722', '#FF7043', '#FF8A65'],
      tags: ['autumn', 'warm', 'orange'],
      likes: 1189
    },
    {
      id: '6',
      title: 'Mint Fresh',
      colors: ['#00BCD4', '#26C6DA', '#4DD0E1', '#80DEEA'],
      tags: ['fresh', 'mint', 'cyan'],
      likes: 967
    },
    {
      id: '7',
      title: 'Berry Burst',
      colors: ['#AD1457', '#C2185B', '#E91E63', '#F06292'],
      tags: ['berry', 'pink', 'vibrant'],
      likes: 834
    },
    {
      id: '8',
      title: 'Golden Hour',
      colors: ['#FF6F00', '#FF8F00', '#FFA000', '#FFB300'],
      tags: ['golden', 'sunset', 'warm'],
      likes: 1345
    },
    {
      id: '9',
      title: 'Deep Sea',
      colors: ['#01579B', '#0277BD', '#0288D1', '#039BE5'],
      tags: ['deep', 'sea', 'blue'],
      likes: 678
    },
    {
      id: '10',
      title: 'Lavender Fields',
      colors: ['#512DA8', '#673AB7', '#7C4DFF', '#9575CD'],
      tags: ['lavender', 'purple', 'soft'],
      likes: 1023
    },
    {
      id: '11',
      title: 'Coral Reef',
      colors: ['#FF5252', '#FF7043', '#FF8A65', '#FFAB91'],
      tags: ['coral', 'reef', 'warm'],
      likes: 756
    },
    {
      id: '12',
      title: 'Emerald Green',
      colors: ['#00695C', '#00796B', '#00897B', '#26A69A'],
      tags: ['emerald', 'green', 'nature'],
      likes: 889
    }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockPalettes;
};

const ColorPalette = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const { data: palettes, isLoading, error, refetch } = useQuery({
    queryKey: ['colorPalettes'],
    queryFn: fetchColorPalettes,
  });

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Color Palettes Gallery
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover beautiful color combinations for your next design project
          </p>
          <Button onClick={handleRefresh} className="mb-6">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Palettes
          </Button>
        </div>

        <ScrollArea className="h-[800px] w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <Card key={index} className="p-4">
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">Failed to load color palettes</p>
              <Button onClick={handleRefresh} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {palettes?.map((palette) => (
                <Card key={palette.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex h-32">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex-1 cursor-pointer hover:scale-105 transition-transform relative group"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color)}
                          title={`Click to copy ${color}`}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                              {copiedColor === color ? 'Copied!' : color}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{palette.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {palette.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{palette.likes} likes</span>
                        <div className="flex gap-1">
                          {palette.colors.map((color, index) => (
                            <span key={index} className="text-xs font-mono">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </main>

      <Footer />
    </div>
  );
};

export default ColorPalette;
