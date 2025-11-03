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
//       : [];

//     return { dlNames, jobProfiles, owners };
//   }, [excelData, columnMapping]);

//   // Changed to arrays to support multiple selections
//   const [selectedJobProfiles, setSelectedJobProfiles] = useState([]);
//   const [selectedDLs, setSelectedDLs] = useState([]);
//   const [selectedOwners, setSelectedOwners] = useState([]);
//   const [mapping, setMapping] = useState([]);

//   // Toggle selection for multiple items
//   const toggleSelection = (type, value) => {
//     if (type === 'profile') {
//       setSelectedJobProfiles(prev => 
//         prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
//       );
//     } else if (type === 'dl') {
//       setSelectedDLs(prev => 
//         prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
//       );
//     } else if (type === 'owner') {
//       setSelectedOwners(prev => 
//         prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
//       );
//     }
//   };

//   const handleMapping = () => {
//     if (selectedJobProfiles.length === 0 || selectedDLs.length === 0 || selectedOwners.length === 0) {
//       alert("Please select at least one item from each column (Job Profile, DL, and Owner)");
//       return;
//     }

//     // Create all combinations
//     const newMappings = [];
//     selectedJobProfiles.forEach(profile => {
//       selectedDLs.forEach(dl => {
//         selectedOwners.forEach(owner => {
//           // Check if this exact mapping already exists
//           const exists = mapping.some(m => 
//             m.JobProfile === profile && m.DL === dl && m.Owner === owner
//           );
//           if (!exists) {
//             newMappings.push({
//               JobProfile: profile,
//               DL: dl,
//               Owner: owner
//             });
//           }
//         });
//       });
//     });

//     if (newMappings.length > 0) {
//       setMapping([...mapping, ...newMappings]);
//       // Clear selections after mapping
//       setSelectedJobProfiles([]);
//       setSelectedDLs([]);
//       setSelectedOwners([]);
//     } else {
//       alert("All selected combinations already exist in mappings");
//     }
//   };

//   const removeMapping = (index) => {
//     setMapping(mapping.filter((_, i) => i !== index));
//   };

//   const handleSave = () => {
//     if (!columnMapping.jobProfileColumn || !columnMapping.dlNameColumn || !columnMapping.ownerColumn) {
//       alert("Please select all three columns: Job Profile, DL Name, and Owner");
//       return;
//     }
//     if (mapping.length === 0) {
//       alert("Please create at least one mapping");
//       return;
//     }
//     onSave({
//       columnMapping,
//       profileMapping: mapping
//     });
//   };

//   const getMappingCount = (type, value) => {
//     if (type === 'profile') return mapping.filter(m => m.JobProfile === value).length;
//     if (type === 'dl') return mapping.filter(m => m.DL === value).length;
//     if (type === 'owner') return mapping.filter(m => m.Owner === value).length;
//     return 0;
//   };

//   const clearSelections = () => {
//     setSelectedJobProfiles([]);
//     setSelectedDLs([]);
//     setSelectedOwners([]);
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       {/* Fixed Header */}
//       <div className="bg-white shadow-md border-b border-gray-200 px-6 py-3 rounded-t-lg">
//         <div className="flex items-center justify-between mb-3">
//           <h2 className="text-2xl font-bold text-gray-800">DL Profile Mapper</h2>
//           <div className="space-x-3">
//             <button 
//               onClick={onBack} 
//               className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition font-medium text-sm"
//             >
//               ← Back
//             </button>
//             <button 
//               onClick={handleSave} 
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg text-sm"
//             >
//               💾 Save Mapping
//             </button>
//           </div>
//         </div>

//         {/* Column Selection - Compact */}
//         <div className="grid grid-cols-3 gap-3">
//           <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
//             <label className="block text-xs font-semibold text-gray-700 mb-1">
//               📋 Job Profile Column
//             </label>
//             <select
//               value={columnMapping.jobProfileColumn}
//               onChange={e => setColumnMapping(prev => ({ ...prev, jobProfileColumn: e.target.value }))}
//               className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select column...</option>
//               {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
//             </select>
//           </div>

//           <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
//             <label className="block text-xs font-semibold text-gray-700 mb-1">
//               📧 DL Name Column
//             </label>
//             <select
//               value={columnMapping.dlNameColumn}
//               onChange={e => setColumnMapping(prev => ({ ...prev, dlNameColumn: e.target.value }))}
//               className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select column...</option>
//               {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
//             </select>
//           </div>

