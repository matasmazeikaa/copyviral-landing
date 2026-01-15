"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CopyViral</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-slate-400 mb-12">Last updated: January 13, 2026</p>

          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-300 leading-relaxed">
                By accessing or using CopyViral, you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do
                not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-slate-300 leading-relaxed">
                CopyViral is an AI-powered video editing platform that allows
                users to analyze viral videos and recreate similar editing
                styles with their own content. The service includes video
                analysis, timeline editing, text overlays, and video export
                capabilities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                3. User Accounts
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                To use certain features of CopyViral, you must create an
                account. You agree to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                4. Subscription and Payments
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                CopyViral offers both free and paid subscription plans:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>
                  <strong>Free Plan:</strong> Includes 3 AI generations
                  (lifetime) with basic features
                </li>
                <li>
                  <strong>Pro Plan:</strong> $9.99/month for unlimited AI
                  generations and premium features
                </li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                Subscriptions are billed monthly. You may cancel your
                subscription at any time, and it will remain active until the
                end of the current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                5. Acceptable Use
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                You agree not to use CopyViral to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the intellectual property rights of others</li>
                <li>
                  Upload or create content that is illegal, harmful, or
                  offensive
                </li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>
                  Use the service for any commercial purpose without
                  authorization
                </li>
                <li>
                  Reverse engineer or attempt to extract source code from the
                  service
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                6. Content Ownership
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                <strong>Your Content:</strong> You retain all rights to the
                content you upload and create using CopyViral. By using our
                service, you grant us a limited license to process your content
                solely to provide the service.
              </p>
              <p className="text-slate-300 leading-relaxed">
                <strong>Our Content:</strong> CopyViral and its original
                content, features, and functionality are owned by CopyViral and
                are protected by copyright, trademark, and other intellectual
                property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                7. Copyright and Video Analysis
              </h2>
              <p className="text-slate-300 leading-relaxed">
                When you submit video URLs for analysis, you represent that you
                have the right to analyze such content or that such analysis
                falls under fair use. CopyViral is not responsible for any
                copyright infringement resulting from your use of the service.
                You are solely responsible for ensuring your use of analyzed
                content complies with applicable copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                8. Disclaimer of Warranties
              </h2>
              <p className="text-slate-300 leading-relaxed">
                CopyViral is provided &quot;as is&quot; and &quot;as
                available&quot; without any warranties of any kind, either
                express or implied. We do not guarantee that the service will be
                uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-slate-300 leading-relaxed">
                To the maximum extent permitted by law, CopyViral shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, including loss of profits, data, or other
                intangible losses, resulting from your use or inability to use
                the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                10. Termination
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We reserve the right to suspend or terminate your account at any
                time for violations of these terms or for any other reason at
                our discretion. Upon termination, your right to use the service
                will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-slate-300 leading-relaxed">
                We may modify these terms at any time. We will notify users of
                significant changes via email or through the service. Your
                continued use of CopyViral after changes constitutes acceptance
                of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                12. Governing Law
              </h2>
              <p className="text-slate-300 leading-relaxed">
                These terms shall be governed by and construed in accordance
                with the laws of the jurisdiction in which CopyViral operates,
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                13. Contact Information
              </h2>
              <p className="text-slate-300 leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at{" "}
                <a
                  href="mailto:support@copyviral.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  support@copyviral.com
                </a>
                .
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CopyViral. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-slate-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
