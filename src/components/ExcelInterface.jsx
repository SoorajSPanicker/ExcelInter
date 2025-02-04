// import React, { useEffect } from 'react'

// function ExcelInterface({ scheduleData }) {
//     // Generate date range
//     const generateDateRange = () => {
//         const months = ['JANUARY,25', 'FEBRUARY,25', 'MARCH,25', 'APRIL,25'];
//         const daysInMonth = {
//             'JANUARY,25': { days: 31, start: 26 },
//             'FEBRUARY,25': { days: 28, start: 1 },
//             'MARCH,25': { days: 31, start: 1 },
//             'APRIL,25': { days: 30, start: 1 }
//         };

//         const allDates = [];
//         const allDays = [];
//         let dayCounter = 0;

//         months.forEach(month => {
//             const monthName = month.split(',')[0];
//             const { days, start } = daysInMonth[month];
//             const monthDates = [];

//             for (let i = start; i <= days; i++) {
//                 monthDates.push(i);
//                 // Calculate day of week
//                 const dayLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dayCounter % 7];
//                 allDays.push(dayLetter);
//                 dayCounter++;
//             }

//             allDates.push({
//                 month: monthName,
//                 dates: monthDates
//             });
//         });
//         console.log(allDates);
//         console.log(allDays);

//         return { dateRanges: allDates, days: allDays };
//     };

//     const { dateRanges, days } = generateDateRange();

//     // Calculate total columns needed for colSpan
//     const totalDays = days.length;

//     // Helper to get column position for a date
//     const getDatePosition = (dateStr) => {
//         console.log(dateStr);
//         const [month, rest] = dateStr.split(' ');
//         const date = parseInt(rest);
//         let position = 0;

//         for (const range of dateRanges) {
//             if (range.month === month) {
//                 position += range.dates.findIndex(d => d === date);
//                 break;
//             } else {
//                 position += range.dates.length;
//             }
//         }
//         console.log(position);

//         return position;
//     };
//     useEffect(() => {
//         console.log(scheduleData);

//     }, [scheduleData])
//     return (
//         <div className="overflow-x-auto">
//             <table className="border-collapse w-full min-w-[1200px]">
//                 <thead>
//                     <tr>
//                         <th className="border font-bold p-2 w-32">PLACE</th>
//                         {dateRanges.map(({ month, dates }) => (
//                             <th
//                                 key={month}
//                                 colSpan={dates.length}
//                                 className="border font-bold text-center bg-gray-50 p-2 text-sm"
//                             >
//                                 {month}
//                             </th>
//                         ))}
//                     </tr>
//                     <tr>
//                         <th className="border p-2"></th>
//                         {dateRanges.map(range =>
//                             range.dates.map(date => (
//                                 <th
//                                     key={`${range.month}-${date}`}
//                                     className="border text-center p-1 text-xs w-8"
//                                 >
//                                     {date}
//                                 </th>
//                             ))
//                         )}
//                     </tr>
//                     <tr>
//                         <th className="border p-2"></th>
//                         {days.map((day, idx) => (
//                             <th
//                                 key={`day-${idx}`}
//                                 className="border text-center p-1 text-xs w-8"
//                             >
//                                 {day}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {scheduleData.map((place, placeIndex) => (
//                         <tr key={place.place} className="relative">
//                             <td className="border p-2 font-medium" style={{ height: '50px' }}>
//                                 {place.place}
//                             </td>
//                             {[...Array(totalDays)].map((_, idx) => (
//                                 <td key={idx} className="border p-0 relative">
//                                     {place.projects.map((project, projectIndex) => {
//                                         const startPos = getDatePosition(project.startDate);
//                                         const endPos = getDatePosition(project.endDate);

//                                         if (idx === startPos) {
//                                             const width = (endPos - startPos + 1) * 100;
//                                             return (
//                                                 <div
//                                                     key={`${place.place}-${projectIndex}`}
//                                                     className="absolute top-1 h-10 z-10 m-0"
//                                                     style={{
//                                                         left: '0',
//                                                         width: `${width}%`,
//                                                         backgroundColor: '#E3F2FD',
//                                                         border: '1px solid #90CAF9',
//                                                         borderRadius: '4px',
//                                                         padding: '2px 4px',
//                                                         fontSize: '12px',
//                                                         overflow: 'hidden',
//                                                         whiteSpace: 'nowrap',
//                                                         textOverflow: 'ellipsis'
//                                                     }}
//                                                 >
//                                                     {project.code}
//                                                 </div>
//                                             );
//                                         }
//                                         return null;
//                                     })}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ExcelInterface


// import React from 'react';

// function ExcelInterface({ scheduleData }) {
//     // Generate date range
//     const generateDateRange = () => {
//         const months = ['JANUARY,25', 'FEBRUARY,25', 'MARCH,25', 'APRIL,25'];
//         const daysInMonth = {
//             'JANUARY,25': { days: 31, start: 26 },
//             'FEBRUARY,25': { days: 28, start: 1 },
//             'MARCH,25': { days: 31, start: 1 },
//             'APRIL,25': { days: 30, start: 1 }
//         };

//         const allDates = [];
//         const allDays = [];
//         let dayCounter = 0;
//         let totalDaysList = []; // Keep track of all dates with their months

//         months.forEach(month => {
//             const monthName = month.split(',')[0];
//             const { days, start } = daysInMonth[month];
//             const monthDates = [];

//             for (let i = start; i <= days; i++) {
//                 monthDates.push(i);
//                 // Calculate day of week
//                 const dayLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dayCounter % 7];
//                 allDays.push(dayLetter);
//                 totalDaysList.push({ month: monthName, date: i, day: dayLetter });
//                 dayCounter++;
//             }

//             allDates.push({
//                 month: monthName,
//                 dates: monthDates
//             });
//         });

//         return { dateRanges: allDates, days: allDays, totalDaysList };
//     };

//     const { dateRanges, days, totalDaysList } = generateDateRange();

//     // Helper to parse date string
//     const parseDateString = (dateStr) => {
//         const [monthDate, dayPart] = dateStr.split(' (');
//         const [month, dateStr2] = monthDate.split(' ');
//         const date = parseInt(dateStr2);
//         const day = dayPart.replace(')', '');
//         return { month, date, day };
//     };

//     // Helper to find position in totalDaysList
//     const findDatePosition = (dateStr) => {
//         const { month, date } = parseDateString(dateStr);
//         return totalDaysList.findIndex(
//             day => day.month === month && day.date === date
//         );
//     };

//     // Calculate spans for projects
//     const getProjectSpan = (project) => {
//         const startIndex = findDatePosition(project.startDate);
//         const endIndex = findDatePosition(project.endDate);

//         if (startIndex === -1 || endIndex === -1) return null;

//         return {
//             start: startIndex,
//             span: endIndex - startIndex + 1
//         };
//     };

