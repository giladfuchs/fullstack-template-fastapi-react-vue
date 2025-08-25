export const array_obj_to_obj_with_key = <T extends Record<string, unknown>>(
    iterable: T[],
    value: unknown,
    key: keyof T
): T | undefined => {
    return iterable.find((o) => o[key]?.toString() === value?.toString());
};
