# CORRA IT Project Management

Internal IT Project Management System for KORRA.

## 1. Overview

CORRA IT Project Management is an internal web application for the IT Department.

The system centralizes IT project information and infrastructure documentation for KORRA construction projects.

The application manages:

- Projects
- Clients
- Project personnel
- IT assets and equipment
- Asset categories
- Asset brands and models
- Racks
- Project site plans
- Asset locations on site plans
- VLANs
- IP addresses
- Network interfaces
- Network connections
- Internet connections
- Maintenance records
- Project documents
- Audit logs
- Application users and permissions

The system is designed specifically for internal IT project and infrastructure management.

---

## 2. Architecture

The application uses a direct frontend-to-Supabase architecture.

The architecture consists of:

- TypeScript frontend
- Supabase Cloud
- PostgreSQL Database
- Supabase Auth
- Supabase Storage
- Row Level Security (RLS)

There is no separate backend application or backend server.

The frontend communicates directly with Supabase through the Supabase client.

Database authorization and security are enforced by PostgreSQL and Supabase RLS.

---

## 3. Technology Stack

### Frontend

- TypeScript
- React
- Supabase JavaScript client

### Cloud Platform

Supabase Cloud provides:

- PostgreSQL
- Authentication
- Storage
- Row Level Security

No standalone backend service is part of the current architecture.

---

## 4. Authentication

Authentication is handled by Supabase Auth.

The application does not provide public self-registration.

Application users are controlled by the Super Admin.

Each authenticated application user has a corresponding record in the user_profiles table.

The user_profiles record is associated with the Supabase Auth user through auth_user_id.

---

## 5. Application Roles

The application has exactly two roles:

- super_admin
- viewer

### 5.1 Super Admin

The Super Admin has full control over the application.

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
- Upload and manage project site plans
- Manage asset markers on site plans
- Manage VLANs
- Manage IP addresses
- Manage network interfaces
- Manage network connections
- Manage internet connections
- Manage maintenance records
- Manage project documents
- View audit logs
- Manage Viewer accounts
- Activate and deactivate Viewer accounts
- Perform all permitted application operations

### 5.2 Viewer

Viewer accounts are created and managed by the Super Admin.

A Viewer can:

- Sign in
- View projects
- View project information
- View project personnel
- View assets
- View site plans
- View asset locations
- View network information
- View internet connections
- View maintenance information
- View permitted audit information

A Viewer cannot:

- Create records
- Edit records
- Delete records
- Create users
- Change user roles
- Change permissions
- Modify project information
- Modify infrastructure information

---

## 6. User Management

There is no public registration flow.

Users are managed internally.

The application maintains user profile information in the user_profiles table.

User profiles contain information such as:

- Full name
- Job title
- Phone
- Application role
- Active/inactive status

The application supports the following roles only:

- super_admin
- viewer

The system protects the existence of the final Super Admin account.

The last Super Admin cannot be deleted or demoted through the database rules.

---

## 7. Security

Security is enforced at the database level using Supabase Row Level Security.

All application tables have RLS enabled.

The general permission model is:

- Super Admin: full permitted access
- Viewer: read-only access
- Anonymous users: no application data access

Frontend permission checks are used for user experience and navigation.

Frontend checks are not considered the authoritative security boundary.

RLS is the authoritative authorization layer.

---

## 8. Projects

Projects are the primary business entity in the system.

A project contains:

- Project code
- Project name
- Client
- Sector
- Project status
- Start date
- Expected end date
- Actual end date
- Employee count
- Address
- Latitude
- Longitude
- Project manager name
- Project manager phone
- Project manager email
- Notes

Each project can contain its own:

- Personnel
- Site plan
- Assets
- Racks
- VLANs
- IP addresses
- Network interfaces
- Network connections
- Internet connections
- Maintenance records
- Documents
- Asset markers

---

## 9. Clients

Clients represent organizations or entities associated with projects.

Client information includes:

- Name
- Code
- Phone
- Email
- Address
- Notes

A project can reference a client.

---

## 10. Project Personnel

Each project can have multiple engineers or other personnel working within the project and benefiting from IT services.

Personnel information includes:

- Full name
- Job title
- Phone
- Email
- Notes

Personnel records belong to their associated project.

---

## 11. IT Assets

Assets represent individual IT infrastructure devices or equipment.