//     return (
//         <div className="overflow-x-auto">
//             <table className="border-collapse w-full min-w-[1200px]">
//                 <thead>
//                     <tr>
//                         <th className="border font-bold p-2 w-32">PLACE</th>
//                         {dateRanges.map(({ month, dates }) => (
//                             <th
//                                 key={month}
//                                 colSpan={dates.length}
//                                 className="border font-bold text-center bg-gray-50 p-2 text-sm"
//                             >
//                                 {month}
//                             </th>
//                         ))}
//                     </tr>
//                     <tr>
//                         <th className="border p-2"></th>
//                         {dateRanges.map(range =>
//                             range.dates.map(date => (
//                                 <th
//                                     key={`${range.month}-${date}`}
//                                     className="border text-center p-1 text-xs w-8"
//                                 >
//                                     {date}
//                                 </th>
//                             ))
//                         )}
//                     </tr>
//                     <tr>
//                         <th className="border p-2"></th>
//                         {days.map((day, idx) => (
//                             <th
//                                 key={`day-${idx}`}
//                                 className="border text-center p-1 text-xs w-8"
//                             >
//                                 {day}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {scheduleData.map((place, placeIndex) => (
//                         <tr key={place.place} className="relative">
//                             <td className="border p-2 font-medium" style={{ height: '50px' }}>
//                                 {place.place}
//                             </td>
//                             {[...Array(totalDaysList.length)].map((_, idx) => (
//                                 <td key={idx} className="border p-0 relative">
//                                     {place.projects.map((project, projectIndex) => {
//                                         const span = getProjectSpan(project);
//                                         if (span && idx === span.start) {
//                                             return (
//                                                 <div
//                                                     key={`${place.place}-${projectIndex}`}
//                                                     className="absolute top-1 h-10 z-10 m-0"
//                                                     style={{
//                                                         left: '0',
//                                                         width: `${span.span * 100}%`,
//                                                         backgroundColor: '#E3F2FD',
//                                                         border: '1px solid #90CAF9',
//                                                         borderRadius: '4px',
//                                                         padding: '2px 4px',
//                                                         fontSize: '12px',
//                                                         overflow: 'hidden',
//                                                         whiteSpace: 'nowrap',
//                                                         textOverflow: 'ellipsis'
//                                                     }}
//                                                 >
//                                                     {project.code}
//                                                 </div>
//                                             );
//                                         }
//                                         return null;
//                                     })}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ExcelInterface;


// import React from 'react';

// function ExcelInterface({ scheduleData }) {
//     // Generate timeline data structure
//     const generateTimelineData = () => {
//         // Define the timeline structure
//         const timeline = {
//             dates: [],
//             days: [],
//             monthRanges: []
//         };

//         // Define month configurations
//         const months = [
//             { name: 'JANUARY', startDate: 26, endDate: 31 },
//             { name: 'FEBRUARY', startDate: 1, endDate: 28 },
//             { name: 'MARCH', startDate: 1, endDate: 31 },
//             { name: 'APRIL', startDate: 1, endDate: 19 }
//         ];

//         // Generate sequential dates and track month ranges
//         let columnIndex = 0;
//         months.forEach(month => {
//             const monthStartColumn = columnIndex;

//             for (let date = month.startDate; date <= month.endDate; date++) {
//                 timeline.dates.push({
//                     month: month.name,
//                     date: date,
//                     columnIndex: columnIndex
//                 });
//                 columnIndex++;
//             }

//             timeline.monthRanges.push({
//                 month: month.name,
//                 startColumn: monthStartColumn,
//                 columnCount: columnIndex - monthStartColumn
//             });
//         });

//         // Generate day letters (S, M, T, W, T, F, S)
//         const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
//         let dayIndex = 0; // Start with Sunday for January 26
//         timeline.dates.forEach(() => {
//             timeline.days.push(dayLetters[dayIndex]);
//             dayIndex = (dayIndex + 1) % 7;
//         });

//         return timeline;
//     };

//     const timeline = generateTimelineData();

//     // Parse date string like "JANUARY 26 (S)" into components
//     const parseDateString = (dateStr) => {
//         const [monthDate, day] = dateStr.split(' (');
//         const [month, date] = monthDate.split(' ');
//         return {
//             month,
//             date: parseInt(date),
//             day: day.replace(')', '')
//         };
//     };

//     // Find column index for a given date
//     const findDateColumn = (dateStr) => {
//         const { month, date } = parseDateString(dateStr);
//         const dateEntry = timeline.dates.find(d =>
//             d.month === month && d.date === date
//         );
//         return dateEntry ? dateEntry.columnIndex : -1;
//     };

//     // Calculate project span information
//     const getProjectSpan = (project) => {
//         const startColumn = findDateColumn(project.startDate);
//         const endColumn = findDateColumn(project.endDate);

//         if (startColumn === -1 || endColumn === -1) return null;

//         return {
//             startColumn,
//             columnSpan: endColumn - startColumn + 1
//         };
//     };

//     return (
//         <div className="overflow-x-auto">
//             <table className="border-collapse w-full min-w-[1200px]">
//                 <thead>
//                     <tr>
//                         <th className="border font-bold p-2 w-32">PLACE</th>
//                         {timeline.monthRanges.map(range => (
//                             <th
//                                 key={range.month}
//                                 colSpan={range.columnCount}
//                                 className="border font-bold text-center bg-gray-50 p-2 text-sm"
//                             >
//                                 {range.month}
//                             </th>
//                         ))}
//                     </tr>
//                     <tr>
//                         <th className="border p-2"></th>
//                         {timeline.dates.map((dateInfo, idx) => (
//                             <th
//                                 key={`date-${idx}`}
//                                 className="border text-center p-1 text-xs w-8"
//                             >
//                                 {dateInfo.date}
//                             </th>
//                         ))}
//                     </tr>
//                     <tr>
//                         <th className="border p-2"></th>
//                         {timeline.days.map((day, idx) => (
//                             <th
//                                 key={`day-${idx}`}
//                                 className="border text-center p-1 text-xs w-8"
//                             >
//                                 {day}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {scheduleData.map((place, placeIndex) => (
//                         <tr key={place.place} className="relative">
//                             <td className="border p-2 font-medium" style={{ height: '50px' }}>
//                                 {place.place}
//                             </td>
//                             {timeline.dates.map((_, columnIndex) => (
//                                 <td key={columnIndex} className="border p-0 relative">
//                                     {place.projects.map((project, projectIndex) => {
//                                         const span = getProjectSpan(project);
//                                         if (span && columnIndex === span.startColumn) {
//                                             return (
//                                                 <div
//                                                     key={`${place.place}-${projectIndex}`}
//                                                     className="absolute top-1 h-10 z-10 m-0"
//                                                     style={{
//                                                         left: '0',
//                                                         width: `${span.columnSpan * 100}%`,
//                                                         backgroundColor: '#E3F2FD',
//                                                         border: '1px solid #90CAF9',
//                                                         borderRadius: '4px',
//                                                         padding: '2px 4px',
//                                                         fontSize: '12px',
//                                                         overflow: 'hidden',
//                                                         whiteSpace: 'nowrap',
//                                                         textOverflow: 'ellipsis'
//                                                     }}
//                                                 >
//                                                     {project.code}
//                                                 </div>
//                                             );
//                                         }
//                                         return null;
//                                     })}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ExcelInterface;


