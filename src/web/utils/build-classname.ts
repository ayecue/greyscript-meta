export type ClassNameSegment =
  | string
  | {
      shouldAdd: boolean;
      className: string;
    };

export function buildClassName(
  ...classNameSegments: ClassNameSegment[]
): string {
  const newClassName: string[] = [];

  for (const classNameSegment of classNameSegments) {
    if (classNameSegment === undefined) continue;

    if (typeof classNameSegment === 'string') {
      newClassName.push(classNameSegment);
    } else if (classNameSegment instanceof Object) {
      if (classNameSegment.shouldAdd)
        newClassName.push(classNameSegment.className);
    } else {
      throw new Error('Unknown class name segment.');
    }
  }

  return newClassName.join(' ');
}
