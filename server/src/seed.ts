import MongoDB from './services/mongo';
import User from './models/user';

async function seed () {
  await MongoDB.init();

  // first delete all collections
  await User.deleteMany();

  // create admin, super_admin, user
  await User.create({
    name: 'superAdmin',
    email: 'superAdmin@mind.com',
    password: 'superAdminPassword',
    role: 'super_admin'
  });

  await User.create({
    name: 'admin',
    email: 'admin@mind.com',
    password: 'adminPassword',
    role: 'admin'
  });

  await User.create({
    name: 'user',
    email: 'user@mind.com',
    password: 'userPassword',
    role: 'user'
  });
}

seed().then(() => {
  console.info('Seed Finished !!!');
  process.exit(0);
}).catch(console.error);