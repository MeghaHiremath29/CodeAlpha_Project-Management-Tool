const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// --- DATABASE (In-Memory for this demo) ---
let tasks = [
    { id: 1, title: 'Build Auth System', status: 'Todo', user: 'Admin' },
    { id: 2, title: 'Connect WebSockets', status: 'In-Progress', user: 'Dev' }
];

app.use(express.json());

// --- ROUTES ---
// Serve the Frontend UI
app.get('/', (req, res) => {
    res.send(htmlTemplate(tasks));
});

// API to get tasks
app.get('/api/tasks', (req, res) => res.json(tasks));

// --- WEBSOCKETS (Real-time updates) ---
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('taskUpdate', (updatedTask) => {
        tasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
        // Broadcast change to everyone else
        io.emit('refreshUI', tasks); 
    });
});

// --- FRONTEND (HTML/JS/CSS) ---
function htmlTemplate(initialTasks) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Project Tool</title>
        <script src="/socket.io/socket.io.js"></script>
        <style>
            body { font-family: sans-serif; background: #f4f4f9; display: flex; gap: 20px; padding: 20px; }
            .column { background: #ebecf0; border-radius: 5px; width: 300px; padding: 10px; min-height: 400px; }
            .card { background: white; padding: 15px; margin: 10px 0; border-radius: 3px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .card button { margin-top: 10px; cursor: pointer; background: #007bff; color: white; border: none; padding: 5px; border-radius: 3px; }
            h2 { font-size: 1.2rem; color: #172b4d; }
        </style>
    </head>
    <body>
        <div id="board" style="display:flex; gap:20px;"></div>

        <script>
            const socket = io();
            let currentTasks = ${JSON.stringify(initialTasks)};

            function render(tasks) {
                const board = document.getElementById('board');
                const statuses = ['Todo', 'In-Progress', 'Done'];
                board.innerHTML = '';

                statuses.forEach(status => {
                    const col = document.createElement('div');
                    col.className = 'column';
                    col.innerHTML = '<h2>' + status + '</h2>';
                    
                    tasks.filter(t => t.status === status).forEach(t => {
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.innerHTML = '<b>' + t.title + '</b><br><small>Assignee: ' + t.user + '</small><br>';
                        
                        const btn = document.createElement('button');
                        btn.innerText = 'Move Next';
                        btn.onclick = () => {
                            const next = status === 'Todo' ? 'In-Progress' : 'Done';
                            socket.emit('taskUpdate', {...t, status: next});
                        };
                        if(status !== 'Done') card.appendChild(btn);
                        col.appendChild(card);
                    });
                    board.appendChild(col);
                });
            }

            socket.on('refreshUI', (newTasks) => render(newTasks));
            render(currentTasks);
        </script>
    </body>
    </html>
    `;
}

server.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});