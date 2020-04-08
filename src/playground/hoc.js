console.log('hoc');

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>
            info
        </h1>
        <p>The info is {props.info}</p>
    </div>
);

const withAdminWarning = (WrapedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p> THis is a private info, please do not share </p>}
            <WrapedComponent {...props}/>
        </div>
    )
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
      <div>
          { props.isAdmin ?
              <WrappedComponent {...props}/> :
              <p> Need Authentication</p> }
      </div>
  )
};

const AdminInfo = requireAuthentication(Info);

ReactDOM.render(<AdminInfo isAdmin = {true} info = '- this is an info -'/>, document.getElementById('app'));