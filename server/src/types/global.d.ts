import type { PrismaClient } from '../../generated/prisma';

declare global {
  var prisma: PrismaClient | undefined;
}

export {};

// * Tells TypeScript about globals that exist at runtime but TS doesn’t know about by default.
// * It contains types only — no JavaScript is generated from it.
// * declare global → extends the global namespace
// * var prisma → matches globalThis.prisma
// * export {} → forces module scope (prevents collisions)