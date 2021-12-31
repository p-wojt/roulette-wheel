export const avaliableIds: number[] = [];

export function initializeIdsPool(numberOfElements: number){
    for(let i = 1; i <= numberOfElements; i++){
        avaliableIds[i] = i;
    }
}