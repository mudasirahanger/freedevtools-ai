import { ToolMetadata } from "@/types/tool";

export const developerTools: ToolMetadata[] = [
  {
    title: "JSON Formatter",
    slug: "json-formatter",
    category: "Formatter",
    description: "Format and pretty-print JSON data with correct indentation.",
    metaTitle: "Free JSON Formatter Online",
    metaDescription: "Format, validate, and beautify your JSON data online instantly. Secure, client-side only.",
    longDescription: `
## What is a JSON Formatter?

JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. However, when JSON data is transmitted over the web, it is often minified (compressed onto a single line without spaces) to save bandwidth.

A **JSON Formatter** (or JSON Beautifier) takes this compressed, hard-to-read data and formats it with proper indentation, line breaks, and structural hierarchy. This makes debugging API responses, configuring files, and analyzing data structures significantly easier for developers.

### Why use our JSON Formatter?

* **100% Secure & Private:** This tool runs entirely in your browser using client-side JavaScript. Your sensitive JSON data is **never** sent to our servers.
* **Instant Validation:** As you type or paste your JSON, the tool instantly checks for syntax errors (like missing commas or unclosed brackets).
* **Syntax Highlighting:** Easily distinguish between keys, strings, numbers, and booleans with intuitive color coding.
* **One-Click Copy & Download:** Instantly copy the formatted result to your clipboard or download it as a \`.json\` file.
`,
    faqs: [
      {
        question: "Is my JSON data sent to a server?",
        answer: "No. Our JSON Formatter processes all data locally in your browser. We do not store, track, or transmit your data."
      },
      {
        question: "How do I fix 'Invalid JSON' errors?",
        answer: "Common JSON errors include missing quotation marks around keys, trailing commas after the last item in an object/array, or using single quotes (') instead of double quotes (\")."
      },
      {
        question: "What is the difference between JSON and XML?",
        answer: "JSON is generally lighter, easier to read, and maps directly to data structures in modern programming languages (like JavaScript objects), whereas XML is more verbose and relies on tags."
      }
    ],
  },
  {
    title: "JSON Validator",
    slug: "json-validator",
    category: "Validator",
    description: "Check if your JSON is valid and find syntax errors quickly.",
  },
  {
    title: "JSON Minifier",
    slug: "json-minifier",
    category: "Minifier",
    description: "Minify JSON by removing whitespace and comments to save space.",
  },
  {
    title: "Base64 Encode",
    slug: "base64-encode",
    category: "Encoder",
    description: "Encode text or data to Base64 format securely.",
    longDescription: `
## What is Base64 Encoding?

Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. By translating data into a radix-64 representation, Base64 ensures that the data remains intact without modification during transport over networks that are designed to handle text, such as HTTP or email (SMTP).

### When should you use Base64?

* **Embedding Images in CSS/HTML:** You can convert small icons or images to Base64 and embed them directly in your code using Data URIs, reducing the number of HTTP requests.
* **Email Attachments:** SMTP requires email attachments to be encoded as text.
* **Basic Authentication:** HTTP Basic Auth requires the username and password to be Base64 encoded.
* **Storing Complex Data:** Safely store complex binary data in JSON or XML formats.

### Is Base64 encryption?

**No.** Base64 is an encoding mechanism, not a cryptographic algorithm. It provides absolutely no security or encryption. Anyone with access to the Base64 string can instantly decode it back to its original format. Never use Base64 to secure sensitive passwords or data.
`,
    faqs: [
      {
        question: "Is Base64 encoding secure?",
        answer: "No, Base64 is just an encoding scheme designed to safely transport data, not to encrypt it. It can be easily decoded by anyone."
      },
      {
        question: "Does Base64 increase file size?",
        answer: "Yes, Base64 encoding typically increases the overall size of the data by about 33% because every 3 bytes of binary data is represented by 4 ASCII characters."
      }
    ],
  },
  {
    title: "Base64 Decode",
    slug: "base64-decode",
    category: "Decoder",
    description: "Decode Base64 encoded data back to plain text.",
  },
  {
    title: "URL Encode",
    slug: "url-encode",
    category: "Encoder",
    description: "Safely encode URLs to escape special characters.",
    longDescription: `
## What is URL Encoding?

URL Encoding (officially known as Percent-encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI). Because URLs can only be sent over the Internet using the ASCII character-set, any characters outside of this set must be converted into a valid ASCII format.

### How does it work?

URL encoding replaces unsafe ASCII characters with a \`%\` followed by two hexadecimal digits. 
* A space becomes \`%20\`
* An ampersand (\`&\`) becomes \`%26\`
* A question mark (\`?\`) becomes \`%3F\`

### When to use URL Encoding

You must URL-encode data when passing query parameters in a GET request. If you are sending a search query that contains spaces or special characters (like \`search?q=hello world&\`), failing to encode it will break the URL structure, leading to broken links or 400 Bad Request errors.
`,
    faqs: [
      {
        question: "What is the difference between encodeURI and encodeURIComponent?",
        answer: "In JavaScript, encodeURI is used for full URLs and ignores characters that have special meaning in URLs (like :/?=&). encodeURIComponent encodes everything, making it suitable for encoding individual query parameter values."
      }
    ],
  },
  {
    title: "URL Decode",
    slug: "url-decode",
    category: "Decoder",
    description: "Decode URL encoded strings back to normal text.",
  },
  {
    title: "JWT Decoder",
    slug: "jwt-decoder",
    category: "Decoder",
    description: "Decode JSON Web Tokens (JWT) to view payload and header data.",
    longDescription: `
## What is a JSON Web Token (JWT)?

A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

### Anatomy of a JWT

A standard JWT consists of three parts separated by dots (\`.\`):
1. **Header:** Contains metadata about the type of token and the cryptographic algorithms used to secure its contents (e.g., HMAC SHA256 or RSA).
2. **Payload:** Contains the claims. Claims are statements about an entity (typically, the user) and additional data. Common claims include \`iss\` (issuer), \`exp\` (expiration time), and \`sub\` (subject).
3. **Signature:** Used to verify the message wasn't changed along the way.

### Why decode a JWT?

Developers often need to decode a JWT during authentication implementation to verify what information (claims) the backend server is sending to the client frontend. Our JWT Decoder allows you to instantly inspect the Header and Payload of any JWT right in your browser.

> **Note:** Decoding a JWT is not the same as verifying it. To verify a JWT, you need the secret key that was used to sign it. Our tool decodes the token so you can read the payload, but it does not verify the signature.
`,
    faqs: [
      {
        question: "Is my JWT sent to a server when I decode it?",
        answer: "No, the decoding process happens 100% locally in your browser using JavaScript. Your token is never transmitted over the network."
      },
      {
        question: "Can anyone decode my JWT?",
        answer: "Yes. The Header and Payload of a standard JWT are simply Base64Url encoded. Anyone who intercepts the token can decode and read the contents. This is why you should never put sensitive data (like passwords) in a JWT payload."
      },
      {
        question: "How do I secure a JWT?",
        answer: "Always use HTTPS to prevent interception, set short expiration times, and verify the signature on your backend server using a securely stored secret key."
      }
    ],
  },
  {
    title: "UUID Generator",
    slug: "uuid-generator",
    category: "Generator",
    description: "Generate random UUIDs (v4) for your applications.",
    longDescription: `
## What is a UUID?

A UUID (Universally Unique Identifier) is a 128-bit label used for information in computer systems. When generated according to standard methods, UUIDs are for practical purposes unique, without depending on a central registration authority or coordination between the parties generating them.

### UUID Version 4 (Random)

The most common version of UUID is **Version 4**, which is generated using random or pseudo-random numbers. A standard v4 UUID looks like this:
\`123e4567-e89b-12d3-a456-426614174000\`

### Why use UUIDs instead of sequential IDs?

* **Security:** Sequential IDs (like 1, 2, 3) in a database make it easy for attackers to guess other valid URLs or endpoints (Insecure Direct Object Reference). UUIDs are practically impossible to guess.
* **Distributed Systems:** If you have multiple databases or microservices generating data concurrently, UUIDs prevent ID collisions without needing a central coordinator.
* **Offline Creation:** Mobile apps or offline clients can generate UUIDs locally and safely sync them to the server later.
`,
    faqs: [
      {
        question: "Can two generated UUIDs ever be the same?",
        answer: "While theoretically possible, the probability of a UUID v4 collision is practically zero. You would need to generate 1 billion UUIDs every second for 85 years to reach a 50% chance of a single collision."
      },
      {
        question: "What is the length of a standard UUID?",
        answer: "A standard UUID string contains 32 hexadecimal characters and 4 hyphens, making it 36 characters long in total."
      }
    ],
  },
  {
    title: "Timestamp Converter",
    slug: "timestamp-converter",
    category: "Converter",
    description: "Convert Unix timestamps to readable dates and vice-versa.",
    longDescription: `
## What is a Unix Timestamp?

A Unix Timestamp (or Epoch Time) is a system for describing a point in time. It is the number of seconds (or milliseconds) that have elapsed since the **Unix Epoch**, which is defined as \`00:00:00 UTC on 1 January 1970\`, minus leap seconds.

### Why do developers use Epoch Time?

Timestamps are incredibly useful in programming because they represent a single point in time across the entire globe as a simple integer. 

* **No Timezone Confusion:** Because it's based on UTC, a timestamp of \`1609459200\` represents the exact same moment in time whether the server is in New York, Tokyo, or London.
* **Easy Math:** Calculating the duration between two dates is as simple as subtracting two integers.
* **Database Storage:** Storing time as an integer is efficient and standardizes querying.

Our Timestamp Converter allows you to instantly convert these integers back into human-readable dates in your local timezone, or vice versa.
`,
    faqs: [
      {
        question: "What is the 2038 problem?",
        answer: "The Year 2038 problem relates to representing time using 32-bit signed integers. On January 19, 2038, the Unix timestamp will exceed the maximum value of a 32-bit integer, which may cause legacy systems to interpret the time incorrectly as the year 1901."
      },
      {
        question: "What is the difference between seconds and milliseconds in timestamps?",
        answer: "Standard Unix time is measured in seconds. However, modern languages like JavaScript (e.g., Date.now()) return timestamps in milliseconds (13 digits instead of 10) for higher precision."
      }
    ],
  },
  {
    title: "Regex Tester",
    slug: "regex-tester",
    category: "Tester",
    description: "Test regular expressions against sample text.",
    longDescription: `
## What is Regular Expression (Regex)?

A Regular Expression (Regex or RegExp) is a sequence of characters that specifies a search pattern. Usually such patterns are used by string-searching algorithms for "find" or "find and replace" operations on strings, or for input validation.

### Common Regex Use Cases

* **Form Validation:** Ensure an email address, phone number, or zip code follows the correct format before submitting to a server.
* **Data Extraction:** Scrape specific information (like extracting all URLs or dates) from a large block of unstructured text.
* **Search and Replace:** Find specific string patterns and dynamically replace them across a codebase.

### How to use the Regex Tester

1. **Enter your Regex:** Type your regular expression pattern in the top input box (e.g., \`^[a-zA-Z0-9]+$\`).
2. **Set Flags:** Select the appropriate flags like \`g\` (Global search), \`i\` (Case-insensitive), or \`m\` (Multi-line).
3. **Test String:** Paste the text you want to test against your regex in the bottom area.
4. **View Matches:** The tool will automatically highlight all matches in real-time as you type.
`,
    faqs: [
      {
        question: "What are Regex flags?",
        answer: "Flags are optional parameters that modify how the search is performed. Common flags include 'g' for a global search (finding all matches, not just the first one) and 'i' to ignore case sensitivity."
      },
      {
        question: "Why is Regex so hard to read?",
        answer: "Regex relies heavily on special meta-characters (like *, +, ?, [], {}) to define patterns in a very dense format. While powerful, this compactness can make complex regex strings difficult to parse at a glance."
      }
    ],
  },
  {
    title: "Cron Expression Generator",
    slug: "cron-expression-generator",
    category: "Generator",
    description: "Generate and explain cron schedule expressions.",
    longDescription: `
## What is a Cron Expression?

A cron expression is a string comprising five or six fields separated by white space that represents a set of times, normally as a schedule to execute a routine. It is a standard tool used in Unix-like operating systems (via the cron daemon) to schedule jobs (commands or shell scripts) to run periodically at fixed times, dates, or intervals.

### Standard Cron Format

A typical cron expression has 5 fields:
\`\`\`
*    *    *    *    *
┬    ┬    ┬    ┬    ┬
│    │    │    │    └─ Day of the week (0 - 7) (0 or 7 is Sun)
│    │    │    └─── Month (1 - 12)
│    │    └───── Day of the month (1 - 31)
│    └─────── Hour (0 - 23)
└───────── Minute (0 - 59)
\`\`\`

### Common Examples
* \`0 * * * *\`: Runs at minute 0 past every hour.
* \`*/15 * * * *\`: Runs every 15 minutes.
* \`0 0 * * *\`: Runs at midnight every day.

Our Cron Expression Generator allows you to build these complex strings via a visual interface and explains what the schedule means in plain English, eliminating the guesswork.
`,
    faqs: [
      {
        question: "What does the asterisk (*) mean in cron?",
        answer: "An asterisk means 'every'. For example, an asterisk in the hour field means the job will run every hour."
      },
      {
        question: "Can I schedule a cron job to run every second?",
        answer: "Standard Unix cron only supports granularities down to the minute. To run tasks every second, you would need a specialized task scheduler or a script that loops with a sleep command."
      }
    ],
  },
  {
    title: "Hash Generator",
    slug: "hash-generator",
    category: "Generator",
    description: "Generate MD5, SHA-1, SHA-256 hashes from text.",
  },
  {
    title: "Password Generator",
    slug: "password-generator",
    category: "Generator",
    description: "Generate secure, random passwords with custom rules.",
  },
  {
    title: "Text Diff Checker",
    slug: "text-diff-checker",
    category: "Text",
    description: "Compare two text documents and highlight the differences.",
  },
  {
    title: "QR Code Generator",
    slug: "qr-code-generator",
    category: "Generator",
    description: "Generate QR codes from text or URLs instantly.",
  },
  {
    title: "SQL Formatter",
    slug: "sql-formatter",
    category: "Formatter",
    description: "Format and beautify raw SQL queries.",
    longDescription: `
## What is an SQL Formatter?

When writing complex database queries, SQL can quickly become a disorganized block of text, especially when dynamically generated by ORMs or when dealing with multiple \`JOIN\`, \`GROUP BY\`, and \`WHERE\` clauses.

An SQL Formatter parses your raw, minified, or messy SQL query and intelligently formats it. It adds proper indentation, line breaks, and capitalizes SQL keywords (like \`SELECT\`, \`FROM\`, \`WHERE\`) to make the query readable and maintainable.

### Benefits of Formatting SQL

* **Debugging:** It is significantly easier to spot a missing comma, incorrect join condition, or logical error in a properly indented query.
* **Code Reviews:** Clean SQL is essential for pull requests and team collaboration.
* **Performance Analysis:** When analyzing slow query logs, formatting the query first helps DBAs understand the execution plan faster.
`,
    faqs: [
      {
        question: "Does the SQL formatter execute my query?",
        answer: "No. This tool only parses the syntax to beautify the text. It does not connect to any database and cannot execute your code."
      },
      {
        question: "Is my SQL query sent to a server?",
        answer: "No. The formatting is performed entirely in your browser using WebAssembly and client-side JavaScript. Your database schema and queries remain completely private."
      }
    ],
  },
  {
    title: "HTML Formatter",
    slug: "html-formatter",
    category: "Formatter",
    description: "Format and beautify raw HTML code.",
  },
  {
    title: "CSS Formatter",
    slug: "css-formatter",
    category: "Formatter",
    description: "Format and beautify CSS code.",
  },
  {
    title: "JavaScript Formatter",
    slug: "javascript-formatter",
    category: "Formatter",
    description: "Format and beautify JavaScript code.",
  },
  {
    title: "Markdown Previewer",
    slug: "markdown-previewer",
    category: "Text",
    description: "Preview Markdown code in real-time.",
  },
  {
    title: "Slug Generator",
    slug: "slug-generator",
    category: "Generator",
    description: "Convert strings to URL-friendly slugs.",
  },
  {
    title: "Word Counter",
    slug: "word-counter",
    category: "Text",
    description: "Count words, characters, and paragraphs in your text.",
  },
  {
    title: "Case Converter",
    slug: "case-converter",
    category: "Text",
    description: "Convert text to uppercase, lowercase, camelCase, etc.",
  },
  {
    title: "Color Converter",
    slug: "color-converter",
    category: "Converter",
    description: "Convert between HEX, RGB, HSL, and HSV color formats.",
  },
  {
    title: "SVG Optimizer",
    slug: "svg-optimizer",
    category: "Formatter",
    description: "Minify and optimize SVG code securely in your browser.",
    metaTitle: "Free SVG Optimizer Online",
    metaDescription: "Compress and minify SVG files instantly online to save bandwidth. Client-side, no data sent to server.",
  },
  {
    title: "Image to Base64",
    slug: "image-to-base64",
    category: "Converter",
    description: "Convert images to Base64 string / Data URI formats.",
    metaTitle: "Free Image to Base64 Converter Online",
    metaDescription: "Quickly convert PNG, JPG, or WebP images to Base64 strings directly in your browser.",
    longDescription: `
## What is Image to Base64 Encoding?

Converting an image to Base64 translates the raw binary pixel data of the image into a long ASCII text string. When prefixed with a Data URI scheme (like \`data:image/png;base64,\`), modern browsers can render this text string directly as an image.

### Why embed images as Base64?

* **Fewer HTTP Requests:** Every standard \`<img src="image.png">\` requires the browser to make a separate HTTP request to the server. By embedding the image directly in your HTML or CSS file as Base64, you eliminate that request, which can speed up page load times for small icons.
* **Single File Distribution:** If you are building an HTML email template or a single-page document, embedding images as Base64 ensures all assets are bundled in a single file without external dependencies.
* **JSON Payloads:** Many APIs require images to be sent as JSON payloads. Since JSON is a text format, you must encode the image as Base64 before sending it in an API request.

### When NOT to use Base64

Base64 encoding increases the file size of the image by roughly 33%. Therefore, you should **only** encode very small images (like icons, logos, or placeholders). Encoding large photographs into Base64 will bloat your HTML/CSS files significantly, hurting your website's performance and SEO.
`,
    faqs: [
      {
        question: "Are my images uploaded to your servers?",
        answer: "No. The conversion happens entirely locally in your browser using the HTML5 FileReader API. Your images never leave your computer."
      },
      {
        question: "What image formats are supported?",
        answer: "You can encode any standard web image format, including PNG, JPEG, WebP, SVG, and GIF."
      }
    ],
  },
  {
    title: "CSS Gradient Generator",
    slug: "css-gradient-generator",
    category: "Generator",
    description: "Visual builder for linear and radial CSS gradients.",
    metaTitle: "Free CSS Gradient Generator Online",
    metaDescription: "Create beautiful CSS gradients visually and export the CSS code instantly.",
  },
  {
    title: "Dummy JSON Generator",
    slug: "dummy-json-generator",
    category: "Generator",
    description: "Generate massive amounts of mock JSON data for testing.",
    metaTitle: "Free Dummy JSON Data Generator",
    metaDescription: "Generate up to 1000 rows of fake JSON data including UUIDs, names, emails, and addresses.",
  },
  {
    title: "CSV to JSON Converter",
    slug: "csv-to-json-converter",
    category: "Converter",
    description: "Convert CSV tables to JSON arrays and vice versa.",
    metaTitle: "Free CSV to JSON Converter Online",
    metaDescription: "Convert CSV to JSON or JSON to CSV instantly. Handles complex quotes and commas securely.",
  },
  {
    title: "Bcrypt Generator",
    slug: "bcrypt-generator",
    category: "Generator",
    description: "Generate and compare Bcrypt password hashes.",
    metaTitle: "Free Bcrypt Hash Generator & Checker",
    metaDescription: "Generate secure Bcrypt hashes from text, or compare a text string against an existing hash.",
  },
  {
    title: "Ethereum Unit Converter",
    slug: "ethereum-unit-converter",
    category: "Converter",
    description: "Convert instantly between Wei, Gwei, and Ether units.",
    metaTitle: "Free Ethereum Unit Converter (Wei to Gwei to Ether)",
  },
  {
    title: "Base64 to Image Viewer",
    slug: "base64-to-image",
    category: "Converter",
    description: "Instantly view and download images from Base64 Data URI strings.",
    metaTitle: "Free Base64 to Image Viewer Online",
    metaDescription: "Paste a Base64 string and preview the image instantly. Supports PNG, JPG, WebP, SVG, and more.",
  },
  {
    title: "Base64 to PDF Viewer",
    slug: "base64-to-pdf",
    category: "Converter",
    description: "Preview and download PDF documents directly from Base64 strings.",
    metaTitle: "Free Base64 to PDF Viewer Online",
    metaDescription: "Instantly preview and download PDF documents from Base64 encoded strings in your browser.",
  },
  {
    title: "File to Base64",
    slug: "file-to-base64",
    category: "Converter",
    description: "Convert any file into a Base64 encoded string or Data URI.",
    metaTitle: "Free File to Base64 Converter Online",
    metaDescription: "Upload any file to securely convert it to a raw Base64 string or Data URI format.",
  },
  {
    title: "Sample Code Generator",
    slug: "sample-code-generator",
    category: "Generator",
    description: "Generate sample boilerplate code for major frameworks like Laravel, Django, Express, and more.",
    metaTitle: "Free Sample Code Generator for Major Frameworks",
    metaDescription: "Generate code snippets for classes, functions, and routes in PHP, Python, Go, Java, and Node.js.",
  },
  {
    title: "OpenAPI to TypeScript",
    slug: "openapi-to-ts",
    category: "Converter",
    description: "Convert OpenAPI schema definitions into TypeScript interfaces.",
    metaTitle: "Free OpenAPI to TypeScript Converter Online",
    metaDescription: "Convert your Swagger or OpenAPI 3.0 schemas into TypeScript interfaces online.",
  },
  {
    title: "Docker Compose Generator",
    slug: "docker-compose-generator",
    category: "Generator",
    description: "Generate a docker-compose.yml file quickly with a simple interface.",
    metaTitle: "Free Docker Compose Generator Online",
    metaDescription: "Visually build and download a docker-compose.yml file for your applications.",
  }
];
