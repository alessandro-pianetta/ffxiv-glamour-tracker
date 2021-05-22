import React, { useState } from "react";
import styles from "./dungeon.module.css";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeDungeon } from "../../redux/dungeon/actions";
import Gearset from "../Gearset";

export default function (props) {
	const dispatch = useDispatch();
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [showModal, setShowModal] = useState(false);

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
							setShowModal(true);
						}}
					>
						Remove
					</Button>
					<Modal
						show={showModal}
						onHide={() => setShowModal(false)}
						backdrop="static"
						centered
					>
						<Modal.Header>
							<Modal.Title>Remove dungeon?</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<p>
								Do you really want to remove {dungeonName} from your list? All
								marked items will be lost.
							</p>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={() => setShowModal(false)}>
								Go Back
							</Button>
							<Button
								variant="danger"
								onClick={() => dispatch(removeDungeon(_id))}
							>
								Remove Dungeon
							</Button>
						</Modal.Footer>
					</Modal>
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
