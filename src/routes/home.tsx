import { A, useNavigate } from '@solidjs/router'
import { Dot, GitCommitHorizontal, Search } from 'lucide-solid'
import { createSignal } from 'solid-js'

export default function Home() {
  const [query, setQuery] = createSignal('')
  const navigate = useNavigate()
  function processInput() {
    if (!query()) return
    navigate(`/route/${btoa(query())}`)
  }
  return (
    <div>
      <div class="absolute left-1/2 top-1/2 flex w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-12 w-12">
            <title>SMS Unblocker Logo</title>
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95.49-7.55-2.04-8.04-5.99-.49-3.95 2.04-7.55 5.99-8.04V8.5c-1.99.47-3.5 2.24-3.5 4.25 0 2.48 2.02 4.5 4.5 4.5 2.01 0 3.78-1.32 4.25-3.25h2.59c-.49 3.95-4.04 7.01-8.04 7.01z"
            />
          </svg>
          <h1 class="text-5xl font-semibold">SMS Unblocker</h1>
        </div>
        <div class="join w-1/3">
          <input
            onKeyPress={(e) => {
              if (e.key !== 'Enter') return
              processInput()
            }}
            value={query()}
            onInput={(e) => setQuery(e.target.value)}
            placeholder="Enter a search query or URL"
            type="text"
            class="input join-item w-full bg-base-300"
          />
          <button class="btn btn-square join-item bg-base-300 border-none" type="button" onClick={processInput}>
            <Search class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="absolute bottom-0 flex w-screen items-center justify-between p-4 px-6 text-sm">
        &copy; 2025 seantrg
        <div class="flex gap-4">
          <div class="flex items-center gap-2">
            <GitCommitHorizontal />
            <A class="link-hover link" target="_blank" href={`https://github.com/cafe-labs/mocha/commit/${__GIT_COMMIT__}/`}>
              {__GIT_COMMIT__.slice(0, 7)}
            </A>
          </div>
          <Dot class="-mx-3" />
          <A href="/faq" class="link-hover link">
            FAQ
          </A>
        </div>
      </div>

      <dialog id="discordmodal" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Opening a link</h3>
          <p class="py-4">Would you like to open our Discord server in a normal tab, or inside the proxy?</p>
          <div class="modal-action">
            <a
              class="btn btn-primary"
              href="https://discord.gg/yWKdcvcEmE"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                const modal = document.querySelector('#discordmodal') as HTMLDialogElement
                modal.close()
              }}
            >
              Normal Window
            </a>
            <button
              class="btn btn-primary"
              type="button"
              onClick={() => {
                navigate(`/route/${btoa('https://discord.gg/yWKdcvcEmE')}`)
              }}
            >
              Inside Proxy
            </button>
          </div>
        </div>

        <form method="dialog" class="modal-backdrop">
          <button class="cursor-default" type="button" />
        </form>
      </dialog>
    </div>
  )
}
