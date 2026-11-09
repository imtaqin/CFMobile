# Magic Connectors

14 endpoints.

## GET /accounts/{account_id}/magic/connectors

List Connectors

operationId: `mconn-connectors-list` · query: `device_type`

**Response** 200 → `result`

[array of]
- `activated`: boolean **required**
- `device`: object
  - `id`: string **required**
  - `serial_number`: string
  - `type`: string enum: `MANAGED`, `LICENSED`
- `id`: string **required**
- `interrupt_window_days_of_week`: string[] **required** — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number **required**
- `interrupt_window_embargo_dates`: string[] **required** — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number **required**
- `last_heartbeat`: string
- `last_seen_version`: string
- `last_updated`: string **required**
- `license_key`: string
- `notes`: string **required**
- `timezone`: string **required**

## POST /accounts/{account_id}/magic/connectors

Create Connector

operationId: `mconn-connectors-create`

**Request** (application/json)

- `device`: object **required** — Exactly one of id, serial_number, or provision_license must be provided.
  - `id`: string
  - `provision_license`: boolean — When true, create and provision a new licence key for the connector.
  - `serial_number`: string
- `activated`: boolean
- `interrupt_window_days_of_week`: string[] — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number
- `interrupt_window_embargo_dates`: string[] — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number
- `notes`: string
- `timezone`: string

**Response** 200 → `result`

- `activated`: boolean **required**
- `device`: object
  - `id`: string **required**
  - `serial_number`: string
  - `type`: string enum: `MANAGED`, `LICENSED`
- `id`: string **required**
- `interrupt_window_days_of_week`: string[] **required** — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number **required**
- `interrupt_window_embargo_dates`: string[] **required** — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number **required**
- `last_heartbeat`: string
- `last_seen_version`: string
- `last_updated`: string **required**
- `license_key`: string
- `notes`: string **required**
- `timezone`: string **required**

## DELETE /accounts/{account_id}/magic/connectors/{connector_id}

Delete Connector

operationId: `mconn-connectors-delete`

**Response** 200 → `result`

- `activated`: boolean **required**
- `device`: object
  - `id`: string **required**
  - `serial_number`: string
  - `type`: string enum: `MANAGED`, `LICENSED`
- `id`: string **required**
- `interrupt_window_days_of_week`: string[] **required** — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number **required**
- `interrupt_window_embargo_dates`: string[] **required** — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number **required**
- `last_heartbeat`: string
- `last_seen_version`: string
- `last_updated`: string **required**
- `license_key`: string
- `notes`: string **required**
- `timezone`: string **required**

## GET /accounts/{account_id}/magic/connectors/{connector_id}

Get Connector

operationId: `mconn-connectors-get`

**Response** 200 → `result`

- `activated`: boolean **required**
- `device`: object
  - `id`: string **required**
  - `serial_number`: string
  - `type`: string enum: `MANAGED`, `LICENSED`
- `id`: string **required**
- `interrupt_window_days_of_week`: string[] **required** — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number **required**
- `interrupt_window_embargo_dates`: string[] **required** — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number **required**
- `last_heartbeat`: string
- `last_seen_version`: string
- `last_updated`: string **required**
- `license_key`: string
- `notes`: string **required**
- `timezone`: string **required**

## PATCH /accounts/{account_id}/magic/connectors/{connector_id}

Edit Connector

operationId: `mconn-connectors-edit`

**Request** (application/json)

- `activated`: boolean
- `interrupt_window_days_of_week`: string[] — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number
- `interrupt_window_embargo_dates`: string[] — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number
- `notes`: string
- `timezone`: string
- `provision_license`: boolean — When true, regenerate license key for the connector.

**Response** 200 → `result`

- `activated`: boolean **required**
- `device`: object
  - `id`: string **required**
  - `serial_number`: string
  - `type`: string enum: `MANAGED`, `LICENSED`
- `id`: string **required**
- `interrupt_window_days_of_week`: string[] **required** — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number **required**
- `interrupt_window_embargo_dates`: string[] **required** — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number **required**
- `last_heartbeat`: string
- `last_seen_version`: string
- `last_updated`: string **required**
- `license_key`: string
- `notes`: string **required**
- `timezone`: string **required**

## PUT /accounts/{account_id}/magic/connectors/{connector_id}

Update Connector

operationId: `mconn-connectors-update`

**Request** (application/json)

- `activated`: boolean
- `interrupt_window_days_of_week`: string[] — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number
- `interrupt_window_embargo_dates`: string[] — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number
- `notes`: string
- `timezone`: string
- `provision_license`: boolean — When true, regenerate license key for the connector.

**Response** 200 → `result`

- `activated`: boolean **required**
- `device`: object
  - `id`: string **required**
  - `serial_number`: string
  - `type`: string enum: `MANAGED`, `LICENSED`
- `id`: string **required**
- `interrupt_window_days_of_week`: string[] **required** — Allowed days of the week for upgrades. Default is all days.
  [array]
- `interrupt_window_duration_hours`: number **required**
- `interrupt_window_embargo_dates`: string[] **required** — List of dates (YYYY-MM-DD) when upgrades are blocked.
  [array]
- `interrupt_window_hour_of_day`: number **required**
- `last_heartbeat`: string
- `last_seen_version`: string
- `last_updated`: string **required**
- `license_key`: string
- `notes`: string **required**
- `timezone`: string **required**

## GET /accounts/{account_id}/magic/connectors/{connector_id}/interrupts

List Interrupts

operationId: `mconn-connector-interrupts-list`

**Response** 200 → `result`

[array of]
- `reboot`: object
  - `purge`: boolean default: `false` — Purge connector state.
- `restart`: object
  - `purge`: boolean default: `false` — Purge connector state.
- `shutdown`: object
  - `purge`: boolean default: `false` — Purge connector state.
- `submitted_at`: string **required**
- `triggered_at`: string

## POST /accounts/{account_id}/magic/connectors/{connector_id}/interrupts

Create Interrupt

operationId: `mconn-connector-interrupts-create`

**Request** (application/json)

- `reboot`: object
  - `purge`: boolean default: `false` — Purge connector state.
- `restart`: object
  - `purge`: boolean default: `false` — Purge connector state.
