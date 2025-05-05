import type { AST } from '@codemod-utils/ast-template';

type Modifier = ReturnType<typeof AST.builders.elementModifier>;

function getName(node: Modifier): string {
  if (node.path.type !== 'PathExpression') {
    return '';
  }

  return node.path.original;
}

export function sortModifiers(a: Modifier, b: Modifier): number {
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
