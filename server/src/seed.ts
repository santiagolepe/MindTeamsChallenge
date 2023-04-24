import MongoDB from './services/mongo';
import User from './models/user';
import { faker } from '@faker-js/faker';
import { Roles } from './utils/schemas';

const password: string = 'p@ssword123';
const totalUsers: number = 100;
const totalAdmins: number = 100;

async function seed () {
  await MongoDB.init();

  // first delete all collections
  await User.deleteMany();

  // create super_admin
  await User.create({
    name: 'superAdmin',
    email: 'superAdmin@mind.com',
    password,
    role: Roles.super_admin
  });

  // create admins
  for (let x = 0; x < totalAdmins; x++) {
    await User.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      role: Roles.admin
    });
  }

   // create users
   for (let x = 0; x < totalUsers; x++) {
    await User.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      role: Roles.user
    });
  }


}

seed().then(() => {
  console.info('Seed Finished !!!');
  process.exit(0);
}).catch(console.error);