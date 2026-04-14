# Welcome to 04 Type Safe Development

---

## Task

The goal of this project is to build a **type-safe classroom chat
system** inspired by Duolingo's educational platform.

The challenge is to ensure: - **Type safety** using TypeScript -
**Runtime validation** using Zod - **Content safety filtering** for
educational environments - **Reliable API communication** between
frontend and backend

---

## Description

This project implements a simplified version of a **Duolingo classroom
chat system** using modern frontend and backend practices.

Key features:

- TypeScript Architecture
- Zod Validation
- Content Safety System
- Type-Safe API
- React UI with real-time updates
- Error handling with ErrorBoundary

---

## Installation

Clone the repository:

git clone `<your-repo-url>`{=html} cd duolingo-classroom-chat

Install dependencies:

npm install

Run the project:

npm run dev

---

## Usage

Open:

http://localhost:3000

Type a message and send it.

The system: - validates input - checks for inappropriate content -
displays safety status

---

## Example

Hello → safe\
a → flagged\
you are stupid → blocked

---

## Project Structure

/app\
/api/chat → API\
/components → UI\
/lib → business logic\
/schemas → validation\
/types → types

---

## Core Concepts

- TypeScript vs Zod
- Type-safe API
- Content filtering
- Clean architecture