// import React, { useState, useEffect } from 'react';
// import _ from 'lodash';

// const ExcelInterface = ({ scheduleData }) => {
//   const [dates, setDates] = useState([]);
//   const [monthRanges, setMonthRanges] = useState([]);
//   const [gridData, setGridData] = useState([]);

//   useEffect(() => {
//     if (scheduleData.length > 0) {
//       // Extract date range from schedule data
//       const allDates = [];
//       scheduleData.forEach(place => {
//         place.projects.forEach(project => {
//           const start = new Date(project.startDate.split('(')[0].trim());
//           const end = new Date(project.endDate.split('(')[0].trim());
//           for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//             allDates.push(new Date(d));
//           }
//         });
//       });

//       // Get unique sorted dates
//       const uniqueDates = _.uniqBy(allDates, d => d.toDateString()).sort((a, b) => a - b);
//       setDates(uniqueDates);

//       // Create month ranges
//       const months = _.groupBy(uniqueDates, d => `${d.getFullYear()}-${d.getMonth()}`);
//       const monthRangeData = Object.entries(months).map(([key, dates]) => ({
//         month: dates[0].toLocaleString('default', { month: 'short' }),
//         start: dates[0],
//         end: dates[dates.length - 1],
//         colSpan: dates.length
//       }));
//       setMonthRanges(monthRangeData);

//       // Create grid data
//       const grid = scheduleData.map(place => ({
//         place: place.place,
//         projects: place.projects.map(project => ({
//           code: project.code,
//           start: new Date(project.startDate.split('(')[0].trim()),
//           end: new Date(project.endDate.split('(')[0].trim())
//         }))
//       }));
//       setGridData(grid);
//     }
//   }, [scheduleData]);

//   const getCellContent = (place, date) => {
//     const placeData = gridData.find(p => p.place === place);
//     if (!placeData) return null;

//     const project = placeData.projects.find(p => 
//       date >= p.start && date <= p.end
//     );

//     return project?.code || null;
//   };

//   const getProjectSpan = (place, date, project) => {
//     if (!project) return 1;
//     let span = 0;
//     let currentDate = new Date(date);
//     while (currentDate <= project.end && dates.find(d => d.getTime() === currentDate.getTime())) {
//       span++;
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
//     return span;
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="border-collapse w-full">
//         {/* Month Headers */}
//         <thead>
//           <tr>
//             <th className="border p-2 bg-gray-50">PLACE</th>
//             {monthRanges.map((month, idx) => (
//               <th
//                 key={idx}
//                 colSpan={month.colSpan}
//                 className="border p-2 bg-orange-100 text-center"
//               >
//                 {month.month}
//               </th>
//             ))}
//           </tr>
//           {/* Date Headers */}
//           <tr>
//             <th className="border p-2 bg-gray-50"></th>
//             {dates.map((date, idx) => (
//               <th key={idx} className="border p-2 bg-gray-50 text-center w-12">
//                 {date.getDate()}
//               </th>
//             ))}
//           </tr>
//           {/* Day of Week Headers */}
//           <tr>
//             <th className="border p-2 bg-gray-50"></th>
//             {dates.map((date, idx) => (
//               <th key={idx} className="border p-2 bg-gray-50 text-center">
//                 {date.toLocaleString('default', { weekday: 'short' })[0]}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {gridData.map((row, rowIdx) => (
//             <tr key={rowIdx}>
//               <td className="border p-2 font-medium">{row.place}</td>
//               {dates.map((date, colIdx) => {
//                 const project = row.projects.find(p => 
//                   date >= p.start && date <= p.end
//                 );
//                 const span = getProjectSpan(row.place, date, project);

//                 // Only render cell if it's the start of a project or an empty cell
//                 if (!project || date.getTime() === project.start.getTime()) {
//                   return (
//                     <td
//                       key={colIdx}
//                       colSpan={project ? span : 1}
//                       className={`border p-2 text-center ${
//                         project ? 'bg-blue-100' : ''
//                       }`}
//                     >
//                       {project?.code || ''}
//                     </td>
//                   );
//                 }
//                 return null;
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExcelInterface;


// import React, { useState, useEffect } from 'react';
// import _ from 'lodash';

// const ExcelInterface = ({ scheduleData }) => {
//   const [dates, setDates] = useState([]);
//   const [monthRanges, setMonthRanges] = useState([]);
//   const [gridData, setGridData] = useState([]);

//   useEffect(() => {
//     console.log(scheduleData);

//     if (scheduleData.length > 0) {
//       // Extract all dates from projects
//       const allDates = [];
//       scheduleData.forEach(place => {
//         place.projects.forEach(project => {
//           const start = new Date(project.startDate);
//           const end = new Date(project.endDate);

//           // Add all dates between start and end
//           for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//             allDates.push(new Date(d));
//           }
//         });
//       });

//       // Get unique sorted dates
//       const uniqueDates = _.uniqBy(allDates, d => d.toDateString())
//         .sort((a, b) => a - b);
//       setDates(uniqueDates);

//       // Create month ranges
//       const months = _.groupBy(uniqueDates, d => 
//         `${d.getFullYear()}-${d.getMonth()}`
//       );

//       const monthRangeData = Object.entries(months).map(([key, dates]) => ({
//         month: dates[0].toLocaleString('default', { month: 'short' }),
//         start: dates[0],
//         end: dates[dates.length - 1],
//         colSpan: dates.length
//       }));
//       setMonthRanges(monthRangeData);

//       // Format grid data
//       const grid = scheduleData.map(place => ({
//         place: place.place,
//         projects: place.projects.map(project => ({
//           ...project,
//           start: new Date(project.startDate),
//           end: new Date(project.endDate)
//         }))
//       }));
//       setGridData(grid);
//     }
//   }, [scheduleData]);

//   // Function to determine if a date should show a project
//   const getProjectForDate = (place, date) => {
//     const placeData = gridData.find(p => p.place === place);
//     if (!placeData) return null;

//     return placeData.projects.find(p => 
//       date >= p.start && date <= p.end
//     );
//   };

//   // Calculate project span (number of cells it should span)
//   const getProjectSpan = (project, date) => {
//     if (!project) return 1;

//     let span = 0;
//     let currentDate = new Date(date);

//     while (currentDate <= project.end && 
//            dates.find(d => d.getTime() === currentDate.getTime())) {
//       span++;
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
//     return span;
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse">
//         <thead>
//           {/* Month Headers */}
//           <tr>
//             <th className="border p-2 bg-gray-50">PLACE</th>
//             {monthRanges.map((month, idx) => (
//               <th
//                 key={idx}
//                 colSpan={month.colSpan}
//                 className="border p-2 bg-orange-100 text-center"
//               >
//                 {month.month}
//               </th>
//             ))}
//           </tr>

//           {/* Date Headers */}
//           <tr>
//             <th className="border p-2 bg-gray-50"></th>
//             {dates.map((date, idx) => (
//               <th key={idx} className="border p-2 bg-gray-50 text-center w-12">
//                 {date.getDate()}
//               </th>
//             ))}
//           </tr>

