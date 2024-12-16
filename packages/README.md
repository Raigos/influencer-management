# Packages

This directory contains shared packages used across the influencer management system. Each package serves a specific purpose in the architecture:

- `database`: Contains the Prisma schema, migrations, and database configuration. This centralized database package ensures consistent data structure across all applications.

- `shared`: Houses common TypeScript types and validation logic used throughout the system. This includes definitions for core entities like influencers, employees, and social media accounts.

These packages are consumed by applications in the `apps` directory, ensuring consistency and reducing code duplication across the system.
