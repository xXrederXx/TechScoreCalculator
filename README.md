<h1 align="center">Tech Score Calculator</h1><hr>
<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

## Overview
Tech Score Calculator is an intuitive tool designed to help users evaluate and compare the technical performance of computer components, including CPUs, SSDs, and RAM. By analyzing details from Geizhals URLs, the calculator provides valuable insights into specifications and compatibility, enabling users to make well-informed decisions when building or upgrading their PC setups. It is also able to check a build config for conflicts, like incompatible CPU and Motherboard

## Features
- **CPU Lookup**: Enter a Geizhals URL to retrieve detailed specifications and performance metrics for a CPU, including:
  - Speed Score
  - Memory Score
  - Number of Cores and Threads
  - Base and Boost Clock Speeds
  - Architecture
  - Chipsets
  - Cache Details
  - Power Consumption (TDP)
  - Supported DDR Versions
  - Price Range (Low, Mid, High)

- **SSD Lookup**: Enter a Geizhals URL to obtain SSD details, such as:
  - Capacity
  - Read/Write Speeds
  - IOPS (Input/Output Operations Per Second) Ratings
  - Price Range (Low, Mid, High)

- **RAM Lookup**: Enter a Geizhals URL to access information about RAM modules, including:
  - Speed
  - DDR Version
  - Latency and Timings (CL, tRCD, tRP, tRAS)
  - Price Range (Low, Mid, High)
- **Calculate Scores**: It can calculate scores based on the properties of the Component.
- **Pc Check**: Checks if there are conflicts between components.
- **And more...**
## How to Use

1. Install dependencies

   ```bash
   npm install
   ```

2. Run in a CMD

   ```bash
    cd /TechScoreCalculato/server
    tsc
   ```
3. Start the App

   ```bash
    node launcher.js
   ```

You should see some text idicating that a server was started on "localhost:3001" and after, metro should start. You can now go onto "localhost:8081"

## License
This project is licensed under the **IDK what license** license.

**You are free to:**
- Share and adapt the library for personal and commercial projects.

**Restrictions:**
- You may not sell this library as your own product.
- No attribution is required.
