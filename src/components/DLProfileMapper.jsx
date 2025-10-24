// // import React, { useState, useMemo } from "react";

// // export default function DLProfileMapper({ excelData, onSave, onBack }) {
// //   const [step, setStep] = useState(1); // 1: Column Mapping, 2: Profile-DL Mapping
  
// //   // Get all column names from Excel
// //   const excelColumns = excelData.length > 0 ? Object.keys(excelData[0]) : [];
  
// //   // Column mapping state
// //   const [columnMapping, setColumnMapping] = useState({
// //     dlNameColumn: "",
// //     jobProfileColumn: "",
// //     ownerColumn: ""
// //   });

// //   // Extract data based on mapped columns - using useMemo to prevent recalculation
// //   const { dlNames, jobProfiles, owners } = useMemo(() => {
// //     const dlNames = columnMapping.dlNameColumn 
// //       ? [...new Set(excelData.map(r => r[columnMapping.dlNameColumn]).filter(Boolean))]
// //       : [];
    
// //     const jobProfiles = columnMapping.jobProfileColumn
// //       ? [...new Set(excelData.map(r => r[columnMapping.jobProfileColumn]).filter(Boolean))]
// //       : [];
    
// //     const owners = columnMapping.ownerColumn
// //       ? [...new Set(excelData.map(r => r[columnMapping.ownerColumn]).filter(Boolean))]
// //       : ["Default Owner"];

// //     return { dlNames, jobProfiles, owners };
// //   }, [excelData, columnMapping]);

// //   // Mapping state for step 2
// //   const [mapping, setMapping] = useState([]);
// //   const [jobProfileSearch, setJobProfileSearch] = useState("");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedProfile, setSelectedProfile] = useState(null);

// //   // Initialize mapping when moving to step 2
// //   const initializeMapping = () => {
// //     if (!columnMapping.jobProfileColumn) {
// //       alert("Please map the Job Profile column to continue.");
// //       return;
// //     }
    
// //     if (jobProfiles.length === 0) {
// //       alert("No job profiles found in the selected column. Please check your data.");
// //       return;
// //     }
    
// //     setMapping(
// //       jobProfiles.map(profile => ({
// //         JobProfile: profile,
// //         DLs: [],
// //         Owner: owners[0]
// //       }))
// //     );
// //     setStep(2);
// //   };

// //   const filteredJobProfiles = mapping.filter(row =>
// //     row.JobProfile.toLowerCase().includes(jobProfileSearch.toLowerCase())
// //   );

// //   const filteredDLs = searchTerm 
// //     ? dlNames.filter(dl => dl.toLowerCase().includes(searchTerm.toLowerCase()))
// //     : dlNames;

// //   const toggleDL = (profile, dlName) => {
// //     setMapping(prev =>
// //       prev.map(row => {
// //         if (row.JobProfile !== profile) return row;
// //         const exists = row.DLs.includes(dlName);
// //         return {
// //           ...row,
// //           DLs: exists ? row.DLs.filter(d => d !== dlName) : [...row.DLs, dlName]
// //         };
// //       })
// //     );
// //   };

// //   const updateOwner = (profile, newOwner) => {
// //     setMapping(prev =>
// //       prev.map(row =>
// //         row.JobProfile === profile ? { ...row, Owner: newOwner } : row
// //       )
// //     );
// //   };

// //   const handleSave = () => {
// //     onSave({
// //       columnMapping,
// //       profileMapping: mapping
// //     });
// //   };

// //   // STEP 1: Column Mapping Interface
// //   if (step === 1) {
// //     return (
// //       <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
// //         <div className="flex items-center justify-between mb-6">
// //           <h2 className="text-2xl font-bold text-gray-800">Step 1: Map Excel Columns</h2>
// //           <button
// //             onClick={onBack}
// //             className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
// //           >
// //             ← Back
// //           </button>
// //         </div>

