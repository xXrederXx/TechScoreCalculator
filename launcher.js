// Use "pkg launcher.js -t node*-win-x64 -o ./out/expo-launcher.exe" To create .exe

const { spawn } = require("child_process");

const expoProcess = spawn("npx", ["expo", "start", "--web"], {
    shell: true, // Ensures it works in Windows CMD
    stdio: "inherit", // Pipes logs directly to console
});

expoProcess.on("error", (err) => {
    console.error(`❌ Error starting Expo: ${err.message}`);
});

expoProcess.on("exit", (code) => {
    console.log(`Expo process exited with code ${code}`);
});


