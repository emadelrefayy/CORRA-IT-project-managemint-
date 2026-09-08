CORRA IT Project Management

Enterprise IT Infrastructure & Project Management Platform

CORRA IT Project Management is an internal enterprise web application designed to centralize and manage IT infrastructure, networking, internet connectivity, CCTV systems, and IT-related project information across CORRA construction projects.

The platform provides the IT department with a single source of truth for every project, its people, location, infrastructure, network configuration, equipment, internet connections, maintenance history, and site layout.

---

1. Executive Summary

CORRA operates multiple construction projects that require continuous IT infrastructure and technical support.

Today, project information can become distributed across:

- Excel files
- WhatsApp conversations
- Emails
- Paper documents
- Individual engineers' knowledge
- Separate device lists
- Network configuration notes
- CCTV information
- Internet provider information

This makes it difficult to answer basic operational questions quickly:

- What equipment exists at a specific project?
- Which router or switch is installed?
- What is the device model and serial number?
- What is the management IP address?
- Which devices are connected to each other?
- Which internet connection is primary?
- What is the project's network structure?
- Where is a device physically installed?
- Which engineers work at the project?
- What maintenance was performed on a device?
- Where is the project's site/network layout?
- What infrastructure exists across all projects?

CORRA IT Project Management solves this by providing one centralized system for the IT department.

---

2. Project Objectives

The primary objectives are:

2.1 Centralize Project Information

Maintain a single authoritative record for every IT-supported project.

Each project can contain:

- Project name
- Client
- Sector
- Project status
- Start date
- Expected completion date
- Actual completion date
- Employee count
- Project address
- GPS coordinates
- Project manager information

---

2.2 Centralize IT Infrastructure

Maintain an accurate inventory of all IT infrastructure installed at each project.

Examples:

- Routers
- Switches
- Gateways
- Firewalls
- Access Points
- CCTV cameras
- NVRs
- DVRs
- Biometric devices
- Racks
- Servers
- UPS systems
- Patch panels
- VoIP equipment
- Access-control devices
- Printers

Every physical asset is represented as an individual record.

This allows the IT department to track:

- Brand
- Model
- Serial number
- MAC address
- Management IP
- Status
- Physical location
- Rack position
- Installation information

---

3. Site Plan Visualization

Each project can have one official site-plan PNG.

The drawing can be created using AutoCAD and exported as PNG.

The application displays the drawing and allows IT engineers to place infrastructure markers on it.

For example:

                 PROJECT SITE PLAN

       ┌──────────────────────────────┐
       │                              │
       │       📷 Camera              │
       │                              │
       │                📡 AP         │
       │                              │
       │   ┌───────────┐              │
       │   │ IT Rack   │              │
       │   └───────────┘              │
       │                              │
       │             📷 Camera        │
       │                              │
       └──────────────────────────────┘

Markers are stored using normalized X/Y coordinates so that they remain correctly positioned regardless of screen resolution.

---

4. Network Management

The platform maintains project-level network information.

This includes:

- VLANs
- Subnets
- Gateways
- DHCP ranges
- DNS servers
- IP addresses
- Hostnames
- Network interfaces
- MAC addresses
- Device-to-device connections
- Cable labels

This creates a lightweight project-specific IPAM and network topology record.

---

5. Internet Connectivity

Each project can contain one or more internet connections.

The system records:

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
- Primary/backup status

Supported connection types include:

- Fiber
- 4G
- 5G
- Microwave
- DSL
- Other

---

6. Maintenance Tracking

IT engineers can record maintenance activities against specific assets.

A maintenance record includes:

- Asset
- Issue
- Action taken
- Parts used
- Technician
- Status
- Dates
- Notes

This creates a historical technical record for project infrastructure.

---

7. Business Value

The platform provides several direct operational benefits.

Faster Information Retrieval

Instead of searching multiple files or asking engineers for information, the IT department can search the project database.

Better Infrastructure Visibility

Management can understand what IT infrastructure exists across projects.

Reduced Information Loss

Infrastructure knowledge is stored centrally instead of remaining dependent on individual employees.

Better Maintenance History

Engineers can review previous maintenance activities for an asset.

Better Network Documentation

IP addresses, VLANs, interfaces and network connections are maintained centrally.

Improved Project Handover

When an engineer leaves a project, the technical knowledge remains available to the IT department.

Improved Management Visibility

Management can understand project infrastructure without requiring detailed technical knowledge.

---

8. Target Users

The system is an internal application intended for the IT department.

Supported roles:

- IT Administrator
- IT Manager
- IT Engineer
- Viewer

Access is controlled through authentication and database-level Row Level Security (RLS).

---

9. Technology Stack

Frontend

- TypeScript
- Modern component-based web architecture
- Responsive enterprise UI
- Arabic / English interface

Backend

The application uses Supabase services as the backend platform.

Database

- PostgreSQL
- Supabase
- UUID-based identifiers
- Foreign-key relationships
- Indexes
- Constraints
- Row Level Security

Storage

Supabase Storage is used for project files such as the project site-plan PNG.

Security

- Supabase Authentication
- PostgreSQL Row Level Security
- Role-based authorization
- Audit logging
- Database constraints

---

10. High-Level Architecture

                         ┌──────────────────┐
                         │     IT Users     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  Web Application │
                         │ TypeScript UI    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    Supabase      │
                         │                  │
                         │ Auth             │
                         │ PostgreSQL       │
                         │ Storage          │
                         │ RLS              │
                         └────────┬─────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                ▼                 ▼                 ▼
          Project Data       Network Data      IT Assets

---

11. Data Ownership

The IT department owns and maintains the application's operational data.

The database is the authoritative source for:

- Projects
- Project engineers
- Assets
- Network configuration
- Internet connections
- Maintenance records
- Site plans

---

12. Scope

Included

- Project management
- Client management
- Project personnel
- IT asset management
- Equipment inventory
- Site-plan visualization
- Network information
- IP address management
- VLAN management
- Network connections
- Internet connections
- Maintenance records
- Authentication
- Authorization
- Audit logging
- Arabic/English UI

Not Included

The system is intentionally not designed to become a general ERP, financial system, HR system, procurement system, or help-desk platform.

Future features should only be introduced through a formal requirements change.

---

13. Expected Outcome

After implementation, the IT department should have a centralized technical knowledge base for all CORRA projects.

For any project, an authorized IT employee should be able to open one project record and understand:

«Who is responsible for the project, where it is located, what IT equipment exists, how the network is configured, which internet connections are used, where devices are physically located, and what maintenance has occurred.»

That is the primary purpose of CORRA IT Project Management.

---

14. Project Principle

«One project. One source of truth. Complete IT visibility.»