import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { ClubCTA } from "@/components/home/ClubCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <StoryTeaser />
      <EventsTeaser />
      <JournalTeaser />
      <ClubCTA />
    </>
  );
}
