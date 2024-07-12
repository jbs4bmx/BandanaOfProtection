# Bandana of Protection


## Description
This mod adds a new version of the face cover of your choosing and adds armor protection for body parts based on how the configuration file is edited.


## Credits
Author: jbs4bmx <br>
Contributors: sugonyak, ShadowXtrex


## Armor
Values of **armorCollider** array assigned by Armor mod options.

| Mod Option | Configurable Value | Assigned Value |
|:----- | :----- | :----- |
| Head | true/false | ParietalHead, BackHead, HeadCommon |
| Neck | true/false | NeckFront, NeckBack |
| Eyes | true/false | Eyes |
| Ears | true/false | Ears |
| Jaw | true/false | Jaw |
| Back | true/false | SpineTop, SpineDown |
| Arms | true/false | LeftUpperArm, LeftForearm, RightUpperArm, RightForearm |
| Sides | true/false | RightSideChestUp, RightSideChestDown, LeftSideChestUp, LeftSideChestDown |
| Front | true/false | RibcageUp, RibcageLow |
| Pelvis | true/false | Pelvis |
| Buttocks | true/false | PelvisBack |
| Legs | true/false | RightThigh, RightCalf, LeftThigh, LeftCalf |


## Installation
### How to Install this Mod.
"[SPT]" = Your SPT folder path
   1. Extract the contents of the zip file into the root of your [SPT] folder.
      - That's the same location as "SPT.Server.exe" and "SPT.Launcher.exe".
   2. Edit the Config to adjust the values to your likeing.
   3. Start SPT.Server.exe and wait until it fully loads.
   4. Start SPT.Launcher.exe but do not launch the game.
   5. Run the cache cleaner found in the launcher's settings menu.
   6. Now you can launch the game and profit.

### Common Questions
   1. Where do I report bugs found with the current version of the mod?
      - You can report bugs for the current version of this mod here: [BoP Mod Page](https://hub.sp-tarkov.com/files/file/142-bandana-of-protection/).
   2. Why can't I see the different prefab for the facecover?
      - Make sure you only have one of the options set to true. The remaining prefab options should be false.
      - Before you launch the game, be sure to clear (delete) the cache files.


## Configuration Guide
Edit '.\config.jsonc' file as desired. <br>
config.jsonc contents
``` json
{
    "ArmorCoverage": {
        // Customize BoP armor protection areas.
        // This value must be true or false.
        "Head": true,
        "Neck": true,
        "Eyes": true,
        "Ears": true,
        "Jaw": true,
        "Arms": false,
        "Front": false,
        "Back": false,
        "Sides": false,
        "Pelvis": false,
        "Buttocks": false,
        "Legs": false
    },
    "ArmorAmount": {
        // Customize BoP armor durability level.
        // This must be a whole number ranging from 1-9999999.
        "Durability": 1000
    },
    "Resources": {
        // Customize BoP item properties.
        "ArmorClass": "10",
        "ArmorMaterial": "Ceramic",
        "ArmorType": "Heavy",
        "ItemWeight": 0.01,

        // This is the amount of protection from bright lights.
        // This must be any number value between 0 and 1 (e.g., 0, 0.25, 0.5, 0.8, 1, etc.)
        "BlindnessProtection": 0,

        // I recommend keeping this at or below 100
        // This must be a whole number ranging from 1-2000.
        "RepairCost": 100,

        // Customize trader (Ragman) properties
        "traderPrice": 10000,
        "traderLoyaltyLevel": 1
    },
    "PreFab": {
        // Customize BoP look (Default: HalfMask).
        // If more than one is set to 'true', then PreFab will revert back to default.
        "HalfMask": true,
        "GP5GasMask": false,
        "GP7GasMask": false,
        "Respirator": false,
        "DevBalaclava": false,
        "JasonMask": false,
        "MichealMask": false,
        "PestilyMask": false,
        "SmokeBalaclava": false,
        "TagillaGorilla": false,
        "TagillaUBEY": false,
        "GhostBalaclava": false,
        "MomexBalaclava": false,
        "ColdFearBalaclava": false,
        "Rivals2021Balaclava": false,
        "Balaclava": false,
        "RoninBallistic": false,
        "TwitchRivals2020Mask": false,
        "TwitchRivals2020HalfMask": false,
        "GreenShemagh": false,
        "TanShemagh": false,
        "ShroudMask": false,
        "ShatteredMask": false,
        "DeadlySkull": false,
        "NeopreneMask": false,
        "GhoulMask": false,
        "SlenderMask": false,
        "FacelessMask": false,
        "FakeMustache": false,
        "FakeWhiteBeard": false,
        "BaddiesRedBeard": false,
        "BigPipe": false,
        "HockeyPlayerCaptain": false,
        "HockeyPlayerBrawler": false,
        "HockeyPlayerQuiet": false,
        "DeathKnightMask": false,
        "GloriousEMask": false,
        "ZryachiyBalaclavaOpen": false,
        "ZryachiyBalaclavaClosed": false
    },
    "GodMode": {
        // Disable damage dealt by blunt force trauma.
        "BluntForce": false,

        // (WIP) Disable damage from projectile penetration of armor.
        // This value is a work in progress and is not currently implemented in this mod. - Please ignore for now.
        "Penetration": false
    },
    "Blacklist": {
        // Set to 'true' to disable item spawning on PMC or Scav bots, or to remove from global loot pools.
        "pmc": false,
        "scav": false,
        "globalLoot": false
    }
}
```

## Disclaimer
**This mod is provided _as-is_ with _no guarantee_ of support.**