//           {/* Weekday Headers */}
//           <tr>
//             <th className="border p-2 bg-gray-50"></th>
//             {dates.map((date, idx) => (
//               <th key={idx} className="border p-2 bg-gray-50 text-center">
//                 {date.toLocaleString('default', { weekday: 'short' })[0]}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {gridData.map((row, rowIdx) => (
//             <tr key={rowIdx}>
//               <td className="border p-2 font-medium">{row.place}</td>
//               {dates.map((date, colIdx) => {
//                 const project = getProjectForDate(row.place, date);

//                 // Only render if it's the start of a project or an empty cell
//                 if (!project || date.getTime() === project.start.getTime()) {
//                   const span = project ? getProjectSpan(project, date) : 1;

//                   return (
//                     <td
//                       key={colIdx}
//                       colSpan={span}
//                       className={`border p-2 text-center ${
//                         project ? 'bg-blue-100' : ''
//                       }`}
//                     >
//                       {project?.code || ''}
//                     </td>
//                   );
//                 }
//                 return null;
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExcelInterface;


// import React, { useState, useEffect } from 'react';
// import _ from 'lodash';

// const ExcelInterface = ({ scheduleData }) => {
//     const [dates, setDates] = useState([]);
//     const [monthRanges, setMonthRanges] = useState([]);
//     const [gridData, setGridData] = useState([]);
//     const [placeGroups, setPlaceGroups] = useState([]);

//     useEffect(() => {
//         // Generate dates from 2025 to 2030
//         const generateDates = () => {
//             const allDates = [];
//             const startDate = new Date(2025, 0, 1); // January 1, 2025
//             const endDate = new Date(2030, 11, 31); // December 31, 2030

//             for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
//                 allDates.push(new Date(d));
//             }
//             return allDates;
//         };

//         const dates = generateDates();
//         setDates(dates);

//         // Create month ranges with year
//         const months = _.groupBy(dates, d =>
//             `${d.getFullYear()}-${d.getMonth()}`
//         );

//         const monthRangeData = Object.entries(months).map(([key, dates]) => {
//             const date = dates[0];
//             return {
//                 month: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
//                 start: dates[0],
//                 end: dates[dates.length - 1],
//                 colSpan: dates.length
//             };
//         });
//         setMonthRanges(monthRangeData);

//         if (scheduleData.length > 0) {
//             // // Group projects by place
//             // const groupedByPlace = _.groupBy(
//             //     scheduleData.flatMap(place =>
//             //         place.projects.map(project => ({
//             //             place: place.place,
//             //             code: project.code,
//             //             start: new Date(project.startDate),
//             //             end: new Date(project.endDate)
//             //         }))
//             //     ),
//             //     'place'
//             // );

//             // // Create place groups with rowspan information
//             // const placeGroupsData = Object.entries(groupedByPlace).map(([place, projects]) => ({
//             //     place,
//             //     rowspan: projects.length,
//             //     projects
//             // }));
//             // setPlaceGroups(placeGroupsData);

//             // // Flatten data for grid
//             // const flattenedData = placeGroupsData.flatMap(group =>
//             //     group.projects.map(project => ({
//             //         ...project,
//             //         isFirstInGroup: group.projects.indexOf(project) === 0
//             //     }))
//             // );
//             // setGridData(flattenedData);


//             // Group projects by place
//             const groupedByPlace = _.groupBy(
//                 scheduleData.flatMap(place =>
//                     place.projects.map(project => ({
//                         place: place.place,
//                         code: project.code,
//                         start: new Date(project.startDate),
//                         end: new Date(project.endDate)
//                     }))
//                 ),
//                 'place'
//             );

//             // Create place groups with rowspan information
//             const placeGroupsData = Object.entries(groupedByPlace).map(([place, projects]) => ({
//                 place,
//                 rowspan: projects.length,
//                 projects
//             }));
//             setPlaceGroups(placeGroupsData);

//             // Flatten data for grid
//             const flattenedData = placeGroupsData.flatMap(group =>
//                 group.projects.map(project => ({
//                     ...project,
//                     isFirstInGroup: group.projects.indexOf(project) === 0
//                 }))
//             );
//             setGridData(flattenedData);
//         }
//     }, [scheduleData]);

//     // useEffect(() => {
//     //     if (scheduleData.length > 0) {
//     //         // Extract all dates from projects
//     //         const allDates = [];
//     //         scheduleData.forEach(place => {
//     //             place.projects.forEach(project => {
//     //                 const start = new Date(project.startDate);
//     //                 const end = new Date(project.endDate);
//     //                 for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//     //                     allDates.push(new Date(d));
//     //                 }
//     //             });
//     //         });

//     //         // Get unique sorted dates
//     //         const uniqueDates = _.uniqBy(allDates, d => d.toDateString())
//     //             .sort((a, b) => a - b);
//     //         setDates(uniqueDates);

//     //         // Create month ranges
//     //         const months = _.groupBy(uniqueDates, d =>
//     //             `${d.getFullYear()}-${d.getMonth()}`
//     //         );

//     //         const monthRangeData = Object.entries(months).map(([key, dates]) => ({
//     //             month: dates[0].toLocaleString('default', { month: 'short' }),
//     //             start: dates[0],
//     //             end: dates[dates.length - 1],
//     //             colSpan: dates.length
//     //         }));
//     //         setMonthRanges(monthRangeData);

//     //         // Group projects by place
//     //         const groupedByPlace = _.groupBy(
//     //             scheduleData.flatMap(place =>
//     //                 place.projects.map(project => ({
//     //                     place: place.place,
//     //                     code: project.code,
//     //                     start: new Date(project.startDate),
//     //                     end: new Date(project.endDate)
//     //                 }))
//     //             ),
//     //             'place'
//     //         );

//     //         // Create place groups with rowspan information
//     //         const placeGroupsData = Object.entries(groupedByPlace).map(([place, projects]) => ({
//     //             place,
//     //             rowspan: projects.length,
//     //             projects
//     //         }));
//     //         setPlaceGroups(placeGroupsData);

//     //         // Flatten data for grid
//     //         const flattenedData = placeGroupsData.flatMap(group =>
//     //             group.projects.map(project => ({
//     //                 ...project,
//     //                 isFirstInGroup: group.projects.indexOf(project) === 0
//     //             }))
//     //         );
//     //         setGridData(flattenedData);
//     //     }
//     // }, [scheduleData]);

//     const isProjectStartDate = (project, date) => {
//         return date.toDateString() === project.start.toDateString();
//     };

//     const isDateInProject = (project, date) => {
//         return date >= project.start && date <= project.end;
//     };

//     const getCurrentDate = () => {
//         const today = new Date();
//         return today.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     return (
//         // <div className="overflow-x-auto">
//         //     <table className="w-full border-collapse">
//         //         {/* <thead>

