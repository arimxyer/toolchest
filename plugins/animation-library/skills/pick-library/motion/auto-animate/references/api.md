# AutoAnimate — API Reference

## Core (vanilla)

```ts
import autoAnimate from '@formkit/auto-animate'

const controller = autoAnimate(parentEl, optionsOrPlugin?)
controller.enable()
controller.disable()
controller.isEnabled() // boolean
```

### Options object (second arg)

| Option | Type | Default | Notes |
|---|---|---|---|
| `duration` | `number` | 250 | Milliseconds |
| `easing` | `string` | `'ease-in-out'` | Any CSS easing value |
| `disrespectUserMotionPreference` | `boolean` | `false` | When false, `prefers-reduced-motion` disables animations |

### Plugin function (second arg, alternate)

Pass a function instead of an options object to produce fully custom keyframes:

```ts
autoAnimate(el, (el, action, oldCoords, newCoords) => {
  // action: 'add' | 'remove' | 'remain'
  // oldCoords / newCoords: DOMRect or null
  return new KeyframeEffect(el, [...keyframes], { duration: 300 })
})
```

## React

```ts
import { useAutoAnimate } from '@formkit/auto-animate/react'

const [ref, enable] = useAutoAnimate(options?)
// ref → attach to parent element
// enable(bool) → toggle at runtime
```

## Vue

```ts
// Directive (register globally or locally)
import { vAutoAnimate } from '@formkit/auto-animate/vue'

// Template: <ul v-auto-animate="{ duration: 150 }">

// Composable
import { useAutoAnimate } from '@formkit/auto-animate/vue'
const [listRef, enable] = useAutoAnimate()
```

## Solid

```ts
import { createAutoAnimate } from '@formkit/auto-animate/solid'
const [ref] = createAutoAnimate()
```

## Preact

```ts
import { useAutoAnimate } from '@formkit/auto-animate/preact'
```

## Angular

```ts
import { AutoAnimateModule } from '@formkit/auto-animate/angular'
// or standalone: AutoAnimateDirective
// Template: <ul [autoAnimate]>
```

## Svelte

```svelte
<script>
  import autoAnimate from '@formkit/auto-animate'
</script>
<ul use:autoAnimate={{ duration: 300 }}>
```

## Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@formkit/auto-animate/nuxt']
})
// Then v-auto-animate is globally available
```
