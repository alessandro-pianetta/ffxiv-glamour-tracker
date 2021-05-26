import React from "react";
import { useDispatch } from "react-redux";
import { Alert, Toast } from "react-bootstrap";
import styles from "./notification.module.css";
import { removeNotification } from "../../redux/notification/actions";

const toastBodyStyle = {
	padding: 0,
	margin: 0,
};

const alertStyle = {
	marginBottom: 0,
	borderTopLeftRadius: 0,
	borderTopRightRadius: 0,
};

export default function Notification({ alerts }) {
	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			{alerts.map((alert) => {
				if (typeof alert.message !== "string") return null;

				return (
					<Toast
						onClose={() => {
							dispatch(removeNotification(alert.id));
						}}
						show={true}
						delay={5000}
						animation
						autohide
						key={alert.id}
						bsPrefix={`toast ${styles.toast}`}
					>
						<Toast.Header>
							<strong className="mr-auto">
								{alert.type === "success" ? "Success" : "Error"}!
							</strong>
						</Toast.Header>
						<Toast.Body bsPrefix={`toast-body ${styles.toastBody}`}>
							<Alert
								bsPrefix={`alert alert-${alert.type} ${styles.alert}`}
								variant={alert.type}
							>
								<p>{alert.message}</p>
							</Alert>
						</Toast.Body>
					</Toast>
				);
			})}
		</div>
	);
}
