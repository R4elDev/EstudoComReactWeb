import { useEffect, useState } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    async function fetchTask() {
      // CHAMAR A API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      // PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json();
      // ARMAZENAR ESSES DADOS NO STATE
      setTasks(data);
    }

    // fetchTask();
  }, []);

  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      // Preciso atualizar essa tarefa
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // Não preciso atualizar essa tarefa
      return task;
    });

    setTasks(newTask);
  }

  function onDeletedTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title> GERENCIADOR DE TAREFAS </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Task
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeletedTaskClick={onDeletedTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
