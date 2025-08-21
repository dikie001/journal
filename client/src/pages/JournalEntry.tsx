import axios from "axios";
import {
  BookOpen,
  Calendar,
  MapPin,
  Plus,
  Save,
  Smile,
  Tag,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface EntryTypes {
  title: string;
  mood: string;
  location: string;
  tags: [];
  content: string;
}

export default function JournalEntry() {
  const [newEntry, setNewEntry] = useState<EntryTypes>({
    title: "",
    mood: "",
    location: "",
    tags: [],
    content: "",
  });
  const [tags, setTags] = useState<any>([]);
  const [input, setInput] = useState("");
  const {id}=useParams<{id:string}>()

  //handle entry of inputs
  const handleEntry = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  //send the new entry to the server
  const handleSave = async () => {
    if (
      !newEntry.title ||
      !newEntry.mood ||
      !newEntry.tags ||
      !newEntry.content ||
      !newEntry.location
    ) {
      toast.error("Please fill all the fields", { id: "toast1" });
      return;
    }
    axios.post(`http://localhost:4000/api/new_entry/${id}`, newEntry).then((res) => {
      if (res.status === 200) {
        toast.success("Entry saved successfully");
        setNewEntry({
          title: "",
          mood: "",
          location: "",
          tags: [],
          content: "",
        });
        setTags([]);
      }
    });
  };

  //handle creation of tags
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && input.trim() !== "") {
      if (!tags.includes(input.trim())) {
        setTags([...tags, "#" + input.trim()]);
        const newT = tags;
        setNewEntry({ ...newEntry, tags: newT });
        console.log(newEntry);
      }
      setInput("");
      e.preventDefault();
    }
    if (e.key === "Backspace" && input === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-md">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">My Journal</h1>
          </div>
          <p className="text-slate-600 text-lg font-medium">
            Capture your thoughts, memories, and moments
          </p>
        </header>

        {/* Entry Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-10">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800">New Entry</h2>
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          </div>

          {/* Title Input */}
          <div className="mb-6">
            <input
              onChange={(e) => handleEntry(e)}
              name="title"
              value={newEntry.title}
              placeholder="Give your entry a title..."
              className="w-full p-4 text-xl font-medium bg-slate-50 border-2 border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Mood and Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Smile className="w-4 h-4 text-indigo-500" />
                Mood
              </label>
              <select
                name="mood"
                value={newEntry.mood}
                onChange={(e) => handleEntry(e)}
                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-slate-700"
              >
                <option>Select mood...</option>
                <option>😊 Happy</option>
                <option>😔 Sad</option>
                <option>😠 Angry</option>
                <option>😰 Anxious</option>
                <option>😌 Calm</option>
                <option>🤔 Thoughtful</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <MapPin className="w-4 h-4 text-indigo-500" />
                Location
              </label>
              <input
                placeholder="Where are you?"
                type="text"
                value={newEntry.location}
                name="location"
                onChange={(e) => handleEntry(e)}
                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Tags Section */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <Tag className="w-4 h-4 text-indigo-500" />
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-colors min-h-[50px]">
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
              <input
                type="text"
                value={input}
                name="tags"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                className="flex-1 min-w-[120px] p-1 bg-transparent border-none outline-none placeholder-slate-400"
                placeholder={
                  tags.length === 0
                    ? "Type and press Enter to add tags"
                    : "Add more tags..."
                }
              />
            </div>
          </div>

          {/* Content Textarea */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Your thoughts
            </label>
            <textarea
              onChange={(e) => handleEntry(e)}
              name="content"
              value={newEntry.content}
              placeholder="What's on your mind today? Write about your experiences, thoughts, or feelings..."
              rows={6}
              className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl resize-none focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors placeholder-slate-400 leading-relaxed"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
          >
            <Save className="w-5 h-5" />
            Save Entry
          </button>
        </div>

        {/* Recent Entries */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-800">
              Recent Entries
            </h2>
          </div>

          <div className="space-y-6">
            {/* Entry 1 */}
            <article className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <header className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">
                    A Beautiful Morning
                  </h3>
                  <time className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-full font-medium">
                    <Calendar className="w-4 h-4" />
                    Dec 15, 2024
                  </time>
                </header>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl">😊</span>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Central Park, NYC
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-4">
                  Started my day with a peaceful walk in Central Park. The
                  morning light filtering through the trees was absolutely
                  magical. There's something about the quiet moments before the
                  city wakes up that fills me with gratitude and clarity...
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    morning
                  </span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    nature
                  </span>
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    gratitude
                  </span>
                </div>
              </div>
            </article>

            {/* Entry 2 */}
            <article className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <header className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">
                    Weekend Reflections
                  </h3>
                  <time className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-full font-medium">
                    <Calendar className="w-4 h-4" />
                    Dec 13, 2024
                  </time>
                </header>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl">🤔</span>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Home</span>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-4">
                  Spent the weekend thinking about goals and priorities.
                  Sometimes it's important to slow down and really consider what
                  matters most. The quiet time at home gave me space to process
                  recent changes and plan ahead...
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    reflection
                  </span>
                  <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    goals
                  </span>
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    planning
                  </span>
                </div>
              </div>
            </article>

            {/* Empty State */}
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                Ready for more memories?
              </h3>
              <p className="text-slate-500">
                Start writing your next journal entry above to capture today's
                moments.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