//         //             <tr>
//         //                 <th className="border p-2 bg-gray-50">PLACE</th>
//         //                 {monthRanges.map((month, idx) => (
//         //                     <th
//         //                         key={idx}
//         //                         colSpan={month.colSpan}
//         //                         className="border p-2 bg-orange-100 text-center font-bold"
//         //                     >
//         //                         {month.month}
//         //                     </th>
//         //                 ))}
//         //             </tr>


//         //             <tr>
//         //                 <th className="border p-2 bg-gray-50"></th>
//         //                 {dates.map((date, idx) => (
//         //                     <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
//         //                         {date.getDate()}
//         //                     </th>
//         //                 ))}
//         //             </tr>


//         //             <tr>
//         //                 <th className="border p-2 bg-gray-50"></th>
//         //                 {dates.map((date, idx) => (
//         //                     <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
//         //                         {date.toLocaleString('default', { weekday: 'short' })[0]}
//         //                     </th>
//         //                 ))}
//         //             </tr>
//         //         </thead> */}

//         //         <thead>

//         //             <tr>
//         //                 <th className="border p-2 bg-gray-50 text-left">
//         //                     {getCurrentDate()}
//         //                 </th>
//         //                 {monthRanges.map((month, idx) => (
//         //                     <th
//         //                         key={idx}
//         //                         colSpan={month.colSpan}
//         //                         className="border p-2 bg-orange-100 text-center font-bold"
//         //                     >
//         //                         {month.month}
//         //                     </th>
//         //                 ))}
//         //             </tr>


//         //             <tr>
//         //                 <th rowSpan={2} className="border p-2 bg-gray-50 text-center font-bold">
//         //                     PLACE
//         //                 </th>
//         //                 {dates.map((date, idx) => (
//         //                     <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
//         //                         {date.getDate()}
//         //                     </th>
//         //                 ))}
//         //             </tr>


//         //             <tr>
//         //                 {dates.map((date, idx) => (
//         //                     <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
//         //                         {date.toLocaleString('default', { weekday: 'short' })[0]}
//         //                     </th>
//         //                 ))}
//         //             </tr>
//         //         </thead>

//         //         <tbody>
//         //             {gridData.map((row, rowIdx) => (
//         //                 <tr key={rowIdx}>
//         //                     {row.isFirstInGroup && (
//         //                         <td
//         //                             rowSpan={placeGroups.find(g => g.place === row.place).rowspan}
//         //                             className="border p-2 font-medium bg-white"
//         //                         >
//         //                             {row.place}
//         //                         </td>
//         //                     )}
//         //                     {dates.map((date, colIdx) => (
//         //                         <td
//         //                             key={colIdx}
//         //                             style={{
//         //                                 backgroundColor: isDateInProject(row, date) ? '#DBEAFE' : '',
//         //                                 border: '1px solid #E5E7EB',
//         //                                 padding: '0.5rem',
//         //                                 textAlign: 'center'
//         //                             }}
//         //                         >
//         //                             {isProjectStartDate(row, date) ? row.code : ''}
//         //                         </td>
//         //                     ))}
//         //                 </tr>
//         //             ))}
//         //         </tbody>
//         //     </table>
//         // </div>

//         <div className="w-full overflow-x-auto" style={{ maxWidth: "100vw", overflowX: "auto", whiteSpace: "nowrap" }}>
//         <table className="border-collapse" style={{ width: "2500px" }}>
//                 {/* <thead>

//         <tr>
//             <th className="border p-2 bg-gray-50">PLACE</th>
//             {monthRanges.map((month, idx) => (
//                 <th
//                     key={idx}
//                     colSpan={month.colSpan}
//                     className="border p-2 bg-orange-100 text-center font-bold"
//                 >
//                     {month.month}
//                 </th>
//             ))}
//         </tr>


//         <tr>
//             <th className="border p-2 bg-gray-50"></th>
//             {dates.map((date, idx) => (
//                 <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
//                     {date.getDate()}
//                 </th>
//             ))}
//         </tr>


//         <tr>
//             <th className="border p-2 bg-gray-50"></th>
//             {dates.map((date, idx) => (
//                 <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
//                     {date.toLocaleString('default', { weekday: 'short' })[0]}
//                 </th>
//             ))}
//         </tr>
//     </thead> */}

//                 <thead>

//                     <tr>
//                         <th className="border p-2 bg-gray-50 text-left">
//                             {getCurrentDate()}
//                         </th>
//                         {monthRanges.map((month, idx) => (
//                             <th
//                                 key={idx}
//                                 colSpan={month.colSpan}
//                                 className="border p-2 bg-orange-100 text-center font-bold"
//                             >
//                                 {month.month}
//                             </th>
//                         ))}
//                     </tr>


//                     <tr>
//                         <th rowSpan={2} className="border p-2 bg-gray-50 text-center font-bold">
//                             PLACE
//                         </th>
//                         {dates.map((date, idx) => (
//                             <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
//                                 {date.getDate()}
//                             </th>
//                         ))}
//                     </tr>


//                     <tr>
//                         {dates.map((date, idx) => (
//                             <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
//                                 {date.toLocaleString('default', { weekday: 'short' })[0]}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {gridData.map((row, rowIdx) => (
//                         <tr key={rowIdx}>
//                             {row.isFirstInGroup && (
//                                 <td
//                                     rowSpan={placeGroups.find(g => g.place === row.place).rowspan}
//                                     className="border p-2 font-medium bg-white"
//                                 >
//                                     {row.place}
//                                 </td>
//                             )}
//                             {dates.map((date, colIdx) => (
//                                 <td
//                                     key={colIdx}
//                                     style={{
//                                         backgroundColor: isDateInProject(row, date) ? '#DBEAFE' : '',
//                                         border: '1px solid #E5E7EB',
//                                         padding: '0.5rem',
//                                         textAlign: 'center'
//                                     }}
//                                 >
//                                     {isProjectStartDate(row, date) ? row.code : ''}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ExcelInterface;


// import React, { useState, useEffect } from 'react';
// import _ from 'lodash';

// const ExcelInterface = ({ scheduleData }) => {
//     const [dates, setDates] = useState([]);
//     const [monthRanges, setMonthRanges] = useState([]);
//     const [gridData, setGridData] = useState([]);
//     const [placeGroups, setPlaceGroups] = useState([]);

//     useEffect(() => {
//         // Generate dates from 2025 to 2030
//         const generateDates = () => {
//             const allDates = [];
//             const startDate = new Date(2025, 0, 1); // January 1, 2025
//             const endDate = new Date(2030, 11, 31); // December 31, 2030

//             for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
//                 allDates.push(new Date(d));
//             }
//             return allDates;
//         };

//         const dates = generateDates();
//         setDates(dates);

//         // Create month ranges with year
//         const months = _.groupBy(dates, d =>
//             `${d.getFullYear()}-${d.getMonth()}`
//         );

//         const monthRangeData = Object.entries(months).map(([key, dates]) => {
//             const date = dates[0];
//             return {
//                 month: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
//                 start: dates[0],
//                 end: dates[dates.length - 1],
//                 colSpan: dates.length
//             };
//         });
//         setMonthRanges(monthRangeData);

