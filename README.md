<a id="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jbs4bmx/BandanaOfProtection">
    <img src="./images/BOPBanner.png" alt="logo" width="640" height="320">
  </a>

  <h3 align="center">Bandana Of Protection</h3>

  <p align="center">More armor!<br /></p>

  [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X611JH15)
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#configuration">Configuration</a>
      <ul>
        <li><a href="#mod-faq">Mod FAQ</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Type: Server Mod</br>
Disclaimer: **This mod is provided _as-is_ with _no guarantee_ of support.**

This mod adds a new version of the face cover of your choosing and adds armor protection for body parts based on how the configuration file is edited.

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
| Frameworks/Libraries                                      | Name         | Link                                       |
| :-------------------------------------------------------: | :----------: | :----------------------------------------: |
| <img src="./images/icons/TypeScript.svg" width="48">      | `TypeScript` | [TypeScript Website][TypeScript-url]       |

|                         IDEs                                |      Name       | Link                                      |
| :---------------------------------------------------------: | :-------------: | :---------------------------------------: |
| <img src="./images/icons/VSCodium-Dark.svg" width="48">     | `VSCodium`      | [VSCodium Website][Vscodium-url]          |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
This section will explain how to install and use this mod.

### Prerequisites
EFT and SPT are required to use this mod.

### Installation
_For the purpose of these directions, "[SPT]" represents your SPT folder path._

Start by downloading the mod from the [Releases](https://github.com/jbs4bmx/BandanaOfProtection/releases) page.

Follow these steps to install and configure the mod:
  1. Extract the contents of the zip file into the root of your [SPT] folder.
     - That's the same location as "SPT.Server.exe" and "SPT.Launcher.exe".
  2. Edit the Config to adjust the values to your liking.
  3. Start SPT.Server.exe and wait until it fully loads.
  4. Start SPT.Launcher.exe.
  5. Now you can launch the game and profit.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONFIGURATION EXAMPLES -->
## Configuration
Edit '.\config.jsonc' file as desired. Specify which areas to protect, the amount of protection, and which item you want BoP to look like. You can even customize trader pricing and loyalty level requirements to make it easier or harder on yourself to acquire this item.<br>
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Mod FAQ
**Q: Where do I report bugs found with the current version of the mod?** <br>
A: You can report bugs for the current version of this mod on the [BoP Mod Page](https://hub.sp-tarkov.com/files/file/142-bandana-of-protection/).

**Q: Why can't I see the different prefab for the facecover?** <br>
A: Make sure you only have one of the options set to true. The remaining prefab options should be false. Before you launch the game, be sure to clear (delete) the cache files.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
- [X] Add Changelog
- [ ] Fix bugs found/reported in SPT 3.9.5

Suggest changes or view/report issues [here](https://github.com/jbs4bmx/BandanaOfProtection/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

You can also buy me a coffee! (This is not required, but I greatly appreciate any support provided.)</br>
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X611JH15)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
Contributors:
  1. [sugonyak](https://hub.sp-tarkov.com/user/24725-sugonyak)
     - Assitance in testing and bug fixes.
  2. [ShadowXtrex](https://hub.sp-tarkov.com/user/16610-shadowxtrex)
     - Assitance in testing and bug fixes.
     - Code optimizations.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Repository Metrics -->
[contributors-shield]: https://img.shields.io/github/contributors/jbs4bmx/BandanaOfProtection.svg?style=for-the-badge
[contributors-url]: https://github.com/jbs4bmx/BandanaOfProtection/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jbs4bmx/BandanaOfProtection.svg?style=for-the-badge
[forks-url]: https://github.com/jbs4bmx/BandanaOfProtection/network/members
[stars-shield]: https://img.shields.io/github/stars/jbs4bmx/BandanaOfProtection.svg?style=for-the-badge
[stars-url]: https://github.com/jbs4bmx/BandanaOfProtection/stargazers
[issues-shield]: https://img.shields.io/github/issues/jbs4bmx/BandanaOfProtection.svg?style=for-the-badge
[issues-url]: https://github.com/jbs4bmx/BandanaOfProtection/issues
[license-shield]: https://img.shields.io/github/license/jbs4bmx/BandanaOfProtection.svg?style=for-the-badge
[license-url]: https://github.com/jbs4bmx/BandanaOfProtection/blob/master/LICENSE.txt



<!-- Framwork/Library URLs -->
[TypeScript-url]: https://www.typescriptlang.org/
[Vscodium-url]: https://vscodium.com/
