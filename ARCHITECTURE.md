# CORRA IT Project Management — Architecture

## 1. Document Purpose

This document defines the technical architecture of the CORRA IT Project Management application.

It describes:

- Application architecture
- Frontend architecture
- Supabase architecture
- Authentication
- Authorization
- Database interaction
- Storage
- Security
- Data flow
- Application layers
- Project structure expectations
- Architectural constraints

This document is intended to be the technical reference for implementation and maintenance of the application.

---

## 2. Architecture Overview

The application follows a direct frontend-to-Supabase Cloud architecture.

The system consists of:

- TypeScript frontend
- Supabase Cloud
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security

There is no separate backend server.

The frontend communicates directly with Supabase through the official Supabase client.

The architecture is intentionally simple and avoids introducing an unnecessary application server.

---

## 3. High-Level Architecture

The logical architecture is:

    Users
      |
      v
    CORRA IT Project Management
    Frontend
      |
      | Supabase Client
      |
      +----------------------------+
      |                            |
      v                            v
    Supabase Auth             Supabase Database
                                   |
                                   v
                              PostgreSQL
                                   |
                                   v
                                  RLS

    Frontend
      |
      v
    Supabase Storage
      |
      +-- Site Plan Files
      +-- Project Documents

Supabase is the cloud platform responsible for authentication, database persistence, storage, and database-level authorization.

---

## 4. Architectural Principles

The application follows these principles.

### 4.1 Supabase-First Architecture

Supabase is the application's cloud data platform.

The frontend uses Supabase directly for:

- Authentication
- Database queries
- Database mutations
- Storage operations

### 4.2 Database-Enforced Security

Security must not depend only on frontend code.

PostgreSQL constraints and Supabase RLS are the authoritative mechanisms for protecting application data.

### 4.3 Direct Client Access

The frontend communicates directly with Supabase.

There is no intermediate REST API implemented by the application.

### 4.4 Minimal Architecture

The application should not introduce infrastructure that is not required by the agreed scope.

In particular, a separate backend service is not part of the architecture.

### 4.5 Single Source of Truth

Supabase PostgreSQL is the authoritative source for application data.

The frontend must not maintain a separate competing database.

---

## 5. Technology Architecture

### Frontend

The frontend is implemented using:

- TypeScript
- React
- Supabase JavaScript client

The frontend is responsible for the application interface and user interaction.

### Cloud

Supabase Cloud provides:

- PostgreSQL
- Auth
- Storage
- RLS

No standalone backend service exists in the current architecture.

---

## 6. Frontend Architecture

The frontend should be organized around clear application responsibilities.

A recommended logical structure is:

    src/
      |
      +-- components/
      |
      +-- pages/
      |
      +-- layouts/
      |
      +-- hooks/
      |
      +-- services/
      |
      +-- lib/
      |
      +-- types/
      |
      +-- utils/
      |
      +-- assets/

The exact directory structure may differ in the repository, but responsibilities should remain separated.

---

## 7. Frontend Layers

### 7.1 Presentation Layer

Responsible for:

- Pages
- Components
- Forms
- Tables
- Dialogs
- Navigation
- Loading states
- Error states
- User feedback

This layer should not contain unnecessary database logic.

### 7.2 Application Layer

Responsible for:

- Application workflows
- Authentication state
- Permission-aware UI
- Form submission workflows
- User interaction logic

### 7.3 Data Access Layer

Responsible for:

- Supabase queries
- Inserts
- Updates
- Deletes
- Storage operations
- Database result handling

Database access should be centralized where practical rather than duplicated throughout UI components.

### 7.4 Type Layer

Responsible for:

- Database types
- Application types
- Shared interfaces
- Type-safe data structures

Generated Supabase database types should be preferred when available.

---

## 8. Authentication Architecture

Authentication is provided by Supabase Auth.

The authentication flow is:

    User
      |
      v
    Login Page
      |
      v
    Supabase Auth
      |
      v
    Authenticated Session
      |
      v
    user_profiles
      |
      v
    Application Role
      |
      +--------------------+
      |                    |
      v                    v
    super_admin          viewer

The frontend uses the authenticated Supabase session to determine whether a user is signed in.

The application then loads the user's corresponding profile.

---

## 9. User Profile Architecture

The user_profiles table connects application-level identity to Supabase Auth.

The important relationship is:

    auth.users.id
          |
          v
    user_profiles.auth_user_id

The application role is stored in user_profiles.

