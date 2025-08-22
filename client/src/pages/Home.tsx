import axios from "axios";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  FolderGit,
  Grid,
  Heart,
  List,
  LucideFileInput,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileModal from "../modals/profileModal";

interface DataTypes {
  title: string;
  date: string;
  mood: string;
  location: string;
  tags: [];
  content: string;
}

export default function HomePage() {
  const [data, setData] = useState<DataTypes[]>([]);
  const [name, setName] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  //load data from db
  const loadData = () => {
    const token = localStorage.getItem("journal-token");

    axios
      .get(`http://localhost:4000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setName(res.data.name);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-800">
                {name.split(" ")[0]} Journal
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search your entries..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div
                onClick={() => setShowProfileModal(!showProfileModal)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats & Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-8">
            {/* Quick Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {data.length}
                </div>
                <div className="text-xs text-slate-500">Total</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button className="p-2 bg-white shadow-sm rounded-md">
                <Grid className="w-4 h-4 text-slate-700" />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-700">
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filters */}
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>

            {/* New Entry Button */}
            <button
              onClick={() => navigate(`/entry/${id}`)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>New Entry</span>
            </button>
          </div>
        </div>

        {/* Journal Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((entry, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">{entry.date}</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
                  {entry.title}
                </h3>

                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  {entry.content}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {/* <span className="text-xl">{entry.emoji}</span> */}
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{entry.location}</span>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{entry.time}</span>
                  </div> */}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {entry.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-slate-400" />
                    <Star className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {data.length === 0 && (
          <div className="text-center mt-12">
            <p>NO JOURNALS SAVED YET</p>
          </div>
        )}
      </div>
      {/* MODALS */}
      {showProfileModal && <ProfileModal />}
    </div>
  );
}
