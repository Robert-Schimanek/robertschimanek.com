---
title: "Creating a Responsive Image Slider for Large and Small Screens"
description: "A step-by-step guide on implementing a responsive image slider that works well on both desktop and mobile devices."
date: 2024-03-16
tag: How-To
---

In this tutorial, we'll walk through the process of creating a responsive image slider that adapts to both large and small screens. We'll use HTML, CSS, and JavaScript to build this component, drawing inspiration from the ExpertiseSlider component used in our Astro-based website.

## Step 1: HTML Structure

First, let's set up the basic HTML structure for our slider:

```html
<div class="slider-container">
  <h2 class="slider-title">
    <a href="/all-items">Check out all items</a>
  </h2>
  <ul class="slider">
    <li class="slide">
      <a href="/item1">
        <img src="item1.jpg" alt="Item 1" loading="lazy" />
        <h3>Item 1</h3>
      </a>
    </li>
    <!-- Add more slide items here -->
  </ul>
</div>
```

## Step 2: CSS Styling

Next, let's style our slider to make it responsive:

```css
.slider-container {
  overflow: hidden;
  padding: 1rem;
}

.slider {
  display: flex;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  gap: 0.75rem;
  padding: 1rem 0;
  margin: 0 -1rem;
  -webkit-overflow-scrolling: touch;
}

.slide {
  scroll-snap-align: start;
  flex: 0 0 80%;
  max-width: 80%;
}

.slide img {
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 3 / 4;
}

@media (min-width: 768px) {
  .slide {
    flex: 0 0 40%;
    max-width: 40%;
  }
}

@media (min-width: 1024px) {
  .slide {
    flex: 0 0 30%;
    max-width: 30%;
  }
}

/* Hide scrollbar */
.slider::-webkit-scrollbar {
  display: none;
}

.slider {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

This CSS makes the slider responsive by adjusting the slide width based on screen size. It also implements smooth scrolling and hides the scrollbar for a cleaner look.

## Step 3: JavaScript Functionality

Now, let's add some JavaScript to enhance the slider's functionality:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider')
  const slides = document.querySelectorAll('.slide')

  slides.forEach((slide) => {
    const link = slide.querySelector('a')
    const image = slide.querySelector('img')

    const isFullyVisible = () => {
      const rect = slide.getBoundingClientRect()
      return rect.left >= 0 && rect.right <= window.innerWidth
    }

    const handleClick = (e) => {
      if (!isFullyVisible()) {
        e.preventDefault()
        e.stopPropagation()

        const slideRect = slide.getBoundingClientRect()
        const sliderRect = slider.getBoundingClientRect()
        const isSmallScreen = window.innerWidth < 640

        if (isSmallScreen) {
          // Touch-like sliding for small screens
          const currentScrollLeft = slider.scrollLeft
          const targetScrollLeft
            = slideRect.left < sliderRect.left
              ? currentScrollLeft - slideRect.width
              : currentScrollLeft + slideRect.width

          slider.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth',
          })
        }
        else {
          // Scroll behavior for larger screens
          const scrollAmount = slideRect.width * 2
          if (slideRect.left < sliderRect.left)
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
          else
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      }
    }

    link.addEventListener('click', handleClick)
    image.addEventListener('click', handleClick)
  })
})
```

This JavaScript code adds click event listeners to the slides. When a slide is clicked:

1. It checks if the slide is fully visible.
2. If not, it prevents the default link behavior and scrolls the slider.
3. On small screens, it implements a touch-like sliding behavior.
4. On larger screens, it scrolls by twice the slide width.

## Explanation of the Approach

1. **Responsive Design**: The CSS uses flexbox and media queries to adjust the slide sizes for different screen widths. This ensures the slider looks good on both mobile and desktop devices.

2. **Smooth Scrolling**: The `scroll-snap-type` CSS property creates a smooth, paginated scrolling experience, which is especially nice on touch devices.

3. **Dynamic Scrolling**: The JavaScript adds custom scrolling behavior. On small screens, it mimics a touch-based slider, while on larger screens, it scrolls by larger amounts for quicker navigation.

4. **Performance**: Using `loading="lazy"` on images and `content-visibility: auto` (in the original component) helps with performance by lazy-loading images and optimizing rendering.

5. **Accessibility**: The slider is keyboard-accessible and works without JavaScript, falling back to native scrolling behavior.

By implementing this slider, you'll have a responsive component that works well across different devices and screen sizes, providing a smooth and intuitive user experience for browsing through images or content cards.
