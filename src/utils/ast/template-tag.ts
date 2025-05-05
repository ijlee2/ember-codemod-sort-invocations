import { Preprocessor } from 'content-tag';

type Range = {
  end: number;
  start: number;
};

type ContentTag = {
  contentRange: Range;
  contents: string;
  endRange: Range;
  range: Range; // range = startRange + contentRange + endRange
  startRange: Range;
  tagName: string;
  type: string;
};

export function parse(file: string) {
  const preprocessor = new Preprocessor();

  return preprocessor.parse(file) as unknown as ContentTag[];
}

export function replaceTemplate(
  file: string,
  options: {
    contents: string;
    range: Range;
  },
): string {
  const { contents, range } = options;

  return [
    file.substring(0, range.start),
    '<template>',
    contents,
    '</template>',
    file.substring(range.end),
  ].join('');
}