- `shutdown`: object
  - `purge`: boolean default: `false` — Purge connector state.

**Response** 200 → `result`

- `reboot`: object
  - `purge`: boolean default: `false` — Purge connector state.
- `restart`: object
  - `purge`: boolean default: `false` — Purge connector state.
- `shutdown`: object
  - `purge`: boolean default: `false` — Purge connector state.
- `submitted_at`: string **required**
- `triggered_at`: string

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events

List Events

operationId: `mconn-connector-telemetry-events-list` · query: `from`, `to`, `limit`, `cursor`, `k`

**Response** 200 → `result`

- `count`: number **required**
- `cursor`: string
- `items`: object[] **required**
  [array of]
  - `a`: number **required** — Time the Event was collected (seconds since the Unix epoch)
  - `k`: string **required** — Kind
  - `n`: number **required** — Sequence number, used to order events with the same timestamp
  - `t`: number **required** — Time the Event was recorded (seconds since the Unix epoch)

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events/{event_t}.{event_n}

Get Event

operationId: `mconn-connector-telemetry-events-get`

**Response** 200 → `result`

- `e`: object **required** — Event kind plus event-specific payload fields.
  - `k`: string **required** enum: `Init`, `Leave`, `StartAttestation`, `FinishAttestationSuccess`, `FinishAttestationFailure`, `StartRotateCryptKey`, `FinishRotateCryptKeySuccess`, `FinishRotateCryptKeyFailure` — Event kind
- `n`: number **required** — Sequence number, used to order events with the same timestamp
- `t`: number **required** — Time the Event was recorded (seconds since the Unix epoch)
- `v`: string — Version

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events/latest

Get latest Events

operationId: `mconn-connector-telemetry-events-latest-get`

**Response** 200 → `result`

- `count`: number **required**
- `items`: object[] **required**
  [array of]
  - `e`: object **required** — Event kind plus event-specific payload fields.
    - `k`: string **required** enum: `Init`, `Leave`, `StartAttestation`, `FinishAttestationSuccess`, `FinishAttestationFailure`, `StartRotateCryptKey`, `FinishRotateCryptKeySuccess`, `FinishRotateCryptKeyFailure` — Event kind
  - `n`: number **required** — Sequence number, used to order events with the same timestamp
  - `t`: number **required** — Time the Event was recorded (seconds since the Unix epoch)
  - `v`: string — Version

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots

List Snapshots

operationId: `mconn-connector-telemetry-snapshots-list` · query: `from`, `to`, `limit`, `cursor`

**Response** 200 → `result`

- `count`: number **required**
- `cursor`: string
- `items`: object[] **required**
  [array of]
  - `a`: number **required** — Time the Snapshot was collected (seconds since the Unix epoch)
  - `t`: number **required** — Time the Snapshot was recorded (seconds since the Unix epoch)

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/{snapshot_t}

Get Snapshot

operationId: `mconn-connector-telemetry-snapshots-get`

**Response** 200 → `result`

- `bonds`: object[]
  [array of]
  - `name`: string **required** — Name of the network interface
  - `status`: string **required** — Current status of the network interface
- `count_reclaim_failures`: number **required** — Count of failures to reclaim space
- `count_reclaimed_paths`: number **required** — Count of reclaimed paths
- `count_record_failed`: number **required** — Count of failed snapshot recordings
- `count_transmit_failures`: number **required** — Count of failed snapshot transmissions
- `cpu_count`: number — Count of processors/cores
- `cpu_pressure_10s`: number — Percentage of time over a 10 second window that tasks were stalled
- `cpu_pressure_300s`: number — Percentage of time over a 5 minute window that tasks were stalled
- `cpu_pressure_60s`: number — Percentage of time over a 1 minute window that tasks were stalled
- `cpu_pressure_total_us`: number — Total stall time (microseconds)
- `cpu_time_guest_ms`: number — Time spent running a virtual CPU or guest OS (milliseconds)
- `cpu_time_guest_nice_ms`: number — Time spent running a niced guest (milliseconds)
- `cpu_time_idle_ms`: number — Time spent in idle state (milliseconds)
- `cpu_time_iowait_ms`: number — Time spent wait for I/O to complete (milliseconds)
- `cpu_time_irq_ms`: number — Time spent servicing interrupts (milliseconds)
- `cpu_time_nice_ms`: number — Time spent in low-priority user mode (milliseconds)
- `cpu_time_softirq_ms`: number — Time spent servicing softirqs (milliseconds)
- `cpu_time_steal_ms`: number — Time stolen (milliseconds)
- `cpu_time_system_ms`: number — Time spent in system mode (milliseconds)
- `cpu_time_user_ms`: number — Time spent in user mode (milliseconds)
- `delta`: number — Number of network operations applied during state transition
- `dhcp_leases`: object[]
  [array of]
  - `client_id`: string **required** — Client ID of the device the IP Address was leased to
  - `expiry_time`: number **required** — Expiry time of the DHCP lease (seconds since the Unix epoch)
  - `hostname`: string **required** — Hostname of the device the IP Address was leased to
  - `interface_name`: string **required** — Name of the network interface
  - `ip_address`: string **required** — IP Address that was leased
  - `mac_address`: string **required** — MAC Address of the device the IP Address was leased to
- `disks`: object[]
  [array of]
  - `discards`: number — Discards completed successfully
  - `discards_merged`: number — Discards merged
  - `flushes`: number — Flushes completed successfully
  - `in_progress`: number **required** — I/Os currently in progress
  - `major`: number **required** — Device major number
  - `merged`: number **required** — Reads merged
  - `minor`: number **required** — Device minor number
  - `name`: string **required** — Device name
  - `reads`: number **required** — Reads completed successfully
  - `sectors_discarded`: number — Sectors discarded
  - `sectors_read`: number **required** — Sectors read successfully
  - `sectors_written`: number **required** — Sectors written successfully
  - `time_discarding_ms`: number — Time spent discarding (milliseconds)
  - `time_flushing_ms`: number — Time spent flushing (milliseconds)
  - `time_in_progress_ms`: number **required** — Time spent doing I/Os (milliseconds)
  - `time_reading_ms`: number **required** — Time spent reading (milliseconds)
  - `time_writing_ms`: number **required** — Time spent writing (milliseconds)
  - `weighted_time_in_progress_ms`: number **required** — Weighted time spent doing I/Os (milliseconds)
  - `writes`: number **required** — Writes completed
  - `writes_merged`: number **required** — Writes merged
