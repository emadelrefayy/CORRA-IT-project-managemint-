CORRA IT Project Management

Database Schema

1. Database Overview

Database engine:

PostgreSQL

Platform:

Supabase

The database is designed around projects and their IT infrastructure.

Core relationship:

Client
  │
  └── Projects
        │
        ├── Engineers
        ├── Site Plan
        ├── Assets
        ├── Network
        ├── Internet
        └── Maintenance

---

2. Tables

The current CORRA schema contains the following primary tables:

1. "user_profiles"
2. "clients"
3. "projects"
4. "project_engineers"
5. "project_site_plan"
6. "asset_categories"
7. "asset_brands"
8. "asset_models"
9. "racks"
10. "assets"
11. "asset_plan_markers"
12. "network_vlans"
13. "ip_addresses"
14. "network_interfaces"
15. "network_connections"
16. "internet_connections"
17. "maintenance_records"
18. "project_documents"
19. "audit_logs"

---

3. user_profiles

Stores application user information.

Important fields:

id
auth_user_id
full_name
email
phone
role
is_active
created_at
updated_at

Role values:

admin
it_manager
it_engineer
viewer

The "auth_user_id" connects the application profile to Supabase Auth.

---

4. clients

Stores project clients/beneficiaries.

Fields include:

id
name
code
phone
email
address
notes
created_at
updated_at

One client can have multiple projects.

---

5. projects

The central table of the system.

Fields include:

id
project_code
name
client_id
sector
status
start_date
expected_end_date
actual_end_date
employee_count
address
latitude
longitude
project_manager_name
project_manager_phone
project_manager_email
notes
created_at
updated_at

Project status:

planning
active
on_hold
completed
closed

Relationships:

projects.client_id
        ↓
clients.id

---

6. project_engineers

Stores engineers working inside a project and benefiting from IT services.

Fields:

id
project_id
full_name
job_title
phone
email
notes
created_at
updated_at

Relationship:

project_engineers.project_id
        ↓
projects.id

---

7. project_site_plan

Stores the project's single official site-plan metadata.

Fields:

id
project_id
file_path
original_filename
mime_type
width
height
created_at
updated_at

One project can have one site plan.

The actual PNG is stored in Supabase Storage.

---

8. asset_categories

Defines infrastructure categories.

Examples:

router
switch
gateway
firewall
access_point
cctv_camera
nvr
dvr
biometric
rack
server
ups
patch_panel
printer
voip
access_control
other

Each category supports Arabic and English display names.

---

9. asset_brands

Stores equipment manufacturers.

Fields:

id
name
code
notes
created_at
updated_at

---

10. asset_models

Stores equipment models.

Fields:

id
brand_id
category_id
name
part_number
notes
created_at
updated_at

Models can be associated with both a manufacturer and equipment category.

---

11. racks

Stores physical network/IT racks.

Fields:

id
project_id
name
rack_units
location_name
notes
created_at
updated_at

---

12. assets

The core IT infrastructure table.

Every physical/logical asset receives its own record.

Fields:

id
asset_tag
project_id
category_id
brand_id
model_id
name
serial_number
mac_address
management_ip
status
location_name
rack_id
rack_u_start
rack_u_height
installation_date
purchase_date
warranty_end_date
notes
created_at
updated_at

Example:

Asset Tag: RTR-001
Category: Router
Brand: Cisco
Model: XXXX
Serial: ABC123
MAC: XX:XX:XX:XX:XX:XX
Management IP: 192.168.10.1

---

13. asset_plan_markers

Connects assets to their physical position on the project site plan.

Fields:

id
project_id
asset_id
x_percent
y_percent
label
created_at
updated_at

Coordinates:

0 <= x_percent <= 100
0 <= y_percent <= 100

This allows the application to render the asset at the correct position on the PNG.

---

14. network_vlans

Stores VLAN definitions.

Fields:

