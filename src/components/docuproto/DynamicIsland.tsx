import React from 'react';

const DynamicIsland: React.FC = () => {
	// Configuration for the island's dimensions and elements
	const islandConfig = {
		width: 122,
		height: 36,
		cameraLensSize: 12,
		sensorSize: 6,
		cameraRightOffset: 24, // Distance from the right edge of the island
		sensorLeftOffset: 20, // Distance from the left edge of the island
	};

	return (
		<div
			className="relative flex items-center justify-between px-3 rounded-full bg-[#0b0b0b] ring-1 ring-black/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.07),inset_0_-6px_12px_rgba(0,0,0,0.6)]"
			style={{
				width: islandConfig.width,
				height: islandConfig.height,
			}}
		>
			{/* Gloss highlight overlay */}
			<div
				className="absolute inset-0 rounded-full"
				style={{
					background:
						'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 22%, rgba(255,255,255,0) 60%)',
				}}
			/>

			{/* Smaller Sensor/Dot Projector */}
			<div
				className="rounded-full"
				style={{
					width: islandConfig.sensorSize,
					height: islandConfig.sensorSize,
					backgroundColor: '#05051a',
					boxShadow: 'inset 0 0 3px #202040',
				}}
			/>

			{/* Main Camera lens */}
			<div
				className="rounded-full"
				style={{
					width: islandConfig.cameraLensSize,
					height: islandConfig.cameraLensSize,
					background:
						'radial-gradient(40% 40% at 35% 25%, #5d60c8 0%, rgba(93,96,200,0) 60%), radial-gradient(55% 55% at 65% 80%, #2c2d6d 0%, rgba(44,45,109,0) 65%)',
					backgroundColor: '#0a0b2a',
					boxShadow:
						'inset 0 0 6px #4c4da3, 0 0 0 0.5px rgba(0,0,0,0.3)',
				}}
			/>
		</div>
	);
};

export default DynamicIsland; 