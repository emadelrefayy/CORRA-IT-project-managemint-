# CORRA IT Project Management — Product Requirements Document

## 1. Document Purpose

This document defines the Product Requirements for CORRA IT Project Management.

The system is an internal IT Department application used to centralize and manage information related to KORRA construction projects and their IT infrastructure.

This document defines:

- Product objectives
- Users
- Roles
- Functional requirements
- Project management requirements
- Asset management requirements
- Site plan requirements
- Network requirements
- Internet connection requirements
- Maintenance requirements
- Document requirements
- User management requirements
- Audit requirements
- Security requirements
- Scope boundaries
- Acceptance criteria

---

# 2. Product Overview

CORRA IT Project Management is an internal web application for the IT Department.

The primary objective is to provide one centralized system for managing and documenting IT infrastructure associated with KORRA projects.

The system replaces scattered project information with structured digital records.

The application must allow authorized IT personnel to quickly answer questions such as:

- What projects exist?
- Who is the client?
- Who is working on each project?
- What IT equipment exists at each project?
- What brands and models are installed?
- Where is each device physically located?
- Where is each device located on the project site plan?
- What racks are installed?
- What VLANs exist?
- What IP addresses are assigned?
- What network interfaces and connections exist?
- What internet connections are available?
- What maintenance has been performed?
- What project documents are available?
- Who changed important project information?

---

# 3. Product Objectives

The system must achieve the following objectives:

1. Centralize IT project information.
2. Centralize IT infrastructure inventory.
3. Document project network infrastructure.
4. Provide a visual site plan for infrastructure locations.
5. Maintain maintenance history.
6. Store project-related IT documents.
7. Provide controlled access for IT team members.
8. Maintain an audit trail of data changes.
9. Reduce duplicated and scattered information.
10. Provide a reliable source of current IT project information.

---

# 4. Target Users

The system is intended for the KORRA IT Department.

The application has exactly two application roles:

- super_admin
- viewer

There is no public user registration.

---

# 5. User Roles

## 5.1 Super Admin

The Super Admin has full application control.

The Super Admin can:

- Create projects
- Edit projects
- Delete projects
- Manage clients
- Manage project personnel
- Manage assets
- Manage asset categories
- Manage asset brands
- Manage asset models
- Manage racks
- Manage project site plans
- Manage asset markers
- Manage VLANs
- Manage IP addresses
- Manage network interfaces
- Manage network connections
- Manage internet connections
- Manage maintenance records
- Manage project documents
- View audit logs
- Create Viewer accounts
- Manage Viewer accounts
- Activate or deactivate Viewer accounts

The Super Admin is the primary administrative user of the system.

---

## 5.2 Viewer

The Viewer role is intended for IT managers and coworkers who need access to project information without modification privileges.

Viewer users can:

- Sign in
- View projects
- View clients
- View project personnel
- View assets
- View asset categories
- View brands and models
- View racks
- View site plans
- View asset markers
- View network information
- View internet connections
- View maintenance information
- View project documents
- View permitted audit information

Viewer users cannot:

- Create records
- Edit records
- Delete records
- Create users
- Change roles
- Modify permissions
- Modify project data
- Modify infrastructure data

---

# 6. Authentication Requirements

## AUTH-001 — Login

The system must provide a secure login interface using Supabase Auth.

## AUTH-002 — No Public Registration

The application must not expose a public Sign Up flow.

## AUTH-003 — Controlled Accounts

User accounts are controlled by the Super Admin.

## AUTH-004 — User Profile

Each application user must have a corresponding user profile.

The profile must contain the user's application role.

## AUTH-005 — Active Status

The system must support activating and deactivating application users.

Inactive users must not be allowed to operate as active application users according to the database security model.

---

# 7. Authorization Requirements

## AUTHZ-001 — Role Enforcement

The system must recognize exactly two application roles:

- super_admin
- viewer

## AUTHZ-002 — Super Admin Access

Super Admin users must have full permitted CRUD access to application data.

