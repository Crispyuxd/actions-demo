// Public API for the widget-demos handover bundle.
//
// Consumers should import from this file:
//
//   import { OrderLookupDemo, ReplacementOrderDemo } from 'widget-demos';
//
// (Adjust the import path to wherever you placed this folder in your repo,
// or set up a path alias — see INTEGRATION.md.)

export { default as ShopifyWidgetDemo } from './demos/shopify-widget/page';
export { default as OrderLookupDemo } from './demos/order-lookup/page';
export { default as OrderCancellationDemo } from './demos/order-cancellation/page';
export { default as ReplacementOrderDemo } from './demos/replacement-order/page';
