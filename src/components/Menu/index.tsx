import { Show, For, createSignal, createMemo } from "solid-js"
import { ListFile } from "𝄞/types"

const getFileName = (path: string) => path.match(/\/(.*?).abc$/)?.at(-1)
const [getCurrentName, setCurrentName] = createSignal<string>(
  import.meta.env.VITE_INDEX_ABC_NAME
)

const CustomMenu = (props: {
  files: ListFile[]
  onclick: (item: ListFile) => void
}) => {
  return (
    <Show when={props.files.length > 0}>
      <ul class="na-menu">
        <For each={props.files}>
          {item => {
            const name = getFileName(item.path)
            const getIsCurrent = createMemo(() => name === getCurrentName())
            return (
              <li
                classList={{
                  "na-menu-item": true,
                  truncate: true,
                  "cursor-pointer": !getIsCurrent(),
                }}
                style={{
                  order: name === import.meta.env.VITE_INDEX_ABC_NAME ? -1 : 1,
                }}
                {...(getIsCurrent()
                  ? {
                      "data-selected": "",
                    }
                  : {})}
                onClick={() => {
                  setCurrentName(name)
                  props.onclick(item)
                }}
              >
                {name}
              </li>
            )
          }}
        </For>
      </ul>
    </Show>
  )
}

export default CustomMenu
