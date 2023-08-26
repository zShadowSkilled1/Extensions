// ==UserScript==
// @name         LastSearch - YouTube Last Search Saver with Auto-Update
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Save and load the last YouTube search query with auto-update.
// @author       zShadowSkilled
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const SCRIPT_NAME = 'YouTube Last Search Saver with Auto-Update';
    const SCRIPT_URL = 'https://raw.githubusercontent.com/zShadowSkilled1/Extensions/main/LastSearch/main.js'; // Updated URL

    // Function to save the search query to local storage
    function saveLastSearch() {
        const searchInput = document.querySelector('input#search');
        if (searchInput) {
            const lastSearchQuery = searchInput.value;
            localStorage.setItem('lastSearchQuery', lastSearchQuery);
        }
    }

    // Function to load the last search query from local storage
    function loadLastSearch() {
        const lastSearchQuery = localStorage.getItem('lastSearchQuery');
        const searchInput = document.querySelector('input#search');
        if (lastSearchQuery && searchInput) {
            searchInput.value = lastSearchQuery;
        }
    }

    // Save the search query whenever it changes
    document.addEventListener('input', saveLastSearch);

    // Load the last search query when the page loads
    window.addEventListener('load', loadLastSearch);

    // Check for updates and prompt the user to update
    function checkForUpdates() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: SCRIPT_URL,
            onload: function(response) {
                const remoteVersion = response.responseText.match(/@version\s+([0-9.]+)/);
                if (remoteVersion && remoteVersion[1]) {
                    const currentVersion = GM_info.script.version;
                    if (remoteVersion[1] > currentVersion) {
                        const updateConfirmed = confirm(`An update is available for "${SCRIPT_NAME}". Do you want to update now?`);
                        if (updateConfirmed) {
                            window.location.href = SCRIPT_URL;
                        }
                    }
                }
            }
        });
    }

    // Check for updates on script load
    checkForUpdates();
})();
