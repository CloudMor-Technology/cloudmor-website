
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, Search, Download, Copy, Palette, Filter, Star, Clock, Shuffle, Grid, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ColorPalette {
  id: string;
  colors: string[];
  tags: string[];
  likes: number;
  views: number;
  downloads: number;
  isLiked: boolean;
  isPopular: boolean;
  isNew?: boolean;
  createdAt: string;
  author: string;
  title?: string;
}

const fetchColorPalettes = async (page: number = 1): Promise<ColorPalette[]> => {
  // Comprehensive mock data with realistic color palettes
  const mockPalettes: ColorPalette[] = [
    // Popular palettes
    { id: '1', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'], tags: ['warm', 'summer', 'tropical'], likes: 2847, views: 15623, downloads: 432, isLiked: false, isPopular: true, isNew: true, createdAt: '2024-01-15', author: 'ColorMaster', title: 'Tropical Sunset' },
    { id: '2', colors: ['#667EEA', '#764BA2', '#F093FB', '#F5576C'], tags: ['gradient', 'purple', 'pink'], likes: 1923, views: 12456, downloads: 298, isLiked: false, isPopular: true, createdAt: '2024-01-12', author: 'DesignGuru', title: 'Purple Dreams' },
    { id: '3', colors: ['#FA8072', '#FFB6C1', '#DDA0DD', '#98FB98'], tags: ['pastel', 'soft', 'spring'], likes: 1456, views: 8934, downloads: 187, isLiked: false, isPopular: true, createdAt: '2024-01-10', author: 'SoftPalette', title: 'Spring Blush' },
    
    // Pastel palettes
    { id: '4', colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9'], tags: ['pastel', 'soft', 'sweet'], likes: 987, views: 5643, downloads: 156, isLiked: false, isPopular: false, createdAt: '2024-01-08', author: 'PastelLover', title: 'Cotton Candy' },
    { id: '5', colors: ['#E6E6FA', '#F0F8FF', '#FFF0F5', '#F5FFFA'], tags: ['pastel', 'light', 'minimal'], likes: 634, views: 3421, downloads: 89, isLiked: false, isPopular: false, createdAt: '2024-01-05', author: 'MinimalArt' },
    { id: '6', colors: ['#F8BBD9', '#E29578', '#FFDAB9', '#C7CEEA'], tags: ['pastel', 'warm', 'cozy'], likes: 743, views: 4567, downloads: 123, isLiked: false, isPopular: false, createdAt: '2024-01-03', author: 'CozyVibes' },
    
    // Dark palettes
    { id: '7', colors: ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6'], tags: ['dark', 'professional', 'modern'], likes: 1234, views: 7890, downloads: 234, isLiked: false, isPopular: true, createdAt: '2024-01-01', author: 'DarkMode', title: 'Corporate Gray' },
    { id: '8', colors: ['#1A1A2E', '#16213E', '#0F3460', '#533483'], tags: ['dark', 'night', 'deep'], likes: 892, views: 4523, downloads: 167, isLiked: false, isPopular: false, createdAt: '2023-12-28', author: 'NightOwl' },
    { id: '9', colors: ['#0D1B2A', '#415A77', '#778DA9', '#E0E1DD'], tags: ['dark', 'blue', 'gradient'], likes: 567, views: 3456, downloads: 98, isLiked: false, isPopular: false, createdAt: '2023-12-25', author: 'BlueShade' },
    
    // Neon palettes
    { id: '10', colors: ['#FF0080', '#00FF80', '#8000FF', '#FF8000'], tags: ['neon', 'electric', 'bright'], likes: 1456, views: 8765, downloads: 345, isLiked: false, isPopular: true, createdAt: '2023-12-20', author: 'NeonGlow', title: 'Electric Dreams' },
    { id: '11', colors: ['#00FFFF', '#FF1493', '#32CD32', '#FFD700'], tags: ['neon', 'cyberpunk', 'futuristic'], likes: 998, views: 6543, downloads: 198, isLiked: false, isPopular: false, createdAt: '2023-12-18', author: 'CyberPunk' },
    
    // Nature palettes
    { id: '12', colors: ['#228B22', '#32CD32', '#7CFC00', '#ADFF2F'], tags: ['nature', 'green', 'fresh'], likes: 756, views: 4321, downloads: 134, isLiked: false, isPopular: false, createdAt: '2023-12-15', author: 'NatureLover' },
    { id: '13', colors: ['#8FBC8F', '#F0E68C', '#DDA0DD', '#F5DEB3'], tags: ['nature', 'earth', 'organic'], likes: 543, views: 2987, downloads: 87, isLiked: false, isPopular: false, createdAt: '2023-12-12', author: 'EarthTones' },
    
    // Warm palettes
    { id: '14', colors: ['#FF8C69', '#FFA07A', '#FFB347', '#FFCCCB'], tags: ['warm', 'sunset', 'orange'], likes: 1123, views: 6754, downloads: 223, isLiked: false, isPopular: true, createdAt: '2023-12-10', author: 'WarmVibes', title: 'Sunset Orange' },
    { id: '15', colors: ['#DC143C', '#FF6347', '#FF4500', '#FF8C00'], tags: ['warm', 'red', 'fire'], likes: 834, views: 5432, downloads: 156, isLiked: false, isPopular: false, createdAt: '2023-12-08', author: 'FirePalette' },
    
    // Cold palettes
    { id: '16', colors: ['#0F3460', '#16537e', '#1e6091', '#266ca9'], tags: ['cold', 'blue', 'ocean'], likes: 967, views: 5876, downloads: 189, isLiked: false, isPopular: true, createdAt: '2023-12-05', author: 'OceanBlue', title: 'Deep Ocean' },
    { id: '17', colors: ['#B0E0E6', '#ADD8E6', '#87CEEB', '#4682B4'], tags: ['cold', 'sky', 'light'], likes: 456, views: 2543, downloads: 76, isLiked: false, isPopular: false, createdAt: '2023-12-03', author: 'SkyBlue' },
    
    // Vintage palettes
    { id: '18', colors: ['#8B4513', '#CD853F', '#DEB887', '#F4A460'], tags: ['vintage', 'retro', 'brown'], likes: 689, views: 3987, downloads: 123, isLiked: false, isPopular: false, createdAt: '2023-12-01', author: 'VintageStyle' },
    { id: '19', colors: ['#A0522D', '#D2691E', '#CD853F', '#DAA520'], tags: ['vintage', 'earth', 'classic'], likes: 456, views: 2345, downloads: 87, isLiked: false, isPopular: false, createdAt: '2023-11-28', author: 'ClassicTones' },
    
    // Gold/Luxury palettes
    { id: '20', colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'], tags: ['gold', 'luxury', 'elegant'], likes: 1234, views: 7654, downloads: 298, isLiked: false, isPopular: true, createdAt: '2023-11-25', author: 'LuxuryGold', title: 'Golden Elegance' },
    
    // More diverse palettes
    { id: '21', colors: ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5'], tags: ['purple', 'pink', 'gradient'], likes: 789, views: 4567, downloads: 145, isLiked: false, isPopular: false, createdAt: '2023-11-22', author: 'PurpleGrad' },
    { id: '22', colors: ['#FF5722', '#FF9800', '#FFC107', '#FFEB3B'], tags: ['orange', 'yellow', 'warm'], likes: 654, views: 3456, downloads: 98, isLiked: false, isPopular: false, createdAt: '2023-11-20', author: 'SunsetWarm' },
    { id: '23', colors: ['#009688', '#4CAF50', '#8BC34A', '#CDDC39'], tags: ['green', 'nature', 'fresh'], likes: 567, views: 2987, downloads: 76, isLiked: false, isPopular: false, createdAt: '2023-11-18', author: 'FreshGreen' },
    { id: '24', colors: ['#607D8B', '#9E9E9E', '#795548', '#8D6E63'], tags: ['neutral', 'brown', 'professional'], likes: 432, views: 2345, downloads: 54, isLiked: false, isPopular: false, createdAt: '2023-11-15', author: 'NeutralPro' },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return paginated results
  const startIndex = (page - 1) * 24;
  const endIndex = startIndex + 24;
  const extendedPalettes = [];
  
  // Duplicate and modify palettes to create more content
  for (let i = 0; i < 15; i++) {
    extendedPalettes.push(...mockPalettes.map(p => ({ 
      ...p, 
      id: `${p.id}_${i}`,
      likes: Math.floor(p.likes * (0.5 + Math.random())),
      views: Math.floor(p.views * (0.5 + Math.random())),
      downloads: Math.floor(p.downloads * (0.5 + Math.random()))
    })));
  }
  
  return extendedPalettes.slice(startIndex, endIndex);
};

const ColorHunt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [allPalettes, setAllPalettes] = useState<ColorPalette[]>([]);
  const [likedPalettes, setLikedPalettes] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const { data: palettes, isLoading, error, refetch } = useQuery({
    queryKey: ['colorhunt-palettes', currentPage],
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

  const tagOptions = [
    'warm', 'cold', 'dark', 'light', 'pastel', 'neon', 'vintage', 'retro', 'modern',
    'nature', 'ocean', 'sky', 'sunset', 'gradient', 'professional', 'elegant', 'luxury',
    'summer', 'winter', 'spring', 'fall', 'tropical', 'minimalist', 'bold', 'soft',
    'purple', 'blue', 'green', 'red', 'orange', 'yellow', 'pink', 'gold', 'brown'
  ];

  const filteredPalettes = useMemo(() => {
    let filtered = allPalettes;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(palette =>
        palette.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        palette.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        palette.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(palette =>
        selectedTags.some(tag => palette.tags.includes(tag))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filtered = filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'downloads':
        filtered = filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'random':
        filtered = [...filtered].sort(() => Math.random() - 0.5);
        break;
    }

    return filtered;
  }, [allPalettes, searchTerm, selectedTags, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleLike = (paletteId: string) => {
    setLikedPalettes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(paletteId)) {
        newSet.delete(paletteId);
      } else {
        newSet.add(paletteId);
      }
      return newSet;
    });
    
    toast({
      title: likedPalettes.has(paletteId) ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} copied to clipboard`,
      duration: 2000,
    });
  };

  const copyPalette = (colors: string[]) => {
    const colorString = colors.join(', ');
    navigator.clipboard.writeText(colorString);
    toast({
      title: "Palette copied!",
      description: `${colorString} copied to clipboard`,
      duration: 2000,
    });
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSearchTerm('');
    setSortBy('popular');
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Palette className="w-8 h-8 text-blue-600" />
            ColorHunt
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover thousands of beautiful color palettes
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search palettes, tags, or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
              
              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Sort By
                </h4>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">🔥 Most Popular</SelectItem>
                    <SelectItem value="newest">🆕 Newest</SelectItem>
                    <SelectItem value="downloads">⬇️ Most Downloaded</SelectItem>
                    <SelectItem value="random">🎲 Random</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* View Mode */}
              <div className="my-6">
                <h4 className="font-medium mb-3">View Mode</h4>
                <RadioGroup value={viewMode} onValueChange={(value: 'grid' | 'list') => setViewMode(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grid" id="grid" />
                    <label htmlFor="grid" className="flex items-center gap-2 cursor-pointer">
                      <Grid className="w-4 h-4" />
                      Grid
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="list" id="list" />
                    <label htmlFor="list" className="flex items-center gap-2 cursor-pointer">
                      <List className="w-4 h-4" />
                      List
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Tag Filters */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">🎯 Tags</h4>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {tagOptions.map((tag) => (
                      <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                        />
                        <span className="text-sm capitalize">{tag}</span>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results count and view toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                Showing {filteredPalettes.length} palette{filteredPalettes.length !== 1 ? 's' : ''}
                {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
              </div>
            </div>

            {isLoading && currentPage === 1 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
                {Array.from({ length: 24 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-32 bg-gray-200 animate-pulse" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 animate-pulse rounded" />
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg">Failed to load color palettes</p>
                <Button onClick={() => refetch()} className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'} mb-8`}>
                  {filteredPalettes.map((palette) => (
                    <Card 
                      key={palette.id} 
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      {/* Color Display */}
                      <div className="relative">
                        <div className={`flex ${viewMode === 'list' ? 'h-16' : 'h-32'}`}>
                          {palette.colors.map((color, index) => (
                            <div
                              key={index}
                              className="flex-1 relative group/color cursor-pointer"
                              style={{ backgroundColor: color }}
                              onClick={() => copyColor(color)}
                            >
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity bg-black bg-opacity-20">
                                <div className="text-white text-xs font-medium bg-black bg-opacity-60 px-2 py-1 rounded">
                                  {color}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Overlay actions */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0"
                            onClick={() => handleLike(palette.id)}
                          >
                            <Heart className={`w-4 h-4 ${likedPalettes.has(palette.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0"
                            onClick={() => copyPalette(palette.colors)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Palette Info */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            {palette.title && (
                              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                                {palette.title}
                              </h3>
                            )}
                            <p className="text-xs text-gray-500">by {palette.author}</p>
                          </div>
                          {palette.isPopular && (
                            <Badge variant="secondary" className="text-xs">
                              🔥 Popular
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {palette.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {palette.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {palette.downloads}
                            </span>
                          </div>
                          <span>{new Date(palette.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Load More Button */}
                {filteredPalettes.length >= currentPage * 24 && !isLoading && (
                  <div className="text-center">
                    <Button onClick={loadMore} size="lg" className="px-8">
                      Load More Palettes
                    </Button>
                  </div>
                )}

                {/* Loading indicator for additional pages */}
                {isLoading && currentPage > 1 && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center">
                      <Clock className="animate-spin w-4 h-4 mr-2" />
                      Loading more palettes...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ColorHunt;
