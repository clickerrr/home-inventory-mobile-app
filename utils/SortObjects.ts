export const sortObjectsById = (objectsToSort) => {
    return objectsToSort.sort((a, b) => a.id - b.id);
};
