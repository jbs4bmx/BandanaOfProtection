/**
 * Copyright: jbs4bmx
*/

import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IItemConfig } from "@spt/models/spt/config/IItemConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ImporterUtil } from "@spt/utils/ImporterUtil";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { VFS } from "@spt/utils/VFS";
import { jsonc } from "jsonc";
import path from "path";

let bopdb;
let itemConfig: IItemConfig;
let botConfig: IBotConfig;
let pmcConfig: IPmcConfig;
let configServer: ConfigServer;

class Bandana implements IPreSptLoadMod, IPostDBLoadMod
{
    private pkg;
    private privatePath = require('path');
    private modName = this.privatePath.basename(this.privatePath.dirname(__dirname.split('/').pop()));

    public postDBLoad(container: DependencyContainer)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const preSptModLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
        const databaseImporter = container.resolve<ImporterUtil>("ImporterUtil");
        const locales = db.locales.global;
        const handbook = db.templates.handbook.Items;
        this.pkg = require("../package.json");
        bopdb = databaseImporter.loadRecursive(`${preSptModLoader.getModPath(this.modName)}database/`);

        for (const iItem in bopdb.dbItems.templates) {
            db.templates.items[iItem] = bopdb.dbItems.templates[iItem];
        }

        for (const hItem of bopdb.dbItems.handbook.Items) {
            if (!handbook.find(i=>i.Id == hItem.Id)) {
                handbook.push(hItem);
            }
        }

        for (const localeID in locales) {
            for (const locale in bopdb.dbItems.locales.en) {
                locales[localeID][locale] = bopdb.dbItems.locales.en[locale];
            }
        }

        for (const pItem in bopdb.dbItems.prices) {
            db.templates.prices[pItem] = bopdb.dbItems.prices[pItem];
        }

        for (const tradeName in db.traders) {
            // Ragman
            if ( tradeName === "5ac3b934156ae10c4430e83c" ) {
                for (const riItem of bopdb.ragmanAssort.items) {
                    if (!db.traders[tradeName].assort.items.find(i=>i._id == riItem._id)) {
                        db.traders[tradeName].assort.items.push(riItem);
                    }
                }
                for (const rbItem in bopdb.ragmanAssort.barter_scheme) {
                    db.traders[tradeName].assort.barter_scheme[rbItem] = bopdb.ragmanAssort.barter_scheme[rbItem];
                }
                for (const rlItem in bopdb.ragmanAssort.loyal_level_items) {
                    db.traders[tradeName].assort.loyal_level_items[rlItem] = bopdb.ragmanAssort.loyal_level_items[rlItem];
                }
            }
        }

        this.setConfigOptions(container)

