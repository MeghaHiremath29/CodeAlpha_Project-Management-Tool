<!DOCTYPE html>
<html>
<head>
  <title>Project Management Tool</title>
  <style>
    body {
      font-family: Arial;
      background: #f2f2f2;
      padding: 20px;
    }
    h2 {
      text-align: center;
    }
    .container {
      max-width: 900px;
      margin: auto;
    }
    input, textarea, button {
      width: 100%;
      padding: 8px;
      margin: 5px 0;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    .project {
      background: white;
      padding: 15px;
      margin-top: 15px;
      border-radius: 5px;
    }
    .task {
      background: #e9ecef;
      padding: 10px;
      margin-top: 10px;
      border-radius: 5px;
    }
    .comment {
      font-size: 14px;
      margin-left: 10px;
    }
  </style>
</head>

<body>

  <h2>📋 Project Management Tool</h2>

  <div class="container">

    <h3>Create Project</h3>
    <input id="projectName" placeholder="Project Name">
    <button onclick="addProject()">Add Project</button>

    <div id="projects"></div>

  </div>

<script>
let projects = [];

function addProject() {
  let name = document.getElementById("projectName").value;
  if (name === "") return alert("Enter project name");
  projects.push({ name, tasks: [] });
  document.getElementById("projectName").value = "";
  render();
}

function addTask(pIndex) {
  let taskName = prompt("Enter task name");
  if (!taskName) return;
  projects[pIndex].tasks.push({ name: taskName, comments: [] });
  render();
}

function addComment(pIndex, tIndex) {
  let comment = prompt("Enter comment");
  if (!comment) return;
  projects[pIndex].tasks[tIndex].comments.push(comment);
  render();
}

function render() {
  let html = "";
  projects.forEach((p, pi) => {
    html += `
      <div class="project">
        <h3>${p.name}</h3>
        <button onclick="addTask(${pi})">Add Task</button>
    `;
    p.tasks.forEach((t, ti) => {
      html += `
        <div class="task">
          <b>${t.name}</b>
          <button onclick="addComment(${pi}, ${ti})">Comment</button>
      `;
      t.comments.forEach(c => {
        html += `<div class="comment">💬 ${c}</div>`;
      });
      html += `</div>`;
    });
    html += `</div>`;
  });
  document.getElementById("projects").innerHTML = html;
}
</script>

</body>
</html>