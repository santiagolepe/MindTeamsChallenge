import MongoDB from './services/mongo';
import User from './models/user';
import Accounts from './models/account';
import Transfers from './models/transfer';
import { faker } from '@faker-js/faker';
import { Roles } from './utils/schemas';

const password: string = 'p@ssword123';
const totalUsers: number = 10;
const totalAdmins: number = 10;
const users: any  = [];

async function seed () {
  await MongoDB.init();

  // first delete all collections
  await User.deleteMany();
  await Accounts.deleteMany();
  await Transfers.deleteMany();

  // create super_admin
  let superAdmin = await User.create({
    name: 'superAdmin',
    email: 'superAdmin@mind.com',
    password,
    englishLevel: 'C2',
    resumeLink: faker.internet.url(),
    role: Roles.super_admin
  });

  await User.create({
    name: 'user',
    email: 'user@mind.com',
    password,
    englishLevel: 'C1',
    role: Roles.user
  });

  // create admins
  for (let x = 0; x < totalAdmins; x++) {
    await User.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      resumeLink: faker.internet.url(),
      englishLevel: 'B2',
      role: Roles.admin
    });
  }

   // create users
   for (let x = 0; x < totalUsers; x++) {
    let user = await User.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      resumeLink: faker.internet.url(),
      englishLevel: 'A2',
      role: Roles.user
    });

    users.push(user);
  }

  let account = await Accounts.create({
    name: 'developers',
    client: 'MIND',
    responsible: superAdmin._id,
    team: [superAdmin._id, users[0]._id, users[1]._id, users[2]._id, users[3]._id, users[4]._id]
  });

  await Accounts.create({
    name: 'Q.A.',
    client: 'Google',
    responsible: users[0]._id,
    team: [users[2]._id, users[3]._id, users[4]._id]
  });

  await Accounts.create({
    name: 'Backends',
    client: 'Google',
    responsible: users[6]._id,
    team: [users[2]._id, users[3]._id, users[4]._id]
  });

  await Accounts.create({
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