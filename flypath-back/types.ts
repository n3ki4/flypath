export type DataToSendType = {
  timestamp: number;
  status: number;
  message?: string;
  errorCode?: string | null;
  data?: any;
};