        logger.info(`${this.pkg.author}-${this.pkg.name} v${this.pkg.version}: Cached Successfully`);
    }

    public setConfigOptions(container: DependencyContainer): void
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const handBook = db.templates.handbook.Items;
        const priceList = db.templates.prices;
        const barterScheme = db.traders["5ac3b934156ae10c4430e83c"].assort.barter_scheme;
        const loyaltyItems = db.traders["5ac3b934156ae10c4430e83c"].assort.loyal_level_items;
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        //const botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
        const pmcConfig = configServer.getConfig<IPmcConfig>(ConfigTypes.PMC);
        const itemConfig = configServer.getConfig<IItemConfig>(ConfigTypes.ITEM);
        const vfs = container.resolve<VFS>("VFS");
        const { ArmorCoverage, ArmorAmount, Resources, PreFab, GodMode, Blacklist } = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config.jsonc")));

        //Add item to filter so it can be worn
        db.templates.items["55d7217a4bdc2d86028b456d"]._props.Slots[14]._props.filters[0].Filter.push("660877b848b061d3eca2579f");

        let colliders: string[] = [];
        //var penPower = 1;


        //Cost and durability range verification
        if (typeof Resources.RepairCost === "number") {
            if ((Resources.RepairCost < 1) || (Resources.RepairCost > 2000)) {
                Resources.RepairCost = 1000;
            }
        }
        if (typeof ArmorAmount.Durability === "number") {
            if ((ArmorAmount.Durability < 1) || (ArmorAmount.Durability > 9999999)) {
                ArmorAmount.Durability = 1500;
            }
        }
        if (typeof Resources.traderPrice === "number") {
            if ((Resources.traderPrice < 1) || (Resources.traderPrice > 9999999)) {
                Resources.traderPrice = 69420;
            }
        }


        //Armor Colliders config
        if (typeof ArmorCoverage.Head === "boolean") {
            if (ArmorCoverage.Head === true) {
                colliders.push("ParietalHead", "BackHead", "HeadCommon");
            }
        }
        if (typeof ArmorCoverage.Neck === "boolean") {
            if (ArmorCoverage.Neck === true) {
                colliders.push("NeckFront", "NeckBack");
            }
        }
        if (typeof ArmorCoverage.Eyes === "boolean") {
            if (ArmorCoverage.Eyes === true) {
                colliders.push("Eyes");
            }
        }
        if (typeof ArmorCoverage.Ears === "boolean") {
            if (ArmorCoverage.Ears === true) {
                colliders.push("Ears");
            }
        }
        if (typeof ArmorCoverage.Jaw === "boolean") {
            if (ArmorCoverage.Jaw === true) {
                colliders.push("Jaw");
            }
        }
        if (typeof ArmorCoverage.Arms === "boolean") {
            if (ArmorCoverage.Arms === true) {
                colliders.push("LeftUpperArm", "LeftForearm","RightUpperArm", "RightForearm");
            }
        }
        if (typeof ArmorCoverage.Front === "boolean") {
            if (ArmorCoverage.Front === true) {
                colliders.push("RibcageUp","RibcageLow");
            }
        }
        if (typeof ArmorCoverage.Back === "boolean") {
            if (ArmorCoverage.Back === true) {
                colliders.push("SpineTop", "SpineDown");
            }
        }
        if (typeof ArmorCoverage.Sides === "boolean") {
            if (ArmorCoverage.Sides === true) {
                colliders.push("RightSideChestUp", "RightSideChestDown", "LeftSideChestUp", "LeftSideChestDown");
            }
        }
        if (typeof ArmorCoverage.Pelvis === "boolean") {
            if (ArmorCoverage.Pelvis === true) {
                colliders.push("Pelvis");
            }
        }
        if (typeof ArmorCoverage.Buttocks === "boolean") {
            if (ArmorCoverage.Buttocks === true) {
                colliders.push("PelvisBack");
            }
        }
        if (typeof ArmorCoverage.Legs === "boolean") {
            if (ArmorCoverage.Legs === true) {
                colliders.push("LeftThigh", "LeftCalf","RightThigh", "RightCalf");
            }
        }


        //Armor Plate Colliders = N/A


        //Trader Settings (from Resources)
        for ( let i=0; i<handBook.length; i++ ) {
            if ( handBook[i].Id == "660877b848b061d3eca2579f" ) {
                handBook[i].Price = Resources.traderPrice;
            }
        }
        for ( let i=0; i<priceList.length; i++ ) {
            if ( priceList[i] == "660877b848b061d3eca2579f" ) {
                priceList[i] = Resources.traderPrice;
            }
        }
        for (const barterItem in barterScheme) {
            if (barterItem == "660877b848b061d3eca2579f" ) {
                barterScheme[barterItem][0][0].count = Resources.traderPrice;
            }
        }
        for (const loyalItem in loyaltyItems) {
            if (loyalItem == "660877b848b061d3eca2579f" ) {
                loyaltyItems[loyalItem] = Resources.traderLoyaltyLevel;
            }
        }


        //PreFab
        let prefabCount = 0;
        let trueKey: string | null = null;
        for (const key in PreFab) {
            if (PreFab[key] === true) {
                prefabCount++;
                trueKey = key;
            }
        }
        if (prefabCount === 0) {
            logger.error("[BoP] No property for PreFab is set to 'true'. Defaulting to HalfMask.");
            db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_buffalo/item_equipment_facecover_buffalo.bundle";
        } else if (prefabCount > 1) {
            logger.error("[BoP] More than one property value for PreFab is set to 'true'. Defaulting to HalfMask.");
            db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_buffalo/item_equipment_facecover_buffalo.bundle";
        } else {
            switch ( trueKey ) {
                case "HalfMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_buffalo/item_equipment_facecover_buffalo.bundle";
                    break;
                }
                case "GP5GasMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_gasmask_gp5/item_equipment_facecover_gasmask_gp5.bundle";
                    break;
                }
                case "GP7GasMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_gasmask_gp7/item_equipment_facecover_gasmask_gp7.bundle";
                    break;
                }
                case "Respirator": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_gasmask_3m/item_equipment_facecover_gasmask_3m.bundle";
                    break;
                }
                case "DevBalaclava": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_balaclava/item_equipment_facecover_balaclava_development.bundle";
                    break;
                }
                case "JasonMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_halloween_jason/item_equipment_facecover_halloween_jason.bundle";
                    break;
                }
                case "MichealMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_halloween_michael/item_equipment_facecover_halloween_micheal.bundle";
                    break;
                }
                case "PestilyMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_pestily/item_equipment_facecover_pestily.bundle";
                    break;
                }
                case "SmokeBalaclava": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_smoke/item_equipment_head_smoke.bundle";
                    break;
                }
                case "TagillaGorilla": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_welding/item_equipment_facecover_welding_gorilla.bundle";
                    break;
                }
                case "TagillaUBEY": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_welding/item_equipment_facecover_welding_kill.bundle";
                    break;
                }
                case "GhostBalaclava": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_balaclavaskull/item_equipment_facecover_balaclavaskull.bundle";
                    break;
                }
                case "MomexBalaclava": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_nomexbalaclava/item_equipment_facecover_nomexbalaclava.bundle";
                    break;
                }
                case "ColdFearBalaclava": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_coldgear/item_equipment_facecover_coldgear.bundle";
                    break;
                }
                case "Rivals2021Balaclava": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_coldgear/item_equipment_facecover_coldgear_twitch.bundle";
                    break;
                }
                case "Balaclava": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_balaclava/item_equipment_facecover_balaclava.bundle";
                    break;
                }
                case "RoninBallistic": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_devtac/item_equipment_facecover_devtac.bundle";
                    break;
                }
                case "TwitchRivals2020Mask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_redflame/item_equipment_facecover_redflame_twitch.bundle";
                    break;
                }
                case "TwitchRivals2020HalfMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_shroud/item_equipment_facecover_shroud_twitch.bundle";
                    break;
                }
                case "GreenShemagh": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_shemagh/item_equipment_facecover_shemagh.bundle";
                    break;
                }
                case "TanShemagh": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_shemagh_02/item_equipment_facecover_shemagh_02.bundle";
                    break;
                }
                case "ShroudMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_shroud/item_equipment_facecover_shroud.bundle";
                    break;
                }
                case "ShatteredMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_shatteredmask/item_equipment_facecover_shatteredmask.bundle";
                    break;
                }
                case "DeadlySkull": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_skullmask/item_equipment_facecover_skullmask.bundle";
                    break;
                }
                case "NeopreneMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_redflame/item_equipment_facecover_redflame.bundle";
                    break;
                }
                case "GhoulMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_halloween_vampire/item_equipment_facecover_halloween_vampire.bundle";
                    break;
                }
                case "SlenderMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_halloween_slander/item_equipment_facecover_halloween_slander.bundle";
                    break;
                }
                case "FacelessMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_halloween_kaonasi/item_equipment_facecover_halloween_kaonasi.bundle";
                    break;
                }
                case "FakeMustache": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/mustache/item_equipment_mustache.bundle";
                    break;
                }
                case "FakeWhiteBeard": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/item_beard/item_beard.bundle";
                    break;
                }
                case "BaddiesRedBeard": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/item_equipment_facecover_beard_red.bundle";
                    break;
                }
                case "BigPipe": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/item_equipment_facecover_pipe.bundle";
                    break;
                }
                case "HockeyPlayerCaptain": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/item_equipment_facecover_hockey_01.bundle";
                    break;
                }
                case "HockeyPlayerBrawler": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/item_equipment_facecover_hockey_02.bundle";
                    break;
                }
                case "HockeyPlayerQuiet": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/item_equipment_facecover_hockey_03.bundle";
                    break;
                }
                case "DeathKnightMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/item_equipment_facecover_boss_blackknight.bundle";
                    break;
                }
                case "GloriousEMask": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/item_equipment_facecover_glorious.bundle";
                    break;
                }
                case "ZryachiyBalaclavaOpen": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/head_boss_zryachi_balaclava_open/item_equipment_head_boss_zryachi_balaclava_open.bundle";
                    break;
                }
                case "ZryachiyBalaclavaClosed": {
                    logger.info(`[BoP] Setting BoP prefab to selected value: ${trueKey}`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_boss_zryachi_closed/facecover_boss_zryachi_closed.bundle";
                    break;
                }
                default: {
                    logger.info(`[BoP] Setting BoP prefab to default value: HalfMask`)
                    db.templates.items["660877b848b061d3eca2579f"]._props.Prefab.path = "assets/content/items/equipment/facecover_buffalo/item_equipment_facecover_buffalo.bundle";
                    break;
                }
            }
        }


        //Resources
        db.templates.items["660877b848b061d3eca2579f"]._props.ArmorMaterial = Resources.ArmorMaterial;
        db.templates.items["660877b848b061d3eca2579f"]._props.ArmorType = Resources.ArmorType;
        db.templates.items["660877b848b061d3eca2579f"]._props.BlindnessProtection = Resources.BlindnessProtection;
        db.templates.items["660877b848b061d3eca2579f"]._props.Durability = ArmorAmount.Durability;
        db.templates.items["660877b848b061d3eca2579f"]._props.MaxDurability = ArmorAmount.Durability;
        db.templates.items["660877b848b061d3eca2579f"]._props.ArmorClass = Resources.ArmorClass;
        db.templates.items["660877b848b061d3eca2579f"]._props.Weight = Resources.ItemWeight;
        db.templates.items["660877b848b061d3eca2579f"]._props.RepairCost = Resources.RepairCost;
        db.templates.items["660877b848b061d3eca2579f"]._props.armorColliders = colliders;
        //db.templates.items["660877b848b061d3eca2579f"]._props.armorPlateColliders = colPlates;


        //GodMode
        if (typeof GodMode.BluntForce === "boolean") {
            if (GodMode.BluntForce === true) {
                db.templates.items["660877b848b061d3eca2579f"]._props.BluntThroughput = 0;
                db.templates.items["660877b848b061d3eca2579f"]._props.Indestructibility = 1;
            }
        }
        //if (typeof GodMode.Penetration === "boolean") { if (GodMode.Penetration === true) { penPower = 0; break;}


        //Blacklists
        if (typeof Blacklist.pmc === "boolean") {
            if (Blacklist.pmc === true) {
                pmcConfig.vestLoot.blacklist.push("660877b848b061d3eca2579f");
                pmcConfig.pocketLoot.blacklist.push("660877b848b061d3eca2579f");
                pmcConfig.backpackLoot.blacklist.push("660877b848b061d3eca2579f");
            }
        }
        if (typeof Blacklist.globalLoot === "boolean") {
            if (Blacklist.globalLoot === true) {
                itemConfig.blacklist.push("660877b848b061d3eca2579f");
            }
        }
    }
}

module.exports = { mod: new Bandana() }
