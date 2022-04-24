import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const data = {
  Kyivska: {
    G: {
      2017: {
        XX: {
          value: 150000,
          dateRelease: "2017-12-31",
        },
        YY: {
          value: 100000,
          dateRelease: "2017-12-31",
        },
        ZZ: {
          value: 77,
          dateRelease: "2017-12-31",
        },
      },
      2018: {
        XX: {
          value: 160000,
          dateRelease: "2018-12-31",
        },
        YY: {
          value: 110000,
          dateRelease: "2018-12-31",
        },
        ZZ: {
          value: 72,
          dateRelease: "2018-12-31",
        },
      },
      2019: {
        XX: {
          value: 130000,
          dateRelease: "2019-12-31",
        },
        YY: {
          value: 85000,
          dateRelease: "2019-12-31",
        },
        ZZ: {
          value: 72,
          dateRelease: "2019-12-31",
        },
      },
    },
  },
  Odeska: {
    G: {
      2017: {
        XX: {
          value: 10000,
          dateRelease: "2017-12-31",
        },
        YY: {
          value: 5000,
          dateRelease: "2017-12-31",
        },
        ZZ: {
          value: 45,
          dateRelease: "2017-12-31",
        },
      },
      2018: {
        XX: {
          value: 740000,
          dateRelease: "2018-12-31",
        },
        YY: {
          value: 530000,
          dateRelease: "2018-08-01",
        },
        ZZ: {
          value: 61,
          dateRelease: "2018-08-01",
        },
      },
      2019: {
        XX: {
          value: 15000,
          dateRelease: "2019-12-01",
        },
        YY: {
          value: 0,
          dateRelease: "2022-02-18",
        },
        ZZ: {
          value: 0,
          dateRelease: "2022-02-18",
        },
      },
    },
  },
  Lvivska: {
    G: {
      2017: {
        XX: {
          value: 640000,
          dateRelease: "2017-12-31",
        },
        YY: {
          value: 510000,
          dateRelease: "2017-08-01",
        },
        ZZ: {
          value: 67,
          dateRelease: "2017-08-01",
        },
      },
      2018: {
        XX: {
          value: 740000,
          dateRelease: "2018-12-31",
        },
        YY: {
          value: 530000,
          dateRelease: "2018-08-01",
        },
        ZZ: {
          value: 61,
          dateRelease: "2018-08-01",
        },
      },
      2019: {
        XX: {
          value: 15000,
          dateRelease: "2019-12-01",
        },
        YY: {
          value: 0,
          dateRelease: "2022-02-18",
        },
        ZZ: {
          value: 0,
          dateRelease: "2022-02-18",
        },
      },
    },
  },
};

const years = [2017, 2018, 2019];
const preparedData = Object.entries(data);

function popup(URL, title, width, height) {
  var left = (window.screen.width - width) / 2;
  var top = (window.screen.height - height) / 4;
  var myWindow = window.open(URL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
}

function CitiesTable() {
  const [citiesData, setCitiesData] = useState(preparedData);
  const [updatedValues, setUpdatedValues] = useState([]);
  const [selectedCellId, setSelectedCellId] = useState();

  window.addEventListener("message", (event) => {
    const { dateRelease, value, user, comment } = event.data;

    const newUpdated = {
      dateRelease,
      value, 
      user, 
      comment,
      id: selectedCellId,
    };

    setUpdatedValues([
      ...updatedValues,
      newUpdated,
    ]);
  }, false);

  const windowOpen = (event, cityValue) => {
    const { id } = event.target;
    const { dateRelease, value, user = 'Vadym', comment = 'any' } = cityValue;

    setSelectedCellId(id);

    popup(`/popup/${dateRelease}/${value}/${user}/${comment}`, "window", 850, 400);
  }

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan="2">regions</TableCell>
              {years.map(year => (
                <TableCell key={year} align="center" colSpan="3">
                  {year}
                </TableCell>
              ))}
            </TableRow>
                
            <TableRow>
              {years.map((year) => (
                <React.Fragment key={year}>
                  <TableCell align="center">xx</TableCell>
                  <TableCell align="center">yy</TableCell>
                  <TableCell align="center">zz</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {citiesData.map((cityData, rowIndex) => {
              const [cityName, cityInfo] = cityData;
              const cityValues = Object.values(cityInfo.G).map(year => Object.values(year)).flat();

              return (
                <TableRow key={rowIndex}>
                  <TableCell>
                    {cityName}
                  </TableCell>

                  {cityValues.map((cityValue, cellIndex) => {
                    const cellId = rowIndex + '.' + cellIndex;

                    updatedValues.map(updatedValue => {
                      if (updatedValue.id === cellId) {
                        cityValue = updatedValue;
                      }
                    })

                    return (
                      <TableCell 
                        key={cellIndex}
                        id={cellId}
                        onClick={(event) => windowOpen(event, cityValue)}
                      >
                        {cityValue.value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CitiesTable;
