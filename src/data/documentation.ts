export interface DocSection {
    id: string;
    figmaNodeId: string;
    title: string;
    content: string; // Markdown content
    relatedSuggestionsQuery?: string;
    icon?: React.ElementType; // Lucide icon
    iconName?: string;
}

// Cart - 0:1348
// Cart Loading - 5:355
// Checkout - 0:1220


// It's better to import icons where they are used to keep this file data-only
// For now, we'll define them as strings and map them in NavigationMenu.tsx
// Example: import { BookOpen, Settings, CreditCard } from 'lucide-react';

export const IOS_DOCUMENTATION: DocSection[] = [
    {
        id: 'cart',
        figmaNodeId: '0:1348', // Cart node ID
        title: 'Shopping Cart Implementation',
        iconName: 'BookOpen',
        content: `
<h1 class="font-headline text-3xl mb-4">Shopping Cart Implementation</h1>
<p class="mb-2">Learn how to implement a robust shopping cart system in your iOS app with Razorpay's comprehensive e-commerce SDK.</p>
<h2 class="font-headline text-2xl mt-4 mb-2">Cart Management</h2>
<CartImplementationSnippet/>
<h2 class="font-headline text-2xl mt-4 mb-2">Cart Persistence</h2>
<p class="mb-2">The cart automatically persists data locally using Core Data, ensuring user's cart survives app restarts.</p>
<CartPersistenceSnippet/>
`,
        relatedSuggestionsQuery: 'iOS shopping cart implementation best practices',
    },
    {
        id: 'cart-loading',
        figmaNodeId: '5:355', // Cart Loading node ID
        title: 'Cart Loading States',
        iconName: 'BookOpen',
        content: `
<h1 class="font-headline text-3xl mb-4">Managing Cart Loading States</h1>
<p class="mb-2">Provide excellent user experience by properly handling loading states during cart operations.</p>

<ShoppingCartAPIExample/>
`,
        relatedSuggestionsQuery: 'iOS loading states UX best practices',
    },
    {
        id: 'checkout',
        figmaNodeId: '0:1220', // Checkout node ID
        title: 'Checkout Process',
        iconName: 'BookOpen',
        content: `
<h1 class="font-headline text-3xl mb-4">Implementing Secure Checkout with Razorpay</h1>
<p class="mb-2">Complete the purchase flow with Razorpay's secure checkout implementation supporting multiple payment methods.</p>
<h2 class="font-headline text-2xl mt-4 mb-2">Checkout Flow</h2>
<CheckoutFlowSnippet/>
<h2 class="font-headline text-2xl mt-4 mb-2">Supported Payment Methods</h2>
<p class="mb-2">Razorpay supports 100+ payment methods popular in India and globally.</p>
<ul class="list-disc pl-5 space-y-1 mb-4">
  <li>UPI (Google Pay, PhonePe, Paytm, BHIM)</li>
  <li>Credit/Debit cards (Visa, Mastercard, RuPay)</li>
  <li>Net Banking (All major banks)</li>
  <li>Digital Wallets (Paytm, Mobikwik, Freecharge)</li>
  <li>Buy now, pay later (Simpl, LazyPay)</li>
  <li>International cards and wallets</li>
</ul>
`,
        relatedSuggestionsQuery: 'iOS secure checkout implementation payment methods',
    },
    {
        id: 'checkout-loading',
        figmaNodeId: '3:161', // Checkout Loading node ID
        title: 'Checkout Loading States',
        iconName: 'BookOpen',
        content: `
<h1 class="font-headline text-3xl mb-4">Managing Checkout Loading States</h1>
<p class="mb-2">Ensure a smooth checkout experience by implementing proper loading states during payment processing and order completion.</p>

</div>
<h2 class="font-headline text-2xl mt-4 mb-2">Error Handling During Loading</h2>
<p class="mb-2">Gracefully handle errors and provide clear feedback when checkout operations fail.</p>
<ErrorHandlingSnippet/>
`,
        relatedSuggestionsQuery: 'iOS checkout loading states payment processing UX',
    },
    {
        id: 'payment-success',
        figmaNodeId: '100:279', // Payment Success node ID
        title: 'Payment Success',
        iconName: 'BookOpen',
        content: `
<h1 class="font-headline text-3xl mb-4">Payment Success</h1>
`,
        relatedSuggestionsQuery: 'iOS payment success confirmation UX',
    },

];

// export const FIGMA_PROTOTYPE_URL = "https://www.figma.com/proto/Qy1SqTQFBGy0MbDona2oA5/Finance-Management-Mobile-App-UI-UX-Kit-for-Budget-Tracker-Financial-Prototype-Design--Community-?node-id=7113-2955&starting-point-node-id=7113%3A2955&scaling=contain&hide-ui=1&hotspot-hints=false&show-proto-sidebar=false&footer=false&viewport-controls=false";

// https://www.figma.com/proto/QPOIyfhh0EBiMmxwje72vb/TestDocuProto?t=jaGNq35VJJr3y5ZD-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=0-1348

// --- New constants for Embed Kit 2.0 ---
// Extracted from the FIGMA_PROTOTYPE_URL
export const FIGMA_FILE_KEY = "QPOIyfhh0EBiMmxwje72vb";
// export const FIGMA_FILE_KEY = "Qy1SqTQFBGy0MbDona2oA5"; 
// uoGu3U8xmrBAxw2jUm91LQ // Qy1SqTQFBGy0MbDona2oA5
// IMPORTANT: Replace with your actual Figma OAuth App Client ID
export const FIGMA_CLIENT_ID = "bYl9dYt9uFb5zjdkB7mQ4z";
// export const FIGMA_CLIENT_ID = "jaGNq35VJJr3y5ZD-1"; 
