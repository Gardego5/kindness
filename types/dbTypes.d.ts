interface User {
  id: number;
  username: string;
  email: string;
  hash: string;
  salt: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

interface Project {
  id: number;
  name: string;
  start_date: string | Date;
  end_date?: string | Date;
  recipient_id?: number;
}
