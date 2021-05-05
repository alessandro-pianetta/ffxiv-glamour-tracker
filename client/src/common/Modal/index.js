import React from "react";
import "./styles.css";

export default function Modal({ modalCtrl, children }) {
	return (
		<div className={`modal-container ${modalCtrl && "show"}`}>
			<div className="modal-content-outer">
				<div className="modal-content-inner">{children}</div>
			</div>
		</div>
	);
}
