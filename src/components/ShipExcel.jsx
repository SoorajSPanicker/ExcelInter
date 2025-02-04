
// import React, { useRef, useState } from 'react';
// import * as XLSX from 'xlsx';

// function ShipExcel() {
//     const fileInputRef = useRef(null);
//     const [scheduleData, setScheduleData] = useState([]);

//     const processExcelData = (rawData, workbook) => {
//         const schedule = [];
//         let currentPlace = '';

//         // Get the first sheet and merged cells info
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const merges = sheet['!merges'] || [];

//         // Process month headers
//         const months = [];
//         rawData[0].forEach((cell, index) => {
//             if (cell && typeof cell === 'string' && cell.includes(',')) {
//                 months.push({
//                     name: cell.split(',')[0],
//                     startIndex: index
//                 });
//             }
//         });

//         // Helper function to get month for a column index
//         const getMonthForColumn = (colIndex) => {
//             for (let i = months.length - 1; i >= 0; i--) {
//                 if (colIndex >= months[i].startIndex) {
//                     return months[i].name;
//                 }
//             }
//             return months[0].name;
//         };

//         // Helper function to find merge range for a cell
//         const findMergeRange = (rowIndex, colIndex) => {
//             const merge = merges.find(m =>
//                 rowIndex >= m.s.r && rowIndex <= m.e.r &&
//                 colIndex >= m.s.c && colIndex <= m.e.c
//             );
//             return merge ? {
//                 startCol: merge.s.c,
//                 endCol: merge.e.c
//             } : null;
//         };

//         // Process each row
//         rawData.forEach((row, rowIndex) => {
//             if (rowIndex > 2) {
//                 // Update current place if there's a value in first column
//                 if (row[0] && row[0].trim() && !row[0].startsWith(' ')) {
//                     currentPlace = row[0].trim();
//                 }

//                 if (currentPlace) {
//                     // Look for projects in the row
//                     for (let colIndex = 1; colIndex < row.length; colIndex++) {
//                         const cell = row[colIndex];
//                         if (cell && typeof cell === 'string' && cell.trim()) {
//                             const projectCode = cell.trim();

//                             // Find merge range for this cell
//                             const mergeRange = findMergeRange(rowIndex, colIndex);

//                             if (mergeRange) {
//                                 const startMonth = getMonthForColumn(mergeRange.startCol);
//                                 const endMonth = getMonthForColumn(mergeRange.endCol);
//                                 const startDate = rawData[1][mergeRange.startCol];
//                                 const endDate = rawData[1][mergeRange.endCol];
//                                 const startDay = rawData[2][mergeRange.startCol];
//                                 const endDay = rawData[2][mergeRange.endCol];

//                                 // Calculate weekdays
//                                 let weekdayCount = 0;
//                                 for (let i = mergeRange.startCol; i <= mergeRange.endCol; i++) {
//                                     const day = rawData[2][i];
//                                     if (day && day !== 'S') {
//                                         weekdayCount++;
//                                     }
//                                 }

//                                 // Find or create place entry
//                                 let placeEntry = schedule.find(p => p.place === currentPlace);
//                                 if (!placeEntry) {
//                                     placeEntry = {
//                                         place: currentPlace,
//                                         projects: []
//                                     };
//                                     schedule.push(placeEntry);
//                                 }

//                                 // Add project
//                                 placeEntry.projects.push({
//                                     code: projectCode,
//                                     startDate: `${startMonth} ${startDate} (${startDay})`,
//                                     endDate: `${endMonth} ${endDate} (${endDay})`,
//                                     weekdays: weekdayCount
//                                 });

//                                 // Skip to end of merge range
//                                 colIndex = mergeRange.endCol;
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         console.log(schedule);

