import { useState } from "react";
import { Button } from "../button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react"; // Icon library

type Filters = {
  ratings: Record<string, boolean>;
  distance: Record<string, boolean>;
  boards: Record<string, boolean>;
  facilities: Record<string, boolean>;
};

type FilterSectionProps = {
  title: string;
  items: Record<string, boolean>;
  category: keyof Filters;
  onChange: (category: keyof Filters, item: string) => void;
};

export function SchoolFilters() {
  const [filters, setFilters] = useState<Filters>({
    ratings: {
      "4plus": false,
      "3plus": false,
      "2plus": false,
    },
    distance: {
      "5km": false,
      "10km": false,
      "20km": false,
    },
    boards: {
      cbse: false,
      icse: false,
      ib: false,
    },
    facilities: {
      library: false,
      sports: false,
      transport: false,
      cafeteria: false,
    },
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleCheckboxChange = (category: keyof Filters, item: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item],
      },
    }));
  };

  const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    items,
    category,
    onChange,
  }) => (
    <div className='space-y-2'>
      <label className='text-sm font-medium'>{title}</label>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2'>
        {Object.entries(items).map(([key, checked]) => (
          <div key={key} className='flex items-center space-x-2'>
            <Checkbox
              id={`${category}-${key}`}
              checked={checked}
              onCheckedChange={() => onChange(category, key)}
            />
            <label
              htmlFor={`${category}-${key}`}
              className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              {key === "4plus"
                ? "4+ Stars"
                : key === "3plus"
                ? "3+ Stars"
                : key === "2plus"
                ? "2+ Stars"
                : key === "5km"
                ? "Within 5 km"
                : key === "10km"
                ? "Within 10 km"
                : key === "20km"
                ? "Within 20 km"
                : key === "cbse"
                ? "CBSE"
                : key === "icse"
                ? "ICSE"
                : key === "ib"
                ? "IB"
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Filter Icon for Mobile */}
      <div className='md:hidden fixed bottom-4 right-4 z-50'>
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className='bg-emerald-600 text-white rounded-full p-3 shadow-lg flex items-center gap-2'>
          <Filter className='w-6 h-6' />
          Filters
        </button>
      </div>

      {/* Filters for Desktop */}
      <div className='hidden md:block p-4 bg-white rounded-lg shadow'>
        <h3 className='font-semibold mb-4'>Filters</h3>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6'>
          <FilterSection
            title='Rating'
            items={filters.ratings}
            category='ratings'
            onChange={handleCheckboxChange}
          />

          <FilterSection
            title='Distance'
            items={filters.distance}
            category='distance'
            onChange={handleCheckboxChange}
          />

          <FilterSection
            title='Board'
            items={filters.boards}
            category='boards'
            onChange={handleCheckboxChange}
          />

          <FilterSection
            title='Facilities'
            items={filters.facilities}
            category='facilities'
            onChange={handleCheckboxChange}
          />
        </div>
        <div className='mt-6'>
          <Button className='w-full'>Apply Filters</Button>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white w-full max-w-md p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-semibold text-lg'>Filters</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className='text-gray-600 hover:text-gray-800'>
                ✕
              </button>
            </div>

            <div className='grid grid-cols-1 gap-6'>
              <FilterSection
                title='Rating'
                items={filters.ratings}
                category='ratings'
                onChange={handleCheckboxChange}
              />

              <FilterSection
                title='Distance'
                items={filters.distance}
                category='distance'
                onChange={handleCheckboxChange}
              />

              <FilterSection
                title='Board'
                items={filters.boards}
                category='boards'
                onChange={handleCheckboxChange}
              />

              <FilterSection
                title='Facilities'
                items={filters.facilities}
                category='facilities'
                onChange={handleCheckboxChange}
              />
            </div>

            <div className='mt-6'>
              <Button
                className='w-full'
                onClick={() => setIsMobileFiltersOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SchoolFilters;
