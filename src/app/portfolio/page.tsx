import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { getPortfoliosAction } from "@/server/actions/portfolio";

export const metadata = {
  title: "Portfolio | Anfal Hidayat"
};

export default async function PortfolioPage() {
  const portfolios = await getPortfoliosAction();

  return (
    <div className="flex flex-col pt-32 min-h-screen">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 mb-10 border-b border-white/10 pb-10">
        <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight mb-4 border-l-4 border-white pl-6">
          Complete Portfolio
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl pl-6">
          An in-depth showcase of all my engineered systems, web platforms, and automated solutions.
        </p>
      </div>
      <PortfolioSection portfolios={portfolios} />
    </div>
  );
}
