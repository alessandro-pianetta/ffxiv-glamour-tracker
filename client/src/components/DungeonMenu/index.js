import React, { useState } from "react";
import styles from "./dungeonMenu.module.css";
import { useDispatch } from "react-redux";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { addDungeon } from "../../redux/dungeon/actions";
import dungeons from "../../consts/dungeons";
import raids from "../../consts/raids";

export default function () {
	const dispatch = useDispatch();
	const [modalIsOpen, setModal] = useState(false);

	const dungeonNames = Object.keys(dungeons);
	const raidNames = Object.keys(raids);
	const instancesByExpansion = {
		"A Realm Reborn": [],
		Heavensward: [],
		Stormblood: [],
		Shadowbringers: [],
	};
	const expansionNames = Object.keys(instancesByExpansion);

	dungeonNames.forEach((dungeon) => {
		const { itemLevel } = dungeons[dungeon];
		if (itemLevel > 375) {
			instancesByExpansion.Shadowbringers.push(dungeon);
		} else if (itemLevel > 245) {
			instancesByExpansion.Stormblood.push(dungeon);
		} else if (itemLevel > 100) {
			instancesByExpansion.Heavensward.push(dungeon);
		} else {
			instancesByExpansion["A Realm Reborn"].push(dungeon);
		}
	});

	raidNames.forEach((raid) => {
		const { itemLevel } = raids[raid];
		if (itemLevel > 400) {
			instancesByExpansion.Shadowbringers.push(raid);
		} else if (itemLevel > 270) {
			instancesByExpansion.Stormblood.push(raid);
		} else if (itemLevel > 130) {
			instancesByExpansion.Heavensward.push(raid);
		} else {
			instancesByExpansion["A Realm Reborn"].push(raid);
		}
	});

	return (
		<div className={styles.container}>
			<Button variant="info" onClick={() => setModal(!modalIsOpen)}>
				Menu
			</Button>
			<Modal
				show={modalIsOpen}
				dialogClassName={styles.modal90w}
				onHide={() => setModal(!modalIsOpen)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Dungeon & Raid Menu</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Container>
						<Row>
							{expansionNames.map((expansion) => (
								<Col sm={12} md={6} xl={3} key={expansion}>
									<div className={styles.dungeonContainer}>
										<h2 className={styles.dungeonName}>{expansion}</h2>
										{instancesByExpansion[expansion].map((instanceName) => (
											<h3
												className={styles.dungeonItem}
												key={instanceName}
												onClick={() => {
													dispatch(
														addDungeon(
															instanceName,
															dungeons[instanceName] || raids[instanceName],
															expansion
														)
													);
													setModal(!modalIsOpen);
												}}
											>
												{instanceName}
											</h3>
										))}
									</div>
								</Col>
							))}
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</div>
	);
}
