import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data')
let queue = Promise.resolve()

async function readList(file) {
  try {
    return JSON.parse(await readFile(path.join(dir, file), 'utf8'))
  } catch (err) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

export function appendRecord(file, record) {
  const run = queue.then(async () => {
    await mkdir(dir, { recursive: true })
    const list = await readList(file)
    list.push(record)
    await writeFile(path.join(dir, file), JSON.stringify(list, null, 2))
  })
  queue = run.catch(() => {})
  return run
}

export async function hasEmail(file, email) {
  return (await readList(file)).some((r) => r.email === email)
}
