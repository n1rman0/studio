"use client";

import React from 'react';
import type { LeftConfig } from '@/data/schema';
import { deriveScreen, computeLeftPanelProps } from '@/lib/stepScreen';
import MobilePhone from './MobilePhone';
import ServerPanel from './ServerPanel';
import GoLivePanel from './GoLivePanel';

interface LeftPaneProps {
  leftConfig?: LeftConfig;
  transitioning?: boolean;
  onNext: () => void;
  onBack: () => void;
}

const LeftPane: React.FC<LeftPaneProps> = ({ leftConfig, transitioning = false, onNext, onBack }) => {
  const showPhone = (leftConfig as any)?.type === 'device';
  const panelProps = computeLeftPanelProps(leftConfig);
  const screen = deriveScreen(leftConfig);

  if (!showPhone) {
    return (
      <div className="w-full h-full p-12 flex items-center justify-center bg-slate-100">
        {(leftConfig as any)?.component === 'server-console' && <ServerPanel />}
        {(leftConfig as any)?.component === 'checklist' && <GoLivePanel />}
      </div>
    );
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center relative p-[36px]"
      style={{
        backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        backgroundColor: '#f9fafb'
      }}
    >
      <MobilePhone
        overlayVisible={transitioning || panelProps.overlayVisible}
        overlayLabel={panelProps.overlayLabel || 'Loading'}
        screen={screen}
        buyDisabled={panelProps.buyDisabled}
        lockTooltip={panelProps.lockTooltip}
        toastText={panelProps.toastText}
        onRequestNext={onNext}
        onRequestBack={onBack}
      />
    </div>
  );
};

export default LeftPane;