import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userExist = await prisma.user.findFirst();
  if (userExist) {
    await prisma.user.deleteMany({});
  }

  const user1 = await prisma.user.create({
    data: {
      name: "João Silva",
      email: "joao.silva@example.com",
      password: "senha123",
      imgUrl: "https://i.imgur.com/7PviUq4.jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Maria Santos",
      email: "maria.santos@example.com",
      password: "senha456",
      imgUrl: "https://i.imgur.com/OGCtEJP.jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Carlos Ferreira",
      email: "carlos.ferreira@example.com",
      password: "senha789",
      imgUrl: "https://i.imgur.com/jDimNTZ.jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const theme1 = await prisma.theme.create({
    data: {
      title: "A importância da educação na sociedade",
      user_id: user1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const song1 = await prisma.song.create({
    data: {
      title: "Another Brick in The Wall",
      performer: "Pink Floyd",
      theme_id: theme1.id,
      user_id: theme1.user_id,
    },
  });

  const serie1 = await prisma.serie.create({
    data: {
      title: "Merlí",
      streaming: "Netflix",
      theme_id: theme1.id,
      user_id: theme1.user_id,
    },
  });

  const movie1 = await prisma.movie.create({
    data: {
      title: "Capitão Fantástico",
      streaming: "Star+",
      theme_id: theme1.id,
      user_id: theme1.user_id,
    },
  });

  const book1 = await prisma.book.create({
    data: {
      title: "Pedagogia do Oprimido",
      author: "Paulo Freire",
      theme_id: theme1.id,
      user_id: theme1.user_id,
    },
  });

  const theme2 = await prisma.theme.create({
    data: {
      title: "Os desafios da preservação do meio ambiente",
      user_id: user2.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const song2 = await prisma.song.create({
    data: {
      title: "Terra",
      performer: "Caetano Veloso",
      theme_id: theme2.id,
      user_id: theme2.user_id,
    },
  });

  const serie2 = await prisma.serie.create({
    data: {
      title: "Aruanas",
      streaming: "GloboPlay",
      theme_id: theme2.id,
      user_id: theme2.user_id,
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: "Wall-E",
      streaming: "Disney+",
      theme_id: theme2.id,
      user_id: theme2.user_id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "A Terra Inabitável",
      author: "David Wallace-Wells",
      theme_id: theme2.id,
      user_id: theme2.user_id,
    },
  });

  const theme3 = await prisma.theme.create({
    data: {
      title: "A influência da tecnologia na vida moderna",
      user_id: user3.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const song3 = await prisma.song.create({
    data: {
      title: "Admirável Chip Novo",
      performer: "Pitty",
      theme_id: theme3.id,
      user_id: theme3.user_id,
    },
  });

  const serie3 = await prisma.serie.create({
    data: {
      title: "Black Mirror",
      streaming: "Netflix",
      theme_id: theme3.id,
      user_id: theme3.user_id,
    },
  });

  const movie3 = await prisma.movie.create({
    data: {
      title: "Eu, Robô",
      streaming: "Star+",
      theme_id: theme3.id,
      user_id: theme3.user_id,
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: "21 lições para o século XXI",
      author: "Yuval Harari",
      theme_id: theme3.id,
      user_id: theme3.user_id,
    },
  });

  console.log("Comando seed executado! :)");

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
