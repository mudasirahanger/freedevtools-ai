import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}`,
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 prose dark:prose-invert">
      <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using {SITE_NAME} (&quot;the Website&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Website.</p>
      
      <h2>2. Description of Service</h2>
      <p>{SITE_NAME} provides various free developer tools, utilities, and AI prompt generators. We reserve the right to modify, suspend, or discontinue any tool or service at any time without notice.</p>
      
      <h2>3. Use License</h2>
      <p>Permission is granted to temporarily use the tools on {SITE_NAME} for personal or commercial transient use. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
      <ul>
        <li>Use the tools for any illegal or unauthorized purpose.</li>
        <li>Attempt to decompile or reverse engineer any software contained on the Website.</li>
        <li>Use the Website in any manner that could damage, disable, overburden, or impair the servers or networks.</li>
      </ul>
      
      <h2>4. Disclaimer of Warranties</h2>
      <p>The materials and tools on {SITE_NAME} are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      
      <h2>5. Limitations of Liability</h2>
      <p>In no event shall {SITE_NAME} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Website.</p>
      
      <h2>6. Revisions and Errata</h2>
      <p>The materials appearing on the Website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current. We may make changes to the materials contained on the Website at any time without notice.</p>
      
      <h2>7. Modifications</h2>
      <p>We may revise these terms of service for the Website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
    </div>
  );
}
