
# Online Code Editor and Compiler

An online code editor and compiler built with Next.js, using Monaco Editor for a VS Code–like experience and Piston API to run code in 10+ languages. Features Clerk for authentication, Convex as a real-time serverless database for saving and sharing code, and an integrated AI assistant for writing code.

---

## Demo

**[Deployed on Vercel](https://code-ninja-sand.vercel.app/)**


Watch the demo (It takes some time to load or go to the demo_video folder ) ->
![Demo GIF](demo_video/code-ninja-video.gif)



---

## Features

- **Monaco-Based Code Editor:**  
  - Embeds Microsoft’s Monaco Editor for a true VS Code–like editing experience.  
  - Syntax highlighting, IntelliSense, and code formatting for multiple languages.

- **Multilanguage Compilation & Execution:**  
  - Integrates with the [Piston API](https://github.com/engineer-man/piston) to compile and run code in 10+ languages:
    - JavaScript/Node.js, Python, C++, Java, Go, Rust, Ruby, PHP, C#, and more.  
  - Secure sandboxing ensures user-submitted code cannot access the host environment.

- **User Authentication (Clerk):**  
  - Email/password and social logins via Clerk.  

- **Real-Time Database (Convex):**  
  - Stores user snippets, code executions, and comments.  
  - Real-time syncing: when one user edits a shared snippet, collaborators see changes instantly.

- **Integrated AI Assistant:**  
  - Contextual code suggestions, completions, and “ask a question” chat powered by a custom AI endpoint (Hugging Face).  
  

- **Project & Snippet Management:**  
  - Create, edit, and delete “code boards.”  
  - Organize snippets by language, tags, or personal folders.  
  - Shareable links for public or private viewing.

- **Responsive UI:**  
  - Mobile-friendly layout: collapsible sidebars, resizable editor panels.  


## Build \& Run

### Prerequisites

- **Node.js** (v16 or higher) & **Yarn** (or npm)  
- **Next.js** (framework is included as a dependency)  
- **Clerk account** (for authentication keys)  
- **Convex account** (for database URL & key)  
- **Piston API endpoint** (public instance or self-hosted)


### Clone the Repository

First, clone this repository to your local machine:

```sh
git clone https://github.com/harsh-panchal-804/Code-Ninja
cd Code-Ninja

```
### Install Dependencies

```bash
npm install
```
### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_HUGGINGFACE_TOKEN=
```
### Development Server
By default, the app will be available at http://localhost:3000/.
```
npm run dev
```







---



## Contributing

Pull requests and suggestions are welcome! Please open an issue to discuss changes or improvements.

---


