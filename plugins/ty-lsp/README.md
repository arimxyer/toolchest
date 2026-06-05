# Ty LSP

[ty](https://github.com/astral-sh/ty) is Astral's extremely fast Python type checker and language server, written in Rust. This plugin wires `ty server` into Claude Code's LSP integration so Claude gets real-time Python code intelligence while it works.

## What It Does

- **Instant diagnostics** — Claude sees type errors and warnings immediately after each edit to a `.py`/`.pyi` file
- **Code navigation** — go to definition, find references, and hover information for Python symbols

## Requirements

The `ty` binary must be installed and on your `PATH` — the plugin only configures the connection, it does not bundle the server:

```bash
uv tool install ty
# or: pip install ty
```

## Usage

No commands to run — once the plugin is installed, the language server starts automatically when Claude works with Python files. If it doesn't, check the `/plugin` Errors tab (e.g. `Executable not found in $PATH` means `ty` isn't installed).
