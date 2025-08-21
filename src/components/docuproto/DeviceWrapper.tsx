import React, { useEffect, useRef, useState } from 'react';
import { Wifi, Signal, BatteryFull } from 'lucide-react';

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

  // Device outer body (approx. iPhone 14 Pro)
  const DEVICE_WIDTH = 430;   // outer frame width in px
  const DEVICE_HEIGHT = 932;  // outer frame height in px
  const FRAME_BORDER = 10;    // visual border width

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const scaleX = containerRect.width / DEVICE_WIDTH;
      const scaleY = containerRect.height / DEVICE_HEIGHT;
      setScale(Math.min(scaleX, scaleY, 1));
    };

    calculateScale();
    const resizeObserver = new ResizeObserver(calculateScale);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

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
  } as const;

  const currentColors = colorStyles[colorVariant];

  // iPhone 14 Pro logical viewport
  const VIEWPORT_WIDTH = 393;
  const VIEWPORT_HEIGHT = 852;

  // Compute centered screen rect inside the body
  const screenLeft = Math.round((DEVICE_WIDTH - VIEWPORT_WIDTH) / 2);
  const screenTop = Math.round((DEVICE_HEIGHT - VIEWPORT_HEIGHT) / 2) + 6; // slight bias down for speaker/island

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
        {/* Device outer body */}
        <div
          className={`absolute inset-0 rounded-[78px] border-[${FRAME_BORDER}px] ${currentColors.frame} bg-[#0b0b0c]`}
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
        />

        {/* Side buttons (decorative) */}
        <div className={`absolute left-[-2px] top-[160px] h-24 w-[4px] ${currentColors.buttons} rounded-l`}></div>
        <div className={`absolute left-[-2px] top-[260px] h-12 w-[4px] ${currentColors.buttons} rounded-l`}></div>
        <div className={`absolute right-[-2px] top-[210px] h-24 w-[4px] ${currentColors.buttons} rounded-r`}></div>

        {/* Dynamic island */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[20px] w-40 h-12 bg-black rounded-[28px] shadow-[inset_0_0_6px_rgba(255,255,255,0.06)]" />

        {/* Screen area (clipped) */}
        <div
          className="absolute overflow-hidden rounded-[50px] bg-white"
          style={{
            width: `${VIEWPORT_WIDTH}px`,
            height: `${VIEWPORT_HEIGHT}px`,
            left: `${screenLeft}px`,
            top: `${screenTop}px`
          }}
        >
          <div className="w-full h-full relative overflow-hidden">
            {/* iOS-style status bar */}
            <div className="absolute top-0 left-0 right-0 h-10 flex items-center px-4 select-none">
              <div className="text-[13px] font-semibold text-black/90">9:41</div>
              <div className="ml-auto flex items-center gap-2 text-black/80">
                <Signal size={18} />
                <Wifi size={18} />
                <BatteryFull size={20} />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceWrapper; 