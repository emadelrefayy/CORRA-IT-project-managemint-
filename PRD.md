CORRA IT Project Management

Product Requirements Document

1. Product Definition

Product Name

CORRA IT Project Management

Product Type

Internal Enterprise Web Application

Primary Department

IT Department

Primary Purpose

Centralize project information and IT infrastructure management for CORRA construction projects.

---

2. Problem Statement

The IT department manages infrastructure across multiple construction projects.

Information may currently be distributed across different sources.

This creates:

- Information fragmentation
- Slow information retrieval
- Difficult infrastructure tracking
- Incomplete network documentation
- Loss of technical knowledge
- Difficult maintenance history tracking
- Dependency on individual engineers

The product will provide one centralized system.

---

3. Product Goals

The product must:

1. Centralize project information.
2. Centralize IT infrastructure information.
3. Track every physical asset individually.
4. Maintain project network information.
5. Maintain IP and VLAN information.
6. Track internet connections.
7. Display the physical project layout.
8. Position IT assets on the site plan.
9. Maintain maintenance history.
10. Provide controlled IT-only access.
11. Maintain an audit trail.
12. Support Arabic and English.

---

4. Users

IT Administrator

Responsibilities:

- Manage users
- Manage system configuration
- Manage projects
- Manage infrastructure

IT Manager

Responsibilities:

- Manage projects
- Manage infrastructure
- Review technical information
- Review maintenance history
- Review audit information

IT Engineer

Responsibilities:

- View projects
- Add/update operational infrastructure
- Manage network information
- Record maintenance activities

Viewer

Responsibilities:

- View authorized information
- No operational modification

---

5. Project Management Requirements

The system shall allow authorized users to create projects.

Required project information:

- Project name
- Client
- Sector
- Start date
- Expected end date
- Project address
- GPS location
- Project manager name
- Project manager phone
- Project manager email

Optional information:

- Actual completion date
- Notes

The system shall support project status:

Planning
Active
On Hold
Completed
Closed

---

6. Client Requirements

The system shall maintain client records.

A client may be associated with multiple projects.

Client information includes:

- Name
- Code
- Phone
- Email
- Address
- Notes

---

7. Project Personnel Requirements

The system shall allow IT users to record engineers working inside each project.

Information:

- Full name
- Job title
- Phone
- Email
- Notes

---

8. Asset Management Requirements

The system shall maintain an individual record for every physical/logical IT asset.

Supported categories include:

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

Each asset shall support:

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
- Physical location
- Rack
- Rack U position
- Installation date
- Purchase date
- Warranty end date
- Notes

---

9. Asset Quantity Requirements

The system shall not depend on manually entered quantities for individual assets.

Each physical asset is represented by a unique record.

The interface may display aggregated quantities.

Example:

Routers: 8
Switches: 14
Cameras: 96
Access Points: 21

These values are derived from actual asset records.

---

10. Site Plan Requirements

Each project shall support one official site-plan PNG.

The workflow:

AutoCAD
   │
   ▼
PNG Export
   │
   ▼
Upload to Application
   │
   ▼
Project Site Plan
   │
   ▼
Place Asset Markers

The application shall allow authorized IT users to position asset markers interactively.

Coordinates shall be stored as percentages.

---

11. Network Requirements

The system shall support:

VLANs

- VLAN ID
- Name
- Purpose
- Subnet
- Gateway
- DHCP status
- DHCP range
- DNS servers

IP Addresses

- IP address
- Project
- Asset
- VLAN
- Hostname
- Description
- Reserved status

Interfaces

- Interface name
- Interface type
- MAC address
- IP address
- VLAN

Connections

- Source asset
- Source interface
- Destination asset
- Destination interface
- Connection type
- Cable label
- Notes

---

12. Internet Requirements

The system shall support multiple internet connections per project.

Information:

- Provider
- Connection type
- Package
- Bandwidth
- Public IP
- Router
- Account number
- Contract number
- Start date
- End date
- Primary status
- Backup status

Supported connection types:

Fiber
4G
5G
Microwave
DSL
Other

---

13. Maintenance Requirements

The system shall allow IT users to create maintenance records.

A maintenance record shall contain:

- Project
- Asset
- Status
- Issue
- Action taken
- Parts used
- Technician
- Start date/time
- Resolution date/time
- Notes

Statuses:

Open
In Progress
Resolved
Cancelled

---

14. Dashboard Requirements

The application should provide an IT-oriented project overview.

For a selected project, the dashboard should make key information visible:

Project
├── Project information
├── Personnel
├── Infrastructure
├── Network
├── Internet
├── Site Plan
└── Maintenance

Infrastructure summaries should include counts derived from asset records.

---

15. Search Requirements

Authorized IT users should be able to locate infrastructure information efficiently.

Searchable information should include:

