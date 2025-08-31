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
	buyDisabled?: boolean;
	lockTooltip?: string;
	toastText?: string | null;
}

const MobilePhone: React.FC<MobilePhoneProps> = ({ overlayVisible = false, overlayLabel, screen = 'product', onRequestNext, onRequestBack, onRequestGoto, buyDisabled, lockTooltip, toastText }) => {
	const renderScreen = () => {
		switch (screen) {
			case 'checkout':
				return <CheckoutScreen onRequestNext={onRequestNext} onRequestBack={onRequestBack} onRequestGoto={onRequestGoto} />;
			case 'success':
				return <SuccessScreen onRequestNext={onRequestNext} onRequestBack={onRequestBack} onRequestGoto={onRequestGoto} />;
			default:
				return <ProductDetailScreen onRequestNext={onRequestNext} onRequestBack={onRequestBack} onRequestGoto={onRequestGoto} buyDisabled={buyDisabled} lockTooltip={lockTooltip} />;
		}
	};

	return (
		<div className="relative h-full">
			<DeviceWrapper>
				<div className="w-full h-full relative">
					{renderScreen()}
					<OverlayLoader visible={overlayVisible} label={overlayLabel} />
					{toastText && (
						<div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[11px] px-3 py-2 rounded shadow">
							{toastText}
						</div>
					)}
				</div>
			</DeviceWrapper>
		</div>
	);
};

export default MobilePhone; 