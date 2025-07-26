# Quick Reference Guide

Fast lookup reference for developers working with the TODO App and Spotify Clone projects.

## Table of Contents
- [Project Overview](#project-overview)
- [TODO App Quick Reference](#todo-app-quick-reference)
- [Spotify Clone Quick Reference](#spotify-clone-quick-reference)
- [CSS Classes Reference](#css-classes-reference)
- [JavaScript Functions Reference](#javascript-functions-reference)
- [Event Listeners Cheat Sheet](#event-listeners-cheat-sheet)
- [Common Code Snippets](#common-code-snippets)
- [Troubleshooting Guide](#troubleshooting-guide)

---

## Project Overview

### File Structure
```
workspace/
├── TODO-APP/
│   ├── index.html      # Main HTML file
│   ├── app.js          # JavaScript functionality
│   ├── styles.css      # Styling
│   ├── logo.png        # Logo asset
│   └── README.md       # Project documentation
├── spotify/
│   ├── indexs.html     # Main HTML file
│   ├── scripts.js      # JavaScript functionality
│   ├── style.css       # Styling
│   ├── [images/icons]  # Various assets
│   └── README.md       # Project documentation
├── API_DOCUMENTATION.md
├── TECHNICAL_SPECIFICATIONS.md
└── QUICK_REFERENCE.md  # This file
```

### Quick Start Commands
```bash
# Start TODO App
cd TODO-APP && python -m http.server 8000

# Start Spotify Clone
cd spotify && python -m http.server 8000

# Alternative with Node.js
npx http-server TODO-APP
npx http-server spotify
```

---

## TODO App Quick Reference

### Core Files
| File | Purpose | Size |
|------|---------|------|
| `index.html` | HTML structure | ~1KB |
| `app.js` | JavaScript logic | ~1KB |
| `styles.css` | Styling | ~2KB |

### DOM Elements
```javascript
// Main elements
const btn = document.querySelector("button");     // Add button
const ul = document.querySelector("ul");          // Task list
const inp = document.querySelector("input");      // Input field

// Dynamic elements (created by JS)
const li = document.createElement("li");          // Task item
const delBtn = document.createElement("button");  // Delete button
```

### Key Functions
```javascript
// Add task (triggered by button click)
btn.addEventListener("click", function(){
    let item = document.createElement("li");
    item.innerText = inp.value;
    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";
    delBtn.classList.add("delete");
    item.appendChild(delBtn);
    ul.appendChild(item);
    inp.value = "";
});

// Delete task (event delegation)
ul.addEventListener("click", function (event) {
    if(event.target.nodeName == "BUTTON") {
        let listItem = event.target.parentElement;
        listItem.remove();
        console.log("delete");
    }
});
```

### Essential CSS Classes
```css
body { background-color: black; color: #fff; }
h1 { background-color: #4CAF50; color: yellow; }
input { border-color: yellow; }
button { background-color: #4CAF50; color: white; }
.delete { /* Delete button styling */ }
```

### HTML Structure
```html
<body>
    <h1>Todo App</h1>
    <input placeholder="Enter your task" size="100">
    <button>Add-Tasks</button>
    <ul>
        <h3>CREATE YOUR PLANE TODO-LISTS</h3>
        <!-- Dynamic tasks added here -->
    </ul>
    <script src="app.js"></script>
</body>
```

---

## Spotify Clone Quick Reference

### Core Files
| File | Purpose | Size |
|------|---------|------|
| `indexs.html` | HTML structure | ~6KB |
| `scripts.js` | JavaScript logic | ~2KB |
| `style.css` | Styling | ~4KB |

### Main Layout Structure
```html
<div class="main">
    <div class="sidebar">
        <div class="nav"><!-- Navigation --></div>
        <div class="library"><!-- Library section --></div>
    </div>
    <div class="main-content">
        <!-- Playlist cards and content -->
    </div>
    <div class="music-player">
        <!-- Bottom music player -->
    </div>
</div>
```

### Key JavaScript References
```javascript
// Audio player (needs to be added to HTML)
const audioPlayer = document.getElementById('audio-player');

// UI elements
const libraryBox = document.querySelector('.lib-box');
const toggleLibraryButton = document.querySelector('.lib-option');
const cards = document.querySelectorAll('.card');
```

### Essential Functions
```javascript
// Play music
document.querySelector('.player-control-icon.play').addEventListener('click', () => {
    audioPlayer.play();
});

// Toggle library
toggleLibraryButton.addEventListener('click', () => {
    libraryBox.style.display = (libraryBox.style.display === 'none' || 
                                libraryBox.style.display === '') ? 'block' : 'none';
});

// Handle card clicks
cards.forEach(card => {
    card.addEventListener('click', () => {
        alert(`Playing playlist: ${card.querySelector('.card-title').textContent}`);
    });
});

// Search functionality
document.querySelector('.fa-magnifying-glass').addEventListener('click', () => {
    const searchTerm = prompt('Enter playlist name:').toLowerCase();
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
});
```

### Layout CSS Classes
```css
.main { display: flex; height: 100vh; }
.sidebar { width: 340px; background-color: #000; }
.main-content { flex: 1; background-color: #121212; }
.music-player { position: fixed; bottom: 0; height: 72px; }
```

---

## CSS Classes Reference

### TODO App Classes
| Class | Element | Purpose |
|-------|---------|---------|
| `body` | Body | Dark theme, global styles |
| `h1` | Header | Green background, yellow text |
| `input` | Input field | Yellow border, hover effects |
| `button` | Buttons | Green background, white text |
| `.delete` | Delete buttons | Button styling modifier |
| `ul` | Task list | List container |
| `li` | Task items | Individual task styling |

### Spotify Clone Classes
| Class | Element | Purpose |
|-------|---------|---------|
| `.main` | Main container | Flexbox layout |
| `.sidebar` | Sidebar | Fixed width navigation |
| `.main-content` | Content area | Flexible content space |
| `.music-player` | Player bar | Fixed bottom player |
| `.nav-option` | Navigation items | Menu options |
| `.card` | Playlist cards | Content cards |
| `.player-control-icon` | Control buttons | Music controls |
| `.progress-bar` | Progress slider | Audio progress |
| `.lib-box` | Library content | Toggleable library |

---

## JavaScript Functions Reference

### TODO App Functions
| Function | Trigger | Purpose | Parameters |
|----------|---------|---------|------------|
| `addTask()` | Button click | Add new task | None |
| `deleteTask()` | Delete button click | Remove task | `event` |

### Spotify Clone Functions
| Function | Trigger | Purpose | Parameters |
|----------|---------|---------|------------|
| `playMusic()` | Play button click | Start audio | None |
| `pauseMusic()` | Pause button click | Pause audio | None |
| `updateProgressBar()` | Audio timeupdate | Update progress | None |
| `seekToPosition()` | Progress change | Seek audio | `event` |
| `toggleLibrary()` | Library click | Show/hide library | None |
| `handleCardClick()` | Card click | Select playlist | `card` |
| `searchPlaylists()` | Search click | Filter playlists | None |

---

## Event Listeners Cheat Sheet

### TODO App Events
```javascript
// Button click for adding tasks
btn.addEventListener("click", addTaskFunction);

// Delegated click for delete buttons
ul.addEventListener("click", deleteTaskFunction);
```

### Spotify Clone Events
```javascript
// Music control events
document.querySelector('.play').addEventListener('click', playMusic);
document.querySelector('.pause').addEventListener('click', pauseMusic);

// UI interaction events
document.querySelector('.lib-option').addEventListener('click', toggleLibrary);
document.querySelector('.fa-magnifying-glass').addEventListener('click', searchPlaylists);

// Audio events (when audio element exists)
audioPlayer.addEventListener('timeupdate', updateProgressBar);
document.querySelector('.progress-bar').addEventListener('input', seekToPosition);

// Card click events (forEach loop)
cards.forEach(card => {
    card.addEventListener('click', handleCardClick);
});
```

---

## Common Code Snippets

### Adding HTML Elements Dynamically
```javascript
// Create element
const element = document.createElement('div');
element.className = 'my-class';
element.innerText = 'Content';

// Add to parent
parentElement.appendChild(element);

// Remove element
element.remove();
```

### Event Delegation Pattern
```javascript
// Instead of individual listeners
parentElement.addEventListener('click', function(event) {
    if (event.target.matches('.target-class')) {
        // Handle event
    }
});
```

### Toggle Element Visibility
```javascript
// Simple toggle
element.style.display = element.style.display === 'none' ? 'block' : 'none';

// With class toggle
element.classList.toggle('hidden');
```

### Input Validation
```javascript
function validateInput(input) {
    if (!input || input.trim().length === 0) return false;
    if (input.length > 500) return false;
    return true;
}
```

### Local Storage Operations
```javascript
// Save data
localStorage.setItem('key', JSON.stringify(data));

// Load data
const data = JSON.parse(localStorage.getItem('key'));

// Remove data
localStorage.removeItem('key');
```

---

## Troubleshooting Guide

### Common Issues

#### TODO App Issues
| Problem | Cause | Solution |
|---------|--------|----------|
| Tasks not adding | JavaScript not loaded | Check `<script>` tag placement |
| Delete not working | Event delegation issue | Verify `ul` event listener |
| Styling not applied | CSS not loaded | Check CSS file path |
| Input not clearing | Missing `inp.value = ""` | Add clear statement |

#### Spotify Clone Issues
| Problem | Cause | Solution |
|---------|--------|----------|
| Audio not playing | No audio element | Add `<audio id="audio-player">` |
| Cards not clickable | Event listener not bound | Check `cards.forEach` loop |
| Library not toggling | Selector not found | Verify `.lib-box` exists |
| Search not working | Prompt blocked | Use input field instead |
| Layout broken | CSS not loaded | Check CSS file path |

### Debug Commands
```javascript
// Check if elements exist
console.log(document.querySelector('selector'));

// Check event listeners
getEventListeners(element); // Chrome DevTools only

// Monitor performance
console.time('operation');
// ... code ...
console.timeEnd('operation');

// Check CSS computed styles
getComputedStyle(element);
```

### Browser DevTools Tips
```javascript
// Console shortcuts
$('selector')          // document.querySelector
$$('selector')         // document.querySelectorAll
$0                     // Last selected element
copy(object)           // Copy to clipboard
monitor(function)      // Monitor function calls
```

### Performance Checks
```javascript
// Check memory usage
console.log(performance.memory);

// Measure function performance
function measure(name, fn) {
    const start = performance.now();
    const result = fn();
    console.log(`${name}: ${performance.now() - start}ms`);
    return result;
}
```

### CSS Debugging
```css
/* Debug borders */
* { border: 1px solid red !important; }

/* Debug specific element */
.debug { outline: 2px solid lime !important; }

/* Check if CSS is loaded */
body::after {
    content: "CSS Loaded";
    position: fixed;
    top: 0;
    right: 0;
    background: green;
    color: white;
    padding: 5px;
}
```

---

## External Dependencies

### Font Awesome (Both Projects)
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
```

### Google Fonts (Both Projects)
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

### CSS Font Usage
```css
font-family: "Montserrat", sans-serif;
```

---

## Quick Setup Checklist

### TODO App Setup ✅
- [ ] HTML file with correct structure
- [ ] CSS file linked properly
- [ ] JavaScript file linked at bottom
- [ ] Font dependencies included
- [ ] Input, button, and list elements present

### Spotify Clone Setup ✅
- [ ] HTML file with layout structure
- [ ] CSS file with layout styles
- [ ] JavaScript file with event handlers
- [ ] Image assets in correct location
- [ ] Font Awesome icons working
- [ ] All sections (sidebar, main, player) present

### Testing Checklist ✅
- [ ] All links and assets load correctly
- [ ] JavaScript console shows no errors
- [ ] Interactive elements respond to clicks
- [ ] Styling appears as expected
- [ ] Mobile/responsive behavior (if implemented)

This quick reference provides fast access to essential information for both projects. Bookmark this page for rapid development and debugging!