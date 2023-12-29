import { Storage } from "webextension-polyfill";
import { browser } from "wxt/browser";

const AREA_NAME = "local";

export type Options = {
  "video-likes": boolean;
  "comment-likes": boolean;
  views: boolean;
  subs: boolean;
};

export const DEFAULT_OPTIONS: Options = {
  "video-likes": true,
  "comment-likes": true,
  views: true,
  subs: true,
};

export const getOptions = async () => {
  const inStorage = await browser.storage[AREA_NAME].get(
    Object.keys(DEFAULT_OPTIONS),
  );

  return Object.fromEntries(
    Object.entries(DEFAULT_OPTIONS).map(([key, defaultValue]) => [
      key,
      inStorage[key] ?? defaultValue,
    ]),
  ) as Options;
};

export const setOptions = <K extends keyof Options>(items: Pick<Options, K>) =>
  browser.storage[AREA_NAME].set(items);

export const setOption = <K extends keyof Options>(key: K, value: Options[K]) =>
  setOptions({ [key]: value } as any);

const newValuesFromChanges = (
  changes: Storage.StorageChange,
): Partial<Options> =>
  Object.fromEntries(
    Object.entries(changes)
      .filter(
        ([key, change]) =>
          key in DEFAULT_OPTIONS && change.newValue !== change.oldValue,
      )
      .map(([key, change]) => [key, change.newValue]),
  );

export const onChangeHandler =
  (callback: (newValues: Partial<Options>) => void) =>
  (changes: Storage.StorageChange, areaName: string) => {
    if (areaName === AREA_NAME) {
      callback(newValuesFromChanges(changes));
    }
  };

export const initOptions = async () => {
  const options: Partial<Options> = await getOptions();

  const lacking = Object.fromEntries(
    Object.entries(DEFAULT_OPTIONS).filter(([key]) => !(key in options)),
  );

  return setOptions(lacking as any);
};
