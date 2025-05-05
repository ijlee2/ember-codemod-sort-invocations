import { AST } from '@codemod-utils/ast-template';

type Hash = ReturnType<typeof AST.builders.hash>;
type HashPair = Hash['pairs'][0];

function getName(node: HashPair): string {
  return node.key;
}

function compareHashPairs(a: HashPair, b: HashPair): number {
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

export function canSkipSortHash(hash: Hash): boolean {
  let canSkip = true;

  for (let i = 0; i < hash.pairs.length - 1; i++) {
    if (compareHashPairs(hash.pairs[i]!, hash.pairs[i + 1]!) === 1) {
      canSkip = false;

      break;
    }
  }

  return canSkip;
}

export function sortHash(hash: Hash): Hash {
  return AST.builders.hash(hash.pairs.sort(compareHashPairs));
}
