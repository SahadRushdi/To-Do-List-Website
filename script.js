// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMP4fkmPOyBo7wXYrT2ARWvij1XvijjC8",
    authDomain: "to-do-list-37b31.firebaseapp.com",
    databaseURL: "https://to-do-list-37b31-default-rtdb.firebaseio.com",
    projectId: "to-do-list-37b31",
    storageBucket: "to-do-list-37b31.appspot.com",
    messagingSenderId: "1065038444077",
    appId: "1:1065038444077:web:9cb150bfc38e8bd4d4aaa4",
    measurementId: "G-EWJJW4L44D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get references to elements
const taskInput = document.getElementById('task-input');
const deadlineInput = document.getElementById('deadline-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Firebase database reference
const tasksRef = ref(db, 'tasks');

// Load tasks from Firebase when the page loads
onValue(tasksRef, (snapshot) => {
    taskList.innerHTML = ""; // Clear the task list
    const tasks = snapshot.val();
    for (const key in tasks) {
        const taskData = tasks[key];
        displayTask(key, taskData.text, taskData.creationTime, taskData.deadline);
    }
});

// Function to display a task
function displayTask(taskId, taskText, creationTime, deadline) {
    // Create task element
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    // Task details
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const taskContent = document.createElement('span');
    taskContent.innerText = taskText;

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
        remove(ref(db, `tasks/${taskId}`));
        taskItem.classList.add('removing');
        setTimeout(() => taskItem.remove(), 300);
    };

    // Append elements
    taskItem.appendChild(taskDetails);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
}

// Function to add a task to Firebase
function addTask() {
    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (taskText === "" || deadline === "") {
        alert("Please enter a task and set a deadline.");
        return;
    }

    const creationTime = new Date().toLocaleString();

    // Save task to Firebase
    const newTaskRef = push(tasksRef);
    set(newTaskRef, {
        text: taskText,
        creationTime: creationTime,
        deadline: deadline
    });

    // Clear input fields
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
