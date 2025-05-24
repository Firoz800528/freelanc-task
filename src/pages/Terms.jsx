import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Fade direction="down" triggerOnce>
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="mb-4 text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </Fade>

      <Slide cascade damping={0.1} direction="up" triggerOnce>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to FreelanceTask. By accessing or using our platform, you agree to these Terms & Conditions. If you disagree, please do not use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
          <p>
            You agree to use the platform lawfully and honestly. Misleading information, fraudulent activities, or misuse of the platform may result in account suspension or termination.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. Posting & Bidding</h2>
          <p>
            Clients may post freelance tasks, and freelancers may place bids. Users are responsible for clearly communicating expectations, deliverables, and deadlines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">4. Payments</h2>
          <p>
            All payments are made independently between users. FreelanceTask does not manage or hold any funds and is not responsible for payment disputes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
          <p>
            Users retain ownership of the content they create and submit. However, by submitting content, you grant FreelanceTask a non-exclusive license to display it on the platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">6. Account Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate our terms, behave abusively, or compromise platform integrity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the platform after changes means you agree to the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms & Conditions, please email us at{" "}
            <a
              href="mailto:info@freelancetask.com"
              className="text-blue-600 hover:underline"
            >
              info@freelancetask.com
            </a>.
          </p>
        </section>
      </Slide>
    </div>
  );
};

export default Terms;