- `epsilon`: number — Simulated number of network operations applied during state transition
- `ha_state`: string — Name of high availability state
- `ha_value`: number — Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)
- `interfaces`: object[]
  [array of]
  - `health_reason`: string — Comma-separated list of reasons for health score
  - `health_score`: number — Aggregate health score (0-100)
  - `ip_addresses`: object[]
    [array of]
    - `interface_name`: string **required** — Name of the network interface
    - `ip_address`: string **required** — IP address of the network interface
  - `name`: string **required** — Name of the network interface
  - `operstate`: string **required** — UP/DOWN state of the network interface
  - `speed`: number — Speed of the network interface (bits per second)
- `io_pressure_full_10s`: number — Percentage of time over a 10 second window that all tasks were stalled
- `io_pressure_full_300s`: number — Percentage of time over a 5 minute window that all tasks were stalled
- `io_pressure_full_60s`: number — Percentage of time over a 1 minute window that all tasks were stalled
- `io_pressure_full_total_us`: number — Total stall time (microseconds)
- `io_pressure_some_10s`: number — Percentage of time over a 10 second window that some tasks were stalled
- `io_pressure_some_300s`: number — Percentage of time over a 3 minute window that some tasks were stalled
- `io_pressure_some_60s`: number — Percentage of time over a 1 minute window that some tasks were stalled
- `io_pressure_some_total_us`: number — Total stall time (microseconds)
- `kernel_btime`: number — Boot time (seconds since Unix epoch)
- `kernel_ctxt`: number — Number of context switches that the system underwent
- `kernel_processes`: number — Number of forks since boot
- `kernel_processes_blocked`: number — Number of processes blocked waiting for I/O
- `kernel_processes_running`: number — Number of processes in runnable state
- `load_average_15m`: number — The fifteen-minute load average
- `load_average_1m`: number — The one-minute load average
- `load_average_5m`: number — The five-minute load average
- `load_average_cur`: number — Number of currently runnable kernel scheduling entities
- `load_average_max`: number — Number of kernel scheduling entities that currently exist on the system
- `memory_active_bytes`: number — Memory that has been used more recently
- `memory_anon_hugepages_bytes`: number — Non-file backed huge pages mapped into user-space page tables
- `memory_anon_pages_bytes`: number — Non-file backed pages mapped into user-space page tables
- `memory_available_bytes`: number — Estimate of how much memory is available for starting new applications
- `memory_bounce_bytes`: number — Memory used for block device bounce buffers
- `memory_buffers_bytes`: number — Relatively temporary storage for raw disk blocks
- `memory_cached_bytes`: number — In-memory cache for files read from the disk
- `memory_cma_free_bytes`: number — Free CMA (Contiguous Memory Allocator) pages
- `memory_cma_total_bytes`: number — Total CMA (Contiguous Memory Allocator) pages
- `memory_commit_limit_bytes`: number — Total amount of memory currently available to be allocated on the system
- `memory_committed_as_bytes`: number — Amount of memory presently allocated on the system
- `memory_dirty_bytes`: number — Memory which is waiting to get written back to the disk
- `memory_free_bytes`: number — The sum of LowFree and HighFree
- `memory_high_free_bytes`: number — Amount of free highmem
- `memory_high_total_bytes`: number — Total amount of highmem
- `memory_hugepages_free`: number — The number of huge pages in the pool that are not yet allocated
- `memory_hugepages_rsvd`: number — Number of huge pages for which a commitment has been made, but no allocation has yet been made
- `memory_hugepages_surp`: number — Number of huge pages in the pool above the threshold
- `memory_hugepages_total`: number — The size of the pool of huge pages
- `memory_hugepagesize_bytes`: number — The size of huge pages
- `memory_inactive_bytes`: number — Memory which has been less recently used
- `memory_k_reclaimable_bytes`: number — Kernel allocations that the kernel will attempt to reclaim under memory pressure
- `memory_kernel_stack_bytes`: number — Amount of memory allocated to kernel stacks
- `memory_low_free_bytes`: number — Amount of free lowmem
- `memory_low_total_bytes`: number — Total amount of lowmem
- `memory_mapped_bytes`: number — Files which have been mapped into memory
- `memory_page_tables_bytes`: number — Amount of memory dedicated to the lowest level of page tables
- `memory_per_cpu_bytes`: number — Memory allocated to the per-cpu alloctor used to back per-cpu allocations
- `memory_pressure_full_10s`: number — Percentage of time over a 10 second window that all tasks were stalled
- `memory_pressure_full_300s`: number — Percentage of time over a 5 minute window that all tasks were stalled
- `memory_pressure_full_60s`: number — Percentage of time over a 1 minute window that all tasks were stalled
- `memory_pressure_full_total_us`: number — Total stall time (microseconds)
- `memory_pressure_some_10s`: number — Percentage of time over a 10 second window that some tasks were stalled
- `memory_pressure_some_300s`: number — Percentage of time over a 5 minute window that some tasks were stalled
- `memory_pressure_some_60s`: number — Percentage of time over a 1 minute window that some tasks were stalled
- `memory_pressure_some_total_us`: number — Total stall time (microseconds)
- `memory_s_reclaimable_bytes`: number — Part of slab that can be reclaimed on memory pressure
- `memory_s_unreclaim_bytes`: number — Part of slab that cannot be reclaimed on memory pressure
- `memory_secondary_page_tables_bytes`: number — Amount of memory dedicated to the lowest level of page tables
- `memory_shmem_bytes`: number — Amount of memory consumed by tmpfs
- `memory_shmem_hugepages_bytes`: number — Memory used by shmem and tmpfs, allocated with huge pages
- `memory_shmem_pmd_mapped_bytes`: number — Shared memory mapped into user space with huge pages
- `memory_slab_bytes`: number — In-kernel data structures cache
- `memory_swap_cached_bytes`: number — Memory swapped out and back in while still in swap file
- `memory_swap_free_bytes`: number — Amount of swap space that is currently unused
- `memory_swap_total_bytes`: number — Total amount of swap space available
- `memory_total_bytes`: number — Total usable RAM
- `memory_vmalloc_chunk_bytes`: number — Largest contiguous block of vmalloc area which is free
- `memory_vmalloc_total_bytes`: number — Total size of vmalloc memory area
- `memory_vmalloc_used_bytes`: number — Amount of vmalloc area which is used
- `memory_writeback_bytes`: number — Memory which is actively being written back to the disk
- `memory_writeback_tmp_bytes`: number — Memory used by FUSE for temporary writeback buffers
- `memory_z_swap_bytes`: number — Memory consumed by the zswap backend, compressed
- `memory_z_swapped_bytes`: number — Amount of anonymous memory stored in zswap, uncompressed
- `mounts`: object[]
  [array of]
  - `available_bytes`: number — Available disk size (bytes)
  - `available_inodes`: number — Available inodes on filesystem
  - `file_system`: string **required** — File system on disk (EXT4, NTFS, etc.)
  - `is_read_only`: boolean — Determines whether the disk is read-only
  - `is_removable`: boolean — Determines whether the disk is removable
  - `kind`: string **required** — Kind of disk (HDD, SSD, etc.)
  - `mount_point`: string **required** — Path where disk is mounted
  - `name`: string **required** — Name of the disk mount
  - `total_bytes`: number — Total disk size (bytes)
  - `total_inodes`: number — Total inodes on filesystem
