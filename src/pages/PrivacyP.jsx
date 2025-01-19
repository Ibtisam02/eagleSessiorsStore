import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
   useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h2>
        <p className="text-gray-600 mb-6 text-center">Last updated: October 7, 2024</p>
        
        <h3 className="text-2xl font-semibold mb-3">Introduction</h3>
        <p className="mb-4">
          This Privacy Policy describes how Eagle Traders UK Ltd (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from www.thebarberscissors.com (the "Site") or otherwise communicate with us regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Changes to This Privacy Policy</h3>
        <p className="mb-4">
          We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.
        </p>

        <h3 className="text-2xl font-semibold mb-3">How We Collect and Use Your Personal Information</h3>
        <p className="mb-4">
          To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.
        </p>
        <p className="mb-4">
          In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide or improve the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
        </p>

        <h3 className="text-2xl font-semibold mb-3">What Personal Information We Collect</h3>
        <p className="mb-4">
          The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.
        </p>

        <h4 className="text-xl font-semibold mb-3">Information We Collect Directly from You</h4>
        <ul className="list-disc list-inside mb-4">
          <li>Contact details including your name, address, phone number, and email.</li>
          <li>Order information including your name, billing address, shipping address, payment confirmation, email address, and phone number.</li>
          <li>Account information including your username, password, security questions, and other information used for account security purposes.</li>
          <li>Customer support information including the information you choose to include in communications with us, for example, when sending a message through the Services.</li>
        </ul>
        <p className="mb-4">
          Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.
        </p>

        <h4 className="text-xl font-semibold mb-3">Information We Collect about Your Usage</h4>
        <p className="mb-4">
          We may also automatically collect certain information about your interaction with the Services ("Usage Data"). To do this, we may use cookies, pixels, and similar technologies ("Cookies"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address, and other information regarding your interaction with the Services.
        </p>

       
        <h3 className="text-2xl font-semibold mb-3">How We Use Your Personal Information</h3>
        <ul className="list-disc list-inside mb-4">
          
          <li>
            <strong>Marketing and Advertising:</strong> We may use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites. If you are an EEA resident, the legal basis for these data processing activities is our legitimate interest in selling our products, according to Art. 6 (1) (f) GDPR.
          </li>
          <li>
            <strong>Security and Fraud Prevention:</strong> We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately. If you are an EEA resident, the legal basis for these data processing activities is our legitimate interest in keeping our website secure for you and other customers, according to Art. 6 (1) (f) GDPR.
          </li>
          <li>
            <strong>Communicating with You and Service Improvement:</strong> We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you according to Art. 6 (1) (f) GDPR.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
