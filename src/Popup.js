import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import './Popup.css';

const tableTitles = ['value', 'date', 'user', 'comment'];
const defaultValues = [
  [4, '20.02.2022', 'Petro', 'any'],
  [5, '21.02.2022', 'Roman', 'any'],
  [6, '22.02.2022', 'Anna', 'any'],
];

function Popup() {
  const { dataRelease, value, user, comment } = useParams();
  const date = dataRelease.split('-').reverse().join('.');

  const [data, setData] = useState(defaultValues);
  const newValue = [value, date, user, comment];
  const [currentValue, setCurrentValue] = useState(newValue);
  const [inputs, setInputs] = useState(['', '', '', '']);

  useEffect(() => {
    setData([
      ...data,
      currentValue,
    ]);
  }, []);

  const onInputChange = (event, i) => {
    const { value } = event.target;
    const currentInput = [...inputs];
    
    currentInput[i] = value;

    setInputs(currentInput);
  }

  const onAddButton = () => {
    const inputValue = inputs[0] || 0; 
    const inputDate = inputs[1].split('-').reverse().join('.') || 'unknown date'; 
    const inputUser = inputs[2] || 'default user'; 
    const inputComment = inputs[3] || 'no comment';

    const newLine = [
      inputValue,
      inputDate,
      inputUser,
      inputComment,
    ];

    window.opener.postMessage({
      value: inputValue,
      dateRelease: inputDate,
      user: inputUser,
      comment: inputComment,
    });

    console.log(newLine)

    setData([
      ...data,
      newLine,
    ]);

    setCurrentValue(inputs);

    setInputs(['', '', '', '']);
  }

  const onCloseButton = () => window.close();

 
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableTitles.map((title, i) => (
                <TableCell key={i}>
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((rowValues, i) => (
              <TableRow key={i}>
                {rowValues.map((cellValue, i) => (
                  <TableCell key={i}>
                    {cellValue}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            <TableRow>
              {inputs.map((input, i) => {
                let type = 'text';

                if (i === 0) {
                  type = 'number';
                }

                if (i === 1) {
                  type = 'date';
                }

                return (
                  <TableCell key={i}>
                    <input 
                      value={input}
                      type={type} 
                      onChange={(event) => onInputChange(event, i)} 
                      required={true}
                    />
                  </TableCell>
                )
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack 
        direction="row" 
        justifyContent="center"
        spacing={20}
        className="Stack"
      >
        <Button variant="contained" onClick={onAddButton}>
          Add
        </Button>

        <Button  variant="contained" onClick={onCloseButton}>
          Close
        </Button>
      </Stack>
    </>
  );
}

export default Popup;