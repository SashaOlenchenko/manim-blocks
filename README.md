# Manim Blocks

A visual, block-based editor for creating [Manim](https://www.manim.community/) animations without writing code directly — inspired by Scratch. Users snap together blocks representing Mobjects, their properties, positioning, and animations, then compile the block stack into a Manim Python script for rendering.

## Status

Early development. Creating basic blocks.

## Tech stack

- [Blockly](https://developers.google.com/blockly) for the block-based editor UI
- Vanilla JavaScript (no framework/build step for now)
- Manim (Python) as the rendering target

## Running locally

Open `index.html` directly in a browser. No build step or install required yet.

## Project goals

- Create a code-free enviroment for generating Manim animations
- Represent Manim's core workflow (create Mobjects → position them → animate them) as a block language
- Compile the block stack into a runnable Manim Python script
- Learn by building