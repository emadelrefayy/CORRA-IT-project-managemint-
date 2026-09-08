# CORRA IT Project Management — Database Schema

## 1. Document Purpose

This document defines the database schema for the CORRA IT Project Management application.

The database is implemented in Supabase PostgreSQL.

This document describes:

- Database tables
- Columns
- Data types
- Relationships
- Constraints
- Enumerations
- Indexing
- Data integrity rules
- Row Level Security
- Audit logging
- Storage-related metadata
- Database responsibilities

The deployed Supabase database is the authoritative source of the actual database structure.

Any change to the database schema must be reflected in this document.

---

## 2. Database Platform

The application uses:

- Supabase Cloud
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security

The application does not use a separate backend database.

The frontend communicates directly with Supabase.

---

## 3. Database Design Principles

The database follows these principles:

1. Projects are the central operational entity.
2. Infrastructure assets are stored individually.
3. Asset quantity is derived from asset records.
4. Relationships are enforced with foreign keys.
5. Data integrity is enforced at database level.
6. RLS controls application data access.
7. Audit logging is handled at database level.
8. Storage files are represented by database metadata.
9. Project-related records must remain project-consistent.
10. The database is the authoritative source of application data.

---

## 4. Schemas

The primary application data is stored in the PostgreSQL `public` schema.

Private helper functions used by database security and integrity logic may exist in the `private` schema.

The private schema is not part of the application's public data model.

---

# 5. Enumerations

## 5.1 app_role

Application roles:

- super_admin
- viewer

No other application role is part of the current system.

---

## 5.2 project_status

Project status values:

- planning
- active
- on_hold
- completed
- closed

---

## 5.3 asset_status

Asset status values:

- active
- offline
- faulty
- under_maintenance
- spare
- stored
- retired
- lost

---

## 5.4 maintenance_status

Maintenance status values:

- open
- in_progress
- resolved
- cancelled

---

## 5.5 document_type

Supported project document types:

- site_plan
- network_diagram
- cctv_layout
- internet_document
- ip_plan
- report
- contract
- other

---

## 5.6 internet_connection_type

Supported internet connection types:

- fiber
- 4g
- 5g
- microwave
- dsl
- other

---

# 6. Table: user_profiles

Stores application-level user profiles linked to Supabase Auth.

## Columns

### id

- Type: UUID
- Primary key
- Unique identifier for the profile

### auth_user_id

- Type: UUID
- Not nullable
- Unique
- References the corresponding Supabase Auth user

### full_name

- Type: TEXT
- User's full name

### job_title

- Type: TEXT
- User's job title

### phone

- Type: TEXT
- User's phone number

### role

- Type: app_role
- Application role
- Supported values:
  - super_admin
  - viewer

### is_active

- Type: BOOLEAN
- Indicates whether the application account is active

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Relationships

user_profiles.auth_user_id references auth.users.id.

---

# 7. Table: clients

Stores client or beneficiary organizations associated with projects.

## Columns

### id

- Type: UUID
- Primary key

### name

- Type: TEXT
- Client name

### code

- Type: TEXT
- Client code

### phone

- Type: TEXT
- Client phone number

### email

- Type: TEXT
- Client email address

### address

- Type: TEXT
- Client address

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Relationships

A client can be associated with multiple projects.

---

# 8. Table: projects

Central entity for IT project management.

## Columns

### id

- Type: UUID
- Primary key

### project_code

- Type: TEXT
- Unique
- Official project identifier

### name

- Type: TEXT
- Project name

### client_id

- Type: UUID
- References clients.id

### sector

- Type: TEXT
- Project sector or field

### status

- Type: project_status
- Project lifecycle status

### start_date

- Type: DATE
- Project start date

### expected_end_date

- Type: DATE
- Expected project completion date

### actual_end_date

- Type: DATE
- Actual project completion date

### employee_count

- Type: INTEGER
- Number of employees associated with the project

### address

- Type: TEXT
- Project address

### latitude

- Type: NUMERIC
- Project latitude

### longitude

- Type: NUMERIC
- Project longitude

### project_manager_name

- Type: TEXT
- Project manager name

### project_manager_phone

- Type: TEXT
- Project manager phone

### project_manager_email

- Type: TEXT
- Project manager email

### notes

- Type: TEXT
- Additional project notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Relationships

projects.client_id references clients.id.

A project can have:

- Multiple project engineers
- One site plan
- Multiple assets
- Multiple racks
- Multiple VLANs
- Multiple IP addresses
- Multiple network connections
- Multiple internet connections
- Multiple maintenance records
- Multiple project documents
- Multiple asset markers

