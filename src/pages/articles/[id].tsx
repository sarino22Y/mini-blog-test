import { PrismaClient } from '@/app/generated/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden">
        <CardHeader className="p-0">
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover"
          />
        </CardHeader>
        <CardContent className="p-8">
          <CardTitle className="text-3xl font-bold text-gray-800 mb-4">{article.title}</CardTitle>
          <p className="text-lg text-gray-600 mb-6">{article.description}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{article.content}</p>
          <p className="text-sm text-gray-500 italic">
            Publié le {new Date(article.createdAt).toLocaleDateString('fr-FR')}
          </p>
          <Button asChild className="mt-6 bg-gray-800 hover:bg-gray-700">
            <Link href="/">Retour à l’accueil</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}