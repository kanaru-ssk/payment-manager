import { useEffect, useState } from "react";

/**
 * Hydration エラーを防ぐためにクライアントサイドで関数を実行し、その結果を保持するフック
 *
 * @param fn クライアントサイドで実行したい関数
 * @param args `fn`に渡す引数
 * @returns クライアントサイドで実行された`fn`の結果
 */
export function useHydratedValue<T, Args extends any[]>(
  fn: (...args: Args) => T,
  ...args: Args
) {
  const [state, setState] = useState<T | null>(null);
  useEffect(() => setState(fn(...args)), []);
  return state;
}
