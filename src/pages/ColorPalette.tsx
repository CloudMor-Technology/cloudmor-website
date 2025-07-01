import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Search, Play, Pause, ArrowUp, ArrowDown } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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
  isNew?: boolean;
  createdAt: string;
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
      isPopular: true,
      isNew: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Ocean Breeze',
      colors: ['#0F3460', '#16537e', '#1e6091', '#266ca9'],
      tags: ['cool', 'ocean', 'blue'],
      likes: 892,
      category: 'cold',
      isPopular: true,
      createdAt: '2024-01-10'
    },
    // Add more palettes with extended categories
    {
      id: '3',
      title: 'Soft Dreams',
      colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9'],
      tags: ['pastel', 'soft', 'dreamy'],
      likes: 756,
      category: 'pastel',
      isPopular: false,
      createdAt: '2023-12-20'
    },
    {
      id: '4',
      title: 'Cotton Candy',
      colors: ['#F8BBD9', '#E29578', '#FFDAB9', '#C7CEEA'],
      tags: ['pastel', 'sweet', 'candy'],
      likes: 543,
      category: 'pastel',
      isPopular: false,
      createdAt: '2023-11-15'
    },
    {
      id: '5',
      title: 'Retro Sunset',
      colors: ['#8B4513', '#CD853F', '#DEB887', '#F4A460'],
      tags: ['vintage', 'retro', 'warm'],
      likes: 689,
      category: 'vintage',
      isPopular: false,
      createdAt: '2023-10-20'
    },
    {
      id: '6',
      title: 'Neon Nights',
      colors: ['#FF0080', '#00FF80', '#8000FF', '#FF8000'],
      tags: ['neon', 'electric', 'bright'],
      likes: 934,
      category: 'neon',
      isPopular: true,
      createdAt: '2024-01-05'
    },
    {
      id: '7',
      title: 'Golden Hour',
      colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'],
      tags: ['gold', 'luxury', 'warm'],
      likes: 812,
      category: 'gold',
      isPopular: true,
      createdAt: '2024-01-12'
    },
    {
      id: '8',
      title: 'Midnight Blue',
      colors: ['#191970', '#000080', '#00008B', '#483D8B'],
      tags: ['dark', 'midnight', 'blue'],
      likes: 445,
      category: 'dark',
      isPopular: false,
      createdAt: '2023-12-01'
    },
    {
      id: '9',
      title: 'Pure White',
      colors: ['#FFFFFF', '#F8F8FF', '#F5F5F5', '#E6E6FA'],
      tags: ['light', 'white', 'clean'],
      likes: 623,
      category: 'light',
      isPopular: false,
      createdAt: '2023-11-20'
    },
    {
      id: '10',
      title: 'Beach Paradise',
      colors: ['#87CEEB', '#20B2AA', '#FFE4B5', '#F0E68C'],
      tags: ['summer', 'beach', 'tropical'],
      likes: 789,
      category: 'summer',
      isPopular: true,
      createdAt: '2024-01-08'
    },
    {
      id: '11',
      title: 'Autumn Leaves',
      colors: ['#D2691E', '#CD853F', '#B22222', '#A0522D'],
      tags: ['fall', 'autumn', 'leaves'],
      likes: 678,
      category: 'fall',
      isPopular: false,
      createdAt: '2023-10-30'
    },
    {
      id: '12',
      title: 'Winter Frost',
      colors: ['#B0E0E6', '#ADD8E6', '#87CEEB', '#4682B4'],
      tags: ['winter', 'frost', 'cold'],
      likes: 456,
      category: 'winter',
      isPopular: false,
      createdAt: '2023-12-15'
    },
    {
      id: '13',
      title: 'Spring Bloom',
      colors: ['#98FB98', '#90EE90', '#FFB6C1', '#FFA07A'],
      tags: ['spring', 'bloom', 'fresh'],
      likes: 567,
      category: 'spring',
      isPopular: false,
      createdAt: '2024-01-03'
    },
    {
      id: '14',
      title: 'Happy Vibes',
      colors: ['#FFD700', '#FF69B4', '#00FA9A', '#FF6347'],
      tags: ['happy', 'bright', 'cheerful'],
      likes: 789,
      category: 'happy',
      isPopular: true,
      createdAt: '2024-01-14'
    },
    {
      id: '15',
      title: 'Nature Green',
      colors: ['#228B22', '#32CD32', '#7CFC00', '#ADFF2F'],
      tags: ['nature', 'green', 'organic'],
      likes: 634,
      category: 'nature',
      isPopular: false,
      createdAt: '2023-12-10'
    },
    {
      id: '16',
      title: 'Earth Tones',
      colors: ['#8B4513', '#A0522D', '#D2691E', '#CD853F'],
      tags: ['earth', 'natural', 'brown'],
      likes: 543,
      category: 'earth',
      isPopular: false,
      createdAt: '2023-11-25'
    },
    {
      id: '17',
      title: 'Night Sky',
      colors: ['#191970', '#000080', '#4B0082', '#483D8B'],
      tags: ['night', 'sky', 'dark'],
      likes: 456,
      category: 'night',
      isPopular: false,
      createdAt: '2023-12-05'
    },
    {
      id: '18',
      title: 'Space Odyssey',
      colors: ['#2F4F4F', '#708090', '#4682B4', '#6495ED'],
      tags: ['space', 'cosmic', 'blue'],
      likes: 378,
      category: 'space',
      isPopular: false,
      createdAt: '2023-11-10'
    },
    {
      id: '19',
      title: 'Rainbow Bright',
      colors: ['#FF0000', '#FFA500', '#FFFF00', '#00FF00'],
      tags: ['rainbow', 'bright', 'colorful'],
      likes: 892,
      category: 'rainbow',
      isPopular: true,
      createdAt: '2024-01-11'
    },
    {
      id: '20',
      title: 'Gradient Sunset',
      colors: ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569'],
      tags: ['gradient', 'sunset', 'warm'],
      likes: 756,
      category: 'gradient',
      isPopular: false,
      createdAt: '2024-01-07'
    },
    {
      id: '21',
      title: 'Sky Blue',
      colors: ['#87CEEB', '#87CEFA', '#00BFFF', '#1E90FF'],
      tags: ['sky', 'blue', 'light'],
      likes: 534,
      category: 'sky',
      isPopular: false,
      createdAt: '2023-12-18'
    },
    {
      id: '22',
      title: 'Sea Breeze',
      colors: ['#20B2AA', '#48D1CC', '#00CED1', '#5F9EA0'],
      tags: ['sea', 'ocean', 'blue'],
      likes: 645,
      category: 'sea',
      isPopular: false,
      createdAt: '2023-12-12'
    },
    {
      id: '23',
      title: 'Kids Playground',
      colors: ['#FF69B4', '#FFD700', '#00FF7F', '#FF4500'],
      tags: ['kids', 'fun', 'bright'],
      likes: 423,
      category: 'kids',
      isPopular: false,
      createdAt: '2023-11-28'
    },
    {
      id: '24',
      title: 'Skin Tones',
      colors: ['#FDBCB4', '#EEA990', '#CC9A76', '#A67C52'],
      tags: ['skin', 'natural', 'warm'],
      likes: 367,
      category: 'skin',
      isPopular: false,
      createdAt: '2023-11-05'
    }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return paginated results
  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;
  const allPalettes = [...mockPalettes, ...mockPalettes.map(p => ({ ...p, id: p.id + '_2' }))];
  
  return allPalettes.slice(startIndex, endIndex);
};

