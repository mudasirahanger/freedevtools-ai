"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");

  const generateMetaTags = () => {
    let tags = `<!-- Basic Meta Tags -->\n`;
    if (title) tags += `<title>${title}</title>\n`;
    if (description) tags += `<meta name="description" content="${description}">\n`;
    if (keywords) tags += `<meta name="keywords" content="${keywords}">\n`;
    if (author) tags += `<meta name="author" content="${author}">\n`;

    tags += `\n<!-- Open Graph / Facebook -->\n`;
    tags += `<meta property="og:type" content="website">\n`;
    if (title) tags += `<meta property="og:title" content="${title}">\n`;
    if (description) tags += `<meta property="og:description" content="${description}">\n`;
    if (image) tags += `<meta property="og:image" content="${image}">\n`;

    tags += `\n<!-- Twitter -->\n`;
    tags += `<meta property="twitter:card" content="summary_large_image">\n`;
    if (title) tags += `<meta property="twitter:title" content="${title}">\n`;
    if (description) tags += `<meta property="twitter:description" content="${description}">\n`;
    if (image) tags += `<meta property="twitter:image" content="${image}">\n`;

    return tags;
  };

  const output = generateMetaTags();

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast("Copied to clipboard");
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setKeywords("");
    setAuthor("");
    setImage("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center h-5">
              <Label htmlFor="title">Site Title</Label>
              <span className={`text-xs ${title.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>{title.length}/60</span>
            </div>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. FreeDevTools AI" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center h-5">
              <Label htmlFor="desc">Site Description</Label>
              <span className={`text-xs ${description.length > 160 ? "text-destructive" : "text-muted-foreground"}`}>{description.length}/160</span>
            </div>
            <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of your site" className="h-20" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (comma separated)</Label>
            <Input id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. tools, developer, free, ai" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/og-image.jpg" />
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={handleReset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Fields
            </Button>
          </div>
        </div>

        <div className="space-y-2 h-full flex flex-col">
          <Label>Generated HTML</Label>
          <Textarea
            readOnly
            className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
            value={output}
          />
          <Button variant="secondary" onClick={handleCopy} className="w-full">
            <Copy className="mr-2 h-4 w-4" /> Copy HTML
          </Button>
        </div>
      </div>
    </div>
  );
}
