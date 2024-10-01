// Get references to elements
const taskInput = document.getElementById('task-input');
const deadlineInput = document.getElementById('deadline-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (taskText === "" || deadline === "") {
        alert("Please enter a task and set a deadline.");
        return;
    }

    // Create task element
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    // Task details
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    const taskContent = document.createElement('span');
    taskContent.innerText = taskText;

    const creationTime = new Date().toLocaleString();
    const taskDeadline = document.createElement('span');
    taskDeadline.className = 'task-deadline';
    taskDeadline.innerText = `Created: ${creationTime} | Deadline: ${new Date(deadline).toLocaleString()}`;
    
    taskDetails.appendChild(taskContent);
    taskDetails.appendChild(taskDeadline);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = () => {
        taskItem.classList.add('removing');
        setTimeout(() => taskItem.remove(), 300); // Animation before removal
    };

    // Append elements
    taskItem.appendChild(taskDetails);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    // Clear inputs
    taskInput.value = "";
    deadlineInput.value = "";
}

// Event listener for adding task
addBtn.addEventListener('click', addTask);

// Allow pressing Enter to add task
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
