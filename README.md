# Bandana of Protection

This mod adds a new version of the face cover of your choosing and adds armor protection for body parts based on how the configuration file is edited.

>Author  : jbs4bmx



### INSTALLATION GUIDE
Extract the contents of the zip file into the root of your SPT folder. The files and folders will be automatically placed into your mods folder.

Config file is found in the src folder within the mod's folder.
#

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
        "_COMMENT": "What areas of the body do you want to protect?",
        "Head": true,
        "Thorax": false,
        "Stomach": false,
        "LeftArm": false,
        "RightArm": false,
        "LeftLeg": false,
        "RightLeg": false
    },
    "HeadAreas": {
        "_COMMENT": "Enable these only if you want particular areas to be protected, otherwise 'Head: true' is enough to protect your head.",
        "_Notice": "This section is only valid if 'Head' is set to 'true'.",
        "Top": false,
        "Nape": false,
        "LowerNape": false,
        "Ears": false,
        "Eyes": false,
        "Jaws": true
    },
    "Resources": {
        "_COMMENT": "Self-explanatory section.",
        "RepairCost": 50,
        "Durability": 1500,
        "traderPrice": 79000
    },
    "TypeOfArmor": {
        "_COMMENT": "ONLY SET ONE OF THE FOLLOWING VALUES TO TRUE. THE REST SHOULD BE FALSE.",
        "Heavy": true,
        "Light": false,
        "None": false
    },
    "MaterialOfArmor": {
        "_COMMENT": "ONLY SET ONE OF THE FOLLOWING VALUES TO TRUE. THE REST SHOULD BE FALSE.",
        "UHMWPE": false,
        "Aramid": false,
        "Combined": false,
        "Titan": true,
        "Aluminium": false,
        "ArmoredSteel": false,
        "Ceramic": false,
        "Glass": false
    },
    "FaceCover": {
        "_COMMENT": "ONLY SET ONE OF THE FOLLOWING VALUES TO TRUE. THE REST SHOULD BE FALSE.",
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
        "_COMMENT": "Enable this to disable penetration of armor. (i.e., 0 throughput)",
        "Enabled": false
    }
}
```
#

### End
#