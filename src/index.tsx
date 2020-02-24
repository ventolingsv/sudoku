import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { cell, parse } from './utils/Utils';

import './index.css';

const cellStr = '   92  4 \n3  85 7  \n 56   89 \n    85   \n   7    2\n  4 19 3 \n   34  8 \n68    2  \n       1 ';
const cells = parse(cellStr).map(
    (row, rowNum) => row.map(
        (cl, colNum) => cell(cl, rowNum, colNum)
    )
);

ReactDOM.render(<App cells={cells} />, document.getElementById('root'));