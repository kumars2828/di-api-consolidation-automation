---
name: "Run Test Strategy Planning"
description: "Validate a specification or explain a QE workflow for the DI API automation repository."
agent: "Test Strategy Planning Agent"
model: "GPT-5 (copilot)"
argument-hint: "artifact=<Jira key, PR, branch, spec path, or topic> mode=A|B"
---

Analyze the following input using the selected mode:

{{input}}

Requirements:

- Declare `Mode A` or `Mode B` in the first line.
- For Mode A, declare whether the source is Jira-sourced, SDD-sourced, or user-provided.
- Use only evidence available in this workspace or explicitly supplied by the user.
- State when implementation-repository, Jira, Confluence, or GitHub evidence is unavailable.
- Do not execute API calls, test commands, or automation.
- Do not write files unless the user separately approves the exact proposed write.
- End Mode A with `PASS`, `NEEDS_HUMAN`, or `FAIL`.