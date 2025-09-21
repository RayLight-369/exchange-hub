import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Users, DollarSign } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Buy, Sell & Trade <span className="text-primary">Textbooks</span> with Fellow Students
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Save money on textbooks while helping other students. Join thousands of students already using BookHub to
            find affordable course materials.
          </p>

          {/* Search CTA */ }
          <div className="max-w-md mx-auto mb-12">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by title, author, or ISBN..." className="pl-10 h-12" />
              </div>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 px-8">
                Search
              </Button>
            </div>
          </div>

          {/* Stats */ }
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Books Available</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">25K+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">70%</div>
              <div className="text-sm text-muted-foreground">Average Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
