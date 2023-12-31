import { Component, createResource, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { browser } from "wxt/browser";

import type { Options } from "~/lib/options";
import { getOptions, setOption as setOptionStorage } from "~/lib/options";

import styles from "./OptionsForm.module.css";

const LABEL_MAP: [keyof Options, string][] = [
  ["views", "optionViews"],
  ["subs", "optionSubscribers"],
  ["video-likes", "optionVideoLikes"],
  ["comment-likes", "optionCommentLikes"],
];

const Inner: Component<{ initialValues: Options }> = (props) => {
  const [options, setStoreOptions] = createStore(props.initialValues);

  const setOption = <K extends keyof Options>(key: K, value: Options[K]) => {
    setStoreOptions(key, value);
    setOptionStorage(key, value).catch((reason) =>
      // eslint-disable-next-line no-console
      console.error(
        `[hide-youtube-numbers]: Failed to set option ${key}`,
        reason,
      ),
    );
  };

  return (
    <fieldset class={styles.form}>
      <legend>{browser.i18n.getMessage("optionHide")}</legend>

      <For each={LABEL_MAP}>
        {([optionKey, messageName]) => (
          <div>
            <label>
              <input
                type="checkbox"
                id={optionKey}
                name="hide"
                value={optionKey}
                checked={options[optionKey]}
                onInput={(e) =>
                  setOption(optionKey as keyof Options, e.target.checked)
                }
              />

              <span class={styles.label}>
                {browser.i18n.getMessage(messageName)}
              </span>
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
