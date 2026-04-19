"use strict";
(() => {
  // src/siteConfig.ts
  var siteConfig = {
    BRAND: {
      NAME: "CHRONALLABS",
      SYSTEM_ID: "NODE_001_STABLE",
      VERSION: "V1.2.5",
      LICENSE: "MIT_LICENSE",
      GEO: "INDIA_ZONE",
      BUILD_MODE: "COMMUNITY_STABLE"
    },
    HERO: {
      LABEL: "/ CIVIC_SYSTEMS_INSTITUTE",
      TAGLINE: "ENGINEERING PUBLIC SYSTEMS WITH CODE",
      TITLE_LINE_1: "CHRONAL",
      TITLE_LINE_2: "LABS",
      EXPLORE_URL: "https://github.com/ChronalLabs",
      KEYWORDS: ["CIVIC_SYSTEMS", "AI_GOVERNANCE", "OPEN_INFRASTRUCTURE", "PUBLIC_DATA", "RTI_TOOLS", "DIGITAL_GOVERNANCE"]
    },
    ABOUT: {
      LABEL: "/ ABOUT_CHRONALLABS",
      MANIFESTO: "ChronalLabs is an open-source community building AI-driven civic tools.",
      DESCRIPTION: "We design systems that help citizens interact with governance, transparency, and public institutions using open technology."
    },
    PHILOSOPHY: [
      { id: "01", title: "Civic Impact", description: "We focus on building tools that solve real-world governance and public access problems.", type: "square" /* SQUARE */ },
      { id: "02", title: "Open Source First", description: "We believe in transparency, collaboration, and community-driven development.", type: "circle" /* CIRCLE */ },
      { id: "03", title: "Responsible AI", description: "We design AI systems that are ethical, explainable, and accessible.", type: "triangle" /* TRIANGLE */ }
    ],
    IMPACT: {
      LABEL: "/ IMPACT_LAYER",
      HEADLINE: "IMPACT_ IN_PROGRESS",
      DESCRIPTION: "ChronalLabs is building foundational civic systems. Our impact is measured in open prototypes, public tools, and community-driven innovation \u2014 not just numbers.",
      SYSTEMS: [
        { name: "RTI_GENERATOR", status: "ACTIVE" },
        { name: "COMPLAINT_ENGINE", status: "PROTOTYPE" },
        { name: "MULTILINGUAL_LAYER", status: "DEVELOPMENT" },
        { name: "CIVIC_DATA_FRAMEWORK", status: "DESIGN" },
        { name: "COMMUNITY_NETWORK", status: "GROWING" }
      ],
      NARRATIVE: [
        "Simplifying access to public information",
        "Reducing complexity in governance processes",
        "Enabling AI-assisted civic participation",
        "Building open-source civic infrastructure",
        "Empowering contributors to solve real problems"
      ]
    },
    STATS: [
      { label: "CONTRIBUTORS", value: "50+" },
      { label: "PROJECTS", value: "12+" },
      { label: "COMMITS", value: "600+" },
      { label: "LANGUAGES", value: "6+" }
    ],
    RESEARCH: {
      DOMAINS: [
        "AI_GOVERNANCE",
        "RTI_SYSTEMS",
        "CIVIC_DATA",
        "NLP_TOOLS",
        "OPEN_INFRASTRUCTURE",
        "PUBLIC_FINANCE",
        "POLICY_SIMULATION",
        "AUTONOMOUS_GOVERNANCE"
      ],
      STATUS: "STABLE",
      CAPACITY: "EXPANDING"
    },
    PROJECTS: [
      {
        id: "01",
        index: "01",
        title: "AI Public Complaint & RTI Generator",
        description: "A comprehensive framework leveraging Natural Language Processing to automate the generation of formal public complaints and Right to Information requests.",
        tech: ["Python", "NLP", "Prompt Engineering", "Civic Stack"],
        github: "https://github.com/ChronalLabs/AI-Powered-Public-Complaint-and-RTI-Generator",
        category: "Flagship Systems"
      },
      {
        id: "02",
        index: "02",
        title: "RTI Application Generator",
        description: "Specialized modular tool for structuring legal information requests. Focuses on document precision and procedural compliance for public information transparency.",
        tech: ["Python", "Document Logic", "Automation"],
        github: "https://github.com/ChronalLabs/RTI-APPLICATION-GENERATOR",
        category: "Civic Tools"
      },
      {
        id: "03",
        index: "03",
        title: "Civic Expense Tracker",
        description: "A financial transparency utility designed to track and categorize civic expenditures, bringing data-driven clarity to public budget management.",
        tech: ["React", "Data Visualization", "Civic Finance"],
        github: "https://github.com/ChronalLabs/AI-Powered-Public-Complaint-and-RTI-Generator/tree/master/Expense%20Tracker",
        category: "Experimental Projects"
      },
      {
        id: "04",
        index: "04",
        title: "Agro Vision",
        description: "An AI-powered agritech solution for intelligent crop prediction, disease detection, and sustainable farm management.",
        tech: ["Python", "Machine Learning", "Computer Vision"],
        github: "https://github.com/ChronalLabs/ChronOS/tree/master/Agro%20Vision",
        category: "Experimental Projects"
      },
      {
        id: "05",
        index: "05",
        title: "Blood Connect",
        description: "A centralized platform connecting active blood donors with individuals and hospitals in emergency need, optimizing inventory.",
        tech: ["Web Tech", "Database", "Real-time Routing"],
        github: "https://github.com/ChronalLabs/ChronOS/tree/master/Blood%20Connect",
        category: "Experimental Projects"
      },
      {
        id: "06",
        index: "06",
        title: "CIVISM",
        description: "An integrated civic engagement platform aimed at fostering active citizen participation and streamlining public issue tracking.",
        tech: ["Civic Engine", "Web Development", "Community"],
        github: "https://github.com/ChronalLabs/ChronOS/tree/master/CIVISM",
        category: "Experimental Projects"
      },
      {
        id: "07",
        index: "07",
        title: "EcoTrack",
        description: "Personal Carbon Footprint Intelligence System. Tracks and analyzes individual environmental impact to encourage sustainable habits.",
        tech: ["Python", "Data Analytics", "EcoTech"],
        github: "https://github.com/ChronalLabs/ChronOS/tree/master/EcoTrack%20%E2%80%93%20Personal%20Carbon%20Footprint%20Intelligence%20System%20Using%20Python",
        category: "Experimental Projects"
      },
      {
        id: "08",
        index: "08",
        title: "EduGuard",
        description: "A dedicated School Grievance & Feedback System designed for educational institutions to effectively manage student and parent feedback.",
        tech: ["System Design", "Web Technologies", "Education"],
        github: "https://github.com/ChronalLabs/ChronOS/tree/master/EduGuard%20%E2%80%93%20School%20Grievance%20%26%20Feedback%20System",
        category: "Experimental Projects"
      },
      {
        id: "09",
        index: "09",
        title: "Fix Civic",
        description: "A robust public infrastructure reporting tool that allows citizens to flag and track local civic issues for faster administrative resolution.",
        tech: ["Civic Automation", "Map Integration"],
        github: "https://github.com/ChronalLabs/ChronOS/tree/master/Fix%20Civic",
        category: "Experimental Projects"
      },
      {
        id: "10",
        index: "10",
        title: "Green Atlas",
        description: "An environmental mapping platform focused on monitoring green coverage, biodiversity hotspots, and analyzing geospatial ecological data.",
        tech: ["GIS", "Python", "Data Visualization"],
        github: "https://github.com/ChronalLabs/ChronOS/tree/master/GreenAtlas",
        category: "Experimental Projects"
      },
      {
        id: "11",
        index: "11",
        title: "Skillflare",
        description: "A skill development and assessment platform providing tailored learning trajectories, verified resources, and interactive competency tracking.",
        tech: ["EdTech", "React", "Analytics"],
        github: "https://github.com/ChronalLabs/ChronOS/tree/master/Skillflare",
        category: "Experimental Projects"
      },
      {
        id: "12",
        index: "12",
        title: "Mantessa",
        description: "An advanced studying and learning management system designed to optimize student workflows and overall academic productivity.",
        tech: ["Web App", "Productivity"],
        github: "https://github.com/arin-gupta06/StudyOS_Vivek-Arin_Version",
        category: "Experimental Projects"
      }
    ],
    TEAM: {
      CORE: {
        name: "MANAN CHAWLA",
        role: "Google Cloud Platform Engineer",
        bio: "Open-source contributor and developer focused on civic technology and AI systems.",
        linkedin: "https://www.linkedin.com/in/mananchawla26/",
        github: "https://github.com/Manan-Chawla"
      },
      CONTRIBUTORS: [
        { id: "01", name: "Anurag Mishra", linkedin: "https://www.linkedin.com/in/anuragmishra5159/", github: "https://github.com/anuragmishra5159" },
        { id: "02", name: "Ananya Sharma", linkedin: "https://www.linkedin.com/in/ananya-sharma-dev/", github: "https://github.com/ananyascodes" },
        { id: "03", name: "Ananya Tiwari", linkedin: "https://www.linkedin.com/in/ananya-tiwari-devs/", github: "https://github.com/Ananya3107" },
        { id: "04", name: "Arin Gupta", linkedin: "https://www.linkedin.com/in/arin-gupta-2b94b032a", github: "https://github.com/arin-gupta06" },
        { id: "05", name: "Krish Dargar", linkedin: "https://www.linkedin.com/in/krish-dargar-101774324/", github: "https://github.com/KD2303" },
        { id: "06", name: "Yogesh Sanodiya", linkedin: "https://www.linkedin.com/in/yogesh-sanodiya-8a2816298/", github: "https://github.com/yogeshsanodiya59-web" },
        { id: "07", name: "Vivek Chaurasiya", linkedin: "https://www.linkedin.com/in/vivek-chaurasiya-722037315/", github: "https://github.com/VivekChaurasiya95" },
        { id: "08", name: "Sheetal Gourh", linkedin: "https://www.linkedin.com/in/sheetal-gourh-994272339/", github: "https://github.com/sheetal783" },
        { id: "09", name: "Sarvesh Baghel", linkedin: "https://www.linkedin.com/in/sarvesh-baghel-b3a726274/", github: "https://github.com/sarveshbaghel" },
        { id: "10", name: "Rishabh Hinduja", linkedin: "https://www.linkedin.com/in/rishabh-hinduja-66606a25b/", github: "https://github.com/rishabhhinduja" },
        { id: "11", name: "Priyanjal Paliwal", linkedin: "https://www.linkedin.com/in/priyanjal-paliwal-806534331/", github: "https://github.com/paliwalpriyanjal-hash" }
      ]
    },
    CONTRIBUTE_PROTOCOLS: [
      {
        number: "01",
        title: "CONTRIBUTE_CODE",
        description: "Work on open-source civic tools, APIs, and system prototypes designed to decentralize information access.",
        actionLabel: "VIEW_REPOSITORIES",
        href: "https://github.com/ChronalLabs"
      },
      {
        number: "02",
        title: "CONTRIBUTE_RESEARCH_&_IDEAS",
        description: "Help define problem statements, workflows, and system designs for civic technology in public interest.",
        actionLabel: "EXPLORE_IDEAS",
        href: "#"
      },
      {
        number: "03",
        title: "JOIN_GSOC_PROJECTS",
        description: "Collaborate on structured project ideas designed for Google Summer of Code and long-term development.",
        actionLabel: "VIEW_GSOC_IDEAS",
        href: "#"
      },
      {
        number: "04",
        title: "JOIN_THE_COMMUNITY",
        description: "Engage with developers and researchers to help shape the strategic direction of ChronalLabs.",
        actionLabel: "CONNECT",
        href: "#"
      }
    ]
  };
})();
