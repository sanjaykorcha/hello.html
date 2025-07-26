// ===== Application State =====
class TaskTunesApp {
    constructor() {
        this.currentTab = 'dashboard';
        this.tasks = [];
        this.playlists = [];
        this.currentTrack = null;
        this.isPlaying = false;
        this.currentPlaylist = null;
        this.queue = [];
        this.currentQueueIndex = 0;
        this.shuffle = false;
        this.repeat = false;
        this.volume = 0.7;
        this.editingTask = null;
        
        // DOM Elements
        this.elements = {};
        
        // Initialize app
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.loadData();
        this.showLoadingScreen();
        this.generateSampleData();
        this.updateDashboard();
        this.initializeAudio();
    }

    // ===== DOM Element Caching =====
    cacheElements() {
        this.elements = {
            // Navigation
            navTabs: document.querySelectorAll('.nav-tab'),
            tabContents: document.querySelectorAll('.tab-content'),
            
            // Loading
            loadingScreen: document.getElementById('loading-screen'),
            app: document.getElementById('app'),
            
            // Search
            globalSearch: document.getElementById('global-search'),
            
            // Theme
            themeToggle: document.getElementById('theme-toggle'),
            
            // Dashboard
            completedTasks: document.getElementById('completed-tasks'),
            pendingTasks: document.getElementById('pending-tasks'),
            songsPlayed: document.getElementById('songs-played'),
            recentTasksList: document.getElementById('recent-tasks-list'),
            dashboardPlayer: document.getElementById('dashboard-player'),
            
            // Tasks
            addTaskBtn: document.getElementById('add-task-btn'),
            taskForm: document.getElementById('task-form'),
            taskTitle: document.getElementById('task-title'),
            taskPriority: document.getElementById('task-priority'),
            taskDueDate: document.getElementById('task-due-date'),
            taskDescription: document.getElementById('task-description'),
            cancelTask: document.getElementById('cancel-task'),
            saveTask: document.getElementById('save-task'),
            tasksList: document.getElementById('tasks-list'),
            noTasks: document.getElementById('no-tasks'),
            filterButtons: document.querySelectorAll('[data-filter]'),
            
            // Music
            musicGrids: {
                recentlyPlayed: document.getElementById('recently-played'),
                focusMusic: document.getElementById('focus-music'),
                popularPlaylists: document.getElementById('popular-playlists')
            },
            createPlaylistBtn: document.querySelector('.create-playlist-btn'),
            
            // Music Player
            audioPlayer: document.getElementById('audio-player'),
            trackImage: document.getElementById('track-image'),
            trackTitle: document.getElementById('track-title'),
            trackArtist: document.getElementById('track-artist'),
            favoriteBtn: document.getElementById('favorite-btn'),
            shuffleBtn: document.getElementById('shuffle-btn'),
            prevBtn: document.getElementById('prev-btn'),
            playPauseBtn: document.getElementById('play-pause-btn'),
            nextBtn: document.getElementById('next-btn'),
            repeatBtn: document.getElementById('repeat-btn'),
            currentTime: document.getElementById('current-time'),
            progressSlider: document.getElementById('progress-slider'),
            duration: document.getElementById('duration'),
            volumeBtn: document.getElementById('volume-btn'),
            volumeSlider: document.getElementById('volume-slider'),
            queueBtn: document.getElementById('queue-btn'),
            fullscreenBtn: document.getElementById('fullscreen-btn'),
            
            // Queue
            queuePanel: document.getElementById('queue-panel'),
            closeQueue: document.getElementById('close-queue'),
            queueList: document.getElementById('queue-list'),
            
            // Modals
            modalOverlay: document.getElementById('modal-overlay'),
            playlistModal: document.getElementById('playlist-modal'),
            playlistName: document.getElementById('playlist-name'),
            playlistDescription: document.getElementById('playlist-description'),
            createPlaylist: document.getElementById('create-playlist'),
            closeModals: document.querySelectorAll('.close-modal'),
            
            // Notifications
            notifications: document.getElementById('notifications')
        };
    }

