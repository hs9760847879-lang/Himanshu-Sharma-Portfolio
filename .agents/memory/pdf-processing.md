---
name: PDF processing on Nix
description: The workspace Python is externally managed, so PDF visual processing needs an isolated uv environment.
---

When visual PDF inspection is required, install PyMuPDF into a workspace-local uv virtual environment and run the renderer with that interpreter; system pip cannot modify the immutable Nix Python environment.

**Why:** The system Python has no usable pip path for local package installation and rejects system writes as externally managed.

**How to apply:** Create a local environment with `uv venv`, install with `uv pip install --python <venv>/bin/python pymupdf`, then run the PyMuPDF script with the venv interpreter.