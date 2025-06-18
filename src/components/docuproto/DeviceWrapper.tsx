import React from 'react';

interface DeviceWrapperProps {
  children: React.ReactNode;
  deviceType?: 'iphone' | 'android';
}

const DeviceWrapper: React.FC<DeviceWrapperProps> = ({ children, deviceType = 'iphone' }) => {
  return (
    <div className="flex justify-center items-center min-h-full p-6">
      <div className="device-shell relative w-[375px] h-[812px] bg-gray-800 rounded-[3rem] shadow-2xl p-1">
        {/* Screen area */}
        <div className="device-screen relative w-full h-full bg-black rounded-[2.8rem] overflow-hidden">
          {/* Inner screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Status bar overlay */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-white z-50 flex items-center justify-between px-6 text-black text-sm font-medium">
              <div className="flex items-center gap-1">
                <span>9:41</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-4 h-2 border border-black rounded-sm">
                    <div className="w-2 h-1 bg-black rounded-sm m-0.5"></div>
                  </div>
                  <div className="w-6 h-3 border border-black rounded-sm relative">
                    <div className="w-4 h-1.5 bg-black rounded-sm m-0.5"></div>
                    <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-black rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content area - iframe renders here with proper constraints */}
            <div 
              className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              <div 
                className="w-full h-full"
                style={{
                  transform: 'scale(1.35)',
                  transformOrigin: 'center center',
                  overflow: 'hidden',
                  width: '100%',
                  height: '100%'
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Notch overlay */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-60"></div>
        
        {/* Home indicator overlay */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full z-60"></div>
      </div>
    </div>
  );
};

export default DeviceWrapper; 