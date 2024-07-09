import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            CodeBuddy Terms of Service
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-indigo">
            <p>
              Please read these Terms of Service (Terms, Terms of Service)
              carefully before using the CodeBuddy website and AI tutoring
              service (the Service) operated by [Your Company Name] (us, we, or
              our).
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you may
              not access the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              2. Description of Service
            </h2>
            <p>
              CodeBuddy is an AI-powered coding tutor designed to assist users
              in learning programming concepts, answering coding questions, and
              analyzing code snippets.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              3. Use of AI Technology
            </h2>
            <p>
              3.1. You acknowledge that the Service utilizes artificial
              intelligence technologies to provide tutoring and assistance.
            </p>
            <p>
              3.2. While we strive for accuracy, you understand and agree that
              AI-generated responses may not always be perfect or complete, and
              should not be considered as professional advice.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              4. User Accounts
            </h2>
            <p>
              4.1. You may be required to create an account to access certain
              features of the Service.
            </p>
            <p>
              4.2. You are responsible for maintaining the confidentiality of
              your account and password.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              5. Free Usage and Potential Charges
            </h2>
            <p>
              5.1. The Service is currently offered free of charge. We reserve
              the right to introduce fees for certain features or the entire
              Service in the future.
            </p>
            <p>
              5.2. If we decide to introduce a fee for the Service, we will
              provide you with prior notice and the option to continue or
              discontinue your use of the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              6. Data Collection and Privacy
            </h2>
            <p>
              6.1. We collect and store data related to your use of the Service,
              including but not limited to your queries, code snippets, and
              interaction history.
            </p>
            <p>
              6.2. Our use and protection of your data is governed by our
              Privacy Policy, which is incorporated into these Terms by
              reference.
            </p>
            <p>
              6.3. You grant us a non-exclusive, worldwide, royalty-free license
              to use, store, and analyze the data you provide to improve our
              Service and AI models.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              7. Intellectual Property
            </h2>
            <p>
              7.1. The Service and its original content, features, and
              functionality are owned by [Your Company Name] and are protected
              by international copyright, trademark, patent, trade secret, and
              other intellectual property or proprietary rights laws.
            </p>
            <p>
              7.2. You retain ownership of any code or content you create while
              using the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              8. Prohibited Uses
            </h2>
            <p>You agree not to use the Service:</p>
            <ul className="list-disc pl-6">
              <li>
                For any unlawful purpose or to solicit the performance of any
                illegal activity.
              </li>
              <li>To harass, abuse, or harm another person or group.</li>
              <li>
                To impersonate or attempt to impersonate [Your Company Name], an
                employee, another user, or any other person or entity.
              </li>
              <li>
                In any way that violates any applicable federal, state, local,
                or international law or regulation.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice or liability, under our sole
              discretion, for any reason whatsoever, including without
              limitation if you breach the Terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              10. Limitation of Liability
            </h2>
            <p>
              In no event shall [Your Company Name], nor its directors,
              employees, partners, agents, suppliers, or affiliates, be liable
              for any indirect, incidental, special, consequential or punitive
              damages, including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will provide at least 30 days notice
              prior to any new terms taking effect.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              [contact email].
            </p>

            <p className="mt-6">
              By using CodeBuddy, you acknowledge that you have read and
              understood these Terms of Service and agree to be bound by them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
