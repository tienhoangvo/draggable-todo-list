export const swap = <Type> (arr: Type[], index1: number, index2: number) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
  return arr
}