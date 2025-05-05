import type { AST } from '@codemod-utils/ast-template';

type Hash = ReturnType<typeof AST.builders.hash>;
type HashPair = Hash['pairs'][0];

function getName(node: HashPair): string {
  return node.key;
}

export function sortHashPairs(a: HashPair, b: HashPair): number {
  const nameA = getName(a);
  const nameB = getName(b);

  if (nameA > nameB) {
    return 1;
  }

  if (nameB > nameA) {
    return -1;
  }

  return 0;
}
