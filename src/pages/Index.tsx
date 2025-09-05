import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const seo = {
  title: "Chinmay Jain — Backend Engineer Portfolio",
  description:
    "Backend Engineer specializing in Node.js, Kafka, Redis, gRPC. 2+ years at ConceptDash. NIT Raipur alum.",
};

const projects = [
  {
    title: "Real‑Time Analytics Pipeline",
    summary:
      "High-throughput data ingestion with Kafka (200k msgs/sec), Node.js consumers with backpressure, Redis for hot aggregates, and gRPC services for low-latency reads (<20ms p95).",
    stack: ["Kafka", "Node.js", "Redis", "gRPC"],
  },
  {
    title: "Distributed Task Orchestrator",
    summary:
      "Topic-based scheduling and retries with Kafka DLQs, worker pool in Node.js, idempotent handlers, and Redis rate limits; horizontally scaled to 10k tasks/sec with exactly-once semantics.",
    stack: ["Kafka", "Node.js", "Redis"],
  },
  {
    title: "gRPC Microservices + API Gateway",
    summary:
      "Express gateway translates REST to gRPC, service discovery, per-route quotas and sliding-window rate limits powered by Redis; zero-downtime deploys with health probes and circuit breakers.",
    stack: ["Node.js", "gRPC", "Redis"],
  },
  {
    title: "Realtime Chat & Presence Service",
    summary:
      "Kafka streams for message fanout, Redis pub/sub for presence and typing indicators, gRPC streaming for efficient mobile clients; achieved sub-100ms end-to-end latency at scale.",
    stack: ["Kafka", "Redis", "gRPC", "Node.js"],
  },
];

export default function Index() {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle navigation clicks to scroll to sections
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault();
        const targetSection = document.querySelector(target.hash);
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL without triggering navigation
          window.history.pushState(null, '', target.hash);
        }
      }
    };

    document.addEventListener('click', handleNavClick);

    // SEO: Title & description
    document.title = seo.title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", seo.description);

    // Canonical tag
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (!existingCanonical) {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", window.location.href);
      document.head.appendChild(link);
    }

    // Structured data (Person + Projects)
    const ld: any = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Chinmay Jain',
      jobTitle: 'Backend Engineer',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'NIT Raipur',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'ConceptDash',
      },
      sameAs: [
        'https://www.linkedin.com/in/chinmayjain7/',
      ],
    };

    const projectLds = projects.map((p) => ({
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: p.title,
      description: p.summary,
      programmingLanguage: 'Node.js',
      keywords: p.stack.join(', '),
    }));

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify([ld, ...projectLds]);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      document.removeEventListener('click', handleNavClick);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Signature ambient gradient background */}
      <div aria-hidden="true" className="ambient" />

      <header className="relative z-10">
        <nav className="container flex items-center justify-between py-6">
          <a href="#home" className="text-sm font-semibold tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            CJ
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <Button asChild variant="hero" size="sm">
              <a href="#contact" aria-label="Get in touch">Get in touch</a>
            </Button>
          </div>
        </nav>
      </header>

      <main id="home" className="relative z-10">
        {/* Hero Section */}
        <section className="container pt-10 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block">Backend Engineer</span>
              <span className="text-gradient"> building resilient, low‑latency systems</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              I’m Chinmay Jain — NIT Raipur ’23, ex‑Accenture intern, and currently crafting
              high‑throughput services at ConceptDash with Node.js, Kafka, Redis, and gRPC.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="lg" asChild>
                <a href="#contact">Let’s collaborate</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">View projects</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant="secondary">2+ yrs @ ConceptDash</Badge>
              <Badge variant="secondary">Accenture Intern</Badge>
              <Badge variant="secondary">NIT Raipur ’23</Badge>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="about" className="container py-12 md:py-16">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Tech stack</h2>
            <p className="text-muted-foreground">Production‑ready tools I use daily.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "Node.js",
              "Kafka",
              "Redis",
              "gRPC",
              "TypeScript",
              "Docker",
            ].map((t) => (
              <Badge key={t} className="px-3 py-1" variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="container py-12 md:py-16">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Experience</h2>
            <p className="text-muted-foreground">Impact over titles.</p>
          </div>
          <div className="grid gap-4">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle>Backend Engineer — ConceptDash</CardTitle>
                <CardDescription>2023 — Present • Fast‑paced startup</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Designed Kafka‑backed pipelines handling 200k msgs/sec with backpressure and DLQs.</li>
                  <li>Reduced p95 latency by 35% via Redis caching, connection pooling, and gRPC streaming.</li>
                  <li>Led observability upgrades (OpenTelemetry, SLOs), cutting MTTR by 40%.</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Intern — Accenture</CardTitle>
                <CardDescription>2022 • Internship</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Built internal tooling and automated data workflows; improved run times by 25%.</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>B.Tech — NIT Raipur</CardTitle>
                <CardDescription>Class of 2023</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                <p>Graduated with strong foundations in distributed systems and algorithms.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="container py-12 md:py-16">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Highlighted projects</h2>
            <p className="text-muted-foreground">Built with Node.js, Kafka, Redis, and gRPC.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <Card key={p.title} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="group-hover:text-foreground transition-colors">{p.title}</CardTitle>
                  <CardDescription>{p.stack.join(" • ")}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  <p>{p.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container py-16">
          <div className="rounded-xl border p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">Let’s build something reliable</h2>
            <p className="mt-2 text-muted-foreground">
              Open to backend roles and impactful system design challenges.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="mailto:chinmaydhariwal1812@gmail.com" aria-label="Email Chinmay">
                  Email me
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#" aria-label="View Resume">
                  Download résumé
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Chinmay Jain. Built with care.
        </div>
      </footer>
    </div>
  );
}
