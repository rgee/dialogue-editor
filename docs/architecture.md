Application Architecture
===

Data
---
- Current directory
  > Files in that directory
- Current file
- Current dialogue
  > Unsaved versions (undo stack via ImmutableJS)

CurrentDialogueStore
  > Maintains history index state
  > On undo, decrement history index pointer
  > On redo, increment history index pointer
  > On operation, increment history index pointer

DialogueHistoryStore
  > Stores history objects which have 2 parallel arrays:
    - Operation types
    - Dialogues

Operations
  - Add deck
  - Remove deck
  - Add card
  - Remove card
  - Change speaker
  - Change delay
  - Add speaker
  - Remove speaker
