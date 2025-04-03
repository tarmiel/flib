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
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useDebouncedCallback } from '@/hooks';
import { RESOURCE_CATEGORIES, RESOURCE_SORT_OPTION, RESOURCE_TYPES } from '../lib/resources';
import { useCategories } from '@/features/resource-categories/api/get-resource-categories';
import { useResourceTypes } from '@/features/resource-types/api/get-resource-types';

const toggleArrayItem = <T,>(array: T[], item: T): T[] => {
  return array.includes(item) ? array.filter((element) => element !== item) : [...array, item];
};

export const useSearchFilters = () => {
  const debounceMs = 300;
  const currentYear = new Date().getFullYear();

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  // Query parameters
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));

  const [sortBy, setSortBy] = useQueryState(
    'sort',
    parseAsString.withDefault(RESOURCE_SORT_OPTION.CREATED_DESC),
  );

  const [activeResourceTypes, setResourceTypes] = useQueryState(
    'resourceType',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [activeCategories, setCategories] = useQueryState(
    'category',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [yearFrom, setYearFrom] = useQueryState('yearFrom', parseAsInteger.withDefault(1990));

  const [yearTo, setYearTo] = useQueryState(
    'yearTo',
    parseAsInteger.withDefault(new Date().getFullYear()),
  );

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    void setSearchQuery(value);

    setPage(1);
  }, debounceMs);

  const debouncedSetYearRange = useDebouncedCallback((values: number[]) => {
    setYearFrom(values[0] || 1990);
    setYearTo(values[1] || currentYear);

    setPage(1);
  }, debounceMs);

  const toggleCategory = (value: string) => {
    void setCategories(toggleArrayItem(activeCategories, value));

    setPage(1);
  };

  const toggleResourceType = (type: (typeof activeResourceTypes)[number]) => {
    void setResourceTypes(toggleArrayItem(activeResourceTypes, type));

    setPage(1);
  };

  const resetAllFilters = () => {
    void setSearchQuery('');
    void setResourceTypes([]);
    void setCategories([]);
    void setYearFrom(1990);
    void setYearTo(currentYear);
    void setPage(1);
    void setSortBy(RESOURCE_SORT_OPTION.CREATED_DESC);
  };

  const activeFilters = [...activeResourceTypes, ...activeCategories];

  return {
    // Pagination
    page,
    setPage,

    // State
    searchQuery,
    sortBy,
    activeResourceTypes,
    activeCategories,
    yearRange: [yearFrom, yearTo],
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

  const { data: categories = [] } = useCategories();
  const { data: resourceTypes = [] } = useResourceTypes();

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Я шукаю..."
            defaultValue={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RESOURCE_SORT_OPTION.CREATED_DESC}>Найновіші</SelectItem>
              <SelectItem value={RESOURCE_SORT_OPTION.CREATED_ASC}>Найстаріші</SelectItem>
              <SelectItem value={RESOURCE_SORT_OPTION.TITLE_ASC}>За назвою (від А до Я)</SelectItem>
              <SelectItem value={RESOURCE_SORT_OPTION.TITLE_DESC}>
                За назвою (від Я до А)
              </SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-[unset]" icon={<Filter className="h-4 w-4" />}>
                Фільтри
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Фільтри</SheetTitle>
                <SheetDescription>
                  Уточніть результати пошуку за допомогою фільтрів
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Тип ресурсу</h3>
                  <div className="space-y-2">
                    {resourceTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={activeResourceTypes.includes(type.name) || false}
                          onCheckedChange={() => {
                            toggleResourceType(type.name);
                          }}
                        />
                        <Label htmlFor={`type-${type}`}>{type.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Категорії</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={activeCategories.includes(category.name) || false}
                          onCheckedChange={() => {
                            toggleCategory(category.name);
                          }}
                        />
                        <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Дата публікації</h3>
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
                  Прибрати фільтри
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
            Очистити все
          </Button>
        </div>
      )}
    </div>
  );
}