---

# 9. Table: project_engineers

Stores engineers and other project personnel.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### full_name

- Type: TEXT
- Personnel full name

### job_title

- Type: TEXT
- Job title

### phone

- Type: TEXT
- Phone number

### email

- Type: TEXT
- Email address

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Relationships

Each project engineer belongs to one project.

---

# 10. Table: project_site_plan

Stores metadata for the official project site plan.

Each project can have one site plan.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- Unique
- References projects.id

### file_path

- Type: TEXT
- Supabase Storage path

### original_filename

- Type: TEXT
- Original uploaded filename

### mime_type

- Type: TEXT
- MIME type of the stored image

### width

- Type: INTEGER
- Image width

### height

- Type: INTEGER
- Image height

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Rules

The site plan is intended to be a PNG image.

The database validates the MIME type as PNG.

The actual image file is stored in Supabase Storage.

---

# 11. Table: asset_categories

Stores IT infrastructure asset categories.

## Columns

### id

- Type: UUID
- Primary key

### name

- Type: TEXT
- Category name

### code

- Type: TEXT
- Unique category code

### description

- Type: TEXT
- Category description

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

## Initial Categories

The initial categories are:

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

---

# 12. Table: asset_brands

Stores infrastructure equipment brands.

## Columns

### id

- Type: UUID
- Primary key

### name

- Type: TEXT
- Brand name

### code

- Type: TEXT
- Brand code

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

---

# 13. Table: asset_models

Stores equipment models.

## Columns

### id

- Type: UUID
- Primary key

### brand_id

- Type: UUID
- References asset_brands.id

### category_id

- Type: UUID
- References asset_categories.id

### name

- Type: TEXT
- Model name

### part_number

- Type: TEXT
- Manufacturer part number

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Integrity

Each model belongs to one brand and one category.

Assets referencing a model must use the corresponding brand and category.

This relationship is enforced at database level.

---

# 14. Table: racks

Stores physical equipment racks.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### name

- Type: TEXT
- Rack name or identifier

### rack_units

- Type: INTEGER
- Rack capacity in U

### location_name

- Type: TEXT
- Physical rack location

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Relationships

Each rack belongs to one project.

A project can have multiple racks.

---

# 15. Table: assets

Stores individual IT infrastructure devices.

## Columns

### id

- Type: UUID
- Primary key

### asset_tag

- Type: TEXT
- Asset identifier

### project_id

- Type: UUID
- Not nullable
- References projects.id

### category_id

- Type: UUID
- References asset_categories.id

### brand_id

- Type: UUID
- References asset_brands.id

### model_id

- Type: UUID
- References asset_models.id

### name

- Type: TEXT
- Asset name

### serial_number

- Type: TEXT
- Device serial number

### mac_address

- Type: TEXT
- Device MAC address

### management_ip

- Type: TEXT
- Management IP information

### status

- Type: asset_status
- Current asset status

### location_name

- Type: TEXT
- Physical location

### rack_id

- Type: UUID
- References racks.id

### rack_u_start

- Type: INTEGER
- Starting rack unit position

### rack_u_height

- Type: INTEGER
- Number of rack units occupied

### installation_date

- Type: DATE
- Installation date

### purchase_date

- Type: DATE
- Purchase date

### warranty_end_date

- Type: DATE
- Warranty end date

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Constraints

Serial numbers are unique within a project when provided.

Asset model, brand, and category relationships must remain consistent.

If rack information is used, the rack must belong to the same project.

## Quantity Model

The database does not store a manually maintained quantity field.

Asset quantity is derived from the number of asset records.

For example, if a project contains ten router asset records, the router quantity is ten.

---

# 16. Table: asset_plan_markers

Stores asset positions on the project site plan.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### asset_id

- Type: UUID
- Not nullable
- References assets.id

### x_percent

- Type: NUMERIC
- Horizontal position as percentage

### y_percent

- Type: NUMERIC
- Vertical position as percentage

### label

- Type: TEXT
- Optional marker label

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Constraints

x_percent must be between 0 and 100.

y_percent must be between 0 and 100.

The referenced asset must belong to the same project as the marker.

---

# 17. Table: network_vlans

Stores VLAN definitions for projects.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### vlan_id

- Type: INTEGER
- VLAN identifier

### name

- Type: TEXT
- VLAN name

### purpose

- Type: TEXT
- VLAN purpose

### subnet

- Type: TEXT
- VLAN subnet

### gateway

- Type: TEXT
- VLAN gateway

### dhcp_enabled

- Type: BOOLEAN
- Indicates whether DHCP is enabled

### dhcp_start

