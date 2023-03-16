"use strict";
/**
 * Copyright: jbs4bmx
*/
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
let bopdb;
class Bandana {
    constructor() {
        this.path = require('path');
        this.modName = this.path.basename(this.path.dirname(__dirname.split('/').pop()));
    }
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const db = container.resolve("DatabaseServer").getTables();
        const preAkiModLoader = container.resolve("PreAkiModLoader");
        const databaseImporter = container.resolve("ImporterUtil");
        const locales = db.locales.global;
        const handbook = db.templates.handbook.Items;
        this.pkg = require("../package.json");
        bopdb = databaseImporter.loadRecursive(`${preAkiModLoader.getModPath(this.modName)}database/`);
        for (const i_item in bopdb.templates.items.templates) {
            db.templates.items[i_item] = bopdb.templates.items.templates[i_item];
        }
        for (const h_item of bopdb.templates.handbook.Items) {
            if (!handbook.find(i => i.Id == h_item.Id)) {
                handbook.push(h_item);
            }
        }
        for (const localeID in locales) {
            for (const locale in bopdb.locales.en) {
                locales[localeID][locale] = bopdb.locales.en[locale];
            }
        }
        for (const tradeName in db.traders) {
            if (tradeName === "5ac3b934156ae10c4430e83c") {
                for (const ri_item of bopdb.traders.Ragman.items.list) {
                    if (!db.traders[tradeName].assort.items.find(i => i._id == ri_item._id)) {
                        db.traders[tradeName].assort.items.push(ri_item);
                    }
                }
                for (const rb_item in bopdb.traders.Ragman.barter_scheme) {
                    db.traders[tradeName].assort.barter_scheme[rb_item] = bopdb.traders.Ragman.barter_scheme[rb_item];
                }
                for (const rl_item in bopdb.traders.Ragman.loyal_level_items) {
                    db.traders[tradeName].assort.loyal_level_items[rl_item] = bopdb.traders.Ragman.loyal_level_items[rl_item];
                }
            }
        }
        this.setConfigOptions(container);
        logger.info(`${this.pkg.author}-${this.pkg.name} v${this.pkg.version}: Cached successfully`);
    }
    setConfigOptions(container) {
        const db = container.resolve("DatabaseServer").getTables();
        const configServer = container.resolve("ConfigServer");
        const botConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        const handBook = db.templates.handbook.Items;
        const barterScheme = db.traders["5ac3b934156ae10c4430e83c"].assort.barter_scheme;
        const { MainArmor, HeadAreas, Resources, FaceCover, GodMode, Blacklist } = require("./config.json");
        db.templates.items["55d7217a4bdc2d86028b456d"]._props.Slots[4]._props.filters[0].Filter.push("BandanaOfProtection00xxx");
        let armor = [];
        let segments = [];
        let fab = "";
        if (typeof MainArmor.Head === "boolean") {
            if (MainArmor.Head === true) {
                armor.push("Head");
                if (typeof HeadAreas.Top === "boolean") {
                    if (HeadAreas.Top === true) {
                        segments.push("Top");
                    }
                }
                if (typeof HeadAreas.Nape === "boolean") {
                    if (HeadAreas.Nape === true) {
                        segments.push("Nape");
                    }
                }
                if (typeof HeadAreas.LowerNape === "boolean") {
                    if (HeadAreas.LowerNape === true) {
                        segments.push("LowerNape");
                    }
                }
                if (typeof HeadAreas.Ears === "boolean") {
                    if (HeadAreas.Ears === true) {
                        segments.push("Ears");
                    }
                }
                if (typeof HeadAreas.Eyes === "boolean") {
                    if (HeadAreas.Eyes === true) {
                        segments.push("Eyes");
                    }
                }
                if (typeof HeadAreas.Jaws === "boolean") {
                    if (HeadAreas.Jaws === true) {
                        segments.push("Jaws");
                    }
                }
            }
        }
        if (typeof MainArmor.Thorax === "boolean") {
            if (MainArmor.Thorax === true) {
                armor.push("Chest");
            }
        }
        if (typeof MainArmor.Stomach === "boolean") {
            if (MainArmor.Stomach === true) {
                armor.push("Stomach");
            }
        }
        if (typeof MainArmor.LeftArm === "boolean") {
            if (MainArmor.LeftArm === true) {
                armor.push("LeftArm");
            }
        }
        if (typeof MainArmor.RightArm === "boolean") {
            if (MainArmor.RightArm === true) {
                armor.push("RightArm");
            }
        }
        if (typeof MainArmor.LeftLeg === "boolean") {
            if (MainArmor.LeftLeg === true) {
                armor.push("LeftLeg");
            }
        }
        if (typeof MainArmor.RightLeg === "boolean") {
            if (MainArmor.RightLeg === true) {
                armor.push("RightLeg");
            }
        }
        if (typeof Resources.RepairCost === "number") {
            if (!(0 < Resources.RepairCost && Resources.RepairCost < 9999999)) {
                Resources.RepairCost = 1000;
            }
        }
        if (typeof Resources.Durability === "number") {
            if (!(0 < Resources.Durability && Resources.Durability < 9999999)) {
                Resources.Durability = 1500;
            }
        }
        if (typeof Resources.traderPrice === "number") {
            if (!(0 < Resources.traderPrice && Resources.traderPrice < 9999999)) {
                Resources.traderPrice = 69420;
            }
        }
        if (typeof FaceCover.HalfMask === "boolean") {
            if (FaceCover.HalfMask) {
                fab = "assets/content/items/equipment/facecover_buffalo/item_equipment_facecover_buffalo.bundle";
            }
        }
        if (typeof FaceCover.GP5GasMask === "boolean") {
            if (FaceCover.GP5GasMask) {
                fab = "assets/content/items/equipment/facecover_gasmask_gp5/item_equipment_facecover_gasmask_gp5.bundle";
            }
        }
        if (typeof FaceCover.GP7GasMask === "boolean") {
            if (FaceCover.GP7GasMask) {
                fab = "assets/content/items/equipment/facecover_gasmask_gp7/item_equipment_facecover_gasmask_gp7.bundle";
            }
        }
        if (typeof FaceCover.Respirator === "boolean") {
            if (FaceCover.Respirator) {
                fab = "assets/content/items/equipment/facecover_gasmask_3m/item_equipment_facecover_gasmask_3m.bundle";
            }
        }
        if (typeof FaceCover.DevBalaclava === "boolean") {
            if (FaceCover.DevBalaclava) {
                fab = "assets/content/items/equipment/facecover_balaclava/item_equipment_facecover_balaclava_development.bundle";
            }
        }
        if (typeof FaceCover.JasonMask === "boolean") {
            if (FaceCover.JasonMask) {
                fab = "assets/content/items/equipment/facecover_halloween_jason/item_equipment_facecover_halloween_jason.bundle";
            }
        }
        if (typeof FaceCover.MichealMask === "boolean") {
            if (FaceCover.MichealMask) {
                fab = "assets/content/items/equipment/facecover_halloween_michael/item_equipment_facecover_halloween_micheal.bundle";
            }
        }
        if (typeof FaceCover.PestilyMask === "boolean") {
            if (FaceCover.PestilyMask) {
                fab = "assets/content/items/equipment/facecover_pestily/item_equipment_facecover_pestily.bundle";
            }
        }
        if (typeof FaceCover.SmokeBalaclava === "boolean") {
            if (FaceCover.SmokeBalaclava) {
                fab = "assets/content/items/equipment/facecover_smoke/item_equipment_head_smoke.bundle";
            }
        }
        if (typeof FaceCover.TagillaGorilla === "boolean") {
            if (FaceCover.TagillaGorilla) {
                fab = "assets/content/items/equipment/facecover_welding/item_equipment_facecover_welding_gorilla.bundle";
            }
        }
        if (typeof FaceCover.TagillaUBEY === "boolean") {
            if (FaceCover.TagillaUBEY) {
                fab = "assets/content/items/equipment/facecover_welding/item_equipment_facecover_welding_kill.bundle";
            }
        }
        if (typeof FaceCover.GhostBalaclava === "boolean") {
            if (FaceCover.GhostBalaclava) {
                fab = "assets/content/items/equipment/facecover_balaclavaskull/item_equipment_facecover_balaclavaskull.bundle";
            }
        }
        if (typeof FaceCover.MomexBalaclava === "boolean") {
            if (FaceCover.MomexBalaclava) {
                fab = "assets/content/items/equipment/facecover_nomexbalaclava/item_equipment_facecover_nomexbalaclava.bundle";
            }
        }
        if (typeof FaceCover.ColdFearBalaclava === "boolean") {
            if (FaceCover.ColdFearBalaclava) {
                fab = "assets/content/items/equipment/facecover_coldgear/item_equipment_facecover_coldgear.bundle";
            }
        }
        if (typeof FaceCover.Rivals2021Balaclava === "boolean") {
            if (FaceCover.Rivals2021Balaclava) {
                fab = "assets/content/items/equipment/facecover_coldgear/item_equipment_facecover_coldgear_twitch.bundle";
            }
        }
        if (typeof FaceCover.Balaclava === "boolean") {
            if (FaceCover.Balaclava) {
                fab = "assets/content/items/equipment/facecover_balaclava/item_equipment_facecover_balaclava.bundle";
            }
        }
        if (typeof FaceCover.RoninBallistic === "boolean") {
            if (FaceCover.RoninBallistic) {
                fab = "assets/content/items/equipment/facecover_devtac/item_equipment_facecover_devtac.bundle";
            }
        }
        if (typeof FaceCover.TwitchRivals2020Mask === "boolean") {
            if (FaceCover.TwitchRivals2020Mask) {
                fab = "assets/content/items/equipment/facecover_redflame/item_equipment_facecover_redflame_twitch.bundle";
            }
        }
        if (typeof FaceCover.TwitchRivals2020HalfMask === "boolean") {
            if (FaceCover.TwitchRivals2020HalfMask) {
                fab = "assets/content/items/equipment/facecover_shroud/item_equipment_facecover_shroud_twitch.bundle";
            }
        }
        if (typeof FaceCover.GreenShemagh === "boolean") {
            if (FaceCover.GreenShemagh) {
                fab = "assets/content/items/equipment/facecover_shemagh/item_equipment_facecover_shemagh.bundle";
            }
        }
        if (typeof FaceCover.TanShemagh === "boolean") {
            if (FaceCover.TanShemagh) {
                fab = "assets/content/items/equipment/facecover_shemagh_02/item_equipment_facecover_shemagh_02.bundle";
            }
        }
        if (typeof FaceCover.ShroudMask === "boolean") {
            if (FaceCover.ShroudMask) {
                fab = "assets/content/items/equipment/facecover_shroud/item_equipment_facecover_shroud.bundle";
            }
        }
        if (typeof FaceCover.ShatteredMask === "boolean") {
            if (FaceCover.ShatteredMask) {
                fab = "assets/content/items/equipment/facecover_shatteredmask/item_equipment_facecover_shatteredmask.bundle";
            }
        }
        if (typeof FaceCover.DeadlySkull === "boolean") {
            if (FaceCover.DeadlySkull) {
                fab = "assets/content/items/equipment/facecover_skullmask/item_equipment_facecover_skullmask.bundle";
            }
        }
        if (typeof FaceCover.NeopreneMask === "boolean") {
            if (FaceCover.NeopreneMask) {
                fab = "assets/content/items/equipment/facecover_redflame/item_equipment_facecover_redflame.bundle";
            }
        }
        if (typeof FaceCover.GhoulMask === "boolean") {
            if (FaceCover.GhoulMask) {
                fab = "assets/content/items/equipment/facecover_halloween_vampire/item_equipment_facecover_halloween_vampire.bundle";
            }
        }
        if (typeof FaceCover.SlenderMask === "boolean") {
            if (FaceCover.SlenderMask) {
                fab = "assets/content/items/equipment/facecover_halloween_slander/item_equipment_facecover_halloween_slander.bundle";
            }
        }
        if (typeof FaceCover.FacelessMask === "boolean") {
            if (FaceCover.FacelessMask) {
                fab = "assets/content/items/equipment/facecover_halloween_kaonasi/item_equipment_facecover_halloween_kaonasi.bundle";
            }
        }
        if (typeof FaceCover.FakeMustache === "boolean") {
            if (FaceCover.FakeMustache) {
                fab = "assets/content/items/equipment/mustache/item_equipment_mustache.bundle";
            }
        }
        if (typeof FaceCover.FakeWhiteBeard === "boolean") {
            if (FaceCover.FakeWhiteBeard) {
                fab = "assets/content/items/equipment/item_beard/item_beard.bundle";
            }
        }
        if (typeof FaceCover.BaddiesRedBeard === "boolean") {
            if (FaceCover.BaddiesRedBeard) {
                fab = "assets/content/items/equipment/item_equipment_facecover_beard_red.bundle";
            }
        }
        if (typeof FaceCover.BigPipe === "boolean") {
            if (FaceCover.BigPipe) {
                fab = "assets/content/items/equipment/item_equipment_facecover_pipe.bundle";
            }
        }
        if (typeof FaceCover.HockeyPlayerCaptain === "boolean") {
            if (FaceCover.HockeyPlayerCaptain) {
                fab = "assets/content/items/equipment/item_equipment_facecover_hockey_01.bundle";
            }
        }
        if (typeof FaceCover.HockeyPlayerBrawler === "boolean") {
            if (FaceCover.HockeyPlayerBrawler) {
                fab = "assets/content/items/equipment/item_equipment_facecover_hockey_02.bundle";
            }
        }
        if (typeof FaceCover.HockeyPlayerQuiet === "boolean") {
            if (FaceCover.HockeyPlayerQuiet) {
                fab = "assets/content/items/equipment/item_equipment_facecover_hockey_03.bundle";
            }
        }
        if (typeof FaceCover.DeathKnightMask === "boolean") {
            if (FaceCover.DeathKnightMask) {
                fab = "assets/content/items/equipment/item_equipment_facecover_boss_blackknight.bundle";
            }
        }
        if (typeof FaceCover.GloriousEMask === "boolean") {
            if (FaceCover.GloriousEMask) {
                fab = "assets/content/items/equipment/item_equipment_facecover_glorious.bundle";
            }
        }
        if (typeof GodMode.Enabled === "boolean") {
            if (GodMode.Enabled) {
                var throughput = 0;
            }
            else {
                var throughput = 1;
            }
        }
        if (typeof Blacklist.Value === "boolean") {
            if (Blacklist.Value) {
                botConfig.pmc.vestLoot.blacklist.push("BandanaOfProtection00xxx");
                botConfig.pmc.pocketLoot.blacklist.push("BandanaOfProtection00xxx");
                botConfig.pmc.backpackLoot.blacklist.push("BandanaOfProtection00xxx");
            }
        }
        for (var i = 0; i < handBook.length; i++) {
            if (handBook[i].Id == "BandanaOfProtection00xxx") {
                handBook[i].Price = Resources.traderPrice;
            }
        }
        for (const barterItem in barterScheme) {
            if (barterItem == "BandanaOfProtection00xxx") {
                barterScheme[barterItem][0][0].count = Resources.traderPrice;
            }
        }
        db.templates.items["BandanaOfProtection00xxx"]._props.Prefab.path = fab;
        db.templates.items["BandanaOfProtection00xxx"]._props.RepairCost = Resources.RepairCost;
        db.templates.items["BandanaOfProtection00xxx"]._props.Durability = Resources.Durability;
        db.templates.items["BandanaOfProtection00xxx"]._props.MaxDurability = Resources.Durability;
        db.templates.items["BandanaOfProtection00xxx"]._props.armorZone = armor;
        db.templates.items["BandanaOfProtection00xxx"]._props.headSegments = segments;
        if (throughput === 0) {
            db.templates.items["BandanaOfProtection00xxx"]._props.BluntThroughput = 0;
        }
    }
}
module.exports = { mod: new Bandana() };
