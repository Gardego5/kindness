interface UserView
  extends Pick<DB_User, "username" | "first_name" | "last_name"> {}

interface VisitView {
  date: postgresDate;
  timeslot: string;
  users: UserView[];
}

interface ProjectView
  extends Pick<DB_Project, "id" | "name" | "start_date" | "end_date"> {
  timeslots: string[];
}

interface GroupView
  extends Pick<DB_Group, "id" | "name" | "start_date" | "end_date"> {
  project_ids?: number[];
}

interface AlertView extends Pick<DB_Alert, "location" | "content"> {
  user_id?: number;
  group_id?: string;
  project_id?: number;
}