Supported asset categories include:

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

Each physical or logical device is represented by an individual asset record.

Asset quantity is derived from the number of asset records.

A manually maintained quantity field is not used for individual asset inventory.

---

## 12. Asset Information

An asset can contain information such as:

- Asset tag
- Project
- Category
- Brand
- Model
- Name
- Serial number
- MAC address
- Management IP
- Status
- Location
- Rack
- Rack unit position
- Installation date
- Purchase date
- Warranty end date
- Notes

The database enforces consistency between the asset, its model, brand, and category.

---

## 13. Asset Categories

Asset categories classify IT infrastructure.

The initial categories include:

- router
- switch
- gateway
- firewall
- access_point
- cctv_camera
- nvr
- dvr
- biometric
- rack
- server
- ups
- patch_panel
- printer
- voip
- access_control
- other

Categories are maintained centrally and can be referenced by assets and asset models.

---

## 14. Asset Brands and Models

Brands and models are maintained as separate entities.

An asset model belongs to:

- One brand
- One asset category

Assets can reference their:

- Category
- Brand
- Model

The database prevents inconsistent model, brand, and category combinations.

---

## 15. Racks

Racks belong to projects.

Rack information includes:

- Rack name
- Rack units
- Location name
- Notes

An asset can optionally be assigned to a rack.

Rack unit position can also be recorded for installed assets.

---

## 16. Project Site Plan

Each project can have one official site plan.

The site plan is intended to be an AutoCAD-exported PNG image.

The database stores site plan metadata while the actual image file is stored in Supabase Storage.

Site plan information includes:

- Project
- File path
- Original filename
- MIME type
- Image width
- Image height
- Creation timestamp
- Update timestamp

The system requires the official site plan to be a PNG image.

---

## 17. Asset Locations on Site Plans

Assets can be placed visually on the project site plan.

Each asset marker is associated with:

- Project
- Asset
- X coordinate
- Y coordinate
- Optional label

Coordinates are stored as percentages from 0 to 100.

This allows the frontend to position markers correctly regardless of the displayed image size.

The database validates that X and Y coordinates remain within the allowed range.

An asset marker must reference an asset belonging to the same project.

---

## 18. Network Information

The system stores network infrastructure information for each project.

### VLANs

A project can contain multiple VLAN records.

VLAN information includes:

- VLAN ID
- Name
- Purpose
- Subnet
- Gateway
- DHCP status
- DHCP start
- DHCP end
- DNS servers
- Notes

### IP Addresses

IP addresses belong to projects.

An IP address can optionally be associated with:

- Asset
- VLAN
- Hostname

IP addresses use PostgreSQL network address types.

Each project cannot contain duplicate IP addresses.

### Network Interfaces

Network interfaces belong to assets.

An interface can contain:

- Interface name
- Interface type
- MAC address
- IP address
- VLAN
- Notes

The database ensures that referenced IP and VLAN records belong to the correct project.

### Network Connections

Network connections document connections between infrastructure assets.

A connection can contain:

- Source asset
- Source interface
- Destination asset
- Destination interface
- Connection type
- Cable label
- Notes

The database validates project and asset/interface relationships.

---

## 19. Internet Connections

Projects can have one or more internet connections.

Internet connection information includes:

- Provider
- Connection type
- Package name
- Bandwidth
- Public IP
- Router asset
- Account number
- Contract number
- Start date
- End date
- Primary status
- Backup status
- Notes

If an internet connection references a router asset, that asset must belong to the same project.

Supported connection types include:

- Fiber
- 4G
- 5G
- Microwave
- DSL
- Other

---

## 20. Maintenance

Maintenance records document maintenance work performed on IT assets.

A maintenance record can contain:

- Project
- Asset
- Status
- Issue
- Action taken
- Parts used
- Technician name
- Start time
- Resolution time
- Notes
- Creating user

Maintenance records must reference an asset belonging to the same project when an asset is specified.

Supported maintenance statuses include:

- open
- in_progress
- resolved
- cancelled

---

## 21. Project Documents

Project documents provide controlled storage for project-related files.

Supported document classifications include:

- Site plan
- Network diagram
- CCTV layout
- Internet document
- IP plan
- Report
- Contract
- Other

Document metadata is stored in PostgreSQL.

The actual files are stored in Supabase Storage.

