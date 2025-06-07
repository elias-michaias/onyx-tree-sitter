# onyx-tree-sitter

A Tree-sitter grammar for the Onyx programming language.

## Introduction

This project provides a Tree-sitter grammar for the Onyx programming language, enabling syntax parsing and highlighting for Onyx code. Tree-sitter is a powerful parsing library used for building fast and accurate parsers for programming languages.

## Features

- Comprehensive support for Onyx syntax, including:
  - Structs, enums, and functions
  - Polymorphic structs and macros
  - Control flow constructs (if, for, while)
  - Array and struct literals
  - Higher-order functions and type annotations
- Syntax highlighting support for editors.
- Extensible and easy to modify for future Onyx language features.

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-repo/onyx-tree-sitter.git
   cd onyx-tree-sitter
   ```

2. Build the parser:
   ```
   tree-sitter build
   ```

3. Use the generated parser (`parser.dylib`) in your editor or tool.

## Usage

### Integrating with Editors

- **Neovim**: Use the `nvim-treesitter` plugin and add this grammar to your configuration.
- **VSCode**: Use the `vscode-tree-sitter` extension and point it to the generated parser.

### Testing the Grammar

Run the following commands to test the grammar:
```
tree-sitter generate
tree-sitter test
```

## Development

### Modifying the Grammar

1. Edit the `grammar.js` file to update the grammar rules.
2. Regenerate the parser:
   ```
   tree-sitter generate
   ```
3. Test your changes:
   ```
   tree-sitter test
   ```

### Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
