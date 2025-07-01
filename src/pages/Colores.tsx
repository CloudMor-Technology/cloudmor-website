import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RefreshCw, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ColorPalette {
  id: string;
  colors: string[];
  tags: string[];
  likes: number;
  isPopular: boolean;
  isNew?: boolean;
  createdAt: string;
}

const fetchColorPalettes = async (page: number = 1): Promise<ColorPalette[]> => {
  // Comprehensive mock data with 4-color palettes
  const mockPalettes: ColorPalette[] = [
    // Pastel palettes
    { id: '1', colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9'], tags: ['pastel', 'soft'], likes: 1247, isPopular: true, isNew: true, createdAt: '2024-01-15' },
    { id: '2', colors: ['#F8BBD9', '#E29578', '#FFDAB9', '#C7CEEA'], tags: ['pastel', 'sweet'], likes: 892, isPopular: true, createdAt: '2024-01-10' },
    { id: '3', colors: ['#E6E6FA', '#F0F8FF', '#FFF0F5', '#F5FFFA'], tags: ['pastel', 'light'], likes: 756, isPopular: false, createdAt: '2023-12-20' },
    { id: '4', colors: ['#FFE4E1', '#FFF8DC', '#F0FFF0', '#E0FFFF'], tags: ['pastel', 'cream'], likes: 634, isPopular: false, createdAt: '2023-11-15' },
    
    // Neon palettes
    { id: '5', colors: ['#FF0080', '#00FF80', '#8000FF', '#FF8000'], tags: ['neon', 'electric'], likes: 934, isPopular: true, createdAt: '2024-01-05' },
    { id: '6', colors: ['#00FFFF', '#FF1493', '#32CD32', '#FFD700'], tags: ['neon', 'bright'], likes: 823, isPopular: true, createdAt: '2024-01-12' },
    { id: '7', colors: ['#FF69B4', '#00CED1', '#ADFF2F', '#FF4500'], tags: ['neon', 'vibrant'], likes: 567, isPopular: false, createdAt: '2023-12-01' },
    
    // Vintage/Retro palettes
    { id: '8', colors: ['#8B4513', '#CD853F', '#DEB887', '#F4A460'], tags: ['vintage', 'retro'], likes: 689, isPopular: false, createdAt: '2023-10-20' },
    { id: '9', colors: ['#A0522D', '#D2691E', '#CD853F', '#DAA520'], tags: ['vintage', 'earth'], likes: 456, isPopular: false, createdAt: '2023-11-20' },
    { id: '10', colors: ['#8FBC8F', '#F0E68C', '#DDA0DD', '#F5DEB3'], tags: ['vintage', 'nature'], likes: 543, isPopular: false, createdAt: '2023-12-05' },
    
    // Gold palettes
    { id: '11', colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'], tags: ['gold', 'luxury'], likes: 812, isPopular: true, createdAt: '2024-01-12' },
    { id: '12', colors: ['#B8860B', '#DAA520', '#FFD700', '#F0E68C'], tags: ['gold', 'warm'], likes: 398, isPopular: false, createdAt: '2023-11-10' },
    
    // Dark palettes
    { id: '13', colors: ['#191970', '#000080', '#00008B', '#483D8B'], tags: ['dark', 'night'], likes: 445, isPopular: false, createdAt: '2023-12-01' },
    { id: '14', colors: ['#2F4F4F', '#708090', '#4682B4', '#6495ED'], tags: ['dark', 'space'], likes: 378, isPopular: false, createdAt: '2023-11-10' },
    
    // Light palettes
    { id: '15', colors: ['#FFFFFF', '#F8F8FF', '#F5F5F5', '#E6E6FA'], tags: ['light', 'clean'], likes: 623, isPopular: false, createdAt: '2023-11-20' },
    { id: '16', colors: ['#FFF8DC', '#FFFACD', '#FFEFD5', '#FFF0F5'], tags: ['light', 'cream'], likes: 423, isPopular: false, createdAt: '2023-12-18' },
    
    // Warm palettes
    { id: '17', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'], tags: ['warm', 'sunset'], likes: 1247, isPopular: true, isNew: true, createdAt: '2024-01-15' },
    { id: '18', colors: ['#FF8C69', '#FFA07A', '#FFB347', '#FFCCCB'], tags: ['warm', 'summer'], likes: 789, isPopular: true, createdAt: '2024-01-08' },
    
    // Cold palettes
    { id: '19', colors: ['#0F3460', '#16537e', '#1e6091', '#266ca9'], tags: ['cold', 'ocean'], likes: 892, isPopular: true, createdAt: '2024-01-10' },
    { id: '20', colors: ['#B0E0E6', '#ADD8E6', '#87CEEB', '#4682B4'], tags: ['cold', 'winter'], likes: 456, isPopular: false, createdAt: '2023-12-15' },
    
    // Seasonal palettes
    { id: '21', colors: ['#87CEEB', '#20B2AA', '#FFE4B5', '#F0E68C'], tags: ['summer', 'beach'], likes: 789, isPopular: true, createdAt: '2024-01-08' },
    { id: '22', colors: ['#D2691E', '#CD853F', '#B22222', '#A0522D'], tags: ['fall', 'autumn'], likes: 678, isPopular: false, createdAt: '2023-10-30' },
    { id: '23', colors: ['#98FB98', '#90EE90', '#FFB6C1', '#FFA07A'], tags: ['spring', 'bloom'], likes: 567, isPopular: false, createdAt: '2024-01-03' },
    
    // Theme palettes
    { id: '24', colors: ['#FFD700', '#FF69B4', '#00FA9A', '#FF6347'], tags: ['happy', 'bright'], likes: 789, isPopular: true, createdAt: '2024-01-14' },
    { id: '25', colors: ['#228B22', '#32CD32', '#7CFC00', '#ADFF2F'], tags: ['nature', 'green'], likes: 634, isPopular: false, createdAt: '2023-12-10' },
    { id: '26', colors: ['#FF0000', '#FFA500', '#FFFF00', '#00FF00'], tags: ['rainbow', 'colorful'], likes: 892, isPopular: true, createdAt: '2024-01-11' },
    { id: '27', colors: ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569'], tags: ['gradient', 'sunset'], likes: 756, isPopular: false, createdAt: '2024-01-07' },
    { id: '28', colors: ['#87CEEB', '#87CEFA', '#00BFFF', '#1E90FF'], tags: ['sky', 'blue'], likes: 534, isPopular: false, createdAt: '2023-12-18' },
    { id: '29', colors: ['#20B2AA', '#48D1CC', '#00CED1', '#5F9EA0'], tags: ['sea', 'ocean'], likes: 645, isPopular: false, createdAt: '2023-12-12' },
    { id: '30', colors: ['#FF69B4', '#FFD700', '#00FF7F', '#FF4500'], tags: ['kids', 'fun'], likes: 423, isPopular: false, createdAt: '2023-11-28' },
    
    // Special category palettes
    { id: '31', colors: ['#FDBCB4', '#EEA990', '#CC9A76', '#A67C52'], tags: ['skin', 'natural'], likes: 367, isPopular: false, createdAt: '2023-11-05' },
    { id: '32', colors: ['#D2691E', '#8B4513', '#A0522D', '#CD853F'], tags: ['food', 'brown'], likes: 298, isPopular: false, createdAt: '2023-10-15' },
    { id: '33', colors: ['#6B4423', '#8B4513', '#A0522D', '#D2691E'], tags: ['coffee', 'brown'], likes: 234, isPopular: false, createdAt: '2023-09-20' },
    { id: '34', colors: ['#FFFFFF', '#F8F8FF', '#FFB6C1', '#F0E68C'], tags: ['wedding', 'elegant'], likes: 567, isPopular: false, createdAt: '2023-11-12' },
    { id: '35', colors: ['#DC143C', '#228B22', '#FFD700', '#FF4500'], tags: ['christmas', 'holiday'], likes: 789, isPopular: true, createdAt: '2023-12-20' },
    { id: '36', colors: ['#FF8C00', '#000000', '#8B4513', '#FFD700'], tags: ['halloween', 'spooky'], likes: 456, isPopular: false, createdAt: '2023-10-25' },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return paginated results (50-60 per page)
  const startIndex = (page - 1) * 60;
  const endIndex = startIndex + 60;
  const extendedPalettes = [];
  
  // Duplicate and modify palettes to reach 300+ total
  for (let i = 0; i < 10; i++) {
    extendedPalettes.push(...mockPalettes.map(p => ({ ...p, id: `${p.id}_${i}` })));
  }
  
  return extendedPalettes.slice(startIndex, endIndex);
};

const Colores = () => {
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);
  const [noPreference, setNoPreference] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPalettes, setAllPalettes] = useState<ColorPalette[]>([]);

  const { data: palettes, isLoading, error, refetch } = useQuery({
    queryKey: ['colores', currentPage],
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

  const handlePaletteSelect = (palette: ColorPalette) => {
    setSelectedPalette(palette);
    setNoPreference(false);
  };

  const handleNoPreferenceToggle = (checked: boolean) => {
    setNoPreference(checked);
    if (checked) {
      setSelectedPalette(null);
    }
  };

  const handleSubmit = () => {
    if (noPreference) {
      console.log('Submitted: No preference - let design team choose');
      // Here you would integrate with your form submission
    } else if (selectedPalette) {
      console.log('Submitted color palette:', selectedPalette.colors);
      // Here you would integrate with your form submission
    } else {
      alert('Please select a color palette or choose "No Preference"');
    }
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Color Palette
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Select a color palette for your website design
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Selection Status */}
          <div className="lg:w-80">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Your Selection</h3>
              
              {selectedPalette && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Selected Palette:</p>
                  <div className="flex h-8 rounded overflow-hidden border">
                    {selectedPalette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {selectedPalette.colors.join(', ')}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  checked={noPreference}
                  onCheckedChange={handleNoPreferenceToggle}
                />
                <span className="text-sm">No Preference – Let Design Team Choose</span>
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full"
                disabled={!selectedPalette && !noPreference}
              >
                Submit Selection
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results count */}
            <div className="text-sm text-gray-500 mb-4">
              Showing {allPalettes.length} palette{allPalettes.length !== 1 ? 's' : ''}
            </div>

            {isLoading && currentPage === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 60 }).map((_, index) => (
                  <Card key={index} className="p-4">
                    <div className="h-24 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded" />
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                  {allPalettes.map((palette) => (
                    <Card 
                      key={palette.id} 
                      className={`cursor-pointer hover:shadow-lg transition-all ${
                        selectedPalette?.id === palette.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handlePaletteSelect(palette)}
                    >
                      <CardContent className="p-0">
                        <div className="flex h-24">
                          {palette.colors.map((color, index) => (
                            <div
                              key={index}
                              className="flex-1 relative group"
                              style={{ backgroundColor: color }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-medium bg-black bg-opacity-50 px-1 py-0.5 rounded">
                                  {color}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex flex-wrap gap-1">
                              {palette.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              {selectedPalette?.id === palette.id && (
                                <Check className="w-4 h-4 text-green-500" />
                              )}
                              <span className="text-xs text-gray-500">❤️ {palette.likes}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More Button */}
                {allPalettes.length >= currentPage * 60 && !isLoading && (
                  <div className="text-center">
                    <Button onClick={loadMore} size="lg">
                      Load More Palettes
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Colores;