//         if (scheduleData.length > 0) {
//             // Group projects by place
//             const groupedByPlace = _.groupBy(
//                 scheduleData.flatMap(place =>
//                     place.projects.map(project => ({
//                         place: place.place,
//                         code: project.code,
//                         start: new Date(project.startDate),
//                         end: new Date(project.endDate)
//                     }))
//                 ),
//                 'place'
//             );

//             // Create place groups with rowspan information
//             const placeGroupsData = Object.entries(groupedByPlace).map(([place, projects]) => ({
//                 place,
//                 rowspan: projects.length,
//                 projects
//             }));
//             setPlaceGroups(placeGroupsData);

//             // Flatten data for grid
//             const flattenedData = placeGroupsData.flatMap(group =>
//                 group.projects.map(project => ({
//                     ...project,
//                     isFirstInGroup: group.projects.indexOf(project) === 0
//                 }))
//             );
//             setGridData(flattenedData);
//         }
//     }, [scheduleData]);

//     const isProjectStartDate = (project, date) => {
//         return date.toDateString() === project.start.toDateString();
//     };

//     const isDateInProject = (project, date) => {
//         return date >= project.start && date <= project.end;
//     };

//     const getCurrentDate = () => {
//         const today = new Date();
//         return today.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     // return (
//     //     <div className="overflow-x-auto">
//     //         <table className="w-full border-collapse">
//     //             <thead>
//     //                 {/* Current Date and Month-Year Headers */}
//     //                 <tr>
//     //                     <th className="border p-2 bg-gray-50 text-left">
//     //                         {getCurrentDate()}
//     //                     </th>
//     //                     {monthRanges.map((month, idx) => (
//     //                         <th
//     //                             key={idx}
//     //                             colSpan={month.colSpan}
//     //                             className="border p-2 bg-orange-100 text-center font-bold"
//     //                         >
//     //                             {month.month}
//     //                         </th>
//     //                     ))}
//     //                 </tr>

//     //                 {/* Place and Date Headers */}
//     //                 <tr>
//     //                     <th rowSpan={2} className="border p-2 bg-gray-50 text-center font-bold">
//     //                         PLACE
//     //                     </th>
//     //                     {dates.map((date, idx) => (
//     //                         <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
//     //                             {date.getDate()}
//     //                         </th>
//     //                     ))}
//     //                 </tr>

//     //                 {/* Weekday Headers */}
//     //                 <tr>
//     //                     {dates.map((date, idx) => (
//     //                         <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
//     //                             {date.toLocaleString('default', { weekday: 'short' })[0]}
//     //                         </th>
//     //                     ))}
//     //                 </tr>
//     //             </thead>

//     //             <tbody>
//     //                 {gridData.map((row, rowIdx) => (
//     //                     <tr key={rowIdx}>
//     //                         {row.isFirstInGroup && (
//     //                             <td
//     //                                 rowSpan={placeGroups.find(g => g.place === row.place).rowspan}
//     //                                 className="border p-2 font-medium bg-white"
//     //                             >
//     //                                 {row.place}
//     //                             </td>
//     //                         )}
//     //                         {dates.map((date, colIdx) => (
//     //                             // <td
//     //                             //   key={colIdx}
//     //                             //   className={`border p-2 text-center ${
//     //                             //     isDateInProject(row, date) ? 'bg-blue-100' : ''
//     //                             //   }`}
//     //                             // >
//     //                             //   {isProjectStartDate(row, date) ? row.code : ''}
//     //                             // </td>
//     //                             <td
//     //                                 key={colIdx}
//     //                                 style={{
//     //                                     backgroundColor: isDateInProject(row, date) ? '#DBEAFE' : '',
//     //                                     border: '1px solid #E5E7EB',
//     //                                     padding: '0.5rem',
//     //                                     textAlign: 'center'
//     //                                 }}
//     //                             >
//     //                                 {isProjectStartDate(row, date) ? row.code : ''}
//     //                             </td>
//     //                         ))}
//     //                     </tr>
//     //                 ))}
//     //             </tbody>
//     //         </table>
//     //     </div>
//     // );


//     return (
//         <div className="w-full overflow-x-auto" style={{ maxWidth: "100vw", overflowX: "auto", whiteSpace: "nowrap" }}>
//             <table className="border-collapse" style={{ width: "2500px" }}>
//                 <thead>
//                     {/* Current Date and Month-Year Headers */}
//                     <tr>
//                         <th className="border p-2 bg-gray-50 text-left">
//                             {getCurrentDate()}
//                         </th>
//                         {monthRanges.map((month, idx) => (
//                             <th
//                                 key={idx}
//                                 colSpan={month.colSpan}
//                                 className="border p-2 bg-orange-100 text-center font-bold"
//                             >
//                                 {month.month}
//                             </th>
//                         ))}
//                     </tr>

//                     {/* Place and Date Headers */}
//                     <tr>
//                         <th rowSpan={2} className="border p-2 bg-gray-50 text-center font-bold">
//                             PLACE
//                         </th>
//                         {dates.map((date, idx) => (
//                             <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
//                                 {date.getDate()}
//                             </th>
//                         ))}
//                     </tr>

//                     {/* Weekday Headers */}
//                     <tr>
//                         {dates.map((date, idx) => (
//                             <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
//                                 {date.toLocaleString('default', { weekday: 'short' })[0]}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {gridData.map((row, rowIdx) => (
//                         <tr key={rowIdx}>
//                             {row.isFirstInGroup && (
//                                 <td
//                                     rowSpan={placeGroups.find(g => g.place === row.place).rowspan}
//                                     className="border p-2 font-medium bg-white"
//                                 >
//                                     {row.place}
//                                 </td>
//                             )}
//                             {dates.map((date, colIdx) => (
//                                 <td
//                                     key={colIdx}
//                                     style={{
//                                         backgroundColor: isDateInProject(row, date) ? '#DBEAFE' : '',
//                                         border: '1px solid #E5E7EB',
//                                         padding: '0.5rem',
//                                         textAlign: 'center'
//                                     }}
//                                 >
//                                     {isProjectStartDate(row, date) ? row.code : ''}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );

// };


// export default ExcelInterface;



// import React, { useState, useEffect } from 'react';
// import _ from 'lodash';

// const ExcelInterface = ({ scheduleData }) => {
//     const [dates, setDates] = useState([]);
//     const [monthRanges, setMonthRanges] = useState([]);
//     const [gridData, setGridData] = useState([]);
//     const [placeGroups, setPlaceGroups] = useState([]);

//     useEffect(() => {
//         console.log(scheduleData);

//         // Generate dates from 2025 to 2030
//         const generateDates = () => {
//             const allDates = [];
//             const startDate = new Date(2025, 0, 1); // January 1, 2025
//             const endDate = new Date(2030, 11, 31); // December 31, 2030

//             for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
//                 allDates.push(new Date(d));
//             }
//             return allDates;
//         };

//         const dates = generateDates();
//         setDates(dates);

//         // Create month ranges with year
//         const months = _.groupBy(dates, d =>
//             `${d.getFullYear()}-${d.getMonth()}`
//         );

