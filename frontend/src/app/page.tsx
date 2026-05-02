import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HarvestCountdown } from "@/components/home/HarvestCountdown";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { ToursTeaser } from "@/components/home/ToursTeaser";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { ClubCTA } from "@/components/home/ClubCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <HarvestCountdown />
      <StoryTeaser />
      <ToursTeaser />
      <EventsTeaser />
      <JournalTeaser />
      <ClubCTA />
    </>
  );
}
