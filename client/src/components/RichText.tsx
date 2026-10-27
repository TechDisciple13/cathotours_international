import type { ReactNode } from 'react'
import { highlight } from '../utils/highlight'

// Une ligne = un paragraphe ; "## Titre" = intertitre ; "- texte" = puce.
export default function RichText({ text }: { text: string }) {
  const out: ReactNode[] = []
  let items: string[] = []
  const flush = () => {
    if (!items.length) return
    out.push(<ul key={`u${out.length}`} className="mt-2 list-disc space-y-1 pl-5">{items.map((it) => <li key={it}>{highlight(it)}</li>)}</ul>)
    items = []
  }
  for (const line of text.split('\n')) {
    if (line.startsWith('- ')) items.push(line.slice(2))
    else {
      flush()
      if (line.startsWith('## ')) out.push(<h2 key={`h${out.length}`} className="mt-8 text-lg font-semibold text-brand-green md:text-xl">{highlight(line.slice(3))}</h2>)
      else if (line.trim()) out.push(<p key={`p${out.length}`} className="mt-2">{highlight(line)}</p>)
    }
  }
  flush()
  return <>{out}</>
}