Supported roles are:

- super_admin
- viewer

The frontend must not invent additional application roles.

---

## 10. Authorization Architecture

Authorization is enforced using Supabase Row Level Security.

The frontend may use the user's role to:

- Show or hide navigation items
- Disable controls
- Prevent unnecessary actions
- Display read-only interfaces

However, frontend authorization is not sufficient for security.

Every protected database operation must also pass the applicable RLS policy.

The effective security model is:

    Frontend Permission Checks
              |
              v
        User Experience
              |
              v
        Supabase RLS
              |
              v
        Actual Authorization

---

## 11. Super Admin Access

The Super Admin has full permitted access to application data.

The Super Admin can perform CRUD operations on the application's normal business tables.

The Super Admin can also manage application users and view audit information.

The database protects the last Super Admin account from being removed or demoted.

---

## 12. Viewer Access

Viewer users have read-only access to application data.

Viewer access includes viewing:

- Projects
- Clients
- Project personnel
- Assets
- Site plans
- Asset markers
- Racks
- Network information
- Internet connections
- Maintenance information
- Project documents
- Audit information permitted by the security model

Viewer users cannot modify application records.

The frontend must present Viewer screens as read-only.

---

## 13. Database Architecture

PostgreSQL is the central relational data store.

The database contains the following primary application domains:

### Identity

- user_profiles

### Projects

- clients
- projects
- project_engineers
- project_site_plan
- project_documents

### Asset Management

- asset_categories
- asset_brands
- asset_models
- racks
- assets
- asset_plan_markers

### Network Management

- network_vlans
- ip_addresses
- network_interfaces
- network_connections
- internet_connections

### Maintenance

- maintenance_records

### Auditing

- audit_logs

---

## 14. Project-Centered Data Model

The project is the central operational entity.

The logical relationship is:

    Client
      |
      v
    Project
      |
      +-- Personnel
      |
      +-- Site Plan
      |
      +-- Assets
      |     |
      |     +-- Category
      |     +-- Brand
      |     +-- Model
      |     +-- Rack
      |     +-- Site Plan Marker
      |
      +-- VLANs
      |
      +-- IP Addresses
      |
      +-- Network Interfaces
      |
      +-- Network Connections
      |
      +-- Internet Connections
      |
      +-- Maintenance Records
      |
      +-- Documents
      |
      +-- Audit History

The project relationship is used to maintain data isolation and integrity.

---

## 15. Asset Architecture

Assets represent individual IT infrastructure items.

Each asset may reference:

- Project
- Category
- Brand
- Model
- Rack

An asset may also have:

- Serial number
- MAC address
- Management IP
- Status
- Location
- Rack position
- Installation information
- Warranty information

Asset quantity is derived from asset records.

The architecture does not maintain a separate manual quantity field for inventory counting.

---

## 16. Asset Model Integrity

An asset model belongs to a specific:

- Brand
- Category

An asset referencing a model must use the corresponding brand and category.

This rule is enforced at database level.

The frontend should therefore load valid combinations rather than allowing arbitrary combinations.

---

## 17. Site Plan Architecture

Each project can have one official site plan.

The database stores site plan metadata.

Supabase Storage stores the actual PNG file.

The relationship is:

    Project
       |
       v
    project_site_plan
       |
       +-- Storage Path
       |
       v
    Supabase Storage
       |
       v
    PNG Image

The site plan is used as the visual map for asset locations.

---

## 18. Asset Marker Architecture

Asset markers associate physical assets with positions on the project site plan.

Each marker references:

- Project
- Asset

The position is stored as:

- x_percent
- y_percent

Both values are percentages from 0 to 100.

The frontend calculates the rendered position based on the displayed image dimensions.

This makes the marker system independent of the physical screen resolution.

The database also verifies that the asset belongs to the same project as the marker.

---

## 19. Network Architecture

Network information is modeled relationally.

The main network entities are:

- VLANs
- IP addresses
- Network interfaces
- Network connections
- Internet connections

The relationship is approximately:

    Project
      |
      +-- VLAN
      |
      +-- IP Address
      |      |
      |      +-- Asset
      |      +-- VLAN
      |
      +-- Asset
             |
             +-- Interface
                    |
                    +-- IP
                    +-- VLAN

Network connections then link interfaces between assets.

---

## 20. Network Integrity

Network records must remain project-consistent.

Examples:

