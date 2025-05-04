export const broadcastingCourses = {
  title: "Course Outline for Certificate Course",
  about_programme: {
    description:
      "The Broadcasting Certificate Programme is designed to build practical broadcasting skills and media literacy for aspiring professionals and media enthusiasts.",
    tracks: [
      {
        name: "Beginner",
        duration: "1 Month",
        slug: "beginner-certificate",
      },
      {
        name: "Intermediate",
        duration: "2 Months",
        slug: "intermediate-certificate",
      },
      {
        name: "Advanced Certificate Programme",
        duration: "4 Months",
        slug: "advanced-certificate",
      },
    ],
    highlight: [
      "Industry-relevant curriculum",
      "Practical studios and production labs",
      "Learn from experienced professionals",
      "Suitable for job seekers and early-career professionals",
      "Earn a recognized certificate upon completion",
    ],
  },
  beginner: {
    title: "Beginner Certificate in Broadcasting",
    duration: "1 Month",
    credit_hours: 6,
    level: "Entry-Level",
    slug: "beginner-certificate",
    target_audience: "Absolute beginners with no prior experience",
    goal: "Build foundational skills in broadcasting, media communication, and production.",
    expected_outcomes: [
      "Understand basic broadcasting workflows and ethics",
      "Write and present basic scripts",
      "Operate beginner-friendly studio tools",
      "Produce a short segment for radio/TV",
    ],
    weeks: [
      {
        week: 1,
        title: "Introduction to Broadcasting",
        credit_hours: 1.5,
        overview:
          "An accessible start to understanding the structure, history, and roles within the broadcasting industry—including TV, radio, and digital platforms.",
        modules: [
          "What is Broadcasting? (Radio, TV, Digital)",
          "Key Milestones: Radio to Streaming",
          "Roles in Broadcasting: Producers, Presenters, Engineers",
          "Programming Types: News, Talk Shows, Drama",
          "Functions of Radio & TV",
          "Introduction to Digital Broadcasting",
          "Ethical Guidelines in Media (Truth, Responsibility)",
        ],
        assessment:
          "Quiz + Group discussion: 'Which broadcast platform appeals most to you and why?'",
      },
      {
        week: 2,
        title: "Broadcast Communication & Scriptwriting Skills",
        credit_hours: 1.5,
        overview:
          "Build effective verbal and non-verbal communication skills, public speaking confidence, and basic writing for media.",
        modules: [
          "Voice Training: Tone, Articulation, Breathing",
          "Public Speaking & On-Air Presence",
          "Scriptwriting Basics: Headlines, Copywriting",
          "Interviewing 101: Open-Ended Questions & Listening",
          "Audience Engagement: Who's Watching/Listening and Why",
          "Cultural Sensitivity & Audience Diversity",
        ],
        assessment: "Record a 90-second bulletin + Class listening critique",
      },
      {
        week: 3,
        title: "Introduction to Equipment & Ethics in Media",
        credit_hours: 1.5,
        overview:
          "Get hands-on with beginner-level tools while learning key safety and ethical practices in a studio environment.",
        modules: [
          "Studio Tools: Microphones, Cameras, Mixers",
          "Filming with Smartphones: Framing, Lighting",
          "Audio Recording: Audacity or Anchor",
          "Simple Video Editing: iMovie, CapCut Basics",
          "Studio Safety & Workspace Setup",
          "Intro to Media Ethics: Fairness, Privacy, Accuracy",
          "Communicating Across Cultures",
        ],
        assessment:
          "Submit a 1-minute edited audio or video clip + short ethics quiz",
      },
      {
        week: 4,
        title: "Mini Production Project & Final Assessment",
        credit_hours: 1.5,
        overview:
          "Apply all skills learned to create your first broadcast segment with team-based support and peer review.",
        modules: [
          "Ideating a Show: Format, Audience, Content",
          "Structuring a Script: Intro, Core Message, Outro",
          "Guided Studio Practice: Record a 3-minute segment",
          "Peer Review & Feedback Techniques",
          "Preparing for a Live or Recorded Presentation",
        ],
        assessment:
          "Final Project: Produce a 2–3 min talk show or news segment + Voice Demo Submission + Wrap-up Quiz & Instructor Evaluation",
      },
    ],
  },
  intermediate: {
    title: "Intermediate Certificate in Broadcasting",
    duration: "2 Months",
    credit_hours: 12,
    level: "Mid-Level",
    slug: "intermediate-certificate",
    target_audience: "Learners with basic knowledge or prior beginner course",
    goal: "Develop content creation, field reporting, editing, and critical analysis skills.",
    expected_outcomes: [
      "Create scripted and unscripted content for multiple formats",
      "Conduct interviews and gather field reports",
      "Edit and package stories using digital tools",
      "Understand audience research and media law basics",
    ],
    months: [
      {
        month: 1,
        focus: "Technical Skills & Journalism Practice",
        credit_hours: 6,
        weeks: [
          {
            week: 1,
            title: "Studio Equipment & Setup",
            credit_hours: 1.5,
            overview:
              "Introduction to the hardware and infrastructure that drive both radio and TV studios.",
            modules: [
              "Studio layout and workflow",
              "Microphones, mixers, and cables",
              "Basic camera functions and framing",
              "Lighting setup (Three-point lighting)",
              "Audio capture and editing tools (Audacity/Adobe Audition)",
            ],
            assessment:
              "Practical test: Set up and record a basic two-camera interview",
          },
          {
            week: 2,
            title: "Broadcast Journalism Essentials",
            credit_hours: 1.5,
            overview:
              "Learn how to think, write, and behave like a journalist within the broadcasting ecosystem.",
            modules: [
              "News values: Timeliness, relevance, accuracy",
              "Writing styles: Inverted pyramid, headlines, leads",
              "Audio/visual storytelling",
              "Interview techniques: On-field and studio",
              "Journalistic ethics: Bias, accuracy, balance",
            ],
            assessment: "Submit a 2-minute radio or TV news report",
          },
          {
            week: 3,
            title: "Mobile Journalism & Field Reporting (MoJo)",
            credit_hours: 1.5,
            overview:
              "Fast-paced, real-time journalism using smartphones and mobile tools.",
            modules: [
              "Capturing stories in the field",
              "Vox pops and public opinion interviews",
              "Filming and editing on mobile devices",
              "Real-time content uploading",
              "Introduction to broadcast editing apps",
            ],
            assessment: "Produce a 3-minute field report using a smartphone",
          },
          {
            week: 4,
            title: "On-Air Presentation Skills",
            credit_hours: 1.5,
            overview:
              "Build presence, confidence, and fluency on-air—live or recorded.",
            modules: [
              "Voice projection and modulation",
              "Reading from teleprompters or scripts",
              "Audience connection strategies",
              "Managing on-air nerves and mistakes",
              "Mock studio sessions",
            ],
            assessment:
              "Deliver a 2-minute live segment simulation + voice demo",
          },
        ],
      },
      {
        month: 2,
        focus: "Production, Law & Media Business",
        credit_hours: 6,
        weeks: [
          {
            week: 5,
            title: "TV & Radio Production Techniques",
            credit_hours: 1.5,
            overview:
              "Explore planning and execution of studio and field productions.",
            modules: [
              "Scriptwriting and storyboarding",
              "Multi-camera direction and switchers",
              "Sound design and mixing",
              "Lighting for emotion and clarity",
              "Coordinating production teams",
            ],
            assessment: "Direct a 5–7-minute studio segment (group task)",
          },
          {
            week: 6,
            title: "Post-Production & Audio Editing",
            credit_hours: 1.5,
            overview: "Turn raw footage into polished, compelling content.",
            modules: [
              "Editing with Adobe Premiere or equivalent",
              "Syncing audio and visuals",
              "Color correction and visual effects basics",
              "Audio layering: effects, music, transitions",
              "Final output settings for broadcast",
            ],
            assessment: "Submit a 3-minute fully edited TV/radio segment",
          },
          {
            week: 7,
            title: "Media Law, Branding & Marketing",
            credit_hours: 1.5,
            overview:
              "Learn to protect content, manage legal risks, and strategically grow audience and revenue.",
            modules: [
              "Copyright, defamation, privacy",
              "Regulatory bodies (NBC)",
              "Branding for radio/TV shows",
              "Social media integration",
              "Audience analytics and engagement tools",
            ],
            assessment:
              "Create a marketing and branding plan for a hypothetical show + Case study brief on a media law dilemma",
          },
          {
            week: 8,
            title: "Capstone Project & Showcase",
            credit_hours: 1.5,
            overview: "Culminating group project with real-world application.",
            modules: [
              "Script, direct, and produce either: A 15-minute TV show or A 30-minute radio programme",
              "Include intro graphics, branding, social media handles",
              "Peer-reviewed presentation and external evaluation",
            ],
            assessment:
              "Capstone project + Individual assignments + Participation, quizzes, and feedback",
          },
        ],
      },
    ],
  },
  advanced: {
    title: "Advanced Certificate in Broadcasting",
    duration: "4 Months",
    credit_hours: 24,
    level: "Professional",
    slug: "advanced-certificate",
    target_audience:
      "Graduates of the beginner/intermediate programme or working professionals",
    goal: "Master professional skills in journalism, production, and broadcasting management.",
    expected_outcomes: [
      "Run a professional broadcast from concept to transmission",
      "Lead teams, manage time, and supervise content production",
      "Apply law and ethics in newsroom and management settings",
      "Develop multiplatform storytelling strategies",
    ],
    months: [
      {
        month: 1,
        focus: "Journalism & Newsroom Operations",
        credit_hours: 6,
        weeks: [
          {
            week: 1,
            title: "Advanced News Gathering & Reporting",
            credit_hours: 1.5,
            overview:
              "Master advanced techniques for news gathering, verification, and reporting.",
            modules: [
              "Investigative journalism techniques",
              "Data journalism and visualization",
              "Advanced interview techniques",
              "Source verification and fact-checking",
              "Cross-platform news packaging",
            ],
            assessment:
              "Produce an investigative news package with multiple sources",
          },
          {
            week: 2,
            title: "Newsroom Leadership & Management",
            credit_hours: 1.5,
            overview:
              "Develop skills for leading and managing a newsroom effectively.",
            modules: [
              "Newsroom hierarchy and roles",
              "Editorial decision-making",
              "Team management and delegation",
              "Crisis management in newsrooms",
              "Performance evaluation and feedback",
            ],
            assessment:
              "Create a newsroom management plan and conduct a mock editorial meeting",
          },
          {
            week: 3,
            title: "Advanced Broadcast Writing",
            credit_hours: 1.5,
            overview:
              "Refine writing skills for various broadcast formats and platforms.",
            modules: [
              "Advanced scriptwriting techniques",
              "Writing for different platforms",
              "Tone and style adaptation",
              "Breaking news writing",
              "Feature and documentary scripting",
            ],
            assessment: "Write scripts for different broadcast formats",
          },
          {
            week: 4,
            title: "Ethics & Media Law in Practice",
            credit_hours: 1.5,
            overview:
              "Apply media law and ethics in real-world broadcasting scenarios.",
            modules: [
              "Advanced media law applications",
              "Ethical decision-making frameworks",
              "Privacy and defamation law",
              "Regulatory compliance",
              "Case studies in media ethics",
            ],
            assessment:
              "Analyze and present solutions for complex media law scenarios",
          },
        ],
      },
      {
        month: 2,
        focus: "Production & Technical Mastery",
        credit_hours: 6,
        weeks: [
          {
            week: 5,
            title: "Advanced Studio Production",
            credit_hours: 1.5,
            overview:
              "Master complex studio production techniques and workflows.",
            modules: [
              "Multi-camera studio direction",
              "Advanced lighting design",
              "Sound engineering and mixing",
              "Technical directing",
              "Live production coordination",
            ],
            assessment: "Direct a live-to-tape multi-camera production",
          },
          {
            week: 6,
            title: "Post-Production Excellence",
            credit_hours: 1.5,
            overview:
              "Develop advanced post-production skills for broadcast quality content.",
            modules: [
              "Advanced video editing techniques",
              "Color grading and correction",
              "Sound design and mixing",
              "Motion graphics and effects",
              "Quality control and delivery",
            ],
            assessment: "Produce a broadcast-quality edited package",
          },
          {
            week: 7,
            title: "Digital & Social Media Integration",
            credit_hours: 1.5,
            overview:
              "Master digital content creation and social media strategies.",
            modules: [
              "Digital content strategy",
              "Social media management",
              "Cross-platform content adaptation",
              "Analytics and engagement",
              "Digital audience development",
            ],
            assessment: "Create and implement a digital content strategy",
          },
          {
            week: 8,
            title: "Advanced Field Production",
            credit_hours: 1.5,
            overview: "Excel in complex field production scenarios.",
            modules: [
              "Advanced camera operation",
              "Location sound recording",
              "Field lighting techniques",
              "Remote production setup",
              "Troubleshooting in the field",
            ],
            assessment:
              "Produce a field report with professional production values",
          },
        ],
      },
      {
        month: 3,
        focus: "Management & Business of Broadcasting",
        credit_hours: 6,
        weeks: [
          {
            week: 9,
            title: "Broadcast Business Management",
            credit_hours: 1.5,
            overview:
              "Understand the business aspects of broadcasting operations.",
            modules: [
              "Broadcast business models",
              "Revenue streams and monetization",
              "Budgeting and financial management",
              "Resource allocation",
              "Partnership and sponsorship",
            ],
            assessment: "Develop a business plan for a broadcast venture",
          },
          {
            week: 10,
            title: "Content Strategy & Programming",
            credit_hours: 1.5,
            overview:
              "Master content strategy and programming for broadcast platforms.",
            modules: [
              "Programming strategy",
              "Audience research and analytics",
              "Content scheduling",
              "Brand development",
              "Competitive analysis",
            ],
            assessment: "Create a comprehensive programming strategy",
          },
          {
            week: 11,
            title: "Leadership & Team Management",
            credit_hours: 1.5,
            overview: "Develop leadership skills for broadcast management.",
            modules: [
              "Leadership styles and approaches",
              "Team building and motivation",
              "Conflict resolution",
              "Change management",
              "Performance management",
            ],
            assessment: "Lead a team through a production project",
          },
          {
            week: 12,
            title: "Industry Trends & Innovation",
            credit_hours: 1.5,
            overview:
              "Stay ahead of industry trends and technological innovations.",
            modules: [
              "Emerging technologies",
              "Industry trends analysis",
              "Innovation in broadcasting",
              "Future of media",
              "Strategic planning",
            ],
            assessment: "Present an analysis of future broadcasting trends",
          },
        ],
      },
      {
        month: 4,
        focus: "Capstone & Professional Development",
        credit_hours: 6,
        weeks: [
          {
            week: 13,
            title: "Capstone Project Planning",
            credit_hours: 1.5,
            overview: "Plan and develop the final capstone project.",
            modules: [
              "Project conceptualization",
              "Resource planning",
              "Team formation",
              "Timeline development",
              "Risk assessment",
            ],
            assessment: "Submit a detailed project plan",
          },
          {
            week: 14,
            title: "Capstone Production",
            credit_hours: 1.5,
            overview: "Execute the capstone production project.",
            modules: [
              "Production management",
              "Quality control",
              "Team coordination",
              "Problem-solving",
              "Documentation",
            ],
            assessment: "Progress report and production review",
          },
          {
            week: 15,
            title: "Final Production & Review",
            credit_hours: 1.5,
            overview: "Complete and review the final production.",
            modules: [
              "Final production",
              "Quality assurance",
              "Feedback integration",
              "Presentation preparation",
              "Portfolio development",
            ],
            assessment: "Submit final production for review",
          },
          {
            week: 16,
            title: "Professional Development & Graduation",
            credit_hours: 1.5,
            overview: "Prepare for professional advancement and graduation.",
            modules: [
              "Portfolio presentation",
              "Career planning",
              "Industry networking",
              "Professional branding",
              "Graduation preparation",
            ],
            assessment: "Present final portfolio and graduation project",
          },
        ],
      },
    ],
  },
};
