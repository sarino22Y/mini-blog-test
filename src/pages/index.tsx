import { PrismaClient } from '@/app/generated/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const prisma = new PrismaClient();

export type Article = {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  createdAt: Date;
};

export const getStaticProps = async () => {
  const articles = await prisma.article.findMany();
  return {
    props: { articles: JSON.parse(JSON.stringify(articles)) },
    revalidate: 60, // ISR : revalidation toutes les 60 secondes
  };
};

export default function Home({ articles }: { articles: Article[] }) {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Blog des Animaux</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <Card className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold text-gray-800 mb-2">{article.title}</CardTitle>
                <CardDescription className="text-gray-600">{article.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}