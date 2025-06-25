import React, { useRef, useEffect, useState } from 'react';

interface DeviceWrapperProps {
  children: React.ReactNode;
  deviceType?: 'iphone' | 'android';
  colorVariant?: 'purple' | 'silver' | 'black' | 'gold';
}

const DeviceWrapper: React.FC<DeviceWrapperProps> = ({ 
  children, 
  deviceType = 'iphone',
  colorVariant = 'purple'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  
  // Device dimensions
  const DEVICE_WIDTH = 428;
  const DEVICE_HEIGHT = 868;
  const PADDING = 48; // 24px on each side

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
    }
  };

  const currentColors = colorStyles[colorVariant];

  return (
    <div ref={containerRef} className="flex justify-center items-center w-full h-full p-6">
      {/* iPhone 14 Pro Container with dynamic scaling */}
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
        <div className={`
          w-[428px] h-[868px] p-[19px] rounded-[68px] bg-[#010101]
          border ${currentColors.frame}
        `}>
          {/* Screen Area - 390px x 830px */}
          <div className="w-[390px] h-[830px] rounded-[49px] overflow-hidden relative bg-white">
            <div 
              className="w-full h-full"
              style={{
                transform: 'scale(1.3)',
                transformOrigin: 'center center',
                overflow: 'hidden'
              }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* Dynamic Island Header */}
        <div className="absolute top-[29px] left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-[#010101] rounded-[20px] z-50"></div>
        
        {/* Dynamic Island Content */}
        <div className="absolute top-[30px] left-1/2 transform -translate-x-1/2 w-[74px] h-[33px] bg-[#010101] rounded-[17px] z-40"></div>
        
        {/* Front Camera Sensor */}
        <div className="absolute top-[42px] left-1/2 transform translate-x-[36px] -translate-y-1/2 w-[9px] h-[9px] rounded-full z-40"
             style={{
               background: 'radial-gradient(farthest-corner at 20% 20%, #6074BF 0, transparent 40%), radial-gradient(farthest-corner at 80% 80%, #513785 0, #24555E 20%, transparent 50%)',
               boxShadow: '0 0 1px 1px rgba(255,255,255,0.05)'
             }}>
        </div>

        {/* Volume Buttons */}
        <div className={`absolute left-[-2px] top-[115px] w-[3px] h-[32px] rounded-sm ${currentColors.buttons}`}></div>
        <div className={`absolute left-[-2px] top-[175px] w-[3px] h-[62px] rounded-sm ${currentColors.buttons}`}></div>
        <div className={`absolute left-[-2px] top-[255px] w-[3px] h-[62px] rounded-sm ${currentColors.buttons}`}></div>

        {/* Power Button */}
        <div className={`absolute right-[-2px] top-[200px] w-[3px] h-[100px] rounded-sm ${currentColors.buttons}`}></div>

        {/* Antenna Lines */}
        <div className="absolute top-[85px] left-0 w-full h-[7px] border-l-[7px] border-r-[7px] border-black border-opacity-25 z-10"></div>
        <div className="absolute bottom-[85px] left-0 w-full h-[7px] border-l-[7px] border-r-[7px] border-black border-opacity-25 z-10"></div>

        {/* Home Indicator Areas */}
        <div className="absolute top-0 right-[86px] w-[6px] h-[6px] border-t-[6px] border-black border-opacity-25 z-10"></div>
        <div className="absolute bottom-0 left-[86px] w-[6px] h-[6px] border-b-[6px] border-black border-opacity-25 z-10"></div>
      </div>
    </div>
  );
};

export default DeviceWrapper; 