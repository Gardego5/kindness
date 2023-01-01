type postgresDate = string | Date;

const alertPlacement = {
  login: "login",
  project: "project",
  timeslot_signup: "timeslot_signup",
  timeslot_remove: "timeslot_remove",
} as const;

type alertPlacement = typeof alertPlacement[keyof typeof alertPlacement];

interface DB_User {
  id: number;
  username: string;
  email: string;
  hash: string;
  salt: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

interface DB_Project {
  id: number;
  name: string;
  start_date: postgresDate;
  end_date?: postgresDate;
  recipient_id?: number;
}

interface DB_Timeslot {
  id: number;
  title: string;
  project_id: number;
}

interface DB_Visit {
  id: number;
  date: postgresDate;
  hidden: boolean;
  timeslot_id: number;
  project_id: number;
}

interface DB_Group {
  id: string;
  name?: string;
  hash: string;
  salt: string;
  start_date?: postgresDate;
  end_date?: postgresDate;
  signup_disabled: boolean;
}

interface DB_Alert {
  id: number;
  location: alertPlacement;
  content: string;
  start_date?: postgresDate;
  end_date?: postgresDate;
  displays?: number;
  creator_id?: number;
  yes?: string;
  no?: string;
}

namespace DBJoin {
  interface Users_Projects {
    id: number;
    user_id: number;
    project_id: number;
  }

  interface Users_Visits {
    id: number;
    user_id: number;
    visit_id: number;
  }

  interface Groups_Projects {
    id: number;
    group_id: string;
    project_id: number;
  }

  interface Users_Groups {
    id: number;
    user_id: number;
    group_id: string;
  }

  interface Alerts_Users {
    id: number;
    alert_id: number;
    user_id: number;
    times_displayed: number;
  }

  interface Alerts_Groups {
    id: number;
    alert_id: number;
    group_id: string;
  }

  interface Alerts_Projects {
    id: number;
    alert_id: number;
    project_id: number;
  }
}
