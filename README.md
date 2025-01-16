# Project Structure

This document outlines the directory structure of the **beSmart** price tracker project.

```markdown
.
├── **.next/**                  # Next.js build output directory
├── **app/**                    # Application-related files
├── **components/**             # React components for the frontend
├── **lib/**                    # Contains backend utilities and libraries
│   ├── **actions/**            # Functions for handling user actions
│   │   └── index.ts            # Entry file for actions
│   ├── **models/**             # Mongoose models for database interaction
│   │   └── product.model.ts    # Schema for product data
│   ├── **nodemailer/**         # Email notification functionality
│   │   └── index.ts            # Nodemailer implementation
│   ├── **scraper/**            # Web scraper utilities
│   │   └── index.ts            # Scraper logic using BrightData, Cheerio, and Axios
│   ├── mongoose.ts             # Mongoose database connection setup
│   ├── utils.ts                # Utility functions
├── **node_modules/**           # Dependencies installed via npm
├── **public/**                 # Static files (e.g., images, icons)
├── **types/**                  # TypeScript type definitions
├── .env                        # Environment variables
├── .gitignore                  # Files and directories to ignore in Git
├── LICENSE                     # Project license
├── next-env.d.ts               # Next.js environment type definitions
├── next.config.ts              # Next.js configuration
├── package-lock.json           # Exact dependency versions
├── package.json                # Project metadata and dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project overview and documentation
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
