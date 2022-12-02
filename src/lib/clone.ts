function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export default clone;

// 对 T 的设置，表示传入的类型和返回的类型相同。T 可以换成任何文字。