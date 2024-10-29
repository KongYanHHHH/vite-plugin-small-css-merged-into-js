import { mount } from 'svelte'
import App from './lib/Page1.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
