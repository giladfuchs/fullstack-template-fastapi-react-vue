// eslint-disable-next-line import/prefer-default-export
export const array_obj_to_obj_with_key = (iterable: any[], value: any, key: string) =>
    iterable.find((o: any) => o[key]?.toString() === value.toString());