//         setScheduleData(schedule);
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             const data = new Uint8Array(event.target.result);
//             const workbook = XLSX.read(data, {
//                 type: 'array',
//                 cellStyles: true,
//                 cellNF: true,
//                 cellDates: true
//             });
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];
//             const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//             processExcelData(parsedData, workbook);
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     return (
//         <div>
//             <div className="mb-4">
//                 <label className="block mb-2">Choose Excel File</label>
//                 <input
//                     type="file"
//                     ref={fileInputRef}
//                     accept=".xls,.xlsx"
//                     onChange={handleFileUpload}
//                     className="border p-2 rounded"
//                 />
//             </div>

//             {scheduleData.length > 0 && (
//                 <div className="overflow-x-auto">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border p-2 bg-gray-100">Place</th>
//                                 <th className="border p-2 bg-gray-100">Project</th>
//                                 <th className="border p-2 bg-gray-100">Start Date</th>
//                                 <th className="border p-2 bg-gray-100">End Date</th>
//                                 <th className="border p-2 bg-gray-100">Duration (Weekdays)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {scheduleData.map((place, placeIndex) => (
//                                 place.projects.map((project, projectIndex) => (
//                                     <tr key={`${placeIndex}-${projectIndex}`}>
//                                         {projectIndex === 0 ? (
//                                             <td rowSpan={place.projects.length} className="border p-2">
//                                                 {place.place}
//                                             </td>
//                                         ) : null}
//                                         <td className="border p-2">{project.code}</td>
//                                         <td className="border p-2">{project.startDate}</td>
//                                         <td className="border p-2">{project.endDate}</td>
//                                         <td className="border p-2 text-center">{project.weekdays}</td>
//                                     </tr>
//                                 ))
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ShipExcel;


// import React, { useEffect, useRef, useState } from 'react';
// import * as XLSX from 'xlsx';
// import { v4 as uuidv4 } from 'uuid';
// import ExcelInterface from './ExcelInterface';

// function ShipExcel() {
//     const fileInputRef = useRef(null);
//     const schInputRef = useRef([]);
//     const [scheduleData, setScheduleData] = useState([]);
//     const [sdata,setsdata] = useState([]);

//     // useEffect(() => {
//     //     console.log(schdata);

//     // }, [schdata])

//     const generateCustomID = (prefix) => {
//         const uuid = uuidv4();
//         const uniqueID = prefix + uuid.replace(/-/g, '').slice(0, 6);
//         return uniqueID;
//     };

//     const formatDate = (dateStr) => {
//         // Extract month and date from format "MONTH date (day)"
//         const [month, rest] = dateStr.split(' ');
//         const date = rest.split(' ')[0];

//         // Map month names to numbers
//         const monthMap = {
//             'JANUARY': '01',
//             'FEBRUARY': '02',
//             'MARCH': '03',
//             'APRIL': '04',
//             'MAY': '05',
//             'JUNE': '06',
//             'JULY': '07',
//             'AUGUST': '08',
//             'SEPTEMBER': '09',
//             'OCTOBER': '10',
//             'NOVEMBER': '11',
//             'DECEMBER': '12'
//         };

//         // Format as YYYY-MM-DD
//         return `2025-${monthMap[month]}-${date.padStart(2, '0')}`;
//     };

//     const sendToDatabase = (schedule, excelId) => {
//         schedule.forEach(place => {
//             place.projects.forEach(project => {
//                 const data = {
//                     excelId: excelId,
//                     projId: generateCustomID('Proj'),
//                     place: place.place,
//                     projNo: project.code,
//                     startDate: formatDate(project.startDate),
//                     endDate: formatDate(project.endDate),
//                     workDays: project.weekdays.toString()
//                 };
//                 console.log(data);
//                 schInputRef.current.push(data)
//                 // Send data to electron backend
//                 // window.api.send('excel-data-save', data);
//             });
//         });
//     };

//     const processExcelData = (rawData, workbook) => {
//         const schedule = [];
//         let currentPlace = '';
//         const excelId = generateCustomID('Excel'); // Generate unique ID for this Excel file

//         // Get the first sheet and merged cells info
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const merges = sheet['!merges'] || [];

//         // Process month headers
//         const months = [];
//         rawData[0].forEach((cell, index) => {
//             if (cell && typeof cell === 'string' && cell.includes(',')) {
//                 months.push({
//                     name: cell.split(',')[0],
//                     startIndex: index
//                 });
//             }
//         });

//         // Helper function to get month for a column index
//         const getMonthForColumn = (colIndex) => {
//             for (let i = months.length - 1; i >= 0; i--) {
//                 if (colIndex >= months[i].startIndex) {
//                     return months[i].name;
//                 }
//             }
//             return months[0].name;
//         };

//         // Helper function to find merge range for a cell
//         const findMergeRange = (rowIndex, colIndex) => {
//             const merge = merges.find(m =>
//                 rowIndex >= m.s.r && rowIndex <= m.e.r &&
//                 colIndex >= m.s.c && colIndex <= m.e.c
//             );
//             return merge ? {
//                 startCol: merge.s.c,
//                 endCol: merge.e.c
//             } : null;
//         };

//         // Process each row
//         rawData.forEach((row, rowIndex) => {
//             if (rowIndex > 2) {
//                 // Update current place if there's a value in first column
//                 if (row[0] && row[0].trim() && !row[0].startsWith(' ')) {
//                     currentPlace = row[0].trim();
//                 }

//                 if (currentPlace) {
//                     // Look for projects in the row
//                     for (let colIndex = 1; colIndex < row.length; colIndex++) {
//                         const cell = row[colIndex];
//                         if (cell && typeof cell === 'string' && cell.trim()) {
//                             const projectCode = cell.trim();

//                             // Find merge range for this cell
//                             const mergeRange = findMergeRange(rowIndex, colIndex);

//                             if (mergeRange) {
//                                 const startMonth = getMonthForColumn(mergeRange.startCol);
//                                 const endMonth = getMonthForColumn(mergeRange.endCol);
//                                 const startDate = rawData[1][mergeRange.startCol];
//                                 const endDate = rawData[1][mergeRange.endCol];
//                                 const startDay = rawData[2][mergeRange.startCol];
//                                 const endDay = rawData[2][mergeRange.endCol];

//                                 // Calculate weekdays
//                                 let weekdayCount = 0;
//                                 for (let i = mergeRange.startCol; i <= mergeRange.endCol; i++) {
//                                     const day = rawData[2][i];
//                                     if (day && day !== 'S') {
//                                         weekdayCount++;
//                                     }
//                                 }

//                                 // Find or create place entry
//                                 let placeEntry = schedule.find(p => p.place === currentPlace);
//                                 if (!placeEntry) {
//                                     placeEntry = {
//                                         place: currentPlace,
//                                         projects: []
//                                     };
//                                     schedule.push(placeEntry);
//                                 }

//                                 // Add project
//                                 placeEntry.projects.push({
//                                     code: projectCode,
//                                     startDate: `${startMonth} ${startDate} (${startDay})`,
//                                     endDate: `${endMonth} ${endDate} (${endDay})`,
//                                     weekdays: weekdayCount
//                                 });

//                                 // Skip to end of merge range
//                                 colIndex = mergeRange.endCol;
//                             }
//                         }
//                     }
//                 }
//             }
//         });

//         setsdata(schedule);
//         sendToDatabase(schedule, excelId);
//         console.log(schInputRef.current);
//         setScheduleData(schInputRef.current)
        
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             const data = new Uint8Array(event.target.result);
//             const workbook = XLSX.read(data, {
//                 type: 'array',
//                 cellStyles: true,
//                 cellNF: true,
//                 cellDates: true
//             });
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];
//             const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//             processExcelData(parsedData, workbook);
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     // Rest of your render code remains the same...
//     return (
//         <div>
//             <div className="mb-4">
//                 <label className="block mb-2">Choose Excel File</label>
//                 <input
//                     type="file"
//                     ref={fileInputRef}
//                     accept=".xls,.xlsx"
//                     onChange={handleFileUpload}
//                     className="border p-2 rounded"
//                 />
//             </div>

