export type ListenerType = (nextData: any) => any;

export interface IPreserve {
  get: () => any;
  set: (data: any) => any;
  subscribe: (listener: ListenerType) => any;
  clearItem: (key: string) => void;
}
