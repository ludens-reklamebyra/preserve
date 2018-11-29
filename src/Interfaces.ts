export type ListenerType = (nextData: any) => any;

export interface IPreserve {
  get: <T>() => T;
  set: (data: any) => any;
  subscribe: (listener: ListenerType) => any;
  clearItem: () => void;
}
