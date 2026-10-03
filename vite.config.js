import { defineConfig } from 'vite'
import { content } from './src/content.js'

// Bakes both languages into the HTML so the essential content
// is in the first response, whatever the visitor's language.
function bilingual() {
  return {
    name: 'bilingual-html',
    transformIndexHtml(html) {
      return html.replace(/\{\{([\w.]+)\}\}/g, (_, key) => {
        const v = content[key]
        if (!v) throw new Error(`Missing copy key: ${key}`)
        return `<span class="l-fr" lang="fr">${v.fr}</span><span class="l-en" lang="en">${v.en}</span>`
      })
    },
  }
}

export default defineConfig({
  plugins: [bilingual()],
  build: { target: 'es2020', modulePreload: { polyfill: false } },
  // the preview tooling hands out a free port through PORT when 5173 is taken
  server: { port: Number(process.env.PORT) || 5173 },
})