//           <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
//             <label className="block text-xs font-semibold text-gray-700 mb-1">
//               👤 Owner Column
//             </label>
//             <select
//               value={columnMapping.ownerColumn}
//               onChange={e => setColumnMapping(prev => ({ ...prev, ownerColumn: e.target.value }))}
//               className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select column...</option>
//               {excelColumns.map(col => <option key={col} value={col}>{col}</option>)}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Scrollable Content Area */}
//       <div className="mt-4">
//         {columnMapping.jobProfileColumn && columnMapping.dlNameColumn && columnMapping.ownerColumn ? (
//           <div className="grid grid-cols-4 gap-3" style={{ height: 'calc(100vh - 220px)' }}>
//             {/* Job Profiles Box */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
//               <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2">
//                 <h3 className="font-bold text-sm">Job Profiles</h3>
//                 <p className="text-xs opacity-90">{jobProfiles.length} items · {selectedJobProfiles.length} selected</p>
//               </div>
//               <div className="flex-1 overflow-y-auto p-2">
//                 {jobProfiles.map(profile => {
//                   const count = getMappingCount('profile', profile);
//                   const isSelected = selectedJobProfiles.includes(profile);
//                   return (
//                     <div
//                       key={profile}
//                       onClick={() => toggleSelection('profile', profile)}
//                       className={`p-2 mb-1 rounded cursor-pointer transition ${
//                         isSelected
//                           ? 'bg-purple-100 border-2 border-purple-500 shadow-sm'
//                           : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="text-xs font-medium text-gray-800 flex-1 mr-2 break-words">
//                           {profile}
//                         </div>
//                         {count > 0 && (
//                           <span className="flex-shrink-0 bg-purple-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                             {count}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//                 {jobProfiles.length === 0 && (
//                   <div className="text-center py-4 text-gray-400 text-xs">No data</div>
//                 )}
//               </div>
//             </div>

//             {/* DL Names Box */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
//               <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2">
//                 <h3 className="font-bold text-sm">DL Names</h3>
//                 <p className="text-xs opacity-90">{dlNames.length} items · {selectedDLs.length} selected</p>
//               </div>
//               <div className="flex-1 overflow-y-auto p-2">
//                 {dlNames.map(dl => {
//                   const count = getMappingCount('dl', dl);
//                   const isSelected = selectedDLs.includes(dl);
//                   return (
//                     <div
//                       key={dl}
//                       onClick={() => toggleSelection('dl', dl)}
//                       className={`p-2 mb-1 rounded cursor-pointer transition ${
//                         isSelected
//                           ? 'bg-blue-100 border-2 border-blue-500 shadow-sm'
//                           : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="text-xs font-medium text-gray-800 flex-1 mr-2 break-words">
//                           {dl}
//                         </div>
//                         {count > 0 && (
//                           <span className="flex-shrink-0 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                             {count}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//                 {dlNames.length === 0 && (
//                   <div className="text-center py-4 text-gray-400 text-xs">No data</div>
//                 )}
//               </div>
//             </div>

//             {/* Owners Box */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
//               <div className="flex-shrink-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-2">
//                 <h3 className="font-bold text-sm">Owners</h3>
//                 <p className="text-xs opacity-90">{owners.length} items · {selectedOwners.length} selected</p>
//               </div>
//               <div className="flex-1 overflow-y-auto p-2">
//                 {owners.map(owner => {
//                   const count = getMappingCount('owner', owner);
//                   const isSelected = selectedOwners.includes(owner);
//                   return (
//                     <div
//                       key={owner}
//                       onClick={() => toggleSelection('owner', owner)}
//                       className={`p-2 mb-1 rounded cursor-pointer transition ${
//                         isSelected
//                           ? 'bg-green-100 border-2 border-green-500 shadow-sm'
//                           : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="text-xs font-medium text-gray-800 flex-1 mr-2 break-words">
//                           {owner}
//                         </div>
//                         {count > 0 && (
//                           <span className="flex-shrink-0 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                             {count}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//                 {owners.length === 0 && (
//                   <div className="text-center py-4 text-gray-400 text-xs">No data</div>
//                 )}
//               </div>
//             </div>