// //         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
// //           <p className="text-sm text-blue-800">
// //             <strong>Instructions:</strong> Map your Excel columns to the required fields below. 
// //             Only <strong>Job Profile</strong> is mandatory. DL Name and Owner are optional.
// //           </p>
// //         </div>

// //         <div className="space-y-6">
// //           {/* Job Profile Mapping (Required) */}
// //           <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
// //             <div className="flex items-start justify-between mb-3">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-1">
// //                   Job Profile Column <span className="text-red-500">*</span>
// //                 </label>
// //                 <p className="text-xs text-gray-500">Select the column containing job profile names</p>
// //               </div>
// //               {columnMapping.jobProfileColumn && (
// //                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
// //                   Mapped
// //                 </span>
// //               )}
// //             </div>
// //             <select
// //               value={columnMapping.jobProfileColumn}
// //               onChange={e => setColumnMapping(prev => ({ ...prev, jobProfileColumn: e.target.value }))}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="">-- Select Column --</option>
// //               {excelColumns.map(col => (
// //                 <option key={col} value={col}>{col}</option>
// //               ))}
// //             </select>
// //             {columnMapping.jobProfileColumn && (
// //               <div className="mt-3 p-3 bg-white rounded border border-gray-200">
// //                 <p className="text-xs text-gray-600 mb-2">Preview (first 5 unique values):</p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {[...new Set(excelData.map(r => r[columnMapping.jobProfileColumn]).filter(Boolean))].slice(0, 5).map((val, i) => (
// //                     <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
// //                       {val}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* DL Name Mapping (Optional) */}
// //           <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
// //             <div className="flex items-start justify-between mb-3">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-1">
// //                   DL Name Column <span className="text-gray-400 text-xs">(Optional)</span>
// //                 </label>
// //                 <p className="text-xs text-gray-500">Select the column containing distribution list names</p>
// //               </div>
// //               {columnMapping.dlNameColumn && (
// //                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
// //                   Mapped
// //                 </span>
// //               )}
// //             </div>
// //             <select
// //               value={columnMapping.dlNameColumn}
// //               onChange={e => setColumnMapping(prev => ({ ...prev, dlNameColumn: e.target.value }))}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="">-- Select Column (or leave empty) --</option>
// //               {excelColumns.map(col => (
// //                 <option key={col} value={col}>{col}</option>
// //               ))}
// //             </select>
// //             {columnMapping.dlNameColumn && (
// //               <div className="mt-3 p-3 bg-white rounded border border-gray-200">
// //                 <p className="text-xs text-gray-600 mb-2">Preview (first 5 unique values):</p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {[...new Set(excelData.map(r => r[columnMapping.dlNameColumn]).filter(Boolean))].slice(0, 5).map((val, i) => (
// //                     <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
// //                       {val}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Owner Mapping (Optional) */}
// //           <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
// //             <div className="flex items-start justify-between mb-3">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-1">
// //                   Owner Column <span className="text-gray-400 text-xs">(Optional)</span>
// //                 </label>
// //                 <p className="text-xs text-gray-500">Select the column containing owner names</p>
// //               </div>
// //               {columnMapping.ownerColumn && (
// //                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
// //                   Mapped
// //                 </span>
// //               )}
// //             </div>
// //             <select
// //               value={columnMapping.ownerColumn}
// //               onChange={e => setColumnMapping(prev => ({ ...prev, ownerColumn: e.target.value }))}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="">-- Select Column (or leave empty) --</option>
// //               {excelColumns.map(col => (
// //                 <option key={col} value={col}>{col}</option>
// //               ))}
// //             </select>
// //             {columnMapping.ownerColumn && (
// //               <div className="mt-3 p-3 bg-white rounded border border-gray-200">
// //                 <p className="text-xs text-gray-600 mb-2">Preview (first 5 unique values):</p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {[...new Set(excelData.map(r => r[columnMapping.ownerColumn]).filter(Boolean))].slice(0, 5).map((val, i) => (
// //                     <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
// //                       {val}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Summary */}
// //         <div className="mt-6 p-4 bg-gray-100 rounded-lg">
// //           <h3 className="font-semibold text-sm text-gray-700 mb-2">Mapping Summary:</h3>
// //           <div className="space-y-1 text-sm">
// //             <div className="flex items-center space-x-2">
// //               <span className={columnMapping.jobProfileColumn ? "text-green-600" : "text-red-600"}>
// //                 {columnMapping.jobProfileColumn ? "✓" : "✗"}
// //               </span>
// //               <span className="text-gray-700">
// //                 Job Profiles: {columnMapping.jobProfileColumn ? `${columnMapping.jobProfileColumn} (${jobProfiles.length} unique)` : "Not mapped"}
// //               </span>
// //             </div>
// //             <div className="flex items-center space-x-2">
// //               <span className={columnMapping.dlNameColumn ? "text-green-600" : "text-gray-400"}>
// //                 {columnMapping.dlNameColumn ? "✓" : "○"}
// //               </span>
// //               <span className="text-gray-700">
// //                 DL Names: {columnMapping.dlNameColumn ? `${columnMapping.dlNameColumn} (${dlNames.length} unique)` : "Not mapped"}
// //               </span>
// //             </div>
// //             <div className="flex items-center space-x-2">
// //               <span className={columnMapping.ownerColumn ? "text-green-600" : "text-gray-400"}>
// //                 {columnMapping.ownerColumn ? "✓" : "○"}
// //               </span>
// //               <span className="text-gray-700">
// //                 Owners: {columnMapping.ownerColumn ? `${columnMapping.ownerColumn} (${owners.length} unique)` : "Not mapped"}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-6 flex justify-end">
// //           <button
// //             onClick={initializeMapping}
// //             disabled={!columnMapping.jobProfileColumn}
// //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
// //           >
// //             Continue to Mapping →
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // STEP 2: Profile-DL Mapping Interface
// //   return (
// //     <div className="p-6 bg-white rounded-xl shadow-md">
// //       <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-xl font-semibold">Step 2: Map Job Profiles to DLs & Owners</h2>
// //         <div className="space-x-2">
// //           <button
// //             onClick={() => setStep(1)}
// //             className="px-3 py-1 border rounded-lg hover:bg-gray-100"
// //           >
// //             ← Back to Column Mapping
// //           </button>
// //           <button
// //             onClick={handleSave}
// //             className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //           >
// //             Save Mapping
// //           </button>
// //         </div>
// //       </div>

