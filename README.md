# ⚡ Express + TypeScript Basic Setup

[![License](https://img.shields.io/github/license/VikasMishraManit/Express-TS-Basic-Setup?style=flat-square)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=flat-square&logo=express)
![Made with VSCode](https://img.shields.io/badge/Made%20with-VSCode-blue?style=flat-square&logo=visualstudiocode)

> 🧩 A **minimal, ready-to-use boilerplate** for quickly starting an **Express + TypeScript** backend project.  
> Just clone → install → run → start building! ⚙️

---

## 🚀 Features

- ✅ **TypeScript Ready** – Pre-configured `tsconfig.json`
- ⚙️ **Express Setup** – Simple `/ping` route already included
- 🔄 **Auto Reload** – via `ts-node-dev`
- 📁 **Clean Structure** – Organized for scalability
- 🧠 **Beginner-Friendly** – Perfect for quick prototyping or hackathons

---

## 🏁 Getting Started

Clone this repository and run it locally:


# Clone this repo
git clone https://github.com/VikasMishraManit/Express-TS-Basic-Setup.git

# Move into the project folder
cd Express-TS-Basic-Setup

# Install dependencies
npm install

# Start in development mode (with live reload)
npm run dev
Your server should be running on 👉 http://localhost:3000

Test it using:

curl http://localhost:3000/ping
# → pong

🏗️ Build for Production
npm run build
npm start


This will compile TypeScript into JavaScript inside the dist/ folder and run the built server.

📂 Project Structure
Express-TS-Basic-Setup/
├── src/
│   └── server.ts        # 🚀 Main entry file
├── dist/                # 🔧 Compiled JS output
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md

🔧 Scripts
Command	Description
npm run dev	Start development server with auto reload
npm run build	Compile TypeScript to JavaScript (into /dist)
npm start	Run the production build
💡 Example API Route
app.get('/ping', (req, res) => {
  res.send('pong');
});


Output → pong ✅

🤝 Contributing

Contributions are always welcome!
If you’d like to improve or extend this starter, follow these steps:

Fork the repo 🍴

Create your feature branch

git checkout -b feature/your-feature


Commit your changes

git commit -m "Add awesome feature"


Push your branch

git push origin feature/your-feature


Open a Pull Request 🚀

⚖️ License

This project is licensed under the MIT License — see the LICENSE
 file for details.

🌟 Clone, code, and deploy faster — start your next Express app in seconds!
Made with ❤️ by Vikas Mishra
