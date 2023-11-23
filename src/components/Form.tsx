import { PlusCircle } from '@phosphor-icons/react';
import { ChangeEvent, FormEvent, FormHTMLAttributes, InvalidEvent, useState } from 'react';
import styles from './Form.module.css';

type FormProps = {
	onNewTask: (content: string) => void;
} & FormHTMLAttributes<HTMLFormElement>;

export function Form({ onNewTask }: FormProps) {
	const [newTask, setNewTask] = useState<string>('');

	function handleNewTaskChange(ee: ChangeEvent<HTMLInputElement>) {
		ee.target.setCustomValidity('');
		setNewTask(ee.target.value);
	}

	function handleNewTaskInvalid(ee: InvalidEvent<HTMLInputElement>) {
		ee.target.setCustomValidity('O tarefa não pode ser vazia');
	}

	function handleNewTask(ee: FormEvent<HTMLElement>) {
		ee.preventDefault();
		onNewTask(newTask);
		setNewTask('');
	}

	return (
		<form
			className={styles.form}
			onSubmit={handleNewTask}>
			<input
				type='text'
				placeholder='Adicione uma nova tarefa'
				value={newTask}
				onChange={handleNewTaskChange}
				onInvalid={handleNewTaskInvalid}
				required
			/>
			<button type='submit'>
				<span>Criar</span>
				<PlusCircle size={20} />
			</button>
		</form>
	);
}
