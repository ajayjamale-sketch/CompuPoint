import { Link } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    { title: "Information We Collect", content: "We collect information you provide directly to us when you create an account, enroll in courses, request services, or communicate with us. This includes: name, email address, phone number, payment information, profile information, learning progress, and usage data. We also automatically collect certain information when you use our platform, including log data, device information, IP address, and cookies." },
    { title: "How We Use Your Information", content: "We use the information we collect to: provide, maintain, and improve our services; process transactions and send related information; send technical notices, updates, security alerts, and support messages; respond to comments and questions; personalize your experience; monitor and analyze trends and usage; detect and prevent fraudulent transactions and other illegal activities; and comply with legal obligations." },
    { title: "Information Sharing", content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, conducting our business, or servicing you. We may also release information when its release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety." },
    { title: "Data Security", content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use SSL encryption for all data transmission, secure cloud storage with regular backups, and access controls to limit who can access your personal data within our organization." },
    { title: "Cookies and Tracking Technologies", content: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service." },
    { title: "Data Retention", content: "We retain your personal information for as long as necessary to provide our services, comply with our legal obligations, resolve disputes, and enforce our policies. If you request deletion of your account, we will delete your personal information within 30 days, except where we are required by law to retain certain information." },
    { title: "Children's Privacy", content: "Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions." },
    { title: "Your Rights", content: "You have the right to access your personal data, request correction of inaccurate data, request deletion of your data, object to processing of your data, request restriction of processing, and request data portability. To exercise any of these rights, please contact us at privacy@compupoint.in." },
    { title: "Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. You are advised to review this Privacy Policy periodically for any changes." },
    { title: "Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at: privacy@compupoint.in or by mail at CompuPoint Technologies Pvt. Ltd., Koramangala, Bangalore, Karnataka 560034, India." },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950 border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="section-heading mb-3">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Last Updated: January 1, 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card-base p-6 sm:p-8 mb-8">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            CompuPoint Technologies Pvt. Ltd. ("CompuPoint", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform and use our services. Please read this policy carefully.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={section.title} className="card-base p-6">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-3 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 text-primary-600 dark:text-primary-400 text-sm font-bold">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm pl-10">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 p-6 card-base bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            For privacy-related concerns, contact us at{" "}
            <a href="mailto:privacy@compupoint.in" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">privacy@compupoint.in</a>
          </p>
          <Link to="/contact" className="btn-primary text-sm px-5 py-2.5">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
