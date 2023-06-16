import { Roles } from "../utils/schemas";

export const users = {
  admin: {
    name: 'admin',
    email: 'admin@mind.com',
    password: 'password1@',
    role: Roles.super_admin,
    skills: 'typescript, javascript, nodeJs, ReactJs',
    englishLevel: 'B2',
    resumeLink: 'https://www.linkedin.com/in/santiagolepe/'
  },

  user: {
    name: 'user',
    email: 'user@mind.com',
    password: 'password1@',
    role: Roles.user
  }
};

export const sleep = (sec = 1) => new Promise(resolve => setTimeout(resolve, sec * 1000));