//             {sdata.length > 0 && (
//                 <div className="overflow-x-auto">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border p-2 bg-gray-100">Place</th>
//                                 <th className="border p-2 bg-gray-100">Project</th>
//                                 <th className="border p-2 bg-gray-100">Start Date</th>
//                                 <th className="border p-2 bg-gray-100">End Date</th>
//                                 <th className="border p-2 bg-gray-100">Duration (Weekdays)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {sdata.map((place, placeIndex) => (
//                                 place.projects.map((project, projectIndex) => (
//                                     <tr key={`${placeIndex}-${projectIndex}`}>
//                                         {projectIndex === 0 ? (
//                                             <td rowSpan={place.projects.length} className="border p-2">
//                                                 {place.place}
//                                             </td>
//                                         ) : null}
//                                         <td className="border p-2">{project.code}</td>
//                                         <td className="border p-2">{project.startDate}</td>
//                                         <td className="border p-2">{project.endDate}</td>
//                                         <td className="border p-2 text-center">{project.weekdays}</td>
//                                     </tr>
//                                 ))
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//             {scheduleData.length>0 && <ExcelInterface scheduleData={scheduleData}/>}
//         </div>
//     );
// }

// export default ShipExcel;







// import React, { useRef, useState } from 'react';
// import * as XLSX from 'xlsx';
// import ExcelInterface from './ExcelInterface';