//         const monthRangeData = Object.entries(months).map(([key, dates]) => {
//             const date = dates[0];
//             return {
//                 month: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
//                 start: dates[0],
//                 end: dates[dates.length - 1],
//                 colSpan: dates.length
//             };
//         });
//         setMonthRanges(monthRangeData);

//         if (scheduleData && scheduleData.length > 0) {
//             // Process the scheduleData
//             const processedData = scheduleData.map(place => ({
//                 place: place.place,
//                 projects: place.projects.map(project => ({
//                     code: project.code,
//                     // Ensure dates are properly parsed
//                     start: new Date(project.startDate),
//                     end: new Date(project.endDate)
//                 }))
//             }));

//             // Group projects by place
//             const groupedByPlace = _.groupBy(
//                 processedData.flatMap(place =>
//                     place.projects.map(project => ({
//                         place: place.place,
//                         code: project.code,
//                         start: project.start,
//                         end: project.end
//                     }))
//                 ),
//                 'place'
//             );

//             // Create place groups with rowspan information
//             const placeGroupsData = Object.entries(groupedByPlace).map(([place, projects]) => ({
//                 place,
//                 rowspan: projects.length,
//                 projects
//             }));
//             setPlaceGroups(placeGroupsData);

//             // Flatten data for grid
//             const flattenedData = placeGroupsData.flatMap(group =>
//                 group.projects.map(project => ({
//                     ...project,
//                     isFirstInGroup: group.projects.indexOf(project) === 0
//                 }))
//             );
//             setGridData(flattenedData);
//         }
//     }, [scheduleData]);

//     const isProjectStartDate = (project, date) => {
//         return date.getTime() === project.start.getTime();
//     };

//     const isDateInProject = (project, date) => {
//         return date >= project.start && date <= project.end;
//     };

//     const getCurrentDate = () => {
//         const today = new Date();
//         return today.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     return (
//         <div className="w-full overflow-x-auto" style={{ maxWidth: "100vw", overflowX: "auto", whiteSpace: "nowrap" }}>
//             <table className="border-collapse" style={{ width: "2500px" }}>
//                 <thead>
//                     <tr>
//                         <th className="border p-2 bg-gray-50 text-left">
//                             {getCurrentDate()}
//                         </th>
//                         {monthRanges.map((month, idx) => (
//                             <th
//                                 key={idx}
//                                 colSpan={month.colSpan}
//                                 className="border p-2 bg-orange-100 text-center font-bold"
//                             >
//                                 {month.month}
//                             </th>
//                         ))}
//                     </tr>

//                     <tr>
//                         <th rowSpan={2} className="border p-2 bg-gray-50 text-center font-bold">
//                             PLACE
//                         </th>
//                         {dates.map((date, idx) => (
//                             <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
//                                 {date.getDate()}
//                             </th>
//                         ))}
//                     </tr>

//                     <tr>
//                         {dates.map((date, idx) => (
//                             <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
//                                 {date.toLocaleString('default', { weekday: 'short' })[0]}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {gridData.map((row, rowIdx) => (
//                         <tr key={rowIdx}>
//                             {row.isFirstInGroup && (
//                                 <td
//                                     rowSpan={placeGroups.find(g => g.place === row.place).rowspan}
//                                     className="border p-2 font-medium bg-white"
//                                 >
//                                     {row.place}
//                                 </td>
//                             )}
//                             {dates.map((date, colIdx) => {
//                                 const inProject = isDateInProject(row, date);
//                                 const isStart = isProjectStartDate(row, date);
//                                 return (
//                                     <td
//                                     key={colIdx}
//                                     style={{
//                                         backgroundColor: inProject ? '#DBEAFE' : '',
//                                         border: '1px solid #E5E7EB',
//                                         padding: '0.5rem',
//                                         textAlign: 'center'
//                                     }}
//                                     >
//                                         {isStart ? row.code : ''}
//                                     </td>
//                                 );
//                             })}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ExcelInterface;


// import React, { useState, useEffect } from 'react';
// import _ from 'lodash';

// const ExcelInterface = ({ scheduleData }) => {
//     const [dates, setDates] = useState([]);
//     const [monthRanges, setMonthRanges] = useState([]);
//     const [gridData, setGridData] = useState([]);
//     const [placeGroups, setPlaceGroups] = useState([]);

//     const parseCustomDate = (dateStr, year = 2025) => {
//         const [month, day] = dateStr.split(' ');
//         const monthIndex = new Date(`${month} 1, 2000`).getMonth();
//         return new Date(year, monthIndex, parseInt(day));
//     };

//     useEffect(() => {
//         console.log(scheduleData);

//         // // Generate dates from 2025 to 2030
//         // const generateDates = () => {
//         //     const allDates = [];
//         //     const startDate = new Date(2025, 0, 1); // January 1, 2025
//         //     const endDate = new Date(2030, 11, 31); // December 31, 2030

//         //     for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
//         //         allDates.push(new Date(d));
//         //     }
//         //     return allDates;
//         // };

//         // const allDates = generateDates();
//         // setDates(allDates);

//         // // Create month ranges with year
//         // const months = _.groupBy(allDates, d =>
//         //     `${d.getFullYear()}-${d.getMonth()}`
//         // );

//         // const monthRangeData = Object.entries(months).map(([key, dates]) => {
//         //     const date = dates[0];
//         //     return {
//         //         month: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
//         //         start: dates[0],
//         //         end: dates[dates.length - 1],
//         //         colSpan: dates.length
//         //     };
//         // });
//         // setMonthRanges(monthRangeData);

//         // if (scheduleData && scheduleData.length > 0) {
//         //     // Process projects with correct dates
//         //     const processedData = scheduleData.map(place => ({
//         //         place: place.place,
//         //         projects: place.projects.map(project => ({
//         //             code: project.code,
//         //             start: parseCustomDate(project.startDate, 2025),
//         //             end: parseCustomDate(project.endDate, 2025)
//         //         }))
//         //     }));

//         //     // Group projects by place
//         //     const groupedByPlace = _.groupBy(
//         //         processedData.flatMap(place =>
//         //             place.projects.map(project => ({
//         //                 place: place.place,
//         //                 code: project.code,
//         //                 start: project.start,
//         //                 end: project.end
//         //             }))
//         //         ),
//         //         'place'
//         //     );

//         //     // Create place groups with rowspan information
//         //     const placeGroupsData = Object.entries(groupedByPlace).map(([place, projects]) => ({
//         //         place,
//         //         rowspan: projects.length,
//         //         projects
//         //     }));
//         //     setPlaceGroups(placeGroupsData);

//         //     // Flatten data for grid
//         //     const flattenedData = placeGroupsData.flatMap(group =>
//         //         group.projects.map(project => ({
//         //             ...project,
//         //             isFirstInGroup: group.projects.indexOf(project) === 0
//         //         }))
//         //     );
//         //     setGridData(flattenedData);
//         // }
//     }, [scheduleData]);

//     const isProjectStartDate = (project, date) => {
//         return date.toDateString() === project.start.toDateString();
//     };

