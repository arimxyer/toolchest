# Sudo Askpass Plugin

Guidance for AI agents that need to run privileged Linux commands from shells that cannot provide an interactive sudo password prompt.

## What It Does

This skill helps agents:

- Recognize sudo failures caused by missing TTY or missing askpass configuration
- Find installed askpass helpers
- Configure `SUDO_ASKPASS` for the current command or shell
- Avoid repeated failed authentication attempts that may trigger lockouts
- Ask the user for the smallest necessary terminal-side action when agent-side sudo cannot work

## Usage

The skill should trigger when an agent tries or needs to run `sudo`, `sudo -A`, privileged `systemctl`, package manager commands, service management, mount operations, or other root-level Linux commands from a non-interactive environment.

It can also be invoked directly:

```text
/sudo-askpass:sudo-askpass sudo says a terminal is required
```

## Scope

This is a generic Linux workflow. It includes examples for common desktop askpass helpers, but does not assume a specific distro, desktop environment, or package manager.