## AUTHZ-003 — Viewer Read-Only Access

Viewer users must have read-only access to application data.

## AUTHZ-004 — Database Enforcement

Authorization must be enforced by Supabase Row Level Security.

Frontend role checks alone are not sufficient.

## AUTHZ-005 — Last Super Admin Protection

The system must prevent accidental removal or demotion of the final Super Admin.

---

# 8. Project Management

Projects are the central entity of the application.

## PROJ-001 — Create Project

A Super Admin must be able to create a project.

## PROJ-002 — Edit Project

A Super Admin must be able to edit project information.

## PROJ-003 — Delete Project

A Super Admin must be able to delete a project subject to database relationships and integrity rules.

## PROJ-004 — Project Code

Each project must have a unique project code.

## PROJ-005 — Project Name

Each project must have a project name.

## PROJ-006 — Client

A project may be associated with a client.

## PROJ-007 — Sector

The system must store the project sector or field.

## PROJ-008 — Project Status

The project status must support:

- planning
- active
- on_hold
- completed
- closed

## PROJ-009 — Dates

The system must support:

- Start date
- Expected end date
- Actual end date

## PROJ-010 — Employee Count

The project must support recording the number of employees associated with the project.

## PROJ-011 — Address

The project must store its physical address.

## PROJ-012 — GPS Location

The project must support:

- Latitude
- Longitude

GPS information is for project location.

## PROJ-013 — Project Manager

The system must store:

- Project manager name
- Project manager phone
- Project manager email

## PROJ-014 — Project Notes

The project must support additional notes.

---

# 9. Client Management

## CLIENT-001 — Client Records

The system must maintain client records.

## CLIENT-002 — Client Information

Client records must support:

- Name
- Code
- Phone
- Email
- Address
- Notes

## CLIENT-003 — Client Relationship

Projects must be able to reference their associated client.

---

# 10. Project Personnel

## PERSON-001 — Personnel Records

A project must support multiple personnel records.

## PERSON-002 — Personnel Information

Each personnel record must support:

- Full name
- Job title
- Phone
- Email
- Notes

## PERSON-003 — Project Association

Each personnel record must belong to a project.

---

# 11. Asset Management

Asset management is a core function of the application.

## ASSET-001 — Individual Asset Records

Each physical or logical IT device must be represented by an individual asset record.

## ASSET-002 — Asset Quantity

Asset quantity must be derived from the number of individual asset records.

The system must not depend on a manually maintained quantity field for individual assets.

## ASSET-003 — Asset Tag

Each asset must support an asset tag.

## ASSET-004 — Asset Project

Each asset must belong to a project.

## ASSET-005 — Asset Category

Each asset must have an asset category.

## ASSET-006 — Asset Brand

An asset may reference a brand.

## ASSET-007 — Asset Model

An asset may reference a model.

## ASSET-008 — Asset Name

An asset must support a descriptive name.

## ASSET-009 — Serial Number

An asset must support a serial number.

Serial numbers must be unique within a project when supplied.

## ASSET-010 — MAC Address

An asset must support a MAC address.

## ASSET-011 — Management IP

An asset must support management IP information.

## ASSET-012 — Asset Status

Asset status must support:

- active
- offline
- faulty
- under_maintenance
- spare
- stored
- retired
- lost

## ASSET-013 — Location

An asset must support a physical location description.

## ASSET-014 — Rack

An asset may be assigned to a rack.

## ASSET-015 — Rack Position

An asset may record:

- Starting rack unit
- Rack unit height

## ASSET-016 — Installation Date

An asset must support an installation date.

## ASSET-017 — Purchase Date

An asset must support a purchase date.

## ASSET-018 — Warranty

An asset must support a warranty end date.

## ASSET-019 — Notes

An asset must support additional notes.

---

# 12. Asset Categories

## CAT-001 — Category Management

The system must maintain centralized asset categories.

## CAT-002 — Initial Categories

The system must support the following initial categories:

