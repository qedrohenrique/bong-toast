# bong-toast

Animated toast notifications with spring physics. Smooth, customizable, and beautiful notifications for your React applications.

## Features

- 🎨 **Multiple Variants**: Success, error, warning, info, and default variants
- 🎭 **Spring Physics**: Smooth animations powered by Motion library with customizable spring parameters
- 📍 **Flexible Positioning**: Place toasts in any corner (top-left, top-right, bottom-left, bottom-right)
- 📏 **Responsive Sizes**: Small, medium, and large toast sizes
- 🎯 **Hover to Expand**: Click/hover on a toast to read the full description
- 🎨 **Fully Customizable**: Style individual toasts or set global defaults
- ⚡ **Zero Dependencies**: Built with React, TypeScript, and Motion

## Installation

Install the component using shadcn-ui:

```bash
npx shadcn@latest add https://bong-toast.vercel.app/r/bong-toast.json
```

Or copy the component files directly from the `registry/bong-toast` directory.

## Usage

### Setup

Add the `BongToast` component to your root layout:

```tsx
import { BongToast } from "@/registry/bong-toast/bong-toast";
import { useBongToast } from "@/registry/bong-toast/use-bong-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BongToast
          position="bottom-right"
          size="md"
          duration={4000}
          spring={{ stiffness: 400, damping: 25, mass: 0.8 }}
          style={{ borderRadius: 14 }}
        />
        {children}
      </body>
    </html>
  );
}
```

### Basic Usage

Use the `useBongToast` hook to trigger toasts from any component:

```tsx
import { useBongToast } from "@/registry/bong-toast/use-bong-toast";

export function MyComponent() {
  const { toast } = useBongToast();

  return (
    <button
      onClick={() =>
        toast({
          title: "Success!",
          description: "Your action was completed.",
          variant: "success",
        })
      }
    >
      Show Toast
    </button>
  );
}
```

### Variants

```tsx
// Success
toast({ title: "Saved!", variant: "success" });

// Error
toast({ title: "Error", description: "Something went wrong", variant: "error" });

// Warning
toast({ title: "Careful!", variant: "warning" });

// Info
toast({ title: "New update available", variant: "info" });

// Default
toast({ title: "Hello!", variant: "default" });
```

### Per-Toast Configuration

Override global settings on individual toasts:

```tsx
toast({
  title: "Custom Toast",
  description: "This toast has custom styling",
  variant: "info",
  duration: 6000, // Override duration
  size: "lg", // Override size
  style: {
    bg: "#1a1a2e",
    borderColor: "#4a9eff",
    borderRadius: 20,
  },
  spring: {
    stiffness: 300,
    damping: 15,
    mass: 1.2,
  },
});
```

## Configuration

### BongToast Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Toast position on screen |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Default toast size |
| `duration` | `number` | `4000` | Display duration in milliseconds |
| `spring` | `SpringConfig` | `{ stiffness: 400, damping: 25, mass: 0.8 }` | Spring physics config |
| `style` | `ToastStyle` | - | Custom styles for all toasts |

### Toast Options

```tsx
interface Toast {
  title: string; // Toast title
  description?: string; // Additional description (shown on hover)
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default'; // Toast variant
  duration?: number; // Display duration in ms
  size?: 'sm' | 'md' | 'lg'; // Toast size
  style?: {
    bg?: string; // Background color
    borderColor?: string; // Border color
    borderRadius?: number; // Border radius in px
  };
  spring?: {
    stiffness?: number; // Spring stiffness (100-1000)
    damping?: number; // Damping (5-60)
    mass?: number; // Mass (0.1-3)
  };
}
```

## Spring Physics

The spring parameters control the animation behavior:

- **Stiffness**: Higher values = faster animation (100-1000)
- **Damping**: Higher values = less bouncy animation (5-60)
- **Mass**: Affects the "weight" of the animation (0.1-3)

Experiment with these values in the [demo](http://localhost:3000) to find the perfect feel for your app.

## Demo

Start the development server to see the interactive demo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) to explore all features and test different configurations.

## Project Structure

```
├── registry/bong-toast/
│   ├── bong-toast.tsx        # Main component
│   ├── bong-toast.css        # Styles and animations
│   └── use-bong-toast.ts     # Hook for toast management
├── src/
│   └── app/
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Demo page
└── package.json
```

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Motion](https://www.motion.dev/) - Animation library
- [shadcn](https://shadcn.com/) - Component library

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
