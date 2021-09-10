import moment from 'moment'
import Papa from 'papaparse'

export const fetchData = (type, gsheetID) => {
  /* Test case with returning promise */
  if (type === 'test') {
    console.log('test case fetch started')
    const promise = new Promise((resolve, reject) => {
      let name = 'Paul'
      if (name === 'Paul') {
        resolve('Promise resolved successfully')
      } else {
        reject(Error('Promise rejected'))
      }
    })
    return promise
  }
  /* Test case with returning promise */
  if (type === 'googlesheet') {
    return new Promise((resolve, reject) => {
      Papa.parse(
        `https://docs.google.com/spreadsheets/d/${gsheetID}/pub?output=csv`,
        {
          download: true,
          header: true,
          complete: googleData => {
            if (googleData) {
              resolve({ data: [], source: null, googleData: googleData.data })
            } else {
              reject(Error('Promise rejected'))
            }
          },
          simpleSheet: true
        }
      )
    })
  }
  /* CORONA VIRUS COVID 19 CASE FROM GITHUB AND ALSO GOOGLE DOCSs */
  if (type === 'coronavirus') {
    return new Promise((resolve, reject) => {
      /* Generate date for fetching CSV */
      const dataTitle = 'CSSE at Johns Hopkins University'
      const dataSource = 'https://github.com/CSSEGISandData'
      let fetchDateUnformatted = moment(new Date()).subtract(24, 'hours')
      let fetchDate = moment(new Date())
        .subtract(24, 'hours')
        .format('MM[-]DD[-]YYYY')
      console.log('⬇ data fetching started: COVID-19 (date: ' + fetchDate + ')')
      let url =
        'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' +
        fetchDate +
        '.csv'
      Papa.parse(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSweMdPPS7hvlmGltKhNmPr-sv7gibJDa8engbf8cslDa9NVyC956pztu_qxJO9iAxpWXI402oe61pf/pub?output=csv',
        {
          download: true,
          header: true,
          complete: googleData => {
            Papa.parse(url, {
              download: true,
              header: true,
              complete: (results, file) => {
                if (results) {
                  resolve({
                    data: results.data,
                    source: [dataSource, dataTitle],
                    googleData: googleData.data,
                    lastUpdate: moment(fetchDateUnformatted).format('L')
                  })
                } else {
                  reject(Error('Promise rejected'))
                }
              },
              error: error => {
                console.log(error)
                /* Generate fresh date for fetching CSV */
                let fetchDateUnformatted = moment(new Date()).subtract(
                  2 * 24,
                  'hours'
                )
                let fetchDate = moment(new Date())
                  .subtract(2 * 24, 'hours')
                  .format('MM[-]DD[-]YYYY')
                console.log(
                  '⬇ data fetching started: COVID-19 (date: ' + fetchDate + ')'
                )
                let url =
                  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' +
                  fetchDate +
                  '.csv'
                console.log(url)
                Papa.parse(url, {
                  download: true,
                  header: true,
                  complete: results => {
                    if (results) {
                      resolve({
                        data: results.data,
                        source: [dataSource, dataTitle],
                        googleData: googleData,
                        lastUpdate: moment(fetchDateUnformatted).format('L')
                      })
                    } else {
                      reject(Error('Promise rejected'))
                    }
                  },
                  error: error => {
                    console.log(error)
                    /* Generate fresh date for fetching CSV */
                    let fetchDate = moment(new Date())
                      .subtract(3 * 24, 'hours')
                      .format('MM[-]DD[-]YYYY')
                    let fetchDateUnformatted = moment(new Date()).subtract(
                      3 * 24,
                      'hours'
                    )
                    console.log(
                      '⬇ data fetching started: COVID-19 (date: ' +
                        fetchDate +
                        ')'
                    )
                    let url =
                      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' +
                      fetchDate +
                      '.csv'
                    console.log(url)
                    Papa.parse(url, {
                      download: true,
                      header: true,
                      complete: results => {
                        if (results) {
                          resolve({
                            data: results.data,
                            source: [dataSource, dataTitle],
                            googleData: googleData,
                            lastUpdate: moment(fetchDateUnformatted).format('L')
                          })
                        } else {
                          reject(Error('Promise rejected'))
                        }
                      }
                    })
                  }
                })
              }
            })
          }
        }
      )
    })
  }
  /* CORONA VIRUS COVID 19 CASE FROM GITHUB AND ALSO GOOGLE DOCSs */
  if (type === 'southsudan') {
    let fetchDateUnformatted = moment(new Date()).subtract(24, 'hours')
    return new Promise((resolve, reject) => {
      Papa.parse(
        `https://docs.google.com/spreadsheets/d/12RFBo_JRWoXf09mUOjIOV_0a_8Anq66lyAobpy0gm_k/pub?output=csv`,
        {
          download: true,
          header: true,
          complete: googleData => {
            if (googleData) {
              resolve({
                googleData: googleData.data,
                lastUpdate: moment(fetchDateUnformatted).format('L')
              })
            } else {
              reject(Error('Promise rejected'))
            }
          }
        }
      )
    })
  }
}
