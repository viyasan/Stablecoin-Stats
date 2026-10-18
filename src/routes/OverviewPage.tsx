import { useEffect } from 'react';
import { PageContainer } from '../components/layout';
import { FadeInSlide } from '../components/common';
import { prefetchNews } from '../api';
import { HeroSection, TopHeadlinesList } from '../components/overview';

export function OverviewPage() {
  // Kick off news fetch immediately on page mount so it's ready by the time
  // the user scrolls down to the headlines section
  useEffect(() => {
    prefetchNews();
  }, []);

  return (
    <PageContainer>
      {/* Hero Section */}
      <FadeInSlide>
        <HeroSection />
      </FadeInSlide>

      {/* Top Headlines Section */}
      <section>
        <FadeInSlide delay={0}>
          <TopHeadlinesList />
        </FadeInSlide>
      </section>
    </PageContainer>
  );
}