- Type: TEXT
- DHCP start address

### dhcp_end

- Type: TEXT
- DHCP end address

### dns_servers

- Type: TEXT
- DNS server information

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Relationships

Each VLAN belongs to one project.

---

# 18. Table: ip_addresses

Stores IP address assignments.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### address

- Type: INET
- IP address

### asset_id

- Type: UUID
- References assets.id

### vlan_id

- Type: UUID
- References network_vlans.id

### hostname

- Type: TEXT
- Hostname

### description

- Type: TEXT
- Description

### is_reserved

- Type: BOOLEAN
- Indicates whether the address is reserved

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Constraints

The same IP address cannot be duplicated within the same project.

If an asset is referenced, it must belong to the same project.

If a VLAN is referenced, it must belong to the same project.

---

# 19. Table: network_interfaces

Stores interfaces belonging to assets.

## Columns

### id

- Type: UUID
- Primary key

### asset_id

- Type: UUID
- Not nullable
- References assets.id

### interface_name

- Type: TEXT
- Interface identifier

### interface_type

- Type: TEXT
- Interface type

### mac_address

- Type: TEXT
- Interface MAC address

### ip_address_id

- Type: UUID
- References ip_addresses.id

### vlan_id

- Type: UUID
- References network_vlans.id

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Integrity

The interface's IP address must belong to the same project as the interface's asset.

The interface's VLAN must belong to the same project as the interface's asset.

---

# 20. Table: network_connections

Stores physical or logical network connections.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### source_asset_id

- Type: UUID
- References assets.id

### source_interface_id

- Type: UUID
- References network_interfaces.id

### destination_asset_id

- Type: UUID
- References assets.id

### destination_interface_id

- Type: UUID
- References network_interfaces.id

### connection_type

- Type: TEXT
- Connection type

### cable_label

- Type: TEXT
- Cable identifier

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Integrity

The source asset must belong to the connection project.

The destination asset must belong to the connection project.

The source interface must belong to the source asset.

The destination interface must belong to the destination asset.

These relationships are validated at database level.

---

# 21. Table: internet_connections

Stores internet service connections associated with projects.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### provider

- Type: TEXT
- Internet service provider

### connection_type

- Type: internet_connection_type
- Connection technology

### package_name

- Type: TEXT
- Internet package name

### bandwidth

- Type: TEXT
- Connection bandwidth

### public_ip

- Type: TEXT
- Public IP information

### router_asset_id

- Type: UUID
- References assets.id

### account_number

- Type: TEXT
- Provider account number

### contract_number

- Type: TEXT
- Contract number

### start_date

- Type: DATE
- Service start date

### end_date

- Type: DATE
- Service end date

### is_primary

- Type: BOOLEAN
- Indicates primary connection

### is_backup

- Type: BOOLEAN
- Indicates backup connection

### notes

- Type: TEXT
- Additional notes

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Integrity

If router_asset_id is provided, the router asset must belong to the same project.

---

# 22. Table: maintenance_records

Stores IT maintenance history.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### asset_id

- Type: UUID
- References assets.id

### status

- Type: maintenance_status
- Maintenance status

### issue

- Type: TEXT
- Reported issue

### action_taken

- Type: TEXT
- Action performed

### parts_used

- Type: TEXT
- Parts used during maintenance

### technician_name

- Type: TEXT
- Technician name

### started_at

- Type: TIMESTAMPTZ
- Maintenance start time

### resolved_at

- Type: TIMESTAMPTZ
- Resolution time

### notes

- Type: TEXT
- Additional notes

### created_by

- Type: UUID
- User who created the record

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Integrity

If asset_id is provided, the asset must belong to the same project.

created_by references the authenticated application user according to the deployed database relationship.

---

# 23. Table: project_documents

Stores metadata for project documents.

## Columns

### id

- Type: UUID
- Primary key

### project_id

- Type: UUID
- Not nullable
- References projects.id

### document_type

- Type: document_type
- Document classification

### title

- Type: TEXT
- Document title

### storage_path

- Type: TEXT
- Supabase Storage path

### original_filename

- Type: TEXT
- Original filename

### mime_type

- Type: TEXT
- File MIME type

### file_size

- Type: BIGINT
- File size

### uploaded_by

- Type: UUID
- User who uploaded the document

### created_at

- Type: TIMESTAMPTZ
- Record creation timestamp

### updated_at

- Type: TIMESTAMPTZ
- Last update timestamp

## Relationships

Each document belongs to one project.

The actual document file is stored in Supabase Storage.

---

# 24. Table: audit_logs

Stores the application's audit history.

## Columns

### id