- Router
- Switch
- Gateway
- Firewall
- Access Point
- CCTV Camera
- NVR
- DVR
- Biometric Device
- Rack
- Server
- UPS
- Patch Panel
- Printer
- VoIP
- Access Control
- Other

## CAT-003 — Category Code

Each category must have a code.

---

# 13. Asset Brands

## BRAND-001 — Brand Management

The Super Admin must be able to manage asset brands.

## BRAND-002 — Brand Information

A brand must support:

- Name
- Code
- Notes

---

# 14. Asset Models

## MODEL-001 — Model Management

The Super Admin must be able to manage asset models.

## MODEL-002 — Model Relationships

Each model must reference:

- One brand
- One asset category

## MODEL-003 — Model Information

A model must support:

- Name
- Part number
- Notes

## MODEL-004 — Model Integrity

The system must prevent an asset from referencing a model with a conflicting brand or category.

---

# 15. Rack Management

## RACK-001 — Rack Records

The system must support racks associated with projects.

## RACK-002 — Rack Information

Each rack must support:

- Name
- Rack units
- Location name
- Notes

## RACK-003 — Asset Assignment

Assets may be assigned to project racks.

---

# 16. Site Plan Management

Each project may have one official site plan.

## PLAN-001 — Site Plan Upload

A Super Admin must be able to upload the official project site plan.

## PLAN-002 — PNG Requirement

The official site plan must be a PNG image.

## PLAN-003 — Site Plan Metadata

The system must store:

- File path
- Original filename
- MIME type
- Width
- Height
- Project association

## PLAN-004 — Storage

The actual image file must be stored in Supabase Storage.

## PLAN-005 — One Site Plan Per Project

A project must not contain multiple active official site plan records.

---

# 17. Asset Plan Markers

## MARKER-001 — Asset Placement

A Super Admin must be able to place an asset marker on the project site plan.

## MARKER-002 — Asset Association

Each marker must reference an asset.

## MARKER-003 — Project Association

Each marker must reference a project.

The asset and marker must belong to the same project.

## MARKER-004 — Coordinates

Each marker must store:

- X percentage
- Y percentage

## MARKER-005 — Coordinate Range

X and Y coordinates must remain between 0 and 100.

## MARKER-006 — Marker Label

A marker may have a label.

## MARKER-007 — Visual Positioning

The frontend must display markers according to their percentage coordinates relative to the rendered site plan image.

---

# 18. Network Management

Network documentation is a core application function.

---

# 19. VLAN Management

## VLAN-001 — VLAN Records

The system must support VLAN records per project.

## VLAN-002 — VLAN Information

A VLAN must support:

- VLAN ID
- Name
- Purpose
- Subnet
- Gateway
- DHCP enabled
- DHCP start
- DHCP end
- DNS servers
- Notes

## VLAN-003 — Project Association

Each VLAN must belong to a project.

---

# 20. IP Address Management

## IP-001 — IP Records

The system must support IP address records.

## IP-002 — Project Association

Each IP address must belong to a project.

## IP-003 — IP Address

The database must store the IP address using an appropriate PostgreSQL network address type.

## IP-004 — Asset Association

An IP address may be associated with an asset.

## IP-005 — VLAN Association

An IP address may be associated with a VLAN.

## IP-006 — Hostname

An IP address may have a hostname.

## IP-007 — Description

An IP address may have a description.

## IP-008 — Reserved Status

An IP address must support reserved status.

## IP-009 — Project Uniqueness

The same IP address must not be duplicated within the same project.

---

# 21. Network Interface Management

## IFACE-001 — Interface Records

The system must support interfaces belonging to assets.

## IFACE-002 — Interface Information

Each interface must support:

- Interface name
- Interface type
- MAC address
- IP address
- VLAN
- Notes

## IFACE-003 — Asset Relationship

Each interface must belong to an asset.

## IFACE-004 — Project Integrity

An interface's IP and VLAN references must belong to the same project as its asset.

---

# 22. Network Connections

## CONN-001 — Connection Records

The system must support network connection records.

## CONN-002 — Source

A network connection must support:

