import { List } from '@phosphor-icons/react';
import { useState } from 'react';
import styles from './App.module.css';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { Task, TaskProps } from './components/Task';

export function App() {
	const [taksList, setTaskList] = useState<TaskProps[]>([]);
	const [createdTasks, setCreatedTasks] = useState<number>(taksList.length);
	const [completedTasks, setCompletedTasks] = useState<number>(0);

	function handleNewTask(content: string) {
		setTaskList((prev) => [
			...prev,
			{
				taskId: taksList.length + 1,
				content,
			},
		]);
		setCreatedTasks((prev) => prev + 1);
	}

	function handleDeleteTask(id: number) {
		setTaskList((prev) => {
			const newListWithoutDeleteTask = prev.filter((task) => task.taskId !== id);
			return newListWithoutDeleteTask;
		});
		setCreatedTasks((prev) => prev - 1);
	}

	function handleCompleteTask(updatedTask: TaskProps) {
		updatedTask.isCompleted === true
			? setCompletedTasks((prev) => prev + 1)
			: setCompletedTasks((prev) => prev - 1);

		setTaskList((prev) => {
			const updatedTaskList = prev.map((task) => {
				if (task.content === updatedTask.content) {
					return {
						taskId: task.taskId,
						content: task.content,
						isCompleted: updatedTask.isCompleted,
					};
				}
				return task;
			});
			return updatedTaskList;
		});
	}

	return (
		<>
			<Header />
			<main className={styles.wrapper}>
				<Form onNewTask={handleNewTask} />

				<main>
					<div className={styles.tasksHeader}>
						<strong>
							Tarefas criadas<span>{createdTasks > 0 ? createdTasks : 0}</span>
						</strong>
						<strong>
							Concluídas
							<span>{createdTasks > 0 ? `${completedTasks} de ${createdTasks}` : 0}</span>
						</strong>
					</div>

					<div className={styles.tasksContainer}>
						{taksList.length === 0 && (
							<div className={styles.emptyTasksContainer}>
								<List size={56} />
								<strong>Você ainda não tem tarefas cadastradas</strong>
								<p>Crie tarefas e organize seus itens a fazer</p>
							</div>
						)}

						{taksList.map((task) => (
							<Task
								key={task.taskId}
								taskId={task.taskId}
								content={task.content}
								onDeleteTask={handleDeleteTask}
								onCompleteTask={handleCompleteTask}
							/>
						))}
					</div>
				</main>
			</main>
		</>
	);
}
