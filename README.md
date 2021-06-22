# Bandana of Protection

This mod adds a new version of the bandana (half-mask) and adds armor protection for body parts based on how the configuration file is edited.

>Author  : jbs4bmx

>Version : 2.0.4 (Supports SPT-AKI 1.*)



### Configuration Guide

You can specify the following configurations in the "\config\config.json" file.
1. "Main Armor" and "Head Segments" are boolean values and must be input as true or false.
   - Values other than true or false will default to true.
2. "Resources" are the property values represented by whole numbers. You can input any value from 1 to 9999999.
   - For RepairCost, marketPrice, and traderPrice, any value below 1 or greater than 9999999 will default to 100000.
   - For Durability, values below 1 or greater than 9999999 will default to 100.
   - For minTraderLevel, values below 1 or greater than 4 will default to 2.

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
        "minTraderLevel": 1,    // [Integer] value must be a whole number - Sets the minimum required trader level to acquire this item. (1-4)
        "marketPrice": 1,       // [Integer] value must be a whole number - Sets the Flea Market price of the item. (1-9999999)
        "traderPrice": 1        // [Integer] value must be a whole number - Sets the Ragman price of the item. (1-9999999)
    },
    "other": {
        "HideWarningMessage": false     // Verify that you have read this document and the configuration file.
    }
}
```