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
<p class="mb-2">Learn how to implement a robust shopping cart system in your iOS app with our e-commerce SDK.</p>
<h2 class="font-headline text-2xl mt-4 mb-2">Cart Management</h2>
<div class="bg-muted p-4 rounded-md my-4">
<pre><code class="font-code text-sm">
import ECommerceSDK

// Initialize cart
let cart = ShoppingCart()

// Add items to cart
let product = Product(id: "123", name: "iPhone Case", price: 29.99)
cart.addItem(product, quantity: 2)

// Update quantity
cart.updateQuantity(productId: "123", quantity: 3)

// Remove item
cart.removeItem(productId: "123")

// Get cart total
let total = cart.getTotalPrice()
</code></pre>
</div>
<h2 class="font-headline text-2xl mt-4 mb-2">Cart Persistence</h2>
<p class="mb-2">The cart automatically persists data locally using Core Data, ensuring user's cart survives app restarts.</p>
<div class="bg-muted p-4 rounded-md my-4">
<pre><code class="font-code text-sm">
// Save cart to persistent storage
cart.save()

// Load existing cart
let savedCart = ShoppingCart.loadFromStorage()
</code></pre>
</div>
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
        id: 'checkout-loading',
        figmaNodeId: '3:161', // Checkout Loading node ID
        title: 'Checkout Loading States',
        iconName: 'BookOpen',
        content: `
<h1 class="font-headline text-3xl mb-4">Managing Checkout Loading States</h1>
<p class="mb-2">Ensure a smooth checkout experience by implementing proper loading states during payment processing and order completion.</p>

<h2 class="font-headline text-2xl mt-6 mb-2">Payment Processing States</h2>
<div class="bg-muted p-4 rounded-md my-4">

</div>
<h2 class="font-headline text-2xl mt-4 mb-2">Loading State UI Components</h2>
<p class="mb-2">Create visually appealing loading indicators that keep users informed during the checkout process.</p>
<div class="bg-muted p-4 rounded-md my-4">

</div>
<h2 class="font-headline text-2xl mt-4 mb-2">Error Handling During Loading</h2>
<p class="mb-2">Gracefully handle errors and provide clear feedback when checkout operations fail.</p>
<div class="bg-muted p-4 rounded-md my-4">
<pre><code class="font-code text-sm">
private func showErrorState(_ error: PaymentError) {
    let alert = UIAlertController(
        title: "Payment Failed",
        message: error.localizedDescription,
        preferredStyle: .alert
    )
    
    alert.addAction(UIAlertAction(title: "Try Again", style: .default) { _ in
        self.processPayment()
    })
    
    alert.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in
        self.navigationController?.popViewController(animated: true)
    })
    
    present(alert, animated: true)
}
</code></pre>
</div>
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
    {
        id: 'checkout',
        figmaNodeId: '0:1220', // Checkout node ID
        title: 'Checkout Process',
        iconName: 'BookOpen',
        content: `
<h1 class="font-headline text-3xl mb-4">Implementing Secure Checkout</h1>
<p class="mb-2">Complete the purchase flow with our secure checkout implementation supporting multiple payment methods.</p>
<h2 class="font-headline text-2xl mt-4 mb-2">Checkout Flow</h2>
<div class="bg-muted p-4 rounded-md my-4">
<pre><code class="font-code text-sm">
<APIDocumentationExample/>
import PaymentSDK

class CheckoutViewController: UIViewController {
    
    func initiateCheckout() {
        let checkoutData = CheckoutData(
            cart: currentCart,
            shippingAddress: userShippingAddress,
            billingAddress: userBillingAddress
        )
        
        PaymentSDK.shared.presentCheckout(
            with: checkoutData,
            from: self
        ) { [weak self] result in
            switch result {
            case .success(let transaction):
                self?.handleSuccessfulPayment(transaction)
            case .failure(let error):
                self?.handlePaymentError(error)
            case .cancelled:
                self?.handlePaymentCancellation()
            }
        }
    }
    
    private func handleSuccessfulPayment(_ transaction: Transaction) {
        // Clear cart
        ShoppingCart.shared.clear()
        
        // Show success screen
        let successVC = OrderConfirmationViewController(transaction: transaction)
        navigationController?.pushViewController(successVC, animated: true)
    }
}
</code></pre>
</div>
<h2 class="font-headline text-2xl mt-4 mb-2">Payment Methods</h2>
<p class="mb-2">Support multiple payment options including Apple Pay, credit cards, and digital wallets.</p>
<ul class="list-disc pl-5 space-y-1 mb-4">
  <li>Apple Pay integration</li>
  <li>Credit/Debit cards (Stripe, Square)</li>
  <li>PayPal and digital wallets</li>
  <li>Buy now, pay later options</li>
</ul>
`,
        relatedSuggestionsQuery: 'iOS secure checkout implementation payment methods',
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
