interface AlertMessage {
  content?: string;
  confirm?: (event: Event) => void;
  decline?: (event: Event) => void;
  cleanup?: (...any) => void;
  yes?: string;
  no?: string;
}

interface AlertEntry {
  alert: AlertMessage;
  id: string;
}

interface AlertData {
  alert: AlertView;
  triggers?: string;
}