// //       <div className="mb-4">
// //         <input
// //           type="text"
// //           placeholder="Search job profiles..."
// //           value={jobProfileSearch}
// //           onChange={e => setJobProfileSearch(e.target.value)}
// //           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// //         />
// //         <p className="text-sm text-gray-500 mt-1">
// //           Showing {filteredJobProfiles.length} of {mapping.length} job profiles
// //         </p>
// //       </div>

// //       <div className="space-y-4">
// //         {filteredJobProfiles.map(row => (
// //           <div key={row.JobProfile} className="border rounded-lg p-4 bg-gray-50">
// //             <div className="flex items-center justify-between mb-3">
// //               <h3 className="font-semibold text-lg">{row.JobProfile}</h3>
// //               <div className="flex items-center space-x-2">
// //                 <label className="text-sm text-gray-600">Owner:</label>
// //                 <select
// //                   className="border rounded px-2 py-1 text-sm"
// //                   value={row.Owner}
// //                   onChange={e => updateOwner(row.JobProfile, e.target.value)}
// //                 >
// //                   {owners.map(o => (
// //                     <option key={o}>{o}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="flex flex-wrap gap-2">
// //               {row.DLs.length === 0 ? (
// //                 <span className="text-sm text-gray-500 italic">No DLs assigned</span>
// //               ) : (
// //                 row.DLs.map(dl => (
// //                   <span key={dl} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center space-x-1">
// //                     <span>{dl}</span>
// //                     <button onClick={() => toggleDL(row.JobProfile, dl)} className="hover:text-blue-900">×</button>
// //                   </span>
// //                 ))
// //               )}
// //               {dlNames.length > 0 && (
// //                 <button
// //                   onClick={() => setSelectedProfile(selectedProfile === row.JobProfile ? null : row.JobProfile)}
// //                   className="px-2 py-1 border border-dashed border-gray-400 rounded text-sm text-gray-600 hover:bg-gray-100"
// //                 >
// //                   + Add DLs
// //                 </button>
// //               )}
// //             </div>

