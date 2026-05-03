import type {
  Employee,
  EmployeeDepartment,
  TimeEntry,
  Timecard,
  PTOBalance,
  PTORequest,
  Shift,
  PayStub,
  Announcement,
} from "@/types";

/* ── Employees ────────────────────────────────────────── */

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "emp-001",
    full_name: "Marco Bianchi",
    role: "Press Operator",
    department: "production",
    email: "marco.bianchi@mazzoneoliveoil.com",
    phone: "(805) 555-0101",
    hire_date: "2020-06-15",
    is_active: true,
  },
  {
    id: "emp-002",
    full_name: "Lucia Rizzo",
    role: "Sales Manager",
    department: "sales",
    email: "lucia.rizzo@mazzoneoliveoil.com",
    phone: "(805) 555-0102",
    hire_date: "2021-02-01",
    is_active: true,
  },
  {
    id: "emp-003",
    full_name: "Gianna Moretti",
    role: "Tasting Room Host",
    department: "tasting_room",
    email: "gianna.moretti@mazzoneoliveoil.com",
    phone: "(805) 555-0103",
    hire_date: "2023-09-12",
    is_active: true,
  },
  {
    id: "emp-004",
    full_name: "Tommaso Conti",
    role: "Office Manager",
    department: "admin",
    email: "tommaso.conti@mazzoneoliveoil.com",
    phone: "(805) 555-0104",
    hire_date: "2020-11-03",
    is_active: true,
  },
  {
    id: "emp-005",
    full_name: "Elena Vitale",
    role: "Production Supervisor",
    department: "production",
    email: "elena.vitale@mazzoneoliveoil.com",
    phone: "(805) 555-0105",
    hire_date: "2021-08-22",
    is_active: true,
  },
  {
    id: "emp-006",
    full_name: "Dante Pellegrini",
    role: "Sales Representative",
    department: "sales",
    email: "dante.pellegrini@mazzoneoliveoil.com",
    phone: "(805) 555-0106",
    hire_date: "2024-01-10",
    is_active: true,
  },
  {
    id: "emp-007",
    full_name: "Valentina Greco",
    role: "Warehouse Coordinator",
    department: "operations",
    email: "valentina.greco@mazzoneoliveoil.com",
    phone: "(805) 555-0107",
    hire_date: "2022-05-18",
    is_active: true,
  },
  {
    id: "emp-008",
    full_name: "Nico Esposito",
    role: "Tasting Room Manager",
    department: "tasting_room",
    email: "nico.esposito@mazzoneoliveoil.com",
    phone: "(805) 555-0108",
    hire_date: "2025-03-01",
    is_active: true,
  },
];

/* ── Current Employee ─────────────────────────────────── */

export const MOCK_CURRENT_EMPLOYEE: Employee = {
  id: "emp-100",
  full_name: "Sofia Ferrara",
  role: "Operations Lead",
  department: "operations",
  email: "sofia.ferrara@mazzoneoliveoil.com",
  phone: "(805) 555-0200",
  hire_date: "2022-03-15",
  is_active: true,
};

/* ── Current Timecard ─────────────────────────────────── */

const currentWeekEntries: TimeEntry[] = [
  {
    id: "te-c01",
    date: "2026-04-27",
    clock_in: "08:05",
    clock_out: "17:10",
    break_minutes: 45,
    total_hours: 8.08,
  },
  {
    id: "te-c02",
    date: "2026-04-28",
    clock_in: "08:15",
    clock_out: "17:20",
    break_minutes: 30,
    total_hours: 8.58,
  },
  {
    id: "te-c03",
    date: "2026-04-29",
    clock_in: "08:00",
    clock_out: "17:00",
    break_minutes: 60,
    total_hours: 8.0,
  },
  {
    id: "te-c04",
    date: "2026-04-30",
    clock_in: "08:30",
    clock_out: "17:30",
    break_minutes: 45,
    total_hours: 8.25,
  },
  {
    id: "te-c05",
    date: "2026-05-01",
    clock_in: "08:10",
    clock_out: "17:15",
    break_minutes: 30,
    total_hours: 8.58,
  },
];

