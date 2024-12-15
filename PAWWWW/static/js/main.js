document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due_date').value;

    if (!title) {
        alert("Task Title is required!");
        return;
    }

    // Vérifier si une tâche est en cours de modification
    const editingTaskId = document.getElementById('taskForm').dataset.editingTaskId;
    
    if (editingTaskId) {
        // Modifier la tâche existante
        const taskItem = document.getElementById(editingTaskId);
        taskItem.querySelector('.task-title').innerHTML = `<strong>${title}</strong>`;
        taskItem.querySelector('.task-category').textContent = category;
        taskItem.querySelector('.task-priority').textContent = priority;
        taskItem.querySelector('.task-due-date').textContent = dueDate || "No Due Date";

        // Remettre à zéro les champs du formulaire et supprimer l'attribut data-editingTaskId
        document.getElementById('taskForm').reset();
        delete document.getElementById('taskForm').dataset.editingTaskId;
    } else {
        // Ajouter une nouvelle tâche si aucune tâche n'est en cours de modification
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.id = `task-${Date.now()}`;  // Ajouter un ID unique à la tâche

        taskItem.innerHTML = `
            <span class="task-title"><strong>${title}</strong></span> |
            <span class="task-category">${category}</span> |
            <span class="task-priority">${priority}</span> |
           <span class="task-due-date">${dueDate ? dueDate : "No Due Date"}</span>
            <button class="complete-btn">✅ Terminer</button>
            <button class="edit-btn">✏️ Modifier</button>
            <button class="delete-btn">❌ Supprimer</button>
        `;

        taskList.appendChild(taskItem);
    }

    // Mettre à jour le résumé des tâches
    updateTaskSummary();

    // Clear form fields
    document.getElementById('taskForm').reset();
});

// Modifier une tâche
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const taskItem = e.target.closest('li');
        
        // Récupérer les données de la tâche
        const title = taskItem.querySelector('.task-title').textContent;
        const category = taskItem.querySelector('.task-category').textContent;
        const priority = taskItem.querySelector('.task-priority').textContent;
        const dueDate = taskItem.querySelector('.task-due-date').textContent === "No Due Date" ? "" : taskItem.querySelector('.task-due-date').textContent;

        // Remplir le formulaire avec les données de la tâche
        document.getElementById('title').value = title;
        document.getElementById('category').value = category;
        document.getElementById('priority').value = priority;
        document.getElementById('due_date').value = dueDate;

        // Ajouter un id pour indiquer qu'on modifie cette tâche
        document.getElementById('taskForm').dataset.editingTaskId = taskItem.id;
    }
});

// Supprimer une tâche
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskItem = e.target.closest('li');
        taskItem.remove();
        updateTaskSummary();
    }
});

// Marquer une tâche comme terminée
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn')) {
        const taskItem = e.target.closest('li');
        taskItem.classList.toggle('completed');
        updateTaskSummary();
    }
});// Mettre à jour le résumé des tâches
function updateTaskSummary() {
    const totalTasks = document.querySelectorAll('#task-list li').length;
    const completedTasks = document.querySelectorAll('#task-list li.completed').length;
    const uncompletedTasks = totalTasks - completedTasks;

    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    document.getElementById('uncompleted-tasks').textContent = uncompletedTasks;
}

// Liste des messages de motivation
const messages = [
    "Chaque petit pas compte, continue d’avancer ! 🌟",
    "Tu es plus proche de ton objectif que tu ne le crois ! 🚀",
    "Fais aujourd’hui quelque chose dont ton futur toi te remerciera 🏆",
    "Le succès est une collection de petits efforts répétés chaque jour 🌱",
    "Respire profondément, organise-toi, et attaque la journée avec sérénité 🍵",
];

// Fonction pour afficher un message aléatoire
function afficherMessageMotivation() {
    const messageElement = document.getElementById('motivation-message');
    const indexAleatoire = Math.floor(Math.random() * messages.length);
    messageElement.textContent = messages[indexAleatoire];
}

// Afficher un nouveau message toutes les 10 secondes
setInterval(afficherMessageMotivation, 10000);setInterval(afficherMessageMotivation, 10000);document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    // Basculer la classe 'dark-mode' sur le body
    document.body.classList.toggle('dark-mode');
    
    // Sauvegarder l'état du mode sombre dans localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Charger l'état du mode sombre depuis localStorage au démarrage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}
// Fonction pour ajouter l'emoji en fonction de la catégorie
function getCategoryWithEmoji(category) {
    const categoryEmojis = {
        "Travail et Productivité": "💼",
        "Études et Formation": "📚",
        "Maison et Organisation": "🏠",
        "Santé et Bien-être": "🧘‍♂️",
        "Sport": "🏋️",
        "Loisirs": "🎨",
        "Autres": "🌈"
    };
    return category + " " + (categoryEmojis[category] || "");
}

// Fonction pour ajouter l'emoji en fonction de la priorité
function getPriorityWithEmoji(priority) {
    const priorityEmojis = {
        "Élevée": "🔥",
        "Moyenne": "⚡️",
        "Faible": "🌱"
    };
    return priority + " " + (priorityEmojis[priority] || "");
}
function updateProgressCircle() {
    const totalTasks = document.querySelectorAll('#task-list li').length;
    const completedTasks = document.querySelectorAll('#task-list li.completed').length;

    // Calculer le pourcentage de tâches complétées
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Mettre à jour le cercle de progression
    const progressCircle = document.querySelector('.progress-circle .foreground');
    const progressText = document.querySelector('.progress-circle .progress-text');

    const circleCircumference = 440; // Correspond au stroke-dasharray défini dans le CSS
    const offset = circleCircumference - (progressPercentage / 100) * circleCircumference;

    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${Math.round(progressPercentage)}%`;

}

// Appeler updateProgressCircle dans updateTaskSummary
function updateTaskSummary() {
    const totalTasks = document.querySelectorAll('#task-list li').length;
    const completedTasks = document.querySelectorAll('#task-list li.completed').length;
    const uncompletedTasks = totalTasks - completedTasks;

    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    document.getElementById('uncompleted-tasks').textContent = uncompletedTasks;

    // Mettre à jour le cercle de progression
    updateProgressCircle();
}

if (categorySelect) {
    categorySelect.value = category || "Autres"; // Par défaut : "Autres"
}
if (prioritySelect) {
    prioritySelect.value = priority || "Moyenne"; // Par défaut : "Moyenne"
}
