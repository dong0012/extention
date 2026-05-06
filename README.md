# ScrollNerd

ScrollNerd is a lightweight browser extension that adds a floating scroll assistant to any web page. It helps users move through long pages faster with smooth navigation controls, continuous scrolling, and a draggable widget that can be placed anywhere on the screen.

## Features

- Back to Top button that appears after scrolling down.
- Scroll to Bottom button for long articles, comment threads, and documentation pages.
- Press-and-hold continuous scrolling for both upward and downward navigation.
- Draggable floating controller with automatic boundary protection.
- Minimal glass-style interface designed to stay visible without getting in the way.

## Tech Stack

- React 19
- TypeScript
- Vite
- `vite-plugin-web-extension`
- `webextension-polyfill`

## How It Works

The extension injects a floating scroll widget into supported pages through a content script. Based on the current scroll position, it conditionally shows quick-jump controls for the top and bottom of the page. Users can also hold the up or down buttons for continuous scrolling, and drag the widget to a more comfortable location.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for Chrome:

```bash
npm run build:chrome
```

Build for Firefox:

```bash
npm run build:firefox
```

Create a packaged zip:

```bash
npm run package
```

## Load the Extension

1. Build the project with `npm run build:chrome`.
2. Open `chrome://extensions/` in Chrome.
3. Enable Developer Mode.
4. Click Load unpacked and select the `dist` directory.

## License

MIT
