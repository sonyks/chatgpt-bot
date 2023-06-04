export type PersonType = 'Customer Support' | 'You';

export interface ChatWithBot {
  person: PersonType;
  response: string;
  fromUser: boolean;
}
