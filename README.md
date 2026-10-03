# Prism FL Stack

Prism FL Stack is a fast, minimal, and intentionally opinionated tool directory
built for founders, indie makers, and engineers who want a clean way to discover,
organize and share the tools they rely on.

Version 2 introduces the feature that turns Prism FL Stack from a simple directory
into a real product: Stacks.
A stack is your personal collection of tools, saved locally, easy to revisit
and designed to evolve with your workflow.

## What Prism FL Stack Is

Prism FL Stack is a lightweight web application built with React, TypeScript, Vite, Supabase
and Tailwind CSS.
The goal is clarity, speed, and a frictionless user experience. No clutter, no noise.
Just tools and the ability to build your own stack.

## Core Features (v2)

### Tool Directory
A clean, searchable list of tools with categories, descriptions, and detail pages.

### Smart Filtering
Search by name or description, filter by category, or browse everything at once.

### My Stack (new in v2)
The defining feature of Prism FL Stack:
- Add any tool to your personal stack
- Remove tools or clear the stack entirely
- Persistent storage via localStorage
- Dedicated /stack page to view and manage your selections

Your stack stays with you, even after closing the browser.

### Clean UI Components
Reusable cards, badges, dropdowns, and layout components designed for clarity and speed.

## How Stacks Work

Stacks are powered by a small global context:
- Stores an array of selected tools
- Provides addToStack, removeFromStack, and clearStack
- Syncs automatically with localStorage
- Accessible from anywhere in the app

The implementation is simple, predictable, and easy to extend.

## Local Development

Install dependencies:
```
npm install
```

Run the development server:
```
npm run dev
```

Build for production:
```
npm run build
```

Lint:
```
npm run lint
```

## Roadmap

Version 2 establishes the foundation for everything that comes next.

### v2.1 — Stack Presets
Prebuilt stacks for founders, agencies, AI startups, and indie makers.

### v2.2 — Stack Export
Share your stack as JSON or a public link.

### v3 — AI-Assisted Stack Builder
Generate or refine your stack based on your goals.

## Author

Built by Yoichi — frontend developer and product builder who prefers tools that 
stay out of the way and let you work.

## License

MIT License.
