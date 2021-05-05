import React from "react";
import styles from "./gearset.module.css";
import Item from "../Item";
import Images from "../../images";

// dungeonID: null
// dungeonName: "The Vault"
// expansion: "Heavensward"
// gearsets: Array(5) [{ ClassJobCategoryTargetID: 59
// ​​​
// 			EquipSlotCategoryTargetID: 3
// ​​​
// 			ID: 11266
// ​​​
// 			Icon: "/i/040000/040203.png"
// ​​​
// 			Name_en: "Halonic Inquisitor's Helm" }]
// ​
// key:
// ​
// setName: "fending"

function generateCategoryName(setName) {
	return setName
		.split(" ")
		.map((str, i) => {
			if (!(i % 2)) {
				return str.charAt(0).toUpperCase() + str.slice(1);
			} else {
				return str;
			}
		})
		.join(" ");
}

export default function Gearset(props) {
	const gearsetCategoryName = generateCategoryName(props.setName);
	return (
		<div className={styles.container} style={{ width: `${props.width}%` }}>
			<div className={styles.gearsetHeader}>
				{Images[props.setName] ? (
					<img
						height={"1.5rem"}
						width={"1.5rem"}
						className={styles.icon}
						alt={`Icon for the ${props.setName} gearset`}
						src={Images[props.setName]}
					/>
				) : null}
				<h3 className={styles.gearsetCategoryName}>{gearsetCategoryName}</h3>
			</div>
			<div
				className={[
					styles["item-container"],
					props.gearsets?.length > 5 && styles.largeGearset,
				].join(" ")}
			>
				{props.gearsets > 5
					? renderNormalItems(props)
					: renderSpecialItems(props)}
			</div>
		</div>
	);
}

function renderItem(item, props) {
	const { dungeonID, dungeonName, setName } = props;
	return (
		<Item
			key={`${props.dungeonName}_${item.Name_en}`}
			item={item}
			dungeonID={dungeonID}
			dungeonName={dungeonName}
			setName={setName}
		/>
	);
}

function renderNormalItems(props) {
	return props.gearsets.map((item) => renderItem(item, props));
}

function renderSpecialItems(props) {
	const items = [];
	let prevEquipSlotCategoryID = null;
	props.gearsets.forEach((item) => {
		if (item.EquipSlotCategoryTargetID !== prevEquipSlotCategoryID) {
			items.push([item]);
			prevEquipSlotCategoryID = item.EquipSlotCategoryTargetID;
		} else {
			items[items.length - 1].push(item);
		}
	});

	return items.map((itemCategory) =>
		itemCategory.map((item) => renderItem(item, props))
	);
}
