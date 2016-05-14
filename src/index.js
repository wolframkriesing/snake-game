import React from 'react';

const rowCount = 20;
const columnCount = 20;

class Page extends React.Component {
  render() {
    const { position } = this.props.appState;
    let rows = [];
    for (let i=0; i<rowCount; i++) {
      if (position[1] === i) {
        rows.push(<Row selectedCell={ position[0] } />);
      } else {
        rows.push(<Row />);
      }
    }
    return (
      <div>
        { rows }
      </div>
    );
  }
}

class Row extends React.Component {
  render() {
    const { selectedCell = null } = this.props;
    let cells = [];
    for (let i=0; i<columnCount; i++) {
      if (selectedCell === i) {
        cells.push(<Cell selected />);
      } else {
        cells.push(<Cell />);
      }
    }
    return (
      <div className="grid">{ cells }</div>
    );
  }
}

class Cell extends React.Component {
  render() {
    let classNames = ['grid-cell'];
    if (this.props.selected) {
      classNames.push('selected');
    }
    return (
      <div className={ classNames.join(' ') }>.</div>
    );
  }
}

const appState = {
  position: [0, 0],
  direction: [1, 0],
};

const COLUMN_INDEX = 0;
const ROW_INDEX = 1;
const fixNewPosition = (position) => {
  if (position[COLUMN_INDEX] > columnCount) {
    position[COLUMN_INDEX] = columnCount - 1;
  }
  if (position[COLUMN_INDEX] < 0) {
    position[COLUMN_INDEX] = 0;
  }
  if (position[ROW_INDEX] > rowCount) {
    position[ROW_INDEX] = rowCount - 1;
  }
  if (position[ROW_INDEX] < 0) {
    position[ROW_INDEX] = 0;
  }
  return position;
};

window.addEventListener('keydown', ({ code }) => {
  if (code === 'ArrowRight') {
    appState.direction = [1, 0];
  }
  if (code === 'ArrowLeft') {
    appState.direction = [-1, 0];
  }
  if (code === 'ArrowUp') {
    appState.direction = [0, -1];
  }
  if (code === 'ArrowDown') {
    appState.direction = [0, 1];
  }
});


const render = (appState = {}) => {
  const page = <Page appState={ appState } />;
  ReactDOM.render(page, document.getElementById('app'));
};

setInterval(() => {
  
  appState.position = [
    appState.position[COLUMN_INDEX] + appState.direction[COLUMN_INDEX],
    appState.position[ROW_INDEX] + appState.direction[ROW_INDEX]
  ];
  appState.position = fixNewPosition(appState.position);
  render(appState);
  
  render(appState);
}, 100);

