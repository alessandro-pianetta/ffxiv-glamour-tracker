import React, { useState, useEffect } from "react";
import styles from "./auth.module.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/auth/actions";
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
	const [loginModalIsOpen, setLoginModal] = useState(false);
	const [logoutModalIsOpen, setLogoutModal] = useState(false);

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
				<Button variant="danger" onClick={() => setLogoutModal(true)}>
					Logout
				</Button>
				<Modal
					show={logoutModalIsOpen}
					onHide={() => setLogoutModal(false)}
					backdrop="static"
					centered
				>
					<Modal.Header>
						<Modal.Title>Logout?</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Do you really want to logout?</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={() => setLogoutModal(false)}>
							Go Back
						</Button>
						<Button variant="danger" onClick={() => dispatch(logUserOut())}>
							Log Out
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Button variant="success" onClick={() => setLoginModal(true)}>
				Login
			</Button>
			<Modal
				centered
				show={loginModalIsOpen}
				onHide={() => setLoginModal(false)}
			>
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
