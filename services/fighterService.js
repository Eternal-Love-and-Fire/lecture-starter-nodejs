import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  index() {
    return fighterRepository.getAll();
  }

  show(id) {
    return fighterRepository.getOne({ id });
  }

  store(fighter) {
    const { name } = fighter;
    if (this.search({ name })) {
      throw new Error("Fighter already exist with this name");
    }
    return fighterRepository.create(fighter);
  }

  update(id, updatedFighter) {
    return fighterRepository.update(id, updatedFighter);
  }

  destroy(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
