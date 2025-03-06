import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Función principal que inicializa las categorías predefinidas en la base de datos.
 * Si la categoría ya existe, no se crea una nueva.
 */
async function main() {
  // Definición de categorías predefinidas
  const categories = [
    { name: 'Terror' },
    { name: 'Suspenso' },
    { name: 'Drama' },
    { name: 'Comedia' }
  ];

  // Inserta o actualiza las categorías en la base de datos
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name }, // Busca la categoría por nombre
      update: {}, // No realiza actualizaciones si ya existe
      create: category, // Crea la categoría si no existe
    });
  }

  console.log('Categorías creadas correctamente.');
}

// Ejecuta la función principal
main()
  .catch((e) => {
    console.error(e);
    process.exit(1); // Finaliza el proceso con un código de error en caso de fallo
  })
  .finally(async () => {
    await prisma.$disconnect(); // Desconecta Prisma de la base de datos
  });