export const MOCK_CURRENT_TIMECARD: Timecard = {
  id: "tc-current",
  employee_id: "emp-100",
  week_start: "2026-04-27",
  week_end: "2026-05-03",
  status: "draft",
  entries: currentWeekEntries,
  total_hours: 41.49,
  submitted_at: null,
};

/* ── Past Timecards ───────────────────────────────────── */

export const MOCK_PAST_TIMECARDS: Timecard[] = [
  {
    id: "tc-past-01",
    employee_id: "emp-100",
    week_start: "2026-04-20",
    week_end: "2026-04-26",
    status: "approved",
    entries: [],
    total_hours: 40.5,
    submitted_at: "2026-04-26T17:30:00Z",
  },
  {
    id: "tc-past-02",
    employee_id: "emp-100",
    week_start: "2026-04-13",
    week_end: "2026-04-19",
    status: "approved",
    entries: [],
    total_hours: 39.0,
    submitted_at: "2026-04-19T17:15:00Z",
  },
  {
    id: "tc-past-03",
    employee_id: "emp-100",
    week_start: "2026-04-06",
    week_end: "2026-04-12",
    status: "submitted",
    entries: [],
    total_hours: 42.0,
    submitted_at: "2026-04-12T17:00:00Z",
  },
  {
    id: "tc-past-04",
    employee_id: "emp-100",
    week_start: "2026-03-30",
    week_end: "2026-04-05",
    status: "rejected",
    entries: [],
    total_hours: 38.25,
    submitted_at: "2026-04-05T16:45:00Z",
  },
];

/* ── PTO Balances ─────────────────────────────────────── */

export const MOCK_PTO_BALANCES: PTOBalance[] = [
  {
    type: "vacation",
    accrued_hours: 80,
    used_hours: 32,
    available_hours: 48,
  },
  {
    type: "sick",
    accrued_hours: 40,
    used_hours: 8,
    available_hours: 32,
  },
  {
    type: "personal",
    accrued_hours: 16,
    used_hours: 0,
    available_hours: 16,
  },
];

/* ── PTO Requests ─────────────────────────────────────── */

export const MOCK_PTO_REQUESTS: PTORequest[] = [
  {
    id: "pto-001",
    type: "vacation",
    start_date: "2026-03-16",
    end_date: "2026-03-20",
    hours: 32,
    status: "approved",
    notes: "Family trip to Tuscany",
    created_at: "2026-02-28T10:00:00Z",
  },
  {
    id: "pto-002",
    type: "personal",
    start_date: "2026-05-15",
    end_date: "2026-05-15",
    hours: 8,
    status: "pending",
    notes: "Appointment",
    created_at: "2026-04-25T14:30:00Z",
  },
  {
    id: "pto-003",
    type: "vacation",
    start_date: "2026-06-01",
    end_date: "2026-06-05",
    hours: 40,
    status: "rejected",
    notes: "Harvest prep conflicts — please reschedule",
    created_at: "2026-04-10T09:15:00Z",
  },
  {
    id: "pto-004",
    type: "sick",
    start_date: "2026-04-08",
    end_date: "2026-04-08",
    hours: 8,
    status: "approved",
    notes: null,
    created_at: "2026-04-08T07:45:00Z",
  },
];

/* ── Shifts ───────────────────────────────────────────── */

