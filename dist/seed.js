"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("./services/mongo"));
const user_1 = __importDefault(require("./models/user"));
const account_1 = __importDefault(require("./models/account"));
const transfer_1 = __importDefault(require("./models/transfer"));
const faker_1 = require("@faker-js/faker");
const schemas_1 = require("./utils/schemas");
const password = 'p@ssword123';
const totalUsers = 10;
const totalAdmins = 10;
const users = [];
async function seed() {
    await mongo_1.default.init();
    // first delete all collections
    await user_1.default.deleteMany();
    await account_1.default.deleteMany();
    await transfer_1.default.deleteMany();
    // create super_admin
    let superAdmin = await user_1.default.create({
        name: 'superAdmin',
        email: 'superAdmin@mind.com',
        password,
        englishLevel: 'C2',
        resumeLink: faker_1.faker.internet.url(),
        role: schemas_1.Roles.super_admin
    });
    await user_1.default.create({
        name: 'user',
        email: 'user@mind.com',
        password,
        englishLevel: 'C1',
        role: schemas_1.Roles.user
    });
    // create admins
    for (let x = 0; x < totalAdmins; x++) {
        await user_1.default.create({
            name: faker_1.faker.name.firstName(),
            email: faker_1.faker.internet.email(),
            password,
            resumeLink: faker_1.faker.internet.url(),
            englishLevel: 'B2',
            role: schemas_1.Roles.admin
        });
    }
    // create users
    for (let x = 0; x < totalUsers; x++) {
        let user = await user_1.default.create({
            name: faker_1.faker.name.firstName(),
            email: faker_1.faker.internet.email(),
            password,
            resumeLink: faker_1.faker.internet.url(),
            englishLevel: 'A2',
            role: schemas_1.Roles.user
        });
        users.push(user);
    }
    let account = await account_1.default.create({
        name: 'developers',
        client: 'MIND',
        responsible: superAdmin._id,
        team: [superAdmin._id, users[0]._id, users[1]._id, users[2]._id, users[3]._id, users[4]._id]
    });
    await account_1.default.create({
        name: 'Q.A.',
        client: 'Google',
        responsible: users[0]._id,
        team: [users[2]._id, users[3]._id, users[4]._id]
    });
    await account_1.default.create({
        name: 'Backends',
        client: 'Google',
        responsible: users[6]._id,
        team: [users[2]._id, users[3]._id, users[4]._id]
    });
    await account_1.default.create({
        name: 'DevOps',
        client: 'Facebook',
        responsible: users[5]._id,
        team: [users[2]._id]
    });
}
seed().then(() => {
    console.info('Seed Finished !!!');
    process.exit(0);
}).catch(console.error);
//# sourceMappingURL=seed.js.map