---

## 22. Audit Logs

The system maintains an audit trail of application data changes.

Audit information includes:

- Actor user
- Action
- Entity type
- Entity ID
- Project
- Previous data
- New data
- Timestamp

Audit records are generated automatically by database triggers for application-table changes.

Audit records are intended to be immutable.

Authenticated users cannot update or delete audit records through normal application permissions.

---

## 23. Database Tables

The application database contains the following primary tables:

- user_profiles
- clients
- projects
- project_engineers
- project_site_plan
- asset_categories
- asset_brands
- asset_models
- racks
- assets
- asset_plan_markers
- network_vlans
- ip_addresses
- network_interfaces
- network_connections
- internet_connections
- maintenance_records
- project_documents
- audit_logs

The authoritative database structure is documented in DATABASE_SCHEMA.md.

---

## 24. Supabase Storage

Supabase Storage is used for project-related files.

The main stored files are:

- Project site plan PNG files
- Project documents

PostgreSQL stores the metadata and storage path for these files.

The frontend accesses Storage through the authenticated Supabase client and the applicable Storage security policies.

---

## 25. Frontend Responsibilities

The frontend is responsible for:

- Authentication interface
- Application navigation
- Project management screens
- Client management screens
- Project personnel screens
- Asset inventory screens
- Asset category management
- Brand management
- Model management
- Rack management
- Site plan display
- Asset marker interaction
- VLAN management
- IP management
- Network interface management
- Network connection management
- Internet connection management
- Maintenance management
- Project document management
- User management for Super Admin
- Audit log viewing
- Form validation
- Loading states
- Error handling
- User feedback

The frontend must use the existing Supabase database model.

---

## 26. Database Responsibilities

Supabase PostgreSQL is responsible for:

- Data persistence
- Relational integrity
- Foreign key enforcement
- Unique constraints
- Check constraints
- Data validation
- Row Level Security
- Authorization enforcement
- Cross-record integrity rules
- Automatic audit logging

Business-critical security rules must not depend exclusively on frontend code.

---

## 27. Development Rules

### Rule 1 — No Separate Backend

Do not introduce a separate backend server.

Do not create an Express, Node.js, Python, or other API server for the core application unless the architecture is explicitly changed.

### Rule 2 — Do Not Bypass RLS

All normal frontend database operations must use the authenticated Supabase client.

Do not bypass database authorization.

### Rule 3 — Never Expose Privileged Credentials

Never place a Supabase service-role key or other privileged secret in frontend code.

Only browser-safe Supabase configuration may be used in the frontend.

### Rule 4 — Follow the Database Schema

Frontend code must use the actual database table and column names.

Do not invent alternate field names.

Do not create duplicate tables for concepts that already exist.

### Rule 5 — Preserve Data Integrity

Frontend forms must respect database relationships and constraints.

Database constraints remain authoritative.

### Rule 6 — Keep the Scope Controlled

Do not add unrelated systems or features such as:

- HR
- Payroll
- Finance
- Procurement
- CRM
- General Help Desk
- SIEM
- Full Network Monitoring
- Financial Project Management
- Procurement Lifecycle

These are outside the current project scope.

---

## 28. Documentation

The main project documentation consists of:

- README.md
- ARCHITECTURE.md
- DATABASE_SCHEMA.md
- PRD.md

### README.md

Project overview, scope, architecture summary, security model, and development rules.

### ARCHITECTURE.md

Detailed technical architecture and frontend/Supabase structure.

### DATABASE_SCHEMA.md

Authoritative database tables, columns, relationships, constraints, indexes, RLS policies, and database behavior.

### PRD.md

Product requirements and functional requirements.

---

## 29. Source of Truth

The database schema is the authoritative source for data structure and database-level behavior.

The application architecture must follow the database design.

The frontend implementation must follow both the architecture and database schema.

Any change to the database structure, security model, application roles, or core architecture must be explicitly reviewed before implementation.

---

## 30. Project Scope Summary

CORRA IT Project Management is an internal IT project and infrastructure management system.

Its core structure is:

Projects contain clients, personnel, site plans, assets, network information, internet connections, maintenance records, documents, and audit history.

The system provides the IT Department with one centralized source of information for the infrastructure associated with KORRA projects.

The application is intentionally focused on IT project and infrastructure management and documentation.