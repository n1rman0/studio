import React, { useEffect, useRef, useState } from 'react';

interface DeviceWrapperProps {
  children: React.ReactNode;
  deviceType?: 'iphone' | 'android';
  colorVariant?: 'purple' | 'silver' | 'black' | 'gold' | 'transparent';
}

const DeviceWrapper: React.FC<DeviceWrapperProps> = ({
  children,
  deviceType = 'iphone',
  colorVariant = 'transparent'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Device dimensions
  const DEVICE_WIDTH = 428;
  const DEVICE_HEIGHT = 868;
  const PADDING = 0; // 24px on each side

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const availableWidth = containerRect.width - PADDING;
      const availableHeight = containerRect.height - PADDING;

      // Calculate scale factors for both dimensions
      const scaleX = availableWidth / DEVICE_WIDTH;
      const scaleY = availableHeight / DEVICE_HEIGHT;

      // Use the smaller scale to maintain aspect ratio
      const newScale = Math.min(scaleX, scaleY, 1); // Never scale up
      setScale(newScale);
    };

    // Initial calculation
    calculateScale();

    // Set up ResizeObserver to recalculate on container size changes
    const resizeObserver = new ResizeObserver(calculateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Color variants for iPhone 14 Pro
  const colorStyles = {
    purple: {
      frame: 'border-[#2b2436] shadow-[inset_0_0_4px_2px_rgba(52,44,63,0.55),inset_0_0_0_6px_#342C3F]',
      buttons: 'bg-[#2b2436]'
    },
    silver: {
      frame: 'border-[#cccdce] shadow-[inset_0_0_4px_2px_rgba(226,227,228,0.55),inset_0_0_0_6px_#e2e3e4]',
      buttons: 'bg-[#cccdce]'
    },
    black: {
      frame: 'border-[#69655f] shadow-[inset_0_0_4px_2px_rgba(118,114,111,0.55),inset_0_0_0_6px_#76726F]',
      buttons: 'bg-[#69655f]'
    },
    gold: {
      frame: 'border-[#d4c7ab] shadow-[inset_0_0_4px_2px_rgba(246,238,219,0.55),inset_0_0_0_6px_rgba(246,238,219,0.65)]',
      buttons: 'bg-[#d4c7ab]'
    },
    transparent: {
      frame: 'border-transparent shadow-none',
      buttons: 'bg-transparent'
    }
  };

  const currentColors = colorStyles[colorVariant];

  return (
    <div ref={containerRef} className="flex justify-center items-center w-full h-full p-6">
      <div
        className="relative"
        style={{
          width: `${DEVICE_WIDTH}px`,
          height: `${DEVICE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Device Frame */}
        <div>
          {/* Screen Area - 390px x 830px */}
          <div className="w-[390px] h-[788px] rounded-[58px] overflow-hidden relative bg-transparent">
            <div
              className="w-full h-full bg-transparent"
              style={{
                transform: 'scale(1.32)',
                transformOrigin: 'center center',
                overflow: 'hidden',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceWrapper; 