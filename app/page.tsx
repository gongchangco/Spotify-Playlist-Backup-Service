import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { Heading } from "@/components/Heading";
import SpotifyIntegration from "@/components/SpotifyIntegration";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <main className="flex flex-col justify-center p-20">
        <div>
          <Heading className="text-white">
            Spotify Playlist Backup Service
          </Heading>
          <SpotifyIntegration />
        </div>
        <Footer />
        <BackgroundBeams />
      </main>
    </div>

    
  );
}
