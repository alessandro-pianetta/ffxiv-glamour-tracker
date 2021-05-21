import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert, Toast } from "react-bootstrap";
import styles from "./notification.module.css";
import { removeNotification } from "../../redux/notification/actions";

const toastStyle = {
	position: "fixed",
	minWidth: "25%",
	top: 25,
	right: 25,
};

const toastBodyStyle = {
	padding: 0,
	margin: 0,
};

const alertStyle = {
	marginBottom: 0,
	borderTopLeftRadius: 0,
	borderTopRightRadius: 0,
};

export default function Notification({ successMsg, errorMsg }) {
	const dispatch = useDispatch();
	const [headerText, setHeaderText] = useState("");
	const [notificationType, setNotificationType] = useState("");
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (showNotification) setShowNotification(false);

		if (successMsg) {
			setHeaderText("Success!");
			setNotificationType("success");
		}

		if (errorMsg) {
			setHeaderText("Error!");
			setNotificationType("danger");
		}

		if (successMsg || errorMsg) setShowNotification(true);
	}, [successMsg, errorMsg]);

	return (
		<>
			<Toast
				style={toastStyle}
				onClose={() => {
					setShowNotification(false);
					dispatch(removeNotification());
				}}
				show={showNotification}
				delay={5000}
				autohide
			>
				<Toast.Header>
					<strong className="mr-auto">{headerText}</strong>
				</Toast.Header>
				<Toast.Body style={toastBodyStyle}>
					<Alert style={alertStyle} variant={notificationType}>
						<p>{errorMsg || successMsg}</p>
					</Alert>
				</Toast.Body>
			</Toast>
		</>
	);
}
