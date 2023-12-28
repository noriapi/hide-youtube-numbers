import { Entries } from "@solid-primitives/keyed";
import { Component, createResource, Show } from "solid-js";
import { createStore } from "solid-js/store";

import type { Options } from "~/lib/options";
import { getOptions, setOption as setOptionStorage } from "~/lib/options";

import styles from "./OptionsForm.module.css";

const LABEL_MAP = {
  "video-likes": "Video likes",
  "comment-likes": "Comment likes",
  views: "Views",
  subs: "Subscribers",
};

const Inner: Component<{ initialValues: Options }> = (props) => {
  const [options, setStoreOptions] = createStore(props.initialValues);

  const setOption = <K extends keyof Options>(key: K, value: Options[K]) => {
    setStoreOptions(key, value);
    setOptionStorage(key, value);
  };

  return (
    <fieldset class={styles.form}>
      <legend>Hide</legend>

      <Entries of={options}>
        {(key, value) => (
          <div>
            <label>
              <input
                type="checkbox"
                id={key}
                name="hide"
                value={key}
                checked={value()}
                onInput={(e) =>
                  setOption(key as keyof Options, e.target.checked)
                }
              />

              <span class={styles.label}>
                {LABEL_MAP[key as keyof Options]}
              </span>
            </label>
          </div>
        )}
      </Entries>
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
