import React, { useState } from "react";

export default function DLProfileMapper({ excelData, onSave, onBack }) {
  // Extract unique DLNames and JobProfiles
const dlNames = [...new Set(excelData.map(r => r.DLName).filter(Boolean))];
const jobProfiles = [...new Set(excelData.map(r => r.JobProfile).filter(Boolean))];
const [jobProfileSearch, setJobProfileSearch] = useState("");
const mockOwners = ["Alice", "Bob", "Carol", "David"];
const [searchTerm, setSearchTerm] = useState("");
const [selectedProfile, setSelectedProfile] = useState(null);
const [currentPage, setCurrentPage] = useState(1);

// 2. Then define mapping (depends on jobProfiles which is already defined)
const [mapping, setMapping] = useState(
  jobProfiles.map(profile => ({
    JobProfile: profile,
    DLs: [],
    Owner: mockOwners[0]
  }))
);

// 3. Now define filtered data (depends on mapping)
const filteredJobProfiles = mapping.filter(row =>
  row.JobProfile.toLowerCase().includes(jobProfileSearch.toLowerCase())
);

const itemsPerPage = 20;
const totalPages = Math.ceil(filteredJobProfiles.length / itemsPerPage);


const filteredDLs = searchTerm 
  ? dlNames.filter(dl => dl.toLowerCase().includes(searchTerm.toLowerCase()))
  : dlNames;
  
  const toggleDL = (profile, dlName) => {
    setMapping(prev =>
      prev.map(row => {
        if (row.JobProfile !== profile) return row;
        const exists = row.DLs.includes(dlName);
        return {
          ...row,
          DLs: exists ? row.DLs.filter(d => d !== dlName) : [...row.DLs, dlName]
        };
      })
    );
  };

  const updateOwner = (profile, newOwner) => {
    setMapping(prev =>
      prev.map(row =>
        row.JobProfile === profile ? { ...row, Owner: newOwner } : row
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Map Job Profiles to DLs & Owners</h2>
        <div className="space-x-2">
          <button
            onClick={onBack}
            className="px-3 py-1 border rounded-lg hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={() => onSave(mapping)}
            className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Mapping
          </button>
        </div>
      </div>
    {/* Add this AFTER line 61, BEFORE the space-y-4 div */}
<div className="mb-4">
  <input
    type="text"
    placeholder="Search job profiles..."
    value={jobProfileSearch}
    onChange={e => setJobProfileSearch(e.target.value)}
    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  />
  <p className="text-sm text-gray-500 mt-1">
    Showing {filteredJobProfiles.length} of {mapping.length} job profiles
  </p>
</div>
      <div className="space-y-4">
  {filteredJobProfiles.map(row => (
    <div key={row.JobProfile} className="border rounded-lg p-4 bg-gray-50">
      {/* Header with Job Profile and Owner */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">{row.JobProfile}</h3>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Owner:</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={row.Owner}
            onChange={e => updateOwner(row.JobProfile, e.target.value)}
          >
            {mockOwners.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Show selected DLs as tags */}
      <div className="flex flex-wrap gap-2">
        {row.DLs.length === 0 ? (
          <span className="text-sm text-gray-500 italic">No DLs assigned</span>
        ) : (
          row.DLs.map(dl => (
            <span key={dl} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center space-x-1">
              <span>{dl}</span>
              <button onClick={() => toggleDL(row.JobProfile, dl)} className="hover:text-blue-900">×</button>
            </span>
          ))
        )}
        <button
          onClick={() => setSelectedProfile(selectedProfile === row.JobProfile ? null : row.JobProfile)}
          className="px-2 py-1 border border-dashed border-gray-400 rounded text-sm text-gray-600 hover:bg-gray-100"
        >
          + Add DLs
        </button>
      </div>

      {/* ⚠️ THIS SECTION MUST BE INSIDE THE CARD (inside the map) */}
      {selectedProfile === row.JobProfile && (
        <div className="mt-3 p-3 bg-white rounded border">
          <input
            type="text"
            placeholder="Search DLs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <div className="max-h-48 overflow-y-auto space-y-1">
            {filteredDLs.slice(0, 50).map(dl => (
              <label key={dl} className="flex items-center space-x-2 p-1 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={row.DLs.includes(dl)}
                  onChange={() => toggleDL(row.JobProfile, dl)}
                />
                <span className="text-sm">{dl}</span>
              </label>
            ))}
          </div>
        </div>
      )}

    </div>  
  ))} 
    {/* Add after the closing </div> of space-y-4 */}
{totalPages > 1 && (
  <div className="flex items-center justify-center space-x-2 mt-4">
    <button
      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
</div> 
    </div>
  );
}