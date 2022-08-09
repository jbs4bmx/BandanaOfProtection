# Bandana of Protection

This mod adds a new version of the face cover of your choosing and adds armor protection for body parts based on how the configuration file is edited.

>Author  : jbs4bmx

>Version : 311.0.2 (Supports SPT-AKI 3.2.0 and EFT Version 0.12.12.30.19078)


### INSTALLATION GUIDE
Extract the contents of the zip file into the root of your SPT folder. The files and folders will be automatically placed into your mods folder.

Config file is found in the src folder within the mod's folder.

### Configuration Guide

You can specify the following configurations in the "\config\config.json" file.
1. "Main Armor" and "Head Segments" are boolean values and must be input as true or false.
   - Values other than true or false will default to true.
2. "Resources" are the property values represented by whole numbers. You can input any value from 1 to 9999999.
   - For RepairCost and traderPrice, any value below 1 or greater than 9999999 will default to 100000.
   - For Durability, values below 1 or greater than 9999999 will default to 100.
3. "FaceCover" allows you to choose your favorite look.
   - Last option set to true will be used so remember to only set 1 option to TRUE.
   - IMPORTANT: clean temp files before launching the game client to ensure that the changes to the icon will show up in the game.
4. "GodMode" allows you to disable penetration throughput essentially making you impervious to all projectile penetration until the armor is depleted.
   - Set to "true" to enable.

``` json
{
    "MainArmor": {
        "Head": true,       // [Boolean] value must be set to true or false - true = enabled.
        "Thorax": true,     // [Boolean]
        "Stomach": true,    // [Boolean]
        "LeftArm": true,    // [Boolean]
        "RightArm": true,   // [Boolean]
        "LeftLeg": true,    // [Boolean]
        "RightLeg": true    // [Boolean]
    },
    "HeadAreas": {
        "Top": true,    // [Boolean] value must be set to true or false - true = enabled.
        "Nape": true,   // [Boolean]
        "Ears": true,   // [Boolean]
        "Eyes": true,   // [Boolean]
        "Jaws": true    // [Boolean]
    },
    "Resources": {
        "RepairCost": 1,        // [Integer] value must be a whole number - Sets the cost to repair the item. (1-9999999)
        "Durability": 1,        // [Integer] value must be a whole number - Sets the durability amount of the item. (1-9999999)
        "traderPrice": 1        // [Integer] value must be a whole number - Sets the Ragman price of the item. (1-9999999)
    },
    "FaceCover": {
        "HalfMask": true,                   // [Boolean] value must be set to true or false - true = enabled.
        "GP5GasMask": false,                // [Boolean]
        "GP7GasMask": false,                // [Boolean]
        "Respirator": false,                // [Boolean]
        "DevBalaclava": false,              // [Boolean]
        "JasonMask": false,                 // [Boolean]
        "MichealMask": false,               // [Boolean]
        "PestilyMask": false,               // [Boolean]
        "SmokeBalaclava": false,            // [Boolean]
        "TagillaGorilla": false,            // [Boolean]
        "TagillaUBEY": false,               // [Boolean]
        "GhostBalaclava": false,            // [Boolean]
        "MomexBalaclava": false,            // [Boolean]
        "ColdFearBalaclava": false,         // [Boolean]
        "Rivals2021Balaclava": false,       // [Boolean]
        "Balaclava": false,                 // [Boolean]
        "RoninBallistic": false,            // [Boolean]
        "TwitchRivals2020Mask": false,      // [Boolean]
        "TwitchRivals2020HalfMask": false,  // [Boolean]
        "GreenShemagh": false,              // [Boolean]
        "TanShemagh": false,                // [Boolean]
        "ShroudMask": false,                // [Boolean]
        "ShatteredMask": false,             // [Boolean]
        "DeadlySkull": false,               // [Boolean]
        "NeopreneMask": false,              // [Boolean]
        "GhoulMask": false,                 // [Boolean]
        "SlenderMask": false,               // [Boolean]
        "FacelessMask": false,              // [Boolean]
        "FakeMustache": false,              // [Boolean]
        "FakeWhiteBeard": false,            // [Boolean]
        "BaddiesRedBeard": false,           // [Boolean]
        "BigPipe": false,                   // [Boolean]
        "HockeyPlayerCaptain": false,       // [Boolean]
        "HockeyPlayerBrawler": false,       // [Boolean]
        "HockeyPlayerQuiet": false,         // [Boolean]
        "DeathKnightMask": false,           // [Boolean]
        "GloriousEMask": false              // [Boolean]
    },
    "GodMode": {
        "Enabled": false
    }
}
```