//             {/* Mapping Box */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
//               <div className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2">
//                 <h3 className="font-bold text-sm">Mappings</h3>
//                 <p className="text-xs opacity-90">{mapping.length} created</p>
//               </div>
//               <div className="flex-1 overflow-y-auto p-2">
//                 {/* Action Buttons */}
//                 <div className="space-y-2 mb-2">
//                   <button
//                     onClick={handleMapping}
//                     disabled={selectedJobProfiles.length === 0 || selectedDLs.length === 0 || selectedOwners.length === 0}
//                     className={`w-full py-2 px-3 rounded font-medium transition text-xs ${
//                       selectedJobProfiles.length > 0 && selectedDLs.length > 0 && selectedOwners.length > 0
//                         ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow'
//                         : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     }`}
//                   >
//                     + Create Mapping ({selectedJobProfiles.length} × {selectedDLs.length} × {selectedOwners.length})
//                   </button>
                  
//                   {(selectedJobProfiles.length > 0 || selectedDLs.length > 0 || selectedOwners.length > 0) && (
//                     <button
//                       onClick={clearSelections}
//                       className="w-full py-1 px-3 rounded font-medium transition text-xs bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     >
//                       Clear Selection
//                     </button>
//                   )}
//                 </div>

//                 {/* Current Selection Preview */}
//                 {(selectedJobProfiles.length > 0 || selectedDLs.length > 0 || selectedOwners.length > 0) && (
//                   <div className="mb-2 p-2 bg-gray-50 rounded border border-gray-300">
//                     <div className="text-xs font-semibold text-gray-500 mb-1">Selected:</div>
//                     {selectedJobProfiles.length > 0 && (
//                       <div className="text-xs mb-1 px-2 py-1 bg-purple-100 text-purple-700 rounded">
//                         📋 {selectedJobProfiles.length} profile(s)
//                       </div>
//                     )}
//                     {selectedDLs.length > 0 && (
//                       <div className="text-xs mb-1 px-2 py-1 bg-blue-100 text-blue-700 rounded">
//                         📧 {selectedDLs.length} DL(s)
//                       </div>
//                     )}
//                     {selectedOwners.length > 0 && (
//                       <div className="text-xs mb-1 px-2 py-1 bg-green-100 text-green-700 rounded">
//                         👤 {selectedOwners.length} owner(s)
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Mappings List */}
//                 <div className="space-y-1">
//                   {mapping.map((m, idx) => (
//                     <div key={idx} className="bg-gray-50 p-2 rounded border border-gray-200">
//                       <div className="flex items-start justify-between mb-1">
//                         <div className="text-xs font-semibold text-gray-500">#{idx + 1}</div>
//                         <button
//                           onClick={() => removeMapping(idx)}
//                           className="text-red-500 hover:text-red-700 font-bold text-sm leading-none"
//                         >
//                           ×
//                         </button>
//                       </div>
//                       <div className="space-y-1">
//                         <div className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded break-words">
//                           📋 {m.JobProfile}
//                         </div>
//                         <div className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded break-words">
//                           📧 {m.DL}
//                         </div>
//                         <div className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded break-words">
//                           👤 {m.Owner}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {mapping.length === 0 && (
//                     <div className="text-center py-4 text-gray-400 text-xs">
//                       No mappings yet
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center bg-white rounded-lg shadow" style={{ height: 'calc(100vh - 220px)' }}>
//             <div className="text-center">
//               <div className="text-4xl mb-2">📊</div>
//               <h3 className="text-lg font-semibold text-gray-700 mb-1">
//                 Select All Three Columns to Start
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Choose columns from the dropdowns above
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

