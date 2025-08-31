"use client";

import React from 'react';
import DynamicIsland from './DynamicIsland';

const DeviceWrapper: React.FC<{ children: React.ReactNode; variant?: 'phone' | 'panel' }> = ({ children, variant = 'phone' }) => {
	if (variant === 'panel') {
		return (
			<div className="w-full h-full bg-white rounded-xl border shadow-sm overflow-hidden">
				{children}
			</div>
		);
	}
	return (
		<div className="relative inline-block p-6 sm:p-8 md:p-10">
			<div className="relative w-[360px] h-[747px] rounded-[62px] overflow-visible bg-gradient-to-b from-[#0c0d10] to-[#1a1b1e] shadow-[0_28px_80px_rgba(0,0,0,0.55)] before:content-[''] before:absolute before:inset-0 before:rounded-[62px] before:ring-1 before:ring-white/10">
				{/* Bezel */}
				<div className="absolute inset-[10px] rounded-[52px] bg-gradient-to-b from-[#0c0d10] to-[#0a0b0d] z-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),inset_0_-1px_1px_rgba(0,0,0,0.6)]" />
				{/* Screen */}
				<div className="absolute inset-[14px] rounded-[48px] bg-white overflow-hidden shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] z-10">
					<div className="relative w-full h-full pt-[calc(100%*110/2556)]">
						{children}
						{/* Glass highlight */}
						<div className="pointer-events-none absolute inset-0 rounded-[48px] bg-[linear-gradient(130deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_40%,rgba(255,255,255,0)_60%)] z-10" />
						{/* Dynamic Island positioned relative to screen (last for stacking) */}
						<div className="pointer-events-none absolute left-1/2 z-[999]" style={{ top: 'calc(100% * 59 / 2556)' }}>
							<div className="pointer-events-auto -translate-x-1/2">
								<DynamicIsland />
							</div>
						</div>
					</div>
				</div>

				{/* Right side button (Power) */}
				<div className="absolute right-[-4px] top-[260px] w-[6px] h-[96px] rounded-[3px] bg-gradient-to-b from-[#1a1b1e] to-[#0e0f12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.7),0_2px_4px_rgba(0,0,0,0.35)]" />
				{/* Left side buttons (Ring + Volume) */}
				<div className="absolute left-[-4px] top-[210px] w-[6px] h-[34px] rounded-[3px] bg-gradient-to-b from-[#1a1b1e] to-[#0e0f12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.7),0_2px_4px_rgba(0,0,0,0.35)]" />
				<div className="absolute left-[-4px] top-[268px] w-[6px] h-[70px] rounded-[3px] bg-gradient-to-b from-[#1a1b1e] to-[#0e0f12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.7),0_2px_4px_rgba(0,0,0,0.35)]" />
				<div className="absolute left-[-4px] top-[352px] w-[6px] h-[70px] rounded-[3px] bg-gradient-to-b from-[#1a1b1e] to-[#0e0f12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.7),0_2px_4px_rgba(0,0,0,0.35)]" />

				{/* Subtle frame highlight */}
				<div className="pointer-events-none absolute -inset-[1px] rounded-[64px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />
			</div>
		</div>
	);
};

export default DeviceWrapper; 