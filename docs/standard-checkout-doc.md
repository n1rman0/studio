---
title: iOS SDK - Integration Steps | Razorpay Payment Gateway 
razorpay-MY-title: iOS SDK - Integration Steps | Curlec Payment Gateway 
heading: Integration Steps
desc: Steps to integrate your iOS application with Razorpay iOS Standard SDK.
razorpay-MY-desc: Steps to integrate your iOS application with Curlec iOS Standard SDK.
index: true
tags: integrate ios sdk, standard, ios integration, payment gateway, integration steps
---

Follow these steps to integrate your iOS application:

<cards column="3">
  <card href="/payments/payment-gateway/ios-integration/standard/integration-steps#1-build-integration"
   title="1. Build Integration"
   description="Integrate iOS Standard Checkout."
   headingVariant="H4"
   variant="info"
/>
  <card href="/payments/payment-gateway/ios-integration/standard/integration-steps#2-test-integration"
   title="2. Test Integration"
   description="Test the integration by making a test payment."
   headingVariant="H4"
   variant="warn"
/>
  <card href="/payments/payment-gateway/ios-integration/standard/integration-steps#3-go-live-checklist"
   title="3. Go-live Checklist"
   description="Check the go-live checklist."
   headingVariant="H4"
   variant="success"
/>
</cards>

<show-if org-country = 'axis-IN, razorpay-IN'>

<iframe width="560" style='max-width:100%' height="315" src="https://www.youtube.com/embed/5HTQX-AokIk" title="How to Integrate Razorpay Payment Gateway on iOS Apps" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</show-if>

## 1. Build Integration

Follow the steps given below:

