'use client';

import { forwardRef } from 'react';
import { useAutoResize } from '@/hooks/useAutoResize';

interface AutoResizeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  minWidth?: number;
  padding?: number;
}

const AutoResizeInput = forwardRef<HTMLInputElement, AutoResizeInputProps>(
  ({ minWidth, padding, style, ...props }, ref) => {
    const { width, measureRef } = useAutoResize(
      (props.value as string) || '',
      props.placeholder,
      { minWidth, padding }
    );

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
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
          ref={ref}
          {...props}
          style={{
            width: `${width}px`,
            transition: 'width 0.2s ease',
            ...style,
          }}
        />
      </div>
    );
  }
);

AutoResizeInput.displayName = 'AutoResizeInput';

export default AutoResizeInput;