- `netdevs`: object[]
  [array of]
  - `name`: string **required** — Name of the network device
  - `recv_bytes`: number **required** — Total bytes received
  - `recv_compressed`: number **required** — Compressed packets received
  - `recv_drop`: number **required** — Packets dropped
  - `recv_errs`: number **required** — Bad packets received
  - `recv_fifo`: number **required** — FIFO overruns
  - `recv_frame`: number **required** — Frame alignment errors
  - `recv_multicast`: number **required** — Multicast packets received
  - `recv_packets`: number **required** — Total packets received
  - `sent_bytes`: number **required** — Total bytes transmitted
  - `sent_carrier`: number **required** — Number of packets not sent due to carrier errors
  - `sent_colls`: number **required** — Number of collisions
  - `sent_compressed`: number **required** — Number of compressed packets transmitted
  - `sent_drop`: number **required** — Number of packets dropped during transmission
  - `sent_errs`: number **required** — Number of transmission errors
  - `sent_fifo`: number **required** — FIFO overruns
  - `sent_packets`: number **required** — Total packets transmitted
- `platform`: string — Platform identifier
- `routes`: object[]
  [array of]
  - `destination`: string **required** — Route destination as default or an IPv4 CIDR
  - `gateway`: string — Gateway address for the next hop
  - `interface_name`: string **required** — Interface used by the next hop
  - `kind`: string **required** — Routing decision type: tunnel, breakout, or lan
  - `metric`: number **required** — Route metric; lower metrics are preferred
  - `weight`: number — Relative weight within an equal-cost route
