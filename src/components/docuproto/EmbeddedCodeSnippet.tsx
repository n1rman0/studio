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
            orderId: "order_\(UUID().uuidString)",
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

// Razorpay documentation exact snippets (from standard-checkout-doc.md)
export const RzpInitSwiftSnippet: React.FC = () => (
  <CodeSnippet
    title="Initialize Razorpay (Swift)"
    language="swift"
    code={`import Razorpay

class ViewController: UIViewController, RazorpayPaymentCompletionProtocol {
    // typealias Razorpay = RazorpayCheckout
    var razorpay: RazorpayCheckout!
    override func viewDidLoad() {
        super.viewDidLoad()
        razorpay = RazorpayCheckout.initWithKey("YOUR_PUBLIC_KEY", andDelegate: self)
    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.showPaymentForm()
    }
}`}
  />
);

export const RzpInitObjcSnippet: React.FC = () => (
  <CodeSnippet
    title="Initialize Razorpay (Objective-C)"
    language="objectivec"
    code={`#import <Razorpay/Razorpay.h>
// typedef RazorpayCheckout Razorpay;

@interface ViewController () <RazorpayPaymentCompletionProtocol> {
    RazorpayCheckout *razorpay;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    razorpay = [RazorpayCheckout initWithKey:@"YOUR_PUBLIC_KEY" andDelegate:self];
}
@end`}
  />
);

export const RzpOpenSwiftSnippet: React.FC = () => (
  <CodeSnippet
    title="Pass Options and Open Checkout (Swift)"
    language="swift"
    code={`internal func showPaymentForm(){
    let options: [String:Any] = [
        "key": "YOUR_KEY_ID",
        "amount": "100", // This is in currency subunits.
        "currency": "<currency>", // We support more than 92 international currencies.
        "description": "purchase description",
        "order_id": "order_DBJOWzybf0sJbb",
        "image": "https://url-to-image.jpg",
        "name": "business or product name",
        "prefill": [
            "contact": "<phone>",
            "email": "<email>"
        ],
        "theme": [
            "color": "#F37254"
        ]
    ]
    razorpay.open(options)
}`}
  />
);

export const RzpOpenObjcSnippet: React.FC = () => (
  <CodeSnippet
    title="Pass Options and Open Checkout (Objective-C)"
    language="objectivec"
    code={`- (void)showPaymentForm { // called by your app
NSDictionary *options = @{
    @"key": @"YOUR_KEY_ID",
    @"amount": @"1000",  // This is in currency subunits.
    // all optional other than amount.
    @"currency": @"<currency>",  // We support more than 92 international currencies.
    @"image": @"https://url-to-image.jpg",
    @"name": @"business or product name",
    @"description": @"purchase description",
    @"order_id": @"order_4xbQrmEoA5WJ0G",
    @"prefill" : @{
        @"email": @"<email>",
        @"contact": @"<phone>"
    },
    @"theme": @{
        @"color": @"#F37254"
    }
};
[razorpay open:options];
}`}
  />
);

export const RzpDisplayControllerSwiftSnippet: React.FC = () => (
  <CodeSnippet
    title="Optional: Display Controller (Swift)"
    language="swift"
    code={`razorpay.open(options, displayController: self)`}
  />
);

export const RzpDelegateSwiftProtocolSnippet: React.FC = () => (
  <CodeSnippet
    title="Delegate: RazorpayPaymentCompletionProtocol (Swift)"
    language="swift"
    code={`extension CheckoutViewController : RazorpayPaymentCompletionProtocol {
    func onPaymentError(_ code: Int32, description str: String) {
        print("error: ", code, str)
        self.presentAlert(withTitle: "Alert", message: str)
    }

    func onPaymentSuccess(_ payment_id: String) {
        print("success: ", payment_id)
        self.presentAlert(withTitle: "Success", message: "Payment Succeeded")
    }
}`}
  />
);

export const RzpDelegateObjcProtocolSnippet: React.FC = () => (
  <CodeSnippet
    title="Delegate: RazorpayPaymentCompletionProtocol (Objective-C)"
    language="objectivec"
    code={`- (void)onPaymentSuccess:(NSString *)payment_id {
    [self showAlertWithTitle:SUCCESS_TITLE
                    andMessage:[NSString stringWithFormat:SUCCESS_MESSAGE, payment_id]];
}

- (void)onPaymentError:(int)code description:(NSString *)str {
    [self showAlertWithTitle:FAILURE_TITLE
                    andMessage:[NSString stringWithFormat:FAILURE_MESSAGE, code, str]];
}`}
  />
);

export const RzpDelegateSwiftWithDataSnippet: React.FC = () => (
  <CodeSnippet
    title="Delegate: RazorpayPaymentCompletionProtocolWithData (Swift)"
    language="swift"
    code={`extension CheckoutViewController: RazorpayPaymentCompletionProtocolWithData {
    func onPaymentError(_ code: Int32, description str: String, andData response: [AnyHashable : Any]?) {
        print("error: ", code)
        self.presentAlert(withTitle: "Alert", message: str)
    }

    func onPaymentSuccess(_ payment_id: String, andData response: [AnyHashable : Any]?) {
        print("success: ", payment_id)
        self.presentAlert(withTitle: "Success", message: "Payment Succeeded")
    }
}`}
  />
);

export const RzpDelegateObjcWithDataSnippet: React.FC = () => (
  <CodeSnippet
    title="Delegate: RazorpayPaymentCompletionProtocolWithData (Objective-C)"
    language="objectivec"
    code={`- (void)onPaymentError:(int32_t)code description:(NSString * _Nonnull)str andData:(NSDictionary * _Nullable)response {
    NSLog(@"%@ %@",str, response);
}
- (void)onPaymentSuccess:(NSString * _Nonnull)payment_id andData:(NSDictionary * _Nullable)response {
    NSLog(@"%@ %@",payment_id, response);
}`}
  />
);

// Snippets for Step 1
export const CocoaPodSnippet: React.FC = () => (
  <CodeSnippet
    title="Podfile"
    language="ruby"
    filename="Podfile"
    code={`platform :ios, '12.0'
use_frameworks!

target 'YourApp' do
  pod 'razorpay-pod'
end`}
  />
);

export const PodInstallSnippet: React.FC = () => (
  <CodeSnippet
    title="Terminal"
    language="bash"
    filename="Terminal"
    code={`pod install`}
  />
);

export const AtsInfoPlistSnippet: React.FC = () => (
  <CodeSnippet
    title="Info.plist"
    language="xml"
    filename="Info.plist"
    code={`<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>`}
  />
);

export default EmbeddedCodeSnippet; 