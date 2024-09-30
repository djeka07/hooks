import { relative } from 'node:path';
import type { Options } from 'tsup';

const trackedImports = new Set<string>();

/**
 * Checks if the provided content includes any of the given client libraries or if it contains any React hooks.
 *
 * @param content - The string content to be checked for client libraries or hooks.
 * @param clientLibs - An array of client library names to check against the content.
 * @returns `true` if the content includes any of the client libraries or if it contains any hooks, otherwise `false`.
 */
function containsClientLibsOrHooks(content: string, clientLibs: string[]): boolean {
  return (
    clientLibs.some((lib) => content.includes(lib)) || /(?<!\/\/.*)(?<!\/\*.*)\buse[A-Z]\w*\s*\(.*\)/.test(content)
  );
}

/**
 * Adds a "use client" directive to the given code based on the specified client libraries.
 *
 * @param clientLibs - An array of strings representing the client libraries that should trigger the addition of "use
 *   client" directives.
 * @returns A plugin object that contains a `renderChunk` method to process and potentially modify the code chunks.
 */
export function addUseClientDirective(clientLibs: string[]): NonNullable<Options['plugins']>[number] {
  return {
    name: 'add-use-client-directive',
    renderChunk: (code, { imports, path, map }) => {
      const relativePath = relative(process.cwd(), path);

      // If the code already contains "use client", track its imports.
      if (code.startsWith('"use client"')) {
        imports?.forEach(({ path: importPath }) => trackedImports.add(importPath));

        return { code, map };
      }

      // If the current path is not tracked, return the original code.
      if (!trackedImports.has(relativePath)) {
        return { code, map };
      }

      // Remove the path after processing and check for client libraries/hooks.
      trackedImports.delete(relativePath);

      if (containsClientLibsOrHooks(code, clientLibs)) {
        return {
          code: `"use client";${code}`,
          map,
        };
      }

      return { code, map }; // Return the original code if no modifications were made.
    },
  };
}
