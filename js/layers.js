addLayer("subs", {
    name: "subscribers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal (0),
        total: new Decimal (0),
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "subscribers", // Name of prestige currency
    baseResource: "fysc players", // Name of resource prestige is based on
    exponent: 0.5,
    position: 0,
    baseAmount() {return player.points; }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("subs", 11)) mult = mult.times(2)
        if (hasUpgrade("subs", 22)) mult = mult.times(upgradeEffect(this.layer, 22))
        if (hasUpgrade("hexzd", 12)) mult = mult.times(upgradeEffect("hexzd", 12))
        if (hasUpgrade("hexzd", 14)) mult = mult.times(upgradeEffect("hexzd", 14))
        return mult
    },
    gainExp()
    {
        exponent = new Decimal (1)
        if (hasUpgrade("subs", 21)) exponent = exponent.times(1.15)
        return exponent
    },
    hotkeys: [
        {key: "s", description: "s: Reset for subs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        let brainrot = new Decimal(0);
        if (hasUpgrade("hexzd", 13)) brainrot = new Decimal(0.25)
        return brainrot;
    },
    infoboxes:{
            m: {
                title: "Context",
                titleStyle: {'color': '#000000'},
                body: "Welcome to The FYSC Tree! In case you don't know what that means, FYSC is a YouTube interactive live stream that you can post fake videos for fake subs, originally made by Straight from MG. The goal of this game is to make the best FYSC. Good luck!",
            }
        },
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
            unlocked() {return (hasUpgrade("subs", 11))},
            effect() {
                let ret = player.subs.points.add(1).pow(0.45)
                if (ret.gte(1000000)) ret = ret.sqrt().times(new Decimal (1e6).pow(0.45))
                    return ret;
            },
            effectDisplay() {
            let softcap1 = player.subs.points.gte(1e6)
            let base = format (this.effect())+"x"
            return base
        }, },
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
            description: "Nice features, also you added fires! Raise Subscribers to the 1.15, :O",
            cost: new Decimal (250),
            effect()
            {return new Decimal (1.15)
            },
            unlocked() {return (hasUpgrade("subs", 13))},
            effectDisplay () {return "^1.15"},
    },
        22: {
            title: "Start coding CodeMark TradeName",
         cost: new Decimal (1000),
            description: "Just a small boost, boost Subs based on Subs. Not inflated yet I swear",
            unlocked() {return (hasUpgrade("subs", 21))},
            effect() {
                let ret = player.subs.points.add(1).log10().pow(1.35)
                if (hasUpgrade("hexzd", 21)) ret = ret.pow(1.5)
                return ret
            },
             effectDisplay () {return format (this.effect())+"x"},
        },
        23: {
            title: "Lcedit improvements",
            cost: new Decimal (10000),
            description: "Now you have a cool header on top, and you found out how to host the website code! Boost FYSC players by ^1.05.",
            effect() {return new Decimal (1.05)
                
            },
            unlocked() {return (hasUpgrade("subs", 22))},
            effectDisplay() {return "^"+format(this.effect())},
        },
    }
    }, )