//     const isDateInProject = (project, date) => {
//         return date >= project.start && date <= project.end;
//     };

//     const getCurrentDate = () => {
//         const today = new Date();
//         return today.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     return (
//         <div className="w-full overflow-x-auto" style={{ maxWidth: "100vw", overflowX: "auto", whiteSpace: "nowrap" }}>
//             <table className="border-collapse" style={{ width: "2500px" }}>
//                 <thead>
//                     <tr>
//                         <th className="border p-2 bg-gray-50 text-left">
//                             {getCurrentDate()}
//                         </th>
//                         {monthRanges.map((month, idx) => (
//                             <th
//                                 key={idx}
//                                 colSpan={month.colSpan}
//                                 className="border p-2 bg-orange-100 text-center font-bold"
//                             >
//                                 {month.month}
//                             </th>
//                         ))}
//                     </tr>

//                     <tr>
//                         <th rowSpan={2} className="border p-2 bg-gray-50 text-center font-bold">
//                             PLACE
//                         </th>
//                         {dates.map((date, idx) => (
//                             <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
//                                 {date.getDate()}
//                             </th>
//                         ))}
//                     </tr>

//                     <tr>
//                         {dates.map((date, idx) => (
//                             <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
//                                 {date.toLocaleString('default', { weekday: 'short' })[0]}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {gridData.map((row, rowIdx) => (
//                         <tr key={rowIdx}>
//                             {row.isFirstInGroup && (
//                                 <td
//                                     rowSpan={placeGroups.find(g => g.place === row.place).rowspan}
//                                     className="border p-2 font-medium bg-white"
//                                 >
//                                     {row.place}
//                                 </td>
//                             )}
//                             {dates.map((date, colIdx) => {
//                                 const inProject = isDateInProject(row, date);
//                                 const isStart = isProjectStartDate(row, date);
//                                 return (
//                                     <td
//                                         key={colIdx}
//                                         className="border p-2 text-center"
//                                         style={{
//                                             backgroundColor: inProject ? '#DBEAFE' : ''
//                                         }}
//                                     >
//                                         {isStart ? row.code : ''}
//                                     </td>
//                                 );
//                             })}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ExcelInterface;


import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const ExcelInterface = ({ scheduleData }) => {
    const [dates, setDates] = useState([]);
    const [monthRanges, setMonthRanges] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [placeGroups, setPlaceGroups] = useState([]);

    useEffect(() => {
        console.log(gridData);

    }, [gridData])

    useEffect(() => {
        // Generate dates from 2025 to 2030
        const generateDates = () => {
            const allDates = [];
            const startDate = new Date(2025, 0, 1); // January 1, 2025
            const endDate = new Date(2030, 11, 31); // December 31, 2030

            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                allDates.push(new Date(d));
            }
            return allDates;
        };

        const allDates = generateDates();
        setDates(allDates);

        // Create month ranges with year
        const months = _.groupBy(allDates, d =>
            `${d.getFullYear()}-${d.getMonth()}`
        );

        const monthRangeData = Object.entries(months).map(([key, dates]) => {
            const date = dates[0];
            return {
                month: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
                start: dates[0],
                end: dates[dates.length - 1],
                colSpan: dates.length
            };
        });
        setMonthRanges(monthRangeData);

        if (scheduleData && scheduleData.length > 0) {
            // Group the flat data by place
            const groupedByPlace = _.groupBy(scheduleData, 'place');

            // Transform into required format
            const transformedData = Object.entries(groupedByPlace).map(([place, projects]) => ({
                place,
                projects: projects.map(proj => ({
                    place: proj.place,
                    projNo: proj.projNo,  // Keep projNo in the transformed data
                    start: new Date(proj.startDate),
                    end: new Date(proj.endDate)
                }))
            }));

            // Create place groups with rowspan information
            const placeGroupsData = transformedData.map(({ place, projects }) => ({
                place,
                rowspan: projects.length,
                projects
            }));
            setPlaceGroups(placeGroupsData);

            // Flatten data for grid
            const flattenedData = placeGroupsData.flatMap(group =>
                group.projects.map(project => ({
                    ...project,
                    place: group.place,
                    isFirstInGroup: group.projects.indexOf(project) === 0
                }))
            );
            console.log(flattenedData);

            setGridData(flattenedData);
        }
    }, [scheduleData]);



    // const isProjectStartDate = (project, date) => {
    //     return date.getTime() === project.start.getTime();
    // };

    const isProjectStartDate = (project, date) => {
        return date.getFullYear() === project.start.getFullYear() &&
            date.getMonth() === project.start.getMonth() &&
            date.getDate() === project.start.getDate();
    };

    // const isDateInProject = (project, date) => {
    //     return date >= project.start && date <= project.end;
    // };

    const isDateInProject = (project, date) => {
        const normalizeDate = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const normalizedDate = normalizeDate(date);
        const normalizedStart = normalizeDate(project.start);
        const normalizedEnd = normalizeDate(project.end);
        return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
    };
    const getCurrentDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="w-full overflow-x-auto" style={{ maxWidth: "100vw", overflowX: "auto", whiteSpace: "nowrap" }}>
            {/* {gridData.map((row, index) => (
                <p key={index}>
                    {row.place} - {row.projNo} ({row.start.toDateString()} to {row.end.toDateString()})
                </p>
            ))} */}
            <table className="border-collapse" style={{ width: "2500px" }}>
                <thead>
                    <tr>
                        <th className="border p-2 bg-gray-50 text-left">
                            {getCurrentDate()}
                        </th>
                        {monthRanges.map((month, idx) => (
                            <th
                                key={idx}
                                colSpan={month.colSpan}
                                className="border p-2 bg-orange-100 text-center font-bold"
                            >
                                {month.month}
                            </th>
                        ))}
                    </tr>

                    <tr>
                        <th rowSpan={2} className="border p-2 bg-gray-50 text-center font-bold">
                            PLACE
                        </th>
                        {dates.map((date, idx) => (
                            <th key={idx} className="border p-2 bg-gray-50 text-center w-8 font-bold">
                                {date.getDate()}
                            </th>
                        ))}
                    </tr>

                    <tr>
                        {dates.map((date, idx) => (
                            <th key={idx} className="border p-2 bg-gray-50 text-center font-bold">
                                {date.toLocaleString('default', { weekday: 'short' })[0]}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {gridData.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {row.isFirstInGroup && (
                                <td
                                    rowSpan={placeGroups.find(g => g.place === row.place).rowspan}
                                    className="border p-2 font-medium bg-white"
                                >
                                    {row.place}
                                    {/* {row.code} */}
                                </td>
                            )}
                            {dates.map((date, colIdx) => {
                                const inProject = isDateInProject(row, date);
                                const isStart = isProjectStartDate(row, date);
                                return (
                                    <td
                                        key={colIdx}
                                        className="border p-2 text-center"
                                        style={{
                                            backgroundColor: inProject ? '#DBEAFE' : ''
                                        }}
                                    >
                                        {isStart ? row.projNo : ''}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExcelInterface;