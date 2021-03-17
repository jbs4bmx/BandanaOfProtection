# Bandana-OF-Protection
Modification of the in-game item "Lower Half-Mask" for SPT-AKI


This mod adds a new version of the bandana (half-mask) and adds armor protection for body parts based on how the configuration file is edited.



### Configuration Guide

You can specify the following configurations in the "\config\config.json" file.
1. "Main Armor" and "Head Segments" are boolean values and must be input as true or false.
   - No other values will be accepted for these.
   - Values other than true or false will default to false.
2. "Resources" are the property values represented by whole numbers. You can input any value from 1 to 9999999.
   - If you input 0 for any of the values, the mod will default to 1.
   - If you input higher than 9999999, it will default to 9999999. (That is a max of 7 nines.)
   - Negative numbers will also default to 1.

```
{
    "MainArmor": {
        "Head": true,       // [Boolean] value must be set to true or false - Set to true to enable protection for the specified body Part.
        "Thorax": true,     // [Boolean]
        "Stomach": true,    // [Boolean]
        "LeftArm": true,    // [Boolean]
        "RightArm": true,   // [Boolean]
        "LeftLeg": true,    // [Boolean]
        "RightLeg": true    // [Boolean]
    },
    "HeadAreas": {
        "Top": true,    // [Boolean] value must be set to true or false - Set to true to enable protection for the specified body Part.
        "Nape": true,   // [Boolean]
        "Ears": true,   // [Boolean]
        "Eyes": true,   // [Boolean]
        "Jaws": true    // [Boolean]
    },
    "Resources": {
        "RepairCost": 1,        // [Integer] value must be a whole number - Sets the cost to repair the item.
        "Durability": 1,        // [Integer] value must be a whole number - Sets the durability amount of the item.
        "minTraderLevel": 1,    // [Integer] value must be a whole number - Sets the minimum required trader level to acquire before you can purchase this item.
        "marketPrice": 1,       // [Integer] value must be a whole number - Sets the Flea Market price of the item.
        "traderPrice": 1        // [Integer] value must be a whole number - Sets the Ragman price of the item.
    },
    "other": {
        "HideWarningMessage": false     // Verify that you have read this document and the configuration file.
    }
}
```
