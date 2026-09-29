import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

const projectRoot = resolve(import.meta.dirname, '..')
const scannedRoots = ['src', 'content', 'first-edition', 'get', 'journal', 'privacy', 'roadmap', 'support']
const scannedFiles = ['index.html', 'README.md']
const forbidden = /android|google play|play store|google group|testflight|test flight/i
const textExtensions = /\.(?:css|html|json|md|mjs|ts|tsx)$/

test('the public site describes one platform and one store', async () => {
  const files = [
    ...scannedFiles.map((file) => resolve(projectRoot, file)),
    ...(await Promise.all(scannedRoots.map((root) => listFiles(resolve(projectRoot, root))))).flat(),
  ]
  const offenders = []

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    source.split('\n').forEach((line, index) => {
      if (forbidden.test(line)) offenders.push(`${file.slice(projectRoot.length + 1)}:${index + 1}: ${line.trim()}`)
    })
  }

  assert.deepEqual(offenders, [], 'platform-specific references must not return to public copy or code')
})

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) return listFiles(path)
    return textExtensions.test(entry.name) ? [path] : []
  }))
  return nested.flat()
}
