import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

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
      setStats(
        data.stats?.map((s) => ({
          title: s.title,
          description: s.description,
          image: s.image,
          preview: s.image,
        })) || [{ title: "", description: "", image: "", preview: "" }]
      );
      setAds(
        data.ads?.map((a) => ({
          head: a.head,
          semihead: a.semihead,
          content: a.content,
          image: a.image,
          preview: a.image,
        })) || [
          { head: "", semihead: "", content: "", image: "", preview: "" },
          { head: "", semihead: "", content: "", image: "", preview: "" },
          { head: "", semihead: "", content: "", image: "", preview: "" },
        ]
      );

      setJourney({
        sectionTitle: data.journey?.sectionTitle || "",
        items:
          data.journey?.items?.map((j) => ({
            title: j.title,
            content: j.content,
            image: j.image,
            preview: j.image,
          })) || [{ title: "", content: "", image: "", preview: "" }],
      });
      setTestimonials(
        data.testimonials?.map((t) => ({
          image: t.image,
          name: t.name,
          role: t.role,
          comment: t.comment,
          preview: t.image,
        })) || [{ image: "", name: "", role: "", comment: "", preview: "" }]
      );
      setFooterText(data.footerText || "");
      setBrandPartners(
        data.brandPartners?.map((b) => ({ image: b.image, preview: b.image })) || [
          { image: null, preview: "" },
        ]
      );
    } catch (err) {
      console.error(err);
    }
  };

  // HANDLE IMAGE FUNCTION 
  const handleImageChange = (e, setter, index, key = "image", parentArray) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  setter((prev) => {
    // Clone root state
    const updated = Array.isArray(prev) ? [...prev] : { ...prev };

    if (parentArray) {
      // Ensure parentArray exists
      if (!Array.isArray(updated[parentArray])) {
        console.error(`Parent array "${parentArray}" not found in state.`);
        return prev;
      }

      // Clone nested array
      const nested = [...updated[parentArray]];

      // Ensure index exists
      if (!nested[index]) {
        console.error(`Index ${index} not found in ${parentArray}`);
        return prev;
      }

      // Clone the specific object inside nested array
      nested[index] = { ...nested[index], [key]: file, preview: previewUrl };

      // Assign updated nested array back
      updated[parentArray] = nested;

    } else {
      // For flat array
      if (!updated[index]) {
        console.error(`Index ${index} not found.`);
        return prev;
      }

      updated[index] = {
        ...updated[index],
        [key]: file,
        preview: previewUrl
      };
    }

    return updated;
  });
};


  const addField = (setter, emptyValue) => setter((prev) => [...prev, emptyValue]);
  const removeField = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateHeading = async () => {
    try {
      const receiveResponse = await axios.post("https://softechbackend-2.onrender.com/content/edithead", { text: heading });
      console.log(receiveResponse);
      toast.success("Update  successfully!");

    } catch (err) {
      console.error(err);
    }
  };

  const updateSubHeading = async () => {
    try {
      const receiveResponse = await axios.post("https://softechbackend-2.onrender.com/content/editsubhead", { text: subHeadings });
      console.log(receiveResponse);
      toast.success("Update  successfully!");

    } catch (err) {
      console.error(err);
    }
  };
// brandpartner 
const updateBrandPartners = async () => {
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
  toast.success("Update  successfully!");

};

  const updateMidSection = async () => {
    try {
      const res = await axios.post("https://softechbackend-2.onrender.com/content/edit-midsection", { midSection });
      console.log("Updated:", res.data);
      toast.success("Update  successfully!");

    } catch (err) {
      console.error(err);
    }
  };

