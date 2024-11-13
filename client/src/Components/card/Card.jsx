import React from 'react';

const Card = ({ title, content, icon, backgroundColor }) => {
  return (
    <div className="card text-white mb-4" style={{ backgroundColor }}>
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <h4>{title}</h4>
            <p>{content}</p>
          </div>
          <div className="col-4">
            {icon && <i className={icon}></i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