id
project_id
vlan_id
name
purpose
subnet
gateway
dhcp_enabled
dhcp_start
dhcp_end
dns_servers
notes
created_at
updated_at

---

15. ip_addresses

Stores project IP allocations.

Fields:

id
project_id
address
asset_id
vlan_id
hostname
description
is_reserved
created_at
updated_at

The database prevents duplicate IP addresses within the same project.

---

16. network_interfaces

Stores network interfaces.

Fields:

id
asset_id
interface_name
interface_type
mac_address
ip_address_id
vlan_id
notes
created_at
updated_at

Example:

Asset: SW-001
Interface: Gi0/1
MAC: XX:XX:XX:XX:XX:XX
VLAN: 10

---

17. network_connections

Represents connections between network assets/interfaces.

Fields:

id
project_id
source_asset_id
source_interface_id
destination_asset_id
destination_interface_id
connection_type
cable_label
notes
created_at
updated_at

Example:

Router
  │
  └── Fiber/Cat6
        │
        ▼
     Switch

---

18. internet_connections

Stores project internet services.

Fields:

id
project_id
provider
connection_type
package_name
bandwidth
public_ip
router_asset_id
account_number
contract_number
start_date
end_date
is_primary
is_backup
notes
created_at
updated_at

---

19. maintenance_records

Stores maintenance history.

Fields:

id
project_id
asset_id
status
issue
action_taken
parts_used
technician_name
started_at
resolved_at
notes
created_by
created_at
updated_at

Statuses:

open
in_progress
resolved
cancelled

---

20. project_documents

Stores project-document metadata.

Fields:

id
project_id
document_type
title
storage_path
original_filename
mime_type
file_size
uploaded_by
created_at
updated_at

Actual files are stored in Supabase Storage.

---

21. audit_logs

Stores application audit events.

Fields:

id
actor_user_id
action
entity_type
entity_id
project_id
old_data
new_data
created_at

Audit records are intended to provide accountability for critical changes.

---

22. Relationships

High-level ER structure:

clients
   │
   │ 1:N
   ▼
projects
   │
   ├─────────────── project_engineers
   │
   ├─────────────── project_site_plan
   │
   ├─────────────── assets
   │                    │
   │                    ├── asset_categories
   │                    ├── asset_brands
   │                    ├── asset_models
   │                    ├── racks
   │                    └── asset_plan_markers
   │
   ├─────────────── network_vlans
   │                    │
   │                    └── ip_addresses
   │
   ├─────────────── network_connections
   │
   ├─────────────── internet_connections
   │
   ├─────────────── maintenance_records
   │
   └─────────────── project_documents

---

23. Security

RLS is enabled on all application tables.

Access is based on authenticated users and application roles.

General model:

Anonymous
   │
   └── No application data

Authenticated IT User
   │
   ├── Read according to policy
   └── Write according to role

Admin / IT Manager
   │
   └── Extended management permissions

---

24. Indexing

Indexes are provided for common lookup paths including:

- Project relationships
- Asset categories
- Asset brands
- Asset models
- Serial numbers
- MAC addresses
- Management IP
- VLAN relationships
- IP addresses
- Maintenance records
- Audit actors
- Internet router references

---

25. Data Integrity

The schema uses:

- Primary keys
- Foreign keys
- Unique constraints
- Check constraints
- Enum types
- Indexes
- Timestamp triggers
- RLS policies

The database should remain the final enforcement layer for data integrity.

---

26. Asset Quantity Principle

The database does not depend on a simple quantity field for physical infrastructure.

Instead:

Quantity = COUNT(assets)

Example:

Project A

Routers:
RTR-001
RTR-002
RTR-003

Quantity = 3

This provides much stronger asset traceability than storing:

Router Quantity = 3

---

27. Site Plan Principle

Exactly one site plan is associated with each project.

The drawing itself is a PNG.

The database stores metadata and storage path.

Asset positions are stored separately.

This separation keeps the database normalized and makes the visual layer independently maintainable.