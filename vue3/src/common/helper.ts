export const array_obj_to_obj_with_key = (iterable: any[], value: any, key: string): any => iterable.find((o: any) => o[key] === value);

export const array_to_dict = (iterable: any, key: string = 'id'): any =>
  Array.isArray(iterable)
    ? // iterable.reduce((obj_ans: any, iter: any) =>  {return{ ...obj_ans,[iter[key]]:iter}}, {})
      Object.assign(
        {},
        ...iterable.map((o: any) => {
          return { ...{}, [o[key]]: o };
        })
      )
    : iterable;

export const deep_copy_stringify = (obj: any): any => {
  const ans: object = JSON.parse(JSON.stringify(obj));
  return ans;
};
