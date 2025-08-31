import type { LeftConfig, DeviceLeftConfig } from '@/data/schema';

export type ScreenKind = 'product' | 'checkout' | 'success';

export interface LeftPanelProps {
  overlayVisible: boolean;
  overlayLabel?: string;
  buyDisabled: boolean;
  lockTooltip?: string;
  toastText?: string | null;
}

export const deriveScreen = (leftConfig?: LeftConfig): ScreenKind => {
  const asset = (leftConfig as DeviceLeftConfig | undefined)?.asset || '';
  if (asset.includes('Image 24718')) return 'checkout';
  if (asset.endsWith('TestDocuProto.png')) return 'success';
  return 'product';
};

export const computeLeftPanelProps = (leftConfig?: LeftConfig): LeftPanelProps => {
  if (!leftConfig || (leftConfig as any).type !== 'device') {
    return { overlayVisible: false, buyDisabled: false };
  }
  const overlays = (leftConfig as DeviceLeftConfig).overlays || [];
  const spinner = overlays.find(o => o.type === 'spinner');
  const banner = overlays.find(o => o.type === 'banner');
  return {
    overlayVisible: !!spinner,
    overlayLabel: (spinner as any)?.text,
    buyDisabled: overlays.some(o => o.type === 'cta' && (o as any).state === 'disabled'),
    lockTooltip: (overlays.find(o => o.type === 'badge') as any)?.text,
    toastText: (banner as any)?.text || null,
  };
}; 