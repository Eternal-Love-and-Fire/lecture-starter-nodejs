import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    return item || null;
  }

  index() {
    return userRepository.getAll();
  }

  show(id) {
    return userRepository.getOne({ id });
  }

  store(user) {
    const { email, phoneNumber } = user;
    if (this.search({ email }) || this.search({ phoneNumber })) {
      throw new Error("User already exist with same number or phone");
    }
    return userRepository.create(user);
  }

  update(id, updatedUser) {
    const user = this.show(id);
    if (!user) {
      throw new Error("User not found");
    }

    return userRepository.update(id, updatedUser);
  }

  destroy(id) {
    const user = this.show(id);
    if (!user) {
      throw new Error("user not found");
    }
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
