import { notFound } from "next/navigation";
import { portfolioProjects, getProjectBySlug } from "@/data/portfolio";
import { PortfolioDetailView } from "@/components/portfolio/portfolio-detail-view";

interface PortfolioPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PortfolioPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found | Devi Arts" };

  return {
    title: `${project.title} | Devi Arts Portfolio`,
    description: project.description,
  };
}

export default function PortfolioDetailPage({ params }: PortfolioPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <PortfolioDetailView project={project} />;
}
