// ==UserScript==
// @name         LastSearch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Save and load the last YouTube search query.
// @author       zShadowSkilled
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
})();
