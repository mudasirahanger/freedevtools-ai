import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 prose dark:prose-invert">
      <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Introduction</h2>
      <p>Welcome to {SITE_NAME}. We respect your privacy and are committed to protecting your personal data.</p>
      
      <h2>2. Client-Side Processing</h2>
      <p>Most of the developer tools on this website (such as JSON formatters, Encoders, Decoders) run entirely within your web browser. The data you paste into these tools is not sent to, stored on, or processed by our servers.</p>
      
      <h2>3. Third-Party Services</h2>
      <p>We use third-party services that may collect information about you:</p>
      <ul>
        <li><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors engage with our website.</li>
        <li><strong>Google AdSense:</strong> We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this website or other websites.</li>
      </ul>
      
      <h2>4. Cookies</h2>
      <p>You can choose to disable cookies through your individual browser options. To learn more about how Google uses data when you use our partners&apos; sites or apps, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google&apos;s Policy</a>.</p>
    </div>
  );
}