// //             {selectedProfile === row.JobProfile && dlNames.length > 0 && (
// //               <div className="mt-3 p-3 bg-white rounded border">
// //                 <input
// //                   type="text"
// //                   placeholder="Search DLs..."
// //                   value={searchTerm}
// //                   onChange={e => setSearchTerm(e.target.value)}
// //                   className="w-full px-3 py-2 border rounded mb-2"
// //                 />
// //                 <div className="max-h-48 overflow-y-auto space-y-1">
// //                   {filteredDLs.slice(0, 50).map(dl => (
// //                     <label key={dl} className="flex items-center space-x-2 p-1 hover:bg-gray-50 cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={row.DLs.includes(dl)}
// //                         onChange={() => toggleDL(row.JobProfile, dl)}
// //                       />
// //                       <span className="text-sm">{dl}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useMemo } from "react";

// export default function DLProfileMapper({ excelData, onSave, onBack }) {
//   const excelColumns = excelData.length > 0 ? Object.keys(excelData[0]) : [];
  
//   const [columnMapping, setColumnMapping] = useState({
//     dlNameColumn: "",
//     jobProfileColumn: "",
//     ownerColumn: ""
//   });

//   const { dlNames, jobProfiles, owners } = useMemo(() => {
//     const dlNames = columnMapping.dlNameColumn 
//       ? [...new Set(excelData.map(r => r[columnMapping.dlNameColumn]).filter(Boolean))]
//       : [];
    
//     const jobProfiles = columnMapping.jobProfileColumn
//       ? [...new Set(excelData.map(r => r[columnMapping.jobProfileColumn]).filter(Boolean))]
//       : [];
    
//     const owners = columnMapping.ownerColumn
//       ? [...new Set(excelData.map(r => r[columnMapping.ownerColumn]).filter(Boolean))]
//       : ["Default Owner"];

//     return { dlNames, jobProfiles, owners };
//   }, [excelData, columnMapping]);

//   const [mapping, setMapping] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [ownerSearchTerm, setOwnerSearchTerm] = useState("");
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [selectedProfileForOwner, setSelectedProfileForOwner] = useState(null);

//   // Auto-initialize mapping when jobProfileColumn is selected
//   useMemo(() => {
//     if (jobProfiles.length > 0) {
//       setMapping(
//         jobProfiles.map(profile => ({
//           JobProfile: profile,
//           DLs: [],
//           Owners: []
//         }))
//       );
//     }
//   }, [jobProfiles, owners]);

//   const filteredDLs = searchTerm 
//     ? dlNames.filter(dl => dl.toLowerCase().includes(searchTerm.toLowerCase()))
//     : dlNames;

//   const filteredOwners = ownerSearchTerm 
//     ? owners.filter(owner => owner.toLowerCase().includes(ownerSearchTerm.toLowerCase()))
//     : owners;

//   const toggleDL = (profile, dlName) => {
//     setMapping(prev =>
//       prev.map(row => {
//         if (row.JobProfile !== profile) return row;
//         const exists = row.DLs.includes(dlName);
//         return {
//           ...row,
//           DLs: exists ? row.DLs.filter(d => d !== dlName) : [...row.DLs, dlName]
//         };
//       })
//     );
//   };

//   const updateOwner = (profile, ownerName) => {
//     setMapping(prev =>
//       prev.map(row => {
//         if (row.JobProfile !== profile) return row;
//         const exists = row.Owners.includes(ownerName);
//         return {
//           ...row,
//           Owners: exists ? row.Owners.filter(o => o !== ownerName) : [...row.Owners, ownerName]
//         };
//       })
//     );
//   };

