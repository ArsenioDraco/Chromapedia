# Chromapedia

Chromapedia is an interactive web application for browsing, exploring, and working with curated color palettes. It’s built with vanilla JavaScript, HTML, and CSS, using modern techniques like CSS variables, dynamic DOM manipulation, and localStorage to deliver a responsive and intuitive experience.

## Main Features

1. Curated Color Database – Includes popular colors with metadata such as family, hex code, tags, and popularity.

2. Dynamic Filtering & Sorting – Search by name, family, or tags; sort by name, hue, lightness, or popularity.

3. Interactive Grid – Displays each color with a swatch, details, and actions (copy HEX, view shades, open panel).

4. Detail Panel – Full color info, tints/shades, WCAG contrast ratios, and copy-ready CSS tokens.

5. Dark/Light Mode – Theme toggle stored in localStorage.

6. Deep Linking – Each color has a unique URL for direct linking.

7. Offline Support – A lightweight service worker caches core assets.

8. Keyboard Shortcuts – Quick navigation: / for search, f for family filter, s for sorting, Esc to close panels, ? for shortcuts.

## Technical Highlights
### JavaScript

1. Dynamic DOM rendering using document.createElement and DocumentFragment for performance.

2. Centralized state management synced with localStorage and URL hash.

3. Clipboard operations with fallback support.

4. Service worker for offline caching.

### CSS

1. CSS variables for themes and dynamic color styling.

2. Responsive grid layout using grid-template-columns and clamp() for typography.

3. Dark/Light mode implemented through CSS classes and variable switching.

## Personal Note

This is my first serious project involving JavaScript. The idea came from wanting a single place where a large variety of colors and their shades could be explored easily. Searching for individual colors is often tedious, so this project aims to simplify the process by providing everything in one place along with ready-to-use CSS tokens. I plan to continue building more projects and expanding my skills in JavaScript and other languages.

## Github pages link:

https://arseniodraco.github.io/Chromapedia/
