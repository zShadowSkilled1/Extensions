// ==UserScript==
// @name         LastSearch - YouTube Last Search Saver with Auto-Update
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Save and load the last YouTube search query with auto-update.
// @author       zShadowSkilled
// @match        https://www.youtube.com/*
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const SCRIPT_NAME = 'LastSearch - YouTube Last Search Saver with Auto-Update';
    const SCRIPT_URL = 'https://raw.githubusercontent.com/zShadowSkilled1/Extensions/main/LastSearch/main.js';

    function saveLastSearch() {
        const searchInput = document.querySelector('input#search');
        if (searchInput) {
            const lastSearchQuery = searchInput.value;
            localStorage.setItem('lastSearchQuery', lastSearchQuery);
        }
    }

    function loadLastSearch() {
        const lastSearchQuery = localStorage.getItem('lastSearchQuery');
        const searchInput = document.querySelector('input#search');
        if (lastSearchQuery && searchInput) {
            searchInput.value = lastSearchQuery;
        }
    }

    document.addEventListener('input', saveLastSearch);
    window.addEventListener('load', loadLastSearch);

    function updateScript() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: SCRIPT_URL,
            onload: function(response) {
                const remoteVersion = response.responseText.match(/@version\s+([0-9.]+)/);
                if (remoteVersion && remoteVersion[1]) {
                    const currentVersion = GM_info.script.version;
                    if (remoteVersion[1] > currentVersion) {
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: SCRIPT_URL,
                            onload: function(response) {
                                const updatedScriptCode = response.responseText;
                                GM_info.scriptHandler.replaceScript(updatedScriptCode);

                                // Show update notification
                                showUpdateNotification(remoteVersion[1]);
                            }
                        });
                    }
                }
            }
        });
    }

    function showUpdateNotification(newVersion) {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.textContent = `Script updated to version ${newVersion}`;
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 10000);
    }

    // Add notification styling
    GM_addStyle(`
        .update-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 5px;
            opacity: 0.9;
            font-size: 14px;
            z-index: 9999;
        }
    `);

    updateScript();
})();