//   const handleSave = () => {
//     if (!columnMapping.jobProfileColumn || !columnMapping.dlNameColumn || !columnMapping.ownerColumn) {
//       alert("Please select all three columns: Job Profile, DL Name, and Owner");
//       return;
//     }
//     onSave({
//       columnMapping,
//       profileMapping: mapping
//     });
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold">Map Job Profiles to DLs</h2>
//         <div className="space-x-2">
//           <button onClick={onBack} className="px-4 py-2 border rounded-lg hover:bg-gray-100">
//             Back
//           </button>
//           <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             Save
//           </button>
//         </div>
//       </div>

//       {/* Column Selection */}
//       <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Job Profile Column <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={columnMapping.jobProfileColumn}
//             onChange={e => setColumnMapping(prev => ({ ...prev, jobProfileColumn: e.target.value }))}
//             className="w-full px-3 py-2 border rounded-lg"
//           >
//             <option value="">Select...</option>
//             {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">
//             DL Name Column <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={columnMapping.dlNameColumn}
//             onChange={e => setColumnMapping(prev => ({ ...prev, dlNameColumn: e.target.value }))}
//             className="w-full px-3 py-2 border rounded-lg"
//           >
//             <option value="">Select...</option>
//             {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Owner Column <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={columnMapping.ownerColumn}
//             onChange={e => setColumnMapping(prev => ({ ...prev, ownerColumn: e.target.value }))}
//             className="w-full px-3 py-2 border rounded-lg"
//           >
//             <option value="">Select...</option>
//             {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* Mapping List */}
//       {mapping.length > 0 ? (
//         <div className="space-y-3">
//           {mapping.map(row => (
//             <div key={row.JobProfile} className="border rounded-lg p-4 bg-gray-50">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-semibold">{row.JobProfile}</h3>
//               </div>

//               {/* Owners Section */}
//               <div className="mb-3">
//                 <label className="text-sm font-medium text-gray-600 block mb-1">Owners:</label>
//                 <div className="flex flex-wrap gap-2">
//                   {row.Owners.length === 0 ? (
//                     <span className="text-sm text-gray-500 italic">No owners</span>
//                   ) : (
//                     row.Owners.map(owner => (
//                       <span key={owner} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm flex items-center gap-1">
//                         {owner}
//                         <button onClick={() => updateOwner(row.JobProfile, owner)} className="hover:text-orange-900">×</button>
//                       </span>
//                     ))
//                   )}
//                   <button
//                     onClick={() => setSelectedProfileForOwner(selectedProfileForOwner === row.JobProfile ? null : row.JobProfile)}
//                     className="px-2 py-1 border border-dashed rounded text-sm hover:bg-gray-100"
//                   >
//                     + Add Owner
//                   </button>
//                 </div>

//                 {selectedProfileForOwner === row.JobProfile && (
//                   <div className="mt-3 p-3 bg-white rounded border">
//                     <input
//                       type="text"
//                       placeholder="Search owners..."
//                       value={ownerSearchTerm}
//                       onChange={e => setOwnerSearchTerm(e.target.value)}
//                       className="w-full px-3 py-2 border rounded mb-2"
//                     />
//                     <div className="max-h-48 overflow-y-auto space-y-1">
//                       {filteredOwners.map(owner => (
//                         <label key={owner} className="flex items-center gap-2 p-1 hover:bg-gray-50 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={row.Owners.includes(owner)}
//                             onChange={() => updateOwner(row.JobProfile, owner)}
//                           />
//                           <span className="text-sm">{owner}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* DLs Section */}
//               <div>
//                 <label className="text-sm font-medium text-gray-600 block mb-1">DLs:</label>
//                 <div className="flex flex-wrap gap-2">
//                   {row.DLs.length === 0 ? (
//                     <span className="text-sm text-gray-500 italic">No DLs</span>
//                   ) : (
//                     row.DLs.map(dl => (
//                       <span key={dl} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center gap-1">
//                         {dl}
//                         <button onClick={() => toggleDL(row.JobProfile, dl)} className="hover:text-blue-900">×</button>
//                       </span>
//                     ))
//                   )}
//                   {dlNames.length > 0 && (
//                     <button
//                       onClick={() => setSelectedProfile(selectedProfile === row.JobProfile ? null : row.JobProfile)}
//                       className="px-2 py-1 border border-dashed rounded text-sm hover:bg-gray-100"
//                     >
//                       + Add DL
//                     </button>
//                   )}
//                 </div>

