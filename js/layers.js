addlayer("s", {
    name: "subscribers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal (0),
        total: new Decimal (0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "subscribers", // Name of prestige currency
    baseResource: "fysc players", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainExp() {
        let ret = new Decimal (0.5)
        if (hasUpgrade(this.layer, 21)) ret = ret.times(1.2)
        return ret
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade(this.layer, 11)) mult = mult.times(2)
        if (hasUpgrade(this.layer, 21)) mult = mult.times(upgradeEffect(this.layer, 21))
        if (hasUpgrade(this.layer, 22)) mult = mult.times(upgradeEffect(this.layer, 22))
        return mult
    },
    hotkeys: [
        {key: "s", description: "s: Reset for subs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    softcap: new Decimal (1e150),
    softcapPower: new Decimal (0.45),
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
            unlocked() {return (hasUpgrade(this.layer, 11))},
            effect() {
                let ret = player["s"].points.add(1).pow(0.45)
                if (ret.gte("1000000")) ret = ret.sqrt().times("1000")
                    return ret;
            },
            effectDisplay() {return format (this.effect())+"x"}
        },
        13: {
            title: "Just Self-Synergy",
            description: "Boost FP based on FP. (x^0.35)",
            cost: new Decimal (100),
            unlocked() {return (hasUpgrade(this.layer, 12))},
            effect() {
                let ret = player.points.add(1).pow(0.35)
                if (ret.gte("1e30")) ret = ret.pow(0.2).times("1e24")
                return ret
        },
            effectDisplay () {return format (this.effect())+"x"}
        },
        21: {
            title: "Master the power of Lcedit",
            description: "Nice features, also you added fires! Raise Subscribers to the 1.2, :O",
            cost: new Decimal (250),
            unlocked () {return (hasUpgrade(this.layer, 13))}},
        22: {
            title: "Start coding CodeMark TradeName"
        }
        }
    })