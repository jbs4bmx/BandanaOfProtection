/* BoP.js
       license: The Unlicense
     copyright: jbs4bmx
       website: https://www.guilded.gg/senkospub
          name: BandOfProtection
   description: Extra full body armor provided by the bandana.
       version: 2.0.2
     author(s): jbs4bmx
*/

class Mod
{
    constructor()
    {
        this.mod = "jbs4bmx-BandanaOfProtection";
        Logger.info(`Loading: ${this.mod}`);
        const configFile = `${ModLoader.getModPath(this.mod)}config/config.json`;
        const config = JsonUtil.deserialize(VFS.readFile(configFile));
        if (config.other.HideWarningMessage === false) {
            Logger.Log(`[BandanaOfProtection Mod]`, "white", "red");
            Logger.Log(`Shaka, when the walls fell. Did you read the configuration file?`, "yellow");
            Logger.Log(`To remove this warning, change the final entry of the config file to true.`,"yellow");
            Logger.Log(`[BandanaOfProtection Mod]`, "white", "red");
        }
        ModLoader.onLoad[this.mod] = this.load.bind(this);
    }

    load()
    {
        // Config
        const configFile = `${ModLoader.getModPath(this.mod)}config/config.json`;
        const config = JsonUtil.deserialize(VFS.readFile(configFile));

        // Database
        const database = DatabaseServer.tables;
        const items = database.templates.items;
        const handbook = database.templates.handbook.Items;
        const global = database.locales.global;
        const traders = database.traders;

        // Set arrays for armor attributes
        let armor = [];
        let segments = [];

        // Build Item Properties, set trader to Ragman, and accept only Roubles.
        var itemId = "BandanaPro";
        var itemClone = "572b7fa524597762b747ce82";
        var itemCategory = "5b55501346f783093f2ec222";
        var itemFleaPrice = config.Resources.marketPrice;
        var itemPrefabPath = "assets/content/items/equipment/facecover_buffalo/item_equipment_facecover_buffalo.bundle";
        var itemLongName = "Bandana of Protection";
        var itemShortName = "BoP";
        var itemDescription = "A bandana that provides advanced protection for the weak at heart. This bandana provides the extra courage needed by the cowardly lions of Tarkov. You could escape by following the blood stained roads out of Tarkov... or you could just plow your way through scavs and PMCs while wearing this.";
        var itemTrader = "5ac3b934156ae10c4430e83c";
        var itemTraderPrice = config.Resources.traderPrice;
        var itemTraderCurrency = "5449016a4bdc2d6f028b456f";
        var itemTraderLV = config.Resources.minTraderLevel;

        //pass info to functions below
        this.createItemHandbookEntry(itemId, itemCategory, itemFleaPrice, handbook);
        this.createItem(itemId, itemClone, itemPrefabPath, itemLongName, itemShortName, itemDescription, items, global);
        this.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLV, traders);

        //push body armor to array "armor"
        if (typeof config.MainArmor.Head === "boolean") {
            if (config.MainArmor.Head === true) {
                armor.push("Head")
            }
        } else {
            armor.push("Head")
        }
        if (typeof config.MainArmor.Thorax === "boolean") {
            if (config.MainArmor.Thorax === true) {
                armor.push("Chest")
            }
        } else {
            armor.push("Chest")
        }
        if (typeof config.MainArmor.Stomach === "boolean") {
            if (config.MainArmor.Stomach === true) {
                armor.push("Stomach")
            }
        } else {
            armor.push("Stomach")
        }
        if (typeof config.MainArmor.LeftArm === "boolean") {
            if (config.MainArmor.LeftArm === true) {
                armor.push("LeftArm")
            }
        } else {
            armor.push("LeftArm")
        }
        if (typeof config.MainArmor.RightArm === "boolean") {
            if (config.MainArmor.RightArm === true) {
                armor.push("RightArm")
            }
        } else {
            armor.push("RightArm")
        }
        if (typeof config.MainArmor.LeftLeg === "boolean") {
            if (config.MainArmor.LeftLeg === true) {
                armor.push("LeftLeg")
            }
        } else {
            armor.push("LeftLeg")
        }
        if (typeof config.MainArmor.RightLeg === "boolean") {
            if (config.MainArmor.RightLeg === true) {
                armor.push("RightLeg")
            }
        } else {
            armor.push("RightLeg")
        }

        //push head segments to array "segments"
        if (typeof config.HeadAreas.Top === "boolean") {
            if (config.HeadAreas.Top === true) {
                segments.push("Top")
            }
        } else {
            segments.push("Top")
        }
        if (typeof config.HeadAreas.Nape === "boolean") {
            if (config.HeadAreas.Nape === true) {
                segments.push("Nape")
            }
        } else {
            segments.push("Nape")
        }
        if (typeof config.HeadAreas.Ears === "boolean") {
            if (config.HeadAreas.Ears === true) {
                segments.push("Ears")
            }
        } else {
            segments.push("Ears")
        }
        if (typeof config.HeadAreas.Eyes === "boolean") {
            if (config.HeadAreas.Eyes === true) {
                segments.push("Eyes")
            }
        } else {
            segments.push("Eyes")
        }
        if (typeof config.HeadAreas.Jaws === "boolean") {
            if (config.HeadAreas.Jaws === true) {
                segments.push("Jaws")
            }
        } else {
            segments.push("Jaws")
        }

        //change item properties
        items[itemId]._props.CreditsPrice = itemTraderPrice;
        items[itemId]._props.RepairCost = config.Resources.RepairCost;
        items[itemId]._props.Durability = config.Resources.Durability;
        items[itemId]._props.MaxDurability = config.Resources.Durability;
        items[itemId]._props.armorClass = 10;
        items[itemId]._props.armorZone = armor;
        items[itemId]._props.headSegments = segments;
        items[itemId]._props.MaterialType = "BodyArmor";
        items[itemId]._props.ArmorMaterial = "UHMWPE";

        //Report to Console
        Logger.info("Bandana of Protection Mod: Cached Successfully");
    }

    createItemHandbookEntry(i_id, i_category, i_fprice, i_handbook)
    {
        //add item to handbook
        i_handbook.push(
            {
                "Id": i_id,
                "ParentId": i_category,
                "Price": i_fprice
            }
        );
    }

    createItem(i_id, i_clone, i_path, i_lname, i_sname, i_desc, i_items, i_global)
    {
        let item = JsonUtil.clone(i_items[i_clone]);
        item._id = i_id;
        //add item back to database
        i_items[i_id] = item;
        //add custom item names to all languages/locales
        for (const localeID in i_global)
        {
            i_global[localeID].templates[i_id] =
            {
                "Name": i_lname,
                "ShortName": i_sname,
                "Description": i_desc
            };
        }
    }

    createItemOffer(i_id, i_trader, i_price, i_currency, i_loyalty, i_traders)
    {
        i_traders[i_trader].assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd":
                {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999999
                }
            }
        );
        //add trader cost to item
        i_traders[i_trader].assort.barter_scheme[i_id] = [
            [
                {
                    "CreditsPrice": i_price,
                    "_tpl": i_currency
                }
            ]
        ];
        //add trader loyalty level to item
        i_traders[i_trader].assort.loyal_level_items[i_id] = i_loyalty;
        //add item stack to fleamarket
        i_traders.ragfair.assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd":
                {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999
                }
            }
        );
        i_traders.ragfair.assort.loyal_level_items[i_id] = 1;
    }
}
module.exports.Mod = Mod;