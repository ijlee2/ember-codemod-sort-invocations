import { Preprocessor } from 'content-tag';

const BufferMap = new Map<string, ArrayBuffer>();

function getBuffer(str: string): ArrayBuffer {
  let buffer = BufferMap.get(str);

  if (!buffer) {
    buffer = Buffer.from(str);
    BufferMap.set(str, buffer);
  }

  return buffer;
}

function sliceByteRange(
  str: string,
  indexStart: number,
  indexEnd?: number,
): string {
  const buffer = getBuffer(str);

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return buffer.slice(indexStart, indexEnd).toString();
}

type Range = {
  endByte: number;
  endChar: number;
  startByte: number;
  startChar: number;
};

type ContentTag = {
  contentRange: Range;
  contents: string;
  endRange: Range;
  range: Range;
  startRange: Range;
  tagName: string;
  type: 'class-member' | 'expression';
};

export function parse(file: string): ContentTag[] {
  const preprocessor = new Preprocessor();

  return preprocessor.parse(file);
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
    sliceByteRange(file, 0, range.startByte),
    '<template>',
    contents,
    '</template>',
    sliceByteRange(file, range.endByte, undefined),
  ].join('');
}
