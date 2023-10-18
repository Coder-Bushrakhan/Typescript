"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const nameAnswer = yield inquirer_1.default.prompt([
            {
                type: "string",
                name: "Name",
                message: "Enter Your Name",
            },
        ]);
        console.log(`Hello, ${nameAnswer.Name}! Welcome to the Zombie Hunting Adventure!\n`);
        let playerHealth = 100;
        let zombies = 3;
        while (playerHealth > 0 && zombies > 0) {
            const answer = yield inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "action",
                    choices: ["Balcony", "livingroom", "bedroom", "quit"],
                    message: "You are in the safehouse. Where would you like to explore?",
                },
            ]);
            if (answer.action === "quit") {
                console.log("You decided to quit the game. Game Over.");
                break;
            }
            const zombiesHere = Math.random() < 0.5; // 50% chance of encountering zombies
            if (zombiesHere) {
                console.log(`You encounter zombies while exploring the ${answer.action}!`);
                const fightChoice = yield inquirer_1.default.prompt([
                    {
                        type: "confirm",
                        name: "fight",
                        message: "Do you want to fight the zombies?",
                    },
                ]);
                if (fightChoice.fight) {
                    console.log("You engage in a fight with the zombies...");
                    const zombiesKilled = Math.floor(Math.random() * 3) + 1;
                    zombies -= zombiesKilled;
                    console.log(`You eliminate ${zombiesKilled} zombies! ${zombies} zombies remaining.`);
                }
                else {
                    console.log("You choose to flee from the zombies. Your health decreases.");
                    playerHealth -= 20;
                    if (playerHealth <= 0) {
                        console.log("Oh no! Your health has reached zero. Game Over.");
                        break;
                    }
                }
            }
            else {
                console.log(`You explore the ${answer.action} and find no zombies.`);
            }
            console.log(`Your health: ${playerHealth}%\n`);
        }
        if (zombies === 0) {
            console.log("Congratulations! You've eliminated all the zombies and saved the safehouse.");
        }
    });
}
main();