- Type: UUID
- Primary key

### actor_user_id

- Type: UUID
- User responsible for the operation

### action

- Type: TEXT
- Operation performed

### entity_type

- Type: TEXT
- Table or entity type affected

### entity_id

- Type: UUID
- Identifier of the affected record

### project_id

- Type: UUID
- Associated project when applicable

### old_data

- Type: JSONB
- Previous record state

### new_data

- Type: JSONB
- New record state

### created_at

- Type: TIMESTAMPTZ
- Audit event timestamp

## Security

Audit records are intended to be immutable.

Normal authenticated application access does not permit UPDATE or DELETE operations on audit logs.

Audit records are generated automatically by database-level audit triggers.

---

# 25. Main Relationships

The core relational structure is:

    clients
       |
       v
    projects
       |
       +-- project_engineers
       |
       +-- project_site_plan
       |
       +-- racks
       |
       +-- assets
       |     |
       |     +-- asset_categories
       |     +-- asset_brands
       |     +-- asset_models
       |     +-- racks
       |     +-- asset_plan_markers
       |
       +-- network_vlans
       |
       +-- ip_addresses
       |
       +-- network_interfaces
       |
       +-- network_connections
       |
       +-- internet_connections
       |
       +-- maintenance_records
       |
       +-- project_documents
       |
       +-- audit_logs

---

# 26. Project Consistency Rules

Project-level relationships must remain consistent.

The following rules apply:

1. An asset belongs to one project.
2. A rack belongs to one project.
3. A marker belongs to one project and one asset.
4. A marker's asset must belong to the same project.
5. A VLAN belongs to one project.
6. An IP address belongs to one project.
7. An IP assigned to an interface must belong to the same project as the asset.
8. A VLAN assigned to an interface must belong to the same project as the asset.
9. A network connection belongs to one project.
10. Both connection assets must belong to that project.
11. Source and destination interfaces must belong to their corresponding assets.
12. An internet router must belong to the same project as the internet connection.
13. A maintenance asset must belong to the same project as the maintenance record.

These rules prevent cross-project data corruption.

---

# 27. Asset Integrity Rules

Asset relationships must remain internally consistent.

The database enforces:

- Asset project relationship
- Asset model relationship
- Asset brand relationship
- Asset category relationship
- Rack/project relationship where applicable
- Project/asset marker relationship

An asset model belongs to one brand and one category.

An asset referencing a model must reference the matching brand and category.

---

# 28. Site Plan Integrity

The site plan system enforces:

- One site plan per project
- PNG MIME type
- Valid project relationship

The actual image is stored in Supabase Storage.

The database stores the corresponding Storage path and image metadata.

---

# 29. Marker Integrity

Asset markers enforce:

- Valid project
- Valid asset
- Asset belongs to marker project
- X coordinate from 0 to 100
- Y coordinate from 0 to 100

This guarantees that marker positions remain valid for the frontend map.

---

# 30. Network Integrity

Network records enforce project consistency.

The database prevents:

- Assigning an IP from another project to an interface
- Assigning a VLAN from another project to an interface
- Connecting assets from unrelated projects
- Connecting an interface to the wrong asset
- Assigning an internet router from another project

---

# 31. Maintenance Integrity

Maintenance records must remain associated with the correct project.

When a maintenance record references an asset, the asset must belong to that same project.

This prevents maintenance history from being associated with the wrong project.

---

# 32. Authentication Relationship

Application users are represented through:

Supabase Auth:

    auth.users

Application profile:

    public.user_profiles

The relationship is:

    auth.users.id
          |
          v
    user_profiles.auth_user_id

The application role is stored in user_profiles.role.

---

# 33. Row Level Security

RLS is enabled for all application tables.

The primary role model is:

### super_admin

Full permitted application access.

### viewer

Read-only application access.

### anonymous

No application data access.

---

# 34. RLS Access Model

The normal application tables follow this model:

| Operation | super_admin | viewer |
|---|---:|---:|
| SELECT | Yes | Yes |
| INSERT | Yes | No |
| UPDATE | Yes | No |
| DELETE | Yes | No |

The audit_logs table follows a stricter model.

Audit records can be inserted by the database audit mechanism and viewed according to the deployed RLS policy.

Authenticated users do not receive normal UPDATE or DELETE access to audit logs.

---

# 35. user_profiles Security

Super Admin users can manage application profiles according to the deployed RLS policies.

A Viewer can read their own profile.

A Viewer cannot modify their role or permissions.

The role is controlled by the database.

---

# 36. Last Super Admin Protection

The database protects the existence of the final Super Admin.

