import todoLogo from '../assets/svgs/Logo.svg';
import styles from './Header.module.css';

export function Header() {
	return (
		<header className={styles.header}>
			<img
				src={todoLogo}
				alt='to-do list logotipo'
			/>
		</header>
	);
}