export const MOCK_SHIFTS: Shift[] = [
  {
    id: "sh-001",
    date: "2026-04-27",
    start_time: "08:00",
    end_time: "17:00",
    department: "operations",
    location: "Main Facility",
  },
  {
    id: "sh-002",
    date: "2026-04-28",
    start_time: "08:00",
    end_time: "17:00",
    department: "operations",
    location: "Main Facility",
  },
  {
    id: "sh-003",
    date: "2026-04-29",
    start_time: "08:00",
    end_time: "17:00",
    department: "operations",
    location: "Main Facility",
  },
  {
    id: "sh-004",
    date: "2026-04-30",
    start_time: "08:00",
    end_time: "17:00",
    department: "operations",
    location: "Main Facility",
  },
  {
    id: "sh-005",
    date: "2026-05-01",
    start_time: "08:00",
    end_time: "17:00",
    department: "operations",
    location: "Main Facility",
  },
  {
    id: "sh-006",
    date: "2026-05-02",
    start_time: "10:00",
    end_time: "18:00",
    department: "tasting_room",
    location: "Tasting Room",
  },
  {
    id: "sh-007",
    date: "2026-05-03",
    start_time: "10:00",
    end_time: "18:00",
    department: "tasting_room",
    location: "Tasting Room",
  },
];

/* ── Pay Stubs ────────────────────────────────────────── */

export const MOCK_PAY_STUBS: PayStub[] = [
  {
    id: "ps-001",
    period_start: "2026-01-05",
    period_end: "2026-01-18",
    pay_date: "2026-01-23",
    gross_cents: 280000,
    deductions_cents: 21000,
    taxes_cents: 56000,
    net_cents: 203000,
    hours: 80,
    overtime_hours: 0,
  },
  {
    id: "ps-002",
    period_start: "2026-01-19",
    period_end: "2026-02-01",
    pay_date: "2026-02-06",
    gross_cents: 295000,
    deductions_cents: 22500,
    taxes_cents: 59000,
    net_cents: 213500,
    hours: 80,
    overtime_hours: 2,
  },
  {
    id: "ps-003",
    period_start: "2026-02-02",
    period_end: "2026-02-15",
    pay_date: "2026-02-20",
    gross_cents: 280000,
    deductions_cents: 21000,
    taxes_cents: 56000,
    net_cents: 203000,
    hours: 80,
    overtime_hours: 0,
  },
  {
    id: "ps-004",
    period_start: "2026-02-16",
    period_end: "2026-03-01",
    pay_date: "2026-03-06",
    gross_cents: 310000,
    deductions_cents: 24000,
    taxes_cents: 62000,
    net_cents: 224000,
    hours: 82,
    overtime_hours: 4,
  },
  {
    id: "ps-005",
    period_start: "2026-03-02",
    period_end: "2026-03-15",
    pay_date: "2026-03-20",
    gross_cents: 290000,
    deductions_cents: 22000,
    taxes_cents: 58000,
    net_cents: 210000,
    hours: 80,
    overtime_hours: 1,
  },
  {
    id: "ps-006",
    period_start: "2026-03-16",
    period_end: "2026-03-29",
    pay_date: "2026-04-03",
    gross_cents: 320000,
    deductions_cents: 25000,
    taxes_cents: 64000,
    net_cents: 231000,
    hours: 83,
    overtime_hours: 3,
  },
];

/* ── Announcements ────────────────────────────────────── */

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "2026 Harvest Schedule",
    body: "The 2026 harvest is projected to begin the first week of October. Department leads will receive detailed staffing plans by August 15. Please mark your calendars and plan PTO accordingly.",
    author: "Management",
    priority: "normal",
    created_at: "2026-04-20T09:00:00Z",
  },
  {
    id: "ann-002",
    title: "New Press Training Required",
    body: "All production and operations staff must complete the new cold-press safety certification by May 30. Training sessions are available every Tuesday and Thursday at 7:00 AM in the production hall. Sign up with your supervisor.",
    author: "Operations",
    priority: "important",
    created_at: "2026-04-28T11:30:00Z",
  },
  {
    id: "ann-003",
    title: "Summer Hours Begin June 1",
    body: "Starting June 1, the facility will shift to summer hours: Monday through Friday 7:00 AM - 3:30 PM. Tasting room weekend hours remain unchanged. Updated schedules will be posted next week.",
    author: "HR",
    priority: "urgent",
    created_at: "2026-05-01T08:00:00Z",
  },
];

/* ── Clock Status ─────────────────────────────────────── */

export const MOCK_CLOCK_STATUS = {
  isClockedIn: true,
  clockInTime: "08:15",
};
