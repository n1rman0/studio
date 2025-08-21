"use client";

import React from 'react';
import DeviceWrapper from './DeviceWrapper';
import ProductDetailScreen from './screens/ProductDetailScreen';
import OverlayLoader from './OverlayLoader';
import CheckoutScreen from './screens/CheckoutScreen';
import SuccessScreen from './screens/SuccessScreen';

interface MobilePhoneProps {
	overlayVisible?: boolean;
	overlayLabel?: string;
	screen?: 'product' | 'checkout' | 'success';
	onRequestNext?: () => void;
	onRequestBack?: () => void;
	onRequestGoto?: (id: string) => void;
}

const MobilePhone: React.FC<MobilePhoneProps> = ({ overlayVisible = false, overlayLabel, screen = 'product', onRequestNext, onRequestBack, onRequestGoto }) => {
	const renderScreen = () => {
		switch (screen) {
			case 'checkout':
				return <CheckoutScreen onRequestNext={onRequestNext} onRequestBack={onRequestBack} onRequestGoto={onRequestGoto} />;
			case 'success':
				return <SuccessScreen onRequestNext={onRequestNext} onRequestBack={onRequestBack} onRequestGoto={onRequestGoto} />;
			default:
				return <ProductDetailScreen onRequestNext={onRequestNext} onRequestBack={onRequestBack} onRequestGoto={onRequestGoto} />;
		}
	};

	return (
		<div className="w-full h-full pb-12 relative" style={{
			backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
			backgroundSize: '30px 30px',
			backgroundColor: '#f9fafb'
		}}>
			<DeviceWrapper>
				<div className="w-full h-full relative">
					{renderScreen()}
					<OverlayLoader visible={overlayVisible} label={overlayLabel} />
				</div>
			</DeviceWrapper>
		</div>
	);
};

export default MobilePhone; 