export default function DLProfileMapper({ excelData, onSave, onBack }) {
  const excelColumns = excelData.length > 0 ? Object.keys(excelData[0]) : [];
  
  const predefinedFields = [
    { id: 'DistributionList', label: 'Distribution List'},
    { id: 'JobProfile', label: 'Job Profile'},
    { id: 'SHSetting', label: 'SH Setting'}
  ];

  const [columnMapping, setColumnMapping] = useState({});
  const [selectedField, setSelectedField] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFieldClick = (fieldId) => {
    setSelectedField(fieldId);
  };

  const handleColumnClick = (column) => {
    if (!selectedField) {
      alert("Please select a predefined field first");
      return;
    }

    // Check if column is already mapped to another field
    const alreadyMappedTo = Object.keys(columnMapping).find(
      key => columnMapping[key] === column
    );
    
    if (alreadyMappedTo && alreadyMappedTo !== selectedField) {
      alert(`Column "${column}" is already mapped to "${alreadyMappedTo}"`);
      return;
    }

    setColumnMapping(prev => ({
      ...prev,
      [selectedField]: column
    }));
    
    setSelectedField(null);
  };

  const removeMapping = (fieldId) => {
    setColumnMapping(prev => {
      const newMapping = { ...prev };
      delete newMapping[fieldId];
      return newMapping;
    });
  };

  const handleNext = () => {
    if (Object.keys(columnMapping).length === 0) {
      alert("Please create at least one mapping");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    onSave(columnMapping);
  };

  const handleBackFromConfirmation = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Column Mappings</h2>
            <p className="text-gray-600 mb-6">Please review your mappings before proceeding:</p>
            
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Predefined Field</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold">→</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Excel Column</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(columnMapping).map(([field, column], idx) => {
                    const fieldInfo = predefinedFields.find(f => f.id === field);
                    return (
                      <tr key={field} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-800">{fieldInfo?.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-blue-500 font-bold text-xl">→</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                            {column}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBackFromConfirmation}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                ← Back to Edit
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-lg"
              >
                ✓ Confirm & Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white shadow-md rounded-lg px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Column Mapper</h2>
              <p className="text-sm text-gray-600 mt-1">Map your Excel columns to predefined fields</p>
            </div>
            <div className="space-x-3">
              <button 
                onClick={onBack} 
                className="px-5 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                ← Back
              </button>
              <button 
                onClick={handleNext} 
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg"
              >
                Next: Review Mappings →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {selectedField && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-800 font-medium">
              Now click an Excel column to map it to "{predefinedFields.find(f => f.id === selectedField)?.label}"
            </p>
          </div>
        </div>
      )}

      {/* Main Mapping Area */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Predefined Fields Box */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-3 rounded-t-lg">
              <h3 className="font-bold text-lg">Predefined Fields</h3>
              <p className="text-sm opacity-90">Click a field to start mapping</p>
            </div>
            <div className="p-4 space-y-3">
              {predefinedFields.map(field => {
                const isMapped = columnMapping[field.id];
                const isSelected = selectedField === field.id;
                
                return (
                  <div
                    key={field.id}
                    onClick={() => !isMapped && handleFieldClick(field.id)}
                    className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : isMapped
                        ? 'border-green-400 bg-green-50 cursor-default'
                        : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold text-gray-800">{field.label}</div>
                          {isMapped && (
                            <div className="text-xs text-green-600 font-medium mt-1">
                              ✓ Mapped to: {columnMapping[field.id]}
                            </div>
                          )}
                        </div>
                      </div>
                      {isMapped && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeMapping(field.id);
                          }}
                          className="text-red-500 hover:text-red-700 font-bold text-xl px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Excel Columns Box */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-t-lg">
              <h3 className="font-bold text-lg">Excel Columns</h3>
              <p className="text-sm opacity-90">{excelColumns.length} columns available</p>
            </div>
            <div className="p-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {excelColumns.map(column => {
                  const mappedTo = Object.keys(columnMapping).find(
                    key => columnMapping[key] === column
                  );
                  const isClickable = selectedField && !mappedTo;
                  
                  return (
                    <div
                      key={column}
                      onClick={() => isClickable && handleColumnClick(column)}
                      className={`p-3 rounded-lg border-2 transition ${
                        mappedTo
                          ? 'border-green-400 bg-green-50 cursor-default'
                          : isClickable
                          ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                          : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-medium text-gray-800">
                          {column}
                        </span>
                        {mappedTo && (
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">
                            → {predefinedFields.find(f => f.id === mappedTo)?.label}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Current Mappings Summary */}
        {Object.keys(columnMapping).length > 0 && (
          <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-5">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Current Mappings ({Object.keys(columnMapping).length})</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(columnMapping).map(([field, column]) => {
                const fieldInfo = predefinedFields.find(f => f.id === field);
                return (
                  <div key={field} className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-300">
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={() => removeMapping(field)}
                        className="text-red-500 hover:text-red-700 font-bold text-lg"
                      >
                        ×
                      </button>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{fieldInfo?.label}</div>
                    <div className="text-blue-600 font-bold text-center text-lg">→</div>
                    <div className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 text-center">
                      {column}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}