- Source asset
- Source interface

## CONN-003 — Destination

A network connection must support:

- Destination asset
- Destination interface

## CONN-004 — Connection Type

The system must support a connection type.

## CONN-005 — Cable Label

The system must support a cable label.

## CONN-006 — Project Integrity

Source and destination assets must belong to the connection project.

Source and destination interfaces must belong to their corresponding assets.

---

# 23. Internet Connections

## INTERNET-001 — Internet Records

The system must support multiple internet connections per project.

## INTERNET-002 — Provider

Each internet connection must support a provider.

## INTERNET-003 — Connection Type

Supported types include:

- Fiber
- 4G
- 5G
- Microwave
- DSL
- Other

## INTERNET-004 — Package

The system must support package name.

## INTERNET-005 — Bandwidth

The system must support bandwidth information.

## INTERNET-006 — Public IP

The system must support public IP information.

## INTERNET-007 — Router

An internet connection may reference a router asset.

## INTERNET-008 — Account Information

The system must support:

- Account number
- Contract number

## INTERNET-009 — Dates

The system must support:

- Start date
- End date

## INTERNET-010 — Primary Connection

The system must support identifying a connection as primary.

## INTERNET-011 — Backup Connection

The system must support identifying a connection as backup.

## INTERNET-012 — Router Integrity

If a router asset is selected, the router must belong to the same project.

---

# 24. Maintenance Management

## MAINT-001 — Maintenance Records

The system must maintain IT maintenance history.

## MAINT-002 — Project Association

Each maintenance record must belong to a project.

## MAINT-003 — Asset Association

A maintenance record may reference an asset.

If an asset is referenced, it must belong to the same project.

## MAINT-004 — Status

Maintenance status must support:

- open
- in_progress
- resolved
- cancelled

## MAINT-005 — Issue

The system must store the reported issue.

## MAINT-006 — Action

The system must store the action taken.

## MAINT-007 — Parts

The system must support recording parts used.

## MAINT-008 — Technician

The system must support technician name.

## MAINT-009 — Timing

The system must support:

- Started at
- Resolved at

## MAINT-010 — Notes

The system must support maintenance notes.

## MAINT-011 — Created By

The system must record the application user who created the maintenance record.

---

# 25. Project Documents

## DOC-001 — Document Records

The system must support project-related document records.

## DOC-002 — Document Types

Supported document types include:

- Site Plan
- Network Diagram
- CCTV Layout
- Internet Document
- IP Plan
- Report
- Contract
- Other

## DOC-003 — Document Metadata

The system must store:

- Project
- Document type
- Title
- Storage path
- Original filename
- MIME type
- File size
- Uploading user
- Timestamps

## DOC-004 — Storage

The actual document files must be stored in Supabase Storage.

## DOC-005 — Project Association

Each project document must belong to a project.

---

# 26. Audit Logging

## AUDIT-001 — Audit Trail

The system must maintain an audit trail of application data changes.

## AUDIT-002 — Automatic Logging

Audit logging must be implemented at database level.

## AUDIT-003 — Operations

The audit system must record:

- INSERT
- UPDATE
- DELETE

operations affecting application tables.

## AUDIT-004 — Actor

The audit record must identify the authenticated user responsible for the operation when available.

## AUDIT-005 — Entity

The audit record must identify:

- Entity type
- Entity ID

## AUDIT-006 — Project

The audit record should identify the associated project when applicable.

## AUDIT-007 — Previous Data

For updates and deletes, previous data must be available in the audit record when applicable.

## AUDIT-008 — New Data

For inserts and updates, new data must be available in the audit record when applicable.

## AUDIT-009 — Timestamp

Each audit event must contain a timestamp.

## AUDIT-010 — Immutability

Normal authenticated users must not be able to update or delete audit records.

---

# 27. Dashboard Requirements

The application should provide a clear operational dashboard.

The dashboard should provide quick access to the major application areas.

The dashboard may display current information derived from the database, including:

- Project count
- Active project information
- Asset information
- Maintenance information
- Internet connection information

