# {{Library Display Name}} — API Reference

{{Cover the API surface a developer needs to be productive. Don't duplicate the official docs — capture the shape, the mental model, and the gotchas.}}

## Installation

```bash
npm install {{package-name}}
# If there are official framework bindings, list them:
# npm install @scope/package-react  # React binding
```

## Core API

{{The main classes / functions / hooks. One subheading per major primitive. Show the typical usage shape, not every option.}}

### `{{PrimaryExport}}`

{{What it is in one sentence.}}

```ts
import { {{PrimaryExport}} } from '{{package-name}}';

// Typical usage
const {{instance}} = new {{PrimaryExport}}({
  // ...
});
```

Key options:

| Option | Type | Purpose |
|---|---|---|
| {{option}} | {{type}} | {{what it does}} |

### `{{SecondaryExport}}`

{{...}}

## Framework-specific APIs

{{If the library has official framework bindings with their own API, document them here.}}

### React — `{{@scope/package-react}}`

```tsx
import { {{hookOrComponent}} } from '{{@scope/package-react}}';

function MyComponent() {
  // ...
}
```

## Gotchas

{{Things a reader will get wrong if they only read the official docs. Version-sensitive behaviour, footguns, non-obvious defaults.}}

- {{Gotcha #1}}
- {{Gotcha #2}}
