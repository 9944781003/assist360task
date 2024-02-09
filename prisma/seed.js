// // This is your Prisma schema file,
// // learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//     provider = "prisma-client-js"
//   }

//   datasource db {
//     provider = "sqlite"
//     url      = env("DATABASE_URL")
//   }
//   model Role {
//     id   String @id @default(uuid())
//     name String
//     users User[]
//   }
//   model Department {
//     id   String @id @default(uuid())
//     name String @unique
//     users User[]
//   }

//   model User {
//     id       String   @id @default(uuid())
//     email    String   @unique
//     name     String?
//     password String
//     role     Role     @relation(fields: [roleId], references: [id])
//     roleId   String
//     department Department @relation(fields: [departmentId], references: [id])
//     departmentId String
//     status   Boolean  @default(true)
//     teams    Team[]
//     joinedAt DateTime @default(now())
//     invitedBy User? @relation("InvitedBy", fields: [invitedById], references: [id])
//     invitedById String?
//     invitedUsers User[] @relation("InvitedBy")

//   }
//   model Team {
//     id   String @id @default(uuid())
//     name String @unique
//     users User[]
//   }

//   model Product {
//     id          String   @id @default(uuid())
//     name        String   @unique
//     description String?
//     price       Float
//     status      Boolean  @default(true)
//     createdAt   DateTime @default(now())
//     updatedAt   DateTime @updatedAt
//   }
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function seed() {
  // Seed your data here
  await prisma.$transaction(async (tx) => {
    const roles = ["Super Admin", "Admin", "User", "Manager"].map((role) => {
      return tx.role.create({
        data: {
          name: role,
        },
      });
    });
    const created_roles = await Promise.all(roles);
    console.log(
      created_roles.map((role) => role.name).join(","),
      "roles created"
    );

    const departments = [
      "Human Resources",
      "IT",
      "Finance",
      "Sales",
      "IT Support",
      "Software Development",
      "Quality Assurance",
      "Network Administration",
      "Cybersecurity",
      "Data Analysis",
      "Project Management",
      "Research and Development",
    ].map((department) => {
      return tx.department.create({
        data: {
          name: department,
        },
      });
    });

    const created_departments = await Promise.all(departments);
    console.log(
      created_departments.map((department) => department.name).join(","),
      "departments created"
    );

    // create a Super Admin User
   const salt= bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("Master@2024", salt);

    const super_admin = await tx.user.create({
      data: {
        email: "mailtoarull@gmail.com",
        name: "Arull",
        password: hashedPassword,
        roleId: created_roles.find((role) => role.name === "Super Admin").id,
        departmentId: created_departments.find(
          (department) => department.name === "IT"
        ).id,
        phone:"+919944891003"
        
      },
    });

    console.log(super_admin.email, "Super Admin created");

    const users = Array.from({ length: 10 }).map(() => {
     const salt= bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync("India@2024", salt);
      return tx.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.name.firstName() + " " + faker.name.lastName(),
          password: hashedPassword,
          roleId:created_roles.filter((role) => role.name !== "Super Admin")[getRandomInt(0,created_roles.length-2)].id,
          departmentId: created_departments[getRandomInt(0,created_departments.length-2)].id,
          phone:faker.phone.number()
        },
      });
    });

    const created_users = await Promise.all(users);
    console.log(created_users.map(u=>u.name).join(','), "users created");

  });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seed;