//                 {selectedProfile === row.JobProfile && dlNames.length > 0 && (
//                   <div className="mt-3 p-3 bg-white rounded border">
//                     <input
//                       type="text"
//                       placeholder="Search DLs..."
//                       value={searchTerm}
//                       onChange={e => setSearchTerm(e.target.value)}
//                       className="w-full px-3 py-2 border rounded mb-2"
//                     />
//                     <div className="max-h-48 overflow-y-auto space-y-1">
//                       {filteredDLs.map(dl => (
//                         <label key={dl} className="flex items-center gap-2 p-1 hover:bg-gray-50 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={row.DLs.includes(dl)}
//                             onChange={() => toggleDL(row.JobProfile, dl)}
//                           />
//                           <span className="text-sm">{dl}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 text-gray-500">
//           Select Job Profile column to start mapping
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useMemo } from "react";

export default function DLProfileMapper({ excelData, onSave, onBack }) {
  const excelColumns = excelData.length > 0 ? Object.keys(excelData[0]) : [];
  
  const [columnMapping, setColumnMapping] = useState({
    dlNameColumn: "",
    jobProfileColumn: "",
    ownerColumn: ""
  });

  const { dlNames, jobProfiles, owners } = useMemo(() => {
    const dlNames = columnMapping.dlNameColumn 
      ? [...new Set(excelData.map(r => r[columnMapping.dlNameColumn]).filter(Boolean))]
      : [];
    
    const jobProfiles = columnMapping.jobProfileColumn
      ? [...new Set(excelData.map(r => r[columnMapping.jobProfileColumn]).filter(Boolean))]
      : [];
    
    const owners = columnMapping.ownerColumn
      ? [...new Set(excelData.map(r => r[columnMapping.ownerColumn]).filter(Boolean))]
      : [];

    return { dlNames, jobProfiles, owners };
  }, [excelData, columnMapping]);

  // Changed to arrays to support multiple selections
  const [selectedJobProfiles, setSelectedJobProfiles] = useState([]);
  const [selectedDLs, setSelectedDLs] = useState([]);
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [mapping, setMapping] = useState([]);

  // Toggle selection for multiple items
  const toggleSelection = (type, value) => {
    if (type === 'profile') {
      setSelectedJobProfiles(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === 'dl') {
      setSelectedDLs(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === 'owner') {
      setSelectedOwners(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  const handleMapping = () => {
    if (selectedJobProfiles.length === 0 || selectedDLs.length === 0 || selectedOwners.length === 0) {
      alert("Please select at least one item from each column (Job Profile, DL, and Owner)");
      return;
    }

    // Create all combinations
    const newMappings = [];
    selectedJobProfiles.forEach(profile => {
      selectedDLs.forEach(dl => {
        selectedOwners.forEach(owner => {
          // Check if this exact mapping already exists
          const exists = mapping.some(m => 
            m.JobProfile === profile && m.DL === dl && m.Owner === owner
          );
          if (!exists) {
            newMappings.push({
              JobProfile: profile,
              DL: dl,
              Owner: owner
            });
          }
        });
      });
    });

    if (newMappings.length > 0) {
      setMapping([...mapping, ...newMappings]);
      // Clear selections after mapping
      setSelectedJobProfiles([]);
      setSelectedDLs([]);
      setSelectedOwners([]);
    } else {
      alert("All selected combinations already exist in mappings");
    }
  };

  const removeMapping = (index) => {
    setMapping(mapping.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!columnMapping.jobProfileColumn || !columnMapping.dlNameColumn || !columnMapping.ownerColumn) {
      alert("Please select all three columns: Job Profile, DL Name, and Owner");
      return;
    }
    if (mapping.length === 0) {
      alert("Please create at least one mapping");
      return;
    }
    onSave({
      columnMapping,
      profileMapping: mapping
    });
  };

  const getMappingCount = (type, value) => {
    if (type === 'profile') return mapping.filter(m => m.JobProfile === value).length;
    if (type === 'dl') return mapping.filter(m => m.DL === value).length;
    if (type === 'owner') return mapping.filter(m => m.Owner === value).length;
    return 0;
  };

  const clearSelections = () => {
    setSelectedJobProfiles([]);
    setSelectedDLs([]);
    setSelectedOwners([]);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Fixed Header */}
      <div className="bg-white shadow-md border-b border-gray-200 px-6 py-3 rounded-t-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-gray-800">DL Profile Mapper</h2>
          <div className="space-x-3">
            <button 
              onClick={onBack} 
              className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition font-medium text-sm"
            >
              ← Back
            </button>
            <button 
              onClick={handleSave} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg text-sm"
            >
              💾 Save Mapping
            </button>
          </div>
        </div>

        {/* Column Selection - Compact */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              📋 Job Profile Column
            </label>
            <select
              value={columnMapping.jobProfileColumn}
              onChange={e => setColumnMapping(prev => ({ ...prev, jobProfileColumn: e.target.value }))}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select column...</option>
              {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
            </select>
          </div>

          <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              📧 DL Name Column
            </label>
            <select
              value={columnMapping.dlNameColumn}
              onChange={e => setColumnMapping(prev => ({ ...prev, dlNameColumn: e.target.value }))}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select column...</option>
              {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
            </select>
          </div>

          <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              👤 Owner Column
            </label>
            <select
              value={columnMapping.ownerColumn}
              onChange={e => setColumnMapping(prev => ({ ...prev, ownerColumn: e.target.value }))}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select column...</option>
              {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="mt-4">
        {columnMapping.jobProfileColumn && columnMapping.dlNameColumn && columnMapping.ownerColumn ? (
          <div className="grid grid-cols-4 gap-3" style={{ height: 'calc(100vh - 220px)' }}>
            {/* Job Profiles Box */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2">
                <h3 className="font-bold text-sm">Job Profiles</h3>
                <p className="text-xs opacity-90">{jobProfiles.length} items · {selectedJobProfiles.length} selected</p>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {jobProfiles.map(profile => {
                  const count = getMappingCount('profile', profile);
                  const isSelected = selectedJobProfiles.includes(profile);
                  return (
                    <div
                      key={profile}
                      onClick={() => toggleSelection('profile', profile)}
                      className={`p-2 mb-1 rounded cursor-pointer transition ${
                        isSelected
                          ? 'bg-purple-100 border-2 border-purple-500 shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-gray-800 flex-1 mr-2 break-words">
                          {profile}
                        </div>
                        {count > 0 && (
                          <span className="flex-shrink-0 bg-purple-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                {jobProfiles.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-xs">No data</div>
                )}
              </div>
            </div>

            {/* DL Names Box */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2">
                <h3 className="font-bold text-sm">DL Names</h3>
                <p className="text-xs opacity-90">{dlNames.length} items · {selectedDLs.length} selected</p>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {dlNames.map(dl => {
                  const count = getMappingCount('dl', dl);
                  const isSelected = selectedDLs.includes(dl);
                  return (
                    <div
                      key={dl}
                      onClick={() => toggleSelection('dl', dl)}
                      className={`p-2 mb-1 rounded cursor-pointer transition ${
                        isSelected
                          ? 'bg-blue-100 border-2 border-blue-500 shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-gray-800 flex-1 mr-2 break-words">
                          {dl}
                        </div>
                        {count > 0 && (
                          <span className="flex-shrink-0 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                {dlNames.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-xs">No data</div>
                )}
              </div>
            </div>

            {/* Owners Box */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-2">
                <h3 className="font-bold text-sm">Owners</h3>
                <p className="text-xs opacity-90">{owners.length} items · {selectedOwners.length} selected</p>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {owners.map(owner => {
                  const count = getMappingCount('owner', owner);
                  const isSelected = selectedOwners.includes(owner);
                  return (
                    <div
                      key={owner}
                      onClick={() => toggleSelection('owner', owner)}
                      className={`p-2 mb-1 rounded cursor-pointer transition ${
                        isSelected
                          ? 'bg-green-100 border-2 border-green-500 shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-gray-800 flex-1 mr-2 break-words">
                          {owner}
                        </div>
                        {count > 0 && (
                          <span className="flex-shrink-0 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                {owners.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-xs">No data</div>
                )}
              </div>
            </div>

            {/* Mapping Box */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2">
                <h3 className="font-bold text-sm">Mappings</h3>
                <p className="text-xs opacity-90">{mapping.length} created</p>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {/* Action Buttons */}
                <div className="space-y-2 mb-2">
                  <button
                    onClick={handleMapping}
                    disabled={selectedJobProfiles.length === 0 || selectedDLs.length === 0 || selectedOwners.length === 0}
                    className={`w-full py-2 px-3 rounded font-medium transition text-xs ${
                      selectedJobProfiles.length > 0 && selectedDLs.length > 0 && selectedOwners.length > 0
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    + Create Mapping ({selectedJobProfiles.length} × {selectedDLs.length} × {selectedOwners.length})
                  </button>
                  
                  {(selectedJobProfiles.length > 0 || selectedDLs.length > 0 || selectedOwners.length > 0) && (
                    <button
                      onClick={clearSelections}
                      className="w-full py-1 px-3 rounded font-medium transition text-xs bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                {/* Current Selection Preview */}
                {(selectedJobProfiles.length > 0 || selectedDLs.length > 0 || selectedOwners.length > 0) && (
                  <div className="mb-2 p-2 bg-gray-50 rounded border border-gray-300">
                    <div className="text-xs font-semibold text-gray-500 mb-1">Selected:</div>
                    {selectedJobProfiles.length > 0 && (
                      <div className="text-xs mb-1 px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        📋 {selectedJobProfiles.length} profile(s)
                      </div>
                    )}
                    {selectedDLs.length > 0 && (
                      <div className="text-xs mb-1 px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        📧 {selectedDLs.length} DL(s)
                      </div>
                    )}
                    {selectedOwners.length > 0 && (
                      <div className="text-xs mb-1 px-2 py-1 bg-green-100 text-green-700 rounded">
                        👤 {selectedOwners.length} owner(s)
                      </div>
                    )}
                  </div>
                )}

                {/* Mappings List */}
                <div className="space-y-1">
                  {mapping.map((m, idx) => (
                    <div key={idx} className="bg-gray-50 p-2 rounded border border-gray-200">
                      <div className="flex items-start justify-between mb-1">
                        <div className="text-xs font-semibold text-gray-500">#{idx + 1}</div>
                        <button
                          onClick={() => removeMapping(idx)}
                          className="text-red-500 hover:text-red-700 font-bold text-sm leading-none"
                        >
                          ×
                        </button>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded break-words">
                          📋 {m.JobProfile}
                        </div>
                        <div className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded break-words">
                          📧 {m.DL}
                        </div>
                        <div className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded break-words">
                          👤 {m.Owner}
                        </div>
                      </div>
                    </div>
                  ))}
                  {mapping.length === 0 && (
                    <div className="text-center py-4 text-gray-400 text-xs">
                      No mappings yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center bg-white rounded-lg shadow" style={{ height: 'calc(100vh - 220px)' }}>
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Select All Three Columns to Start
              </h3>
              <p className="text-sm text-gray-500">
                Choose columns from the dropdowns above
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}