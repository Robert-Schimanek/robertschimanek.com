---
title: "Implementing Smooth Dark Mode Transitions in Astro"
description: "Learn how to add a user-friendly dark mode feature with smooth transitions to your Astro-based website."
date: 2024-03-18
tag: How-To
---

Dark mode has become a staple feature in modern web design, offering users a more comfortable viewing experience in low-light conditions. In this blog post, we'll walk through the process of implementing a dark mode feature with smooth transitions in an Astro-based website.

## Setting Up the Basic Structure

First, let's set up the basic HTML structure for our dark mode toggle:

```astro
---
// DarkModeToggle.astro
---

<button id="dark-mode-toggle" aria-label="Toggle dark mode" transition:persist>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</button>
```

Note the `transition:persist` attribute, which ensures our toggle persists across Astro's view transitions.

## Adding CSS for Dark Mode

Next, let's add some CSS to handle the dark mode styles. We'll use CSS variables to make it easy to switch between light and dark themes:

```css
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --transition-duration: 0.3s;
}

.dark-mode {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

body {
  @apply bg-[var(--bg-color)] text-[var(--text-color)] transition-[background-color,color] duration-300 ease-in-out;
}

#dark-mode-toggle {
  @apply bg-transparent border-none cursor-pointer p-0;
}
```

## Implementing the Dark Mode Toggle

Now, let's add the JavaScript to toggle dark mode:

```javascript
document.addEventListener('astro:page-load', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle')
  const body = document.body

  // Check for saved theme preference or use system preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode))
    body.classList.add('dark-mode')

  function updateToggleLabel() {
    const isDarkMode = body.classList.contains('dark-mode')
    darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode')
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode')

    // Save theme preference
    if (body.classList.contains('dark-mode'))
      localStorage.setItem('theme', 'dark')
    else
      localStorage.setItem('theme', 'light')

    updateToggleLabel()
  })

  // Initial label update
  updateToggleLabel()
})
```

## Optimizing for Performance

To prevent a flash of unstyled content (FOUC) when the page loads, we can add a script to the `<head>` of our document:

```html
<script is:inline>
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
    document.documentElement.classList.add('dark-mode');
  }
</script>
```

## Breaking Down the Script

Let's analyze the key components of our dark mode implementation:

1. **Event Listener**: We use `document.addEventListener('astro:page-load', ...)` to ensure our dark mode logic runs on every page load or navigation in Astro.

2. **Checking Saved Preferences**: We check for a saved theme preference in localStorage or fall back to the system preference using `window.matchMedia`.

3. **Toggle Functionality**: The click event listener on the toggle button switches the theme by toggling the 'dark-mode' class and saves the preference to localStorage.

4. **Accessibility Enhancement**: We update the `aria-label` of the toggle button based on the current mode, improving accessibility for screen reader users.

5. **Performance Optimization**: The inline script in the `<head>` applies the correct theme immediately, preventing any flash of unstyled content.

## Conclusion

By implementing this dark mode feature, you're providing a user-friendly, accessible, and performant solution for your Astro-based website. The smooth transitions between light and dark modes, coupled with persistent preferences across page loads, create a seamless experience for your users.

Remember to test your implementation across different browsers and devices to ensure a consistent experience for all your users. Happy coding!
