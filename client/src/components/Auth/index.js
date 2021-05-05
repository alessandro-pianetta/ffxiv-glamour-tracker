import React, { useState, useEffect } from "react";
import styles from "./auth.module.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/root/actions";
import {
	registerOrAuthenticateUser,
	logUserOut,
} from "../../redux/auth/actions";
import { getCookie } from "../../utils/cookieUtils";

export default function Auth() {
	const dispatch = useDispatch();
	const userID = getCookie("userID");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [path, setPath] = useState("login");
	const [modalIsOpen, setModal] = useState(false);

	useEffect(() => {
		const loadUser = () => {
			let mounted = true;
			if (userID && mounted) {
				dispatch(getUser());
			}
			mounted = false;
		};
		loadUser();
	}, [dispatch, userID]);

	if (userID) {
		return (
			<div className={styles.container}>
				<Button variant="danger" onClick={() => dispatch(logUserOut())}>
					Logout
				</Button>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Button variant="success" onClick={() => setModal(true)}>
				Login
			</Button>
			<Modal centered show={modalIsOpen} onHide={() => setModal(false)}>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						dispatch(
							registerOrAuthenticateUser(path, {
								email,
								password,
								passwordConfirm,
							})
						);
						setEmail("");
						setPassword("");
						setPasswordConfirm("");
						setPath("login");
					}}
				>
					<Modal.Header closeButton>
						<Modal.Title>{path === "login" ? "Log In" : "Sign Up"}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={({ target: { value } }) => setEmail(value)}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={({ target: { value } }) => setPassword(value)}
							/>
						</Form.Group>
						{path === "signup" ? (
							<Form.Group controlId="formConfirmPassword">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									onChange={({ target: { value } }) =>
										setPasswordConfirm(value)
									}
								/>
							</Form.Group>
						) : null}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="outline-secondary"
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								setPath(path === "login" ? "signup" : "login");
							}}
						>
							Switch to {path === "login" ? "Sign Up" : "Log In"}
						</Button>

						<Button variant="primary" type="submit">
							{path === "login" ? "Log In" : "Sign Up"}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
}
