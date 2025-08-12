'use client';

import { useState, useEffect, useRef } from 'react';
import {
  geocodeLocation,
  extractLocationData,
  type MapboxFeature,
} from '@/lib/mapbox';
import { useAutoResize } from '@/hooks/useAutoResize';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect: (city: string, country: string) => void;
  placeholder?: string;
}

export default function LocationInput({
  value,
  onChange,
  onLocationSelect,
  placeholder = 'Enter city, country',
}: LocationInputProps) {
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { width: inputWidth, measureRef } = useAutoResize(value, placeholder);

  // Debounced geocoding
  useEffect(() => {
    if (!value || value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await geocodeLocation(value);
        setSuggestions(results || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Geocoding error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: MapboxFeature) => {
    const { city, country } = extractLocationData(suggestion);
    onChange(suggestion.place_name);
    onLocationSelect(city, country);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  // Handle input focus/blur
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div
      className="location-input-container"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <span
        ref={measureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          padding: '0',
          margin: '0',
          border: '0',
        }}
      />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: `${inputWidth}px`,
          display: 'inline-block',
          verticalAlign: 'baseline',
          transition: 'width 0.2s ease',
        }}
        data-1p-ignore
      />

      {isLoading && (
        <div
          className="loading-indicator"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            color: '#666',
          }}
        >
          Loading...
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="suggestions-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '280px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                fontSize: '14px',
                backgroundColor: index === selectedIndex ? '#f0f0f0' : 'white',
              }}
              onMouseEnter={e => {
                setSelectedIndex(index);
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  index === selectedIndex ? '#f0f0f0' : 'white';
              }}
            >
              {suggestion.place_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
