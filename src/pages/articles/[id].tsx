import { PrismaClient } from '@/app/generated/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const prisma = new PrismaClient();

export type Article = {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  createdAt: Date;
};

export async function getStaticPaths() {
  const articles = await prisma.article.findMany({ select: { id: true } });
  const paths = articles.map((article) => ({ params: { id: article.id } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({ where: { id: params.id } });
  if (!article) return { notFound: true };
  return { props: { article: JSON.parse(JSON.stringify(article)) } };
}

export default function ArticlePage({ article }: { article: Article }) {
  if (!article) return notFound();

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={article.image}
            alt={article.title}
            width={600}
            height={300}
            className="rounded-md mb-4 object-cover"
          />
          <p className="text-gray-600 mb-4">{article.description}</p>
          <p>{article.content}</p>
          <p className="text-sm text-gray-500 mt-4">
            Publié le {new Date(article.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}