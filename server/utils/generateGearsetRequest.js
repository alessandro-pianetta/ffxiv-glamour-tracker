function generateGearsetRequest({ gearsetName, itemLevel }) {
	const request = {
		indexes: "item",
		columns:
			"ID,Name_en,Icon,EquipSlotCategoryTargetID,ClassJobCategoryTargetID",
		body: {
			query: {
				bool: {
					must: [],
					must_not: {
						match: {
							EquipSlotCategoryTargetID: "6",
						},
					},
					filter: [
						{
							range: {
								ClassJobCategoryTargetID: {
									gte: "30",
								},
							},
						},
						{
							range: {
								EquipSlotCategoryTargetID: {
									gte: "3",
									lte: "8",
								},
							},
						},
						{
							range: {
								LevelItem: {
									gte: `${itemLevel}`,
									lte: `${itemLevel}`,
								},
							},
						},
					],
				},
			},
			from: 0,
			size: 200,
			sort: [
				{
					ID: "asc",
				},
			],
		},
	};

	if (typeof gearsetName === "string") {
		request.body.query.bool.must.push({
			wildcard: {
				NameCombined_en: `*${gearsetName}*`,
			},
		});
	}

	return JSON.stringify(request);
}

module.exports = generateGearsetRequest;
