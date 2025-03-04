# Kehad Portfolio Website

Welcome to my portfolio website! This project showcases my skills and projects using **React.js** and **Tailwind CSS**, built with **Vite** for a fast, modern, and optimized development experience.

---

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Project Locally](#running-the-project-locally)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Learn More](#learn-more)
- [Deploy on Render](#deploy-on-render)
- [Demo](#demo)
- [Running Tests](#running-tests)

---

## Overview

This project is a personal portfolio website designed to effectively showcase my projects and technical skills in web development. It is built with performance and user experience in mind.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (with npm, or an alternative like yarn, pnpm, or bun)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kehad/Kehad-Web.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Kehad-Web
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

---

## Running the Project Locally

Start the development server using one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page auto-updates as you modify files (e.g., `src/App.jsx`).

---

## Usage

### Example Code

Here's a simple example demonstrating how to import and use a component:

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

This section can be expanded with more detailed examples as the project grows.

---

## Contributing

Contributions are welcome! To help improve this project:
- **Report Bugs:** Open an issue on [GitHub](https://github.com/Kehad/Kehad-Web/issues).
- **Feature Requests:** Share your ideas or suggest improvements.
- **Pull Requests:** Fork the repository, implement your changes, and submit a pull request.

Please review our [contributing guidelines](CONTRIBUTING.md) for more details.

---

## License

This project is licensed under the [MIT License](LICENSE). Please see the LICENSE file for further details.

---

## Learn More

Enhance your knowledge with these resources:
- [ReactJS Documentation](https://react.dev/) – Learn about React.js.
- [Vite Documentation](https://vitejs.dev/guide/) – Understand the Vite build tool.
- [Tailwind CSS Documentation](https://tailwindcss.com/) – Explore Tailwind CSS.

---

## Deploy on Render

Deploy your React app with Render by following these steps:
1. **Create a Render Account:** Sign up at [Render.com](https://render.com/).
2. **Connect GitHub:** Allow Render access to your repositories.
3. **Create a New Web Service:**
   - Click **New** and select **Web Service**.
   - Fill in:
     - **Name:** Your service name.
     - **Branch:** e.g., `main`.
     - **Build Command:** `npm install`.
     - **Start Command:** `npm run build && npm run serve`.
4. **Add Environment Variables:** If needed, configure them under "Environment."
5. **Deploy:** Click **Create Web Service** to start the deployment.
6. **Access Your App:** Once deployed, use the provided URL to view your live app.

For more information, refer to the [Render documentation](https://render.com/docs/deploy-react).

---

## Demo

Check out the live demo here: [Demo Link](https://kehad.onrender.com)

---

## Running Tests

To execute tests for the project, run:

```bash
npm run test
```

---

## Troubleshooting

This section provides steps to mitigate common errors you might encounter:

### Vulnerability Warnings

After installing packages, you might see vulnerability warnings. To fix these:
- Run:

  ```bash
  npm audit fix
  ```

- To address all issues (including potential breaking changes), run:

  ```bash
  npm audit fix --force
  ```

*Note:* Forcing fixes might update packages to major versions; review changes and test your application accordingly.

### "Bus error (core dumped)" on Dev Server

If you encounter a "Bus error (core dumped)" when running:

```bash
npm run dev
```

Try the following:
- **Update dependencies:** Run the audit fix with force if necessary:

  ```bash
  npm audit fix --force
  ```

- **Reinstall packages:** Remove existing modules and reinstall:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- Ensure you're using a stable version of Vite and related dependencies.
