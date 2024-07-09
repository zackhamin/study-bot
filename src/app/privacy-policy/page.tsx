import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            CodeBuddy Privacy Policy
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-indigo">
            <p>
              At CodeBuddy, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              data when you use our AI tutoring service. Please read this
              privacy policy carefully. If you do not agree with the terms of
              this privacy policy, please do not access the site.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect several types of information from and about users of
              our Service, including:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Personal information you provide to us (such as name, email
                address)
              </li>
              <li>Information about your usage of the Service</li>
              <li>Your coding queries and code snippets</li>
              <li>Information about your device and internet connection</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect about you to:</p>
            <ul className="list-disc pl-6">
              <li>Provide, maintain, and improve our Service</li>
              <li>Personalize your experience with the Service</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Develop new features and services</li>
              <li>
                Monitor and analyze trends, usage, and activities in connection
                with our Service
              </li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              3. AI and Machine Learning
            </h2>
            <p>
              Our Service utilizes AI and machine learning technologies. The
              coding queries and code snippets you provide may be used to train
              and improve our AI models. This process is automated and does not
              involve human review of your individual data.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              4. Data Retention
            </h2>
            <p>
              We will retain your personal information only for as long as is
              necessary for the purposes set out in this privacy policy. We will
              retain and use your information to the extent necessary to comply
              with our legal obligations, resolve disputes, and enforce our
              policies.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              5. Data Security
            </h2>
            <p>
              We have implemented measures designed to secure your personal
              information from accidental loss and from unauthorized access,
              use, alteration, and disclosure. However, we cannot guarantee that
              unauthorized third parties will never be able to defeat those
              measures or use your personal information for improper purposes.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              6. Third-Party Services
            </h2>
            <p>
              Our Service may contain links to third-party websites and
              services. We are not responsible for the content or privacy
              practices of these third-party sites. We encourage you to read the
              privacy policies of any third-party sites you visit.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              7. Childrens Privacy
            </h2>
            <p>
              Our Service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and you are aware that your
              child has provided us with personal information, please contact
              us.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              8. Changes to Our Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the Last Updated date at the top of this Privacy
              Policy.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, such as the right to access, correct,
              or delete your data. To exercise these rights, please contact us
              using the information provided below.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p>
              [Your Company Name]
              <br />
              [Your Address]
              <br />
              Email: [Your Contact Email]
            </p>

            <p className="mt-6">
              By using CodeBuddy, you acknowledge that you have read and
              understood this Privacy Policy and agree to its terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
