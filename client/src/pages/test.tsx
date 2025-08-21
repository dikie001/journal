import { useState } from "react";
import { BookOpen, Calendar, Clock, Eye, Heart, Share2, Filter, Search, Star, ArrowRight } from "lucide-react";

interface Story {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: string;
  likes: number;
  category: string;
  image: string;
  featured: boolean;
}

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Adventure", "Romance", "Mystery", "Sci-Fi", "Fantasy"];

  const stories: Story[] = [
    {
      id: 1,
      title: "The Lighthouse Keeper's Secret",
      excerpt: "On a remote island where the lighthouse has guided ships for centuries, Elena discovers a hidden room containing journals that reveal an extraordinary truth about her family's past...",
      author: "Sarah Mitchell",
      publishDate: "2024-03-15",
      readTime: "12 min",
      views: "2.3K",
      likes: 156,
      category: "Mystery",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Echoes of Tomorrow",
      excerpt: "In a world where memories can be extracted and traded, Maya must choose between forgetting her painful past or losing the love that defines her future...",
      author: "Alex Chen",
      publishDate: "2024-03-12",
      readTime: "8 min",
      views: "1.8K",
      likes: 134,
      category: "Sci-Fi",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "The Garden of Lost Words",
      excerpt: "When retired librarian Henry discovers that words are literally disappearing from books in his garden shed, he embarks on a magical journey to save the stories of the world...",
      author: "Emma Rodriguez",
      publishDate: "2024-03-10",
      readTime: "15 min",
      views: "3.1K",
      likes: 298,
      category: "Fantasy",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Midnight Train to Nowhere",
      excerpt: "A chance encounter on a late-night train leads to an unexpected romance that spans three cities, two time zones, and one unforgettable journey of the heart...",
      author: "James Parker",
      publishDate: "2024-03-08",
      readTime: "10 min",
      views: "2.7K",
      likes: 203,
      category: "Romance",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 5,
      title: "The Last Explorer",
      excerpt: "In an age where every corner of Earth has been mapped, cartographer Luna discovers coordinates to a place that shouldn't exist, leading to the adventure of a lifetime...",
      author: "David Kim",
      publishDate: "2024-03-05",
      readTime: "18 min",
      views: "4.2K",
      likes: 387,
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "Whispers in the Code",
      excerpt: "Software engineer Zoe starts receiving mysterious messages through her own code, leading her to uncover a digital conspiracy that threatens to rewrite reality itself...",
      author: "Lisa Zhang",
      publishDate: "2024-03-03",
      readTime: "14 min",
      views: "1.9K",
      likes: 167,
      category: "Sci-Fi",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      featured: false
    }
  ];

  const featuredStories = stories.filter(story => story.featured);
  const regularStories = stories.filter(story => !story.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Hero Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-30"></div>
              <div className="relative p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-2xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-700 bg-clip-text text-transparent">
                Stories
              </h1>
              <p className="text-xl text-slate-600 font-medium mt-2">
                Discover worlds beyond imagination
              </p>
            </div>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search stories, authors, or themes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-lg"
                  />
                </div>
                <div className="flex gap-3 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        activeCategory === category
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-purple-400 hover:text-purple-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Stories Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-3xl font-bold text-slate-800">Featured Stories</h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredStories.map((story) => (
              <article key={story.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Featured
                    </span>
                  </div>
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                      {story.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(story.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-slate-200 mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium">{story.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {story.readTime}
                      </span>
                    </div>
                    <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Regular Stories Grid */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h2 className="text-3xl font-bold text-slate-800">All Stories</h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-400 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularStories.map((story) => (
              <article key={story.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {story.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(story.publishDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {story.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    {story.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-slate-700">{story.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                        <Heart className="w-4 h-4" />
                        {story.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {story.views}
                      </span>
                      <button className="hover:text-indigo-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            Load More Stories
          </button>
        </div>

      </div>
    </div>
)}