// STATS
const updateStats = async () => {
  const formData = new FormData();
  stats.forEach((s, i) => {
    console.log(s,"ths is the stats ")
    formData.append('title', s.title);
    console.log(s.title)
    formData.append('description', s.description);
    console.log(s.description)
    if (s.image instanceof File) {
      formData.append('images', s.image);
      formData.append('imageIndices', i.toString());
    }
    if (typeof s.image === 'string') formData.append('existingImages', s.image);
  });
  await axios.post('https://softechbackend-2.onrender.com/content/stats', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  toast.success("Update  successfully!");

};
  // ADS
const updateAds = async () => {
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
  toast.success("Update  successfully!");


};

// JOURNEY
const updateJourney = async () => {
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
  toast.success("Update  successfully!");

};

  // TESTIMONIALS
const updateTestimonials = async () => {
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
  toast.success("Update  successfully!");

};

  const updateFooter = async () => {
    try {
      const res = await axios.post("https://softechbackend-2.onrender.com/content/footer", { text: footerText });
      console.log(res);
      toast.success("Update  successfully!");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Heading */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Heading Section</h2>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Enter Heading"
          className="w-full p-2 border rounded"
        />
        <button className="p-2 bg-[green] text-white  border rounded-md " onClick={updateHeading}>
          Update Heading
        </button>
      </section>

      {/* Subheading */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Subheading Section</h2>
        {subHeadings.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              required={true}
              type="text"
              value={item}
              onChange={(e) => {
                const updated = [...subHeadings];
                updated[i] = e.target.value;
                setSubHeadings(updated);
              }}
              placeholder={`Subheading ${i + 1}`}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => removeField(setSubHeadings, i)}
              className="w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center"
            >
              −
            </button>
          </div>
        ))}
        <button onClick={() => addField(setSubHeadings, "")} className="px-3 py-1 border rounded bg-gray-100">
          +
        </button>
      </section>
      <button onClick={updateSubHeading} className="p-2 bg-[green] text-white  border rounded-md ">
        Update SubHeading
      </button>

      {/* Brand Partners */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Brand Partners</h2>

        <div className="flex flex-wrap gap-3">
          {brandPartners.map((partner, i) => (
            <div key={i} className="relative">
              <label className="w-20 h-20 border rounded flex items-center justify-center cursor-pointer text-2xl bg-gray-50 overflow-hidden">
                {partner.preview ? (
                  <img src={partner.preview} className="w-full h-full object-cover" />
                ) : (
                  "+"
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setBrandPartners, i)}
                />
              </label>

              {partner.preview && (
                <button
                  onClick={() => removeField(setBrandPartners, i)}
                  className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                >
                  −
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => addField(setBrandPartners, { image: null, preview: "" })}
          className="px-3 py-1 border rounded bg-gray-100"
        >
          +
        </button>

      </section>
        <button className="p-2 bg-green-600 text-white border rounded-md" onClick={updateBrandPartners}>
          Update BrandPartner Logo
        </button>

      {/* Mid Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Mid Section</h2>
        {midSection.map((item, i) => (
          <input
            key={i}
            type="text"
            value={item}
            onChange={(e) => {
              const updated = [...midSection];
              updated[i] = e.target.value;
              setMidSection(updated);
            }}
            placeholder={`Text ${i + 1}`}
            className="w-full p-2 border rounded"
          />
        ))}
      </section>
      <button className="p-2 bg-[green] text-white  border rounded-md " onClick={updateMidSection}>
        Update MidSection
      </button>

      {/* Stats Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Stats Section</h2>
        {stats.map((stat, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
        <input
  type="text"
  value={stat.title}
  onChange={(e) => {
    setStats(prev => {
      const updated = [...prev];
      updated[i] = { ...updated[i], title: e.target.value };
      return updated;
    });
    console.log(stats)
  }}
  placeholder="Stat Title"
/>
            <textarea
              value={stat.description}
              onChange={(e) => {
                const updated = [...stats];
                updated[i] ={...updated[i],description: e.target.value}
                setStats(updated);
                console.log(stats)
              }}
              placeholder="Description"
              className="w-full p-2 border rounded"
            />
            {/* Image Input */}
            <div className="flex items-center gap-3">
              <label className="w-16 h-16 border rounded flex items-center justify-center cursor-pointer text-2xl bg-gray-50">
                +
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setStats, i, "image")}
                />
              </label>
              {stat.preview && <img src={stat.preview} alt="preview" className="w-16 h-16 object-cover rounded" />}
            </div>
            <button
              onClick={() => removeField(setStats, i)}
              className="w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center"
            >
              −
            </button>
          </div>
        ))}
        <button
          onClick={() => addField(setStats, { title: "", description: "", image: "", preview: "" })}
          className="px-3 py-1 border rounded bg-gray-100"
        >
          +
        </button>
      </section>
      <button className="p-2 bg-[green] text-white  border rounded-md " onClick={updateStats}>
        Update Stats
      </button>

      {/* Ads Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Ads Section</h2>
        {ads.map((ad, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <input
              type="text"
              value={ad.head}
              onChange={(e) => {
                const updated = [...ads];
                updated[i].head = e.target.value;
                setAds(updated);
              }}
              placeholder="Head"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={ad.semihead}
              onChange={(e) => {
                const updated = [...ads];
                updated[i].semihead = e.target.value;
                setAds(updated);
              }}
              placeholder="Semi Head"
              className="w-full p-2 border rounded"
            />
            <textarea
              value={ad.content}
              onChange={(e) => {
                const updated = [...ads];
                updated[i].content = e.target.value;
                setAds(updated);
              }}
              placeholder="Content"
              className="w-full p-2 border rounded"
            />
            <div className="flex items-center gap-3">
              <label className="w-16 h-16 border rounded flex items-center justify-center cursor-pointer text-2xl bg-gray-50">
                +
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setAds, i, "image")}
                />
              </label>
              {ad.preview && <img src={ad.preview} alt="preview" className="w-16 h-16 object-cover rounded" />}
            </div>
          </div>
        ))}
      </section>
      <button className="p-2 bg-[green] text-white  border rounded-md " onClick={updateAds}>
        Update Ads
      </button>

      {/* Journey Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Journey Section</h2>
        <input
          type="text"
          value={journey.sectionTitle}
          onChange={(e) => setJourney({ ...journey, sectionTitle: e.target.value })}
          placeholder="Journey Section Title"
          className="w-full p-2 border rounded"
        />
        {journey.items.map((item, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <input
              type="text"
              value={item.title}
              onChange={(e) => {
                const updated = [...journey.items];
                updated[i].title = e.target.value;
                setJourney({ ...journey, items: updated });
              }}
              placeholder="Title"
              className="w-full p-2 border rounded"
            />
            <textarea
              value={item.content}
              onChange={(e) => {
                const updated = [...journey.items];
                updated[i].content = e.target.value;
                setJourney({ ...journey, items: updated });
              }}
              placeholder="Content"
              className="w-full p-2 border rounded"
            />
            <div className="flex items-center gap-3">
              <label className="w-16 h-16 border rounded flex items-center justify-center cursor-pointer text-2xl bg-gray-50">
                +
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setJourney, i, "image", "items")}
                />
              </label>
              {item.preview && <img src={item.preview} alt="preview" className="w-16 h-16 object-cover rounded" />}
            </div>
            <button
              onClick={() =>
                setJourney({
                  ...journey,
                  items: journey.items.filter((_, idx) => idx !== i),
                })
              }
              className="w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center"
            >
              −
            </button>
          </div>
        ))}
        {journey.items.length < 4 && (
          <button
            onClick={() =>
              setJourney({
                ...journey,
                items: [...journey.items, { title: "", content: "", image: "", preview: "" }],
              })
            }
            className="px-3 py-1 border rounded bg-gray-100"
          >
            +
          </button>
        )}
      </section>
      <button className="p-2 bg-[green] text-white  border rounded-md " onClick={updateJourney}>
        Update Journey
      </button>

      {/* Testimonials */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        {testimonials.map((test, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <div className="flex items-center gap-3">
              <label className="w-16 h-16 border rounded flex items-center justify-center cursor-pointer text-2xl bg-gray-50">
                +
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setTestimonials, i, "image")}
                />
              </label>
              {test.preview && <img src={test.preview} alt="preview" className="w-16 h-16 object-cover rounded" />}
            </div>
            <input
              type="text"
              value={test.name}
              onChange={(e) => {
                const updated = [...testimonials];
                updated[i].name = e.target.value;
                setTestimonials(updated);
              }}
              placeholder="Client Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={test.role}
              onChange={(e) => {
                const updated = [...testimonials];
                updated[i].role = e.target.value;
                setTestimonials(updated);
              }}
              placeholder="Client Role"
              className="w-full p-2 border rounded"
            />
            <textarea
              value={test.comment}
              onChange={(e) => {
                const updated = [...testimonials];
                updated[i].comment = e.target.value;
                setTestimonials(updated);
              }}
              placeholder="Client Comment"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => removeField(setTestimonials, i)}
              className="w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center"
            >
              −
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addField(setTestimonials, { image: "", name: "", role: "", comment: "", preview: "" })
          }
          className="px-3 py-1 border rounded bg-gray-100"
        >
          +
        </button>
      </section>
      <button className="p-2 bg-[green] text-white  border rounded-md " onClick={updateTestimonials}>
        Update Testimonials
      </button>

      {/* Footer */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Footer</h2>
        <input
          type="text"
          value={footerText}
          onChange={(e) => setFooterText(e.target.value)}
          placeholder="Footer Text"
          className="w-full p-2 border rounded"
        />
      </section>
      <button className="p-2 bg-[green] text-white  border rounded-md " onClick={updateFooter}>
        Update Footer
      </button>
    </div>
  );
}