The last Super Admin cannot be:

- Deleted
- Demoted to Viewer

The database also protects the authentication identity relationship from unauthorized changes.

This prevents accidental removal of the only administrative account.

---

# 37. Private Security Functions

Security helper functions may be stored in the private PostgreSQL schema.

The main logical helpers include:

- Checking whether the current authenticated user is active
- Checking whether the current authenticated user is a Super Admin

These functions are used by RLS and security logic.

They are not intended to be directly exposed as public application APIs.

---

# 38. Database Audit Logging

The database includes automatic audit logging.

The audit mechanism records INSERT, UPDATE, and DELETE operations on application tables.

The audit record contains:

- Actor
- Action
- Entity type
- Entity ID
- Project
- Previous data
- New data
- Timestamp

Audit logging is implemented through PostgreSQL triggers.

This means audit creation does not depend exclusively on frontend code.

---

# 39. Audit Immutability

Audit logs are treated as historical records.

The application does not allow normal users to:

- Update audit records
- Delete audit records

The purpose is to preserve an accurate history of application changes.

---

# 40. Indexing

Indexes are used to support:

- Primary key lookups
- Foreign key relationships
- Unique identifiers
- Project-specific queries
- Asset relationships
- Network relationships
- Common application filtering

Important uniqueness rules include:

- Project code uniqueness
- Client code uniqueness where defined
- Asset category code uniqueness
- Asset brand code uniqueness
- Project/site-plan one-to-one relationship
- Project/IP address uniqueness
- Project/serial-number uniqueness for supplied serial numbers

The exact deployed indexes are part of the live PostgreSQL schema.

---

# 41. Foreign Key Integrity

Foreign keys are used to protect relationships between:

- Projects and clients
- Project personnel and projects
- Site plans and projects
- Asset models and brands
- Asset models and categories
- Assets and projects
- Assets and categories
- Assets and brands
- Assets and models
- Assets and racks
- Markers and projects
- Markers and assets
- VLANs and projects
- IP addresses and projects
- IP addresses and assets
- IP addresses and VLANs
- Interfaces and assets
- Interfaces and IP addresses
- Interfaces and VLANs
- Network connections and projects
- Network connections and assets
- Network connections and interfaces
- Internet connections and projects
- Internet connections and router assets
- Maintenance records and projects
- Maintenance records and assets
- Project documents and projects

---

# 42. Storage Relationship

Database records do not contain the actual binary file contents for site plans and project documents.

Instead, the database stores:

- Storage path
- Original filename
- MIME type
- File size where applicable
- Image dimensions where applicable

The actual files reside in Supabase Storage.

---

# 43. Data Ownership

The project is the main ownership boundary for infrastructure data.

Project-related data should always reference its parent project where the schema requires project ownership.

This makes it possible to query and secure infrastructure on a project-by-project basis.

---

# 44. Database and Frontend Contract

The frontend must use the actual deployed database names.

The following must not be invented in frontend code:

- Alternative table names
- Alternative column names
- Alternative enum values
- Alternative role values
- Alternative relationship structures

If a field does not exist in the database, the frontend must not assume that it exists.

If a required field is missing from the schema, the schema must be reviewed before implementation.

---

# 45. Schema Change Rules

Any schema change must be implemented through a controlled database migration.

Changes must be reviewed for:

- Existing data
- Foreign keys
- Constraints
- RLS
- Triggers
- Indexes
- Frontend compatibility
- Storage compatibility
- Audit behavior

Schema changes must not be performed by silently modifying production structures without documentation.

---

# 46. Out-of-Scope Database Domains

The database intentionally does not contain business domains for:

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

These domains are outside the current application scope.

---

# 47. Database Source of Truth

The deployed Supabase PostgreSQL schema is the authoritative source of truth.

DATABASE_SCHEMA.md documents the intended and implemented model.

When a discrepancy exists between this document and the deployed database, the deployed database must be inspected and the documentation must be corrected.

The frontend must ultimately follow the verified deployed schema.

---

# 48. Schema Summary

The database contains 19 primary application tables:

1. user_profiles
2. clients
3. projects
4. project_engineers
5. project_site_plan
6. asset_categories
7. asset_brands
8. asset_models
9. racks
10. assets
11. asset_plan_markers
12. network_vlans
13. ip_addresses
14. network_interfaces
15. network_connections
16. internet_connections
17. maintenance_records
18. project_documents
19. audit_logs

The schema is designed around one central concept:

Projects contain the IT infrastructure, network information, personnel, site plans, maintenance history, and documentation required by the IT Department.

The database provides the relational integrity, authorization, and audit controls required by the application.