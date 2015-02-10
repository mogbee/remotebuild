/// <reference path="../../typings/taco-utils.d.ts" />
/// <reference path="../../typings/node.d.ts" />
/// <reference path="../../typings/cordova.d.ts" />
/// <reference path="../../typings/cordova.d.ts" />

import tacoUtility = require ("taco-utils");
import resourcesManager = tacoUtility.ResourcesManager;
import commands = tacoUtility.Commands;
import commandsFactory = commands.CommandFactory;
import path = require ("path");
var cordova = require("cordova");

/*
 * Taco
 *
 * Main Taco class
 */
class Taco {
    /*
     * Initialize all other config classes, Invoke task to be run
     */
    public static run(): void {
        var resourcePath: string = path.join(__dirname, "../resources");
        resourcesManager.init("en", resourcePath);
        commandsFactory.init(path.join(__dirname, "../cli/commands.json"));
        
        // parse taco command
        var input: string = process.argv[2];
        var command: commands.ICommand = null;

        // get appropriate task
        if (!input) {
            input = "help";
        }                 

        var cordovaCliArgs = process.argv;
        var commandArgs = process.argv.slice(3);
        command = commandsFactory.getTask(input, commandArgs, __dirname);        

        // if no command found that can handle these args, route args directly to Cordova
        if (command) {
            command.run(commandArgs);
        } else {
            cordova.cli(cordovaCliArgs);            
        }
    }
}

export = Taco;