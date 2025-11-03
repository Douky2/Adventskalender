import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSetting(key: string): Promise<string | null> {
  const setting = await prisma.setting.findUnique({
    where: { key }
  });
  return setting?.value ?? null;
}

export async function setSetting(key: string, value: string, description?: string): Promise<void> {
  await prisma.setting.upsert({
    where: { key },
    update: { value, description },
    create: { key, value, description }
  });
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const settings = await prisma.setting.findMany();
  return Object.fromEntries(settings.map(s => [s.key, s.value]));
}
