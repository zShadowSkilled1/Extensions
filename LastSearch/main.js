// ==UserScript==
// @name         LastSearch
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Save and load the last YouTube search query with auto-update and auto-complete.
// @author       zShadowSkilled
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Settings object with default values
    const settings = {
        enableAutoUpdate: true,
        notificationDuration: 10000,
    };

    // Recent search history array
    const recentSearchHistory = [];

    // Function to save settings to local storage
    function saveSettings() {
        localStorage.setItem('lastSearchSettings', JSON.stringify(settings));
    }

    // Function to load settings from local storage
    function loadSettings() {
        const savedSettings = localStorage.getItem('lastSearchSettings');
        if (savedSettings) {
            Object.assign(settings, JSON.parse(savedSettings));
        }
    }

    // Function to load recent search history from local storage
    function loadRecentSearchHistory() {
        const savedSearches = localStorage.getItem('recentSearchHistory');
        if (savedSearches) {
            recentSearchHistory.push(...JSON.parse(savedSearches));
        }
    }

    // Function to save recent search history to local storage
    function saveRecentSearchHistory() {
        localStorage.setItem('recentSearchHistory', JSON.stringify(recentSearchHistory));
    }

    // Function to open the settings panel
    function openSettingsPanel() {
        // Implement your settings panel UI here
        // Example: create a <div> with various options and inputs
    }

    // Function to handle search input auto-complete
    function handleAutoComplete(event) {
        if (event.key === 'Tab') {
            const searchInput = event.target;
            const currentInput = searchInput.value.trim();
            const autoComplete = recentSearchHistory.find(query => query.startsWith(currentInput));
            if (autoComplete) {
                searchInput.value = autoComplete;
                event.preventDefault(); // Prevent default TAB behavior
            }
        }
    }

    // Function to handle search input change and update recent search history
    function handleSearchInputChange(event) {
        const searchInput = event.target;
        const currentInput = searchInput.value.trim();
        if (currentInput && !recentSearchHistory.includes(currentInput)) {
            recentSearchHistory.unshift(currentInput);
            if (recentSearchHistory.length > 10) {
                recentSearchHistory.pop();
            }
            saveRecentSearchHistory();
        }
    }

    // Save the search query whenever it changes
    function saveLastSearch() {
        const searchInput = document.querySelector('input#search');
        if (searchInput) {
            const lastSearchQuery = searchInput.value;
            localStorage.setItem('lastSearchQuery', lastSearchQuery);
        }
    }

    // Load the last search query when the page loads
    function loadLastSearch() {
        const lastSearchQuery = localStorage.getItem('lastSearchQuery');
        const searchInput = document.querySelector('input#search');
        if (lastSearchQuery && searchInput) {
            searchInput.value = lastSearchQuery;
        }
    }

    document.addEventListener('input', saveLastSearch);
    window.addEventListener('load', loadLastSearch);

    // Check for updates and prompt the user to update
    function updateScript() {
        // Implement your update script logic here
    }

    // Function to show update notification
    function showUpdateNotification(newVersion) {
        // Implement your update notification logic here
    }

    // Function to initialize the script
    function initializeScript() {
        loadSettings();
        loadRecentSearchHistory();
        updateScript();
        // Implement other initialization tasks here
        
        // Add event listeners for auto-complete and search input change
        document.addEventListener('keydown', handleAutoComplete);
        document.addEventListener('input', handleSearchInputChange);
    }

    initializeScript();
})();
