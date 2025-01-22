addLayer("s", {
    name: "subscribers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "subscribers", // Name of prestige currency
    baseResource: "fysc players", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    calculateExponent() exponent = new Decimal (0.5),
    if (hasUpgrade) // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade(this.layer, 11)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: Reset for subs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return true},
    upgrades: {
        11: {
            title: "Get a bad stream hoster",
            description: "It can't run a chrome tab, but it can run OBS. x2 subs and x2.5 FP.",
            cost: new Decimal(2),
        },
        12: {
            title: "Create a forum in the FYSC Discord",
            description: "Boost Fysc Players based on subs. (x^0.45)",
            cost: new Decimal(10),
            unlocked() { return (hasUpgrade(this.layer, 11))},
            effect() {
                let ret = player[this.layer].points.add(1).pow(0.45)
                if (ret.gte("1000000")) ret = ret.pow(0.5).times("1000")
                    return ret;
            },
            effectDisplay() {return format (this.effect())+"x"}
        },
        13: {
            title: "Just Self-Synergy",
            description: "Boost FP based on FP. (x^0.25)",
            cost: new Decimal (100),
            unlocked() {return (hasUpgrade(this.layer, 12))},
            effect() {
                let ret = player.points.add(1).pow(0.25)
                if (ret.gte("1e30")) ret = ret.pow(1/3).times("1e20")
                return ret
            }
        },
        21: {
            title: "Master the power of Lcedit",
            description: "Nice features, also you added fires! Raise Subscribers Mult to the 1.1 (Only after the first column effects) :)",
            cost: new Decimal (420),
            unlock () {return (hasUpgrade(this.layer, 13))}
        }
    },
},
)