// function ShipExcel() {
//     const fileInputRef = useRef(null);
//     const [scheduleData, setScheduleData] = useState([]);
//     const [activeView, setActiveView] = useState('timeline');

//     const processExcelData = (rawData, workbook) => {
//         const schedule = [];
//         let currentPlace = '';

//         // Get the first sheet and merged cells info
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const merges = sheet['!merges'] || [];

//         // Process month headers
//         const months = [];
//         rawData[0].forEach((cell, index) => {
//             if (cell && typeof cell === 'string' && cell.includes(',')) {
//                 months.push({
//                     name: cell.split(',')[0],
//                     startIndex: index
//                 });
//             }
//         });

//         // Helper function to get month for a column index
//         const getMonthForColumn = (colIndex) => {
//             for (let i = months.length - 1; i >= 0; i--) {
//                 if (colIndex >= months[i].startIndex) {
//                     return months[i].name;
//                 }
//             }
//             return months[0].name;
//         };

//         // Helper function to find merge range for a cell
//         const findMergeRange = (rowIndex, colIndex) => {
//             const merge = merges.find(m =>
//                 rowIndex >= m.s.r && rowIndex <= m.e.r &&
//                 colIndex >= m.s.c && colIndex <= m.e.c
//             );
//             return merge ? {
//                 startCol: merge.s.c,
//                 endCol: merge.e.c
//             } : null;
//         };

//         // Process each row
//         rawData.forEach((row, rowIndex) => {
//             if (rowIndex > 2) {
//                 // Update current place if there's a value in first column
//                 if (row[0] && row[0].trim() && !row[0].startsWith(' ')) {
//                     currentPlace = row[0].trim();
//                 }

//                 if (currentPlace) {
//                     // Look for projects in the row
//                     for (let colIndex = 1; colIndex < row.length; colIndex++) {
//                         const cell = row[colIndex];
//                         if (cell && typeof cell === 'string' && cell.trim()) {
//                             const projectCode = cell.trim();

//                             // Find merge range for this cell
//                             const mergeRange = findMergeRange(rowIndex, colIndex);

//                             if (mergeRange) {
//                                 const startMonth = getMonthForColumn(mergeRange.startCol);
//                                 const endMonth = getMonthForColumn(mergeRange.endCol);
//                                 const startDate = rawData[1][mergeRange.startCol];
//                                 const endDate = rawData[1][mergeRange.endCol];
//                                 const startDay = rawData[2][mergeRange.startCol];
//                                 const endDay = rawData[2][mergeRange.endCol];

