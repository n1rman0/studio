import { z } from 'zod';

export const OverlaySchema = z.object({
  type: z.enum(['spinner', 'banner', 'badge', 'cta']).or(z.string()),
  text: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

export const DeviceLeftSchema = z.object({
  type: z.literal('device'),
  asset: z.string().optional(),
  overlays: z.array(OverlaySchema).optional(),
}).passthrough();

export const ComponentLeftSchema = z.object({
  component: z.enum(['server-console', 'checklist']).or(z.string()),
}).passthrough();

export const LeftConfigSchema = z.union([DeviceLeftSchema, ComponentLeftSchema, z.any()]);

export const StepSchema = z.object({
  id: z.string(),
  title: z.string(),
  right_md: z.string(),
  left: LeftConfigSchema,
});

export const FlowSchema = z.object({
  steps: z.array(StepSchema),
});

export type OverlayConfig = z.infer<typeof OverlaySchema>;
export type DeviceLeftConfig = z.infer<typeof DeviceLeftSchema>;
export type ComponentLeftConfig = z.infer<typeof ComponentLeftSchema>;
export type LeftConfig = z.infer<typeof LeftConfigSchema>;
export type DocStep = z.infer<typeof StepSchema>;
export type DocFlow = z.infer<typeof FlowSchema>; 