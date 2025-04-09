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
    revalidate: 60,
  };
};

export default function Home({ articles }: { articles: Article[] }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="rounded-md object-cover"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}