- `site_id`: string — Site identifier
- `snmp_icmp_in_addr_mask_reps`: number — Number of ICMP Address Mask Reply messages received
- `snmp_icmp_in_addr_masks`: number — Number of ICMP Address Mask Request messages received
- `snmp_icmp_in_csum_errors`: number — Number of ICMP messages received with bad checksums
- `snmp_icmp_in_dest_unreachs`: number — Number of ICMP Destination Unreachable messages received
- `snmp_icmp_in_echo_reps`: number — Number of ICMP Echo Reply messages received
- `snmp_icmp_in_echos`: number — Number of ICMP Echo (request) messages received
- `snmp_icmp_in_errors`: number — Number of ICMP messages received with ICMP-specific errors
- `snmp_icmp_in_msgs`: number — Number of ICMP messages received
- `snmp_icmp_in_parm_probs`: number — Number of ICMP Parameter Problem messages received
- `snmp_icmp_in_redirects`: number — Number of ICMP Redirect messages received
- `snmp_icmp_in_src_quenchs`: number — Number of ICMP Source Quench messages received
- `snmp_icmp_in_time_excds`: number — Number of ICMP Time Exceeded messages received
- `snmp_icmp_in_timestamp_reps`: number — Number of ICMP Address Mask Request messages received
- `snmp_icmp_in_timestamps`: number — Number of ICMP Timestamp (request) messages received
- `snmp_icmp_out_addr_mask_reps`: number — Number of ICMP Address Mask Reply messages sent
- `snmp_icmp_out_addr_masks`: number — Number of ICMP Address Mask Request messages sent
- `snmp_icmp_out_dest_unreachs`: number — Number of ICMP Destination Unreachable messages sent
- `snmp_icmp_out_echo_reps`: number — Number of ICMP Echo Reply messages sent
- `snmp_icmp_out_echos`: number — Number of ICMP Echo (request) messages sent
- `snmp_icmp_out_errors`: number — Number of ICMP messages which this entity did not send due to ICMP-specific errors
- `snmp_icmp_out_msgs`: number — Number of ICMP messages attempted to send
- `snmp_icmp_out_parm_probs`: number — Number of ICMP Parameter Problem messages sent
- `snmp_icmp_out_redirects`: number — Number of ICMP Redirect messages sent
- `snmp_icmp_out_src_quenchs`: number — Number of ICMP Source Quench messages sent
- `snmp_icmp_out_time_excds`: number — Number of ICMP Time Exceeded messages sent
- `snmp_icmp_out_timestamp_reps`: number — Number of ICMP Timestamp Reply messages sent
- `snmp_icmp_out_timestamps`: number — Number of ICMP Timestamp (request) messages sent
- `snmp_ip_default_ttl`: number — Default value of the Time-To-Live field of the IP header
- `snmp_ip_forw_datagrams`: number — Number of datagrams forwarded to their final destination
- `snmp_ip_forwarding_enabled`: boolean — Set when acting as an IP gateway
- `snmp_ip_frag_creates`: number — Number of datagrams generated by fragmentation
- `snmp_ip_frag_fails`: number — Number of datagrams discarded because fragmentation failed
- `snmp_ip_frag_oks`: number — Number of datagrams successfully fragmented
- `snmp_ip_in_addr_errors`: number — Number of input datagrams discarded due to errors in the IP address
- `snmp_ip_in_delivers`: number — Number of input datagrams successfully delivered to IP user-protocols
- `snmp_ip_in_discards`: number — Number of input datagrams otherwise discarded
- `snmp_ip_in_hdr_errors`: number — Number of input datagrams discarded due to errors in the IP header
- `snmp_ip_in_receives`: number — Number of input datagrams received from interfaces
- `snmp_ip_in_unknown_protos`: number — Number of input datagrams discarded due unknown or unsupported protocol
- `snmp_ip_out_discards`: number — Number of output datagrams otherwise discarded
- `snmp_ip_out_no_routes`: number — Number of output datagrams discarded because no route matched
- `snmp_ip_out_requests`: number — Number of datagrams supplied for transmission
- `snmp_ip_reasm_fails`: number — Number of failures detected by the reassembly algorithm
- `snmp_ip_reasm_oks`: number — Number of datagrams successfully reassembled
- `snmp_ip_reasm_reqds`: number — Number of fragments received which needed to be reassembled
- `snmp_ip_reasm_timeout`: number — Number of seconds fragments are held while awaiting reassembly
- `snmp_tcp_active_opens`: number — Number of times TCP transitions to SYN-SENT from CLOSED
- `snmp_tcp_attempt_fails`: number — Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD
- `snmp_tcp_curr_estab`: number — Number of TCP connections in ESTABLISHED or CLOSE-WAIT
- `snmp_tcp_estab_resets`: number — Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT
- `snmp_tcp_in_csum_errors`: number — Number of TCP segments received with checksum errors
- `snmp_tcp_in_errs`: number — Number of TCP segments received in error
- `snmp_tcp_in_segs`: number — Number of TCP segments received
- `snmp_tcp_max_conn`: number — Limit on the total number of TCP connections
- `snmp_tcp_out_rsts`: number — Number of TCP segments sent with RST flag
- `snmp_tcp_out_segs`: number — Number of TCP segments sent
- `snmp_tcp_passive_opens`: number — Number of times TCP transitions to SYN-RCVD from LISTEN
- `snmp_tcp_retrans_segs`: number — Number of TCP segments retransmitted
- `snmp_tcp_rto_max`: number — Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)
- `snmp_tcp_rto_min`: number — Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)
- `snmp_udp_in_datagrams`: number — Number of UDP datagrams delivered to UDP applications
- `snmp_udp_in_errors`: number — Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port
- `snmp_udp_no_ports`: number — Number of UDP datagrams received for which there was not application at the destination port
- `snmp_udp_out_datagrams`: number — Number of UDP datagrams sent
- `system_boot_time_s`: number — Boottime of the system (seconds since the Unix epoch)
- `t`: number **required** — Time the Snapshot was recorded (seconds since the Unix epoch)
- `thermals`: object[]
  [array of]
  - `critical_celcius`: number — Critical failure temperature of the component (degrees Celsius)
  - `current_celcius`: number — Current temperature of the component (degrees Celsius)
  - `label`: string **required** — Sensor identifier for the component
  - `max_celcius`: number — Maximum temperature of the component (degrees Celsius)
- `tunnels`: object[]
  [array of]
  - `health_state`: string **required** — Name of tunnel health state (unknown, healthy, degraded, down)
  - `health_value`: number **required** — Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)
  - `interface_name`: string **required** — The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)
  - `jitter_ms`: number — Tunnel round-trip latency variation in milliseconds
  - `latency_ms`: number — 50th percentile tunnel round-trip latency in milliseconds
  - `natd_result`: string — Public socket address returned by the NAT detector
  - `natd_state`: number — Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)
  - `natd_target`: string — Target socket address probed by the NAT detector, using the detector source port
  - `probed_mtu`: number — MTU as measured between the two ends of the tunnel
  - `recent_healthy_pings`: number — Number of recent healthy pings for this tunnel
  - `recent_unhealthy_pings`: number — Number of recent unhealthy pings for this tunnel
  - `tunnel_id`: string **required** — Tunnel identifier
- `uptime_idle_ms`: number — Sum of how much time each core has spent idle
- `uptime_total_ms`: number — Uptime of the system, including time spent in suspend
- `v`: string **required** — Version

## GET /accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/latest

Get latest Snapshots

operationId: `mconn-connector-telemetry-snapshots-latest-get`

**Response** 200 → `result`

