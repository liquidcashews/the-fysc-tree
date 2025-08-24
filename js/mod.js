let modInfo = {
	name: "The FYSC Tree",
	author: "liquidation cashewdations",
	pointsName: "fysc players",
	modFiles: ["layers.js", "tree.js"],

	discordName: "FYSC Discord",
	discordLink: "https://discord.gg/gNtmshDX9z",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.123",
	name: "almost there",
}

let changelog = `<h1>Changelog:</h1><br>,
	<h3>v0.01</h3><br>
	- Added a upgrades, one without an effect yet though.`
let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("subs", 11)) gain = gain.times(2.5)
	if (hasUpgrade("subs", 12)) gain = gain.times(upgradeEffect("subs", 12))
	if (hasUpgrade("subs", 13)) gain = gain.times(upgradeEffect("subs", 13))
    if (hasUpgrade("hexzd", 11)) gain = gain.times(3)
	if (hasUpgrade("hexzd", 12)) gain = gain.times(upgradeEffect("hexzd", 12))
	if (hasUpgrade("subs", 22)) gain = gain.pow(1.05)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("3.22e5209"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}