The dashboard must not introduce a separate data store.

Dashboard values must be derived from current Supabase data.

---

# 28. Project Details Requirements

Project details are the central operational view.

The project details interface should provide access to:

- Project information
- Client information
- Project personnel
- Site plan
- Asset inventory
- Asset locations
- Racks
- VLANs
- IP addresses
- Network interfaces
- Network connections
- Internet connections
- Maintenance records
- Project documents
- Relevant audit history

Super Admin users can modify applicable records.

Viewer users can view the same information in read-only mode.

---

# 29. Search and Filtering

The application should support practical search and filtering where required for operational use.

Examples include:

- Search projects
- Filter projects by status
- Search assets
- Filter assets by category
- Filter assets by project
- Search asset tags
- Search serial numbers
- Search IP addresses
- Filter maintenance records
- Search project documents

Search and filtering must use the existing database model.

---

# 30. User Interface Requirements

The interface must be clear and suitable for daily IT Department use.

The application should provide:

- Clear navigation
- Consistent forms
- Consistent tables
- Clear action buttons
- Read-only presentation for Viewers
- Loading states
- Error states
- Success feedback
- Confirmation for destructive actions

The interface must not expose controls that the current user is not authorized to use.

---

# 31. Form Requirements

Forms must use the actual database fields.

Forms must:

1. Load valid reference data.
2. Validate user input.
3. Respect required fields.
4. Respect database relationships.
5. Submit through the authenticated Supabase client.
6. Handle database errors.
7. Provide clear user feedback.
8. Refresh or update displayed data after successful operations.

Frontend validation is for usability.

Database constraints remain authoritative.

---

# 32. Error Handling Requirements

The application must handle:

- Invalid login
- Expired session
- Unauthorized operation
- Database validation errors
- Foreign key violations
- Unique constraint violations
- Storage upload failures
- Storage access failures
- Network failures
- Missing records

Errors should be presented clearly to users.

Sensitive technical information must not be exposed unnecessarily.

---

# 33. Storage Requirements

Supabase Storage is used for:

- Project site plan images
- Project documents

The database stores metadata and storage paths.

The frontend must access files through authenticated Supabase operations and the applicable Storage security policies.

---

# 34. Security Requirements

## SEC-001 — Supabase Auth

Authentication must use Supabase Auth.

## SEC-002 — RLS

All application tables must use Row Level Security.

## SEC-003 — No Public Data Access

Anonymous users must not have access to protected application data.

## SEC-004 — Viewer Restrictions

Viewer users must remain read-only.

## SEC-005 — Privileged Credentials

Service-role or other privileged Supabase credentials must never be exposed in frontend code.

## SEC-006 — Secrets

Secrets must not be committed to the repository.

## SEC-007 — Database Security

Security-sensitive authorization rules must be enforced by the database.

## SEC-008 — Audit Protection

Audit records must not be modifiable or deletable through normal application access.

---

# 35. Architecture Requirements

## ARCH-001 — Frontend

The application frontend must use TypeScript.

## ARCH-002 — Supabase

Supabase Cloud must provide:

- PostgreSQL
- Auth
- Storage
- RLS

## ARCH-003 — No Separate Backend

The current product does not include a separate backend server.

## ARCH-004 — Direct Supabase Access

The frontend communicates directly with Supabase through the Supabase client.

## ARCH-005 — Database Source of Truth

Supabase PostgreSQL is the authoritative application data source.

---

# 36. Performance Requirements

The application should remain responsive during normal IT Department use.

The frontend should:

- Avoid unnecessary database queries
- Avoid duplicate requests
- Load only required data where practical
- Use pagination for large datasets
- Use appropriate filtering
- Avoid loading large unrelated datasets

Performance optimizations must not bypass RLS or database integrity.

---

# 37. Data Integrity Requirements

The database must protect:

- Foreign key relationships
- Unique values
- Valid enum values
- Valid site plan MIME type
- Valid marker coordinates
- Project consistency
- Asset/model consistency
- Network consistency
- Maintenance/project consistency
- Internet/project consistency