- An IP assigned to an interface must belong to the same project as the asset.
- A VLAN assigned to an interface must belong to the same project.
- A network connection source asset must belong to the connection project.
- A network connection destination asset must belong to the connection project.
- A source interface must belong to the source asset.
- A destination interface must belong to the destination asset.
- An internet connection router must belong to the same project.

These rules are enforced by the database.

---

## 21. Internet Connection Architecture

Internet connections belong to projects.

An internet connection can optionally reference a router asset.

The database verifies the project relationship.

The frontend should present project-specific assets when selecting a router.

Supported connection types are:

- fiber
- 4g
- 5g
- microwave
- dsl
- other

---

## 22. Maintenance Architecture

Maintenance records are linked to projects and optionally to assets.

The relationship is:

    Project
      |
      +-- Asset
             |
             +-- Maintenance Records

When an asset is referenced, the asset must belong to the same project.

Maintenance records provide historical documentation of issues and actions performed.

---

## 23. Document Storage Architecture

Project documents use a two-part architecture.

### Database

PostgreSQL stores:

- Project association
- Document type
- Title
- Storage path
- Original filename
- MIME type
- File size
- Uploading user
- Timestamps

### Storage

Supabase Storage stores the actual file.

The frontend should use authenticated Supabase Storage access.

Database metadata and Storage objects must remain consistent.

---

## 24. Site Plan Storage

Site plans follow the same database/Storage separation.

PostgreSQL stores:

- Project association
- Storage path
- Original filename
- MIME type
- Image dimensions
- Timestamps

Supabase Storage stores the PNG file.

Only PNG site plans are accepted by the database rules.

---

## 25. Audit Architecture

Audit logging is implemented at database level.

Application-table INSERT, UPDATE, and DELETE operations generate audit records.

The audit record captures the operation and relevant row information.

This ensures that audit logging does not depend exclusively on frontend code.

The audit_logs table is protected from normal UPDATE and DELETE operations.

---

## 26. Data Flow

A normal read operation follows:

    User
      |
      v
    React Component
      |
      v
    Supabase Client
      |
      v
    PostgreSQL
      |
      v
    RLS Policy
      |
      v
    Query Result
      |
      v
    React UI

A normal write operation follows:

    User
      |
      v
    Form
      |
      v
    Application Validation
      |
      v
    Supabase Client
      |
      v
    PostgreSQL
      |
      +-- Constraints
      +-- Foreign Keys
      +-- Integrity Rules
      +-- RLS
      |
      v
    Database Change
      |
      v
    Audit Trigger
      |
      v
    Audit Log

---

## 27. Storage Data Flow

For a site plan or document upload:

    User
      |
      v
    Frontend
      |
      v
    Supabase Storage
      |
      v
    Stored File

Then the application stores or updates the corresponding metadata in PostgreSQL.

The database record contains the Storage path required to retrieve the file.

---

## 28. Environment Configuration

Frontend configuration must use environment variables.

Browser-safe Supabase configuration may include:

- Supabase project URL
- Supabase publishable/anonymous client key as applicable to the project configuration

Privileged credentials must never be included in frontend environment variables.

In particular, a Supabase service-role key must never be exposed to the browser.

---

## 29. No Backend Server

The current architecture explicitly excludes a separate backend.

Do not introduce:

- Express
- Fastify
- NestJS
- Python API
- Node API
- Custom REST API
- Custom GraphQL API
- Backend microservices

unless the architecture is explicitly revised.

Any requirement that would require privileged server-side credentials must be reviewed separately before implementation.

---

## 30. Routing and Application Navigation

The frontend should provide clear navigation between the major application areas.

The exact routing implementation may vary, but the application should provide access to the following functional areas:

- Dashboard
- Projects
- Project details
- Assets
- Network
- Maintenance
- Documents
- User management
- Audit logs

Navigation visibility should respect the authenticated user's application role.

---

## 31. Project Details Architecture

Project details should act as the central view for project-specific IT information.

A project details interface should provide access to:

- General project information
- Client
- Personnel
- Site plan
- Asset inventory
- Asset locations
- Racks
- VLANs
- IP addresses
- Network interfaces
- Network connections
- Internet connections
- Maintenance
- Documents
- Relevant audit history

Super Admin users can modify the applicable information.

Viewer users can inspect the information without modifying it.

---

## 32. Form Architecture

Forms should be designed around the actual database model.

A form should:

1. Load valid reference data.
2. Validate required fields.
3. Validate user input.
4. Submit through the Supabase client.
5. Handle database errors.
6. Refresh or update the relevant UI.
7. Display a clear success or failure state.

