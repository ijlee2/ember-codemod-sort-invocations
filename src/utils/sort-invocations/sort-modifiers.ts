import { AST } from '@codemod-utils/ast-template';

type Modifier = ReturnType<typeof AST.builders.elementModifier>;

function getName(node: Modifier): string {
  if (node.path.type !== 'PathExpression') {
    return '';
  }

  return node.path.original;
}

function compareModifiers(a: Modifier, b: Modifier): number {
  const nameA = getName(a);
  const nameB = getName(b);

  if (nameA > nameB) {
    return 1;
  }

  if (nameB > nameA) {
    return -1;
  }

  if (nameA !== 'on') {
    return 0;
  }

  // Sort {{on}} modifiers
  const eventA = a.params[0]!;
  const eventB = b.params[0]!;

  if (eventA.type === 'StringLiteral' && eventB.type === 'StringLiteral') {
    const eventNameA = eventA.original;
    const eventNameB = eventB.original;

    if (eventNameA > eventNameB) {
      return 1;
    }

    if (eventNameB > eventNameA) {
      return -1;
    }
  }

  return 0;
}

export function canSkipSortModifiers(modifiers: Modifier[]): boolean {
  let canSkip = true;

  for (let i = 0; i < modifiers.length - 1; i++) {
    if (compareModifiers(modifiers[i]!, modifiers[i + 1]!) === 1) {
      canSkip = false;

      break;
    }
  }

  return canSkip;
}

export function sortModifiers(modifiers: Modifier[]): Modifier[] {
  return modifiers.sort(compareModifiers).map((modifier) => {
    const { hash, params, path } = modifier;

    return AST.builders.elementModifier(path, params, hash);
  });
}
