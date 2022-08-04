import { UserModel } from '../schemas/user';

class User {
    static create({ newUser }) {
        return UserModel.create(newUser);
    }

    static findByEmail({ email }) {
        return UserModel.findOne({ email });
    }

    static findById({ user_id }) {
        return UserModel.findOne({ id: user_id });
    }

    static findAll() {
        return UserModel.find({});
    }

    static update({ user_id, changeUpdate }) {
        const filter = { id: user_id };
        const option = { returnOriginal: false };
        return UserModel.findOneAndUpdate(filter, changeUpdate, option);
    }

    static deleteUser({ id }) {
        return UserModel.findOneAndDelete({ id });
    }
}

export { User };
