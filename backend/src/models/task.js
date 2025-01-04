import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (data) => {
  try {
    const newTask = await prisma.task.create({ data });
    return newTask;
  } catch (error) {
    console.error('Помилка при створенні завдання:', error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (error) {
    console.error('Помилка при отриманні завдань:', error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new Error(`Завдання з ID ${id} не знайдено`);
    }
    return task;
  } catch (error) {
    console.error('Помилка при отриманні завдання:', error);
    throw error;
  }
};

export const updateTask = async (id, data) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });
    return updatedTask;
  } catch (error) {
    console.error('Помилка при оновленні завдання:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await prisma.task.delete({
      where: { id },
    });
    return { message: `Завдання з ID ${id} видалено` };
  } catch (error) {
    console.error('Помилка при видаленні завдання:', error);
    throw error;
  }
};
