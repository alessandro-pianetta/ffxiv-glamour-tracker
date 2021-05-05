// Checks to see if target dungeon is already in user's array, returns a boolean
const dungeonAlreadyExists = (dungeons, targetDungeon) => {
	return !!dungeons.find((dungeon) => dungeon.dungeonName === targetDungeon);
};

export { dungeonAlreadyExists };