- Project name
- Project code
- Client
- Asset tag
- Serial number
- MAC address
- Management IP
- Hostname
- Device model

---

16. Security Requirements

The system must require authentication.

Anonymous users must not access application data.

Authorization must be enforced through PostgreSQL RLS.

Frontend-only permission checks are insufficient.

---

17. Audit Requirements

Critical changes should be traceable.

Audit information should include:

- User
- Action
- Entity
- Entity ID
- Project
- Previous data
- New data
- Timestamp

Audit records must not be editable by ordinary users.

---

18. Localization Requirements

The application must support:

Arabic
English

The interface must support RTL for Arabic.

All user-facing labels should be localization-ready.

Database records should not rely on hard-coded UI language strings.

---

19. Performance Requirements

The application should:

- Load project summaries quickly.
- Paginate large asset lists.
- Avoid unnecessary database queries.
- Use indexed search fields.
- Lazy-load large site-plan images where appropriate.
- Avoid loading all project assets simultaneously when unnecessary.

---

20. Reliability Requirements

The application must:

- Validate user input.
- Handle network/API failures gracefully.
- Prevent invalid foreign-key relationships.
- Prevent duplicate critical identifiers.
- Preserve audit information.
- Avoid data loss during updates.

---

21. UI Requirements

The interface should follow an enterprise IT-management design.

Requirements:

- Clean navigation
- Consistent forms
- Clear data tables
- Responsive layout
- Desktop-first optimization
- Mobile compatibility
- Arabic RTL support
- English LTR support
- Clear validation messages
- Loading states
- Empty states
- Error states
- Confirmation for destructive actions

---

22. Non-Functional Security Requirements

The application must never expose:

- Supabase service-role keys
- Database passwords
- Private credentials
- Provider account secrets

Production secrets must be stored in environment configuration.

---

23. Acceptance Criteria

The initial product will be considered functional when:

Projects

- Users can create and manage projects.
- Projects can be associated with clients.
- Project managers can be recorded.
- GPS location can be recorded.

Assets

- Users can create individual assets.
- Assets can be associated with projects.
- Brand/model information can be recorded.
- Serial/MAC/IP information can be recorded.
- Asset counts can be derived.

Site Plan

- A project can have one PNG site plan.
- Authorized users can upload it.
- Assets can be positioned on it.
- Positions persist after page reload.

Network

- VLANs can be recorded.
- IP addresses can be recorded.
- Interfaces can be recorded.
- Network connections can be recorded.

Internet

- Internet connections can be recorded.
- Primary and backup connections can be identified.

Maintenance

- Maintenance records can be created.
- Maintenance history can be viewed per asset.

Security

- Authentication is required.
- RLS is enabled.
- Roles control permissions.

---

24. Out of Scope

The following are explicitly outside the initial product scope:

- HR management
- Payroll
- Financial accounting
- Procurement
- Inventory purchasing workflows
- General CRM
- Customer support/help desk
- Full network monitoring
- SIEM
- Asset procurement lifecycle
- Project financial management

The product must remain focused on IT infrastructure and project technical information.

---

25. Implementation Phases

Phase 1 — Foundation

- Repository cleanup
- Environment configuration
- Supabase connection
- Authentication
- Application shell
- Localization foundation

Phase 2 — Projects

- Client management
- Project management
- Project personnel
- Project dashboard

Phase 3 — Assets

- Categories
- Brands
- Models
- Racks
- Assets
- Asset search
- Asset summaries

Phase 4 — Site Plan

- PNG upload
- Site-plan viewer
- Asset markers
- Interactive positioning

Phase 5 — Network

- VLANs
- IP addresses
- Interfaces
- Network connections

Phase 6 — Internet

- Internet connections
- Primary/backup configuration

Phase 7 — Maintenance

- Maintenance records
- Asset maintenance history

Phase 8 — Security & Audit

- RLS verification
- Role validation
- Audit verification
- Security hardening

Phase 9 — QA & Deployment

- Functional testing
- Security testing
- Responsive testing
- Arabic/English testing
- Production deployment

---

26. Definition of Done

The product is considered ready for production when:

- All approved requirements are implemented.
- Database schema and frontend models are synchronized.
- RLS policies have been tested.
- Authentication is working.
- No production secrets exist in the repository.
- Critical workflows have been tested.
- Site-plan positioning works reliably.
- Network information is persisted correctly.
- Maintenance history works.
- Arabic and English interfaces are functional.
- Production deployment is reproducible.
- Documentation is complete.

---

27. Product Success Definition

The product succeeds when an IT engineer or IT manager can select any project and answer, from one system:

«What is this project, who is responsible for it, where is it located, who works there, what IT infrastructure exists, where is every device installed, how is the network configured, what internet connections are being used, and what maintenance has been performed?»

That is the core business outcome of CORRA IT Project Management.