import React from "react";
import "./styles.css";

const renderContent = (close = false, text) => {
	if (close) {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="icon icon-tabler icon-tabler-x"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="#000000"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" />
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		);
	}
	return <p className="button-text">{text || "Click Here"}</p>;
};

export default function (props) {
	<button
		{...props}
		className={`button-container ${props.close && "close"} ${props.className}`}
	>
		{props.children ? props.children : renderContent(props.close, props.text)}
	</button>;
}
