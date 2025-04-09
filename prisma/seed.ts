import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    await prisma.article.deleteMany();
    await prisma.article.createMany({
      data: [
        {
          title: "Le Panda Géant",
          description: "Un aperçu de cet adorable mammifère en voie de disparition",
          image: "https://tse2.mm.bing.net/th?id=OIP.F5E8Za6eMVC73i21H_Q0HAHaE8&pid=Api", // Panda
          content: "Le panda géant, originaire de Chine, est connu pour son amour du bambou et son pelage noir et blanc distinctif...",
          createdAt: new Date(),
        },
        {
          title: "L'Aigle Royal",
          description: "Découvrez ce majestueux oiseau de proie",
          image: "https://tse4.mm.bing.net/th?id=OIP.GcxEipIdkEt7YfQMRCDFwwHaEK&pid=Api", // Aigle
          content: "L’aigle royal est un prédateur impressionnant, capable de planer à des altitudes élevées pour chasser...",
          createdAt: new Date(),
        },
        {
          title: "La Tortue de Mer",
          description: "Une exploration de cette créature marine fascinante",
          image: "https://tse1.mm.bing.net/th?id=OIP.rUHGoEN_2eghT5CMpRvlPgHaFj&pid=Api", // Tortue
          content: "Les tortues de mer parcourent des milliers de kilomètres pour pondre leurs œufs sur les plages où elles sont nées...",
          createdAt: new Date(),
        },
      ],
    });
    console.log("Données sur les animaux insérées avec succès !");
  }
  

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());