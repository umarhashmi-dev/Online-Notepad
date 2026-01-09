// Rich Text Editor JavaScript
(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRichTextEditor);
    } else {
        initRichTextEditor();
    }

    function initRichTextEditor() {
        const editor = document.getElementById('note');
        if (!editor || !editor.hasAttribute('contenteditable')) {
            return; // Not a rich text editor
        }

        // Formatting functions
        window.formatDoc = function (cmd, value = null) {
            editor.focus();
            document.execCommand(cmd, false, value);
            updateToolbarState();
        };

        // Update toolbar button states based on current selection
        function updateToolbarState() {
            const buttons = {
                'boldBtn': 'bold',
                'italicBtn': 'italic',
                'underlineBtn': 'underline',
                'strikethroughBtn': 'strikeThrough'
            };

            for (const [btnId, cmd] of Object.entries(buttons)) {
                const btn = document.getElementById(btnId);
                if (btn) {
                    if (document.queryCommandState(cmd)) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                }
            }

            // Update font family dropdown
            const fontSelect = document.getElementById('fontFamily');
            if (fontSelect) {
                const fontName = document.queryCommandValue('fontName');
                if (fontName) {
                    fontSelect.value = fontName.replace(/['"]/g, '');
                }
            }

            // Update font size dropdown
            const sizeSelect = document.getElementById('fontSize');
            if (sizeSelect) {
                const fontSize = document.queryCommandValue('fontSize');
                if (fontSize) {
                    sizeSelect.value = fontSize;
                }
            }
        }

        // Add event listeners to toolbar buttons
        const toolbarButtons = document.querySelectorAll('.toolbar-btn');
        toolbarButtons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const cmd = this.getAttribute('data-cmd');
                if (cmd) {
                    formatDoc(cmd);
                }
            });
        });

        // Font family change
        const fontFamily = document.getElementById('fontFamily');
        if (fontFamily) {
            fontFamily.addEventListener('change', function () {
                formatDoc('fontName', this.value);
            });
        }

        // Font size change
        const fontSize = document.getElementById('fontSize');
        if (fontSize) {
            fontSize.addEventListener('change', function () {
                formatDoc('fontSize', this.value);
            });
        }

        // Text color change
        const textColor = document.getElementById('textColor');
        if (textColor) {
            textColor.addEventListener('change', function () {
                formatDoc('foreColor', this.value);
            });
        }

        // Highlight color change
        const highlightColor = document.getElementById('highlightColor');
        if (highlightColor) {
            highlightColor.addEventListener('change', function () {
                formatDoc('hiliteColor', this.value);
            });
        }

        // Update toolbar state on selection change
        editor.addEventListener('mouseup', updateToolbarState);
        editor.addEventListener('keyup', updateToolbarState);
        editor.addEventListener('focus', updateToolbarState);

        // Keyboard shortcuts
        editor.addEventListener('keydown', function (e) {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        formatDoc('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        formatDoc('italic');
                        break;
                    case 'u':
                        e.preventDefault();
                        formatDoc('underline');
                        break;
                }
            }
        });

        // Handle paste - clean up formatting if needed
        editor.addEventListener('paste', function (e) {
            // Allow default paste behavior
            // You can add custom paste handling here if needed
        });

        // Initialize toolbar state
        updateToolbarState();
    }
})();
