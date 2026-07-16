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
      <p>Welcome to {SITE_NAME}. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights.</p>
      
      <h2>2. The Data We Collect About You</h2>
      <p>Most of the developer tools on this website (such as JSON formatters, Encoders, Decoders) run entirely within your web browser (client-side processing). The data you paste into these tools is <strong>not sent to, stored on, or processed by our servers</strong>. It remains on your device.</p>
      <p>However, we may collect, use, store and transfer different kinds of technical data about you:</p>
      <ul>
        <li><strong>Usage Data:</strong> Information about how you use our website, pages visited, time spent on the page.</li>
        <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
      </ul>
      
      <h2>3. Third-Party Services</h2>
      <p>We use third-party services that may collect information about you:</p>
      <ul>
        <li><strong>Google Analytics:</strong> We use Google Analytics to monitor and analyze the use of our service.</li>
        <li><strong>Google AdSense:</strong> We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to this website or other websites.</li>
      </ul>
      
      <h2>4. Cookies</h2>
      <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. To learn more about how Google uses data when you use our partners&apos; sites or apps, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google&apos;s Policy</a>.</p>
      
      <h2>5. Data Security</h2>
      <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. Since our core tools run locally in your browser, your code and data are inherently protected from server-side breaches.</p>
      
      <h2>6. Changes to the Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
    </div>
  );
}
