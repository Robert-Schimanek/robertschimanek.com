---
title: "Implementing Smooth Dark Mode Transitions in Astro"
description: "Learn how to add a user-friendly dark mode feature with smooth transitions to your Astro-based website."
date: 2024-03-18
tag: How-To
---

Let's break down the script to understand its functionality:

1. **Event Listener**:
   ```javascript
   document.addEventListener('astro:page-load', () => {
     // Code inside this function will run after each page load
   })
   ```
   This listens for the 'astro:page-load' event, which Astro triggers after each page load or navigation. It ensures our dark mode logic runs on every page.

2. **Selecting Elements**:
   ```javascript
   const darkModeToggle = document.getElementById('dark-mode-toggle')
   const body = document.body
   ```
   We select the dark mode toggle button and the body element for later use.

3. **Checking Saved Preferences**:
   ```javascript
   const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
   const savedTheme = localStorage.getItem('theme')

   if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode))
     body.classList.add('dark-mode')
```
   This checks for a saved theme preference or falls back to the system preference.

4. **Toggle Functionality**:
   ```javascript
   darkModeToggle.addEventListener('click', () => {
     body.classList.toggle('dark-mode')

     if (body.classList.contains('dark-mode'))
       localStorage.setItem('theme', 'dark')
     else
       localStorage.setItem('theme', 'light')
   })
   ```
   This adds a click event listener to the toggle button, which switches the theme and saves the preference.

By implementing this script, you ensure that the dark mode preference is applied consistently across page loads and navigations in your Astro site.
