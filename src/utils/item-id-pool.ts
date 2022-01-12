export abstract class IdPool {
  static avaliableIds: number[] = [];

  static initializeIdsPool(numberOfElements: number) {
    for (let i = 1; i <= numberOfElements; i++) {
      IdPool.avaliableIds[i] = i;
    }
  }

  static getAnId() {
    const id = this.avaliableIds.pop();
    if (!id) {
      alert("Maxiumum number of items!");
      return;
    }
    return id;
  }

  static addId(id: number) {
    this.avaliableIds.push(id);
  }
}
