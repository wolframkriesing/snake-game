import React from 'react';

class Page extends React.Component {
  render() {
    const { position } = this.props.appState;
    let rows = [];
    for (let i=0; i<10; i++) {
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
    for (let i=0; i<10; i++) {
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
  position: [0, 0]
};

window.addEventListener('keydown', ({ code }) => {
  if (code === 'ArrowRight') {
    appState.position[0]++;
  }
  if (code === 'ArrowLeft') {
    appState.position[0]--;
  }
  if (code === 'ArrowUp') {
    appState.position[1]--;
  }
  if (code === 'ArrowDown') {
    appState.position[1]++;
  }
  render(appState);
});


const render = (appState = {}) => {
  const page = <Page appState={ appState } />;
  ReactDOM.render(page, document.getElementById('app'));
};

render(appState);

