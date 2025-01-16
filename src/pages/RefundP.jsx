import React, { useEffect } from 'react';

const RefundPolicy = () => {
   useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Refund Policy</h2>
        <p className="mb-4">
          Thank you for choosing Eagle Scissors! We value your satisfaction and aim to provide high-quality products and services to our customers all around the globe. This refund policy outlines important information regarding refunds, returns, and applicable conditions, including specific considerations for sale items.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Cancellation Policy</h3>
        <p className="mb-4">
          Once your order has been placed you have 2 hours before your order can be modified or cancelled. Any incorrect address is at the fault of the customer and if the address is no longer contactable by yourself, the parcel will be lost and a refund WILL NOT be given.
        </p>
        <p className="mb-4">
          If you would like to cancel your order for a full refund, this can only be done within a 2-hour period. If it is after this period, you will have to wait till you receive the product and it is returned before a full refund can be given. To cancel your order, please send an email at hello@eaglescissors.com. The email MUST contain information such as: First Name, Last Name, Order Number, and Email Address. Otherwise, the order will not be cancelled and will ship as usual.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Refund Eligibility</h3>
        <p className="mb-4">
          The item must be full and in its original packaging and have not been used.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Returns and Exchanges</h3>
        <p className="mb-4">
          Due to the nature of our sale, we are no longer accepting Change of Mind or Incorrectly ordered products. In the unlikely event of a damaged item during transit, our Damaged or Defective Item ruling will still apply.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Damaged or Defective Items</h3>
        <p className="mb-4">
          In the event that you receive a damaged or defective item, please notify us within 3 days of delivery. We may request supporting evidence, such as photographs or a detailed description of the issue, to process your claim. Once we have reviewed the information provided, we will determine the appropriate course of action, which may include a refund or replacement. Refunds will be issued within 7 business days from receiving the parcel by us.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Return Procedure</h3>
        <ol className="list-decimal list-inside mb-4">
          <li>Contact our customer support team by email at hello@eaglescissors.com to notify us of your intention to return or exchange an item.</li>
          <li>Our customer support team will guide you through the return process, providing you with the necessary instructions and any applicable return shipping labels.</li>
          <li>Ensure that the item is securely packaged in its original packaging, including all accessories and documentation. We recommend using a traceable shipping method to return the item.</li>
          <li>Upon receiving the returned item, we will inspect it to ensure that it meets the required conditions for return or exchange. If the item is eligible, we will process the appropriate resolution as agreed upon during our communication.</li>
        </ol>

        <h3 className="text-2xl font-semibold mb-3">Shipping Fees</h3>
        <p className="mb-4">
          Please note that shipping fees, including return shipping costs, are non-refundable unless the return is a result of our error or a defective item. In such cases, we will cover the return shipping expenses via PayPal or a Bank Transfer.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Exclusions to Refunds</h3>
        <p className="mb-4">
          When any scissors exhibit poor performance such as bending or pushing the hair instead of cutting cleanly, it is important to note that this issue is not due to the quality of the scissors themselves. Instead, it typically stems from improper tension settings. Adjusting the tension of the scissors is crucial to their functionality. If the tension is too loose, the blades may fail to maintain proper contact, leading to hair bending during the cutting process. Conversely, if the tension is too tight, the blades may become overly rigid and hinder smooth cutting. To address these concerns and learn how to properly tighten or loosen your scissors please consult a professional or an online article or training video.
        </p>
        <p className="mb-4">
          Following these guidelines will help optimize the performance of your scissors and ensure precise and effective cutting results.
        </p>
        <p className="mb-4">
          Disclaimer: Please be aware that any scissors with custom engravings cannot be returned or refunded, as these items are personalized and cannot be restocked or resold. However, they are eligible for replacement if there is a defect or issue with the product itself.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
        <p className="mb-4">
          If you have any questions or concerns regarding our refund policy or require further assistance, please don't hesitate to contact our customer support team. You can reach us by email at hello@eaglescissors.com. We will respond to your inquiries as soon as possible.
        </p>

        <p className="mb-4">
          Please note that this refund policy is subject to change without prior notice. We recommend reviewing it periodically to stay informed about any updates or modifications.
        </p>

        <p className="mb-4">
          Thank you for choosing Eagle Scissors. We appreciate your support and understanding.
        </p>

        <p className="mb-4 text-right">Sincerely, Matt @ Eagle Scissors</p>
      </div>
    </div>
  );
};

export default RefundPolicy;
