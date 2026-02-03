
export interface SkillNode {
    id: string;
    label: string;
    group: "ai" | "robotics" | "iot" | "vlsi" | "core";
    position: [number, number, number];
}

export interface SkillLink {
    source: string;
    target: string;
}

export const SKILL_NODES: SkillNode[] = [
    // Core Domains (Center-ish)
    { id: "ai", label: "Artificial Intelligence", group: "core", position: [0, 2, 0] },
    { id: "robotics", label: "Robotics", group: "core", position: [-2, -1, 1] },
    { id: "vlsi", label: "VLSI Design", group: "core", position: [2, -1, 1] },
    { id: "iot", label: "IoT & Embedded", group: "core", position: [0, -2, -1] },

    // AI & ML Cluster (Top/Center)
    { id: "python", label: "Python", group: "ai", position: [1, 4, 1] },
    { id: "tensorflow", label: "TensorFlow", group: "ai", position: [-1, 4.5, 0] },
    { id: "pytorch", label: "PyTorch", group: "ai", position: [0.5, 5, -1] },
    { id: "cv", label: "Computer Vision", group: "ai", position: [-2, 3, 0] },

    // Robotics Cluster (Left)
    { id: "ros", label: "ROS", group: "robotics", position: [-4, 0, 2] },
    { id: "pid", label: "PID Control", group: "robotics", position: [-5, -2, 1] },
    { id: "cpp", label: "C++", group: "robotics", position: [-3, 1, 3] },
    { id: "drones", label: "Autonomous Drones", group: "robotics", position: [-4, -3, 0] },

    // VLSI Cluster (Right)
    { id: "verilog", label: "Verilog", group: "vlsi", position: [4, 0, 2] },
    { id: "cadence", label: "Cadence Virtuoso", group: "vlsi", position: [5, -2, 1] },
    { id: "vivado", label: "Xilinx Vivado", group: "vlsi", position: [4, 1, 3] },
    { id: "kicad", label: "Ki-Cad", group: "vlsi", position: [3, -3, 0] },

    // IoT Cluster (Bottom)
    { id: "rpi", label: "Raspberry Pi", group: "iot", position: [-1, -4, 2] },
    { id: "arduino", label: "Arduino", group: "iot", position: [1, -5, 1] },
    { id: "esp32", label: "ESP32", group: "iot", position: [0, -6, 0] },
    { id: "linux", label: "Linux", group: "iot", position: [2, -4, 2] },
];

export const SKILL_LINKS: SkillLink[] = [
    // Connecting Clusters to Core
    { source: "ai", target: "python" },
    { source: "ai", target: "tensorflow" },
    { source: "ai", target: "pytorch" },
    { source: "ai", target: "cv" },

    { source: "robotics", target: "ros" },
    { source: "robotics", target: "pid" },
    { source: "robotics", target: "cpp" },
    { source: "robotics", target: "drones" },

    { source: "vlsi", target: "verilog" },
    { source: "vlsi", target: "cadence" },
    { source: "vlsi", target: "vivado" },
    { source: "vlsi", target: "kicad" },

    { source: "iot", target: "rpi" },
    { source: "iot", target: "arduino" },
    { source: "iot", target: "esp32" },
    { source: "iot", target: "linux" },

    // Cross-Domain Connections (The "Synapses")
    { source: "python", target: "robotics" }, // Python used in Robotics
    { source: "cpp", target: "iot" }, // C++ used in IoT
    { source: "rpi", target: "cv" }, // CV often runs on RPi
    { source: "rpi", target: "python" },
    { source: "arduino", target: "robotics" },
    { source: "pid", target: "drones" },
    { source: "verilog", target: "kicad" }, // Hardware design link
    { source: "linux", target: "ai" },
    { source: "robotics", target: "ai" }, // AI + Robotics = TRUE
    { source: "robotics", target: "iot" },
    { source: "iot", target: "vlsi" },
];

export const GROUP_COLORS = {
    core: "#ffffff", // White
    ai: "#00f3ff",   // Cyan
    robotics: "#bc13fe", // Purple
    vlsi: "#facc15",  // Yellow
    iot: "#4ade80"    // Green
};
