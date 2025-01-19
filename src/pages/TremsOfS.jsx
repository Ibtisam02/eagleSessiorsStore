import React, { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
        
        <div className="space-y-6">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">OVERVIEW</h2>
            <p className="mb-4">
            Welcome to Eagle Traders Uk Ltd. Throughout the site, the terms "we", "us" and "our" refer to Eagle Traders Uk Ltd. Eagle Traders Uk Ltd offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
            </p>
            <p className="mb-4">
              By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">1. ONLINE STORE TERMS</h2>
            <p className="mb-4">
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may not use our products for any illegal or unauthorized purpose.</li>
              <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
              <li>A breach or violation of any of the Terms will result in an immediate termination of your Services.</li>
              <li>Do not use our products for any illeagal or harmful activity even if you buy from our store.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">2. GENERAL CONDITIONS</h2>
            <p className="mb-4">
              We reserve the right to refuse Service to anyone for any reason at any time.
            </p>
            <p className="mb-4">
              You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">3. ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h2>
            <p className="mb-4">
              We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">4. MODIFICATIONS TO THE SERVICE AND PRICES</h2>
            <p className="mb-4">
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">5. PRODUCTS OR SERVICES</h2>
            <p className="mb-4">
              Certain products or Services may be available exclusively online through the website. These products or Services may have limited quantities and are subject to return or exchange only according to our Refund Policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">6. ACCURACY OF BILLING AND ACCOUNT INFORMATION</h2>
            <p className="mb-4">
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">CONTACT INFORMATION</h2>
            <p className="mb-4">
              Questions about the Terms of Service should be sent to us at eagletraders121@gmail.com.
            </p>
          </section>

          <p className="mt-8 text-right">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;