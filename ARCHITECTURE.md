CORRA IT Project Management

System Architecture

1. Architecture Overview

CORRA IT Project Management follows a centralized cloud-backed enterprise web architecture.

The frontend is deployed on the CORRA infrastructure/VM and communicates securely with Supabase services.

┌──────────────────────────────────────────────┐
│                  IT USERS                    │
│                                              │
│ IT Admin │ IT Manager │ IT Engineer │ Viewer│
└──────────────────────┬───────────────────────┘
                       │ HTTPS
                       ▼
┌──────────────────────────────────────────────┐
│              CORRA WEB APPLICATION           │
│                                              │
│ TypeScript Frontend                          │
│ Authentication                               │
│ UI / Forms                                   │
│ Project Management                           │
│ Asset Management                             │
│ Network Management                           │
│ Site Plan Viewer                             │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                  SUPABASE                    │
│                                              │
│ Authentication                              │
│ PostgreSQL Database                          │
│ Row Level Security                            │
│ Storage                                      │
│ Audit Data                                   │
└──────────────────────────────────────────────┘

---

2. Architectural Principles

The application follows these principles:

1. Database is the source of truth.
2. Every physical asset has its own database record.
3. Security is enforced at database level.
4. RLS is mandatory for exposed tables.
5. Files are stored in object storage, not PostgreSQL blobs.
6. Frontend must not contain privileged credentials.
7. Business rules should be validated at multiple layers.
8. All critical modifications should be auditable.
9. Arabic and English are first-class UI languages.
10. Features outside the approved scope should not be introduced without requirements approval.

---

3. Frontend Architecture

The frontend should use a modular TypeScript architecture.

Recommended structure:

src/
├── app/
├── components/
├── layouts/
├── pages/
├── features/
│   ├── projects/
│   ├── assets/
│   ├── network/
│   ├── internet/
│   ├── maintenance/
│   └── site-plan/
├── services/
├── hooks/
├── lib/
├── types/
├── i18n/
└── utils/

Feature modules should remain isolated.

For example:

features/projects/
features/assets/
features/network/

This prevents the frontend from becoming a monolithic application.

---

4. Backend Architecture

Supabase provides:

- PostgreSQL
- Authentication
- Storage
- Row Level Security

The frontend communicates with Supabase through the official client.

No database credentials or service-role keys should be shipped to the browser.

---

5. Authentication

Authentication is handled through Supabase Auth.

The application should require authentication before accessing project information.

Unauthenticated users must not have access to application data.

---

6. Authorization

Authorization is implemented using:

Authentication
      +
User Profile
      +
Application Role
      +
PostgreSQL RLS

Roles:

Role| Purpose
admin| Full IT administration
it_manager| Management and operational control
it_engineer| Operational IT work
viewer| Read-only access

RLS policies enforce access at the database level.

---

7. Database Architecture

The database is PostgreSQL.

Main logical domains:

Users
  │
  └── user_profiles

Projects
  │
  ├── clients
  ├── project_engineers
  └── project_site_plan

Assets
  │
  ├── asset_categories
  ├── asset_brands
  ├── asset_models
  ├── racks
  └── asset_plan_markers

Network
  │
  ├── network_vlans
  ├── ip_addresses
  ├── network_interfaces
  └── network_connections

Internet
  │
  └── internet_connections

Operations
  │
  └── maintenance_records

Governance
  │
  └── audit_logs

---

8. Asset Architecture

The system uses an asset-per-record model.

Incorrect:

Switch
Quantity = 20

Correct:

SW-001
SW-002
SW-003
...
SW-020

Each asset can therefore have:

- Serial number
- MAC address
- IP address
- Physical location
- Rack position
- Maintenance history
- Site-plan marker

Quantity is derived from the number of asset records.

This model is essential for accurate infrastructure management.

---

9. Site Plan Architecture

Each project has one site-plan record.

The actual PNG file is stored in Supabase Storage.

Database:

project_site_plan

Storage:

project-site-plans/
    <project-id>/
        site-plan.png

Markers are stored separately:

asset_plan_markers

Coordinates are normalized:

x_percent = 0..100
y_percent = 0..100

This makes marker placement independent of browser resolution.

---

10. Network Architecture

The network domain represents the technical structure of the project.

Project
  │
  ├── VLAN
  │    └── IP addresses
  │
  ├── Assets
  │    └── Interfaces
  │
  └── Network connections

This allows the IT engineer to document network infrastructure without implementing a full enterprise network monitoring system.

---

11. Internet Architecture

A project can contain multiple internet connections.

Example:

Project
│
├── Fiber ───── Primary
│
└── 5G ─────── Backup

Each connection can reference the router asset responsible for the connection.

---

12. Maintenance Architecture

Maintenance is linked directly to assets.

Asset
 │
 ├── Maintenance #1
 ├── Maintenance #2
 └── Maintenance #3

This provides a chronological technical history.

---

13. Storage Architecture

Binary files must be stored in Supabase Storage.

The PostgreSQL database stores metadata:

- File path
- Original filename
- MIME type
- File size
- Uploading user
- Project association

The application should never store large files directly inside relational tables.

---

14. Security Architecture

Security layers:

HTTPS
  │
  ▼
Supabase Authentication
  │
  ▼
Authenticated Session
  │
  ▼
Role Authorization
  │
  ▼
PostgreSQL RLS
  │
  ▼
Database Constraints

The system must not rely exclusively on frontend authorization.

---

15. Audit Architecture

Important database operations should be traceable through:

audit_logs

An audit record can contain:

- Actor
- Action
- Entity type
- Entity ID
- Project
- Previous data
- New data
- Timestamp

Audit records should not be editable by ordinary users.

---

16. Deployment Architecture

Initial deployment target:

CORRA Main Server
        │
        ▼
       VM
        │
        ▼
CORRA IT Web Application
        │
        │ HTTPS
        ▼
Supabase Cloud

The VM hosts the application frontend/runtime.

Supabase remains responsible for the managed database/backend services.

---

17. Environment Management

Environment variables must be used for configuration.

Example:

SUPABASE_URL
SUPABASE_ANON_KEY

Secrets must never be committed to Git.

Production secrets must be managed through the deployment environment.

---

18. Development Workflow

Recommended workflow:

Feature
  │
  ▼
Development
  │
  ▼
Local Testing
  │
  ▼
Database Migration
  │
  ▼
Integration Testing
  │
  ▼
Production Deployment

Database changes should be represented by migration files.

---

19. Architectural Boundary

This application is intentionally focused on:

«IT project infrastructure management.»

It should not become:

- ERP
- HR system
- Financial system
- Procurement system
- General Help Desk
- Network monitoring platform

Any expansion requires explicit product approval.