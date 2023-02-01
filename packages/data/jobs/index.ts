import sort from "../_scripts/sort"

module.exports = sort.itemsByRecent

// TODO - the time_desc in the data can be replaced by the following
// module.exports = async function(data) {
//   data = await sortByMostRecent(data)
//   data = data.items.map(item => {
//     let time_desc = `${item.role}, ${item.begin_year}`
//     if (item.begin_year !== item.end_year) {
//       const endString = !item.end_year ? 'present' : item.end_year
//       time_desc += endString
//     }
//     return {...item, time_desc}
//   })
//   return data
// }
