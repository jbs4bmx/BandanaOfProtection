# Bandana of Protection
This mod adds a new version of the bandana (half-mask) and adds armor protection for body parts based on how the configuration file is edited.

>Author  : jbs4bmx

>Version : 2.0.2 (Supports SPT-AKI 1.2.0) (Tested and verified on Client 0.12.10.2.12102)



### Configuration Guide
You can specify the following configurations in the "\config\config.json" file.
1. "Main Armor" and "Head Segments" are boolean values and must be input as true or false.
2. "Resources" are the property values represented by whole numbers.
  * Values should be between 1 and 9999999

```json
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
        "RepairCost": 42069,     // [Integer] value must be a whole number - Sets the cost to repair the item.
        "Durability": 1000,      // [Integer] value must be a whole number - Sets the durability amount of the item.
        "minTraderLevel": 2,     // [Integer] value must be a whole number - Sets the minimum required trader level to acquire before you can purchase this item.
        "marketPrice": 1010101,  // [Integer] value must be a whole number - Sets the Flea Market price of the item.
        "traderPrice": 1234567   // [Integer] value must be a whole number - Sets the Ragman price of the item.
    },
    "other": {
        "HideWarningMessage": false   // Verify that you have read this document and the configuration file by setting this to true.
    }
}
```
