jdr
===
TODO
* Rule Set
    * Group of Abilities
        * Extendable or not extendable
    * Required abilities (must be filled)
    * Visible abilities (abilities visibles to everyone)
    * Hidden abilities (abilities hidden from everyone exept DM)
    * Computed abilities (provided calculation, can always be manually modified using bonus/malus)
    * "Spendable" abilities (used for action "costing" something, will be presented when creating an action)
    * Types or rolls (and their modifiers)
    * Base value for abilities + modifiers
    * Can register the rolls used to create characters (could be provided by the DM: for creation, 6x D20 rolled, with a custom explanation).
        * Could be proposed in the ruleset
        * Ruleset could have "variations" you can choose from for different steps (Char creations mode, char start at level X, char has specifics attributes, etc...)
        * Ruleset can have references: books or websites urls
    * Can be made a public ruleset (superadmin only)
    * Layout
        * Classic layout available
        * We can make custom layout for common ruleset (character sheet presentation for example)
    * Classic Items characs
    * Weapons characs
* Player sheets (& NPCs)
    * Can be modified by DM
    * Can be modified by the player
    * Is PC / NPC reserved feature
    * All modification registered and easily searchable (by DM or player)
    * Outside appearance description
    * Token system (Poker chips of Deadlands)
    * Spells token system (Spell slots)
    * Cost (mana cost, hp costs)
    * Reuse characters through different games of the same ruleset
* Setups
    * Taggable (ruleset / environnement (forest, city...) / epoch (futuristic)
    * Can have images
    * Can have ambient sounds/music
    * Can have maps (= image with placeable points)
    * Player can split and be in different setups
    * Can have linked NPC for easier retrieval
    * Can have clues
    * Prepared text quickly usable (Parcels)
* Maps
    * Optionnal (but cool)
    * Managed by the DM to provide information
    * Image were you can locate different pointers
    * Use leaflet
* Campaign (DM reserved)
    * Group of Scenarios (of the same rule set)
    * Rule set
    * Storyboard
    * Description, min/max of players, required level
* Combat
    * Order / Initiatives rolls
* Scenario (DM reserved)
    * Rule set
    * Storyboard
    * Description, min/max of players, required level
    * Setups
    * NPCs
    * Clues
    * Prepared text quickly usable (Parcels)
* Clues
    * Can be an image or text
    * Can be created before or on the fly
    * Can be linked to a setup or scenario
* Helps
    * NPC for different rulesets
        * NPC Library provided by other users
            * An NPC created from a model is tagged as a "variation" and cannot be customized further
        * NPC can be "public" to appear in the library (default)
    * Setups for different rulesets (or simply tagged but can be used in any ruleset)
    * ambient sounds & background & ?css?
* Ratings
    * Rating a player (with comments always, from DM or player from her game)
    * Rating a DM (with comments always, from player from her game)
    * Automatic ratings (plays every X time, regularity in playing, words typed per session/ per game)
    * Rating + Comments + "Used in" + "forks" of shared NPC models
    * Rating + Comments + "Used in" + "forks" of shared setups
* Game
    * Choose Language
        * FR & EN for now
    * Choose base ruleset & customize it
    * Choose number of players
    * Game state:
        * Building
        * waiting for players to start
        * in session with players and closed
        * in session with players but still open
        * Paused
        * Finished
    * Game types
        * Asynchronous (Turn based, DM launches turns where player have to declare actions. Depends on ruleset?)
        * Live (same as asynchronous, but players must be connected to the game together to run it, skype+chat to help for this mode)
    * Session
        * States
            * Open: everyone can act (DM & Players), the DM can choose to ignore some action (mark them as such)
            * Waiting for DM: DM turns to act
            * Waiting for Player X: Player X turn to act
            * Waiting for Player: waiting for any player to act
            * Paused
        * States can be automated (for example during a combat session)
* Action
    * Player describe action and rolls required (could be no rolls)
    * DM can add a roll, and/or modifiers to the roll and then declares if it is a success, miss or something else
    * DM makes small description of the result of the action
* Companion app
    * Notifications when you must play / answer players action
    * Easily type action description and choose dices to roll / modification to apply
* Tools & Others
    * Dice Throws (D666, D100, D20, Pair/Impair...)
    * Translatable
    * Chat
    * Skype integration
    * All roll registered, can be hidden from players (by default for DM)