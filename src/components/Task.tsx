import { Trash } from '@phosphor-icons/react';
import { MouseEvent, useState } from 'react';
import styles from './Task.module.css';

export type TaskProps = {
	taskId: number;
	content: string;
	isCompleted?: boolean;
	onDeleteTask?: (id: number) => void;
	onCompleteTask?: (task: TaskProps) => void;
};

export function Task({
	taskId,
	content,
	onDeleteTask,
	onCompleteTask,
	isCompleted = false,
}: TaskProps) {
	const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(isCompleted);

	function handleDeleteTask(ee: MouseEvent<HTMLElement>) {
		onDeleteTask!(+ee.currentTarget?.id);
	}

	function handleCompleteTask() {
		const newTaskCompleted = isTaskCompleted === false ? true : false;
		onCompleteTask!({
			taskId,
			content,
			isCompleted: newTaskCompleted,
		});
		setIsTaskCompleted(newTaskCompleted);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputBox}>
				<div className={styles.checkboxWrapper}>
					<input
						type='checkbox'
						name={String(taskId)}
						id={String(taskId)}
						checked={isTaskCompleted}
						onChange={handleCompleteTask}
					/>
					<label
						htmlFor={String(taskId)}
						className={isTaskCompleted === true ? 'taskCompleted' : ''}>
						{content}
					</label>
				</div>

				<button
					id={String(taskId)}
					onClick={handleDeleteTask}>
					<Trash size={24} />
				</button>
			</div>
		</div>
	);
}
