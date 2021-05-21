import React from "react";
import styles from "./item.module.css";
import { useDispatch } from "react-redux";
import { changeItemStatus } from "../../redux/dungeon/actions";

// ClassJobCategoryTargetID: 63
// EquipSlotCategoryTargetID: 7
// ID: 18634
// Icon: "/i/049000/049702.png"
// Name_en: "Yanxian Hakama of Casting"
// status: 0

export default function Item({ item, dungeonID, dungeonName, setName }) {
	const dispatch = useDispatch();
	const { Icon, Name_en, status } = item;

	if (!Icon) {
		return null;
	}

	return (
		<div
			className={`${styles.container} ${!status ? styles.default : ""} ${
				status === 1 ? styles.want : ""
			} ${status === 2 ? styles.have : ""}`}
			onClick={() =>
				dispatch(changeItemStatus(item, dungeonName, setName, dungeonID))
			}
		>
			<img
				className={styles.icon}
				src={`https://xivapi.com/${Icon}`}
				height={"50px"}
				width={"50px"}
				alt={Name_en}
			/>
		</div>
	);
}