const ColorPalette = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [popularFilter, setPopularFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [allPalettes, setAllPalettes] = useState<ColorPalette[]>([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Apply popular filter (New, Popular with timeframe, Random, Collection)
    if (popularFilter === 'new') {
      filtered = filtered.filter(palette => palette.isNew);
    } else if (popularFilter === 'popular-month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filtered = filtered.filter(palette => 
        palette.isPopular && new Date(palette.createdAt) >= oneMonthAgo
      );
    } else if (popularFilter === 'popular-year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      filtered = filtered.filter(palette => 
        palette.isPopular && new Date(palette.createdAt) >= oneYearAgo
      );
    } else if (popularFilter === 'popular-all') {
      filtered = filtered.filter(palette => palette.isPopular);
    } else if (popularFilter === 'random') {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(palette => palette.category === selectedFilter);
    }

    return filtered;
  }, [allPalettes, searchTerm, selectedFilter, popularFilter]);

  // Limit to 4 rows (12 palettes) initially
  const displayedPalettes = useMemo(() => {
    return filteredPalettes.slice(0, currentPage * 12);
  }, [filteredPalettes, currentPage]);

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

  // Auto-scroll functionality
  const startAutoScroll = () => {
    if (scrollIntervalRef.current) return;
    
    setIsAutoScrolling(true);
    scrollIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollAmount = 2;
        
        if (scrollDirection === 'down') {
          container.scrollTop += scrollAmount;
          if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
            setScrollDirection('up');
          }
        } else {
          container.scrollTop -= scrollAmount;
          if (container.scrollTop <= 0) {
            setScrollDirection('down');
          }
        }
      }
    }, 50);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    setIsAutoScrolling(false);
  };

  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
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
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
    { value: 'spring', label: 'Spring' },
    { value: 'happy', label: 'Happy' },
    { value: 'nature', label: 'Nature' },
    { value: 'earth', label: 'Earth' },
    { value: 'night', label: 'Night' },
    { value: 'space', label: 'Space' },
    { value: 'rainbow', label: 'Rainbow' },
    { value: 'gradient', label: 'Gradient' },
    { value: 'sky', label: 'Sky' },
    { value: 'sea', label: 'Sea' },
    { value: 'kids', label: 'Kids' },
    { value: 'skin', label: 'Skin' },
    { value: 'food', label: 'Food' },
    { value: 'cream', label: 'Cream' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'christmas', label: 'Christmas' },
    { value: 'halloween', label: 'Halloween' }
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
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mb-6">
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
            
            {/* Popular Filter Toggle */}
            <ToggleGroup type="single" value={popularFilter} onValueChange={setPopularFilter} className="flex-wrap">
              <ToggleGroupItem value="all" className="text-sm">All</ToggleGroupItem>
              <ToggleGroupItem value="new" className="text-sm">✨ New</ToggleGroupItem>
              <ToggleGroupItem value="popular-month" className="text-sm">🔥 Popular (Month)</ToggleGroupItem>
              <ToggleGroupItem value="popular-year" className="text-sm">🔥 Popular (Year)</ToggleGroupItem>
              <ToggleGroupItem value="popular-all" className="text-sm">🔥 Popular (All)</ToggleGroupItem>
              <ToggleGroupItem value="random" className="text-sm">🎲 Random</ToggleGroupItem>
              <ToggleGroupItem value="collection" className="text-sm">❤️ Collection</ToggleGroupItem>
            </ToggleGroup>
            
            {/* Category Filter */}
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
            
            <div className="flex gap-2">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              
              <Button onClick={toggleAutoScroll} variant="outline" size="sm">
                {isAutoScrolling ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Auto-Scroll
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Auto-Scroll
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-500 mb-4">
            Showing {displayedPalettes.length} of {filteredPalettes.length} palette{filteredPalettes.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedFilter !== 'all' && ` in ${filterOptions.find(f => f.value === selectedFilter)?.label}`}
          </div>
        </div>

        <div ref={containerRef} className="max-h-[600px] overflow-y-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedPalettes.map((palette) => (
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
                        <div className="flex gap-1">
                          {palette.isPopular && (
                            <Badge variant="secondary" className="text-xs">Popular</Badge>
                          )}
                          {palette.isNew && (
                            <Badge variant="outline" className="text-xs">New</Badge>
                          )}
                        </div>
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
          )}
        </div>

        {/* Load More Button */}
        {displayedPalettes.length < filteredPalettes.length && !isLoading && (
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
      </main>

      <Footer />
    </div>
  );
};

export default ColorPalette;
