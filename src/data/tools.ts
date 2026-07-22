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
    metaTitle: "Free JSON Validator Online",
    metaDescription: "Validate JSON syntax instantly and pinpoint the exact line and character of any error. Runs entirely in your browser, no data leaves your device.",
    longDescription: `
## Why JSON validation matters

A single missing comma or unescaped quote in a large JSON payload can break an entire API integration. Rather than manually scanning hundreds of lines, a JSON Validator parses the structure and reports the exact location and nature of the syntax error, so you can fix it in seconds instead of minutes.

### What this validator checks

* **Syntax correctness:** matching brackets/braces, proper quoting, no trailing commas.
* **Error location:** the line and column where parsing failed.
* **Structural well-formedness:** confirms the document is valid, parseable JSON per the RFC 8259 spec.
`,
    faqs: [
      {
        question: "Why does my JSON fail validation even though it looks correct?",
        answer: "The most common hidden causes are trailing commas after the last array/object item, single quotes instead of double quotes, and unescaped special characters inside strings."
      },
      {
        question: "Does this tool check my JSON against a schema?",
        answer: "No, this validates syntax only. For validating data against a specific structure (types, required fields), you'd need a JSON Schema validator."
      }
    ],
  },
  {
    title: "JSON Minifier",
    slug: "json-minifier",
    category: "Minifier",
    description: "Minify JSON by removing whitespace and comments to save space.",
    metaTitle: "Free JSON Minifier Online",
    metaDescription: "Minify JSON by stripping whitespace and line breaks to reduce payload size. Fast, secure, and entirely client-side.",
    longDescription: `
## Why minify JSON?

Every space, tab, and line break in a pretty-printed JSON file adds bytes that get transmitted over the network for no functional benefit once the data reaches a machine parser. Minifying JSON strips this whitespace, producing a smaller payload that transfers faster — useful for API responses, config files bundled into a build, or reducing storage size.

### When to minify vs. format

* **Minify** before shipping JSON over the network or bundling it into production assets.
* **Format** while actively developing or debugging, so the structure stays human-readable.
`,
    faqs: [
      {
        question: "Does minifying change the actual data in my JSON?",
        answer: "No, minification only removes insignificant whitespace (spaces, tabs, newlines) between tokens. The keys, values, and structure remain byte-for-byte identical in meaning."
      },
      {
        question: "How much size reduction can I expect?",
        answer: "It depends on how heavily indented the original file was, but deeply nested, pretty-printed JSON commonly shrinks by 10-25% after minification."
      }
    ],
  },
  {
    title: "Base64 Encode",
    slug: "base64-encode",
    category: "Encoder",
    description: "Encode text or data to Base64 format securely.",
    metaTitle: "Free Base64 Encoder Online",
    metaDescription: "Encode text or binary data to Base64 instantly in your browser. Secure, client-side, and works with UTF-8 and special characters.",
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
    metaTitle: "Free Base64 Decoder Online",
    metaDescription: "Decode Base64 strings back to plain text or binary data instantly in your browser. No signup, fully client-side and private.",
    longDescription: `
## Decoding Base64 back to its original form

Base64-encoded strings are common in API tokens, embedded data URIs, and email attachments. This decoder reverses that encoding, converting the ASCII Base64 string back into readable plain text (or downloadable binary data if the underlying content isn't text).

### Common uses for a Base64 decoder

* **Inspecting API tokens** or auth headers that are Base64 encoded.
* **Reading embedded data URIs** found in HTML or CSS source.
* **Debugging email attachments** encoded per the MIME specification.
`,
    faqs: [
      {
        question: "Why do I get garbled output when decoding?",
        answer: "This usually means the input isn't valid Base64 (incorrect padding or invalid characters), or the underlying data isn't plain text — in which case you'd need to save it as a binary file rather than view it as text."
      },
      {
        question: "Is decoding Base64 the same as decrypting it?",
        answer: "No. Base64 is reversible by design and requires no key — decoding it is not decryption, since there was never any encryption applied."
      }
    ],
  },
  {
    title: "URL Encode",
    slug: "url-encode",
    category: "Encoder",
    description: "Safely encode URLs to escape special characters.",
    metaTitle: "Free URL Encoder Online",
    metaDescription: "Percent-encode URLs and query parameters instantly to safely handle spaces and special characters. Fast and entirely client-side.",
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
    metaTitle: "Free URL Decoder Online",
    metaDescription: "Decode percent-encoded URLs and query strings back to readable text instantly. Client-side and private, no data ever leaves your browser.",
    longDescription: `
## Reversing percent-encoding

URLs shared from browsers, logs, or API requests are often percent-encoded, turning readable query strings into sequences like \`%20\` and \`%3D\`. This decoder converts that encoded text back into its original, human-readable form so you can inspect query parameters or debug redirect URLs.

### Common use cases

* **Reading server logs** where query strings are percent-encoded.
* **Debugging redirect URLs** copied from browser address bars.
* **Inspecting webhook payloads** that include encoded parameters.
`,
    faqs: [
      {
        question: "Why does my decoded URL still contain a + symbol instead of a space?",
        answer: "In the application/x-www-form-urlencoded format (used in form submissions), a + represents a space rather than %20. Standard URI decoding does not convert + back to a space automatically."
      },
      {
        question: "Can I decode a full URL, not just a query parameter?",
        answer: "Yes, paste the entire URL and the tool will decode any percent-encoded sequences throughout the string."
      }
    ],
  },
  {
    title: "JWT Decoder",
    slug: "jwt-decoder",
    category: "Decoder",
    description: "Decode JSON Web Tokens (JWT) to view payload and header data.",
    metaTitle: "Free JWT Decoder Online",
    metaDescription: "Decode JSON Web Tokens instantly to inspect the header and payload claims. 100% client-side, your token never leaves your browser.",
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
    metaTitle: "Free UUID Generator Online (v4)",
    metaDescription: "Generate random, RFC 4122-compliant UUID v4 identifiers instantly. Bulk generation supported, fully client-side and private.",
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
    metaTitle: "Free Unix Timestamp Converter Online",
    metaDescription: "Convert Unix timestamps to human-readable dates and back, in any timezone. Supports seconds and milliseconds, entirely client-side.",
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
    metaTitle: "Free Regex Tester Online",
    metaDescription: "Test and debug regular expressions against sample text with real-time match highlighting. Supports flags, groups, and client-side execution.",
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
    metaTitle: "Free Cron Expression Generator & Explainer",
    metaDescription: "Build cron schedule expressions visually and get a plain-English explanation of what they run. Client-side, no signup required.",
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
    metaTitle: "Free Hash Generator Online (MD5, SHA-1, SHA-256)",
    metaDescription: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text instantly. Runs fully client-side, nothing is sent to a server.",
    longDescription: `
## What is a hash function?

A hash function takes an input of any length and deterministically produces a fixed-length string of characters (the "hash" or "digest"). The same input always produces the same hash, but even a tiny change to the input produces a completely different hash — a property called the avalanche effect. Hashing is one-way: you cannot recover the original input from the hash alone.

### Common use cases

* **Data integrity checks:** compare a file's hash before and after transfer to detect corruption.
* **Checksums for downloads:** verify a downloaded file matches the publisher's published hash.
* **Non-reversible fingerprints:** deduplicate or index large datasets without storing the raw content.

### Which algorithm should I use?

MD5 and SHA-1 are fast but considered cryptographically broken for security purposes (collisions have been demonstrated for both) — they're fine for checksums but not for anything security-sensitive. SHA-256 and SHA-512 are the current standard for integrity and security use cases.
`,
    faqs: [
      {
        question: "Can I use MD5 or SHA-256 to hash passwords?",
        answer: "No. General-purpose hash functions like MD5 and SHA-256 are designed to be fast, which makes them vulnerable to brute-force attacks on passwords. Use a purpose-built password hashing algorithm like bcrypt or Argon2 instead."
      },
      {
        question: "Is a hash reversible?",
        answer: "No, a cryptographic hash function is a one-way function by design. You cannot mathematically derive the original input from its hash alone."
      }
    ],
  },
  {
    title: "Password Generator",
    slug: "password-generator",
    category: "Generator",
    description: "Generate secure, random passwords with custom rules.",
    metaTitle: "Free Secure Password Generator Online",
    metaDescription: "Generate strong, random passwords with customizable length and character sets. Created locally in your browser for maximum security.",
    longDescription: `
## Why password strength matters

Weak or reused passwords remain one of the most common causes of account compromise. A strong password is long, random, and drawn from a large character set (uppercase, lowercase, digits, and symbols) — properties that make it computationally infeasible to guess or brute-force within a useful timeframe.

### What makes a password strong

* **Length:** longer passwords increase the search space exponentially; aim for at least 16 characters where allowed.
* **Randomness:** avoid dictionary words, names, or predictable patterns.
* **Character variety:** mixing uppercase, lowercase, numbers, and symbols increases entropy per character.

This generator creates cryptographically random passwords locally in your browser using the Web Crypto API, so the generated password is never transmitted anywhere.
`,
    faqs: [
      {
        question: "Are the generated passwords stored anywhere?",
        answer: "No. Passwords are generated entirely client-side using your browser's cryptographically secure random number generator and are never sent to or logged by our servers."
      },
      {
        question: "What password length should I use?",
        answer: "Where the target system allows it, use at least 16 characters. Longer, fully random passwords combined with a password manager are far stronger than shorter, memorable ones."
      }
    ],
  },
  {
    title: "Text Diff Checker",
    slug: "text-diff-checker",
    category: "Text",
    description: "Compare two text documents and highlight the differences.",
    metaTitle: "Free Text Diff Checker Online",
    metaDescription: "Compare two blocks of text or code side-by-side and instantly highlight additions, deletions, and changes. Fast, private, client-side.",
    longDescription: `
## Why compare text with a diff tool?

Manually spotting the difference between two large blocks of text — configuration files, code snippets, contract revisions — is slow and error-prone. A diff tool computes the exact lines, words, or characters that changed between two versions and highlights them visually, the same way \`git diff\` does for source code.

### Common use cases

* **Code review:** compare a snippet before and after a refactor.
* **Content editing:** track changes between drafts of an article or document.
* **Configuration audits:** spot exactly what changed between two config file versions.
`,
    faqs: [
      {
        question: "Does this tool understand programming language syntax?",
        answer: "No, the comparison is text-based (line and character level), not syntax-aware. It works well for any plain text, code, or config file regardless of language."
      },
      {
        question: "Is my text uploaded anywhere?",
        answer: "No, the comparison runs entirely in your browser using JavaScript. Neither input is sent to a server."
      }
    ],
  },
  {
    title: "QR Code Generator",
    slug: "qr-code-generator",
    category: "Generator",
    description: "Generate QR codes from text or URLs instantly.",
    metaTitle: "Free QR Code Generator Online",
    metaDescription: "Generate downloadable QR codes from any text, URL, or Wi-Fi credentials instantly. No signup, no tracking, entirely client-side.",
    longDescription: `
## What is a QR code?

A QR (Quick Response) code is a two-dimensional barcode that can encode text, URLs, contact details, or Wi-Fi credentials in a format readable by any modern smartphone camera. Unlike traditional 1D barcodes, QR codes can store significantly more data and remain scannable even with partial damage, thanks to built-in error correction.

### Common use cases

* **Linking print to digital:** direct people from a flyer, menu, or business card straight to a URL.
* **Sharing Wi-Fi access:** encode SSID and password so guests can connect by scanning instead of typing.
* **Event check-ins:** encode a unique identifier for scanning at entry points.
`,
    faqs: [
      {
        question: "Do QR codes expire?",
        answer: "A static QR code (like the ones generated here) never expires — it directly encodes the data and works as long as the code itself is legible. Only \"dynamic\" QR services that redirect through a third-party URL can expire if that service is discontinued."
      },
      {
        question: "Is my data sent to a server when generating a QR code?",
        answer: "No, the QR code is rendered entirely client-side in your browser. The text or URL you enter is never transmitted anywhere."
      }
    ],
  },
  {
    title: "SQL Formatter",
    slug: "sql-formatter",
    category: "Formatter",
    description: "Format and beautify raw SQL queries.",
    metaTitle: "Free SQL Formatter Online",
    metaDescription: "Format and beautify raw SQL queries with proper indentation and keyword capitalization instantly. Client-side, your queries stay private.",
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
    metaTitle: "Free HTML Formatter & Beautifier Online",
    metaDescription: "Format and beautify minified or messy HTML with proper indentation instantly. Fast, secure, and runs entirely in your browser.",
    longDescription: `
## Why format HTML?

Minified or auto-generated HTML — the kind produced by build tools, CMS exports, or "View Source" on a live site — is often a single unindented block that's nearly impossible to read. An HTML Formatter reintroduces consistent indentation and line breaks based on the document's tag nesting, making the structure immediately visible.

### When to use an HTML formatter

* **Debugging markup** copied from a browser's dev tools or a CMS export.
* **Reviewing generated output** from templating engines or static site generators.
* **Cleaning up code** before pasting into documentation or a code review.
`,
    faqs: [
      {
        question: "Will formatting change how my HTML renders?",
        answer: "No. Formatting only adjusts whitespace between tags — it does not alter the DOM structure, attributes, or content, so rendering is unaffected."
      },
      {
        question: "Can this fix broken or invalid HTML?",
        answer: "This tool focuses on indentation and readability, not full HTML validation. For catching invalid markup (unclosed tags, invalid nesting), use a dedicated HTML validator."
      }
    ],
  },
  {
    title: "CSS Formatter",
    slug: "css-formatter",
    category: "Formatter",
    description: "Format and beautify CSS code.",
    metaTitle: "Free CSS Formatter & Beautifier Online",
    metaDescription: "Format and beautify minified CSS with consistent indentation and rule spacing instantly. Client-side and completely private.",
    longDescription: `
## Why format CSS?

Minified CSS pulled from a production build or a browser's "Computed" panel is typically a single dense line per rule with no spacing. A CSS Formatter expands this into a properly indented stylesheet with one property per line and consistent bracket placement, making it far easier to scan for a specific rule or spot a duplicate selector.

### When this is useful

* **Reverse-engineering** styles from a live site's stylesheet.
* **Cleaning up** CSS generated by a build tool or CSS-in-JS extraction.
* **Preparing code** for a style guide or documentation snippet.
`,
    faqs: [
      {
        question: "Does formatting change specificity or the cascade order?",
        answer: "No, formatting only changes whitespace and line breaks. Selector specificity, source order, and the resulting computed styles are completely unaffected."
      },
      {
        question: "Can it format SCSS or LESS syntax?",
        answer: "This formatter is built for standard CSS syntax. Preprocessor-specific syntax like nesting or variables may not format ideally and should be formatted with a tool built for that preprocessor."
      }
    ],
  },
  {
    title: "JavaScript Formatter",
    slug: "javascript-formatter",
    category: "Formatter",
    description: "Format and beautify JavaScript code.",
    metaTitle: "Free JavaScript Formatter & Beautifier Online",
    metaDescription: "Format and beautify minified or messy JavaScript code with consistent indentation instantly. Runs entirely client-side in your browser.",
    longDescription: `
## Why format JavaScript?

Minified production bundles and code copied from minified sources are typically compressed onto very few lines, making them unreadable for debugging. A JavaScript Formatter re-indents the code and restores line breaks based on its syntax structure, so you can actually read function bodies, conditionals, and object literals.

### When this is useful

* **Debugging production errors** that reference minified source via a stack trace.
* **Reviewing third-party scripts** before including them in your project.
* **Cleaning up code** pasted from documentation or Stack Overflow answers.
`,
    faqs: [
      {
        question: "Will this un-minify variable names too?",
        answer: "No. Formatting restores whitespace and indentation only — it cannot recover original variable names that were shortened during minification unless a source map is available."
      },
      {
        question: "Is my code uploaded anywhere?",
        answer: "No, formatting happens entirely in your browser using client-side JavaScript. Your source code is never transmitted to a server."
      }
    ],
  },
  {
    title: "Markdown Previewer",
    slug: "markdown-previewer",
    category: "Text",
    description: "Preview Markdown code in real-time.",
    metaTitle: "Free Markdown Previewer Online",
    metaDescription: "Write and preview Markdown in real-time, side-by-side, with GitHub-flavored syntax support. No signup, entirely client-side.",
    longDescription: `
## Why preview Markdown as you write

Markdown is designed to be readable as plain text, but formatting details like nested lists, tables, and links only become obvious once rendered. A live previewer shows the rendered HTML output side-by-side as you type, so you can catch formatting mistakes immediately instead of after publishing.

### Common use cases

* **Writing README files** for a GitHub repository before committing.
* **Drafting documentation** or blog posts that will be rendered from Markdown.
* **Checking GitHub-flavored syntax** like tables, task lists, and strikethrough.
`,
    faqs: [
      {
        question: "Does this support GitHub-flavored Markdown (GFM)?",
        answer: "Yes, tables, task lists, strikethrough, and autolinks are supported via GitHub-flavored Markdown extensions."
      },
      {
        question: "Can I export the rendered HTML?",
        answer: "You can copy the rendered preview or the raw Markdown source directly from the tool interface."
      }
    ],
  },
  {
    title: "Slug Generator",
    slug: "slug-generator",
    category: "Generator",
    description: "Convert strings to URL-friendly slugs.",
    metaTitle: "Free URL Slug Generator Online",
    metaDescription: "Convert any text into a clean, URL-friendly slug instantly — lowercase, hyphenated, and stripped of special characters.",
    longDescription: `
## What is a URL slug?

A slug is the URL-friendly portion of a web address that identifies a specific page in readable form, such as \`/blog/how-to-format-json\` instead of \`/blog/post?id=48213\`. Good slugs are lowercase, use hyphens instead of spaces, and strip out characters that aren't valid or safe in a URL.

### Why slugs matter for SEO

Search engines and users alike parse readable, keyword-containing URLs more easily than opaque numeric IDs. A clean slug also improves click-through rate in search results, since the URL itself previews the page's topic.

### How this generator works

Paste any title or string and the tool lowercases it, replaces spaces and special characters with hyphens, removes duplicate hyphens, and trims leading/trailing hyphens — producing a clean, ready-to-use slug.
`,
    faqs: [
      {
        question: "Does a slug generator handle accented or non-English characters?",
        answer: "Yes, accented characters (like é or ñ) are typically transliterated to their closest ASCII equivalent so the resulting slug stays URL-safe."
      },
      {
        question: "Should slugs include stop words like \"the\" or \"and\"?",
        answer: "It's common practice to remove filler words to keep slugs short and keyword-focused, though this is a style choice rather than a strict requirement."
      }
    ],
  },
  {
    title: "Word Counter",
    slug: "word-counter",
    category: "Text",
    description: "Count words, characters, and paragraphs in your text.",
    metaTitle: "Free Word & Character Counter Online",
    metaDescription: "Count words, characters, sentences, and paragraphs in real-time as you type or paste text. Free, fast, and entirely client-side.",
    longDescription: `
## Why count words and characters

Writers, students, and marketers regularly need to hit specific length targets — a tweet's character limit, an essay's word count, or a meta description's character budget. This tool counts words, characters (with and without spaces), sentences, and paragraphs in real time as you type or paste text.

### Common use cases

* **Meeting word count requirements** for essays, articles, or assignments.
* **Staying within character limits** for social media posts or SMS.
* **Checking meta description length** before publishing a page.
`,
    faqs: [
      {
        question: "How is a \"word\" counted?",
        answer: "Words are counted as sequences of characters separated by whitespace. Hyphenated compounds and contractions are typically counted as a single word each."
      },
      {
        question: "Is my text stored or sent anywhere?",
        answer: "No, counting happens instantly in your browser as you type. Nothing is transmitted to or stored on a server."
      }
    ],
  },
  {
    title: "Case Converter",
    slug: "case-converter",
    category: "Text",
    description: "Convert text to uppercase, lowercase, camelCase, etc.",
    metaTitle: "Free Text Case Converter Online",
    metaDescription: "Convert text between UPPERCASE, lowercase, camelCase, snake_case, kebab-case, and Title Case instantly in your browser.",
    longDescription: `
## Why case conventions matter

Different contexts require different casing conventions: variable names in JavaScript typically use \`camelCase\`, Python favors \`snake_case\`, URL slugs use \`kebab-case\`, and headlines use \`Title Case\`. Manually retyping text to match a convention is tedious and error-prone — this tool converts text between all of them instantly.

### Case styles supported

* **UPPERCASE** and **lowercase**
* **Title Case** and **Sentence case**
* **camelCase** and **PascalCase**
* **snake_case** and **kebab-case**
`,
    faqs: [
      {
        question: "What's the difference between camelCase and PascalCase?",
        answer: "camelCase starts with a lowercase letter (e.g. myVariableName), commonly used for variables and functions. PascalCase starts with an uppercase letter (e.g. MyClassName), commonly used for class and type names."
      },
      {
        question: "Does this handle text with existing punctuation or numbers?",
        answer: "Yes, numbers are preserved as-is, and punctuation is generally stripped or converted to the appropriate separator depending on the target case style."
      }
    ],
  },
  {
    title: "Color Converter",
    slug: "color-converter",
    category: "Converter",
    description: "Convert between HEX, RGB, HSL, and HSV color formats.",
    metaTitle: "Free Color Converter Online (HEX, RGB, HSL, HSV)",
    metaDescription: "Convert colors between HEX, RGB, HSL, and HSV formats instantly with a live preview. Free, fast, and entirely client-side.",
    longDescription: `
## Why convert between color formats?

Design tools, CSS, and image editing software all use different color notations. A designer might hand you a HEX code from Figma, while your CSS animation needs HSL for easy lightness adjustments, or a canvas API needs RGB values. This tool converts a single color between all major formats instantly, with a live swatch preview.

### Formats supported

* **HEX:** the 6-digit hexadecimal format used throughout CSS and design tools (e.g. \`#3b82f6\`).
* **RGB:** red, green, and blue channel values from 0-255.
* **HSL:** hue, saturation, and lightness — useful for programmatically adjusting shade.
* **HSV/HSB:** hue, saturation, and value/brightness, common in image editing software.
`,
    faqs: [
      {
        question: "Why does the same color look slightly different in HSL vs RGB?",
        answer: "It doesn't — HSL and RGB represent the exact same color mathematically, just using different coordinate systems. Any visual difference is a display or rounding artifact, not a real color change."
      },
      {
        question: "Which format should I use in my CSS?",
        answer: "HEX and RGB are the most widely supported. HSL is often preferred by developers because adjusting the lightness value alone makes it easy to create tints and shades of the same hue."
      }
    ],
  },
  {
    title: "SVG Optimizer",
    slug: "svg-optimizer",
    category: "Formatter",
    description: "Minify and optimize SVG code securely in your browser.",
    metaTitle: "Free SVG Optimizer Online",
    metaDescription: "Compress and minify SVG files instantly online to save bandwidth. Client-side, no data sent to server.",
    longDescription: `
## Why optimize SVG files?

SVG files exported from design tools like Illustrator or Figma often contain a lot of redundant metadata — editor comments, unused IDs, excessive decimal precision on path coordinates — that adds file size without any visual benefit. An SVG optimizer strips this bloat while preserving the exact visual output.

### What gets optimized

* **Removing metadata:** editor comments, XML declarations, and unused \`<defs>\`.
* **Simplifying paths:** reducing unnecessary decimal precision in coordinates.
* **Collapsing groups:** merging redundant \`<g>\` wrapper elements where safe.

Smaller SVGs mean faster page loads, which is itself a positive signal for both user experience and Core Web Vitals scoring.
`,
    faqs: [
      {
        question: "Will optimizing change how my SVG looks?",
        answer: "No, a proper SVG optimizer only removes redundant data and simplifies precision within a visually imperceptible tolerance — the rendered graphic remains the same."
      },
      {
        question: "Is my SVG file uploaded to a server?",
        answer: "No, optimization runs entirely in your browser using client-side JavaScript. Your file is never uploaded anywhere."
      }
    ],
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
    longDescription: `
## Building gradients without guessing values

Hand-writing \`linear-gradient()\` or \`radial-gradient()\` CSS by tweaking angle and color-stop percentages is slow trial and error. This visual builder lets you drag color stops, pick an angle or shape, and see the live preview update instantly, then copy the exact CSS output.

### Gradient types supported

* **Linear gradients:** color transitions along a straight angle.
* **Radial gradients:** color transitions radiating outward from a center point.
* **Multi-stop gradients:** more than two colors with custom stop positions.
`,
    faqs: [
      {
        question: "Does the generated CSS work in all modern browsers?",
        answer: "Yes, linear-gradient() and radial-gradient() are supported in all current major browsers without vendor prefixes."
      },
      {
        question: "Can I use more than two colors in a gradient?",
        answer: "Yes, you can add multiple color stops, each with its own position along the gradient, to create more complex transitions."
      }
    ],
  },
  {
    title: "Dummy JSON Generator",
    slug: "dummy-json-generator",
    category: "Generator",
    description: "Generate massive amounts of mock JSON data for testing.",
    metaTitle: "Free Dummy JSON Data Generator",
    metaDescription: "Generate up to 1000 rows of fake JSON data including UUIDs, names, emails, and addresses.",
    longDescription: `
## Why generate mock JSON data?

Testing an application against realistic data volumes and shapes is essential before it ever touches production data. Rather than manually writing sample records, this tool generates large batches of realistic fake JSON — names, emails, addresses, UUIDs, and more — matching a schema you define.

### Common use cases

* **Populating a test database** without using real user data.
* **Load-testing an API** with a realistic volume of sample records.
* **Prototyping a UI** before the real backend or dataset exists.
`,
    faqs: [
      {
        question: "Is the generated data actually real personal information?",
        answer: "No, all names, emails, and addresses are synthetically generated and do not correspond to real people."
      },
      {
        question: "How many records can I generate at once?",
        answer: "The tool supports generating up to 1,000 rows per batch, which covers most local testing and prototyping needs."
      }
    ],
  },
  {
    title: "CSV to JSON Converter",
    slug: "csv-to-json-converter",
    category: "Converter",
    description: "Convert CSV tables to JSON arrays and vice versa.",
    metaTitle: "Free CSV to JSON Converter Online",
    metaDescription: "Convert CSV to JSON or JSON to CSV instantly. Handles complex quotes and commas securely.",
    longDescription: `
## Converting between CSV and JSON

Spreadsheet exports and database dumps commonly come as CSV, while APIs and JavaScript applications work natively with JSON. This tool converts CSV tables into JSON arrays of objects (using the header row as keys), and can convert back from JSON to CSV for spreadsheet import.

### Handling tricky CSV edge cases

* **Quoted fields:** values containing commas or line breaks wrapped in quotes are parsed correctly rather than splitting incorrectly.
* **Escaped quotes:** doubled quotation marks within a quoted field are unescaped properly.
* **Header mapping:** the first row's column names become the JSON object keys.
`,
    faqs: [
      {
        question: "What happens if my CSV has commas inside a quoted field?",
        answer: "Properly quoted fields (wrapped in double quotes) that contain commas are parsed as a single value, not split into multiple columns."
      },
      {
        question: "Can I convert JSON back to CSV as well?",
        answer: "Yes, this tool works bidirectionally — paste a JSON array of objects to generate a corresponding CSV table."
      }
    ],
  },
  {
    title: "Bcrypt Generator",
    slug: "bcrypt-generator",
    category: "Generator",
    description: "Generate and compare Bcrypt password hashes.",
    metaTitle: "Free Bcrypt Hash Generator & Checker",
    metaDescription: "Generate secure Bcrypt hashes from text, or compare a text string against an existing hash.",
    longDescription: `
## What is Bcrypt?

Bcrypt is a password-hashing function specifically designed to be slow and computationally expensive, which makes brute-force and dictionary attacks impractical even if an attacker obtains the hash. Unlike general-purpose hash functions like MD5 or SHA-256, Bcrypt incorporates a configurable "cost factor" (work factor) and a built-in salt, making it a recommended choice for storing passwords.

### What this tool does

* **Generate:** hash a plaintext password with a chosen cost factor.
* **Compare:** check whether a plaintext string matches an existing Bcrypt hash, without needing a backend.

### Why the cost factor matters

Increasing the cost factor exponentially increases the time required to compute each hash, which directly increases the time needed for a brute-force attack, at the expense of slightly slower legitimate logins.
`,
    faqs: [
      {
        question: "Why use Bcrypt instead of SHA-256 for passwords?",
        answer: "SHA-256 is designed to be fast, which makes brute-forcing large numbers of password guesses feasible with modern hardware. Bcrypt is deliberately slow and includes a work factor specifically to resist this kind of attack."
      },
      {
        question: "Is the hash generated here safe to use in production?",
        answer: "The hashing algorithm itself is production-grade, but always generate and verify password hashes server-side in a real application rather than relying on a client-side tool for your production auth flow."
      }
    ],
  },
  {
    title: "Ethereum Unit Converter",
    slug: "ethereum-unit-converter",
    category: "Converter",
    description: "Convert instantly between Wei, Gwei, and Ether units.",
    metaTitle: "Free Ethereum Unit Converter (Wei to Gwei to Ether)",
    metaDescription: "Convert instantly between Wei, Gwei, and Ether — the core denominations used in Ethereum transactions and gas fees.",
    longDescription: `
## Why Ethereum has multiple units

Ethereum's native currency, Ether (ETH), is denominated in several units to make very small values (like gas fees) practical to work with. The base unit is **Wei**; 1 Ether equals 10^18 Wei. **Gwei** (giga-wei, 10^9 Wei) is the unit most commonly used to express gas prices, since Wei values for gas would otherwise be unwieldy large numbers.

### Common conversions

* **1 Ether = 1,000,000,000 Gwei**
* **1 Gwei = 1,000,000,000 Wei**
* **1 Ether = 1,000,000,000,000,000,000 Wei**

Developers working with smart contracts, gas estimation, or transaction values frequently need to convert between these units, since different libraries and interfaces display amounts in different denominations.
`,
    faqs: [
      {
        question: "Why is gas priced in Gwei instead of Ether?",
        answer: "Gas prices are extremely small fractions of an Ether, so expressing them in Gwei (a billion times larger than Wei but still far smaller than Ether) keeps the numbers in a human-manageable range."
      },
      {
        question: "Does this tool fetch live ETH/USD prices?",
        answer: "No, this tool only converts between Ethereum's internal units (Wei, Gwei, Ether) — it does not convert to fiat currency."
      }
    ],
  },
  {
    title: "Base64 to Image Viewer",
    slug: "base64-to-image",
    category: "Converter",
    description: "Instantly view and download images from Base64 Data URI strings.",
    metaTitle: "Free Base64 to Image Viewer Online",
    metaDescription: "Paste a Base64 string and preview the image instantly. Supports PNG, JPG, WebP, SVG, and more.",
    longDescription: `
## Viewing images encoded as Base64

APIs, database dumps, and email attachments sometimes contain images encoded as Base64 strings rather than as separate files. Rather than writing a script to decode and save the file just to look at it, this tool renders the image directly in your browser as soon as you paste the string.

### Common use cases

* **Debugging API responses** that return images inline as Base64.
* **Inspecting embedded images** found in HTML, CSS, or JSON payloads.
* **Quickly downloading** a Base64-encoded image as a standalone file.
`,
    faqs: [
      {
        question: "What image formats can this tool preview?",
        answer: "Any standard web image format encoded in the Base64 string's Data URI prefix, including PNG, JPEG, WebP, SVG, and GIF."
      },
      {
        question: "Is my Base64 string uploaded anywhere?",
        answer: "No, the image is rendered entirely in your browser using a Data URI — nothing is sent to a server."
      }
    ],
  },
  {
    title: "Base64 to PDF Viewer",
    slug: "base64-to-pdf",
    category: "Converter",
    description: "Preview and download PDF documents directly from Base64 strings.",
    metaTitle: "Free Base64 to PDF Viewer Online",
    metaDescription: "Instantly preview and download PDF documents from Base64 encoded strings in your browser.",
    longDescription: `
## Viewing PDFs encoded as Base64

Some APIs return generated PDFs (invoices, reports, contracts) as a Base64-encoded string rather than a downloadable file URL. This tool decodes that string directly in your browser and renders it as a viewable, downloadable PDF, without needing any server-side processing.

### Common use cases

* **Debugging API integrations** that return documents as Base64.
* **Quickly previewing** a generated report or invoice during development.
* **Downloading** the decoded file as a standalone \`.pdf\`.
`,
    faqs: [
      {
        question: "Is my document uploaded to a server?",
        answer: "No, decoding and rendering happens entirely client-side in your browser. The PDF content never leaves your device."
      },
      {
        question: "What's the maximum PDF size this can handle?",
        answer: "Since decoding happens in-browser, very large PDFs (tens of megabytes) may be slower to render depending on your device's available memory."
      }
    ],
  },
  {
    title: "File to Base64",
    slug: "file-to-base64",
    category: "Converter",
    description: "Convert any file into a Base64 encoded string or Data URI.",
    metaTitle: "Free File to Base64 Converter Online",
    metaDescription: "Upload any file to securely convert it to a raw Base64 string or Data URI format.",
    longDescription: `
## Encoding any file as Base64

Beyond images, many workflows require encoding arbitrary files — PDFs, fonts, audio clips — as Base64 text for embedding in JSON payloads, config files, or Data URIs. This tool reads any uploaded file using the browser's File API and outputs the corresponding Base64 string or Data URI.

### Common use cases

* **Embedding font files** directly in CSS via \`@font-face\` Data URIs.
* **Sending file attachments** through JSON-based APIs.
* **Bundling small assets** into a single self-contained file.
`,
    faqs: [
      {
        question: "Is there a file size limit?",
        answer: "There's no hard limit imposed by the tool itself, but very large files will produce very large Base64 strings and may be slow to process depending on your device's memory."
      },
      {
        question: "Is my file uploaded to a server?",
        answer: "No, the conversion is performed entirely in your browser using the File and FileReader APIs. Your file never leaves your device."
      }
    ],
  },
  {
    title: "Sample Code Generator",
    slug: "sample-code-generator",
    category: "Generator",
    description: "Generate sample boilerplate code for major frameworks like Laravel, Django, Express, and more.",
    metaTitle: "Free Sample Code Generator for Major Frameworks",
    metaDescription: "Generate code snippets for classes, functions, and routes in PHP, Python, Go, Java, and Node.js.",
    longDescription: `
## Skip the boilerplate

Setting up a basic controller, route handler, or class definition follows nearly identical patterns across projects in the same framework, yet still takes time to type out correctly each time. This generator produces ready-to-use boilerplate code for common frameworks and languages, so you can start from a working structure instead of a blank file.

### Frameworks and languages covered

* **PHP:** Laravel controllers and routes
* **Python:** Django views and models
* **Node.js:** Express route handlers
* **Go and Java:** basic class and handler scaffolding
`,
    faqs: [
      {
        question: "Is the generated code production-ready?",
        answer: "It's a solid starting scaffold following each framework's conventions, but you should still review and adapt it to your project's specific requirements before shipping it."
      },
      {
        question: "Can I request a specific framework version?",
        answer: "The generator targets current, widely-used conventions for each framework; always double check generated syntax against your specific version's documentation."
      }
    ],
  },
  {
    title: "OpenAPI to TypeScript",
    slug: "openapi-to-ts",
    category: "Converter",
    description: "Convert OpenAPI schema definitions into TypeScript interfaces.",
    metaTitle: "Free OpenAPI to TypeScript Converter Online",
    metaDescription: "Convert your Swagger or OpenAPI 3.0 schemas into TypeScript interfaces online.",
    longDescription: `
## Why generate types from OpenAPI

Manually keeping TypeScript interfaces in sync with an OpenAPI/Swagger spec is tedious and error-prone — every time the API changes, someone has to remember to update the corresponding types by hand. This tool parses an OpenAPI 3.0 (or Swagger 2.0) schema and generates matching TypeScript interfaces automatically.

### What gets converted

* **Schema objects** into corresponding TypeScript interfaces
* **Required vs. optional fields** mapped to TypeScript's \`?\` modifier
* **Enums and nested objects** converted into matching TypeScript types
`,
    faqs: [
      {
        question: "Does this support both OpenAPI 3.0 and Swagger 2.0?",
        answer: "Yes, both common schema versions are supported, since they share largely the same underlying schema object structure."
      },
      {
        question: "Is my API schema uploaded anywhere?",
        answer: "No, the schema is parsed and converted entirely in your browser using client-side JavaScript."
      }
    ],
  },
  {
    title: "Docker Compose Generator",
    slug: "docker-compose-generator",
    category: "Generator",
    description: "Generate a docker-compose.yml file quickly with a simple interface.",
    metaTitle: "Free Docker Compose Generator Online",
    metaDescription: "Visually build and download a docker-compose.yml file for your applications.",
    longDescription: `
## Building docker-compose.yml visually

Hand-writing a \`docker-compose.yml\` file means remembering exact YAML indentation and the correct keys for services, networks, volumes, and environment variables — small mistakes here commonly cause containers to fail silently. This generator lets you define services through a simple form and outputs a valid, ready-to-use compose file.

### What you can configure

* **Services:** image, build context, ports, and environment variables
* **Networks and volumes:** shared storage and inter-service networking
* **Dependency ordering:** \`depends_on\` relationships between services
`,
    faqs: [
      {
        question: "Does this validate my docker-compose.yml syntax?",
        answer: "The generator produces syntactically valid YAML by construction, since you're filling in structured fields rather than writing raw YAML."
      },
      {
        question: "Can I generate a multi-service setup (app + database + cache)?",
        answer: "Yes, you can add multiple services (e.g. an app container, a Postgres database, and a Redis cache) and link them together in a single compose file."
      }
    ],
  }
];
