
export interface CareerMilestone {
    year: number;
    title: string;
    description: string;
    position: [number, number, number];
    alignment: "left" | "right";
    assets: { type: string; path: string; label: string }[];
}

export const CAREER_MILESTONES: CareerMilestone[] = [
    {
        year: 2021,
        title: "Diploma Completion",
        description: "The foundation of my engineering journey. Mastering microcontrollers and embedded systems.",
        position: [0, 0, 0], // x, y, z in 3D space
        alignment: "right",
        assets: [
            { type: "image", path: "/assets/workingonarduinounoandmega.jpg", label: "Arduino Prototypes" },
            { type: "image", path: "/assets/workingonarduinonanoandtb6612fng.jpg", label: "Motor Drivers" },
            { type: "image", path: "/assets/home-automation.png", label: "IoT Home Automation" }
        ]
    },
    {
        year: 2022,
        title: "B.Tech & QA Trainee",
        description: "Starting Electronics Engineering & entering the professional world.",
        position: [0, 0, -20],
        alignment: "left",
        assets: [
            { type: "image", path: "/assets/myworkingtable.jpeg", label: "Workstation Setup" },
            { type: "image", path: "/assets/blind-glasses.png", label: "Blind Glasses Project" },
            { type: "image", path: "/assets/3.5inchtftouchRPIdisplay.png", label: "RPI Display Interface" },
            { type: "image", path: "/assets/racing-car.png", label: "Formula Student" }
        ]
    },
    {
        year: 2023,
        title: "IoT Systems Engineer",
        description: "Developing scalable real-time monitoring solutions for environmental data.",
        position: [5, 1, -30],
        alignment: "right",
        assets: [
            { type: "image", path: "/assets/water-quality.jpg", label: "Water Quality Monitor" },
            { type: "image", path: "/assets/smart-bridge.png", label: "Smart Bridge System" }
        ]
    },
    {
        year: 2024,
        title: "VLSI Internship",
        description: "Deep dive into Chip Design & Hardware Verification. Building complex robotic systems.",
        position: [10, 2, -40], // Curve to the right and up
        alignment: "left",
        assets: [
            { type: "image", path: "/assets/linefollowingrobotPIDfast.jpeg", label: "PID Line Follower" },
            { type: "image", path: "/assets/gesture_sys.png", label: "Gesture System" },
            { type: "image", path: "/assets/techfest-win.png", label: "Techfest Winner" },
            { type: "image", path: "/assets/iit-bombay-profile.jpg", label: "IIT Bombay" }
        ]
    },
    {
        year: 2025,
        title: "AI & Robotics Trainer",
        description: "Mentoring over 600+ students. Leading the next generation of innovators.",
        position: [-5, 0, -60], // Curve back left
        alignment: "right",
        assets: [
            { type: "video", path: "/assets/sahayikaAIintrovideo.mp4", label: "Sahayika AI" },
            { type: "image", path: "/assets/studentsdoingtheirworkiamguidingthem.jpg", label: "Mentorship" },
            { type: "image", path: "/assets/hero-robot-2025.png", label: "Heavy Load Robot" },
            { type: "image", path: "/assets/drone-hand-held.png", label: "Custom Drone Frame" },
            { type: "image", path: "/assets/sahayikaAIPhotoraspberrypi.jpg", label: "AI Hardware" },
            { type: "image", path: "/assets/workshop-students.png", label: "Robotics Workshop" }
        ]
    },
    {
        year: 2026,
        title: "M.Tech AI & ML",
        description: "BITS Pilani - The Next Frontier. Advancing into applied Artificial Intelligence.",
        position: [0, 5, -80], // Ascending to the future
        alignment: "left",
        assets: [
            { type: "image", path: "/assets/mypersonalphoto3.JPG", label: "The Architect" }
        ]
    }
];
