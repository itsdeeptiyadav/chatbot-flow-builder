Chatbot Flow Builder
A simple and extensible chatbot flow builder built using Next.js and React Flow. 
It allows users to visually create chatbot message flows by dragging, connecting, and editing nodes.
## Features

- Drag and drop Message Nodes
- Connect nodes using edges
- Only one outgoing edge allowed per node
- Editable message content via Settings Panel
- Flow validation before saving
- Clean and modular architecture
## Tech Stack

- Next.js
- React
- React Flow
- Tailwind CSS
## Future Improvements

- Support multiple node types
- Persist flow in database
- Load saved flows
- Improve UI/UX
## Project Structure

src/
├── app/
│   ├── page.js                # Main entry page
│   └── api/
│       └── save-flow/
│           └── route.js       # API route to handle flow saving
│
├── components/
│   ├── FlowBuilder.js         # Core flow logic and React Flow setup
│   ├── NodesPanel.js          # Sidebar containing draggable nodes
│   ├── SettingsPanel.js       # Panel to edit selected node data
│   ├── SaveButton.js          # Save button with validation logic
│   └── nodes/
│       └── TextNode.js        # Custom Text Node component
│
└── public/                    # Static assets