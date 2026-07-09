import {
  CourseCategory,
  ICourse,
} from "@/src/components/skill-development/types";

export const courses: ICourse[] = [
  {
    id: "course-1",
    slug: "basic-hydrography-cat-b",
    title: "Basic Hydrographic Course (CATEGORY B)",
    category: CourseCategory.HYDROGRAPHY,
    duration: "24 Weeks",
    image: "/img8.jpeg",
    shortDescription:
      "A comprehensive course covering the fundamentals of hydrographic surveying according to IHO S-5 standards.",
    longDescription:
      "This course is designed to provide students with a solid foundation in hydrographic surveying. It covers theoretical knowledge and practical skills required to conduct hydrographic surveys in various environments. The curriculum follows the International Hydrographic Organization (IHO) CATEGORY B standards.",
    learningOutcomes: [
      "Understand the principles of geodesy and map projections",
      "Operate single-beam and multi-beam echo sounders",
      "Process and analyze bathymetric data",
      "Conduct tidal observations and analysis",
      "Produce basic nautical charts using industry-standard software",
    ],
    coursePlan: [
      {
        week: 1,
        title: "Introduction to Hydrography",
        description:
          "Overview of IHO standards, history, and importance of hydrography.",
      },
      {
        week: 2,
        title: "Geodesy & Positioning",
        description:
          "Coordinate systems, datums, GNSS principles, and maritime boundaries.",
      },
      {
        week: 4,
        title: "Acoustics & Sensors",
        description:
          "Sound propagation in water, transducer technology, and calibration.",
      },
      {
        week: 8,
        title: "Bathymetric Data Acquisition",
        description:
          "Hands-on survey planning and execution using BN survey vessels.",
      },
      {
        week: 16,
        title: "Data Processing & Management",
        description:
          "Filtering, cleaning, and managing large datasets using specialized software.",
      },
      {
        week: 24,
        title: "Final Project & Certification",
        description:
          "Independent survey project and final examination for CATEGORY B certification.",
      },
    ],
    instructor: "Capt. M. Rahman, BN",
  },
  {
    id: "course-2",
    slug: "long-hydrographic-course-cat-a",
    title: "Long Hydrographic Course (CATEGORY A)",
    category: CourseCategory.HYDROGRAPHY,
    duration: "48 Weeks",
    image: "/newsImages/news2.jpg",
    shortDescription:
      "An advanced hydrographic programme meeting IHO Category-A standards for senior surveyors responsible for managing national hydrographic programmes.",
    longDescription:
      "The Long Hydrographic Course (CATEGORY A) is the premier professional qualification for hydrographic surveyors. Designed for officers and professionals who will assume leadership roles in national hydrographic services, this intensive 48-week programme covers advanced surveying techniques, programme management, and IHO S-44 compliance. Graduates are qualified to plan, execute, and manage hydrographic surveys of the highest order.",
    learningOutcomes: [
      "Design and manage complex multi-platform survey operations",
      "Apply advanced geodetic principles and tidal modeling",
      "Master multi-beam and LiDAR bathymetric systems",
      "Perform quality assurance and uncertainty analysis to IHO S-44 standards",
      "Manage national hydrographic data infrastructure",
      "Lead survey teams and prepare technical reports for international audiences",
    ],
    coursePlan: [
      {
        week: 1,
        title: "Advanced Geodesy & Reference Frames",
        description:
          "ITRF, ellipsoidal models, vertical datums, and precise positioning.",
      },
      {
        week: 6,
        title: "Advanced Acoustic Systems",
        description:
          "Multi-beam calibration, backscatter analysis, and AUV-based surveys.",
      },
      {
        week: 14,
        title: "Tidal Analysis & Modeling",
        description:
          "Harmonic analysis, co-tidal charts, and datum transformations.",
      },
      {
        week: 22,
        title: "Survey Programme Management",
        description:
          "Planning national survey programmes, resource allocation, and stakeholder management.",
      },
      {
        week: 34,
        title: "Practical Sea Training",
        description:
          "Extended survey deployment on BN vessels covering offshore and coastal zones.",
      },
      {
        week: 48,
        title: "Thesis & Final Assessment",
        description:
          "Independent research thesis and comprehensive examination for CATEGORY A certification.",
      },
    ],
    instructor: "Cdre S. F. Ahmed, BN",
  },
  {
    id: "course-3",
    slug: "enc-production-mastery",
    title: "Electronic Navigational Chart (ENC) Production",
    category: CourseCategory.CARTOGRAPHY,
    duration: "12 Weeks",
    image: "/newsImages/news3.jpg",
    shortDescription:
      "Master the art of creating S-57 compliant digital charts for modern ECDIS systems.",
    longDescription:
      "This specialized course focuses on the production and maintenance of Electronic Navigational Charts (ENCs). Students will learn to work with S-57 and S-101 standards, ensure data quality, and understand the lifecycle of digital maritime products.",
    learningOutcomes: [
      "Expertise in S-57 object-catalog and attribute mapping",
      "Mastery of digital cartographic tools",
      "Validation and quality control of ENC data",
      "Understanding ENC updates and maintenance workflows",
    ],
    coursePlan: [
      {
        week: 1,
        title: "Digital Cartography Fundamentals",
        description: "Transition from paper to digital charts.",
      },
      {
        week: 3,
        title: "S-57 Standard Deep Dive",
        description: "Objects, attributes, and encoding rules.",
      },
      {
        week: 6,
        title: "ENC Production Workflows",
        description: "Practical exercises using production software.",
      },
      {
        week: 12,
        title: "Validation & Distribution",
        description:
          "Ensuring compliance with IHO standards and RENC distribution.",
      },
    ],
  },
  {
    id: "course-4",
    slug: "marine-gis-remote-sensing",
    title: "Marine GIS & Remote Sensing",
    category: CourseCategory.GIS,
    duration: "8 Weeks",
    image: "/img7.jpeg",
    shortDescription:
      "Utilizing satellite imagery and spatial analysis for coastal and marine management.",
    longDescription:
      "A modern approach to maritime domain awareness using GIS tools and remote sensing data. Ideal for professionals in coastal management, environmental protection, and maritime security.",
    learningOutcomes: [
      "Process satellite imagery for maritime applications",
      "Perform spatial analysis on marine datasets",
      "Create interactive maritime dashboards",
      "Map coastal changes and environmental impacts",
    ],
    coursePlan: [
      {
        week: 1,
        title: "GIS Basics for Marine Science",
        description: "Introduction to ArcMap/QGIS in maritime context.",
      },
      {
        week: 3,
        title: "Remote Sensing Principles",
        description: "Satellite data sources and image processing.",
      },
      {
        week: 6,
        title: "Advanced Spatial Analysis",
        description: "Modeling maritime traffic and habitat mapping.",
      },
      {
        week: 8,
        title: "Final Project",
        description: "Developing a GIS-based coastal management plan.",
      },
    ],
  },
  {
    id: "course-5",
    slug: "survey-recorder-part-1",
    title: "Survey Recorder Part I",
    category: CourseCategory.HYDROGRAPHY,
    duration: "8 Weeks",
    image: "/newsImages/news5.jpg",
    shortDescription:
      "Foundation course for survey recorders covering basic data recording, instrument handling, and survey assist procedures.",
    longDescription:
      "Survey Recorder Part I is the entry-level qualification for personnel assisting hydrographic survey operations. The course focuses on practical skills required to accurately record survey data, operate basic instruments, and support survey teams in the field. Successful completion qualifies personnel for deployment as assistant surveyors on BN survey vessels.",
    learningOutcomes: [
      "Operate and maintain basic survey instruments including lead lines and echo sounders",
      "Record accurate depth, position, and tidal observations",
      "Understand maritime safety procedures during survey operations",
      "Assist in the deployment and recovery of survey equipment",
      "Maintain survey logbooks and field records to prescribed standards",
    ],
    coursePlan: [
      {
        week: 1,
        title: "Introduction to Survey Recording",
        description:
          "Role of the survey recorder, safety protocols, and team structure.",
      },
      {
        week: 3,
        title: "Instrument Familiarization",
        description:
          "Hands-on training with echo sounders, GNSS receivers, and tidal gauges.",
      },
      {
        week: 5,
        title: "Field Recording Techniques",
        description: "Data logging, observation standards, and quality checks.",
      },
      {
        week: 8,
        title: "Practical Assessment",
        description: "Field examination aboard a survey launch.",
      },
    ],
  },
  {
    id: "course-6",
    slug: "survey-recorder-part-2",
    title: "Survey Recorder Part II",
    category: CourseCategory.HYDROGRAPHY,
    duration: "10 Weeks",
    image: "/newsImages/news6.jpg",
    shortDescription:
      "Intermediate course expanding on data processing, basic chart compilation, and independent survey recording capabilities.",
    longDescription:
      "Building on the foundation of Part I, this intermediate course develops the survey recorder's ability to process raw survey data, perform basic quality control, and contribute to chart compilation workflows. Graduates can independently manage data recording stations and perform preliminary data analysis.",
    learningOutcomes: [
      "Process raw bathymetric and positional data using standard software",
      "Perform basic data quality control and error detection",
      "Contribute to chart compilation by preparing fair sheets",
      "Operate advanced positioning systems including RTK GNSS",
      "Manage independent data recording stations during survey operations",
    ],
    coursePlan: [
      {
        week: 1,
        title: "Review & Advanced Instruments",
        description:
          "Refresher on Part I concepts and introduction to advanced equipment.",
      },
      {
        week: 3,
        title: "Data Processing Fundamentals",
        description:
          "Filtering, tidal corrections, and coordinate transformations.",
      },
      {
        week: 6,
        title: "Chart Compilation Basics",
        description:
          "Preparing fair sheets, sounding selection, and feature annotation.",
      },
      {
        week: 10,
        title: "Independent Assessment",
        description: "Solo data recording and processing examination.",
      },
    ],
  },
  {
    id: "course-7",
    slug: "survey-recorder-part-3",
    title: "Survey Recorder Part III",
    category: CourseCategory.HYDROGRAPHY,
    duration: "12 Weeks",
    image: "/heroImages/home/img1.jpeg",
    shortDescription:
      "Advanced course qualifying survey recorders for supervisory roles with expertise in multi-beam operations and data management.",
    longDescription:
      "The final stage of the Survey Recorder programme prepares personnel for supervisory responsibilities in hydrographic survey operations. This advanced course covers multi-beam echo sounder operations, comprehensive data management, and team leadership. Graduates are qualified to supervise data recording teams and manage survey data archives.",
    learningOutcomes: [
      "Operate and calibrate multi-beam echo sounder systems",
      "Supervise data recording teams during complex survey operations",
      "Manage hydrographic data archives and metadata catalogues",
      "Perform advanced quality assurance on multi-beam datasets",
      "Prepare survey reports and data delivery packages",
    ],
    coursePlan: [
      {
        week: 1,
        title: "Multi-beam System Operations",
        description:
          "MBES theory, calibration patches, and operational procedures.",
      },
      {
        week: 4,
        title: "Advanced Data Management",
        description:
          "Database systems, metadata standards, and archival procedures.",
      },
      {
        week: 8,
        title: "Supervisory Skills",
        description:
          "Team management, survey planning contributions, and report writing.",
      },
      {
        week: 12,
        title: "Comprehensive Assessment",
        description:
          "Practical and theoretical examination for Survey Recorder III certification.",
      },
    ],
  },
  {
    id: "course-8",
    slug: "customized-courses",
    title: "Customized Courses",
    category: CourseCategory.HYDROGRAPHY,
    duration: "Variable",
    image: "/heroImages/home/img2.jpeg",
    shortDescription:
      "Tailored training programmes designed to meet the specific requirements of naval forces, maritime organizations, and port authorities.",
    longDescription:
      "BNHOC offers customized training programmes tailored to the specific needs of requesting organizations. These bespoke courses can cover any combination of hydrographic, oceanographic, cartographic, and GIS topics, with flexible duration, delivery format, and assessment criteria. Ideal for foreign naval delegations, port authorities, and maritime training institutions seeking specialized capacity building.",
    learningOutcomes: [
      "Content tailored to organizational requirements and skill gaps",
      "Flexible delivery — classroom, onboard, or blended learning",
      "Certification issued based on agreed competency standards",
      "Access to BNHOC's survey vessels and laboratory facilities",
      "Post-course mentoring and technical support available",
    ],
    coursePlan: [
      {
        week: 1,
        title: "Needs Assessment & Curriculum Design",
        description:
          "Collaborative development of course content with the requesting organization.",
      },
      {
        week: 2,
        title: "Core Module Delivery",
        description: "Delivery of agreed theoretical and practical modules.",
      },
      {
        week: 3,
        title: "Practical Exercises",
        description:
          "Field training and hands-on exercises using BNHOC facilities.",
      },
      {
        week: 4,
        title: "Assessment & Certification",
        description:
          "Evaluation and certification according to agreed standards.",
      },
    ],
  },
];
