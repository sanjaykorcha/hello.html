# Complete API Documentation

This document provides comprehensive documentation for all public APIs, functions, and components in the workspace projects.

## Projects Overview

The workspace contains two main projects:
1. **TODO-APP**: A simple task management application
2. **Spotify Clone**: A music player interface mimicking Spotify

---

## TODO-APP Documentation

### Overview
A simple, interactive TODO list application that allows users to add and delete tasks dynamically.

### Project Structure
```
TODO-APP/
├── index.html     # Main HTML structure
├── app.js         # JavaScript functionality
├── styles.css     # Styling and layout
└── logo.png       # Application logo
```

### Components

#### HTML Structure (`index.html`)

##### Main Container
- **Element**: `<body>`
- **Purpose**: Main application container with dark theme styling
- **Dependencies**: 
  - Font Awesome 6.6.0 (icons)
  - Google Fonts (Montserrat)
  - Custom CSS (`styles.css`)

##### Header Component
```html
<h1>Todo App</h1>
```
- **Type**: Static header
- **Styling**: Fixed positioning, green background (#4CAF50), yellow text
- **Purpose**: Application title and branding

##### Input Component
```html
<input placeholder="Enter your task" size="100">
```
- **Type**: Text input field
- **Attributes**:
  - `placeholder`: "Enter your task"
  - `size`: 100 characters
- **Styling**: Fixed position, yellow border with green hover effect
- **Purpose**: Task entry field

##### Add Button Component
```html
<button>Add-Tasks</button>
```
- **Type**: Primary action button
- **Styling**: Green background (#4CAF50), white text, rounded corners
- **Purpose**: Triggers task addition to the list

##### Task List Component
```html
<ul>
    <h3>CREATE YOUR PLANE TODO-LISTS</h3>
    <li>Set<button class="delete">delete</button></li>
    <li>Targets<button class="delete">delete</button></li>
</ul>
```
- **Type**: Dynamic list container
- **Default Items**: Two sample tasks ("Set", "Targets")
- **Purpose**: Displays all tasks with individual delete buttons

### JavaScript API (`app.js`)

#### DOM Element References
```javascript
let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("input");
```

#### Public Functions

##### `addTask()` (Event Handler)
- **Trigger**: Click event on Add-Tasks button
- **Purpose**: Creates and adds new task to the list
- **Parameters**: None (reads from input field)
- **Functionality**:
  1. Creates new `<li>` element
  2. Sets task text from input value
  3. Creates delete button for the task
  4. Appends task to the list
  5. Clears input field

**Usage Example**:
```javascript
// Automatically triggered when user clicks "Add-Tasks" button
// User types "Buy groceries" in input field and clicks button
// Result: New task "Buy groceries" appears in list with delete button
```

##### `deleteTask()` (Event Handler)
- **Trigger**: Click event on any delete button within the task list
- **Purpose**: Removes individual tasks from the list
- **Parameters**: `event` object (automatically provided)
- **Functionality**:
  1. Checks if clicked element is a button
  2. Identifies parent list item
  3. Removes the entire task from DOM
  4. Logs deletion to console

**Usage Example**:
```javascript
// Automatically triggered when user clicks any "delete" button
// Removes the associated task from the list
// Console output: "delete"
```

#### Event Listeners

##### Button Click Listener
```javascript
btn.addEventListener("click", function(){
    // Task addition logic
});
```
- **Element**: Add-Tasks button
- **Event**: `click`
- **Action**: Adds new task to list

##### List Click Listener (Event Delegation)
```javascript
ul.addEventListener("click", function (event) {
    // Task deletion logic
});
```
- **Element**: Task list (`<ul>`)
- **Event**: `click` (delegated)
- **Action**: Handles delete button clicks for all tasks

### CSS Classes and Styling (`styles.css`)

#### Global Styles
- **Font**: Montserrat (Google Fonts)
- **Background**: Black (#000000)
- **Text Color**: White (#FFFFFF)
- **Layout**: CSS Grid

#### Component Classes

##### `.delete` Button Class
```css
button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}
```
- **Purpose**: Styling for all delete buttons
- **Features**: Green background, white text, rounded corners, pointer cursor

### Usage Instructions

#### Basic Usage
1. **Add a Task**:
   - Type task description in the input field
   - Click "Add-Tasks" button
   - Task appears in the list with a delete button

2. **Delete a Task**:
   - Click the "delete" button next to any task
   - Task is immediately removed from the list

#### Integration Example
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Todo App</h1>
    <input placeholder="Enter your task" size="100">
    <button>Add-Tasks</button>
    <ul>
        <h3>CREATE YOUR PLANE TODO-LISTS</h3>
    </ul>
    <script src="app.js"></script>
</body>
</html>
```

---

## Spotify Clone Documentation

### Overview
A responsive music player interface that mimics Spotify's design and functionality, featuring playlist browsing, music controls, and library management.

### Project Structure
```
spotify/
├── indexs.html        # Main HTML structure
├── scripts.js         # JavaScript functionality
├── style.css          # Styling and layout
├── [images/]          # Various image assets
└── [icons/]           # UI icons and controls
```

### Components

#### HTML Structure (`indexs.html`)

##### Main Layout Container
```html
<div class="main">
    <div class="sidebar">...</div>
    <div class="main-content">...</div>
    <div class="music-player">...</div>
</div>
```
- **Type**: Flexbox layout container
- **Children**: Sidebar, Main Content, Music Player
- **Purpose**: Primary application layout

##### Sidebar Component
```html
<div class="sidebar">
    <div class="nav">...</div>
    <div class="library">...</div>
</div>
```
- **Width**: 340px
- **Features**: Navigation and library sections
- **Styling**: Dark background (#000), rounded corners

###### Navigation Section
```html
<div class="nav">
    <div class="nav-option">
        <i class="fa-solid fa-house"></i>
        <a href="#">Home</a>
    </div>
    <div class="nav-option">
        <i class="fa-solid fa-magnifying-glass"></i>
        <a href="#">Search</a>
    </div>
</div>
```
- **Options**: Home, Search
- **Icons**: Font Awesome icons
- **Styling**: Dark background (#121212)

###### Library Section
```html
<div class="library">
    <div class="options">
        <div class="lib-option nav-option">
            <img src="library_icon.png" alt="">
            <a href="#">Your Library</a>
        </div>
    </div>
    <div class="lib-box">...</div>
</div>
```
- **Features**: Library toggle, playlist creation prompts
- **Interactive**: Click to show/hide library content

##### Main Content Area
```html
<div class="main-content">
    <div class="sticky-nav">...</div>
    <h2>Recently Played</h2>
    <div class="cards-container">...</div>
    <!-- Multiple sections with cards -->
</div>
```
- **Sections**: Recently Played, Trending, Featured Charts
- **Layout**: Scrollable content area
- **Background**: Dark (#121212)

###### Card Component
```html
<div class="card">
    <img src="[image]" class="card-img">
    <p class="card-title">Top 50 - Global</p>
    <p class="card-info">Your daily update of the most played...</p>
</div>
```
- **Purpose**: Displays playlist/album information
- **Interactive**: Clickable to trigger playlist selection
- **Content**: Image, title, description

##### Music Player Component
```html
<div class="music-player">
    <div class="album"></div>
    <div class="player">
        <div class="player-controls">...</div>
        <div class="playback-bar">...</div>
    </div>
    <div class="controls"></div>
</div>
```
- **Position**: Fixed bottom
- **Height**: 72px
- **Features**: Album info, playback controls, progress bar

###### Player Controls
```html
<div class="player-controls">
    <img src="player_icon1.png" class="player-control-icon">
    <img src="player_icon2.png" class="player-control-icon">
    <img src="player_icon3.png" class="player-control-icon play">
    <img src="player_icon4.png" class="player-control-icon">
    <img src="player_icon5.png" class="player-control-icon">
</div>
```
- **Controls**: Previous, Play/Pause, Next, etc.
- **Icons**: Custom PNG images
- **Interactive**: Click handlers for music control

###### Progress Bar
```html
<div class="playback-bar">
    <span class="curr-time">00:00</span>
    <input type="range" min="0" max="100" class="progress-bar" step="1">
    <span class="tot-time">3:33</span>
</div>
```
- **Type**: Range slider
- **Purpose**: Shows and controls playback progress
- **Features**: Current time, total time display

### JavaScript API (`scripts.js`)

#### Audio Player Reference
```javascript
const audioPlayer = document.getElementById('audio-player');
```
- **Purpose**: Reference to HTML5 audio element
- **Note**: Audio element not present in current HTML structure

#### Public Functions

##### `playMusic()`
- **Trigger**: Click on play button
- **Purpose**: Starts audio playback
- **Implementation**:
```javascript
document.querySelector('.player-control-icon.play').addEventListener('click', () => {
    audioPlayer.play();
});
```

##### `pauseMusic()`
- **Trigger**: Click on pause button
- **Purpose**: Pauses audio playback
- **Implementation**:
```javascript
document.querySelector('.player-control-icon.pause').addEventListener('click', () => {
    audioPlayer.pause();
});
```

##### `updateProgressBar()`
- **Trigger**: Audio timeupdate event
- **Purpose**: Updates progress bar based on playback position
- **Implementation**:
```javascript
audioPlayer.addEventListener('timeupdate', () => {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});
```

##### `seekToPosition()`
- **Trigger**: Progress bar input change
- **Purpose**: Allows seeking to specific playback position
- **Parameters**: Event object with target value
- **Implementation**:
```javascript
document.querySelector('.progress-bar').addEventListener('input', (e) => {
    audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
});
```

##### `toggleLibrary()`
- **Trigger**: Click on library option
- **Purpose**: Shows/hides library section
- **Implementation**:
```javascript
toggleLibraryButton.addEventListener('click', () => {
    libraryBox.style.display = (libraryBox.style.display === 'none' || 
                                libraryBox.style.display === '') ? 'block' : 'none';
});
```

##### `handleCardClick()`
- **Trigger**: Click on any playlist card
- **Purpose**: Simulates playlist selection
- **Parameters**: Card element
- **Implementation**:
```javascript
cards.forEach(card => {
    card.addEventListener('click', () => {
        alert(`Playing playlist: ${card.querySelector('.card-title').textContent}`);
    });
});
```

##### `searchPlaylists()`
- **Trigger**: Click on search icon
- **Purpose**: Filters playlists based on search term
- **Implementation**:
```javascript
document.querySelector('.fa-magnifying-glass').addEventListener('click', () => {
    const searchTerm = prompt('Enter playlist name:').toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
});
```

#### Event Listeners Summary

| Element | Event | Function | Purpose |
|---------|--------|----------|---------|
| `.play` button | `click` | `playMusic()` | Start playback |
| `.pause` button | `click` | `pauseMusic()` | Pause playback |
| `audioPlayer` | `timeupdate` | `updateProgressBar()` | Update progress |
| `.progress-bar` | `input` | `seekToPosition()` | Seek audio |
| `.lib-option` | `click` | `toggleLibrary()` | Toggle library |
| `.card` | `click` | `handleCardClick()` | Select playlist |
| `.fa-magnifying-glass` | `click` | `searchPlaylists()` | Search function |

### CSS Classes and Styling (`style.css`)

#### Global Styles
- **Font**: Montserrat (Google Fonts)
- **Background**: Black (#000000)
- **Text Color**: White (#FFFFFF)
- **Overflow**: Hidden (prevents scrolling issues)

#### Layout Classes

##### `.main`
```css
.main {
    display: flex;
    height: 100vh;
    padding: 0.5rem;
}
```
- **Layout**: Flexbox horizontal
- **Height**: Full viewport
- **Purpose**: Main container

##### `.sidebar`
```css
.sidebar {
    background-color: #000;
    width: 340px;
    border-radius: 1rem;
    margin-right: 0.5rem;
}
```
- **Width**: Fixed 340px
- **Background**: Pure black
- **Features**: Rounded corners

##### `.main-content`
```css
.main-content {
    background-color: #121212;
    flex: 1;
    border-radius: 1rem;
    overflow: auto;
    padding: 0 1.5rem 0 1.5rem;
}
```
- **Layout**: Flexible width
- **Background**: Dark gray (#121212)
- **Features**: Scrollable, rounded corners

##### `.music-player`
```css
.music-player {
    background-color: black;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 72px;
}
```
- **Position**: Fixed bottom
- **Width**: Full width
- **Height**: 72px fixed

#### Component Classes

##### `.nav-option`
- **Purpose**: Navigation menu items
- **Layout**: Flex with icons and text
- **Hover**: Interactive hover effects

##### `.card`
- **Purpose**: Playlist/album display cards
- **Features**: Image, title, description
- **Interactive**: Hover and click effects

##### `.player-control-icon`
- **Purpose**: Music player control buttons
- **Features**: Icon images with hover effects
- **Sizing**: Responsive icon sizing

##### `.progress-bar`
- **Purpose**: Audio progress slider
- **Type**: Range input element
- **Features**: Custom styling for music player

### Usage Instructions

#### Basic Setup
1. **Include Dependencies**:
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
   ```

2. **Include Files**:
   ```html
   <link rel="stylesheet" href="style.css">
   <script src="scripts.js"></script>
   ```

#### Integration Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <title>Spotify Clone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="main">
        <!-- Sidebar, Main Content, Music Player -->
    </div>
    <script src="scripts.js"></script>
</body>
</html>
```

#### Adding Audio Functionality
To make the music player functional, add an audio element:
```html
<audio id="audio-player" preload="metadata">
    <source src="your-audio-file.mp3" type="audio/mpeg">
</audio>
```

#### Customizing Playlists
To add new playlists, use the card structure:
```html
<div class="card">
    <img src="your-image.jpg" class="card-img">
    <p class="card-title">Your Playlist Name</p>
    <p class="card-info">Your playlist description</p>
</div>
```

#### Search Functionality
The search function prompts users for input and filters cards by title. To customize:
```javascript
// Modify the search function to use a search input instead of prompt
const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Filter logic here
});
```

---

## Common Patterns and Best Practices

### Event Handling
Both projects use event delegation and direct event listeners:
- **TODO App**: Uses event delegation for delete buttons
- **Spotify Clone**: Uses direct listeners for static elements

### DOM Manipulation
- **Dynamic Content**: Both apps create and modify DOM elements
- **CSS Classes**: Use of classes for styling and behavior
- **Data Attributes**: Could be enhanced with data attributes for better organization

### Responsive Design
- **Spotify Clone**: Uses flexbox for responsive layout
- **TODO App**: Uses fixed positioning (could be improved)

### Accessibility Considerations
Both projects could be enhanced with:
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML improvements

---

## API Reference Quick Guide

### TODO App API
| Function | Trigger | Purpose |
|----------|---------|---------|
| `addTask()` | Button click | Add new task |
| `deleteTask()` | Delete button click | Remove task |

### Spotify Clone API
| Function | Trigger | Purpose |
|----------|---------|---------|
| `playMusic()` | Play button click | Start playback |
| `pauseMusic()` | Pause button click | Pause playback |
| `updateProgressBar()` | Audio timeupdate | Update progress |
| `seekToPosition()` | Progress bar change | Seek audio position |
| `toggleLibrary()` | Library button click | Show/hide library |
| `handleCardClick()` | Card click | Select playlist |
| `searchPlaylists()` | Search icon click | Filter playlists |

This documentation provides a complete reference for all public APIs, functions, and components in both projects, including usage examples and integration instructions.