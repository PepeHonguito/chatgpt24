import Papa from 'papaparse';

export async function fetchGoogleSheet(sheetId, gid = '0') {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Error fetching sheet');
  }
  const csv = await res.text();
  const parsed = Papa.parse(csv, { header: true, dynamicTyping: true });
  return parsed.data;
}

export async function fetchSheets(config) {
  const result = {};
  for (const [key, { id, gid }] of Object.entries(config)) {
    result[key] = await fetchGoogleSheet(id, gid);
  }
  return result;
}
