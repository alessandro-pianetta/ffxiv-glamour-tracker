import React, { useState } from "react";
import styles from "./dungeon.module.css";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeDungeon } from "../../redux/dungeon/actions";
import Gearset from "../Gearset";

export default function (props) {
	const dispatch = useDispatch();
	const [isCollapsed, setIsCollapsed] = useState(true);
	const { dungeonName, gearsets = {}, expansion, _id, loading } = props;
	const gearsetNames = Object.keys(gearsets);

	if (loading) {
		return (
			<div className={[styles.container, styles.loading].join(" ")}>
				<Spinner animation="border" role="status" />
				<p className={styles.loadingText}>Loading...</p>
			</div>
		);
	}

	return (
		<section className={styles.container}>
			<div className={styles.dungeonHeader}>
				<div className={styles.buttonContainer}>
					<Button
						variant="outline-secondary"
						size="sm"
						onClick={() => {
							setIsCollapsed(!isCollapsed);
						}}
					>
						{isCollapsed ? "Maximize" : "Minimize"}
					</Button>
				</div>
				<h2
					className={[
						styles.dungeonHeaderText,
						isCollapsed && styles.isCollapsed,
					].join(" ")}
				>
					{dungeonName}
				</h2>
				<div className={[styles.buttonContainer, styles.rightButton].join(" ")}>
					<Button
						variant="outline-danger"
						size="sm"
						onClick={() => {
							let answer = window.confirm(
								`Would you like to delete data for ${dungeonName}?`
							);
							if (answer) dispatch(removeDungeon(_id));
						}}
					>
						Delete
					</Button>
				</div>
			</div>
			<div
				className={[
					styles.dungeonContainer,
					isCollapsed && styles.isCollapsed,
				].join(" ")}
			>
				{gearsetNames.map((setName) => {
					if (setName !== "_id" && gearsets[setName].length) {
						return (
							<Gearset
								key={`${dungeonName}_${setName}`}
								setName={setName}
								dungeonName={dungeonName}
								expansion={expansion}
								gearsets={gearsets[setName]}
								dungeonID={_id}
							/>
						);
					} else {
						return null;
					}
				})}
			</div>
		</section>
	);
}
