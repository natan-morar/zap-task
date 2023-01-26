/** 
 * Parse the contents of a CSV file to a JSON array.
 */
export function parseCSVtoJSON(fileBuffer, delimiter = ",") {
  const content = fileBuffer.toString()

  const rows = content.split("\n")
  const keys = rows[0].split(delimiter).map(key => key.trim())

  const data = []

  rows.slice(1).forEach(row => {
    const values = row.trim().split(delimiter)
    const rowData = {}

    keys.forEach((key, i) => rowData[key] = values[i])

    data.push(rowData)
  })

  console.log('data', data)

  return data
}
