export interface DocSection {
  id: string;
  figmaNodeId: string;
  title: string;
  content: string; // Markdown content
  relatedSuggestionsQuery?: string;
  icon?: React.ElementType; // Lucide icon
  iconName?: string;
}

// It's better to import icons where they are used to keep this file data-only
// For now, we'll define them as strings and map them in NavigationMenu.tsx
// Example: import { BookOpen, Settings, CreditCard } from 'lucide-react';

export const IOS_DOCUMENTATION: DocSection[] = [
  {
    id: 'welcome',
    figmaNodeId: '7113-2955', // Starting node ID from Figma link
    title: 'Welcome to Payment SDK',
    iconName: 'BookOpen',
    content: `
<h1 class="font-headline text-3xl mb-4">Welcome to the Payment SDK for iOS</h1>
<p class="mb-2">This guide will help you integrate our powerful payment processing capabilities into your iOS application.</p>
<h2 class="font-headline text-2xl mt-4 mb-2">Key Features:</h2>
<ul class="list-disc pl-5 space-y-1">
  <li>Seamless in-app purchases</li>
  <li>Secure transaction handling</li>
  <li>Customizable UI components</li>
</ul>
`,
    relatedSuggestionsQuery: 'getting started with Payment SDK',
  },
  {
    id: 'initialization',
    figmaNodeId: '7113-3000', // Hypothetical node ID
    title: 'SDK Initialization',
    iconName: 'Settings',
    content: `
<h1 class="font-headline text-3xl mb-4">Initializing the SDK</h1>
<p class="mb-2">To start using the Payment SDK, you first need to initialize it with your API key.</p>
<div class="bg-muted p-4 rounded-md my-4">
<pre><code class="font-code text-sm">
import PaymentSDK

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    PaymentSDK.initialize(apiKey: "YOUR_API_KEY")
    return true
}
</code></pre>
</div>
<p>Ensure you call this early in your app's lifecycle, typically in your <code>AppDelegate</code>'s <code>didFinishLaunchingWithOptions</code> method.</p>
`,
    relatedSuggestionsQuery: 'how to initialize PaymentSDK iOS',
  },
  {
    id: 'making-payment',
    figmaNodeId: '7113-3100', // Hypothetical node ID
    title: 'Making a Payment',
    iconName: 'CreditCard',
    content: `
<h1 class="font-headline text-3xl mb-4">Making a Payment</h1>
<p class="mb-2">Once initialized, making a payment is straightforward using the <code>processPayment</code> method.</p>
<div class="bg-muted p-4 rounded-md my-4">
<pre><code class="font-code text-sm">
let paymentDetails = PaymentDetails(amount: 10.99, currency: "USD")
PaymentSDK.shared.processPayment(details: paymentDetails) { result in
    switch result {
    case .success(let transactionId):
        print("Payment successful: \\(transactionId)")
    case .failure(let error):
        print("Payment failed: \\(error.localizedDescription)")
    }
}
</code></pre>
</div>
<p>This will present the SDK's payment UI to the user. Handle the result in the completion handler to update your app's state accordingly.</p>
`,
    relatedSuggestionsQuery: 'process payment iOS SDK example',
  },
  {
    id: 'ui-customization',
    figmaNodeId: '7113-3200', // Hypothetical node ID
    title: 'UI Customization',
    iconName: 'Palette',
    content: `
<h1 class="font-headline text-3xl mb-4">Customizing the UI</h1>
<p class="mb-2">The Payment SDK allows for extensive UI customization to match your app's look and feel.</p>
<h2 class="font-headline text-2xl mt-4 mb-2">Theme Configuration</h2>
<p class="mb-2">You can provide a theme object during initialization or update it at runtime:</p>
<div class="bg-muted p-4 rounded-md my-4">
<pre><code class="font-code text-sm">
let theme = PaymentSDKTheme(
    primaryColor: .blue,
    secondaryColor: .lightGray,
    font: UIFont.systemFont(ofSize: 16)
)
PaymentSDK.shared.applyTheme(theme)
</code></pre>
</div>
<p>Refer to the <code>PaymentSDKTheme</code> documentation for all available customization options.</p>
`,
    relatedSuggestionsQuery: 'customize PaymentSDK UI iOS',
  },
];

// export const FIGMA_PROTOTYPE_URL = "https://www.figma.com/proto/Qy1SqTQFBGy0MbDona2oA5/Finance-Management-Mobile-App-UI-UX-Kit-for-Budget-Tracker-Financial-Prototype-Design--Community-?node-id=7113-2955&starting-point-node-id=7113%3A2955&scaling=contain&hide-ui=1&hotspot-hints=false&show-proto-sidebar=false&footer=false&viewport-controls=false";

// --- New constants for Embed Kit 2.0 ---
// Extracted from the FIGMA_PROTOTYPE_URL
export const FIGMA_FILE_KEY = "Qy1SqTQFBGy0MbDona2oA5"; 
// uoGu3U8xmrBAxw2jUm91LQ // Qy1SqTQFBGy0MbDona2oA5
// IMPORTANT: Replace with your actual Figma OAuth App Client ID
export const FIGMA_CLIENT_ID = "eei95vaW5N3lSAmtqIeWnL"; 