The frontend must follow the database constraints.

---

# 38. Project Isolation Requirements

Project-related records must remain associated with their correct project.

The system must prevent cross-project relationships where the schema requires project consistency.

Examples:

- Asset markers cannot reference assets from another project.
- Network interfaces cannot reference IPs from another project.
- Network interfaces cannot reference VLANs from another project.
- Network connections cannot connect assets from unrelated projects.
- Internet connections cannot reference router assets from another project.
- Maintenance records cannot reference assets from another project.

---

# 39. Out-of-Scope Requirements

The following are explicitly outside the current product scope:

- HR management
- Payroll
- Finance
- Procurement
- CRM
- General Help Desk
- SIEM
- Full network monitoring
- Financial project management
- Procurement lifecycle management

The application must not expand into these areas without an explicit product scope decision.

---

# 40. Non-Functional Requirements

## NFR-001 — Reliability

The system must rely on Supabase Cloud for persistent application data.

## NFR-002 — Security

Database security must be enforced through RLS and PostgreSQL controls.

## NFR-003 — Maintainability

Frontend code must follow a clear TypeScript/React structure.

## NFR-004 — Data Integrity

Relational data must be protected by database constraints and integrity rules.

## NFR-005 — Auditability

Important data changes must be traceable through audit logging.

## NFR-006 — Usability

The application must be practical for daily use by the IT Department.

## NFR-007 — Consistency

Database names, frontend types, forms, and application logic must remain consistent.

---

# 41. Acceptance Criteria

The product is considered functionally aligned with this PRD when the following are true:

1. Users can securely sign in through Supabase Auth.
2. Public self-registration is not exposed.
3. The application recognizes only Super Admin and Viewer roles.
4. Super Admin users can perform authorized management operations.
5. Viewer users are read-only.
6. RLS enforces the role permissions at database level.
7. Projects can be created and managed.
8. Clients can be associated with projects.
9. Project personnel can be managed.
10. Individual IT assets can be recorded.
11. Asset categories, brands, and models can be managed.
12. Asset model relationships remain consistent.
13. Racks can be managed and assigned to projects.
14. An official PNG site plan can be stored for a project.
15. Assets can be positioned on the site plan using percentage coordinates.
16. Marker coordinates remain between 0 and 100.
17. VLANs can be documented.
18. IP addresses can be documented.
19. Network interfaces can be documented.
20. Network connections can be documented.
21. Internet connections can be documented.
22. Maintenance records can be documented.
23. Project documents can be stored and referenced.
24. Audit records are automatically generated for application data changes.
25. Audit records cannot be normally updated or deleted.
26. Cross-project data relationships are prevented.
27. Supabase Storage is used for site plans and project documents.
28. No privileged Supabase credentials are exposed to the browser.
29. The frontend communicates directly with Supabase.
30. No separate backend server is required by the current architecture.
31. The application remains within the defined IT project management scope.

---

# 42. Product Success Criteria

The system is successful when the IT Department can use it as the central source of truth for project IT information.

For each project, the IT team should be able to determine:

- Who the client is.
- Who works on the project.
- What IT equipment exists.
- How many individual assets exist.
- What brand and model each asset uses.
- Where assets are physically located.
- Where assets are located on the site plan.
- What racks exist.
- What VLANs exist.
- What IP addresses exist.
- How network devices are connected.
- What internet connections exist.
- What maintenance has occurred.
- What project documents are available.
- What important changes have been made.

The system must provide this information through one controlled application backed by Supabase Cloud.

---

# 43. Final Product Definition

CORRA IT Project Management is an internal IT project and infrastructure management system.

The product is centered on projects and their associated IT information.

The product architecture consists of:

- TypeScript frontend
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Row Level Security

There is no separate backend application.

The system provides controlled access through exactly two roles:

- super_admin
- viewer

The product is intentionally focused on IT project management and infrastructure documentation and must not expand into unrelated business domains without explicit approval.