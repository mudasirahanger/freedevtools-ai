import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: "About Us",
  description: `Learn more about ${SITE_NAME} and our mission to provide free developer tools.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 prose dark:prose-invert">
      <h1 className="text-4xl font-extrabold tracking-tight">About {SITE_NAME}</h1>
      <p>
        Welcome to {SITE_NAME}. Our mission is to provide developers, designers, and creators with a comprehensive suite of free, client-side tools and AI prompt generators.
      </p>
      <h2>Why we built this</h2>
      <p>
        As developers, we constantly find ourselves needing quick utilities to format JSON, decode tokens, or generate boilerplate AI prompts. We wanted a fast, privacy-focused, and accessible platform to do exactly that without any paywalls or tracking.
      </p>
      <h2>Privacy First</h2>
      <p>
        Almost all of our tools run entirely in your browser. We do not send your pasted JSON, tokens, or code snippets to any external servers.
      </p>
      <h2>Contributors</h2>
      <p>
        This project was created and is actively maintained by <strong>Mudasir Ahanger</strong> (<a href="https://github.com/mudasirahanger" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@mudasirahanger</a>).
      </p>
      <h2>Acknowledgments</h2>
      <p>
        FreeDevTools AI was built with the assistance of advanced AI agents, including <strong>Antigravity (by Google DeepMind)</strong>, which helped architect, debug, and optimize the application to meet industry standards.
      </p>
    </div>
  );
}
