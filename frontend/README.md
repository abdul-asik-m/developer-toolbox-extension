# Developer Toolbox

Developer Toolbox is a React-based collection of developer utilities packaged as a Chrome Extension popup.

## Included Tools

* **JSON Formatter** — Validate, format, and minify JSON with support for large integers without JavaScript number precision loss.
* **Base64 Encoder / Decoder** — Encode and decode UTF-8 text as Base64, including Unicode characters.
* **URL Encoder / Decoder** — Encode and decode URL components.
* **UUID Generator** — Generate UUID v4 values individually or in batches.
* **Timestamp Converter** — Convert between Unix timestamps and dates.
* **Hash Generator** — Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes locally using the Web Crypto API.

All transformations are performed locally in the browser.

## Technology

* React
* Vite
* Tailwind CSS
* JavaScript / JSX
* Web Crypto API
* `lossless-json`

## Features

* Runs entirely in the browser.
* No backend or external API required.
* No user input is sent to a remote server.
* UTF-8-aware Base64 encoding and decoding.
* Base64 decoding supports whitespace and line breaks in copied input.
* JSON formatting preserves large integer values without JavaScript `Number` precision loss.
* Hash generation uses the browser's native Web Crypto API.
* Clipboard access is performed only after the user explicitly clicks the Copy button.
* Input and error states are cleared appropriately when editing tool input.
* Designed to run as a Chrome Extension popup.

## Development

### Prerequisites

* A current Node.js LTS release
* npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Chrome Extension

Developer Toolbox is packaged as a Chrome Extension using Manifest V3.

### Build

Create a production build with:

```bash
npm run build
```

The production files are generated in the `dist/` directory.

### Load the Extension Locally

After building the project:

1. Open Chrome.
2. Navigate to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Select the project's `dist/` directory.

The Developer Toolbox popup will then be available from the Chrome toolbar.

### Packaging for Distribution

To distribute the extension, create a ZIP archive containing the contents of the `dist/` directory.

The ZIP should contain files such as:

```text
index.html
manifest.json
assets/
icons/
```

Do not place the `dist/` directory itself inside the ZIP.

## Security and Privacy

Developer Toolbox processes tool input locally in the browser and does not send user input to an external service.

No backend, external API, or remote processing service is required for the included tools.

### Clipboard

Clipboard operations are limited to writing generated output after the user explicitly triggers the Copy action.

The application does not automatically read from or monitor the user's clipboard.

### Hashing

Hash generation uses the browser's native Web Crypto API:

* SHA-1
* SHA-256
* SHA-384
* SHA-512

Hashing is performed locally in the browser. SHA-1 is included for legacy compatibility and should not be used for new security-sensitive applications.

### JSON Processing

JSON parsing and serialization use `lossless-json` so that large integer values can be processed without the precision loss that can occur with JavaScript's native `Number` type.

JSON processing is performed locally in the browser.

### Data Privacy

Developer Toolbox does not require an account, backend, or external service for its included functionality. Tool input remains within the browser while the application is running.

## License

This project is licensed under the MIT License.

Copyright (c) 2026 Abdul Asik M.

See the [LICENSE](LICENSE) file for the complete license text.
