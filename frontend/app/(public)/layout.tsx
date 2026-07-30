import Navbar from '@/components/web/layout/Navbar';
import Footer from '@/components/web/layout/Footer';
import { getPageContent, readContent } from '@/lib/get-page-content';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const global = await getPageContent('global');
  const { v } = readContent(global);
  const bannerText = v('global_banner_text');
  const bannerColor = v('global_banner_color') || '#1a7060';
  const showBanner = v('global_banner_enabled') === 'true' && Boolean(bannerText);

  return (
    <>
      {showBanner && (
        <div
          className="fixed top-0 inset-x-0 z-60 text-center text-sm font-medium py-2.5 px-4 text-white"
          style={{ backgroundColor: bannerColor }}
        >
          {bannerText}
        </div>
      )}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium"
      >
        Skip to content
      </a>
      <Navbar bannerActive={showBanner} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
