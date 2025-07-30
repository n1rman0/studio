"use client";

import React from 'react';
import CodeSnippet from '@/components/ui/code-snippet';

// This component is designed to be embedded in documentation content
const EmbeddedCodeSnippet: React.FC<{ code: string; title?: string; language?: string }> = ({ 
  code, 
  title, 
  language = 'swift' 
}) => {
  return <CodeSnippet code={code} title={title} language={language} />;
};

// Pre-defined code snippets for the iOS documentation
export const CartImplementationSnippet: React.FC = () => (
  <CodeSnippet 
    title="Cart Management Implementation"
    code={`import RazorpaySDK

// Initialize cart with Razorpay
let cart = RazorpayCart()

// Add items to cart
let product = Product(id: "prod_123", name: "iPhone Case", price: 2999) // Price in paise
cart.addItem(product, quantity: 2)

// Update quantity
cart.updateQuantity(productId: "prod_123", quantity: 3)

// Remove item
cart.removeItem(productId: "prod_123")

// Get cart total in paise
let totalInPaise = cart.getTotalPrice()
let totalInRupees = totalInPaise / 100`}
  />
);

export const CartPersistenceSnippet: React.FC = () => (
  <CodeSnippet 
    title="Cart Persistence"
    code={`// Save cart to persistent storage
cart.save()

// Load existing cart
let savedCart = ShoppingCart.loadFromStorage()`}
  />
);

export const CheckoutFlowSnippet: React.FC = () => (
  <CodeSnippet 
    title="Checkout Implementation"
    code={`import RazorpaySDK

class CheckoutViewController: UIViewController {
    
    func initiateCheckout() {
        let options = RazorpayOptions(
            amount: currentCart.getTotalPrice(), // Amount in paise
            currency: "INR",
            orderId: "order_\\(UUID().uuidString)",
            name: "Your App Name",
            description: "Purchase from cart"
        )
        
        RazorpaySDK.shared.presentCheckout(
            with: options,
            from: self
        ) { [weak self] result in
            switch result {
            case .success(let payment):
                self?.handleSuccessfulPayment(payment)
            case .failure(let error):
                self?.handlePaymentError(error)
            case .cancelled:
                self?.handlePaymentCancellation()
            }
        }
    }
    
    private func handleSuccessfulPayment(_ payment: RazorpayPayment) {
        // Clear cart
        RazorpayCart.shared.clear()
        
        // Show success screen
        let successVC = OrderConfirmationViewController(payment: payment)
        navigationController?.pushViewController(successVC, animated: true)
    }
}`}
  />
);

export const ErrorHandlingSnippet: React.FC = () => (
  <CodeSnippet 
    title="Error Handling During Loading"
    code={`private func showErrorState(_ error: PaymentError) {
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
}`}
  />
);

export default EmbeddedCodeSnippet; 