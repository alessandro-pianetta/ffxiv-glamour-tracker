import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./header.module.css";
import Auth from "../Auth";
import DungeonMenu from "../DungeonMenu";

export default function () {
	const user = useSelector(({ auth }) => auth);

	return (
		<header>
			<Container fluid>
				<Row>
					<Col xs={2}>
						<DungeonMenu />
					</Col>
					<Col xs={8}>
						<h1 className={styles.headerText}>Glamour Tracker</h1>
					</Col>
					<Col xs={2}>
						<Auth user={user} />
					</Col>
				</Row>
			</Container>
		</header>
	);
}
