export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#D1FAE5] p-8 font-poppins text-[#111827]">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-[#A7F3D0]">
        <h1 className="text-3xl font-bold mb-4 text-[#14B8A6]">Privacy Policy</h1>

        <p className="mb-4">
          Einkauf is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal data in compliance with the General Data Protection Regulation (GDPR).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#14B8A6]">What We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Name and contact details (e.g. email, phone number)</li>
          <li>Basic profile information (e.g. location, availability)</li>
          <li>Optional bio you choose to provide</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#14B8A6]">Why We Collect This</h2>
        <p className="mb-4">
          We collect your information to connect users (e.g. students and helpers) for grocery support and communication purposes within the platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#14B8A6]">How Your Data is Used</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To create and manage your user profile</li>
          <li>To match you with others in your area</li>
          <li>To help with contact and scheduling between users</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#14B8A6]">Your Rights</h2>
        <p className="mb-4">
          Under GDPR, you have the right to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access the data we hold about you</li>
          <li>Correct or update your personal information</li>
          <li>Request deletion of your data at any time</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#14B8A6]">How We Protect Your Data</h2>
        <p className="mb-4">
          All personal data is stored securely using Firebase, which complies with international data protection standards. Access is restricted and encrypted where possible.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#14B8A6]">Contact</h2>
        <p className="mb-4">
          If you have questions or want to request data access or deletion, contact us at: <strong className="text-[#14B8A6]">support@einkauf-app.de</strong>
        </p>

        <p className="text-sm text-gray-600 mt-8">Last updated: June 2025</p>
      </div>
    </div>
  );
}