Frontend validation improves usability.

Database constraints remain authoritative.

---

## 33. Error Handling

The frontend must handle:

- Authentication failures
- Authorization failures
- Validation failures
- Database constraint errors
- Network errors
- Storage upload errors
- Storage retrieval errors
- Missing records
- Invalid references

Errors should be presented in understandable language to the user.

Technical details may be logged for debugging where appropriate, but sensitive information must not be exposed.

---

## 34. Loading States

Every asynchronous operation should have an appropriate loading state.

Examples include:

- Login
- Project loading
- Project creation
- Project update
- Asset loading
- Asset creation
- Site plan upload
- Document upload
- Maintenance submission
- User management operations

The interface should prevent accidental duplicate submissions while an operation is in progress.

---

## 35. Data Refresh

After successful mutations, the frontend should ensure that the displayed data reflects the current Supabase state.

The application should not assume that a local optimistic state is permanently authoritative.

Supabase remains the source of truth.

---

## 36. Database Types

The frontend should use generated Supabase database types where available.

Database types should reflect the actual deployed schema.

When the database schema changes, generated types should be regenerated before dependent frontend code is updated.

Frontend code must not silently redefine database columns with different names or types.

---

## 37. Security Boundaries

The application has the following security boundaries:

### Authentication Boundary

Supabase Auth verifies user identity.

### Application Role Boundary

user_profiles determines the application role.

### Database Authorization Boundary

RLS determines whether the authenticated user can perform the requested database operation.

### Database Integrity Boundary

Constraints, foreign keys, checks, and triggers enforce data integrity.

### Storage Boundary

Supabase Storage policies control file access.

---

## 38. Security Rules

The following rules are mandatory:

1. Never expose privileged Supabase credentials in frontend code.
2. Never disable RLS to simplify frontend development.
3. Never trust a client-supplied role as proof of authorization.
4. Never allow Viewer users to bypass read-only restrictions.
5. Never implement privileged operations using browser-exposed service credentials.
6. Never bypass database constraints from the frontend.
7. Never store secrets in source control.
8. Never hard-code sensitive credentials into TypeScript files.
9. Never create a second authorization system that conflicts with Supabase RLS.
10. Never remove database integrity rules merely to make a frontend form easier to implement.

---

## 39. Performance Principles

The application should avoid unnecessary database requests.

Preferred practices include:

- Fetch only required columns where practical.
- Use pagination for large datasets.
- Avoid repeated identical queries.
- Reuse loaded reference data where appropriate.
- Use indexed database fields for common lookups.
- Avoid loading all project data when only summary information is required.

Performance improvements must not compromise data integrity or security.

---

## 40. Scope Control

The architecture is intentionally limited to the agreed IT project management scope.

The architecture does not include:

- HR systems
- Payroll
- Finance
- Procurement
- CRM
- General Help Desk
- SIEM
- Full network monitoring
- Financial project management
- Procurement lifecycle management

These areas must not be added without an explicit scope decision.

---

## 41. Architectural Change Policy

Any change to the following requires explicit review:

- Application roles
- Authentication architecture
- Authorization architecture
- Database architecture
- RLS model
- Supabase project structure
- Storage architecture
- Introduction of a backend
- Major frontend architecture changes
- New business domains
- New database entities

Changes should be documented before implementation.

---

## 42. Source of Truth

The following hierarchy applies:

    Supabase Database Schema
             |
             v
    Database Security and Integrity
             |
             v
    Application Architecture
             |
             v
    Frontend Implementation

The deployed Supabase database is the authoritative source for the current database structure.

The DATABASE_SCHEMA.md document describes the intended and documented database architecture and must remain synchronized with the deployed schema.

---

## 43. Architecture Summary

CORRA IT Project Management uses a deliberately simple cloud architecture:

    TypeScript / React Frontend
              |
              v
       Supabase Client
              |
       +------+------+
       |             |
       v             v
    PostgreSQL    Storage
       |
       +-- RLS
       +-- Constraints
       +-- Triggers
       |
       v
    Supabase Auth

The architecture provides:

- Centralized project data
- Centralized infrastructure inventory
- Network documentation
- Site plan visualization
- Maintenance history
- Project document storage
- Controlled user access
- Database-enforced authorization
- Automatic audit logging

The application remains a frontend plus Supabase Cloud system without a separate backend server.