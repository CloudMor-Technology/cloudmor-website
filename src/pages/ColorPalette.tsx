
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ColorPalette {
  id: string;
  title: string;
  colors: string[];
  tags: string[];
  likes: number;
  category: string;
  isPopular: boolean;
}

const fetchColorPalettes = async (page: number = 1): Promise<ColorPalette[]> => {
  // Extended mock data with more palettes and categories
  const mockPalettes: ColorPalette[] = [
    // Popular palettes
    {
      id: '1',
      title: 'Sunset Vibes',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
      tags: ['warm', 'sunset', 'tropical'],
      likes: 1247,
      category: 'warm',
      isPopular: true
    },
    {
      id: '2',
      title: 'Ocean Breeze',
      colors: ['#0F3460', '#16537e', '#1e6091', '#266ca9'],
      tags: ['cool', 'ocean', 'blue'],
      likes: 892,
      category: 'cold',
      isPopular: true
    },
    // Pastel palettes
    {
      id: '3',
      title: 'Soft Dreams',
      colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9'],
      tags: ['pastel', 'soft', 'dreamy'],
      likes: 756,
      category: 'pastel',
      isPopular: false
    },
    {
      id: '4',
      title: 'Cotton Candy',
      colors: ['#F8BBD9', '#E29578', '#FFDAB9', '#C7CEEA'],
      tags: ['pastel', 'sweet', 'candy'],
      likes: 543,
      category: 'pastel',
      isPopular: false
    },
    // Vintage palettes
    {
      id: '5',
      title: 'Retro Sunset',
      colors: ['#8B4513', '#CD853F', '#DEB887', '#F4A460'],
      tags: ['vintage', 'retro', 'warm'],
      likes: 689,
      category: 'vintage',
      isPopular: false
    },
    {
      id: '6',
      title: 'Old Hollywood',
      colors: ['#2F1B14', '#8B4513', '#D2691E', '#F4A460'],
      tags: ['vintage', 'classic', 'brown'],
      likes: 423,
      category: 'vintage',
      isPopular: false
    },
    // Neon palettes
    {
      id: '7',
      title: 'Electric Night',
      colors: ['#FF0080', '#00FF80', '#8000FF', '#FF8000'],
      tags: ['neon', 'electric', 'bright'],
      likes: 934,
      category: 'neon',
      isPopular: true
    },
    {
      id: '8',
      title: 'Cyber Glow',
      colors: ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00'],
      tags: ['neon', 'cyber', 'futuristic'],
      likes: 678,
      category: 'neon',
      isPopular: false
    },
    // Gold palettes
    {
      id: '9',
      title: 'Golden Hour',
      colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'],
      tags: ['gold', 'luxury', 'warm'],
      likes: 812,
      category: 'gold',
      isPopular: true
    },
    {
      id: '10',
      title: 'Royal Gold',
      colors: ['#B8860B', '#DAA520', '#FFD700', '#FFFF00'],
      tags: ['gold', 'royal', 'elegant'],
      likes: 567,
      category: 'gold',
      isPopular: false
    },
    // Dark palettes
    {
      id: '11',
      title: 'Midnight Blue',
      colors: ['#191970', '#000080', '#00008B', '#483D8B'],
      tags: ['dark', 'midnight', 'blue'],
      likes: 445,
      category: 'dark',
      isPopular: false
    },
    {
      id: '12',
      title: 'Shadow Realm',
      colors: ['#2F2F2F', '#1C1C1C', '#0D0D0D', '#000000'],
      tags: ['dark', 'shadow', 'black'],
      likes: 334,
      category: 'dark',
      isPopular: false
    },
    // Light palettes
    {
      id: '13',
      title: 'Pure White',
      colors: ['#FFFFFF', '#F8F8FF', '#F5F5F5', '#E6E6FA'],
      tags: ['light', 'white', 'clean'],
      likes: 623,
      category: 'light',
      isPopular: false
    },
    {
      id: '14',
      title: 'Cream Dream',
      colors: ['#FFFAF0', '#FDF5E6', '#F5F5DC', '#FAEBD7'],
      tags: ['light', 'cream', 'soft'],
      likes: 456,
      category: 'light',
      isPopular: false
    },
    // Summer palettes
    {
      id: '15',
      title: 'Beach Paradise',
      colors: ['#87CEEB', '#20B2AA', '#FFE4B5', '#F0E68C'],
      tags: ['summer', 'beach', 'tropical'],
      likes: 789,
      category: 'summer',
      isPopular: true
    },
    {
      id: '16',
      title: 'Tropical Juice',
      colors: ['#FF6347', '#FF4500', '#FFA500', '#FFFF00'],
      tags: ['summer', 'tropical', 'juice'],
      likes: 567,
      category: 'summer',
      isPopular: false
    },
    // Fall palettes
    {
      id: '17',
      title: 'Autumn Leaves',
      colors: ['#D2691E', '#CD853F', '#B22222', '#A0522D'],
      tags: ['fall', 'autumn', 'leaves'],
      likes: 678,
      category: 'fall',
      isPopular: false
    },
    {
      id: '18',
      title: 'Harvest Moon',
      colors: ['#FF8C00', '#DC143C', '#B8860B', '#8B4513'],
      tags: ['fall', 'harvest', 'warm'],
      likes: 543,
      category: 'fall',
      isPopular: false
    }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return paginated results (simulate more data by repeating)
  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;
  const allPalettes = [...mockPalettes, ...mockPalettes.map(p => ({ ...p, id: p.id + '_2' }))];
  
  return allPalettes.slice(startIndex, endIndex);
};

const ColorPalette = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [allPalettes, setAllPalettes] = useState<ColorPalette[]>([]);

  const { data: palettes, isLoading, error, refetch } = useQuery({
    queryKey: ['colorPalettes', currentPage],
    queryFn: () => fetchColorPalettes(currentPage),
  });

  useEffect(() => {
    if (palettes) {
      if (currentPage === 1) {
        setAllPalettes(palettes);
      } else {
        setAllPalettes(prev => [...prev, ...palettes]);
      }
    }
  }, [palettes, currentPage]);

  const filteredPalettes = useMemo(() => {
    let filtered = allPalettes;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(palette =>
        palette.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        palette.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'popular':
          filtered = filtered.filter(palette => palette.isPopular);
          break;
        case 'random':
          filtered = [...filtered].sort(() => Math.random() - 0.5);
          break;
        default:
          filtered = filtered.filter(palette => palette.category === selectedFilter);
      }
    }

    return filtered;
  }, [allPalettes, searchTerm, selectedFilter]);

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
    setCurrentPage(1);
    setAllPalettes([]);
    refetch();
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'popular', label: '🔥 Popular' },
    { value: 'random', label: '🎲 Random' },
    { value: 'collection', label: '❤️ Collection' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'retro', label: 'Retro' },
    { value: 'neon', label: 'Neon' },
    { value: 'gold', label: 'Gold' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'warm', label: 'Warm' },
    { value: 'cold', label: 'Cold' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' }
  ];

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
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search palettes by name or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-500 mb-4">
            Showing {filteredPalettes.length} palette{filteredPalettes.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedFilter !== 'all' && ` in ${filterOptions.find(f => f.value === selectedFilter)?.label}`}
          </div>
        </div>

        {isLoading && currentPage === 1 ? (
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredPalettes.map((palette) => (
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
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{palette.title}</h3>
                        {palette.isPopular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
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
                        <span>❤️ {palette.likes} likes</span>
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

            {/* Load More Button */}
            {filteredPalettes.length > 0 && !isLoading && (
              <div className="text-center">
                <Button onClick={loadMore} disabled={isLoading} className="mb-8">
                  {isLoading ? 'Loading...' : 'Load More Palettes'}
                </Button>
              </div>
            )}

            {/* Loading indicator for additional pages */}
            {isLoading && currentPage > 1 && (
              <div className="text-center py-4">
                <div className="inline-flex items-center">
                  <RefreshCw className="animate-spin w-4 h-4 mr-2" />
                  Loading more palettes...
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ColorPalette;