addLayer("hexzd", {
    name: "hexzd points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H",
    row: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() {hasUpgrade("subs", 23)},
		points: new Decimal(0),
    }},
    color: "#011F98",
    requires: new Decimal(500000), // Can be a function that takes requirement increases into account
    resource: "hexzd points", // Name of prestige currency
    baseResource: "subscribers", // Name of resource prestige is based on
    exponent: 0.3,
    layerShown() {return hasUpgrade("subs", 23) || player.hexzd.total.gte(1)},
    branches: ["subs"],
    position: 0,
    infoboxes:{
            m: {
                title: "Context",
                titleStyle: {'color': '#FFFFFF'},
                body: "HEXZD is the first FYSC provider in this row. They're very known for inflating the sub count (Example: First place in Season 1 has 200B+ subs). This layer inflates the game by a noticable amount.",
            }
        },
    baseAmount() {return player.subs.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let yum = new Decimal (1)
        if (hasUpgrade("hexzd", 15)) yum = yum.times(upgradeEffect("hexzd", 15))
        if (hasUpgrade("hexzd", 24)) yum = yum.times(upgradeEffect(this.layer, 24))
        return yum
    },
    gainExp()
    {
        return new Decimal (1)
    },
    hotkeys: [
        {key: "h", description: "h: Reset for hexzd points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    softcap: new Decimal (1e200),
    softcapPower: new Decimal (0.45),
    upgrades: {
    11: {
          title: "Make your layout custom made",
          cost: new Decimal (1),
          description: "Bro Copilot shut the he- I mean boost fysc players by x3 because your layout looks better.",
          unlocked: true,
          effect() {return new Decimal(3)},
          effectDisplay() {return "3x"},
        },
    12: {
        title: "Hexzd Inflation",
        cost: new Decimal (1),
        description: "Your FYSC is now inflated! Boost Subscribers and FP based on HEXZD points. (base 1.5x)",
        unlocked() {return (hasUpgrade("hexzd", 11))},
        effect() {let lol = player[this.layer].points.pow(0.2).add(1.5)
            if (hasUpgrade("hexzd", 22)) lol = lol.times(upgradeEffect(this.layer, 22))
                return lol
        },
        effectDisplay() {return format(this.effect()) + "x"}
        },
    13: {
          title: "24/7 Streaming",
          cost: new Decimal (3),
          description: "You can now stream 24/7, which is making you passively gain 25% of your Subscribers every second.",
          unlocked() {return (hasUpgrade("hexzd", 12))},
        },
    14: {
          title: "Watch Time Grinding",
          cost: new Decimal (5),
          description: "You are gaining more watch time, so your Subscribers are boosted based on time on reset.",
          unlocked() {return (hasUpgrade("hexzd", 13))},
          effect() {
                let chessbattleadvanced = new Decimal(player.hexzd.resetTime)
                return chessbattleadvanced.pow(0.275).add(1)
            },
          effectDisplay() {return format(this.effect()) + "x"},
            },
    15: {
        title: "Inflating Inflation",
        cost: new Decimal (15),
        description: "Your Hexzd Inflation is so MASSIVE that HP boosts itself. (base 1.25x)",
        unlocked() {return (hasUpgrade("hexzd", 14))},
        effect() {
        return player[this.layer].points.pow(0.225).add(1.25)},
        effectDisplay() {return format(this.effect()) + "x"},
        },
    21: {
        title: "Upgrade inflation?",
        cost: new Decimal (50),
        description: "Inflation is so bad it goes to other upgrades. Raise Subscriber Upgrade 22 to the 1.5.",
        unlocked() {return (hasUpgrade("hexzd", 15))},
        effect() {return new Decimal (1.5)},
        effectDisplay() {return "^1.5"},
        },
        22: {
        title: "Inflation Inflation???",
        cost: new Decimal (200),
        description: "What is even happening? HP Upgrade 12 is now boosted based on Subscribers.",
        unlocked() {return (hasUpgrade("hexzd", 21))},
        effect() {let ret = player.subs.points.pow(0.065).add(1)
            ret = ret.pow(buyableEffect("hexzd", 11))
            return ret
        },
        effectDisplay() {return format(this.effect()) + "x"}, },
        23: {
        title: "Buyable Inflation????",
        cost: new Decimal (500),
        description: "Unlock a buyable.",
        unlocked() {return (hasUpgrade("hexzd", 22))},
        effectDisplay: "finding new ways to put inflation",
    },
    24: {
        title: "Ew, genericness",
        cost: new Decimal (2000),
        description: "Multiply HEXZD Points by Subscribers (thankfully logarithimically)",
        effect() {return player.subs.points.add(1).log10().pow(1.15)},
        unlocked() {return (hasUpgrade("hexzd", 23))},
        effectDisplay() {return format(this.effect()) + "x"},
    },
    25: {
        title: "The Worst Thing of All",
        cost: new Decimal (50000),
        description: "x3 FP and unlock a challenge.",
        unlocked() {return (hasUpgrade("hexzd", 24))},
    },
},
buyables: { // Thanks Epic Stat Battles :)
        11: {
            title: "Inflate the Inflate",
            description: "Inflate Inflation Inflation.",
            cost(x) {return x.pow(x.div(2.5)).times(500)},  // The cost formula

            // Unlock condition
            unlocked() {
                return (hasUpgrade("hexzd", 23))  // Buyable unlocks when player has H23
            },

            // Effect of the buyable
            effect(x) {
                let base = x.pow(0.9).times(0.03).add(1); // Original effect formula
                return base
            },
            canAfford() { return player.hexzd.points.gte(this.cost()) },
            buy() {
                player.hexzd.points = player.hexzd.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // Display the effect
            display() {
                let amt = getBuyableAmount("hexzd", 11) // Current level of the buyable
                let cost = this.cost(amt) // Cost for the next level
                let effect = this.effect(amt) // Current effect of the buyable
                return `
                    ${this.description}<br>
                    Level: ${format(amt)}<br>
                    Effect: ^${format(effect)}<br>
                    Cost: ${format(cost)} Infinity Points`
            }, } }, 
        challenges: {
        11: {
            name: "Procrastination",
            challengeDescription: "FP gain is square rooted due to the lack of updates.",
            goalDescription: "Surpass Earth's population in FP. (≈8 billion)",
            rewardDescription: "Unlock the second FYSC provider.",
            unlocked() { return (hasUpgrade("hexzd", 25)) },
            canComplete() {return player.points.gte(8.5e9) },
        }
        }, 
     }, )
                