//                                 // Calculate weekdays
//                                 let weekdayCount = 0;
//                                 for (let i = mergeRange.startCol; i <= mergeRange.endCol; i++) {
//                                     const day = rawData[2][i];
//                                     if (day && day !== 'S') {
//                                         weekdayCount++;
//                                     }
//                                 }

//                                 // Find or create place entry
//                                 let placeEntry = schedule.find(p => p.place === currentPlace);
//                                 if (!placeEntry) {
//                                     placeEntry = {
//                                         place: currentPlace,
//                                         projects: []
//                                     };
//                                     schedule.push(placeEntry);
//                                 }

//                                 // Add project
//                                 placeEntry.projects.push({
//                                     code: projectCode,
//                                     startDate: `${startMonth} ${startDate} (${startDay})`,
//                                     endDate: `${endMonth} ${endDate} (${endDay})`,
//                                     weekdays: weekdayCount
//                                 });

//                                 // Skip to end of merge range
//                                 colIndex = mergeRange.endCol;
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         console.log(schedule);
//         setScheduleData(schedule);
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             const data = new Uint8Array(event.target.result);
//             const workbook = XLSX.read(data, {
//                 type: 'array',
//                 cellStyles: true,
//                 cellNF: true,
//                 cellDates: true
//             });
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];
//             const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//             processExcelData(parsedData, workbook);
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     return (
//         <div className="p-4">
//             <div className="mb-4">
//                 <label className="block mb-2">Choose Excel File</label>
//                 <input
//                     type="file"
//                     ref={fileInputRef}
//                     accept=".xls,.xlsx"
//                     onChange={handleFileUpload}
//                     className="border p-2 rounded"
//                 />
//             </div>

//             {scheduleData.length > 0 && (
//                 <div>
//                     <div className="mb-4">
//                         <button
//                             onClick={() => setActiveView('timeline')}
//                             className={`mr-2 px-4 py-2 rounded ${activeView === 'timeline'
//                                     ? 'bg-blue-500 text-white'
//                                     : 'bg-gray-200'
//                                 }`}
//                         >
//                             Timeline View
//                         </button>
//                         <button
//                             onClick={() => setActiveView('table')}
//                             className={`px-4 py-2 rounded ${activeView === 'table'
//                                     ? 'bg-blue-500 text-white'
//                                     : 'bg-gray-200'
//                                 }`}
//                         >
//                             Table View
//                         </button>
//                     </div>

//                     {activeView === 'timeline' ? (
//                         <ExcelInterface scheduleData={scheduleData} />
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <table className="w-full border-collapse">
//                                 <thead>
//                                     <tr>
//                                         <th className="border p-2 bg-gray-100">Place</th>
//                                         <th className="border p-2 bg-gray-100">Project</th>
//                                         <th className="border p-2 bg-gray-100">Start Date</th>
//                                         <th className="border p-2 bg-gray-100">End Date</th>
//                                         <th className="border p-2 bg-gray-100">Duration (Weekdays)</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {scheduleData.map((place, placeIndex) => (
//                                         place.projects.map((project, projectIndex) => (
//                                             <tr key={`${placeIndex}-${projectIndex}`}>
//                                                 {projectIndex === 0 ? (
//                                                     <td rowSpan={place.projects.length} className="border p-2">
//                                                         {place.place}
//                                                     </td>
//                                                 ) : null}
//                                                 <td className="border p-2">{project.code}</td>
//                                                 <td className="border p-2">{project.startDate}</td>
//                                                 <td className="border p-2">{project.endDate}</td>
//                                                 <td className="border p-2 text-center">{project.weekdays}</td>
//                                             </tr>
//                                         ))
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
                   
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ShipExcel;


import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import ExcelInterface from './ExcelInterface';


function ShipExcel() {
    const fileInputRef = useRef(null);
    const [scheduleData, setScheduleData] = useState([]);
    const [viewType, setViewType] = useState('table'); // 'table' or 'excel'

    const processExcelData = (rawData, workbook) => {
        const schedule = [];
        let currentPlace = '';
        
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const merges = sheet['!merges'] || [];
        
        const months = [];
        rawData[0].forEach((cell, index) => {
            if (cell && typeof cell === 'string' && cell.includes(',')) {
                months.push({
                    name: cell.split(',')[0],
                    startIndex: index
                });
            }
        });

        const getMonthForColumn = (colIndex) => {
            for (let i = months.length - 1; i >= 0; i--) {
                if (colIndex >= months[i].startIndex) {
                    return months[i].name;
                }
            }
            return months[0].name;
        };

        const findMergeRange = (rowIndex, colIndex) => {
            const merge = merges.find(m => 
                rowIndex >= m.s.r && rowIndex <= m.e.r &&
                colIndex >= m.s.c && colIndex <= m.e.c
            );
            return merge ? { 
                startCol: merge.s.c,
                endCol: merge.e.c 
            } : null;
        };

        rawData.forEach((row, rowIndex) => {
            if (rowIndex > 2) {
                if (row[0] && row[0].trim() && !row[0].startsWith(' ')) {
                    currentPlace = row[0].trim();
                }

                if (currentPlace) {
                    for (let colIndex = 1; colIndex < row.length; colIndex++) {
                        const cell = row[colIndex];
                        if (cell && typeof cell === 'string' && cell.trim()) {
                            const projectCode = cell.trim();
                            
                            const mergeRange = findMergeRange(rowIndex, colIndex);
                            
                            if (mergeRange) {
                                const startMonth = getMonthForColumn(mergeRange.startCol);
                                const endMonth = getMonthForColumn(mergeRange.endCol);
                                const startDate = rawData[1][mergeRange.startCol];
                                const endDate = rawData[1][mergeRange.endCol];
                                const startDay = rawData[2][mergeRange.startCol];
                                const endDay = rawData[2][mergeRange.endCol];

                                let weekdayCount = 0;
                                for (let i = mergeRange.startCol; i <= mergeRange.endCol; i++) {
                                    const day = rawData[2][i];
                                    if (day && day !== 'S') {
                                        weekdayCount++;
                                    }
                                }

                                let placeEntry = schedule.find(p => p.place === currentPlace);
                                if (!placeEntry) {
                                    placeEntry = {
                                        place: currentPlace,
                                        projects: []
                                    };
                                    schedule.push(placeEntry);
                                }

                                placeEntry.projects.push({
                                    code: projectCode,
                                    startDate: `${startMonth} ${startDate}`,
                                    endDate: `${endMonth} ${endDate}`,
                                    weekdays: weekdayCount
                                });

                                colIndex = mergeRange.endCol;
                            }
                        }
                    }
                }
            }
        });

        setScheduleData(schedule);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { 
                type: 'array',
                cellStyles: true,
                cellNF: true,
                cellDates: true
            });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            processExcelData(parsedData, workbook);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="w-full p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Ship Schedule Viewer</h1>
                
                <div className="flex items-center gap-4 mb-4">
                    <div>
                        <label className="block mb-2 font-medium">Choose Excel File</label>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            accept=".xls,.xlsx" 
                            onChange={handleFileUpload}
                            className="border p-2 rounded" 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">View Type</label>
                        <select 
                            value={viewType} 
                            onChange={(e) => setViewType(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="table">Table View</option>
                            <option value="excel">Excel View</option>
                        </select>
                    </div>
                </div>

                {scheduleData.length > 0 && viewType === 'table' && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 p-3 text-left">Place</th>
                                        <th className="border border-gray-200 p-3 text-left">Project</th>
                                        <th className="border border-gray-200 p-3 text-left">Start Date</th>
                                        <th className="border border-gray-200 p-3 text-left">End Date</th>
                                        <th className="border border-gray-200 p-3 text-center">Duration (Weekdays)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scheduleData.map((place, placeIndex) => (
                                        place.projects.map((project, projectIndex) => (
                                            <tr key={`${placeIndex}-${projectIndex}`} className="hover:bg-gray-50">
                                                {projectIndex === 0 ? (
                                                    <td rowSpan={place.projects.length} className="border border-gray-200 p-3">
                                                        {place.place}
                                                    </td>
                                                ) : null}
                                                <td className="border border-gray-200 p-3">{project.code}</td>
                                                <td className="border border-gray-200 p-3">{project.startDate}</td>
                                                <td className="border border-gray-200 p-3">{project.endDate}</td>
                                                <td className="border border-gray-200 p-3 text-center">{project.weekdays}</td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {scheduleData.length > 0 && viewType === 'excel' && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <ExcelInterface scheduleData={scheduleData} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShipExcel;



// import React, { useRef, useState } from 'react';
// import * as XLSX from 'xlsx';

// import ExcelInterface from './ExcelInterface';

// function ShipExcel() {
//     const fileInputRef = useRef(null);
//     const [scheduleData, setScheduleData] = useState([]);
//     const [viewType, setViewType] = useState('table');
//     const [debugInfo, setDebugInfo] = useState('');

//     const processExcelData = (rawData, workbook) => {
//         // For debugging
//         console.log('Raw data:', rawData);
//         console.log('Workbook:', workbook);

//         const schedule = [];
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const merges = sheet['!merges'] || [];

//         // Debug log for merges
//         console.log('Merge ranges:', merges);

//         // Process row by row
//         for (let rowIndex = 3; rowIndex < rawData.length; rowIndex++) {
//             const row = rawData[rowIndex];
//             if (!row) continue;

//             // Get place from first column
//             const place = row[0];
//             if (place && typeof place === 'string' && place.trim() && !place.trim().startsWith(' ')) {
//                 let placeEntry = schedule.find(p => p.place === place.trim());
//                 if (!placeEntry) {
//                     placeEntry = { place: place.trim(), projects: [] };
//                     schedule.push(placeEntry);
//                 }

//                 // Process each cell in the row
//                 for (let colIndex = 1; colIndex < row.length; colIndex++) {
//                     const cell = row[colIndex];
                    
//                     if (cell && typeof cell === 'string' && cell.trim()) {
//                         // Found a project code
//                         const projectCode = cell.trim();
                        
//                         // Find corresponding merge range
//                         const mergeRange = merges.find(m => 
//                             rowIndex >= m.s.r && rowIndex <= m.e.r &&
//                             colIndex >= m.s.c && colIndex <= m.e.c
//                         );

//                         if (mergeRange) {
//                             // Get the start and end columns from merge range
//                             const startCol = mergeRange.s.c;
//                             const endCol = mergeRange.e.c;

//                             // Get dates
//                             const startDate = rawData[1][startCol];
//                             const endDate = rawData[1][endCol];

//                             // Get days
//                             const startDay = rawData[2][startCol];
//                             const endDay = rawData[2][endCol];

//                             // Get months by looking backwards in the header row
//                             let startMonth = '';
//                             let endMonth = '';
                            
//                             for (let i = startCol; i >= 0; i--) {
//                                 if (rawData[0][i] && typeof rawData[0][i] === 'string' && rawData[0][i].includes(',')) {
//                                     startMonth = rawData[0][i].split(',')[0];
//                                     break;
//                                 }
//                             }
                            
//                             for (let i = endCol; i >= 0; i--) {
//                                 if (rawData[0][i] && typeof rawData[0][i] === 'string' && rawData[0][i].includes(',')) {
//                                     endMonth = rawData[0][i].split(',')[0];
//                                     break;
//                                 }
//                             }

//                             // Count weekdays
//                             let weekdayCount = 0;
//                             for (let i = startCol; i <= endCol; i++) {
//                                 const day = rawData[2][i];
//                                 if (day && day !== 'S') {
//                                     weekdayCount++;
//                                 }
//                             }

//                             // Add project to place
//                             placeEntry.projects.push({
//                                 code: projectCode,
//                                 startDate: `${startMonth} ${startDate}`,
//                                 endDate: `${endMonth} ${endDate}`,
//                                 weekdays: weekdayCount,
//                                 startDay,
//                                 endDay,
//                                 colStart: startCol,
//                                 colEnd: endCol,
//                                 rowIndex: rowIndex // Added for debugging
//                             });

//                             // Skip to end of merge range
//                             colIndex = endCol;
//                         }
//                     }
//                 }
//             }
//         }

//         console.log('Processed schedule data:', schedule);
//         setScheduleData(schedule);
        
//         // Set debug info
//         setDebugInfo(JSON.stringify(schedule, null, 2));
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             const data = new Uint8Array(event.target.result);
//             const workbook = XLSX.read(data, { 
//                 type: 'array',
//                 cellStyles: true,
//                 cellNF: true,
//                 cellDates: true,
//                 raw: true // Added to ensure we get raw cell values
//             });
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];
            
//             // Get cell styles and other properties
//             console.log('Sheet properties:', sheet['!props']);
//             console.log('Sheet merges:', sheet['!merges']);
            
//             const parsedData = XLSX.utils.sheet_to_json(sheet, { 
//                 header: 1,
//                 raw: true,
//                 defval: null // Use null for empty cells
//             });
            
//             processExcelData(parsedData, workbook);
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     return (
//         <div className="w-full p-4">
//             <div className="mb-6">
//                 <h1 className="text-2xl font-bold mb-4">Ship Schedule Viewer</h1>
                
//                 <div className="flex items-center gap-4 mb-4">
//                     <div>
//                         <label className="block mb-2 font-medium">Choose Excel File</label>
//                         <input 
//                             type="file" 
//                             ref={fileInputRef} 
//                             accept=".xls,.xlsx" 
//                             onChange={handleFileUpload}
//                             className="border p-2 rounded" 
//                         />
//                     </div>
//                     <div>
//                         <label className="block mb-2 font-medium">View Type</label>
//                         <select 
//                             value={viewType} 
//                             onChange={(e) => setViewType(e.target.value)}
//                             className="border p-2 rounded"
//                         >
//                             <option value="table">Table View</option>
//                             <option value="excel">Excel View</option>
//                         </select>
//                     </div>
//                 </div>

//                 {scheduleData.length > 0 && (
//                     <div className="bg-white rounded-lg shadow overflow-hidden">
//                         {viewType === 'table' ? (
//                             <div className="overflow-x-auto">
//                                 <table className="w-full border-collapse">
//                                     <thead>
//                                         <tr className="bg-gray-50">
//                                             <th className="border border-gray-200 p-3 text-left">Place</th>
//                                             <th className="border border-gray-200 p-3 text-left">Project</th>
//                                             <th className="border border-gray-200 p-3 text-left">Start Date</th>
//                                             <th className="border border-gray-200 p-3 text-left">End Date</th>
//                                             <th className="border border-gray-200 p-3 text-center">Duration (Weekdays)</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {scheduleData.map((place, placeIndex) => (
//                                             place.projects.map((project, projectIndex) => (
//                                                 <tr key={`${placeIndex}-${projectIndex}`} className="hover:bg-gray-50">
//                                                     {projectIndex === 0 ? (
//                                                         <td rowSpan={place.projects.length} className="border border-gray-200 p-3">
//                                                             {place.place}
//                                                         </td>
//                                                     ) : null}
//                                                     <td className="border border-gray-200 p-3">{project.code}</td>
//                                                     <td className="border border-gray-200 p-3">{project.startDate}</td>
//                                                     <td className="border border-gray-200 p-3">{project.endDate}</td>
//                                                     <td className="border border-gray-200 p-3 text-center">{project.weekdays}</td>
//                                                 </tr>
//                                             ))
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         ) : (
//                             <ExcelInterface scheduleData={scheduleData} />
//                         )}
//                     </div>
//                 )}
                
//                 {/* Debug info - can be removed in production */}
//                 <div className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
//                     <pre className="text-xs">{debugInfo}</pre>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ShipExcel;