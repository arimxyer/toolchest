---
name: sudo-askpass
description: >-
  Use when an agent needs to run sudo or another privileged Linux command from a non-interactive shell, especially after errors like "sudo: a terminal is required", "sudo: no askpass program specified", "sudo: no password was provided", or when sudo prompts cannot appear in the current harness. Helps detect installed askpass helpers, configure SUDO_ASKPASS, use sudo -A safely, avoid authentication lockouts, and ask the user for minimal manual setup when needed.
license: Apache-2.0
compatibility: Linux systems using sudo; most useful in agent harnesses, remote shells, GUI desktop sessions, and other contexts where sudo cannot prompt on a controlling TTY.
allowed-tools: Bash Read Grep Glob
metadata:
  version: "1.0.0"
  category: linux-administration
---

# Sudo Askpass

Use this skill when an agent needs root privileges but `sudo` cannot prompt interactively.

If invoked directly via `/sudo-askpass:sudo-askpass`, use `$ARGUMENTS` as the user's issue summary.

## Trigger Conditions

Use this workflow when you see or anticipate any of these:

- `sudo: a terminal is required to read the password`
- `sudo: no askpass program specified`
- `sudo: no password was provided`
- A command needs `sudo` from a non-interactive agent shell
- The user asks how to let an agent run sudo commands
- The task involves privileged commands such as `systemctl`, package installation, service management, mounting, editing root-owned files, or reading protected files

## Safety Rules

- Do not repeatedly guess or retry sudo passwords. A few failures can trigger PAM lockout policies.
- Prefer `sudo -n true` first to check whether sudo is already cached without prompting.
- If askpass is unconfigured, diagnose environment and helper availability before attempting `sudo -A`.
- If one `sudo -A` authentication attempt fails, stop and ask the user before trying again.
- Do not ask the user to reveal their password in chat. Ask them to type it into a local terminal or GUI prompt.

## Triage Workflow

Check whether sudo is already cached:

```bash
sudo -n true && printf 'sudo_cached=yes\n' || printf 'sudo_cached=no\n'
```

Check whether `SUDO_ASKPASS` is configured and executable:

```bash
printf 'SUDO_ASKPASS=%s\n' "${SUDO_ASKPASS-}"
test -n "${SUDO_ASKPASS-}" && test -x "$SUDO_ASKPASS" && printf 'askpass_executable=yes\n'
```

Find common askpass helpers:

```bash
command -v ksshaskpass || command -v ssh-askpass || command -v x11-ssh-askpass || command -v lxqt-openssh-askpass || command -v gnome-ssh-askpass || command -v zenity || command -v kdialog
```

Check whether a GUI prompt is plausible:

```bash
printenv DISPLAY WAYLAND_DISPLAY XDG_CURRENT_DESKTOP DESKTOP_SESSION
```

## Preferred Fix

If a real askpass helper is installed, pass it inline for the privileged command so the command does not depend on shell startup files:

```bash
SUDO_ASKPASS=/path/to/askpass sudo -A <command>
```

For example, on KDE systems with `ksshaskpass`:

```bash
SUDO_ASKPASS=/usr/bin/ksshaskpass sudo -A true
```

Only use `sudo -A true` or `sudo -A -v` as a validation step when the user is ready to answer the local prompt.

## Persisting Configuration

For POSIX-style shells, add this to the appropriate shell startup file:

```bash
export SUDO_ASKPASS=/path/to/askpass
```

For Fish:

```fish
set -gx SUDO_ASKPASS /path/to/askpass
```

Existing shells may keep the old value. Ask the user to open a new shell or set the variable in the current shell before testing.

## Installing A Helper

If no askpass helper is installed, use the distro's package manager. Examples:

```bash
# Arch / Arch-derived
sudo pacman -S ksshaskpass

# Debian / Ubuntu
sudo apt install ssh-askpass

# Fedora
sudo dnf install openssh-askpass
```

When the agent cannot run sudo yet, ask the user to run the install command in their own terminal.

## Handling Failures

If `sudo -A` reports `no askpass program specified`, then `SUDO_ASKPASS` was not exported into that command's environment. Use the inline form:

```bash
SUDO_ASKPASS=/path/to/askpass sudo -A <command>
```

If `sudo -A` launches a prompt but the password is rejected, stop after one failed attempt. Possible causes include wrong helper behavior, stale environment, keyboard layout mismatch, or account lockout policy.

On systems with `faillock`, check lockout state:

```bash
faillock --user "$USER"
```

Some systems allow users to clear their own failure records:

```bash
faillock --user "$USER" --reset
```

If the helper path changed, verify the live shell environment. For Fish:

```fish
set --show SUDO_ASKPASS
```

For POSIX-style shells:

```bash
printf '%s\n' "$SUDO_ASKPASS"
```

## Agent Pattern

When a task needs sudo and askpass is not known to work:

1. Run read-only diagnostics that do not require sudo.
2. Check `sudo -n true` to detect an existing timestamp.
3. Locate an askpass helper and set `SUDO_ASKPASS` inline.
4. Run one validation command with user consent.
5. Use the same inline `SUDO_ASKPASS=... sudo -A` prefix for required privileged commands.
6. If validation fails once, stop and ask the user to run the needed command manually or fix the helper.

This keeps sudo access explicit, minimizes password prompts, and avoids accidental account lockouts.
