import { Component, createResource, For, Show } from "solid-js";
import { createStore } from "solid-js/store";

import type { Options } from "~/lib/options";
import { getOptions, setOption as setOptionStorage } from "~/lib/options";

import styles from "./OptionsForm.module.css";

const LABEL_MAP: [keyof Options, string][] = [
  ["views", "Views"],
  ["subs", "Subscribers"],
  ["video-likes", "Video likes"],
  ["comment-likes", "Comment likes"],
];

const Inner: Component<{ initialValues: Options }> = (props) => {
  const [options, setStoreOptions] = createStore(props.initialValues);

  const setOption = <K extends keyof Options>(key: K, value: Options[K]) => {
    setStoreOptions(key, value);
    setOptionStorage(key, value);
  };

  return (
    <fieldset class={styles.form}>
      <legend>Hide</legend>

      <For each={LABEL_MAP}>
        {([key, label]) => (
          <div>
            <label>
              <input
                type="checkbox"
                id={key}
                name="hide"
                value={key}
                checked={options[key]}
                onInput={(e) =>
                  setOption(key as keyof Options, e.target.checked)
                }
              />

              <span class={styles.label}>{label}</span>
            </label>
          </div>
        )}
      </For>
    </fieldset>
  );
};

const OptionsForm: Component = () => {
  const [options] = createResource(getOptions);

  return (
    <Show when={options()} keyed fallback={<p>Loading...</p>}>
      {(o) => <Inner initialValues={o} />}
    </Show>
  );
};

export default OptionsForm;
