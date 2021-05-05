/* Libraries */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
/* Styles */
import styles from "./mainPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
/* Components */
import { Toast } from "react-bootstrap";
import Header from "../../components/Header";
import Dungeon from "../../components/Dungeon";
import Footer from "../../components/Footer";

export default function () {
	const [showToast, setShowToast] = useState(false);
	const { dungeons, message, error } = useSelector(({ root }) => root);

	function checkForExistingDungeon(dungeonName) {
		return dungeons.find();
	}

	// useEffect(() => {
	// 	effect;
	// 	return () => {
	// 		cleanup;
	// 	};
	// }, [input]);

	return (
		<>
			<Header />
			<Toast
				style={{
					position: "fixed",
					minWidth: "25%",
					top: 25,
					right: 25,
				}}
				onClose={() => {
					setShowToast(false);
				}}
				show={showToast}
				delay={3000}
				autohide
			>
				<Toast.Header>
					<strong className="mr-auto">Success!</strong>
				</Toast.Header>
				<Toast.Body>{message || error} </Toast.Body>
			</Toast>

			<main className={styles.dungeonContainer}>
				{dungeons.map((dungeon, index) => {
					return (
						<Dungeon key={`dungeon_${dungeon.dungeonName}`} {...dungeon} />
					);
				})}
			</main>
			<Footer />
		</>
	);
}
