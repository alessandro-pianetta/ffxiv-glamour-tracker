import React, { useState } from "react";
import styles from "./dungeon.module.css";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeDungeon } from "../../redux/root/actions";
import Gearset from "../Gearset";

export default function (props) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const dispatch = useDispatch();
	const { dungeonName, gearsets = {}, expansion, _id, loading } = props;
	const gearsetNames = Object.keys(gearsets);

	return (
		<section className={styles.container}>
			<div className={styles.dungeonHeader}>
				<div
					className={[styles.buttonContainer, loading && styles.isLoading].join(
						" "
					)}
				>
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
				<div
					className={[
						styles.buttonContainer,
						loading && styles.isLoading,
						styles.rightButton,
					].join(" ")}
				>
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
			{loading ? (
				<div className={[styles.dungeonContainer, styles.loading].join(" ")}>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			) : (
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
			)}
		</section>
	);
}
