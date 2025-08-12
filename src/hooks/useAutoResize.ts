'use client';

import { useState, useEffect, useRef } from 'react';

interface UseAutoResizeOptions {
  minWidth?: number;
  padding?: number;
}

export function useAutoResize(
  value: string,
  placeholder?: string,
  options: UseAutoResizeOptions = {}
) {
  const { minWidth = 180, padding = 20 } = options;
  const [width, setWidth] = useState(minWidth);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      const textToMeasure = value || placeholder || '';
      measureRef.current.textContent = textToMeasure;
      const measuredWidth = measureRef.current.offsetWidth;
      const newWidth = Math.max(minWidth, measuredWidth + padding);
      setWidth(newWidth);
    }
  }, [value, placeholder, minWidth, padding]);

  return { width, measureRef };
}
