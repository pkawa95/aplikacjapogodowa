const colors = require('colors');
const parseArgs = require('minimist');
const fs = require('fs');

const start = parseArgs(process.argv.slice(2, 3));
delete start._;
console.log("Przetworzone argumenty wejściowe:".cyan, start);

const handleStart = ({ add, remove, list }) => {
    if (add) {
        if (typeof add !== "string") {
            return console.log("Wpisz nazwę zadania jako tekst.".red);
        }
        handleTasks('add', add);
    } else if (remove) {
        handleTasks("remove", remove);
    } else if (list || list === "" || list === null) {
        handleTasks('list');
    } else {
        console.log("Nie rozumiem komendy.".red);
    }
};

const handleTasks = (option, title) => {
    if (!fs.existsSync("tasks.json")) {
        fs.writeFileSync("tasks.json", "[]", "utf-8");
        console.log("Utworzono nowy plik tasks.json".yellow);
    }

    let tasks = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));

    switch (option) {
        case "list":
            if (tasks.length > 0) {
                console.log(`Masz ${tasks.length} zadanie(a):`.white.bgBlue);
                tasks.forEach((task) => {
                    console.log(`  [${task.id}] ${task.title}`.green);
                });
            } else {
                console.log("Nie masz żadnych zadań do zrobienia.".black.bgYellow);
            }
            break;

        case "add":
            const exists = tasks.some(task => task.title === title);
            if (exists) {
                console.log(`Zadanie "${title}" już istnieje — nie można dodać dwa razy.`.red);
            } else {
                tasks.push({ title });
                tasks = tasks.map((task, index) => ({ id: index + 1, title: task.title }));
                fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
                const newTask = tasks.find(task => task.title === title);
                console.log(`Dodano zadanie [${newTask.id}] ${newTask.title}`.green.bold);
            }
            break;

        case "remove":
            const indexToRemove = tasks.findIndex(t => t.title === title);
            if (indexToRemove === -1) {
                console.log(`Nie znaleziono zadania "${title}" — nie można usunąć.`.yellow);
            } else {
                const removedTask = tasks[indexToRemove];
                tasks.splice(indexToRemove, 1); 
                tasks = tasks.map((task, index) => ({ id: index + 1, title: task.title }));
                fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
                console.log(`Usunięto zadanie [${removedTask.id}] ${removedTask.title}`.yellow);
                console.log(`Pozostało ${tasks.length} zadań.`.cyan);
            }
            break;

        default:
            console.log("Nieznana operacja.".red);
    }
};

handleStart(start);
