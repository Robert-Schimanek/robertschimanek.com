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

<button id="dark-mode-toggle" aria-label="Toggle dark mode">
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

<style>
  #dark-mode-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
</style>
```

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
  background-color: var(--bg-color);
  color: var(--text-color);
  transition:
    background-color var(--transition-duration) ease,
    color var(--transition-duration) ease;
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

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode')

    // Save theme preference
    if (body.classList.contains('dark-mode'))
      localStorage.setItem('theme', 'dark')
    else
      localStorage.setItem('theme', 'light')
  })
})
```

## Handling Page Transitions

Astro uses view transitions for smooth page navigation. To ensure our dark mode persists across page transitions, we need to add a `transition:persist` directive to our toggle:

```astro
<button id="dark-mode-toggle" aria-label="Toggle dark mode" transition:persist>
  <!-- Button content -->
</button>
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

## Enhancing Accessibility

To improve accessibility, let's update the toggle button to include an appropriate aria-label based on the current mode:

```javascript
function updateToggleLabel() {
  const isDarkMode = body.classList.contains('dark-mode')
  darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode')
}

darkModeToggle.addEventListener('click', () => {
  // ... existing code ...
  updateToggleLabel()
})

// Initial label update
updateToggleLabel()
```

## Conclusion

Implementing a smooth dark mode transition in your Astro-based website enhances user experience and accessibility. By using CSS variables, leveraging Astro's view transitions, and considering performance and accessibility, you can create a seamless dark mode feature that your users will appreciate.

Remember to test your implementation across different browsers and devices to ensure a consistent experience for all your users. Happy coding!
