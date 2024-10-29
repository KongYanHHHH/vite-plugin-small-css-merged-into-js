import { mount } from 'svelte'
import App from '../src/lib/Page1.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
