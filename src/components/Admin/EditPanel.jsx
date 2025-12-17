import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { 
  Save, Plus, Trash2, Image as ImageIcon, 
  Layout, Type, Users, BarChart3, Rocket, 
  MessageSquare, ChevronRight, Share2 
} from "lucide-react";

// FIX: Moved Section component OUTSIDE of the main component to prevent focus loss while typing
const Section = ({ id, title, icon: Icon, children, onSave }) => (
  <section id={id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md mb-8">
    <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <Icon size={20} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {onSave && (
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
        >
          <Save size={16} /> Save Changes
        </button>
      )}
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </section>
);

export default function AdminEditPanel() {
  const [heading, setHeading] = useState("");
  const [subHeadings, setSubHeadings] = useState([""]);
  const [midSection, setMidSection] = useState(["", ""]);
  const [stats, setStats] = useState([{ title: "", description: "", image: "", preview: "" }]);
  const [ads, setAds] = useState([
    { head: "", semihead: "", content: "", image: "", preview: "" },
    { head: "", semihead: "", content: "", image: "", preview: "" },
    { head: "", semihead: "", content: "", image: "", preview: "" },
  ]);
  const [journey, setJourney] = useState({
    sectionTitle: "",
    items: [{ title: "", content: "", image: "", preview: "" }],
  });
  const [testimonials, setTestimonials] = useState([
    { image: "", name: "", role: "", comment: "", preview: "" },
  ]);
  const [footerText, setFooterText] = useState("");
  const [brandPartners, setBrandPartners] = useState([{ image: null, preview: "" }]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get("https://softechbackend-2.onrender.com/content/getcontent");
      const data = res.data.data[0];
      setHeading(data.heading || "");
      setSubHeadings(data.subHeadings || [""]);
      setMidSection(data.midSection || ["", ""]);
      setStats(data.stats?.map((s) => ({ ...s, preview: s.image })) || [{ title: "", description: "", image: "", preview: "" }]);
      setAds(data.ads?.map((a) => ({ ...a, preview: a.image })) || [
          { head: "", semihead: "", content: "", image: "", preview: "" },
          { head: "", semihead: "", content: "", image: "", preview: "" },
          { head: "", semihead: "", content: "", image: "", preview: "" },
        ]);
      setJourney({
        sectionTitle: data.journey?.sectionTitle || "",
        items: data.journey?.items?.map((j) => ({ ...j, preview: j.image })) || [{ title: "", content: "", image: "", preview: "" }],
      });
      setTestimonials(data.testimonials?.map((t) => ({ ...t, preview: t.image })) || [{ image: "", name: "", role: "", comment: "", preview: "" }]);
      setFooterText(data.footerText || "");
      setBrandPartners(data.brandPartners?.map((b) => ({ image: b.image, preview: b.image })) || [{ image: null, preview: "" }]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load content");
    }
  };

  const handleImageChange = (e, setter, index, key = "image", parentArray) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);

    setter((prev) => {
      const updated = Array.isArray(prev) ? [...prev] : { ...prev };
      if (parentArray) {
        const nested = [...updated[parentArray]];
        nested[index] = { ...nested[index], [key]: file, preview: previewUrl };
        updated[parentArray] = nested;
      } else {
        updated[index] = { ...updated[index], [key]: file, preview: previewUrl };
      }
      return updated;
    });
  };

  const addField = (setter, emptyValue) => setter((prev) => [...prev, emptyValue]);
  const removeField = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

  const wrapUpdate = async (updateFn) => {
    const loadingToast = toast.loading("Updating...");
    try {
      await updateFn();
      toast.success("Changes saved successfully!", { id: loadingToast });
    } catch (err) {
      console.error(err);
      toast.error("Update failed. Please try again.", { id: loadingToast });
    }
  };

  const updateHeading = () => wrapUpdate(async () => {
    await axios.post("https://softechbackend-2.onrender.com/content/edithead", { text: heading });
  });

  const updateSubHeading = () => wrapUpdate(async () => {
    await axios.post("https://softechbackend-2.onrender.com/content/editsubhead", { text: subHeadings });
  });

  const updateBrandPartners = () => wrapUpdate(async () => {
    const formData = new FormData();
    brandPartners.forEach((p, i) => {
      if (p.image instanceof File) {
        formData.append('images', p.image);
        formData.append('imageIndices', i.toString());
      }
      if (typeof p.image === 'string') formData.append('existingImages', p.image);
    });
    await axios.post('https://softechbackend-2.onrender.com/content/brand-partners', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  const updateMidSection = () => wrapUpdate(async () => {
    await axios.post("https://softechbackend-2.onrender.com/content/edit-midsection", { midSection });
  });

  const updateStats = () => wrapUpdate(async () => {
    const formData = new FormData();
    stats.forEach((s, i) => {
      formData.append('title', s.title);
      formData.append('description', s.description);
      if (s.image instanceof File) {
        formData.append('images', s.image);
        formData.append('imageIndices', i.toString());
      }
      if (typeof s.image === 'string') formData.append('existingImages', s.image);
    });
    await axios.post('https://softechbackend-2.onrender.com/content/stats', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  const updateAds = () => wrapUpdate(async () => {
    const formData = new FormData();
    ads.forEach((a, i) => {
      formData.append('head', a.head);
      formData.append('semihead', a.semihead);
      formData.append('content', a.content);
      if (a.image instanceof File) {
        formData.append('images', a.image);
        formData.append('imageIndices', i.toString());
      }
      if (typeof a.image === 'string') formData.append('existingImages', a.image);
    });
    await axios.post('https://softechbackend-2.onrender.com/content/ads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  const updateJourney = () => wrapUpdate(async () => {
    const formData = new FormData();
    formData.append('sectionTitle', journey.sectionTitle);
    journey.items.forEach((it, i) => {
      formData.append('title', it.title);
      formData.append('content', it.content);
      if (it.image instanceof File) {
        formData.append('images', it.image);
        formData.append('imageIndices', i.toString());
      }
      if (typeof it.image === 'string') formData.append('existingImages', it.image);
    });
    await axios.post('https://softechbackend-2.onrender.com/content/journey', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  const updateTestimonials = () => wrapUpdate(async () => {
    const formData = new FormData();
    testimonials.forEach((t, i) => {
      formData.append('name', t.name);
      formData.append('role', t.role);
      formData.append('comment', t.comment);
      if (t.image instanceof File) {
        formData.append('images', t.image);
        formData.append('imageIndices', i.toString());
      }
      if (typeof t.image === 'string') formData.append('existingImages', t.image);
    });
    await axios.post('https://softechbackend-2.onrender.com/content/testimonials', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  const updateFooter = () => wrapUpdate(async () => {
    await axios.post("https://softechbackend-2.onrender.com/content/footer", { text: footerText });
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8">
      <Toaster position="top-right" />
      
      {/* Sidebar removed, main content centered */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Edit Website Content</h1>
          <p className="text-gray-500 mt-1">Manage all the dynamic content of your landing page from here.</p>
        </div>

        <Section id="hero" title="Heading Section" icon={Layout} onSave={updateHeading}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Main Heading</label>
            <textarea
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px]"
              placeholder="Enter hero heading..."
            />
          </div>
        </Section>

        <Section id="subheading" title="Subheadings" icon={Type} onSave={updateSubHeading}>
          <div className="space-y-4">
            {subHeadings.map((item, i) => (
              <div key={i} className="flex gap-3 group">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...subHeadings];
                    updated[i] = e.target.value;
                    setSubHeadings(updated);
                  }}
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder={`Subheading ${i + 1}`}
                />
                <button onClick={() => removeField(setSubHeadings, i)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button 
              onClick={() => addField(setSubHeadings, "")}
              className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Plus size={16} /> Add New Subheading
            </button>
          </div>
        </Section>

        <Section id="brands" title="Brand Partners" icon={Share2} onSave={updateBrandPartners}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brandPartners.map((partner, i) => (
              <div key={i} className="group relative aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-indigo-400 transition-all">
                {partner.preview ? (
                  <>
                    <img src={partner.preview} alt="brand" className="w-full h-full object-contain p-4" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => removeField(setBrandPartners, i)} className="p-2 bg-white text-red-600 rounded-full hover:scale-110 transition-transform">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <ImageIcon className="text-gray-400 mb-2" />
                    <span className="text-xs font-medium text-gray-400">Upload Logo</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, setBrandPartners, i)} />
                  </label>
                )}
              </div>
            ))}
            <button 
              onClick={() => addField(setBrandPartners, { image: null, preview: "" })}
              className="aspect-square bg-white border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center text-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              <Plus />
              <span className="text-xs font-bold mt-2">Add Logo</span>
            </button>
          </div>
        </Section>

        <Section id="mid" title="Mid Section Content" icon={Rocket} onSave={updateMidSection}>
          <div className="space-y-4">
            {midSection.map((item, i) => (
              <div key={i} className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Feature Point {i+1}</label>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...midSection];
                    updated[i] = e.target.value;
                    setMidSection(updated);
                  }}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            ))}
          </div>
        </Section>

        <Section id="stats" title="Statistics" icon={BarChart3} onSave={updateStats}>
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <div key={i} className="p-5 border border-gray-100 rounded-2xl bg-gray-50/30 flex flex-col md:flex-row gap-6 relative group">
                <div className="w-24 h-24 shrink-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                  {stat.preview ? (
                    <img src={stat.preview} className="w-full h-full object-cover" />
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <Plus size={20} className="text-gray-300" />
                      <input type="file" className="hidden" onChange={(e) => handleImageChange(e, setStats, i, "image")} />
                    </label>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    placeholder="Stat Title (e.g. 10k+)"
                    value={stat.title}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[i].title = e.target.value;
                      setStats(updated);
                    }}
                    className="w-full p-2 text-lg font-bold bg-transparent border-b border-gray-200 focus:border-indigo-500 outline-none"
                  />
                  <textarea
                    placeholder="Description..."
                    value={stat.description}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[i].description = e.target.value;
                      setStats(updated);
                    }}
                    className="w-full p-2 bg-transparent border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none text-sm h-20"
                  />
                </div>
                <button onClick={() => removeField(setStats, i)} className="md:absolute top-4 right-4 text-red-300 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button onClick={() => addField(setStats, { title: "", description: "", image: "", preview: "" })} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-medium hover:bg-white hover:text-indigo-500 transition-all flex items-center justify-center gap-2">
              <Plus size={18} /> Add Stat Item
            </button>
          </div>
        </Section>

        <Section id="ads" title="Marketing Ads" icon={ImageIcon} onSave={updateAds}>
          <div className="space-y-8">
            {ads.map((ad, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input placeholder="Headline" value={ad.head} onChange={(e) => { const updated = [...ads]; updated[i].head = e.target.value; setAds(updated); }} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold" />
                  <input placeholder="Sub-headline" value={ad.semihead} onChange={(e) => { const updated = [...ads]; updated[i].semihead = e.target.value; setAds(updated); }} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <textarea placeholder="Ad Content" value={ad.content} onChange={(e) => { const updated = [...ads]; updated[i].content = e.target.value; setAds(updated); }} className="w-full p-3 border border-gray-200 rounded-xl h-24 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-white border rounded-lg overflow-hidden flex items-center justify-center">
                    {ad.preview ? <img src={ad.preview} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300" />}
                  </div>
                  <label className="text-sm font-bold text-indigo-600 cursor-pointer hover:underline">
                    Change Image
                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, setAds, i, "image")} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="journey" title="Company Journey" icon={ChevronRight} onSave={updateJourney}>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase px-1">Timeline Title</label>
              <input value={journey.sectionTitle} onChange={(e) => setJourney({ ...journey, sectionTitle: e.target.value })} className="w-full p-4 border border-gray-200 rounded-xl text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Our Growth Timeline" />
            </div>
            {journey.items.map((item, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-xl flex gap-4 bg-gray-50/50">
                <div className="w-12 h-12 shrink-0 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">{i+1}</div>
                <div className="flex-1 space-y-3">
                  <input placeholder="Milestone Title" value={item.title} onChange={(e) => { const updated = [...journey.items]; updated[i].title = e.target.value; setJourney({ ...journey, items: updated }); }} className="w-full bg-transparent border-b border-gray-200 focus:border-indigo-500 outline-none font-medium" />
                  <textarea placeholder="Description" value={item.content} onChange={(e) => { const updated = [...journey.items]; updated[i].content = e.target.value; setJourney({ ...journey, items: updated }); }} className="w-full bg-transparent text-sm h-16 outline-none" />
                </div>
                <button onClick={() => setJourney({ ...journey, items: journey.items.filter((_, idx) => idx !== i) })} className="text-red-300 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
            {journey.items.length < 4 && (
              <button onClick={() => setJourney({ ...journey, items: [...journey.items, { title: "", content: "", image: "", preview: "" }] })} className="text-sm font-bold text-indigo-600 flex items-center gap-1 mt-2">
                <Plus size={16} /> Add Milestone
              </button>
            )}
          </div>
        </Section>

        <Section id="testimonials" title="Testimonials" icon={MessageSquare} onSave={updateTestimonials}>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((test, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-100 overflow-hidden bg-gray-100">
                    {test.preview ? <img src={test.preview} className="w-full h-full object-cover" /> : <ImageIcon className="m-auto mt-3 text-gray-300" size={16}/>}
                  </div>
                  <div>
                    <input placeholder="Name" value={test.name} onChange={(e) => { const updated = [...testimonials]; updated[i].name = e.target.value; setTestimonials(updated); }} className="block w-full text-sm font-bold outline-none" />
                    <input placeholder="Role" value={test.role} onChange={(e) => { const updated = [...testimonials]; updated[i].role = e.target.value; setTestimonials(updated); }} className="block w-full text-xs text-gray-400 outline-none" />
                  </div>
                </div>
                <textarea placeholder="Client Comment..." value={test.comment} onChange={(e) => { const updated = [...testimonials]; updated[i].comment = e.target.value; setTestimonials(updated); }} className="w-full text-sm text-gray-600 bg-gray-50/50 p-3 rounded-xl h-24 outline-none italic" />
                <label className="mt-3 text-[10px] font-bold uppercase text-indigo-500 cursor-pointer">
                  Change Avatar
                  <input type="file" className="hidden" onChange={(e) => handleImageChange(e, setTestimonials, i, "image")} />
                </label>
                <button onClick={() => removeField(setTestimonials, i)} className="absolute top-4 right-4 text-red-200 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section id="footer" title="Footer Section" icon={Share2} onSave={updateFooter}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Footer Attribution Text</label>
            <input
              type="text"
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. © 2025 Softech. All rights reserved."
            />
          </div>
        </Section>
      </div>
    </div>
  );
}