- `count`: number **required**
- `items`: object[] **required**
  [array of]
  - `bonds`: object[]
    [array of]
    - `name`: string **required** — Name of the network interface
    - `status`: string **required** — Current status of the network interface
  - `count_reclaim_failures`: number **required** — Count of failures to reclaim space
  - `count_reclaimed_paths`: number **required** — Count of reclaimed paths
  - `count_record_failed`: number **required** — Count of failed snapshot recordings
  - `count_transmit_failures`: number **required** — Count of failed snapshot transmissions
  - `cpu_count`: number — Count of processors/cores
  - `cpu_pressure_10s`: number — Percentage of time over a 10 second window that tasks were stalled
  - `cpu_pressure_300s`: number — Percentage of time over a 5 minute window that tasks were stalled
  - `cpu_pressure_60s`: number — Percentage of time over a 1 minute window that tasks were stalled
  - `cpu_pressure_total_us`: number — Total stall time (microseconds)
  - `cpu_time_guest_ms`: number — Time spent running a virtual CPU or guest OS (milliseconds)
  - `cpu_time_guest_nice_ms`: number — Time spent running a niced guest (milliseconds)
  - `cpu_time_idle_ms`: number — Time spent in idle state (milliseconds)
  - `cpu_time_iowait_ms`: number — Time spent wait for I/O to complete (milliseconds)
  - `cpu_time_irq_ms`: number — Time spent servicing interrupts (milliseconds)
  - `cpu_time_nice_ms`: number — Time spent in low-priority user mode (milliseconds)
  - `cpu_time_softirq_ms`: number — Time spent servicing softirqs (milliseconds)
  - `cpu_time_steal_ms`: number — Time stolen (milliseconds)
  - `cpu_time_system_ms`: number — Time spent in system mode (milliseconds)
  - `cpu_time_user_ms`: number — Time spent in user mode (milliseconds)
  - `delta`: number — Number of network operations applied during state transition
  - `dhcp_leases`: object[]
    [array of]
    - `client_id`: string **required** — Client ID of the device the IP Address was leased to
    - `expiry_time`: number **required** — Expiry time of the DHCP lease (seconds since the Unix epoch)
    - `hostname`: string **required** — Hostname of the device the IP Address was leased to
    - `interface_name`: string **required** — Name of the network interface
    - `ip_address`: string **required** — IP Address that was leased
    - `mac_address`: string **required** — MAC Address of the device the IP Address was leased to
  - `disks`: object[]
    [array of]
    - `discards`: number — Discards completed successfully
    - `discards_merged`: number — Discards merged
    - `flushes`: number — Flushes completed successfully
    - `in_progress`: number **required** — I/Os currently in progress
    - `major`: number **required** — Device major number
    - `merged`: number **required** — Reads merged
    - `minor`: number **required** — Device minor number
    - `name`: string **required** — Device name
    - `reads`: number **required** — Reads completed successfully
    - `sectors_discarded`: number — Sectors discarded
    - `sectors_read`: number **required** — Sectors read successfully
    - `sectors_written`: number **required** — Sectors written successfully
    - `time_discarding_ms`: number — Time spent discarding (milliseconds)
    - `time_flushing_ms`: number — Time spent flushing (milliseconds)
    - `time_in_progress_ms`: number **required** — Time spent doing I/Os (milliseconds)
    - `time_reading_ms`: number **required** — Time spent reading (milliseconds)
    - `time_writing_ms`: number **required** — Time spent writing (milliseconds)
    - `weighted_time_in_progress_ms`: number **required** — Weighted time spent doing I/Os (milliseconds)
    - `writes`: number **required** — Writes completed
    - `writes_merged`: number **required** — Writes merged
  - `epsilon`: number — Simulated number of network operations applied during state transition
  - `ha_state`: string — Name of high availability state
  - `ha_value`: number — Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)
  - `interfaces`: object[]
    [array of]
    - `health_reason`: string — Comma-separated list of reasons for health score
    - `health_score`: number — Aggregate health score (0-100)
    - `ip_addresses`: object[]
    - `name`: string **required** — Name of the network interface
    - `operstate`: string **required** — UP/DOWN state of the network interface
    - `speed`: number — Speed of the network interface (bits per second)
  - `io_pressure_full_10s`: number — Percentage of time over a 10 second window that all tasks were stalled
  - `io_pressure_full_300s`: number — Percentage of time over a 5 minute window that all tasks were stalled
  - `io_pressure_full_60s`: number — Percentage of time over a 1 minute window that all tasks were stalled
  - `io_pressure_full_total_us`: number — Total stall time (microseconds)
  - `io_pressure_some_10s`: number — Percentage of time over a 10 second window that some tasks were stalled
  - `io_pressure_some_300s`: number — Percentage of time over a 3 minute window that some tasks were stalled
  - `io_pressure_some_60s`: number — Percentage of time over a 1 minute window that some tasks were stalled
  - `io_pressure_some_total_us`: number — Total stall time (microseconds)
  - `kernel_btime`: number — Boot time (seconds since Unix epoch)
  - `kernel_ctxt`: number — Number of context switches that the system underwent
  - `kernel_processes`: number — Number of forks since boot
  - `kernel_processes_blocked`: number — Number of processes blocked waiting for I/O
  - `kernel_processes_running`: number — Number of processes in runnable state
  - `load_average_15m`: number — The fifteen-minute load average
  - `load_average_1m`: number — The one-minute load average
  - `load_average_5m`: number — The five-minute load average
  - `load_average_cur`: number — Number of currently runnable kernel scheduling entities
  - `load_average_max`: number — Number of kernel scheduling entities that currently exist on the system
  - `memory_active_bytes`: number — Memory that has been used more recently
  - `memory_anon_hugepages_bytes`: number — Non-file backed huge pages mapped into user-space page tables
  - `memory_anon_pages_bytes`: number — Non-file backed pages mapped into user-space page tables
  - `memory_available_bytes`: number — Estimate of how much memory is available for starting new applications
  - `memory_bounce_bytes`: number — Memory used for block device bounce buffers
  - `memory_buffers_bytes`: number — Relatively temporary storage for raw disk blocks
  - `memory_cached_bytes`: number — In-memory cache for files read from the disk
  - `memory_cma_free_bytes`: number — Free CMA (Contiguous Memory Allocator) pages
  - `memory_cma_total_bytes`: number — Total CMA (Contiguous Memory Allocator) pages
  - `memory_commit_limit_bytes`: number — Total amount of memory currently available to be allocated on the system
  - `memory_committed_as_bytes`: number — Amount of memory presently allocated on the system
  - `memory_dirty_bytes`: number — Memory which is waiting to get written back to the disk
  - `memory_free_bytes`: number — The sum of LowFree and HighFree
  - `memory_high_free_bytes`: number — Amount of free highmem
  - `memory_high_total_bytes`: number — Total amount of highmem
  - `memory_hugepages_free`: number — The number of huge pages in the pool that are not yet allocated
  - `memory_hugepages_rsvd`: number — Number of huge pages for which a commitment has been made, but no allocation has yet been made
  - `memory_hugepages_surp`: number — Number of huge pages in the pool above the threshold
  - `memory_hugepages_total`: number — The size of the pool of huge pages
  - `memory_hugepagesize_bytes`: number — The size of huge pages
  - `memory_inactive_bytes`: number — Memory which has been less recently used
  - `memory_k_reclaimable_bytes`: number — Kernel allocations that the kernel will attempt to reclaim under memory pressure
  - `memory_kernel_stack_bytes`: number — Amount of memory allocated to kernel stacks
  - `memory_low_free_bytes`: number — Amount of free lowmem
  - `memory_low_total_bytes`: number — Total amount of lowmem
  - `memory_mapped_bytes`: number — Files which have been mapped into memory
  - `memory_page_tables_bytes`: number — Amount of memory dedicated to the lowest level of page tables
  - `memory_per_cpu_bytes`: number — Memory allocated to the per-cpu alloctor used to back per-cpu allocations
  - `memory_pressure_full_10s`: number — Percentage of time over a 10 second window that all tasks were stalled
  - `memory_pressure_full_300s`: number — Percentage of time over a 5 minute window that all tasks were stalled
  - `memory_pressure_full_60s`: number — Percentage of time over a 1 minute window that all tasks were stalled
  - `memory_pressure_full_total_us`: number — Total stall time (microseconds)
  - `memory_pressure_some_10s`: number — Percentage of time over a 10 second window that some tasks were stalled
  - `memory_pressure_some_300s`: number — Percentage of time over a 5 minute window that some tasks were stalled
  - `memory_pressure_some_60s`: number — Percentage of time over a 1 minute window that some tasks were stalled
  - `memory_pressure_some_total_us`: number — Total stall time (microseconds)
  - `memory_s_reclaimable_bytes`: number — Part of slab that can be reclaimed on memory pressure
  - `memory_s_unreclaim_bytes`: number — Part of slab that cannot be reclaimed on memory pressure
  - `memory_secondary_page_tables_bytes`: number — Amount of memory dedicated to the lowest level of page tables
  - `memory_shmem_bytes`: number — Amount of memory consumed by tmpfs
  - `memory_shmem_hugepages_bytes`: number — Memory used by shmem and tmpfs, allocated with huge pages
  - `memory_shmem_pmd_mapped_bytes`: number — Shared memory mapped into user space with huge pages
  - `memory_slab_bytes`: number — In-kernel data structures cache
  - `memory_swap_cached_bytes`: number — Memory swapped out and back in while still in swap file
  - `memory_swap_free_bytes`: number — Amount of swap space that is currently unused
  - `memory_swap_total_bytes`: number — Total amount of swap space available
  - `memory_total_bytes`: number — Total usable RAM
  - `memory_vmalloc_chunk_bytes`: number — Largest contiguous block of vmalloc area which is free
  - `memory_vmalloc_total_bytes`: number — Total size of vmalloc memory area
  - `memory_vmalloc_used_bytes`: number — Amount of vmalloc area which is used
  - `memory_writeback_bytes`: number — Memory which is actively being written back to the disk
  - `memory_writeback_tmp_bytes`: number — Memory used by FUSE for temporary writeback buffers
  - `memory_z_swap_bytes`: number — Memory consumed by the zswap backend, compressed
  - `memory_z_swapped_bytes`: number — Amount of anonymous memory stored in zswap, uncompressed
  - `mounts`: object[]
    [array of]
    - `available_bytes`: number — Available disk size (bytes)
    - `available_inodes`: number — Available inodes on filesystem
    - `file_system`: string **required** — File system on disk (EXT4, NTFS, etc.)
    - `is_read_only`: boolean — Determines whether the disk is read-only
    - `is_removable`: boolean — Determines whether the disk is removable
    - `kind`: string **required** — Kind of disk (HDD, SSD, etc.)
    - `mount_point`: string **required** — Path where disk is mounted
    - `name`: string **required** — Name of the disk mount
    - `total_bytes`: number — Total disk size (bytes)
    - `total_inodes`: number — Total inodes on filesystem
  - `netdevs`: object[]
    [array of]
    - `name`: string **required** — Name of the network device
    - `recv_bytes`: number **required** — Total bytes received
    - `recv_compressed`: number **required** — Compressed packets received
    - `recv_drop`: number **required** — Packets dropped
    - `recv_errs`: number **required** — Bad packets received
    - `recv_fifo`: number **required** — FIFO overruns
    - `recv_frame`: number **required** — Frame alignment errors
    - `recv_multicast`: number **required** — Multicast packets received
    - `recv_packets`: number **required** — Total packets received
    - `sent_bytes`: number **required** — Total bytes transmitted
    - `sent_carrier`: number **required** — Number of packets not sent due to carrier errors
    - `sent_colls`: number **required** — Number of collisions
    - `sent_compressed`: number **required** — Number of compressed packets transmitted
    - `sent_drop`: number **required** — Number of packets dropped during transmission
    - `sent_errs`: number **required** — Number of transmission errors
    - `sent_fifo`: number **required** — FIFO overruns
    - `sent_packets`: number **required** — Total packets transmitted
  - `platform`: string — Platform identifier
  - `routes`: object[]
    [array of]
    - `destination`: string **required** — Route destination as default or an IPv4 CIDR
    - `gateway`: string — Gateway address for the next hop
    - `interface_name`: string **required** — Interface used by the next hop
    - `kind`: string **required** — Routing decision type: tunnel, breakout, or lan
    - `metric`: number **required** — Route metric; lower metrics are preferred
    - `weight`: number — Relative weight within an equal-cost route
  - `site_id`: string — Site identifier
  - `snmp_icmp_in_addr_mask_reps`: number — Number of ICMP Address Mask Reply messages received
  - `snmp_icmp_in_addr_masks`: number — Number of ICMP Address Mask Request messages received
  - `snmp_icmp_in_csum_errors`: number — Number of ICMP messages received with bad checksums
  - `snmp_icmp_in_dest_unreachs`: number — Number of ICMP Destination Unreachable messages received
  - `snmp_icmp_in_echo_reps`: number — Number of ICMP Echo Reply messages received
  - `snmp_icmp_in_echos`: number — Number of ICMP Echo (request) messages received
  - `snmp_icmp_in_errors`: number — Number of ICMP messages received with ICMP-specific errors
  - `snmp_icmp_in_msgs`: number — Number of ICMP messages received
  - `snmp_icmp_in_parm_probs`: number — Number of ICMP Parameter Problem messages received
  - `snmp_icmp_in_redirects`: number — Number of ICMP Redirect messages received
  - `snmp_icmp_in_src_quenchs`: number — Number of ICMP Source Quench messages received
  - `snmp_icmp_in_time_excds`: number — Number of ICMP Time Exceeded messages received
  - `snmp_icmp_in_timestamp_reps`: number — Number of ICMP Address Mask Request messages received
  - `snmp_icmp_in_timestamps`: number — Number of ICMP Timestamp (request) messages received
  - `snmp_icmp_out_addr_mask_reps`: number — Number of ICMP Address Mask Reply messages sent
  - `snmp_icmp_out_addr_masks`: number — Number of ICMP Address Mask Request messages sent
  - `snmp_icmp_out_dest_unreachs`: number — Number of ICMP Destination Unreachable messages sent
  - `snmp_icmp_out_echo_reps`: number — Number of ICMP Echo Reply messages sent
  - `snmp_icmp_out_echos`: number — Number of ICMP Echo (request) messages sent
  - `snmp_icmp_out_errors`: number — Number of ICMP messages which this entity did not send due to ICMP-specific errors
  - `snmp_icmp_out_msgs`: number — Number of ICMP messages attempted to send
  - `snmp_icmp_out_parm_probs`: number — Number of ICMP Parameter Problem messages sent
  - `snmp_icmp_out_redirects`: number — Number of ICMP Redirect messages sent
  - `snmp_icmp_out_src_quenchs`: number — Number of ICMP Source Quench messages sent
  - `snmp_icmp_out_time_excds`: number — Number of ICMP Time Exceeded messages sent
  - `snmp_icmp_out_timestamp_reps`: number — Number of ICMP Timestamp Reply messages sent
  - `snmp_icmp_out_timestamps`: number — Number of ICMP Timestamp (request) messages sent
  - `snmp_ip_default_ttl`: number — Default value of the Time-To-Live field of the IP header
  - `snmp_ip_forw_datagrams`: number — Number of datagrams forwarded to their final destination
  - `snmp_ip_forwarding_enabled`: boolean — Set when acting as an IP gateway
  - `snmp_ip_frag_creates`: number — Number of datagrams generated by fragmentation
  - `snmp_ip_frag_fails`: number — Number of datagrams discarded because fragmentation failed
  - `snmp_ip_frag_oks`: number — Number of datagrams successfully fragmented
  - `snmp_ip_in_addr_errors`: number — Number of input datagrams discarded due to errors in the IP address
  - `snmp_ip_in_delivers`: number — Number of input datagrams successfully delivered to IP user-protocols
  - `snmp_ip_in_discards`: number — Number of input datagrams otherwise discarded
  - `snmp_ip_in_hdr_errors`: number — Number of input datagrams discarded due to errors in the IP header
  - `snmp_ip_in_receives`: number — Number of input datagrams received from interfaces
  - `snmp_ip_in_unknown_protos`: number — Number of input datagrams discarded due unknown or unsupported protocol
  - `snmp_ip_out_discards`: number — Number of output datagrams otherwise discarded
  - `snmp_ip_out_no_routes`: number — Number of output datagrams discarded because no route matched
  - `snmp_ip_out_requests`: number — Number of datagrams supplied for transmission
  - `snmp_ip_reasm_fails`: number — Number of failures detected by the reassembly algorithm
  - `snmp_ip_reasm_oks`: number — Number of datagrams successfully reassembled
  - `snmp_ip_reasm_reqds`: number — Number of fragments received which needed to be reassembled
  - `snmp_ip_reasm_timeout`: number — Number of seconds fragments are held while awaiting reassembly
  - `snmp_tcp_active_opens`: number — Number of times TCP transitions to SYN-SENT from CLOSED
  - `snmp_tcp_attempt_fails`: number — Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD
  - `snmp_tcp_curr_estab`: number — Number of TCP connections in ESTABLISHED or CLOSE-WAIT
  - `snmp_tcp_estab_resets`: number — Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT
  - `snmp_tcp_in_csum_errors`: number — Number of TCP segments received with checksum errors
  - `snmp_tcp_in_errs`: number — Number of TCP segments received in error
  - `snmp_tcp_in_segs`: number — Number of TCP segments received
  - `snmp_tcp_max_conn`: number — Limit on the total number of TCP connections
  - `snmp_tcp_out_rsts`: number — Number of TCP segments sent with RST flag
  - `snmp_tcp_out_segs`: number — Number of TCP segments sent
  - `snmp_tcp_passive_opens`: number — Number of times TCP transitions to SYN-RCVD from LISTEN
  - `snmp_tcp_retrans_segs`: number — Number of TCP segments retransmitted
  - `snmp_tcp_rto_max`: number — Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)
  - `snmp_tcp_rto_min`: number — Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)
  - `snmp_udp_in_datagrams`: number — Number of UDP datagrams delivered to UDP applications
  - `snmp_udp_in_errors`: number — Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port
  - `snmp_udp_no_ports`: number — Number of UDP datagrams received for which there was not application at the destination port
  - `snmp_udp_out_datagrams`: number — Number of UDP datagrams sent
  - `system_boot_time_s`: number — Boottime of the system (seconds since the Unix epoch)
  - `t`: number **required** — Time the Snapshot was recorded (seconds since the Unix epoch)
  - `thermals`: object[]
    [array of]
    - `critical_celcius`: number — Critical failure temperature of the component (degrees Celsius)
    - `current_celcius`: number — Current temperature of the component (degrees Celsius)
    - `label`: string **required** — Sensor identifier for the component
    - `max_celcius`: number — Maximum temperature of the component (degrees Celsius)
  - `tunnels`: object[]
    [array of]
    - `health_state`: string **required** — Name of tunnel health state (unknown, healthy, degraded, down)
    - `health_value`: number **required** — Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)
    - `interface_name`: string **required** — The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)
    - `jitter_ms`: number — Tunnel round-trip latency variation in milliseconds
    - `latency_ms`: number — 50th percentile tunnel round-trip latency in milliseconds
    - `natd_result`: string — Public socket address returned by the NAT detector
    - `natd_state`: number — Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)
    - `natd_target`: string — Target socket address probed by the NAT detector, using the detector source port
    - `probed_mtu`: number — MTU as measured between the two ends of the tunnel
    - `recent_healthy_pings`: number — Number of recent healthy pings for this tunnel
    - `recent_unhealthy_pings`: number — Number of recent unhealthy pings for this tunnel
    - `tunnel_id`: string **required** — Tunnel identifier
  - `uptime_idle_ms`: number — Sum of how much time each core has spent idle
  - `uptime_total_ms`: number — Uptime of the system, including time spent in suspend
  - `v`: string **required** — Version