    // ===== Event Listeners =====
    setupEventListeners() {
        // Navigation
        this.elements.navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Search
        this.elements.globalSearch.addEventListener('input', (e) => {
            this.handleGlobalSearch(e.target.value);
        });

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Tasks
        this.elements.addTaskBtn.addEventListener('click', () => {
            this.showTaskForm();
        });

        this.elements.cancelTask.addEventListener('click', () => {
            this.hideTaskForm();
        });

        this.elements.saveTask.addEventListener('click', () => {
            this.saveTask();
        });

        this.elements.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterTasks(e.target.dataset.filter);
            });
        });

        // Music Player
        this.elements.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });

        this.elements.prevBtn.addEventListener('click', () => {
            this.previousTrack();
        });

        this.elements.nextBtn.addEventListener('click', () => {
            this.nextTrack();
        });

        this.elements.shuffleBtn.addEventListener('click', () => {
            this.toggleShuffle();
        });

        this.elements.repeatBtn.addEventListener('click', () => {
            this.toggleRepeat();
        });

        this.elements.favoriteBtn.addEventListener('click', () => {
            this.toggleFavorite();
        });

        this.elements.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });

        this.elements.progressSlider.addEventListener('input', (e) => {
            this.seekTo(e.target.value);
        });

        this.elements.queueBtn.addEventListener('click', () => {
            this.toggleQueue();
        });

        this.elements.closeQueue.addEventListener('click', () => {
            this.toggleQueue();
        });

        // Playlist creation
        this.elements.createPlaylistBtn.addEventListener('click', () => {
            this.showPlaylistModal();
        });

        this.elements.createPlaylist.addEventListener('click', () => {
            this.createPlaylist();
        });

        // Modal close
        this.elements.closeModals.forEach(btn => {
            btn.addEventListener('click', () => {
                this.hideModals();
            });
        });

        this.elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.modalOverlay) {
                this.hideModals();
            }
        });

        // Audio events
        if (this.elements.audioPlayer) {
            this.elements.audioPlayer.addEventListener('timeupdate', () => {
                this.updateProgress();
            });

            this.elements.audioPlayer.addEventListener('ended', () => {
                this.handleTrackEnd();
            });

            this.elements.audioPlayer.addEventListener('loadedmetadata', () => {
                this.updateDuration();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    // ===== Loading and Initialization =====
    showLoadingScreen() {
        setTimeout(() => {
            this.elements.loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                this.elements.loadingScreen.classList.add('hidden');
                this.elements.app.classList.remove('hidden');
                this.elements.app.classList.add('fade-in');
            }, 300);
        }, 2000);
    }

    loadData() {
        // Load from localStorage
        const savedTasks = localStorage.getItem('tasktunes_tasks');
        const savedPlaylists = localStorage.getItem('tasktunes_playlists');
        const savedSettings = localStorage.getItem('tasktunes_settings');

        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }

        if (savedPlaylists) {
            this.playlists = JSON.parse(savedPlaylists);
        }

        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.volume = settings.volume || 0.7;
            this.shuffle = settings.shuffle || false;
            this.repeat = settings.repeat || false;
        }
    }

    saveData() {
        localStorage.setItem('tasktunes_tasks', JSON.stringify(this.tasks));
        localStorage.setItem('tasktunes_playlists', JSON.stringify(this.playlists));
        localStorage.setItem('tasktunes_settings', JSON.stringify({
            volume: this.volume,
            shuffle: this.shuffle,
            repeat: this.repeat
        }));
    }

    // ===== Sample Data Generation =====
    generateSampleData() {
        if (this.tasks.length === 0) {
            this.tasks = [
                {
                    id: this.generateId(),
                    title: 'Complete project documentation',
                    description: 'Write comprehensive documentation for the TaskTunes application',
                    priority: 'high',
                    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    completed: false,
                    createdAt: new Date(),
                    completedAt: null
                },
                {
                    id: this.generateId(),
                    title: 'Review code changes',
                    description: 'Review pull requests and provide feedback',
                    priority: 'medium',
                    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
                    completed: false,
                    createdAt: new Date(),
                    completedAt: null
                },
                {
                    id: this.generateId(),
                    title: 'Update dependencies',
                    description: 'Update npm packages to latest versions',
                    priority: 'low',
                    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
                    completed: true,
                    createdAt: new Date(Date.now() - 86400000),
                    completedAt: new Date()
                }
            ];
        }

        // Generate sample music data
        this.generateSampleMusic();
        this.saveData();
    }

    generateSampleMusic() {
        const sampleTracks = [
            { title: 'Focus Flow', artist: 'Ambient Sounds', category: 'focus', duration: 180 },
            { title: 'Productive Beats', artist: 'Lo-Fi Hip Hop', category: 'focus', duration: 200 },
            { title: 'Deep Work', artist: 'Study Music', category: 'focus', duration: 240 },
            { title: 'Chill Vibes', artist: 'Relaxing Tunes', category: 'recently-played', duration: 160 },
            { title: 'Morning Coffee', artist: 'Jazz Collective', category: 'recently-played', duration: 220 },
            { title: 'Night Owl', artist: 'Electronic Dreams', category: 'popular', duration: 195 },
            { title: 'Rainy Day', artist: 'Nature Sounds', category: 'popular', duration: 300 },
            { title: 'Workout Mix', artist: 'Energy Boost', category: 'popular', duration: 180 }
        ];

        this.sampleTracks = sampleTracks;
        this.renderMusicCards();
    }

    // ===== Tab Management =====
    switchTab(tabName) {
        // Update active tab
        this.elements.navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        // Update active content
        this.elements.tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabName}-tab`) {
                content.classList.add('active');
            }
        });

        this.currentTab = tabName;

        // Update content based on tab
        switch (tabName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'tasks':
                this.renderTasks();
                break;
            case 'music':
                this.renderMusicCards();
                break;
        }
    }

    // ===== Dashboard Management =====
    updateDashboard() {
        // Update stats
        const completedToday = this.tasks.filter(task => 
            task.completed && this.isToday(new Date(task.completedAt))
        ).length;
        
        const pendingTasks = this.tasks.filter(task => !task.completed).length;
        
        this.elements.completedTasks.textContent = completedToday;
        this.elements.pendingTasks.textContent = pendingTasks;
        this.elements.songsPlayed.textContent = '0'; // This would be tracked in a real app

        // Update recent tasks
        this.renderRecentTasks();
        
        // Update now playing
        this.updateDashboardPlayer();
        
        // Update productivity chart
        this.updateProductivityChart();
    }

    renderRecentTasks() {
        const recentTasks = this.tasks
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        this.elements.recentTasksList.innerHTML = '';

        if (recentTasks.length === 0) {
            this.elements.recentTasksList.innerHTML = '<p class="text-muted">No recent tasks</p>';
            return;
        }

        recentTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'recent-task-item';
            taskElement.innerHTML = `
                <div class="task-info">
                    <h4 class="task-title ${task.completed ? 'completed' : ''}">${task.title}</h4>
                    <div class="task-meta">
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                        ${task.dueDate ? `<span class="task-due-date">Due: ${this.formatDate(task.dueDate)}</span>` : ''}
                    </div>
                </div>
                <div class="task-status">
                    <i class="fas ${task.completed ? 'fa-check-circle text-success' : 'fa-clock text-warning'}"></i>
                </div>
            `;
            this.elements.recentTasksList.appendChild(taskElement);
        });
    }

    updateDashboardPlayer() {
        if (this.currentTrack) {
            this.elements.dashboardPlayer.innerHTML = `
                <div class="dashboard-track">
                    <div class="track-info">
                        <h4>${this.currentTrack.title}</h4>
                        <p>${this.currentTrack.artist}</p>
                    </div>
                    <div class="track-controls">
                        <button class="control-btn" onclick="app.togglePlayPause()">
                            <i class="fas ${this.isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            this.elements.dashboardPlayer.innerHTML = `
                <div class="no-music">
                    <i class="fas fa-music"></i>
                    <p>No music playing</p>
                    <button onclick="app.switchTab('music')">Browse Music</button>
                </div>
            `;
        }
    }

    updateProductivityChart() {
        const canvas = document.getElementById('productivity-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Generate sample productivity data for the last 7 days
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = [3, 5, 2, 8, 6, 4, 7]; // Sample completed tasks per day

        const maxValue = Math.max(...data);
        const barWidth = width / days.length;
        const maxBarHeight = height - 40;

        // Draw bars
        ctx.fillStyle = '#6366f1';
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * maxBarHeight;
            const x = index * barWidth + barWidth * 0.2;
            const y = height - barHeight - 20;
            const width = barWidth * 0.6;

            ctx.fillRect(x, y, width, barHeight);

            // Draw labels
            ctx.fillStyle = '#a1a1aa';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(days[index], x + width / 2, height - 5);
            ctx.fillText(value.toString(), x + width / 2, y - 5);

            ctx.fillStyle = '#6366f1';
        });
    }

    // ===== Task Management =====
    showTaskForm() {
        this.elements.taskForm.classList.remove('hidden');
        this.elements.taskForm.classList.add('slide-up');
        this.elements.taskTitle.focus();
    }

    hideTaskForm() {
        this.elements.taskForm.classList.add('hidden');
        this.clearTaskForm();
        this.editingTask = null;
    }

    clearTaskForm() {
        this.elements.taskTitle.value = '';
        this.elements.taskPriority.value = 'low';
        this.elements.taskDueDate.value = '';
        this.elements.taskDescription.value = '';
    }

    saveTask() {
        const title = this.elements.taskTitle.value.trim();
        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }

        const taskData = {
            title,
            priority: this.elements.taskPriority.value,
            dueDate: this.elements.taskDueDate.value,
            description: this.elements.taskDescription.value.trim(),
            completed: false,
            createdAt: new Date(),
            completedAt: null
        };

        if (this.editingTask) {
            // Update existing task
            const taskIndex = this.tasks.findIndex(task => task.id === this.editingTask.id);
            this.tasks[taskIndex] = { ...this.editingTask, ...taskData };
            this.showNotification('Task updated successfully', 'success');
        } else {
            // Create new task
            taskData.id = this.generateId();
            this.tasks.push(taskData);
            this.showNotification('Task created successfully', 'success');
        }

        this.saveData();
        this.hideTaskForm();
        this.renderTasks();
        this.updateDashboard();
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveData();
            this.renderTasks();
            this.updateDashboard();
            this.showNotification('Task deleted successfully', 'success');
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) return;

        this.editingTask = task;
        this.elements.taskTitle.value = task.title;
        this.elements.taskPriority.value = task.priority;
        this.elements.taskDueDate.value = task.dueDate;
        this.elements.taskDescription.value = task.description;
        
        this.showTaskForm();
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) return;

        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date() : null;

        this.saveData();
        this.renderTasks();
        this.updateDashboard();
        
        const message = task.completed ? 'Task completed!' : 'Task marked as pending';
        this.showNotification(message, 'success');
    }

    filterTasks(filter) {
        this.currentFilter = filter;
        this.renderTasks();
    }

    renderTasks() {
        let filteredTasks = [...this.tasks];

        // Apply filters
        if (this.currentFilter) {
            switch (this.currentFilter) {
                case 'pending':
                    filteredTasks = filteredTasks.filter(task => !task.completed);
                    break;
                case 'completed':
                    filteredTasks = filteredTasks.filter(task => task.completed);
                    break;
                case 'high':
                    filteredTasks = filteredTasks.filter(task => task.priority === 'high');
                    break;
            }
        }

        // Sort tasks (incomplete first, then by priority and due date)
        filteredTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed - b.completed;
            }
            
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            const aPriority = priorityOrder[a.priority];
            const bPriority = priorityOrder[b.priority];
            
            if (aPriority !== bPriority) {
                return bPriority - aPriority;
            }
            
            if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Render tasks
        this.elements.tasksList.innerHTML = '';

        if (filteredTasks.length === 0) {
            this.elements.noTasks.classList.remove('hidden');
            return;
        }

        this.elements.noTasks.classList.add('hidden');

        filteredTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.elements.tasksList.appendChild(taskElement);
        });
    }

    createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <div class="task-header">
                <div style="display: flex; align-items: flex-start;">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="app.toggleTaskComplete('${task.id}')">
                    <div class="task-content">
                        <h3 class="task-title ${task.completed ? 'completed' : ''}">${task.title}</h3>
                        ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                        <div class="task-meta">
                            <span class="task-priority ${task.priority}">${task.priority}</span>
                            ${task.dueDate ? `<span class="task-due-date">Due: ${this.formatDate(task.dueDate)}</span>` : ''}
                            <span class="task-created">Created: ${this.formatDate(task.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn edit-btn" onclick="app.editTask('${task.id}')" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete-btn" onclick="app.deleteTask('${task.id}')" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        return taskElement;
    }

    // ===== Music Management =====
    renderMusicCards() {
        // Render different categories
        this.renderMusicCategory('recently-played', this.sampleTracks.filter(t => t.category === 'recently-played'));
        this.renderMusicCategory('focus-music', this.sampleTracks.filter(t => t.category === 'focus'));
        this.renderMusicCategory('popular-playlists', this.sampleTracks.filter(t => t.category === 'popular'));
    }

    renderMusicCategory(containerId, tracks) {
        const container = this.elements.musicGrids[containerId.replace('-', '')];
        if (!container) return;

        container.innerHTML = '';

        tracks.forEach(track => {
            const cardElement = this.createMusicCard(track);
            container.appendChild(cardElement);
        });
    }

    createMusicCard(track) {
        const cardElement = document.createElement('div');
        cardElement.className = 'music-card';
        cardElement.innerHTML = `
            <div class="card-image">
                <i class="fas fa-music"></i>
                <div class="play-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <h3 class="card-title">${track.title}</h3>
            <p class="card-artist">${track.artist}</p>
            <p class="card-description">Duration: ${this.formatTime(track.duration)}</p>
        `;

        cardElement.addEventListener('click', () => {
            this.playTrack(track);
        });

        return cardElement;
    }

    // ===== Audio Player =====
    initializeAudio() {
        if (this.elements.audioPlayer) {
            this.elements.audioPlayer.volume = this.volume;
            this.elements.volumeSlider.value = this.volume * 100;
        }
    }

    playTrack(track) {
        this.currentTrack = track;
        this.elements.trackTitle.textContent = track.title;
        this.elements.trackArtist.textContent = track.artist;
        
        // In a real app, you would load the actual audio file
        // For demo purposes, we'll simulate playback
        this.isPlaying = true;
        this.updatePlayButton();
        this.updateDashboardPlayer();
        
        this.showNotification(`Now playing: ${track.title}`, 'info');
    }

    togglePlayPause() {
        if (!this.currentTrack) {
            this.showNotification('No track selected', 'warning');
            return;
        }

        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
        this.updateDashboardPlayer();

        // In a real app, you would control actual audio playback
        if (this.elements.audioPlayer) {
            if (this.isPlaying) {
                this.elements.audioPlayer.play().catch(e => {
                    console.log('Audio play failed:', e);
                });
            } else {
                this.elements.audioPlayer.pause();
            }
        }
    }

    updatePlayButton() {
        const icon = this.elements.playPauseBtn.querySelector('i');
        icon.className = `fas ${this.isPlaying ? 'fa-pause' : 'fa-play'}`;
    }

    previousTrack() {
        if (this.queue.length === 0) return;
        
        this.currentQueueIndex = Math.max(0, this.currentQueueIndex - 1);
        this.playTrack(this.queue[this.currentQueueIndex]);
    }

    nextTrack() {
        if (this.queue.length === 0) return;
        
        if (this.shuffle) {
            this.currentQueueIndex = Math.floor(Math.random() * this.queue.length);
        } else {
            this.currentQueueIndex = Math.min(this.queue.length - 1, this.currentQueueIndex + 1);
        }
        
        this.playTrack(this.queue[this.currentQueueIndex]);
    }

    handleTrackEnd() {
        if (this.repeat) {
            this.elements.audioPlayer.currentTime = 0;
            this.elements.audioPlayer.play();
        } else {
            this.nextTrack();
        }
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        this.elements.shuffleBtn.classList.toggle('active', this.shuffle);
        this.saveData();
        
        const message = this.shuffle ? 'Shuffle enabled' : 'Shuffle disabled';
        this.showNotification(message, 'info');
    }

    toggleRepeat() {
        this.repeat = !this.repeat;
        this.elements.repeatBtn.classList.toggle('active', this.repeat);
        this.saveData();
        
        const message = this.repeat ? 'Repeat enabled' : 'Repeat disabled';
        this.showNotification(message, 'info');
    }

    toggleFavorite() {
        if (!this.currentTrack) return;
        
        // In a real app, you would save favorites
        this.elements.favoriteBtn.classList.toggle('active');
        const isFavorite = this.elements.favoriteBtn.classList.contains('active');
        
        const icon = this.elements.favoriteBtn.querySelector('i');
        icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
        
        const message = isFavorite ? 'Added to favorites' : 'Removed from favorites';
        this.showNotification(message, 'success');
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.elements.audioPlayer) {
            this.elements.audioPlayer.volume = this.volume;
        }
        this.updateVolumeIcon();
        this.saveData();
    }

    updateVolumeIcon() {
        const icon = this.elements.volumeBtn.querySelector('i');
        if (this.volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (this.volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }

    seekTo(value) {
        if (this.elements.audioPlayer && this.elements.audioPlayer.duration) {
            const time = (value / 100) * this.elements.audioPlayer.duration;
            this.elements.audioPlayer.currentTime = time;
        }
    }

    updateProgress() {
        if (!this.elements.audioPlayer || !this.elements.audioPlayer.duration) return;
        
        const progress = (this.elements.audioPlayer.currentTime / this.elements.audioPlayer.duration) * 100;
        this.elements.progressSlider.value = progress;
        this.elements.currentTime.textContent = this.formatTime(this.elements.audioPlayer.currentTime);
    }

    updateDuration() {
        if (this.elements.audioPlayer && this.elements.audioPlayer.duration) {
            this.elements.duration.textContent = this.formatTime(this.elements.audioPlayer.duration);
        }
    }

    toggleQueue() {
        this.elements.queuePanel.classList.toggle('active');
        this.renderQueue();
    }

    renderQueue() {
        this.elements.queueList.innerHTML = '';
        
        if (this.queue.length === 0) {
            this.elements.queueList.innerHTML = '<p class="text-muted">No songs in queue</p>';
            return;
        }

        this.queue.forEach((track, index) => {
            const queueItem = document.createElement('div');
            queueItem.className = `queue-item ${index === this.currentQueueIndex ? 'active' : ''}`;
            queueItem.innerHTML = `
                <div class="queue-item-image">
                    <i class="fas fa-music"></i>
                </div>
                <div class="queue-item-info">
                    <div class="queue-item-title">${track.title}</div>
                    <div class="queue-item-artist">${track.artist}</div>
                </div>
            `;
            
            queueItem.addEventListener('click', () => {
                this.currentQueueIndex = index;
                this.playTrack(track);
            });
            
            this.elements.queueList.appendChild(queueItem);
        });
    }

    // ===== Playlist Management =====
    showPlaylistModal() {
        this.elements.modalOverlay.classList.remove('hidden');
        this.elements.playlistModal.classList.remove('hidden');
        this.elements.playlistName.focus();
    }

    hideModals() {
        this.elements.modalOverlay.classList.add('hidden');
        this.elements.playlistModal.classList.add('hidden');
        this.elements.playlistName.value = '';
        this.elements.playlistDescription.value = '';
    }

    createPlaylist() {
        const name = this.elements.playlistName.value.trim();
        if (!name) {
            this.showNotification('Please enter a playlist name', 'error');
            return;
        }

        const playlist = {
            id: this.generateId(),
            name,
            description: this.elements.playlistDescription.value.trim(),
            tracks: [],
            createdAt: new Date()
        };

        this.playlists.push(playlist);
        this.saveData();
        this.hideModals();
        this.showNotification('Playlist created successfully', 'success');
    }

    // ===== Search =====
    handleGlobalSearch(query) {
        if (!query.trim()) return;

        const lowercaseQuery = query.toLowerCase();
        
        // Search in tasks
        const matchingTasks = this.tasks.filter(task => 
            task.title.toLowerCase().includes(lowercaseQuery) ||
            task.description.toLowerCase().includes(lowercaseQuery)
        );

        // Search in music
        const matchingTracks = this.sampleTracks.filter(track =>
            track.title.toLowerCase().includes(lowercaseQuery) ||
            track.artist.toLowerCase().includes(lowercaseQuery)
        );

        // Show search results (in a real app, you might show a search results page)
        console.log('Search results:', { tasks: matchingTasks, tracks: matchingTracks });
    }

    // ===== Theme Management =====
    toggleTheme() {
        // In a real app, you would toggle between light and dark themes
        const icon = this.elements.themeToggle.querySelector('i');
        const isLight = icon.classList.contains('fa-sun');
        
        icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
        this.showNotification(isLight ? 'Dark theme enabled' : 'Light theme enabled', 'info');
    }

    // ===== Keyboard Shortcuts =====
    handleKeyboard(e) {
        // Prevent shortcuts when typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousTrack();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextTrack();
                break;
            case 'Escape':
                this.hideModals();
                this.hideTaskForm();
                if (this.elements.queuePanel.classList.contains('active')) {
                    this.toggleQueue();
                }
                break;
        }
    }

    // ===== Notifications =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas ${iconMap[type]}"></i>
                </div>
                <div class="notification-text">
                    <div class="notification-message">${message}</div>
                </div>
            </div>
        `;

        this.elements.notifications.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (notification.parentNode) {
                        this.elements.notifications.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // ===== Utility Functions =====
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatDate(date) {
        if (typeof date === 'string') {
            return new Date(date).toLocaleDateString();
        }
        return date.toLocaleDateString();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }
}

// ===== Global Functions (for onclick handlers) =====
function switchTab(tabName) {
    app.switchTab(tabName);
}

// ===== Initialize Application =====
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new TaskTunesApp();
});

// ===== Service Worker Registration (for PWA features) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}