<faqs accordian>
    <faq>
        <question level="3">1.1 Import Razorpay iOS Standard SDK Library</question>
        <answer>
         You can import the Razorpay iOS Standard SDK library using any of these ways: 
         <tabs>
            <tabitem title='Cocoapod'>
                Refer to our <a href="https://cocoapods.org/pods/razorpay-pod" target="_blank">Cocoapod</a> (bitcode enabled) pod.
            </tabitem>
            <tabitem title='Manual'>
                1. Download the SDK and unzip it.
                2. Open your project in XCode and go to **file** under **Menu**. Select **Add files to "yourproject"**.
                3. Select **Razorpay.xcframework** in the directory you just unzipped.
                4. Select the **Copy items if needed** checkbox.
                5. Click **Add**.
                6. Navigate to **Target settings → General** and add the **Razorpay.xcframework** in both **Embedded Binaries** and **Linked Frameworks and Libraries**.
            </tabitem>
            <tabitem title='Objective-C'>
                If you are building an **Objective-C** project, follow the steps given for Swift and the additional steps given below:
                1. Go to **Project Settings** and select **Build Settings - All and Combined**.
                2. Set the **Always Embed Swift Standard Libraries** option to **TRUE**.

                Ensure that you have the framework added in both **Embedded Binaries** and **Linked Frameworks and Libraries** under **Target settings - General**.
            </tabitem>
         </tabs>

         <faqs accordian>
            <faq>
                <question>Xcode 11</question>
                <answer>
                 Ensure that you have the framework added in **Frameworks, Libraries, and Embed Content** under **Target settings - General**. Change `Embed status` from - `Do not Embed` to `Embed & Sign`. <br/>
                 Watch the GIF to see how to add Frameworks, Libraries and Embed Content.

                 <img src="/docs/assets/images/ios-embed-framework.gif" alt="add Frameworks, Libraries and Embed Content" width="800"/>
                </answer>
            </faq>
         </faqs>
        </answer>
    </faq>
    <faq>
        <question level="3">1.2 Initialize Razorpay iOS Standard SDK</question>
        <answer>
         To initialize Razorpay iOS Standard SDK, you need the following:

         - API keys. You can generate this from the <a href="/docs/payments/dashboard/account-settings/api-keys/#generate-api-keys" target="_blank">Dashboard</a>.

             <callout warn>
             **Watch Out!**

             API keys should not be hardcoded in the app. Must be sent from your backend as app-related metadata fetch.
             </callout>

         - A delegate that implements `RazorpayPaymentCompletionProtocol` or `RazorpayPaymentCompletionProtocolWithData`.

         <callout warn>

         **Watch Out!**

         - For Swift version 5.1+, ensure that you declare `var razorpay: RazorpayCheckout!`. 
         - For versions lower than 5.1, use `var razorpay: Razorpay!`.
         - Alternatively, you can use the following alias and retain the variable as Razorpay. <br/>

         `typealias Razorpay = RazorpayCheckout`
         </callout>


         ```swift: ViewController.swift

         import Razorpay

         class ViewController: UIViewController, RazorpayPaymentCompletionProtocol {

         // typealias Razorpay = RazorpayCheckout

             var razorpay: RazorpayCheckout!
             override func viewDidLoad() {
                 super.viewDidLoad()
                 razorpay = RazorpayCheckout.initWithKey(razorpayTestKey, andDelegate: self)
             }
             override func viewWillAppear(_ animated: Bool) {
             super.viewWillAppear(animated)
                     self.showPaymentForm()
             }
         }
         ```objectivec: ViewController.m
         #import <Razorpay/Razorpay.h>
         //- typedef RazorpayCheckout Razorpay;

         @interface ViewController () <RazorpayPaymentCompletionProtocol> {
         RazorpayCheckout *razorpay;
             .
             .
             - (void)viewDidLoad {
                 [super viewDidLoad];
                 .
                 .
                 razorpay = [RazorpayCheckout initWithKey:@"YOUR_PUBLIC_KEY" andDelegate:self];
             }
         }
         ```
        </answer>
    </faq>
    <faq>
        <question level="3">1.3 Create an Order in Server</question>
        <answer>
         @include integration-steps/order-creation-v2
        </answer>
    </faq>
</faqs>
<faqs accordian>
    <faq open>
        <question level="3">1.4 Pass Payment Options and Display Checkout Form</question>
        <answer>
         Call `RazorpayCheckout.checkIntegration(withMerchantKey: <merchant_key>)` to check the health of integration. This will also let you know if the SDK version is outdated. The opinionated alerting is displayed only when it is running on simulators. Add the following code to your `ViewController` or wherever you want to initialize payments:

         ```swift: ViewController.swift
         internal func showPaymentForm(){
             let options: [String:Any] = [
                         "key": "YOUR_KEY_ID",
                         "amount": "100", // This is in currency subunits. 
                         "currency": "<currency>",// We support more that 92 international currencies.
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
         }
         ```objectivec: ViewController.m
         - (void)showPaymentForm { // called by your app
         NSDictionary *options = @{
                                     @"key": @"YOUR_KEY_ID",
                                     @"amount": @"1000",  // This is in currency subunits. 
                                     // all optional other than amount.
                                     @"currency": @"<currency>",  // We support more that 92 international currencies.
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
         }
         ```

         <callout info>

         **Optional Parameter - displayController**

         When the optional parameter- displayController, is specified, the Razorpay controller is pushed onto this controller's navigation controller if present or presented on this controller if absent.

         ```
         razorpay.open(options, displayController: self)
         ```
         </callout>
         <faqs accordian>
            <faq>
                <question>1.4.1 Checkout Options</question>
                <answer>
                 You must pass these parameters in Checkout to initiate the payment.

                 @include checkout-parameters/standard

                 <callout warn>

                 **Watch Out!**

                 To support theme colour in the progress bar, please pass HEX colour values only.
                 </callout>
                </answer>
            </faq>
            <show-if org-country = 'axis-IN, razorpay-IN, hdfc-IN'>
            <faq>
                <question>1.4.2 Enable UPI Intent on iOS *(Optional)*</question>
                <answer>
                 @include integration-steps/ios-upi-intent
                </answer>
            </faq>
            </show-if>
         </faqs>
        </answer>
    </faq>
</faqs>
<faqs accordian>
    <faq>
        <question level="3">1.5 Handle Success and Errors Events</question>
        <answer>
         After completing payment, you can handle success or error events by implementing `onPaymentSuccess` and `onPaymentError` methods of the `RazorpayPaymentCompletionProtocol`.

         Alternatively, you can implement `onPaymentSuccess` and `onPaymentError` methods of `RazorpayPaymentCompletionProtocolWithData`.

         <tabs>
            <tabitem title='RazorpayPaymentCompletionProtocol'>
                ```swift: ViewController.swift
                extension CheckoutViewController : RazorpayPaymentCompletionProtocol {

                    func onPaymentError(_ code: Int32, description str: String) {
                        print("error: ", code, str)
                        self.presentAlert(withTitle: "Alert", message: str)
                    }

                    func onPaymentSuccess(_ payment_id: String) {
                        print("success: ", payment_id)
                        self.presentAlert(withTitle: "Success", message: "Payment Succeeded")
                    }
                }
                ```objectivec: ViewController.m
                - (void)onPaymentSuccess:(NSString *)payment_id {
                [self showAlertWithTitle:SUCCESS_TITLE
                                andMessage:[NSString
                                            stringWithFormat:SUCCESS_MESSAGE, payment_id]];
                }

                - (void)onPaymentError:(int)code description:(NSString *)str {
                [self showAlertWithTitle:FAILURE_TITLE
                                andMessage:[NSString
                                            stringWithFormat:FAILURE_MESSAGE, code, str]];
                }
                ```
            </tabitem>
            <tabitem title='RazorpayPaymentCompletionProtocolWithData'>
               ```swift: ViewController.swift
                extension CheckoutViewController: RazorpayPaymentCompletionProtocolWithData {

                    func onPaymentError(_ code: Int32, description str: String, andData response: [AnyHashable : Any]?) {
                        print("error: ", code)
                        self.presentAlert(withTitle: "Alert", message: str)
                    }

                    func onPaymentSuccess(_ payment_id: String, andData response: [AnyHashable : Any]?) {
                        print("success: ", payment_id)
                        self.presentAlert(withTitle: "Success", message: "Payment Succeeded")
                    }
                }
                ```objectivec: ViewController.m
                - (void)onPaymentError:(int32_t)code description:(NSString * _Nonnull)str andData:(NSDictionary * _Nullable)response {
                    NSLog(@"%@ %@",str, response);
                }
                - (void)onPaymentSuccess:(NSString * _Nonnull)payment_id andData:(NSDictionary * _Nullable)response {
                    NSLog(@"%@ %@",payment_id, response);
                }
                ```

                After completing the payment, add necessary actions based on success or error events.
            </tabitem>
         </tabs>

         <faqs accordian>
            <faq>
                <question>Failure Codes</question>
                <answer>
                 - 0: Network error
                 - 1: Initialization failure / Unexpected behaviour
                 - 2: Payment cancelled by the user

                 Success handler receives `payment_id` that you can use later for capturing the payment.
                </answer>
            </faq>
         </faqs>
        </answer>
    </faq>
    <faq>
        <question level="3">1.6 Store the Fields in Database</question>
        <answer>
         @include integration-steps/store-fields
        </answer>
    </faq>
    <faq>
        <question level="3">1.7 Verify Payment Signature</question>
        <answer>
         @include integration-steps/verify-signature
        </answer>
    </faq>
    <faq>
        <question level="3">1.8 Verify Payment Status</question>
        <answer>
         @include integration-steps/verify-payment-status
        </answer>
    </faq>
</faqs>

## 2. Test Integration

@include integration-steps/next-steps

## 3. Go-live Checklist

Check the go-live checklist for <brand-name/> iOS integration. Consider these steps before taking the integration live.

<faqs accordian>
    <faq>
        <question level="3">3.1 Accept Live Payments</question>
        <answer>
         @include accept-live-payments
        </answer>
    </faq>
    <faq>
        <question level="3">3.2 Payment Capture</question>
        <answer>
         @include integration-steps/capture-settings
        </answer>
    </faq>
    <faq>
        <question level="3">3.3 Set Up Webhooks</question>
        <answer>
         Ensure you have <a href="/docs/webhooks/setup-edit-payments/" target="_blank">set up webhooks</a> in the live mode and configured the events for which you want to receive notifications.
        </answer>
    </faq>
</faqs>
