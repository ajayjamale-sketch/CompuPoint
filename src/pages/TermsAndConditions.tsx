import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";

export default function TermsAndConditions() {
  const sections = [
    { title: "Acceptance of Terms", content: "By accessing or using CompuPoint's platform and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services. These terms apply to all users of the platform, including students, professionals, trainers, technicians, and administrators." },
    { title: "Use of Services", content: "CompuPoint grants you a limited, non-exclusive, non-transferable license to access and use our platform for personal, non-commercial learning and IT service purposes. You may not: share your account credentials with others; attempt to reverse engineer the platform; use automated tools to scrape content; engage in any unlawful activities through our platform; or violate any intellectual property rights." },
    { title: "User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. CompuPoint reserves the right to suspend or terminate accounts that violate these terms, engage in fraudulent activities, or abuse our services." },
    { title: "Course Enrollment and Certifications", content: "Course enrollments are personal and non-transferable. Certification attempts are subject to fair use policies outlined in individual program descriptions. CompuPoint reserves the right to revoke certifications obtained through fraudulent means or violation of exam policies. Certificate validity periods are as specified in individual program details." },
    { title: "IT Services Terms", content: "Hardware and software service requests are subject to service-level agreements specified at the time of booking. CompuPoint is not liable for data loss during repair services; customers are advised to backup data before service. Service charges are due upon completion unless a pre-payment agreement is in place. AMC contracts are governed by separate service agreements." },
    { title: "Payment and Refunds", content: "Subscription fees are billed in advance on a monthly or annual basis. All sales are final after the 7-day free trial period, except where required by applicable law. Refund requests during the trial period will be honored in full. Enterprise contracts are governed by separate billing agreements. Prices are subject to change with 30 days advance notice." },
    { title: "Intellectual Property", content: "All course content, materials, software, designs, and trademarks on CompuPoint are the exclusive property of CompuPoint Technologies Pvt. Ltd. or its content partners. You may not reproduce, distribute, or create derivative works without explicit written permission. User-generated content such as forum posts remain the property of users but grant CompuPoint a license to use." },
    { title: "Limitation of Liability", content: "CompuPoint provides its services 'as is' and 'as available'. To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from your use of our services, including loss of data, profits, or business opportunities. Our total liability shall not exceed the fees paid in the last 3 months." },
    { title: "Dispute Resolution", content: "Any disputes arising from these Terms shall be resolved through arbitration in Bangalore, Karnataka, India, in accordance with the Indian Arbitration and Conciliation Act. You agree to attempt informal resolution before initiating formal proceedings. Class action lawsuits against CompuPoint are waived to the extent permitted by law." },
    { title: "Governing Law", content: "These Terms are governed by the laws of India and the state of Karnataka. You consent to the exclusive jurisdiction of courts in Bangalore, Karnataka for any disputes not resolved through arbitration." },
    { title: "Changes to Terms", content: "We reserve the right to modify these Terms at any time. Material changes will be notified via email and platform notifications 30 days before taking effect. Continued use of the platform after changes constitutes acceptance of the new terms." },
    { title: "Contact Information", content: "For questions about these Terms, contact us at legal@compupoint.in or by mail at CompuPoint Technologies Pvt. Ltd., Koramangala, Bangalore, Karnataka 560034, India." },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950 border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="section-heading mb-3">Terms & Conditions</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Last Updated: January 1, 2026 · Effective immediately</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card-base p-6 sm:p-8 mb-8">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Please read these Terms and Conditions carefully before using CompuPoint's platform. These terms govern your access to and use of our education, certification, IT services, and marketplace features. By using CompuPoint, you agree to be legally bound by these terms.
          </p>
        </div>

        <div className="space-y-5">
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

        <div className="text-center mt-10 p-6 card-base">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Questions about our Terms? Email{" "}
            <a href="mailto:legal@compupoint.in" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">legal@compupoint.in</a>
          </p>
          <Link to="/contact" className="btn-primary text-sm px-5 py-2.5">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
