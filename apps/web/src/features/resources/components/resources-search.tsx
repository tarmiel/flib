'use client';

import { useState } from 'react';
import { Filter, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { parseAsYearRange } from '@/lib/parsers';
import { useDebouncedCallback } from '@/hooks';

const categories = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Medicine',
  'Economics',
  'Psychology',
  'Literature',
];

const resourceTypes = ['Book', 'Journal', 'Article', 'Thesis', 'Conference Paper'];

const toggleArrayItem = <T,>(array: T[], item: T): T[] => {
  return array.includes(item) ? array.filter((element) => element !== item) : [...array, item];
};

export const useSearchFilters = () => {
  const debounceMs = 300;
  const currentYear = new Date().getFullYear();

  // Query parameters
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));

  const [sortBy, setSortBy] = useQueryState('sort', parseAsString.withDefault('relevance'));

  const [activeResourceTypes, setResourceTypes] = useQueryState(
    'type',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [activeCategories, setCategories] = useQueryState(
    'category',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [yearRange, setYearRange] = useQueryState(
    'year',
    parseAsYearRange.withDefault([1990, currentYear]),
  );

  const debouncedSetSearchQuery = useDebouncedCallback(
    (value: string) => void setSearchQuery(value),
    debounceMs,
  );

  const debouncedSetYearRange = useDebouncedCallback(
    (values: typeof yearRange) => void setYearRange(values),
    debounceMs,
  );

  const toggleCategory = (value: string) => {
    void setCategories(toggleArrayItem(activeCategories, value));
  };

  const toggleResourceType = (type: (typeof activeResourceTypes)[number]) => {
    void setResourceTypes(toggleArrayItem(activeResourceTypes, type));
  };

  const resetAllFilters = () => {
    void setSearchQuery('');
    void setResourceTypes([]);
    void setCategories([]);
    void setYearRange([1990, currentYear]);
  };

  const activeFilters = [...activeResourceTypes, ...activeCategories];

  return {
    // State
    searchQuery,
    sortBy,
    activeResourceTypes,
    activeCategories,
    yearRange,
    activeFilters,

    // Setters
    setSearchQuery: debouncedSetSearchQuery,
    setSortBy,
    setYearRange: debouncedSetYearRange,

    // Actions
    toggleCategory,
    toggleResourceType,
    resetAllFilters,
  };
};

export function ResourcesSearchSection() {
  // const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));
  // const [sortBy, setSortBy] = useQueryState('sort', parseAsString.withDefault('relevance'));
  // const [activeResourceTypes, setResourceType] = useQueryState(
  //   'type',
  //   parseAsArrayOf(parseAsString).withDefault([]),
  // );
  // const [activeCategories, setCategories] = useQueryState(
  //   'category',
  //   parseAsArrayOf(parseAsString).withDefault([]),
  // );
  // const [yearRange, setYearRange] = useQueryState(
  //   'year',
  //   parseAsYearRange.withDefault([1990, new Date().getFullYear()]),
  // );

  // const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
  //   void setSearchQuery(value);
  // }, 300);

  // const debouncedSetFilterValues = useDebouncedCallback((values: typeof activeFilters) => {
  //   void setActiveFilters(values);
  // }, 300);

  // const debouncedSetYearRange = useDebouncedCallback((values: typeof yearRange) => {
  //   void setYearRange(values);
  // }, 300);

  // const toggleCategory = (value: string) => {
  //   if (!activeCategories.includes(value)) {
  //     setCategory([...activeCategories, value]);
  //   } else {
  //     setCategory(activeCategories.filter((c) => c !== value));
  //   }
  // };
  // const toggleResourceType = (value: string) => {
  //   if (!activeResourceTypes.includes(value)) {
  //     setResourceType([...activeResourceTypes, value]);
  //   } else {
  //     setResourceType(activeResourceTypes.filter((c) => c !== value));
  //   }
  // };

  // const addFilter = (filter: string) => {
  //   if (!activeFilters.includes(filter)) {
  //     debouncedSetFilterValues([...activeFilters, filter]);
  //   }
  // };

  // const removeFilter = (filter: string) => {
  //   debouncedSetFilterValues(activeFilters.filter((f) => f !== filter));
  // };

  const {
    searchQuery,
    sortBy,
    activeResourceTypes,
    activeCategories,
    yearRange,
    activeFilters,
    setSearchQuery,
    setSortBy,
    setYearRange,
    toggleCategory,
    toggleResourceType,
    resetAllFilters,
  } = useSearchFilters();

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for books, journals, articles..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="relevance" onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-[unset]" icon={<Filter className="h-4 w-4" />}>
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results with filters</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Resource Type</h3>
                  <div className="space-y-2">
                    {resourceTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={activeResourceTypes.includes(type) || false}
                          onCheckedChange={() => {
                            toggleResourceType(type);
                          }}
                        />
                        <Label htmlFor={`type-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={activeCategories.includes(category) || false}
                          onCheckedChange={() => {
                            toggleCategory(category);
                          }}
                        />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Publication Year</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={yearRange}
                      min={1900}
                      max={new Date().getFullYear()}
                      step={1}
                      onValueChange={(value) => setYearRange(value as number[])}
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                  </div>
                </div>
                {/* <Button className="w-full">Apply Filters</Button> */}
                <Button className="w-full" onClick={resetAllFilters}>
                  Clear Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              {/* <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <span className="sr-only">Remove filter</span>×
              </Button> */}
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => resetAllFilters()}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
