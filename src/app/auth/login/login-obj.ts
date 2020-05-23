export class LoginObj {
  clientId: number;
  userId?: any;
  clientName: string;
  userName?: any;
  accessLevel: number;
  apiToken?: any;
  disabled?: any;
  producer: Producer;
  isRegisteredUser: boolean;
  changePassword: boolean;
  pendingContract: boolean;
  hasActivePlan: boolean;
}

export class Producer {
  id: number;
}
