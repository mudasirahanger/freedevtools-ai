import { ImageResponse } from "next/og";
import { aiPromptGenerators } from "@/data/ai-prompts";
import { SITE_NAME } from "@/lib/constants";

export const alt = `AI Prompt Generator | ${SITE_NAME}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = aiPromptGenerators.find((t) => t.slug === slug);
  const title = tool?.title ?? SITE_NAME;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#0f172a",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            color: "#c084fc",
            marginBottom: 20,
          }}
        >
          {SITE_NAME} &middot; AI Prompt Generator
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#94a3b8",
            marginTop: 28,
          }}
        >
          Free, structured prompts for coding, debugging, and design.
        </div>
      </div>
    ),
    { ...size }
  );
}
