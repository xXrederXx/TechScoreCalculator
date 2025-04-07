// Launcher.js

// Use "pkg launcher.js -t node*-win-x64 -o ./out/expo-launcher.exe" To create .exe
// also add new package.json next to the output file
/*
Compile TypeScript Before Running the Launcher
Before running the launcher, compile your server.ts file:

cd server
npx tsc 
*/

const { spawn } = require("child_process");
const path = require("path");

// Define paths
const expoCommand = "npx";
const nodeCommand = "node";

// Absolute paths
const serverPath = path.resolve(__dirname, "./server/dist/server.js");
console.log(serverPath);


// Start Expo on port 8081
const expoProcess = spawn(expoCommand, ["expo", "start", "--web"], {
    shell: true, 
    stdio: "inherit",
});

// Start Server
const serverProcess = spawn(nodeCommand, [serverPath], {
    shell: true, 
    stdio: "inherit",
    cwd: "./server"
});

// Handle process errors
expoProcess.on("error", (err) => console.error(`❌ Error starting Expo: ${err.message} + Stack ${err.stack} + cause ${err.cause}`));
serverProcess.on("error", (err) => console.error(`❌ Error starting Server: ${err.message} + Stack ${err.stack} + cause ${err.cause}`));

// Ensure both processes exit together
function shutdown(msg) {
    console.log("Shutting down...\nReason: "+msg);
    expoProcess.kill();
    serverProcess.kill();
    process.exit();
};

expoProcess.on("exit", () => shutdown("Expo Process Exit"));
serverProcess.on("exit", () => shutdown("Server Process Exit"));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
