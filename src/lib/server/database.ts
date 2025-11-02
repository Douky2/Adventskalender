import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Holt den Inhalt für einen bestimmten Tag aus der Datenbank
 */
export async function getDayContent(dayNumber: number) {
  return await prisma.day.findUnique({
    where: { dayNumber }
  });
}

/**
 * Holt alle Tage für die Übersicht
 */
export async function getAllDays() {
  return await prisma.day.findMany({
    orderBy: { dayNumber: 'asc' }
  });
}

/**
 * Fügt eine Nachricht von Person B hinzu
 */
export async function addPersonBContent(dayNumber: number, contentType: string, content: string, author?: string) {
  return await prisma.day.update({
    where: { dayNumber },
    data: {
      contentTypeB: contentType,
      contentB: content,
      authorB: author
    }
  });
}

/**
 * Holt alle Nachrichten für einen Tag
 */
export async function getMessages(dayNumber: number) {
  return await prisma.message.findMany({
    where: { dayNumber },
    orderBy: { timestamp: 'asc' }
  });
}

/**
 * Fügt eine neue Nachricht hinzu
 */
export async function addMessage(dayNumber: number, author: string, message: string) {
  return await prisma.message.create({
    data: {
      dayNumber,
      author,
      message
    }
  });
}

/**
 * Löscht die Antwort von Person B für einen bestimmten Tag
 */
export async function resetPersonBResponse(dayNumber: number) {
  return await prisma.day.update({
    where: { dayNumber },
    data: {
      contentTypeB: null,
      contentB: null,
      authorB: null
    }
  });
}

/**
 * Aktualisiert das gemeinsame Ergebnis
 */
export async function updateCombinedResult(dayNumber: number, result: string) {
  return await prisma.day.update({
    where: { dayNumber },
    data: {
      combinedResult: result,
      resultGenerated: true
    }
  });
}

/**
 * Holt alle Türchen einer Story-Chain
 */
export async function getStoryChain(storyChainId: string) {
  return await prisma.day.findMany({
    where: { storyChainId },
    orderBy: { dayNumber: 'asc' }
  });
}
