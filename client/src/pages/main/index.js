/* Libraries */
import React from "react";
import { useSelector } from "react-redux";
/* Styles */
import styles from "./mainPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
/* Components */
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import Dungeon from "../../components/Dungeon";
import Footer from "../../components/Footer";

export default function () {
	const [{ dungeons }, messages] = useSelector((store) => [
		store.dungeon,
		store.notification,
	]);

	return (
		<>
			<Header />
			<Notification {...messages} />
			<main className={styles.dungeonContainer}>
				{dungeons.map((dungeon) => {
					return (
						<Dungeon key={`dungeon_${dungeon.dungeonName}`} {...dungeon} />
					);
				})}
			</main>
			<Footer />
		</>
	);
}
