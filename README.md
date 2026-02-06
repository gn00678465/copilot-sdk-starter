# Copilot SDK Starter Template 🚀

A minimal starter template for building GitHub Copilot extensions using the [@github/copilot-sdk](https://github.com/copilot-extensions/copilot-sdk.js).

## ✨ Features

- 🔧 Pre-configured with Copilot SDK
- ⚡ Bun runtime support (also works with Node.js)
- 📦 TypeScript ready
- 🎯 Minimal setup - get started in minutes

## 🚀 Quick Start

**1. Use this template**
Click "Use this template" button or:
```bash
gh repo create my-copilot-extension --template yourusername/copilot-sdk-starter
```

**2. Install dependencies**
```bash
# Install Copilot Skills first
npm run setup
# or
bun run setup

# Then install project dependencies
bun install
# or
npm install
```

**3. Start building**
```bash
bun run index.js
# or
npm run index.js
```

## 📁 Project Structure

```
copilot-sdk-starter/
├── index.js          # Your extension entry point
├── package.json      # Dependencies and scripts
├── README.md         # This file
└── .gitignore       # Git ignore rules
```

## 🛠️ Development

Edit `index.js` to build your Copilot extension. Refer to the [Copilot SDK documentation](https://github.com/copilot-extensions/copilot-sdk.js) for available APIs.

## 📦 Built With

- [@github/copilot-sdk](https://github.com/copilot-extensions/copilot-sdk.js) - GitHub Copilot SDK
- [Bun](https://bun.com) - Fast JavaScript runtime (optional)
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

**Created from template:** [copilot-sdk-starter](https://github.com/yourusername/copilot-sdk-starter)
