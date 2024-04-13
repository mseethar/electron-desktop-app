const fs = require('fs');
const remote = require('@electron/remote');
const { dialog } = remote;
console.log("hello");
console.log(document.getElementById('fileSelector'));

document.getElementById('fileSelector').addEventListener('change', (event) => {
    console.log(event);
    const file = event.target.files[0];
    console.log(file);
    if (file) {
        const reader = new FileReader();
        console.log(reader);
        reader.onload = function(e) {
            const contents = e.target.result;
            console.log(contents);
            displayCSV(contents);
        };
        reader.readAsText(file);
    }
});

function displayCSV(csvData) {
    const rows = csvData.split('\n');
    let tableHTML = '<table>';
    rows.forEach(row => {
        console.log(row);
        const columns = row.split(',');
        tableHTML += '<tr>';
        columns.forEach(column => {
            tableHTML += `<td>${column}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</table>';
    document.getElementById('csvTable').innerHTML = tableHTML;
}

document.querySelectorAll('.tree-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        let nextElem = link.nextElementSibling;
        if (nextElem && nextElem.tagName === 'UL') {
            e.preventDefault();  // Prevent default if it's a link
            nextElem.style.display = nextElem.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Function to make an element resizable
function makeResizable(element, handle) {
    let isResizing = false;
    let lastX = 0;

    handle.addEventListener('mousedown', function(e) {
        isResizing = true;
        lastX = e.clientX;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResizing);
        e.preventDefault();
    });

    function handleMouseMove(e) {
        if (!isResizing) return;

        let deltaX = e.clientX - lastX;
        let newWidth = element.offsetWidth + deltaX * (handle.id === 'right-resize-handle' ? -1 : 1);
        
        element.style.width = `${newWidth}px`;
        lastX = e.clientX;
    }

    function stopResizing() {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResizing);
    }
}

// Apply the resizable function to the sidebars
makeResizable(document.getElementById('left-sidebar'), document.getElementById('left-resize-handle'));
makeResizable(document.getElementById('right-sidebar'), document.getElementById('right-resize-handle'));