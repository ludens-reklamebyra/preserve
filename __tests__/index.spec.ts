import 'jest-localstorage-mock';
import preserve from '../src/index';

describe('Preserve', () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
  });

  it('should work by not setting explicit initial data', () => {
    const key = 'myData';
    preserve(key);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, '[]');
    expect(localStorage.__STORE__[key]).toBe('[]');
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should work by setting explicit initial data as second argument', () => {
    const key = 'myData';
    preserve(key, [1, 2, 3]);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, '[1,2,3]');
    expect(localStorage.__STORE__[key]).toBe('[1,2,3]');
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should be able to update data', () => {
    const key = 'myData';
    const initialData = { name: 'Øyvind' };
    const item = preserve(key, initialData);

    expect(localStorage.__STORE__[key]).toBe(`${JSON.stringify(initialData)}`);

    item.set({ name: 'Other' });

    const expected = JSON.stringify({ name: 'Other' });

    // testing what is in localStorage
    expect(localStorage.__STORE__[key]).toBe(expected);

    // testing the parsed localStorage data
    expect(item.get()).toEqual(JSON.parse(expected));
  });

  it('should listen to updates to the localStorage', done => {
    const key = 'myItem';
    const item = preserve(key, 1);

    const listener = (prevItem: any, nextItem: any) => {
      expect(prevItem).toEqual(1);
      expect(nextItem).toEqual(2);

      done();
    };

    item.subscribe(listener);
    item.set(2);

    expect(localStorage.__STORE__[key]).toBe('2');
  });

  it('should throw an error if you do not provide a key.', () => {
    expect(() => {
      // @ts-ignore
      preserve();
    }).toThrow();
  });

  it('should be able to clear a preserved item.', () => {
    const key = 'myData';
    const item = preserve(key, 1);
    expect(localStorage.__STORE__[key]).toBe('1');
    expect(item.get()).toBe(1);

    // clear item
    item.clearItem(key);

    expect(localStorage.__STORE__[key]).toBe(undefined);
    expect(item.get()).toBe(null);
  });

  it('should throw an error if you try to clear without a key', () => {
    expect(() => {
      const item = preserve('myKey', 1);
      // @ts-ignore
      item.clearItem();
    }).toThrow();
  });
});
