import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, describe, test } from 'node:test';
import { promisify } from 'node:util';

const run = promisify(execFile);

const backend = join(import.meta.dirname, '../apps/backend');

const ohne = join(backend, 'node_modules/ohnejs');

describe('`apps/backend` matches what the installed `ohne init` scaffolds', () => {
  let scaffold: string;

  before(async () => {
    scaffold = await mkdtemp(join(tmpdir(), 'ohne-init-'));
    const { bin } = JSON.parse(await readFile(join(ohne, 'package.json'), 'utf8'));
    await run(process.execPath, [
      join(ohne, bin.ohne),
      'init',
      scaffold,
      '--yes',
      '--name',
      'backend',
    ]);
  });

  after(() => rm(scaffold, { recursive: true, force: true }));

  for (const file of ['tsconfig.json', '.gitignore']) {
    test(`\`${file}\` byte for byte`, async () => {
      const [ours, theirs] = await Promise.all([
        readFile(join(backend, file)),
        readFile(join(scaffold, file)),
      ]);
      assert.deepEqual(ours, theirs);
    });
  }

  test('`package.json` scripts, toolchain and dependencies', async () => {
    const [ours, theirs] = await Promise.all(
      [backend, scaffold].map(async (dir) =>
        JSON.parse(await readFile(join(dir, 'package.json'), 'utf8')),
      ),
    );
    assert.deepEqual(ours.scripts, theirs.scripts);
    assert.deepEqual(ours.devDependencies, theirs.devDependencies);
    assert.deepEqual(ours.engines, theirs.engines);
    // The starter names `ohnejs` from the catalog, so only the name must match.
    for (const name of Object.keys(theirs.dependencies)) assert.ok(name in ours.dependencies, name);
  });
});
