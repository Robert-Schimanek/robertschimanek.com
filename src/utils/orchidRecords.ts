const ORCID_ID = '0000-0002-4227-4080'
const ORCID_API_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`

export async function fetchOrcidPublications() {
  // console.log('Fetching ORCID publications...')
  try {
    const response = await fetch(ORCID_API_URL, {
      headers: {
        Accept: 'application/json',
      },
    })

    // console.log('ORCID API response status:', response.status)

    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()
    // console.log('ORCID API response data:', JSON.stringify(data, null, 2))

    if (!data.group || data.group.length === 0) {
      // console.log('No publications found in ORCID data')
      return []
    }

    // console.log(`Found ${data.group.length} publications`)
    return data.group
  }
  catch (error) {
    console.error('Error fetching ORCID publications:', error)
    return []
  }
}
